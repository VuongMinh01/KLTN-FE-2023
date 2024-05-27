import { Button, Input, Select, Table } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
const { Option } = Select;

export default function QuestionsPage() {


    return (
        <Container fluid>
            <div>
                <Select
                    style={{ width: '200px', marginRight: '20px' }} >
                    <Option >Part 1</Option>

                </Select>
                <Button type="primary" >Gửi</Button>
            </div>
            <Table
                scroll={{ y: "max-content", }}
                columns={[
                    {
                        key: "1",
                        title: "Mã câu hỏi",
                        dataIndex: "_id",
                    },
                    {
                        key: "2",
                        title: "Mô tả",
                        dataIndex: "description",
                    },
                    {
                        key: "3",
                        title: "Nội dung",
                        dataIndex: "content",
                    },
                    {
                        key: "4",
                        title: "Điểm",
                        dataIndex: "score",
                    },
                    {
                        key: "6",
                        title: "Actions",
                        render: (record) => (
                            <div>

                            </div>
                        ),
                    },
                ]}


            />
        </Container>
    )
}