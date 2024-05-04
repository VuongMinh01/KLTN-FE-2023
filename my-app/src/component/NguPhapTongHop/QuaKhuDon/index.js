import React from "react";
import Header from "../../LandingPageComponent/Header";
import { Container } from "react-bootstrap";
import QKD from '../../../assets/QKD.png'
import QKD2 from '../../../assets/QKD2.png'
import QKD3 from '../../../assets/QKD3.png'
import { Image } from "antd";
import '../../../css/NguPhap.css'
export default function QuaKhuDon() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>QUÁ KHỨ ĐƠN</h1>

            <div className="DIV">
                <h3>I.Dấu hiệu nhận biết</h3>
                <div className="image">
                    <Image preview={false} src={QKD3} alt="#" />
                </div>
            </div>
            <div className="DIV">

                <h3 >II.Cấu trúc</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKD} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >III.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={QKD2} alt="#" />
                </div>
            </div>

        </Container>
    )

}