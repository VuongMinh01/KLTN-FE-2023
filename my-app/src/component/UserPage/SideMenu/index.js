import React, { useEffect, useState } from "react";
import { Menu } from "antd"
import { LogoutOutlined, UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Avatar, Card } from 'antd';

export default function SideMenu({ userData }) {
    const { Meta } = Card;

    const navigate = useNavigate();


    return (

        <div className="SideMenu">
            <Card style={{ width: '100%' }}>
                {userData && (
                    <Meta
                        avatar={<Avatar src={userData.avatar} />}
                        title={userData.name} // Display user's name here
                    />
                )}
            </Card>

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
                        label: "Thông tin tài khoản",
                        key: '/user/informUser',
                        icon: <UserOutlined />,
                    },
                    {
                        label: "Thay đổi mật khẩu",
                        key: '/user/changePassword',
                        icon: <UserOutlined />,
                    },


                    {
                        label: "Xác minh",
                        key: '/user/verify',
                        icon: <CheckCircleOutlined />,
                    },
                    {
                        label: "Bài làm",
                        key: '/user/scorecards',
                        icon: <CheckCircleOutlined />,
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
