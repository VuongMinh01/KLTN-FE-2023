import React from 'react';
import { Button } from 'antd';
const StopPage = ({ onContinue }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px', }}>
            <h1>Test Paused</h1>
            <p>You've paused the test. Click below to continue.</p>
            <Button type="primary" onClick={onContinue}>Continue Test</Button>
        </div>

    );
};

export default StopPage;
