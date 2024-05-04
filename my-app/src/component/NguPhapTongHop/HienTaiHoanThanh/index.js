import React from "react";
import Header from "../../LandingPageComponent/Header";
import HTHT from '../../../assets/HTHT.png'
import HTHT2 from '../../../assets/HTHT2.png'
import HTHT3 from '../../../assets/HTHT3.png'
import HTHT4 from '../../../assets/HTHT4.png'
import HTHT5 from '../../../assets/HTHT5.png'

import { Image } from "antd";
import { Container } from "react-bootstrap";
import '../../../css/NguPhap.css'
export default function HienTaiHoanThanh() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>HIỆN TẠI HOÀN THÀNH</h1>

            <div className="DIV">
                <h3>I.Dấu hiệu nhận biết</h3>
                <div className="image">
                    <Image preview={false} src={HTHT} alt="#" />
                </div>
            </div>
            <div className="DIV">

                <h3 >II.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={HTHT2} alt="#" />
                    <Image className="Imagee" preview={false} src={HTHT3} alt="#" />

                </div>
            </div>
            <div className="DIV">
                <h3 >III.Các từ đi với thì HTHT</h3>
                <div className="image">
                    <Image className="Imagee" preview={false} src={HTHT4} alt="#" />
                    <Image className="Imagee" preview={false} src={HTHT5} alt="#" />

                </div>

            </div>

        </Container>
    )
}