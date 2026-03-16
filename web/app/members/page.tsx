"use client"

import { Typography, message } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"
import MemberList from "@/components/members/MemberList"
import MemberForm, { MemberFormValues } from "@/components/members/MemberForm"

import { useEffect, useState } from "react"

import { Member } from "@/types/member"
import { Organization } from "@/types/org"

import { listMembers, addMember, updateMemberRole, deleteMember } from "@/services/memberService"
import { listOrganizations } from "@/services/orgService"

import CreateButton from "@/components/common/CreateButton"

const { Title } = Typography

export default function MembersPage() {
  const [open, setOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const [orgs, setOrgs] = useState<Organization[]>([])

  useEffect(() => {
    const init = async () => {
      try {
        const orgsData = await listOrganizations()
        setOrgs(orgsData)

        if (orgsData.length > 0) {
          setOrganizationId(orgsData[0].id)
          const data = await listMembers(orgsData[0].id)
          setMembers(data ?? [])
        }
      } catch (error) {
        console.error("Load data failed", error)
        message.error("Failed to load data")
      }
    }

    init()
  }, [])

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
        role: values.role
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

      await deleteMember({
        organizationId,
        userId
      })

      const data = await listMembers(organizationId)
      setMembers(data ?? [])
      message.success("Member removed successfully")
    } catch (error) {
      console.error("Delete failed", error)
      message.error("Failed to remove member")
    }
  }

  return (
    <DashboardLayout>
      <Title level={3}>Members Management</Title>

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
        } : undefined}
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