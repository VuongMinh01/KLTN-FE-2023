import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../../css/LandingPageContent.css';
import { Card } from "antd"
import Image1 from '../../../assets/listen1.jpg'
import Image2 from '../../../assets/listen22.png'
import Image3 from '../../../assets/listen32.jpg'
import Image4 from '../../../assets/listen42.jpg'
import Image5 from '../../../assets/listen52.jpg'
import Image6 from '../../../assets/listen62.jpg'
import Image7 from '../../../assets/listen7.jpg'
export default function LandingPageContent() {
    const { Meta } = Card;

    return (
        <Container>
            <Row>
                <Col xs={12} sm={12} className="ColInform" >
                    <h2>Luyện thi thử ToeicTesting247</h2>
                    <p>Chào mừng đến với TOEIC® Test Pro, trang web/ ứng dụng TOEIC® cung cấp cho người học các bài luyện tập theo từng part,
                        đề thi thử cũng như các bài tập về từ vựng và ngữ pháp.
                        Bắt đầu hành trình chinh phục chứng chỉ TOEIC® với các bài luyện tập trên trang web/ứng dụng của chúng tôi ngay hôm nay!</p>
                </Col>
            </Row>
            <Row className="RowH2" >
                <h2>Nghe</h2>
                <Col xs={6} sm={3} className="Card" >
                    <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt="example" src={Image1} />}
                    >
                        <Meta title="Part 1 Mô tả tranh" description="Thí sinh sẽ nghe 1 lần duy nhất 4 câu mô tả về một bức tranh. Sau đó chọn 1 đáp án mô tả đúng nhất bức tranh đó." />

                    </Card>
                </Col>
                <Col xs={6} sm={3} className="Card" >
                    <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt="example" src={Image2} />}
                    >
                        <Meta title="Part 2 Hỏi - Đáp" description="Thí sinh sẽ nghe 1 lần duy nhất 3 câu hồi đáp cho 1 câu hỏi hoặc 1 câu nói. Sau đó chọn câu hồi đáp phù hợp nhất." />

                    </Card>
                </Col>
                <Col xs={6} sm={3} className="Card" >
                    <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt="example" src={Image3} />}
                    >
                        <Meta title="Part 3 Đoạn hội thoại" description="Thí sinh sẽ nghe 1 lần duy nhất các đoạn hội thoại giữa 2 hoặc 3 người. Mỗi đoạn hội thoại sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất." />

                    </Card>                </Col>
                <Col xs={6} sm={3} className="" >
                    <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt="example" src={Image4} />}
                    >
                        <Meta title="Part 4 Bài nói ngắn" description="Thí sinh sẽ nghe 1 lần duy nhất các bài nói ngắn. Mỗi bài sẽ có 3 câu hỏi, mỗi câu hỏi có 4 lựa chọn. Thí sinh đọc câu hỏi sau đó chọn câu trả lời phù hợp nhất." />

                    </Card>
                </Col>
            </Row>
            <Row className="RowH2">
                <h2>Đọc</h2>
                <Col xs={6} sm="4" className="">
                    <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt="example" src={Image5} />}
                    >
                        <Meta title="Part 5 Hoàn thành câu " description=" Chọn đáp án đúng nhất trong 4 đáp án để hoàn thành câu." />
                    </Card>
                </Col>
                <Col xs={6} sm="4" className="">
                    <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt="example" src={Image6} />}
                    >
                        <Meta title="Part 6 Hoàn thành đoạn văn" description="Chọn đáp án đúng nhất trong 4 đáp án (từ, cụm từ hoặc câu) để hoàn thành đoạn văn. Mỗi đoạn văn sẽ có 4 câu hỏi." />
                    </Card>
                </Col>
                <Col xs={12} sm="4" className="">
                    <Card
                        hoverable
                        style={{ width: 250 }}
                        cover={<img alt="example" src={Image7} />}
                    >
                        <Meta title="Part 7 Đọc hiểu" description="Thí sinh sẽ đọc các bài đọc hiểu sau đó chọn đáp án đúng nhất cho các câu hỏi. Mỗi bài đọc sẽ bao gồm 2 - 5 câu hỏi." />
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
