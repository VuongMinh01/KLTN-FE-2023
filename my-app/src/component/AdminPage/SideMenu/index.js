import React, { useState } from "react";
import { Menu } from "antd"
import { AppstoreOutlined, LogoutOutlined, ShoppingCartOutlined, TagOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Card } from 'antd';
export default function SideMenu() {
    let name1 = '';
    const { Meta } = Card;
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const [name, setName] = useState('');
    // useEffect(() => {
    //     setLoading(true);
    //     setName(name1);

    // }, [loading]);

    const handleOnChange = (e) => {
        setName({ ...name, [e.target.name]: e.target.value });

    }

    const token = localStorage.getItem("user").replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };





    return (
        <div className="SideMenu">

            <Card
                style={{ width: '100%' }}
            // cover={
            //     <img
            //         alt="example"
            //         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //     />
            // }
            >


                {/* <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                    />}
                    name="name"
                    tittle={`${name}`}
                /> */}
                {/* <input name="name" onChange={handleOnChange} /> */}
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
                        label: "Dashboard",
                        icon: <AppstoreOutlined />,
                        key: '/admin/dashboard',

                    },
                    {
                        label: "Courses",
                        icon: <ShoppingCartOutlined />,
                        key: '/admin/courses',

                    },
                    {
                        label: "Listening",
                        key: '/admin/listening',
                        icon: <UserOutlined />
                    },
                    {
                        label: "Reading",
                        key: '/admin/reading',
                        icon: <UserOutlined />
                    },
                    {
                        label: "Full Test",
                        key: '/admin/fulltest',
                        icon: <UserOutlined />
                    },

                    {
                        label: "Học viên",
                        key: '/admin/hocvien',
                        icon: <UserOutlined />
                    },


                    {
                        label: "Xác minh",
                        key: '/admin/verify',
                        icon: <LogoutOutlined />,
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
