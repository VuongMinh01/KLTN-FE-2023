import React, { useState } from "react";
import { Menu } from "antd"
import { HomeOutlined, LogoutOutlined, UserOutlined, CheckCircleOutlined, ReadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Card } from 'antd';
export default function SideMenu({ userData }) {
    const { Meta } = Card;
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const token = localStorage.getItem("user").replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };





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
                        label: "Trang cá nhân",
                        icon: <HomeOutlined />,
                        key: '/user',

                    },
                    {
                        label: "Khoá học",
                        icon: <ReadOutlined />,
                        key: '/admin/courses',

                    },
                    {
                        label: "Bài kiểm tra Listening",
                        key: '/admin/listening',
                        icon: <ReadOutlined />
                    },
                    {
                        label: "Bài kiểm tra Reading",
                        key: '/admin/reading',
                        icon: <ReadOutlined />
                    },
                    {
                        label: "Bài kiểm tra Full Test ",
                        key: '/admin/fulltest',
                        icon: <ReadOutlined />
                    },

                    {
                        label: "Học viên",
                        key: '/admin/hocvien',
                        icon: <UserOutlined />
                    },


                    {
                        label: "Xác minh",
                        key: '/admin/verify',
                        icon: <CheckCircleOutlined />,
                    },
                    {
                        label: "Cập nhật câu hỏi",
                        key: '/admin/updatequestion',
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
