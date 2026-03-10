"use client"

import { Typography } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"

import { useState, useEffect } from "react"

import { Organization } from "@/types/org"
import { createOrganization, listOrganizations } from "@/services/orgService"

import OrgList from "@/components/org/OrgList"
import CreateOrgDialog, { CreateOrgValues } from "@/components/org/CreateOrgDialog"

import CreateButton from "@/components/common/CreateButton"

const { Title } = Typography

export default function OrgPage() {
  const [open, setOpen] = useState(false)
  const [orgs, setOrgs] = useState<Organization[]>([])

  const loadOrgs = async () => {
    const data = await listOrganizations()
    setOrgs(data)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrgs()
  }, [])

  const handleCreate = async (values: CreateOrgValues) => {
    try {
      await createOrganization(values)

      await loadOrgs() 

      setOpen(false)
    } catch (err) {
      console.error("Create org failed", err)
    }
  }

  return (
    <DashboardLayout>
      <Title level={3}>Organizations</Title>

      <div style={{ marginBottom: 16 }}>
        <CreateButton
          text="Create Organization"
          onClick={() => setOpen(true)}
        />
      </div>

      <CreateOrgDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={handleCreate}
      />

      <OrgList orgs={orgs} />
    </DashboardLayout>
  )
}