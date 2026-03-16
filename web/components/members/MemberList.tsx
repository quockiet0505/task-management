"use client"

import { Table, Tag, Space, Button, Popconfirm, message, Select } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Member } from "@/types/member"
import { Organization } from "@/types/org"
import { useState } from "react"
import { ColumnsType } from "antd/es/table"

interface Props {
  members?: Member[]
  organizations?: Organization[]
  onDelete?: (userId: string) => Promise<void>
  onEdit?: (member: Member) => void
}

export default function MemberList({ 
  members = [], 
  organizations = [],
  onDelete, 
  onEdit
}: Props) {
  const [filterOrg, setFilterOrg] = useState<string | null>(null)

  const handleDelete = async (userId: string) => {
    try {
      await onDelete?.(userId)
      message.success("Member removed successfully")
    } catch (error) {
      console.error("Delete error:", error) 
      message.error("Failed to remove member")
    }
  }

  const filteredMembers = filterOrg 
    ? members.filter(m => m.organizationId === filterOrg)
    : members

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
      filters: organizations.map(org => ({ text: org.name, value: org.id })),
      onFilter: (value, record) => record.organizationId === value,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const color = role === "admin" ? "red" : "blue"
        return <Tag color={color}>{role === "admin" ? "Admin" : "Member"}</Tag>
      },
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Member', value: 'member' },
      ],
      onFilter: (value, record) => record.role === value,
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
    <div>
      <div style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filter by Organization"
          style={{ width: 250 }}
          allowClear
          onChange={(value) => setFilterOrg(value)}
        >
          {organizations.map(org => (
            <Select.Option key={org.id} value={org.id}>
              {org.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <Table
        rowKey="userId"
        columns={columns}
        dataSource={filteredMembers}
        pagination={{ pageSize: 10 }}
        bordered
      />
    </div>
  )
}