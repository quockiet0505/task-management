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
        console.log("Raw Backend Data:", res) 
        
        if (res && res.status === "ok") {
          setStatus('ok')
        } else {
          setStatus('error')
          setErrorMsg(`Actual Data: ${JSON.stringify(res)}`)
        }
      })
      .catch((err: Error) => {
        console.error("Health Check Detailed Error:", err.message)
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
          Microservices Task Management System
        </Text>

        {/* Connection Status Block */}
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
            <Space orientation="vertical" style={{ width: '100%', justifyContent: 'center' }}>
              <Spin size="large" />
              <Text>Checking backend connection...</Text>
            </Space>
          )}

          {status === 'ok' && (
            <Space orientation="vertical" style={{ width: '100%', justifyContent: 'center' }}>
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 40 }} />
              <Title level={4} style={{ color: '#52c41a', margin: 0 }}>
                Backend Connected Successfully!
              </Title>
              <Text type="secondary">API is running smoothly (Status: OK)</Text>
            </Space>
          )}

          {status === 'error' && (
            <Space orientation="vertical" style={{ width: '100%', justifyContent: 'center' }}>
              <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: 40 }} />
              <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>
                Connection Failed
              </Title>
              <Text type="danger">
                {errorMsg === 'Failed to fetch' ? 'CORS issue or Backend is offline' : errorMsg}
              </Text>
            </Space>
          )}
        </div>

        {/* Navigation Buttons */}
        <Space size="middle">
          <Link href="/login">
            <Button 
              type="primary" 
              size="large" 
              disabled={status === 'error'}
            >
              Sign In Now
            </Button>
          </Link>
          <Link href="/register">
            <Button 
              size="large" 
              disabled={status === 'error'}
            >
              Create Account
            </Button>
          </Link>
        </Space>
      </Card>
    </div>
  )
}