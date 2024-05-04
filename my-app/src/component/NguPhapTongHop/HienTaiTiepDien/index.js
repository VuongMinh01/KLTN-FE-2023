import React from "react";
import Header from "../../LandingPageComponent/Header";
import HTTD from '../../../assets/HTTD.png'
import HTTD2 from '../../../assets/HTTD2.png'
import HTTD3 from '../../../assets/HTTD3.png'
import { Image } from "antd";
import { Container } from "react-bootstrap";
import '../../../css/NguPhap.css'
export default function HienTaiTiepDien() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>HIỆN TẠI TIẾP DIỄN</h1>

            <div className="DIV">
                <h3>I.Dấu hiệu nhận biết</h3>
                <div className="image">
                    <Image preview={false} src={HTTD} alt="#" />
                </div>
            </div>
            <div className="DIV">

                <h3 >II.Cấu trúc</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={HTTD2} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >III.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={HTTD3} alt="#" />
                </div>
            </div>

        </Container>
    )
}