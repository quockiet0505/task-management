/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input): any {
    return {
      name: "task-management-gce",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "local",
      providers: {
        gcp: {
          project: "voltarocks-42-sandbox",
          region: "asia-southeast1",
          zone: "asia-southeast1-a",
        },
      },
    };
  },

  async run() {
    const gcp = await import("@pulumi/gcp");
    const fs = await import("fs");

    const rawScript = fs.readFileSync("startup.sh", "utf-8");
    const startupScriptContent = rawScript.replace(/\r\n/g, "\n");

    const vmSaEmail =
      "task-vm-sa-final@voltarocks-42-sandbox.iam.gserviceaccount.com";

    // VPC
    const vpc = new gcp.compute.Network("task-vpc-final", {
      autoCreateSubnetworks: false,
    });

    const subnet = new gcp.compute.Subnetwork("task-subnet-final", {
      ipCidrRange: "10.0.0.0/24",
      region: "asia-southeast1",
      network: vpc.id,
    });

    // IAM
    new gcp.projects.IAMMember("task-artifact-reader-final", {
      project: "voltarocks-42-sandbox",
      role: "roles/artifactregistry.reader",
      member: `serviceAccount:${vmSaEmail}`,
    });

    // Firewall
    new gcp.compute.Firewall("task-allow-web-final", {
      network: vpc.id,
      allows: [{ protocol: "tcp", ports: ["80", "443"] }],
      sourceRanges: ["130.211.0.0/22", "35.191.0.0/16"],
      targetTags: ["web-server"],
    });

    new gcp.compute.Firewall("task-allow-ssh-final", {
      network: vpc.id,
      allows: [{ protocol: "tcp", ports: ["22"] }],
      sourceRanges: ["35.235.240.0/20"],
      targetTags: ["web-server"],
    });

    // Instance Template
    const template = new gcp.compute.InstanceTemplate("task-template-final", {
      machineType: "e2-small",
      tags: ["web-server"],
      disks: [
        {
          boot: true,
          autoDelete: true,
          sourceImage: "debian-cloud/debian-12",
        },
      ],
      networkInterfaces: [
        {
          network: vpc.id,
          subnetwork: subnet.id,
          accessConfigs: [{}],
        },
      ],
      serviceAccount: {
        email: vmSaEmail,
        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
      },
      metadataStartupScript: startupScriptContent,
    });

    // MIG
    const mig = new gcp.compute.InstanceGroupManager("task-mig-final", {
      zone: "asia-southeast1-a",
      baseInstanceName: "task-mgmt",
      versions: [{ instanceTemplate: template.id }],
      targetSize: 1,
      namedPorts: [{ name: "http", port: 80 }],
    });

    // Health Check
    const healthCheck = new gcp.compute.HealthCheck("task-health-final", {
      httpHealthCheck: {
        port: 80,
        requestPath: "/health",
      },
    });

    // Backend
    const backend = new gcp.compute.BackendService("task-backend-final", {
      loadBalancingScheme: "EXTERNAL",
      protocol: "HTTP",
      portName: "http",
      healthChecks: healthCheck.id,
      backends: mig.instanceGroup.apply((group) => [{ group }]),
    });

    const urlMap = new gcp.compute.URLMap("task-urlmap-final", {
      defaultService: backend.id,
    });

    const lbIp = new gcp.compute.GlobalAddress("task-lb-ip-final");

    const cert = new gcp.compute.ManagedSslCertificate("task-cert-final", {
      managed: { domains: ["duongquockiet.id.vn"] },
    });

    const httpsProxy = new gcp.compute.TargetHttpsProxy(
      "task-https-proxy-final",
      {
        urlMap: urlMap.id,
        sslCertificates: [cert.id],
      }
    );

    new gcp.compute.GlobalForwardingRule("task-https-forwarding-final", {
      target: httpsProxy.id,
      portRange: "443",
      ipAddress: lbIp.address,
    });

    const httpRedirect = new gcp.compute.URLMap("task-http-redirect-final", {
      defaultUrlRedirect: {
        httpsRedirect: true,
        redirectResponseCode: "MOVED_PERMANENTLY_DEFAULT",
        stripQuery: false,
      },
    });

    const httpProxy = new gcp.compute.TargetHttpProxy(
      "task-http-proxy-final",
      {
        urlMap: httpRedirect.id,
      }
    );

    new gcp.compute.GlobalForwardingRule("task-http-forwarding-final", {
      target: httpProxy.id,
      portRange: "80",
      ipAddress: lbIp.address,
    });

    return {};
  },
});