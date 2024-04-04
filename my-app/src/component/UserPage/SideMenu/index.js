import React, { useEffect, useState } from "react";
import { Menu, Select } from "antd"
import { AppstoreOutlined, CarOutlined, LogoutOutlined, ShopOutlined, ShoppingCartOutlined, TagOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
export default function SideMenu() {

    const navigate = useNavigate();
    const options = [
        { value: 'test1', label: 'Test 1 ' },
        { value: 'test2', label: 'Test 2' },
        { value: 'test3', label: 'Test 3' }
    ]

    return (

        <div className="SideMenu">
            <div>
                <Select options={options} style={{ width: '100%', marginBottom: '10px' }} />
            </div>

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
                        label: "Part 1",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Question 1 - 6 ", key: '/user/test1/part1' },

                        ]
                    },

                    {
                        label: "Part 2",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Question 7 - 31 ", key: '/user/test1/part2' },

                        ]
                    },

                    {
                        label: "Part 3",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Question 32 - 34 ", key: '/user/test1/part3/q1' },
                            { label: "Question 35 - 37", key: '/user/test1/part3/q2' },
                            { label: "Question 38 - 40", key: '/user/test1/part3/q3' },
                            { label: "Question 41 - 43", key: '/user/test1/part3/q4' },
                            { label: "Question 44 - 46", key: '/user/test1/part3/q5' },
                            { label: "Question 47 - 49", key: '/user/test1/part3/q6' },
                            { label: "Question 50 - 52", key: '/user/test1/part3/q7' },
                            { label: "Question 53 - 55", key: '/user/test1/part3/q8' },
                            { label: "Question 56 - 58", key: '/user/test1/part3/q9' },
                            { label: "Question 59 - 61", key: '/user/test1/part3/q10' },
                            { label: "Question 62 - 64", key: '/user/test1/part3/q11' },
                            { label: "Question 65 - 67", key: '/user/test1/part3/q12' },
                            { label: "Question 68 - 70", key: '/user/test1/part3/q13' },


                        ]
                    },
                    {
                        label: "Part 4",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Question 71 - 73 ", key: '/user/fulltest' },
                            { label: "Question 74 - 76", key: '/user/fulltest' },
                            { label: "Question 77 - 79", key: '/user/fulltest' },
                            { label: "Question 80 - 82", key: '/user/fulltest' },
                            { label: "Question 83 - 85", key: '/user/fulltest' },
                            { label: "Question 86 - 88", key: '/user/fulltest' },
                            { label: "Question 89 - 91", key: '/user/fulltest' },
                            { label: "Question 92 - 94", key: '/user/fulltest' },
                            { label: "Question 95 - 97", key: '/user/fulltest' },
                            { label: "Question 98 - 100", key: '/user/fulltest' },

                        ]
                    },
                    {
                        label: "Part 5",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Question 101 - 130 ", key: '/user/fulltest' },

                        ]
                    },
                    {
                        label: "Part 6",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Question 131 - 134 ", key: '/admin/fulltest' },
                            { label: "Question 135 - 138 ", key: '/admin/fulltest' },
                            { label: "Question 139 - 142 ", key: '/admin/fulltest' },
                            { label: "Question 143 - 146 ", key: '/admin/fulltest' },

                        ]
                    },
                    {
                        label: "Part 7",
                        icon: <ShoppingCartOutlined />,
                        children: [
                            { label: "Question 147 - 148 ", key: '/admin/fulltest' },
                            { label: "Question 149 - 150 ", key: '/admin/fulltest' },
                            { label: "Question 151 - 153 ", key: '/admin/fulltest' },
                            { label: "Question 154 - 156 ", key: '/admin/fulltest' },
                            { label: "Question 157 - 159 ", key: '/admin/fulltest' },
                            { label: "Question 160 - 162 ", key: '/admin/fulltest' },
                            { label: "Question 163 - 165 ", key: '/admin/fulltest' },
                            { label: "Question 167 - 169 ", key: '/admin/fulltest' },
                            { label: "Question 170 - 172 ", key: '/admin/fulltest' },
                            { label: "Question 173 - 175 ", key: '/admin/fulltest' },
                            { label: "Question 176 - 180 ", key: '/admin/fulltest' },
                            { label: "Question 181 - 185 ", key: '/admin/fulltest' },
                            { label: "Question 186 - 190 ", key: '/admin/fulltest' },
                            { label: "Question 191 - 195 ", key: '/admin/fulltest' },
                            { label: "Question 196 - 200 ", key: '/admin/fulltest' },

                        ]
                    },

                ]}
            >

            </Menu>


        </div>

    )
}
