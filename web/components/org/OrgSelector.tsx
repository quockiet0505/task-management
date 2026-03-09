"use client"

import { Select } from "antd"

interface Org {
  id: string
  name: string
}

interface Props {
  orgs?: Org[]
}

export default function OrgSelector({ orgs = [] }: Props) {
  return (
    <Select
      placeholder="Select organization"
      style={{ width: 200 }}
      options={orgs.map((org) => ({
        label: org.name,
        value: org.id,
      }))}
    />
  )
}