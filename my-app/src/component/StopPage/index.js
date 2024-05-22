import React from 'react';
import { Button, Image } from 'antd';
import Footer from '../LandingPageComponent/Footer';
import Logo from '../../assets/ToeicTesting.png'


const StopPage = ({ onContinue }) => {
    return (
        <>
            <div className="start-page" style={{ backgroundColor: 'cornflowerblue', height: '500px' }} >
                <h1 style={{ textAlign: 'center', color: 'white' }}>Bài kiểm tra đã tạm ngừng</h1>
                <h3 style={{ textAlign: 'center', color: 'white' }}>Bạn đang tạm ngừng bài làm. Nhấn nút tiếp tục để làm bài</h3>
                <div style={{ textAlign: 'center' }}>
                    <Image src={Logo} alt="image" preview={false} />
                </div>
                <Button style={{ width: '50%', backgroundColor: 'white', color: 'cornflowerblue', marginRight: '450px' }} onClick={onContinue}>Tiếp tục bài làm</Button>


            </div>
            <div style={{ marginTop: '10px' }}>

                <Footer />
            </div>
        </>
    )
};

export default StopPage;
