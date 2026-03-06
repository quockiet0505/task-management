import { Table, Tag } from "antd"
import type { ColumnsType } from "antd/es/table"

interface Member { userId: string; role: string }

export default function MemberList({ members }: { members: Member[] }) {
  const columns: ColumnsType<Member> = [
    { title: 'Email / User ID', dataIndex: 'userId', key: 'userId', className: 'font-medium' },
    {
      title: 'Vai trò', dataIndex: 'role', key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'purple' : 'blue'}>
          {role.toUpperCase()}
        </Tag>
      )
    },
  ]
  return <Table columns={columns} dataSource={members.map(m => ({ ...m, key: m.userId }))} pagination={false} />
}