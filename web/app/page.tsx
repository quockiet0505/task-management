/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { Typography, Button, Space, Card, Spin } from "antd"
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import Link from "next/link"
import { apiClient } from "@/services/apiClient"

const { Title, Text } = Typography

export default function HomePage() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'error'>('checking')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    apiClient("/health")
      .then((res: any) => {
        console.log("Dữ liệu gốc từ Backend:", res) // Xem trong F12
        
        if (res && res.status === "ok") {
          setStatus('ok')
        } else {
          setStatus('error')
          setErrorMsg(`Dữ liệu thực tế: ${JSON.stringify(res)}`)
        }
      })
      .catch((err: Error) => {
        console.error("Lỗi Health Check chi tiết:", err.message)
        setStatus('error')
        setErrorMsg(err.message)
      })
  }, [])

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
        padding: 20
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          textAlign: "center",
          boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
          borderRadius: 12,
        }}
      >
        <Title level={2} style={{ marginBottom: 8 }}> Task Management</Title>
        <Text type="secondary" style={{ fontSize: 16 }}>
          Hệ thống quản lý công việc Microservices
        </Text>

        {/* Khối hiển thị trạng thái kết nối */}
        <div
          style={{
            margin: "32px 0",
            padding: "20px",
            background: status === 'error' ? '#fff2f0' : '#f6ffed',
            border: `1px solid ${status === 'error' ? '#ffccc7' : '#b7eb8f'}`,
            borderRadius: 8,
          }}
        >
          {status === 'checking' && (
            <Space className="w-full justify-center" style={{ display: 'flex', flexDirection: 'column' }}>
              <Spin size="large" />
              <Text>Đang kiểm tra kết nối Backend...</Text>
            </Space>
          )}

          {status === 'ok' && (
            <Space className="w-full justify-center" style={{ display: 'flex', flexDirection: 'column' }}>
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 40 }} />
              <Title level={4} style={{ color: '#52c41a', margin: 0 }}>
                Kết nối Backend thành công!
              </Title>
              <Text type="secondary">API đang hoạt động ổn định (Status: OK)</Text>
            </Space>
          )}

          {status === 'error' && (
            <Space className="w-full justify-center" style={{ display: 'flex', flexDirection: 'column' }}>
              <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 40 }} />
              <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>
                Mất kết nối với Backend
              </Title>
              <Text type="danger">{errorMsg === 'Failed to fetch' ? 'Lỗi CORS hoặc Backend chưa chạy' : errorMsg}</Text>
            </Space>
          )}
        </div>

        {/* Các nút điều hướng */}
        <Space size="middle">
          <Link href="/login">
            <Button 
              type="primary" 
              size="large" 
              disabled={status === 'error'}
            >
              Đăng nhập ngay
            </Button>
          </Link>
          <Link href="/register">
            <Button 
              size="large" 
              disabled={status === 'error'}
            >
              Tạo tài khoản
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  )
}