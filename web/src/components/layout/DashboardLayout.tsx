import { useState, type ReactNode } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Layout, Menu, Dropdown, Avatar, theme, Button } from "antd"
import { 
  ProjectOutlined, TeamOutlined, SettingOutlined, 
  LogoutOutlined, UserOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusSquareOutlined
} from "@ant-design/icons"
import { useAuth } from "@/context/AuthContext"

const { Header, Sider, Content } = Layout

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken()

  const menuItems = [
    { key: '/dashboard', icon: <ProjectOutlined />, label: 'Bảng công việc' },
    { key: '/members', icon: <TeamOutlined />, label: 'Thành viên' },
    { key: '/org/create', icon: <PlusSquareOutlined />, label: 'Tạo Tổ chức' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Cài đặt' },
  ]

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="shadow-sm border-r">
        <div className="h-16 flex items-center justify-center border-b">
          <span className="text-xl font-bold text-blue-600 truncate px-4">
            {collapsed ? "TM" : "Task Manager"}
          </span>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className="mt-2 border-r-0 font-medium"
        />
      </Sider>

      <Layout>
        <Header style={{ background: colorBgContainer }} className="px-4 flex justify-between items-center shadow-sm border-b z-10">
          <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} onClick={() => setCollapsed(!collapsed)} className="text-lg w-16 h-16" />
          
          <Dropdown menu={{ items: [{ key: 'logout', icon: <LogoutOutlined />, label: 'Đăng xuất', danger: true, onClick: logout }] }} placement="bottomRight">
            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 px-3 py-1 rounded-md transition">
              <Avatar icon={<UserOutlined />} className="bg-blue-100 text-blue-600" />
              <span className="font-medium hidden sm:block">{user?.email || "Test User"}</span>
            </div>
          </Dropdown>
        </Header>

        <Content className="m-6 p-6 min-h-[280px] shadow-sm" style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}