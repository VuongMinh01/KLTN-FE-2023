import { Space, Table, Typography, Button, Col, Drawer, Form, Row, Select, Modal, Segmented } from "antd";
import React, { useState, useEffect } from "react";
import { addCustomer, getAllCustomer, getCustomerById } from "../../utils/APIRoutes";
import Input from "antd/es/input/Input";
import axios from "axios";
import { PlusOutlined, InfoOutlined } from '@ant-design/icons';

import { ToastContainer, toast } from 'react-toastify';

export default function KhachHang() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const { Option } = Select;
    const [input, setInput] = useState('');
    const [values, setValues] = useState({
        customerId: "",
        customerName: "",
        phone: "",
        email: "",
        address: "",
        carPlate: "",
    })
    const [search, setSearch] = useState();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Modal
    const showModal = () => {
        setIsModalOpen(true);
    };
    // Drawer
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    // Load data from db
    useEffect(() => {
        setLoading(true);
        getAllCustomer().then((res) => {
            setDataSource(res.data);

        });
    }, [loading]);


    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });

    }
    //  Thêm khách hàng
    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { customerId, customerName, phone, address, email, carPlate } = values;
            const { data } = await axios.post(addCustomer, {
                customerId,
                customerName,
                phone,
                address,
                email,
                carPlate,
            })
            if (data.status === false) {
                console.log("Thêm thất bại");
            }
            if (data.status === true) {
                setLoading(true)
                updateTable(data.customer)
                console.log(dataSource);
                console.log("Thêm thành công");
                onClose();
            }
        }
    };
    // Modal button
    const handleOk = async () => {
        setIsModalOpen(false);

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const updateTable = (data) => {
        setDataSource(previousState => {
            console.log(data);
            // previousState.push(data);
            console.log(previousState);
            setLoading(false)
            return previousState
        });
    }
    const handleRefresh = (e) => {
        updateTable();
        clearInput();
        console.log('refresh');
    }
    const clearInput = () => {
        setInput('');
    }
    // Tìm 
    const handleSearch = async (e) => {
        const { data } = await axios.get(getCustomerById + '/' + search);
        let dataTemp = []
        dataTemp.push(data.resultCustomer)
        setDataSource(dataTemp);

    }

    const handleOnChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    // Valid khi thêm
    const handleValidation = () => {
        const { customerId, customerName, phone, address, email } = values;
        if (customerId.length < 5 || customerId === "") {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (customerName.length < 5) {
            toast.error("Tên nhân viên phải lớn hơn 5 kí tự", toastOptions);
            return false;
        }
        else if (phone.length !== 10) {
            toast.error("Số điện thoại không hợp lệ", toastOptions);
            return false;
        }
        else if (email === "") {
            toast.error("Email không được để trống", toastOptions);
            return false;
        }
        else if (address.value === "") {
            toast.error("Địa chỉ không được để trống", toastOptions);
            return false;
        }
        return true;
    }
    // css thông báo
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };


    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Danh sách khách hàng</Typography.Title>

                {/* Nút chức năng  */}
                <Space>
                    <Button
                        type="primary"
                        onClick={showDrawer} icon={<PlusOutlined />}>
                        Thêm tài khoản
                    </Button>
                    <Input
                        type="search"
                        placeholder="Nhập khách hàng..."
                        name="searchInput"
                        onChange={(e) => handleOnChangeSearch(e)}
                        id="searchInput"
                    />

                    <Button

                        onClick={(e) => handleSearch()}>Tìm</Button>
                    <Button onClick={(e) => handleRefresh()}>Refresh</Button>
                </Space>

                {/* Table thông tin khách hàng */}
                <Table columns={[
                    {
                        key: "1",
                        title: "Mã khách hàng",
                        dataIndex: "customerId",
                    },
                    {
                        key: "2",
                        title: "Họ và tên",
                        dataIndex: "customerName",

                    },

                    {
                        key: "3",
                        title: "Địa chỉ Mail",
                        dataIndex: "email",
                    },
                    {
                        key: "4",
                        title: "Số điện thoại",
                        dataIndex: "phone",
                    },
                    {
                        key: "5",
                        title: "Địa chỉ",
                        dataIndex: "address",

                    },
                    {
                        key: "6",
                        title: "Actions",
                        render: () => {
                            return (
                                <>
                                    <InfoOutlined onClick={showModal}
                                    />
                                </>
                            )
                        }
                    },
                ]}
                    dataSource={dataSource}
                    pagination={
                        {
                            pageSize: 10,
                        }
                    }
                ></Table>
            </Space>
            <ToastContainer />

            {/* Thanh thêm khách hàng */}
            <Drawer
                title="Create a new customer"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
                extra={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={(e) => handleClick(e)} type="primary">
                            Thêm
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Mã khách hàng"
                                rules={[{ required: true, message: 'Mã khách hàng không được để trống' }]}
                            >
                                <Input
                                    onChange={(e) => handleOnChange(e)}
                                    name="customerIdSearch"
                                    placeholder="Nhập mã khách hàng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Tên khách hàng"
                                rules={[{ required: true, message: 'Tên khách hàng không được để trống' }]}
                            >
                                <Input
                                    name="customerName"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập tên khách hàng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Số điện thoại"
                                rules={[{ required: true, message: 'Số điện thoại không được để trống' }]}
                            >
                                <Input
                                    name="phone"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Địa chỉ mail"
                                rules={[{ required: true, message: 'Địa chỉ mail không được để trống' }]}
                            >
                                <Input
                                    name="email"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập địa chỉ mail"
                                    addonAfter="@gmail.com"
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item

                                label="Địa chỉ"
                                rules={[{ required: true, message: 'Please select a city' }]}
                            >
                                <Select
                                    name="address"
                                    placeholder="Please select an city">
                                    <Option value="TP.HCM">Tp.HCM</Option>
                                    <Option value="Hà Nội">Hà Nội</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item

                                label="Biển số xe"
                            >
                                <Input
                                    name="carPlate"
                                    onChange={(e) => handleOnChange(e)}
                                    placeholder="Nhập biển số xe" />
                            </Form.Item>
                        </Col>

                    </Row>


                </Form>
            </Drawer>
            {/* Thông tin chi tiết khách hàng */}
            <Modal
                width={900}
                title="Thông tin chi tiết"
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            >
                <Space>
                    <Segmented options={['Thông tin chi tiết', 'Kho xe', 'Lịch sử mua']} />

                </Space>
            </Modal>
        </div>
    )
}