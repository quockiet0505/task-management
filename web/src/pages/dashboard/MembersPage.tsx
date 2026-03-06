import { useState } from "react"
import { Typography, message, Space } from "antd"
import MemberList from "@/components/members/MemberList"
import AddMemberDialog, { type AddMemberValues } from "@/components/members/AddMemberDialog"
import DashboardLayout from "@/components/layout/DashboardLayout"
import OrgSelector from "@/components/org/OrgSelector"

const { Title } = Typography

export default function MembersPage() {
  const [members, setMembers] = useState([
    { userId: "admin@biwoco.com", role: "admin" },
    { userId: "staff@biwoco.com", role: "member" },
  ])

  const handleAddMember = (values: AddMemberValues) => {
    setMembers([...members, { userId: values.userId, role: values.role }])
    message.success("Đã thêm thành viên vào tổ chức!")
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <Space size="large">
          <Title level={3} className="!mb-0">Thành viên</Title>
          <div className="w-48"><OrgSelector /></div>
        </Space>
        <AddMemberDialog onAdd={handleAddMember} />
      </div>
      <MemberList members={members} />
    </DashboardLayout>
  )
}