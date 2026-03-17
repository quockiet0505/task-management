"use client"

import { Typography, Modal, message, Select } from "antd"
import { useState, useEffect } from "react"

import DashboardLayout from "@/components/layout/DashboardLayout"
import TaskBoard from "@/components/tasks/TaskBoard"
import TaskForm, { TaskFormValues } from "@/components/tasks/TaskForm"
import CreateButton from "@/components/common/CreateButton"

import { createTask, listTasks, updateTask, deleteTask } from "@/services/taskService"
import { listOrganizations } from "@/services/orgService"

import { Task } from "@/types/task"
import { Organization } from "@/types/org"

import dayjs from "dayjs"

const { Title } = Typography

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message
  if (typeof error === "string") return error
  return "Không rõ nguyên nhân"
}

export default function TasksPage() {
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [orgs, setOrgs] = useState<Organization[]>([])
  const [selectedOrgId, setSelectedOrgId] = useState<string>("")

  const loadTasks = async (orgId: string) => {
    try {
      const data = await listTasks(orgId)
      setTasks(data ?? [])
    } catch (error) {
      console.error("Load tasks failed", error)
      setTasks([])
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const orgArray = await listOrganizations()
        setOrgs(orgArray)
  
        if (orgArray.length > 0) {
          const defaultOrg = orgArray.find(org => org.name === "AWS") || orgArray[0]
          setSelectedOrgId(defaultOrg.id)
          await loadTasks(defaultOrg.id)
        }
      } catch (error) {
        console.error("Load orgs failed", error)
      }
    }
  
    init()
  }, [])

  const handleCreateTask = async (values: TaskFormValues) => {
    try {
      await createTask({
        title: values.title,
        status: values.status,
        priority: values.priority ?? "medium",
        organizationId: values.organizationId,
        assignedTo: values.assignedTo,
        dueDate: values.dueDate,
      })
      await loadTasks(values.organizationId)
      setOpen(false)
      message.success("Task created successfully")
    } catch (err) {
      message.error("Lỗi tạo Task: " + getErrorMessage(err))
      console.error("Create task failed", err)
    }
  }

  const handleUpdateTask = async (values: TaskFormValues) => {
    try {
      if (!editingTask) return
      
      console.log("Updating task:", {
        id: editingTask.id,
        values: values
      })

      await updateTask(editingTask.id, {
        title: values.title,
        status: values.status,
        priority: values.priority ?? "medium",
        organizationId: values.organizationId,
        assignedTo: values.assignedTo,
        dueDate: values.dueDate,
      })
      
      await loadTasks(values.organizationId)
      setEditingTask(null)
      setOpen(false)
      message.success("Task updated successfully")
    } catch (err) {
      message.error("Lỗi cập nhật Task: " + getErrorMessage(err))
      console.error("Update task failed", err)
    }
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId, selectedOrgId)
      await loadTasks(selectedOrgId)
      message.success("Task deleted successfully")
    } catch (err) {
      message.error("Lỗi xóa Task: " + getErrorMessage(err))
      console.error("Delete task failed", err)
    }
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setOpen(true)
  }

  const handleCloseForm = () => {
    setOpen(false)
    setEditingTask(null)
  }

  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId)
    loadTasks(orgId)
  }

  const currentOrg = orgs.find(org => org.id === selectedOrgId)

  return (
    <DashboardLayout>
      <Title level={3}>
        {currentOrg ? `Tasks of ${currentOrg.name}` : "Tasks"}
      </Title>

      <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center' }}>
        <Select
          placeholder="Select organization"
          style={{ width: 250 }}
          value={selectedOrgId}
          onChange={handleOrgChange}
        >
          {orgs.map(org => (
            <Select.Option key={org.id} value={org.id}>
              {org.name}
            </Select.Option>
          ))}
        </Select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <CreateButton text="Create Task" onClick={() => setOpen(true)} />
      </div>

      <TaskBoard 
        tasks={tasks} 
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <Modal 
        open={open} 
        footer={null} 
        onCancel={handleCloseForm}
        title={editingTask ? "Edit Task" : "Create Task"}
        width={600}
      >
        <TaskForm 
          organizations={orgs} 
          initialValues={editingTask ? {
            title: editingTask.title,
            status: editingTask.status,
            priority: editingTask.priority,
            organizationId: editingTask.organizationId,
            assignedTo: editingTask.assignedTo,
            dueDate: editingTask.dueDate ? new Date(editingTask.dueDate) : undefined, 
          } : undefined}
          selectedOrgId={selectedOrgId} 
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask} 
        />
      </Modal>
    </DashboardLayout>
  )
}