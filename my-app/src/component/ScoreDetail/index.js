import React, { useEffect, useState } from "react";
import axios from "axios";
import { getScore } from "../../utils/APIRoutes";

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
        }
    };



    return (
        <div>
            <h1 style={{ color: 'cornflowerblue' }}>Scorecard Detail</h1>
            <input
                style={{ width: '500px' }}
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter ID"
            />
            <button style={{ borderRadius: '15px', background: 'cornflowerblue', color: 'white', margin: '10px 10px 10px 10px' }} onClick={handleSubmit}>Submit</button>
            {scorecardDetail && (
                <>
                    <p>Total Correct: {scorecardDetail.total_correct}</p>
                    <p>Total Marks: {scorecardDetail.total_marks}</p>
                    <p>Total Time: {scorecardDetail.total_time} seconds</p>
                    <h2>Questions:</h2>
                    <ul>
                        {scorecardDetail.questions.map((question, index) => (
                            <div style={{ border: '1px solid black', listStyle: 'none', padding: '10px', marginBottom: '10px' }}>
                                <li key={index}>
                                    <h3>Câu {index + 1}</h3>
                                    <p>{question.description}</p>
                                    <p>Correct Answer: {question.correct_at && question.correct_at.content_answer}</p>
                                    <p>Selected Answer: {question.selected_at && question.selected_at.content_answer}</p>
                                    <p>Score: {question.score}</p>
                                </li>
                            </div>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );

}

export default ScorecardDetail;
