import React, { useEffect, useState } from "react";
import { Menu, Select } from "antd"
import { LogoutOutlined, UserOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
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
