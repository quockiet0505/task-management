"use client"

import { Typography } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"
import MemberList from "@/components/members/MemberList"
import AddMemberDialog, { AddMemberValues } from "@/components/members/AddMemberDialog"

import { useEffect, useState } from "react"

import { Member } from "@/types/member"
import { Organization } from "@/types/org"

import { listMembers, addMember } from "@/services/memberService"
import { listOrganizations} from "@/services/orgService"

import CreateButton from "@/components/common/CreateButton"

const { Title } = Typography

export default function MembersPage() {
  const [open, setOpen] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [organizationId, setOrganizationId] = useState<string | null>(null)
  const [orgs, setOrgs] = useState<Organization[]>([])

  useEffect(() => {
    const init = async () => {
      const orgs = await listOrganizations()
  
      setOrgs(orgs)
  
      if (orgs.length > 0) {
        setOrganizationId(orgs[0].id)
  
        const data = await listMembers(orgs[0].id)
        setMembers(data)
      }
    }
  
    init()
  }, [])

  const handleAddMember = async (values: AddMemberValues) => {
    try {
      await addMember({
        organizationId: values.organizationId,
        userId: values.userEmail, 
        role: values.role,
      })
  
      if (organizationId) {
        const data = await listMembers(organizationId)
        setMembers(data)
      }
  
      setOpen(false)
    } catch (err) {
      console.error("Add member failed", err)
    }
  }

  return (
    <DashboardLayout>
      <Title level={3}>Members</Title>

      <div style={{ marginBottom: 16 }}>
        <CreateButton text="Add Member" onClick={() => setOpen(true)} />
      </div>

      <AddMemberDialog
        open={open}
        onClose={() => setOpen(false)}
        onAdd={handleAddMember}
        organizations={orgs}
      />

      <MemberList members={members} />
    </DashboardLayout>
  )
}