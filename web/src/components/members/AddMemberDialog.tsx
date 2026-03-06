import { useState } from "react"
import { Modal, Form, Input, Select, Button } from "antd"
import { UserAddOutlined } from "@ant-design/icons"

export interface AddMemberValues {
  userId: string;
  role: string;
}

export default function AddMemberDialog({ onAdd }: { onAdd: (values: AddMemberValues) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [form] = Form.useForm()

  const handleOk = () => {
    form.validateFields().then((values: AddMemberValues) => {
      onAdd(values)
      form.resetFields()
      setIsOpen(false)
    })
  }

  return (
    <>
      <Button type="primary" icon={<UserAddOutlined />} onClick={() => setIsOpen(true)}>Thêm thành viên</Button>
      <Modal title="Thêm thành viên mới" open={isOpen} onOk={handleOk} onCancel={() => setIsOpen(false)} okText="Thêm" cancelText="Hủy">
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item name="userId" label="Email thành viên" rules={[{ required: true, message: 'Nhập email!' }]}>
            <Input placeholder="user@gmail.com" />
          </Form.Item>
          <Form.Item name="role" label="Vai trò" initialValue="member">
            <Select options={[{ value: 'admin', label: 'Quản trị viên (Admin)' }, { value: 'member', label: 'Thành viên (Member)' }]} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}