"use client"

import { Typography } from "antd"
import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useAuth } from "@/context/AuthContext"

import ProfileList from "@/components/settings/ProfileList"
import EditProfileDialog from "@/components/settings/EditProfileDialog"

const { Title } = Typography

export default function SettingsPage() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <DashboardLayout>
      <Title level={3}>Settings</Title>

      <ProfileList
        user={user}
        onEdit={() => setOpen(true)}
      />

      <EditProfileDialog
        open={open}
        onClose={() => setOpen(false)}
        initialValues={{
          fullName: user?.fullName,
          phoneNumber: user?.phoneNumber,
        }}
      />
    </DashboardLayout>
  )
}