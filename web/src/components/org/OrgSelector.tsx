import { Select } from "antd"

export default function OrgSelector() {
  return (
    <Select
      defaultValue="org1"
      className="w-full"
      options={[
        { value: 'org1', label: 'Tổ chức Biwoco' },
        { value: 'org2', label: 'Dự án Volta' },
      ]}
    />
  )
}