import React from "react";
import { Menu } from "antd"
import { AppstoreOutlined, CarOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, TagOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
export default function SideMenu() {
    const navigate = useNavigate();
    return (
        <div className="SideMenu">

            <Menu
                // theme="dark"

                mode="inline"
                onClick={(item) => {
                    if (item.key === "/signout") {
                        localStorage.clear();
                        navigate("/login");
                    } else {
                        navigate(item.key);
                    }
                }}
                items={[
                    {
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/admin/dashboard',
                    },
                    {
                        label: "Tests",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Full Test", key: '/admin/fulltest' },
                            { label: "Mini Test", key: '/admin/minitest' },

                        ]
                    },

                    {
                        label: "Học viên",
                        key: '/admin/khachhang',
                        icon: <UserOutlined />
                    },

                    {
                        label: "Khuyến mãi",
                        key: '/admin/khuyenmai',
                        icon: <TagOutlined />
                    },

                    {
                        label: "Đăng xuất",
                        key: '/signout',
                        icon: <LogoutOutlined />,
                    },

                ]}
            >

            </Menu>

        </div>

    )
}