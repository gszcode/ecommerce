import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import {
  AiOutlineBgColors,
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser
} from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom'
import { SiBrandfolder } from 'react-icons/si'
import { IoIosNotifications } from 'react-icons/io'
import { BiCategoryAlt } from 'react-icons/bi'
import { FaBloggerB, FaClipboardList } from 'react-icons/fa'
import { ImBlog } from 'react-icons/im'
import { Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const { Header, Sider, Content } = Layout

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">Shop</span>
            <span className="lg-logo">Dashboard</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === 'signup') {
            } else navigate(key)
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className="fs-4" />,
              label: 'Dashboard'
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className="fs-4" />,
              label: 'Customers'
            },
            {
              key: 'catalog',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Add Product'
                },
                {
                  key: 'list-product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Product List'
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand'
                },
                {
                  key: 'list-brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand List'
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: 'Category'
                },
                {
                  key: 'list-category',
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: 'Category List'
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: 'Color'
                },
                {
                  key: 'list-color',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: 'Color List'
                }
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Orders'
            },
            {
              key: 'blog',
              icon: <FaBloggerB className="fs-4" />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blog'
                },
                {
                  key: 'blog-list',
                  icon: <FaClipboardList className="fs-4" />,
                  label: 'Blog List'
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blog Category'
                },
                {
                  key: 'blog-category-list',
                  icon: <FaClipboardList className="fs-4" />,
                  label: 'Blog Category List'
                }
              ]
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Enquiries'
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            }
          )}
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Shopping</h5>
                <p className="mb-0">gszcode@gmail.com</p>
              </div>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <Link
                  to="/"
                  className="dropdown-item py-1 mb-1"
                  style={{ height: 'auto', lineHeight: '20px' }}
                >
                  View Profile
                </Link>
                <Link
                  to="/"
                  className="dropdown-item py-1 mb-1"
                  style={{ height: 'auto', lineHeight: '20px' }}
                >
                  Signout
                </Link>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export default MainLayout
