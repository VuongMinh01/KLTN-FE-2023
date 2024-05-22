import React, { useEffect, useState } from "react";
import axios from "axios";
import { getScore } from "../../utils/APIRoutes";

import { Image } from "antd";
function ScorecardDetail() {
    const [scorecardDetail, setScorecardDetail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");
    const [submittedId, setSubmittedId] = useState("");

    const token = localStorage.getItem("user").replace(/"/g, '');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${getScore}/${id}`, { headers });
            setScorecardDetail(response.data.result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching scorecard detail:", error);
            setLoading(false);
            showToast("Mã kiểm tra không hợp lệ");
        }
    };

    function showToast(message) {
        // Replace this with your toast alert implementation
        // For example, if you're using react-toastify:
        // toast.error(message);
        alert(message);
    }

    return (
        <div style={{ background: 'white' }}>
            <h1 style={{ color: 'cornflowerblue' }}>Thông tin bài làm</h1>
            <input
                style={{ width: '500px' }}
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter ID"
            />
            <button style={{ borderRadius: '15px', background: 'cornflowerblue', color: 'white', margin: '10px 10px 10px 10px' }} onClick={handleSubmit}>Gửi</button>
            {scorecardDetail && (
                <>
                    <div style={{
                        border: '1px solid black', borderRadius: '15px', padding: '10px', backgroundColor: 'antiquewhite'
                    }}>
                        <h1 style={{ textAlign: 'center', color: 'cornflowerblue' }}>Thông tin bài làm</h1>
                        <h3>Tổng số câu đúng: {scorecardDetail.total_correct}</h3>
                        <h3>Tổng số điểm: {scorecardDetail.total_marks}</h3>
                        <h3>Thời gian: {scorecardDetail.total_time}  </h3>
                    </div>
                    <h2 style={{ color: 'cornflowerblue' }}>Câu hỏi:</h2>

                    <ul>
                        {scorecardDetail.questions.map((question, index) => (
                            <div style={{ border: '1px solid black', listStyle: 'none', padding: '10px', marginBottom: '10px', backgroundColor: 'antiquewhite' }}>
                                <li key={index}>
                                    <h3 style={{ color: 'cornflowerblue' }}>Câu {index + 1}</h3>
                                    <p>Mô tả: {question.description}</p>
                                    <h4>Đáp án đúng: {question.correct_at && question.correct_at.content_answer ? question.correct_at.content_answer : "null"}</h4>
                                    <h4>Đáp án đã chọn: {question.selected_at ? question.selected_at.content_answer : "null"}</h4>
                                    <h4>Điểm: {question.score}</h4>
                                </li>
                            </div>
                        ))}
                    </ul>
                </>
            )
            }
        </div >
    );

}

export default ScorecardDetail;
