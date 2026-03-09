"use client"

import { Typography } from "antd"
import DashboardLayout from "@/components/layout/DashboardLayout"
import MemberList from "@/components/members/MemberList"
import AddMemberDialog from "@/components/members/AddMemberDialog"

const { Title } = Typography

export default function MembersPage() {
  return (
    <DashboardLayout>
      <Title level={3}>Members</Title>

      <AddMemberDialog />
      <MemberList />
    </DashboardLayout>
  )
}