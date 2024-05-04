import React from "react";
import Header from "../../LandingPageComponent/Header";
import { Container } from "react-bootstrap";
import HTD from '../../../assets/HTD.png'
import HTD2 from '../../../assets/HTD2.png'
import HTD3 from '../../../assets/HTD3.png'
import { Image } from "antd";
import '../../../css/NguPhap.css'
export default function HienTaiDon() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>HIỆN TẠI ĐƠN</h1>

            <div className="DIV">
                <h3>I.Dấu hiệu nhận biết</h3>
                <div className="image">
                    <Image preview={false} src={HTD} alt="#" />
                </div>
            </div>
            <div className="DIV">

                <h3 >II.Cấu trúc</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={HTD2} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >III.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={HTD3} alt="#" />
                </div>
            </div>

        </Container>
    )

}