import React from 'react';
import { Button } from 'antd';

function StartPage({ onStart }) {
    return (
        <div className="start-page">
            <h1 style={{ textAlign: 'center' }}>Welcome to the Test</h1>
            <h3>Click the button below to start the test.</h3>
            <Button style={{ width: '90%' }} type="primary" onClick={onStart}>Start Test</Button>
        </div>
    );
}

export default StartPage;
