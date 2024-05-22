import React from 'react';
import { Button, Image } from 'antd';
import Logo from '../../assets/ToeicTesting.png'
import Footer from '../LandingPageComponent/Footer';
function StartPage({ onStart }) {
    return (
        <>
            <div className="start-page" style={{ backgroundColor: 'cornflowerblue', height: '500px' }} >
                <h1 style={{ textAlign: 'center', color: 'white' }}>Chào bạn đến với bài kiểm tra</h1>
                <h3 style={{ textAlign: 'center', color: 'white' }}>Nhấn vào nút bắt đầu bài làm để làm bài</h3>
                <div style={{ textAlign: 'center' }}>
                    <Image src={Logo} alt="image" preview={false} />
                </div>
                <Button style={{ width: '50%', backgroundColor: 'white', color: 'cornflowerblue', marginRight: '450px' }} onClick={onStart}>Bắt đầu bài làm</Button>


            </div>
            <div style={{ marginTop: '10px' }}>

                <Footer />
            </div>
        </>
    );
}

export default StartPage;
