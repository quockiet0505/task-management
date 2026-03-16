"use client"

import { Typography, message } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"

import { useState, useEffect } from "react"

import { Organization } from "@/types/org"
import { createOrganization, listOrganizations, updateOrganization, deleteOrganization } from "@/services/orgService"

import OrgList from "@/components/org/OrgList"
import OrganizationForm, { OrganizationFormValues } from "@/components/org/OrganizationForm"

import CreateButton from "@/components/common/CreateButton"

const { Title } = Typography

export default function OrgPage() {
  const [open, setOpen] = useState(false)
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null)
  const [orgs, setOrgs] = useState<Organization[]>([])

  const loadOrgs = async () => {
    const data = await listOrganizations()
    setOrgs(data)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrgs()
  }, [])

  const handleCreate = async (values: OrganizationFormValues) => {
    try {
      await createOrganization(values)
      await loadOrgs()
      setOpen(false)
      message.success("Organization created successfully")
    } catch (err) {
      console.error("Create org failed", err)
      message.error("Failed to create organization")
    }
  }

  const handleUpdate = async (values: OrganizationFormValues) => {
    try {
      if (!editingOrg) return
      
      await updateOrganization(editingOrg.id, values)
      await loadOrgs()
      setEditingOrg(null)
      message.success("Organization updated successfully")
    } catch (err) {
      console.error("Update org failed", err)
      message.error("Failed to update organization")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteOrganization(id)
      await loadOrgs()
      message.success("Organization deleted successfully")
    } catch (err) {
      console.error("Delete org failed", err)
      message.error("Failed to delete organization")
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

      {/* Form dùng chung cho Create và Edit */}
      <OrganizationForm
        open={open || !!editingOrg}
        onClose={() => {
          setOpen(false)
          setEditingOrg(null)
        }}
        onSubmit={editingOrg ? handleUpdate : handleCreate}
        initialValues={editingOrg ? { name: editingOrg.name } : undefined}
        title={editingOrg ? "Edit Organization" : "Create Organization"}
        submitText={editingOrg ? "Update Organization" : "Create Organization"}
      />

      <OrgList 
        orgs={orgs} 
        onEdit={setEditingOrg}
        onDelete={handleDelete}
      />
    </DashboardLayout>
  )
}