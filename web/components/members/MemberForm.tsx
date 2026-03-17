"use client"

import { Modal, Form, Input, Select, Button, Spin } from "antd"
import { Organization } from "@/types/org"
import { Member, Role } from "@/types/member"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"

export interface MemberFormValues {
  organizationId: string
  userEmail?: string
  role: Role
}

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: (values: MemberFormValues) => void
  initialValues?: Partial<MemberFormValues>  
  organizations?: Organization[]
  title?: string
  submitText?: string
  loading?: boolean
  currentUserRole?: Role 
  targetMember?: Member 
}

export default function MemberForm({
  open,
  onClose,
  onSubmit,
  initialValues,
  organizations = [],
  title = "Add Member",
  submitText = "Add Member",
  loading = false,
  currentUserRole,
  targetMember
}: Props) {
  const [form] = Form.useForm<MemberFormValues>()
  const { user } = useAuth()

  useEffect(() => {
    if (open) {
      if (initialValues && Object.keys(initialValues).length > 0) {
        // initialValues, set form
        form.setFieldsValue(initialValues)
      } else {
        // Không có initialValues 
        form.resetFields()
        
        //organizations có data không
        const defaultOrgId = organizations.length > 0 ? organizations[0].id : undefined
        
        form.setFieldsValue({ 
          organizationId: defaultOrgId,
          role: "member" 
        })
      }
    }
  }, [open, initialValues, form, organizations])

  // Xác định role options dựa trên quyền
  const getRoleOptions = () => {
    const options = [
      { label: "Member", value: "member", disabled: false }
    ]
    
    // Nếu là OWNER
    if (currentUserRole === "owner") {
      options.unshift({ label: "Admin", value: "admin", disabled: false })
      
      // Chỉ hiển thị Owner nếu đang edit và target là owner
      if (targetMember?.role === "owner") {
        options.unshift({ 
          label: "Owner", 
          value: "owner", 
          disabled: true 
        })
      }
    }
    
    // Nếu là ADMIN
    if (currentUserRole === "admin") {
      // Admin chỉ có thể thấy role hiện tại của target
      if (targetMember?.role === "admin") {
        options.unshift({ 
          label: "Admin", 
          value: "admin", 
          disabled: true 
        })
      }
      
      // Admin có thể thấy option admin nhưng disabled
      if (targetMember?.role === "member") {
        options.unshift({ 
          label: "Admin", 
          value: "admin", 
          disabled: true 
        })
      }
    }
    
    // Nếu đang edit chính mình
    if (targetMember?.userId === user?.id) {
      return options.map(opt => ({
        ...opt,
        disabled: true // Không thể tự sửa role
      }))
    }
    
    return options
  }

  return (
    <Modal
      title={title}
      open={open}
      footer={null}
      onCancel={() => {
        form.resetFields()
        onClose()
      }}
      destroyOnClose
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Organization"
            name="organizationId"
            rules={[{ required: true, message: "Please select organization" }]}
          >
            <Select
              placeholder="Select organization"
              disabled={!!initialValues?.organizationId || loading}
            >
              {organizations.map((org) => (
                <Select.Option key={org.id} value={org.id}>
                  {org.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {!initialValues && ( 
            <Form.Item
              label="User Email"
              name="userEmail"
              rules={[
                { required: true, message: "Please enter user email" },
                { type: 'email', message: "Please enter a valid email" }
              ]}
            >
              <Input placeholder="user@example.com" disabled={loading} />
            </Form.Item>
          )}

          {initialValues && ( 
            <Form.Item label="Email" name="userEmail">
              <Input disabled />
            </Form.Item>
          )}

          <Form.Item 
            label="Role" 
            name="role" 
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select disabled={loading}>
              {getRoleOptions().map(opt => (
                <Select.Option 
                  key={opt.value} 
                  value={opt.value} 
                  disabled={opt.disabled}
                >
                  {opt.label} {opt.disabled ? "(Locked)" : ""}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {targetMember?.userId === user?.id && (
            <div style={{ color: 'orange', marginBottom: 16 }}>
              You cannot change your own role. Contact owner for role changes.
            </div>
          )}

          {currentUserRole === "admin" && targetMember?.role === "admin" && (
            <div style={{ color: 'orange', marginBottom: 16 }}>
              You cannot modify another admin&apos;s role.
            </div>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {submitText}
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  )
}