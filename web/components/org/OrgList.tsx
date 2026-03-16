"use client"

import { Table, Tag, Space, Button, Popconfirm, message } from "antd"
import { DeleteOutlined, EditOutlined, TeamOutlined } from "@ant-design/icons"
import { Organization } from "@/types/org"
import { useRouter } from "next/navigation"

interface Props {
  orgs?: Organization[]
  onDelete?: (id: string) => Promise<void>
  onEdit?: (org: Organization) => void
}

export default function OrgList({ orgs = [], onDelete, onEdit }: Props) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    try {
      await onDelete?.(id)
      message.success("Organization deleted successfully")
    } catch (error) {
      console.error("Delete error:", error) 
      message.error("Failed to delete organization")
    }
  }

  const handleViewMembers = (orgId: string) => {
    router.push(`/members?orgId=${orgId}`)
  }

  const columns = [
    {
      title: "STT",
      width: 70,
      render: (_: unknown, __: Organization, index: number) => index + 1,
    },
    {
      title: "Organization Name",
      dataIndex: "name",
      render: (name?: string) => name || "N/A",
      sorter: (a: Organization, b: Organization) => (a.name || "").localeCompare(b.name || ""),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (date?: string) => date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
    },
    {
      title: "Status",
      render: () => <Tag color="green">Active</Tag>,
    },
    {
      title: "Members",
      render: (_: unknown, record: Organization) => (
        <Button 
          type="link" 
          icon={<TeamOutlined />}
          onClick={() => handleViewMembers(record.id)}
        >
          View Members
        </Button>
      ),
    },
    {
      title: "Actions",
      width: 150,
      render: (_: unknown, record: Organization) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => onEdit?.(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete organization"
            description="Are you sure you want to delete this organization?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={orgs}
      pagination={{ 
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => `Total ${total} organizations`
      }}
      bordered
    />
  )
}