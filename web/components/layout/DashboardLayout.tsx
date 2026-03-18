"use client"

import { Layout, Switch } from "antd" // 1. Đã thêm import Switch
import { ReactNode } from "react"
import Sidebar from "./Sidebar"
import { useTheme } from "@/context/ThemeContext"

const { Header, Content, Sider } = Layout

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Sidebar />
      </Sider>

      <Layout>
        <Header style={{ 
          background: isDarkMode ? "#141414" : "#fff", 
          color: isDarkMode ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.88)",
          padding: "0 24px", 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          borderBottom: isDarkMode ? "1px solid #303030" : "1px solid #f0f0f0"
        }}>
          <div style={{ fontWeight: 600, fontSize: '18px' }}>
            Task Management System
          </div>
          
          {/* Nút Công tắc Dark Mode */}
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            checkedChildren="🌙" 
            unCheckedChildren="☀️" 
          />
        </Header>

        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  )
}