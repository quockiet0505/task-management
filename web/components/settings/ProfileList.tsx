"use client"

import { Table, Space, Button, Tag } from "antd"
import { EditOutlined, KeyOutlined } from "@ant-design/icons"
import { User } from "@/types/user"
import dayjs from "dayjs"

interface Props {
  user: User | null
  onEdit: () => void
  onChangePassword: () => void
}

export default function ProfileList({ user, onEdit, onChangePassword }: Props) {
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
      title: "Status",
      dataIndex: "isActive",
      render: (active?: boolean) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date?: string) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "N/A",
    },
    {
      title: "Updated At",
      dataIndex: "updatedAt",
      render: (date?: string) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "N/A",
    },
    {
      title: "Actions",
      width: 200,
      render: () => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={onEdit}
            size="middle"
          >
            Edit
          </Button>
          <Button
            icon={<KeyOutlined />}
            onClick={onChangePassword}
            size="middle"
          >
            Change Password
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