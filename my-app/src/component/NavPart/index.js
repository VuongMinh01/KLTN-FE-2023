import React from "react";
import { Container, Row } from "react-bootstrap";
import '../../css/AddPart1.css';
import { Link, useNavigate } from "react-router-dom";
export default function () {
    const navigate = useNavigate();
    const Part1 = () => {
        navigate('/admin/minitest/add/Part1')
    }
    const Part2 = () => {
        navigate('/admin/minitest/add/Part2')
    }
    const Part3 = () => {
        navigate('/admin/minitest/add/Part3')
    }
    return (
        <Container>
            <Row style={{ margin: '10px 10px 10px 10px' }}>
                <div>
                    <h1>Adding MiniTest</h1>
                </div>
                <div className="ButtonPart">
                    <button onClick={Part1}>Part 1</button>
                    <button onClick={Part2}>Part 2</button>
                    <button onClick={Part3}>Part 3</button>
                    <button>Part 4</button>
                    <button>Part 5</button>
                    <button>Part 6</button>
                    <button>Part 7</button>
                </div>
            </Row>
        </Container>
    )
}