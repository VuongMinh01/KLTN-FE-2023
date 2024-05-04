import React from "react";
import Header from "../../LandingPageComponent/Header";
import { Container } from "react-bootstrap";
import TL from '../../../assets/TL.png'
import TL2 from '../../../assets/TL2.png'
import TL3 from '../../../assets/TL3.png'
import TL4 from '../../../assets/TL4.png'

import { Image } from "antd";
import '../../../css/NguPhap.css'
export default function TuongLai() {
    return (
        <Container>
            <Header />
            <h1 style={{ color: '#FF6347' }}>TƯƠNG LAI ĐƠN VÀ TƯƠNG LAI TIẾP DIỄN</h1>

            <div className="DIV">

                <h3 >I.Cấu trúc</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={TL} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >II.Cách sử dụng</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={TL2} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >III.Phân biệt Tương lai đơn - Tương lai gần</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={TL3} alt="#" />
                </div>
            </div>
            <div className="DIV">
                <h3 >IV.Dấu hiệu nhận biết</h3>
                <div className="image">

                    <Image className="Imagee" preview={false} src={TL4} alt="#" />
                </div>
            </div>
        </Container>
    )

}