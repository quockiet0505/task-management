"use client"

import { Button } from "antd"
import { PlusOutlined } from "@ant-design/icons"

interface Props {
  text: string
  onClick?: () => void
}

export default function CreateButton({ text, onClick }: Props) {
  return (
    <Button
      icon={<PlusOutlined />}
      type="primary"
      onClick={onClick}
    >
      {text}
    </Button>
  )
}