"use client"

import { Table } from "antd"
import { Organization } from "@/types/org"

interface Props {
  orgs?: Organization[]
}

export default function OrgList({ orgs = [] }: Props) {
  return (
    <Table
      rowKey="id"
      columns={[
        {
          title: "ID",
          dataIndex: "id",
        },
        
        {
          title: "Organization",
          dataIndex: "name",
        },
        
      ]}
      dataSource={orgs}
    />
  )
}