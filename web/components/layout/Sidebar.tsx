"use client"

import { Menu } from "antd"
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  BankOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { logout } = useAuth()

  const handleClick = (key: string) => {
    if (key === "logout") {
      logout()
      router.push("/login")
      return
    }

    router.push(key)
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[pathname]}
      onClick={(e) => handleClick(e.key)}
      items={[
        {
          key: "/dashboard/tasks",
          icon: <DashboardOutlined />,
          label: "Tasks",
        },
        {
          key: "/members",
          icon: <TeamOutlined />,
          label: "Members",
        },
        {
          key: "/org",
          icon: <BankOutlined />,
          label: "Organization",
        },
        {
          key: "/settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Logout",
          danger: true,
        },
      ]}
    />
  )
}