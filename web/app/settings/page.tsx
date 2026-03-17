"use client"

import { Typography, message } from "antd"
import { useState } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import { useAuth } from "@/context/AuthContext"

import ProfileList from "@/components/settings/ProfileList"
import EditProfileDialog from "@/components/settings/EditProfileDialog"
import ChangePasswordModal from "@/components/settings/ChangePasswordModal"
import { getMe } from "@/services/userService"

const { Title } = Typography

export default function SettingsPage() {
  const { user, login } = useAuth()
  const [openEdit, setOpenEdit] = useState(false)
  const [openChangePassword, setOpenChangePassword] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)

  const handleEditSuccess = async () => {
    // Reload user data
    const updatedUser = await getMe()
    setCurrentUser(updatedUser)
    // Update context
    login(updatedUser, localStorage.getItem('token') || '')
    message.success("Profile updated successfully")
  }

  return (
    <DashboardLayout>
      <Title level={3}>Settings</Title>

      <ProfileList
        user={currentUser}
        onEdit={() => setOpenEdit(true)}
        onChangePassword={() => setOpenChangePassword(true)}
      />

      <EditProfileDialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        initialValues={{
          fullName: currentUser?.fullName,
          phoneNumber: currentUser?.phoneNumber,
        }}
        onSuccess={handleEditSuccess}
      />

      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </DashboardLayout>
  )
}