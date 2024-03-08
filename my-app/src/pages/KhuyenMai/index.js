import { Button, Space, Table, Typography, Modal } from "antd";
import React, { useState, useEffect } from "react";

import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Input from "antd/es/input/Input";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { addCoupon, deleteCoupon, getAllCoupon, updateCoupon } from "../../utils/APIRoutes";
export default function KhuyenMai() {
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [values, setValues] = useState({
        couponId: "",
        couponName: "",
        couponContent: "",
        startDate: "",
        endDate: "",
        types: ","
    });

    useEffect(() => {
        setLoading(true);
        // API get danh sach db

        getAllCoupon().then((res) => {
            setDataSource(res.data);
        });
    }, [loading]);

    const handleValidation = () => {
        const { couponId, couponName, couponContent, startDate, endDate, types } = values;
        if (couponId.length < 5) {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;

        }
        if (couponName.length < 5) {
            toast.error("Id phải lớn hơn 5 kí tự", toastOptions);
            return false;

        }
        if (couponContent === "") {
            toast.error("Thông tin không được để rỗng", toastOptions);
            return false;

        }
        if (startDate === "") {
            toast.error("Ngày bắt đầu không được để rỗng", toastOptions);
            return false;

        }
        if (endDate === "") {
            toast.error("Ngày kết thúc không được để rỗng", toastOptions);
            return false;

        }
        if (types === "") {
            toast.error("Loại không được để rỗng", toastOptions);
            return false;
        }
        return true;
    }

    const handleClick = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { couponId, couponName, couponContent, startDate, endDate, types } = values;
            const { data } = await axios.post(addCoupon, {
                couponId,
                couponName,
                couponContent,
                startDate,
                endDate,
                types,
            })
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
                console.log("Thêm thất bại");
            }
            if (data.status === true) {
                setLoading(true)
                updateTable(data.coupon)
                localStorage.setItem("car-app-coupon", JSON.stringify(data.coupon));
                console.log("Thêm thành công");

            }
        }
    };
    const updateTable = (data) => {
        setDataSource(previousState => {
            console.log(data);
            // previousState.push(data);
            console.log(previousState);
            setLoading(false)
            return previousState
        });
    }
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        draggable: true,
        pauseOnHover: true,
        theme: "dark"
    };
    const handleOnChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onDeleteService = async (e) => {
        console.log(e.couponId);
        const { couponId, couponName, couponContent, startDate, endDate, types } = values;
        const { data } = await axios.delete(deleteCoupon, {
            couponId,
            couponName,
            couponContent,
            startDate,
            endDate,
            types,
        })
        setLoading(true)
        updateTable(data.coupon)
        localStorage.clear();
        console.log('deleted');
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        const { couponId, couponName, couponContent, startDate, endDate, types } = values;
        const { data } = await axios.put(updateCoupon, {
            couponId,
            couponName,
            couponContent,
            startDate,
            endDate,
            types,
        });
        setLoading(true)
        updateTable(data.coupon)
        console.log('updated');
        setIsModalOpen(false);
        console.log(data);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Space size={20} direction={"vertical"}>

                <Typography.Title level={4}>Dịch vụ</Typography.Title>
                <Space>
                    <Input placeholder="Mã khuyến mãi" name="couponId" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Tên khuyến mãi" name="couponName" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Ngày bắt đầu" name="startDate" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Ngày kết thúc" name="endDate" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Thông tin chung" name="couponContent" onChange={(e) => handleOnChange(e)} />
                    <Input placeholder="Loại" name="types" onChange={(e) => handleOnChange(e)} />
                    <Button onClick={(e) => handleClick(e)}>Thêm</Button>

                </Space>
                <Table columns={[
                    {
                        key: "1",
                        title: "Id",
                        dataIndex: "_id",
                    },
                    {
                        key: "2",
                        title: "Mã khuyến mãi",
                        dataIndex: "couponId",
                    },

                    {
                        key: "3",
                        title: "Tên khuyến mãi",
                        dataIndex: "couponName",
                    },
                    {
                        key: "4",
                        title: "Ngày bắt đầu",
                        dataIndex: "startDate",
                    },
                    {
                        key: "5",
                        title: "Ngày kết thúc",
                        dataIndex: "endDate",
                    },
                    {
                        key: "6",
                        title: "Thông tin chung",
                        dataIndex: "couponContent",
                    },
                    {
                        key: "7",
                        title: "Loai",
                        dataIndex: "types",
                    },

                    {
                        key: "8",
                        title: "Actions",
                        render: (record) => {
                            return (
                                <>
                                    <EditOutlined onClick={showModal} />
                                    <DeleteOutlined onClick={() => onDeleteService(record)} style={{ color: "red", marginLeft: "12px" }} />
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

            <Modal
                title="Cập nhật thông tin khuyến mãi"
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            >
                <Input placeholder="Tên khuyến mãi" name="couponName" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Ngày bắt đầu" name="startDate" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Ngày kết thúc" name="endDate" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Thông tin chung" name="couponContent" onChange={(e) => handleOnChange(e)} />
                <Input placeholder="Loại" name="types" onChange={(e) => handleOnChange(e)} />
            </Modal>
        </div>
    )
}
