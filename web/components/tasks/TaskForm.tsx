"use client"

import { Form, Input, Button, Select, DatePicker } from "antd"
import { Organization } from "@/types/org" 
import { Member } from "@/types/member"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs" 
import { listMembers } from "@/services/memberService"

export interface TaskFormValues {
  title: string
  status: "todo" | "in-progress" | "done"
  priority?: "low" | "medium" | "high"
  organizationId: string 
  assignedTo?: string
  dueDate?: Date 
}

interface AntdFormValues extends Omit<TaskFormValues, 'dueDate'> {
  dueDate?: Dayjs | null;
}

interface Props {
  organizations: Organization[] 
  initialValues?: TaskFormValues
  selectedOrgId?: string 
  onSubmit: (values: TaskFormValues) => void
}

export default function TaskForm({ organizations, initialValues, selectedOrgId, onSubmit }: Props) {
  const [form] = Form.useForm()
  const [members, setMembers] = useState<Member[]>([])
  const currentOrgId = Form.useWatch('organizationId', form)

  useEffect(() => {
    const loadMembers = async () => {
      if (currentOrgId) {
        try {
          const data = await listMembers(currentOrgId)
          setMembers(data)
        } catch (error) {
          console.error("Failed to load members:", error)
        }
      }
    }
    loadMembers()
  }, [currentOrgId])

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        dueDate: initialValues.dueDate ? dayjs(initialValues.dueDate) : undefined,
      })
    } else {
      form.resetFields()
      form.setFieldsValue({
        status: "todo",
        priority: "medium",
        organizationId: selectedOrgId || (organizations?.length > 0 ? organizations[0].id : undefined)
      })
    }
  }, [initialValues, selectedOrgId, organizations, form])

  const handleFinish = (values: AntdFormValues) => {
    onSubmit({
      ...values,
      dueDate: values.dueDate ? values.dueDate.toDate() : undefined 
    })
  }

  return (
    <Form 
      form={form}
      layout="vertical" 
      onFinish={handleFinish}
    >
      <Form.Item
        label="Organization"
        name="organizationId"
        rules={[{ required: true, message: "Please select organization" }]}
      >
        <Select 
          disabled={!!initialValues} 
          placeholder="Select organization"
          options={organizations.map((org) => ({
            label: org.name,
            value: org.id
          }))}
        />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter task title" }]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>

      <Form.Item label="Status" name="status">
        <Select
          options={[
            { label: "Todo", value: "todo" },
            { label: "In Progress", value: "in-progress" },
            { label: "Done", value: "done" }
          ]}
        />
      </Form.Item>

      <Form.Item label="Priority" name="priority">
        <Select
          options={[
            { label: "Low", value: "low" },
            { label: "Medium", value: "medium" },
            { label: "High", value: "high" }
          ]}
        />
      </Form.Item>

      <Form.Item label="Assigned To" name="assignedTo">
        <Select 
          placeholder="Select member"
          allowClear
          disabled={!currentOrgId}
          options={members.map(member => ({
            label: member.fullName || member.email,
            value: member.userId
          }))}
        />
      </Form.Item>

      <Form.Item label="Due Date" name="dueDate">
        <DatePicker 
          style={{ width: '100%' }} 
          format="DD/MM/YYYY"
          placeholder="Select due date"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {initialValues ? "Update Task" : "Create Task"}
        </Button>
      </Form.Item>
    </Form>
  )
}