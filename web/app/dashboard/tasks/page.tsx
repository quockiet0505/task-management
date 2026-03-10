/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Typography, Modal } from "antd"
import { useState, useEffect } from "react"

import DashboardLayout from "@/components/layout/DashboardLayout"
import TaskBoard from "@/components/tasks/TaskBoard"
import TaskForm, { TaskFormValues } from "@/components/tasks/TaskForm"
import CreateButton from "@/components/common/CreateButton"

import { createTask, listTasks } from "@/services/taskService"
import { listOrganizations } from "@/services/orgService"

import { Task } from "@/types/task"
import { Organization } from "@/types/org"

const { Title } = Typography

export default function TasksPage() {
  const [open, setOpen] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [orgs, setOrgs] = useState<Organization[]>([])

  const loadTasks = async (orgId: string) => {
    try {
      const response = await listTasks(orgId)
      const taskArray = (response as any).tasks || response || []
      setTasks(taskArray)
    } catch (error) {
      console.error("Load tasks failed", error)
      setTasks([]) 
    }
  }

  useEffect(() => {
    const init = async () => {
      try {
        const response = await listOrganizations()
        const orgArray = (response as any).organizations || response || []
        
        setOrgs(orgArray)

        if (orgArray.length > 0) {
          await loadTasks(orgArray[0].id)
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
        organizationID: values.organizationId, 
      })

      await loadTasks(values.organizationId)
      setOpen(false)
    } catch (err) {
      console.error("Create task failed", err)
    }
  }

  return (
    <DashboardLayout>
      <Title level={3}>Tasks</Title>

      <div style={{ marginBottom: 16 }}>
        <CreateButton text="Create Task" onClick={() => setOpen(true)} />
      </div>

      <TaskBoard tasks={tasks} />

      <Modal open={open} footer={null} onCancel={() => setOpen(false)}>
        <TaskForm organizations={orgs} onSubmit={handleCreateTask} />
      </Modal>
    </DashboardLayout>
  )
}