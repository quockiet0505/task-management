"use client"

import { Table, Tag, Space, Button, Popconfirm, message } from "antd" 
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Member } from "@/types/member"
import { Organization } from "@/types/org"
import { ColumnsType } from "antd/es/table"
import { Role } from "@/types/member"

interface Props {
  members?: Member[]
  organizations?: Organization[]
  onDelete?: (userId: string) => Promise<void>
  onEdit?: (member: Member) => void
}

export default function MemberList({ 
  members = [], 
  onDelete, 
  onEdit
}: Props) {
  const handleDelete = async (userId: string) => {
    try {
      await onDelete?.(userId)
      message.success("Member removed successfully")
    } catch (error) {
      console.error("Delete error:", error) 
      message.error("Failed to remove member")
    }
  }

  const columns: ColumnsType<Member> = [
    {
      title: "STT",
      width: 70,
      key: "index",
      render: (_, __, index: number) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (name?: string) => name || "N/A",
      sorter: (a, b) => (a.fullName || "").localeCompare(b.fullName || ""),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Organization",
      dataIndex: "organizationName",
      key: "organizationName",
      render: (orgName?: string) => orgName || "N/A",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: Role) => {
        const color = 
          role === "owner" ? "gold" :
          role === "admin" ? "red" : 
          "blue"
        const text = 
          role === "owner" ? "Owner" :
          role === "admin" ? "Admin" : 
          "Member"
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 250,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="middle"
            onClick={() => onEdit?.(record)}
          >
            Edit Role
          </Button>
          <Popconfirm
            title="Remove member"
            description={`Are you sure you want to remove ${record.fullName || record.email}?`}
            onConfirm={() => handleDelete(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="middle">
              Remove
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowKey="userId"
      columns={columns}
      dataSource={members} 
      pagination={{ pageSize: 10 }}
      bordered
    />
  )
}