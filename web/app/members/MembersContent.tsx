// app/members/MembersContent.tsx
"use client"

import { Typography, message, Select, Tag } from "antd"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

import DashboardLayout from "@/components/layout/DashboardLayout"
import MemberList from "@/components/members/MemberList"
import MemberForm, { MemberFormValues } from "@/components/members/MemberForm"
import CreateButton from "@/components/common/CreateButton"

import { Member } from "@/types/member"
import { Organization } from "@/types/org"
import { listMembers, addMember, updateMemberRole, deleteMember } from "@/services/memberService"
import { listOrganizations } from "@/services/orgService"

const { Title } = Typography
const { Option } = Select

export default function MembersContent() {
  const [open, setOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const [orgs, setOrgs] = useState<Organization[]>([])

  const searchParams = useSearchParams()
  const orgIdFromUrl = searchParams.get('orgId')

  // Load organizations
  useEffect(() => {
    const loadOrgs = async () => {
      try {
        const orgsData = await listOrganizations()
        setOrgs(orgsData)
      } catch (error) {
        console.error("Load organizations failed", error)
        message.error("Failed to load organizations")
      }
    }
    loadOrgs()
  }, [])

  // Set organization từ URL hoặc mặc định
  useEffect(() => {
    if (orgs.length > 0) {
      if (orgIdFromUrl && orgs.find(org => org.id === orgIdFromUrl)) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrganizationId(orgIdFromUrl)
      } else {
        setOrganizationId(orgs[0].id)
      }
    }
  }, [orgs, orgIdFromUrl])

  // Load members khi organizationId thay đổi
  useEffect(() => {
    const loadMembers = async () => {
      if (!organizationId) return
      try {
        const data = await listMembers(organizationId)
        setMembers(data ?? [])
      } catch (error) {
        console.error("Load members failed", error)
        message.error("Failed to load members")
      }
    }
    loadMembers()
  }, [organizationId])

  const handleAddMember = async (values: MemberFormValues) => {
    try {
      await addMember({
        organizationId: values.organizationId,
        email: values.userEmail!,
        role: values.role,
      })
      if (organizationId) {
        const data = await listMembers(organizationId)
        setMembers(data ?? [])
      }
      setOpen(false)
      message.success("Member added successfully")
    } catch (err) {
      console.error("Add member failed", err)
      message.error("Failed to add member")
    }
  }

  const handleUpdateRole = async (values: MemberFormValues) => {
    try {
      if (!editingMember || !organizationId) return
      await updateMemberRole({
        organizationId: values.organizationId,
        userId: editingMember.userId,
        role: values.role,
      })
      const data = await listMembers(organizationId)
      setMembers(data ?? [])
      setEditingMember(null)
      message.success("Member role updated successfully")
    } catch (error) {
      console.error("Update role failed", error)
      message.error("Failed to update role")
    }
  }

  const handleDelete = async (userId: string) => {
    try {
      if (!organizationId) return
      await deleteMember({ organizationId, userId })
      const data = await listMembers(organizationId)
      setMembers(data ?? [])
      message.success("Member removed successfully")
    } catch (error) {
      console.error("Delete failed", error)
      message.error("Failed to remove member")
    }
  }

  const currentOrg = orgs.find(org => org.id === organizationId)

  return (
    <DashboardLayout>
      <Title level={3}>
        {currentOrg ? `Members of ${currentOrg.name}` : "Members Management"}
      </Title>

      <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Select
          placeholder="Select organization"
          style={{ width: 250 }}
          value={organizationId}
          onChange={(value) => setOrganizationId(value)}
        >
          {orgs.map(org => (
            <Option key={org.id} value={org.id}>{org.name}</Option>
          ))}
        </Select>
        {currentOrg && <Tag color="blue">Viewing: {currentOrg.name}</Tag>}
      </div>

      <div style={{ marginBottom: 16 }}>
        <CreateButton text="Add Member" onClick={() => setOpen(true)} />
      </div>

      <MemberForm
        open={open || !!editingMember}
        onClose={() => {
          setOpen(false)
          setEditingMember(null)
        }}
        onSubmit={editingMember ? handleUpdateRole : handleAddMember}
        initialValues={editingMember ? {
          organizationId: editingMember.organizationId,
          userEmail: editingMember.email,
          role: editingMember.role
        } : {
          organizationId: organizationId || undefined
        }}
        organizations={orgs}
        title={editingMember ? "Edit Member Role" : "Add Member"}
        submitText={editingMember ? "Update Role" : "Add Member"}
      />

      <MemberList 
        members={members} 
        organizations={orgs}
        onDelete={handleDelete}
        onEdit={setEditingMember}
      />
    </DashboardLayout>
  )
}