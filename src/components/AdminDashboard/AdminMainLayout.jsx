import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { FaBloggerB, FaRegQuestionCircle, FaUserCircle } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";
import { Button, Layout, Menu, theme } from "antd";
import { IoMdNotifications } from "react-icons/io";
import { Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";
const { Header, Sider, Content } = Layout;




const AdminMainLayout = () => {
  const [collapsed, setCollapsed] = useState(true); // Initial state for collapsed menu
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);



  return (
    <Layout className="h-screen overflow-hidden w-full"> 
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical py-5">
          <h2 className="text-yellow-300 text-center text-xl font-bold font-sans">
            ADMIN
          </h2>
          {/* <img src={logo} alt="" className="absolute top-3 left-5" /> */}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
              logout();
              // console.log("signout");
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "/admin/dashboard",
              icon: <AiOutlineDashboard className="h-5 w-5" />,
              label: "Dashboard",
            },
            {
              key: "/admin/customers",
              icon: <AiOutlineUser className="h-5 w-5" />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className="h-5 w-5" />,
              label: "Catalog",
              children: [
                {
                  key: "/admin/add-product",
                  icon: <AiOutlineShoppingCart className="h-5 w-5" />,
                  label: "Add product",
                },
                {
                  key: "/admin/all-product",
                  icon: <AiOutlineShoppingCart className="h-5 w-5" />,
                  label: "All products",
                },
                {
                  key: "/admin/add-category",
                  icon: <TbCategoryPlus className="h-5 w-5" />,
                  label: "Add category",
                },
                {
                  key: "/admin/all-category",
                  icon: <BiCategory className="h-5 w-5" />,
                  label: "All categories",
                },
              ],
            },
            {
              key: "/admin/orders",
              icon: <HiOutlineClipboardList className="h-5 w-5" />,
              label: "Orders",
            },
            {
              key: "blog",
              icon: <FaBloggerB className="h-5 w-5" />,
              label: "Blogs",
              children: [
                {
                  key: "/admin/add-blog",
                  icon: <ImBlog className="h-5 w-5" />,
                  label: "Add blog",
                },
                {
                  key: "/admin/all-blogs",
                  icon: <FaBloggerB className="h-5 w-5" />,
                  label: "All blogs",
                },
              ],
            },
            {
              key: "/admin/enquiries",
              icon: <FaRegQuestionCircle className="h-5 w-5" />,
              label: "Enquiries",
            },
            {
              key: "signout",
              icon: <MdOutlineLogout className="h-5 w-5" />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between ps-3 pe-5"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="flex gap-3 items-center p-5">
            <div className="flex items-center gap-2">
              <div className="relative"><IoMdNotifications className="h-7 w-7" /><span className="absolute bg-yellow-500 text-black rounded-full -top-1 -right-1 px-1 py-0.5 text-xs">3</span></div>
              <FaUserCircle className="h-7 w-7" />
            </div>
            <span className="flex flex-col">
              <h2 className="mb-0">John</h2>{" "}
              <p className="mb-0">admin@gmail.com</p>{" "}
            </span>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminMainLayout;
