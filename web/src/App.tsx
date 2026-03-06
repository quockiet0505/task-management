import { Routes, Route } from "react-router-dom"

import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import TasksPage from "@/pages/dashboard/TasksPage"
import MembersPage from "@/pages/dashboard/MembersPage"
import SettingsPage from "@/pages/dashboard/SettingsPage"
import CreateOrgPage from "@/pages/org/CreateOrgPage"

export default function App() {
  return (
    <Routes>
      {/* Test Mode: Cho phép truy cập mọi trang để test giao diện */}
      <Route path="/" element={<TasksPage />} />
      <Route path="/dashboard" element={<TasksPage />} />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/org/create" element={<CreateOrgPage />} />
    </Routes>
  )
}