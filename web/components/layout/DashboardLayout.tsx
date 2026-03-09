"use client"

import { Layout } from "antd"
import { ReactNode } from "react"
import Sidebar from "./Sidebar"

const { Header, Content, Sider } = Layout

interface Props {
  children: ReactNode
}

export default function DashboardLayout({ children }: Props) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Sidebar />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", fontWeight: 600 }}>
          Task Management System
        </Header>

        <Content style={{ padding: 24 }}>{children}</Content>
      </Layout>
    </Layout>
  )
}