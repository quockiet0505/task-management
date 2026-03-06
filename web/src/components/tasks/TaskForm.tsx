import { Form, Input, Button, Select } from "antd"

export interface TaskFormValues {
  title: string;
  priority: string;
}

export default function TaskForm({ onSubmit }: { onSubmit: (values: TaskFormValues) => void }) {
  const [form] = Form.useForm()

  return (
    <Form form={form} layout="vertical" onFinish={(values: TaskFormValues) => { onSubmit(values); form.resetFields() }}>
      <Form.Item name="title" label="Tên công việc" rules={[{ required: true, message: 'Nhập tên công việc!' }]}>
        <Input placeholder="Ví dụ: Thiết kế API..." />
      </Form.Item>
      <Form.Item name="priority" label="Mức độ ưu tiên" initialValue="medium">
        <Select options={[{ value: 'low', label: 'Thấp' }, { value: 'medium', label: 'Trung bình' }, { value: 'high', label: 'Cao' }]} />
      </Form.Item>
      <Form.Item className="mb-0 text-right">
        <Button type="primary" htmlType="submit">Tạo công việc</Button>
      </Form.Item>
    </Form>
  )
}