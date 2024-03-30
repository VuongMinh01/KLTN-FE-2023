import React, { useEffect, useState } from "react";
import { Menu } from "antd"
import { AppstoreOutlined, CarOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, TagOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Avatar, Card } from 'antd';
import axios from "axios";
import { getUser } from "../../../utils/APIRoutes";
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
    // let token1 = token.replace(/"/g, '');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(getUser
        ,
        config
    ).then((response) => {
        const checkToken = response.data.result.name;
        console.log(checkToken);
        name1 = checkToken;
        console.log(response.data);
    });




    return (
        <div className="SideMenu">
            <button >d</button>

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
                <input name="name" onChange={handleOnChange} />
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
