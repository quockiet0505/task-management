"use client"

import { Table, Space, Button } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { User } from "@/types/user"

interface Props {
  user: User | null
  onEdit: () => void
}

export default function ProfileList({ user, onEdit }: Props) {
  const data = user ? [user] : []

  const columns = [
    {
      title: "STT",
      width: 70,
      render: (_: User, __: User, index: number) => index + 1,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      render: (value?: string) => value || "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      render: (value?: string) => value || "N/A",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
    {
      title: "Actions",
      width: 100,
      render: () => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={onEdit}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
    />
  )
}