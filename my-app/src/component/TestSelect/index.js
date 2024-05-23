import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAllTestReading } from "../../utils/APIRoutes";
import { Select } from "antd";

const { Option } = Select;

const TestSelect = () => {
    const [testIds, setTestIds] = useState([]);
    const [selectedTestId, setSelectedTestId] = useState('');
    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    useEffect(() => {
        // Fetch all test data
        axios.get(getAllTestReading, {
            params: {
                limit: 10,
                page: 1,
            },
            headers
        })
            .then(response => {
                const testData = response.data.result;
                if (testData && testData.tests && testData.tests.length > 0) {
                    // Extract test IDs from the tests array
                    const ids = testData.tests.map(test => test._id);
                    setTestIds(ids);
                }
            })
            .catch(error => {
                console.error("Error fetching test data:", error);
            });
    }, []);

    const handleTestChange = (value) => {
        setSelectedTestId(value);
    };

    return (
        <div>
            <Select placeholder="Select a test" onChange={handleTestChange}>
                {testIds.map(testId => (
                    <Option key={testId} value={testId}>{testId}</Option>
                ))}
            </Select>
        </div>
    );
};

export default TestSelect;
