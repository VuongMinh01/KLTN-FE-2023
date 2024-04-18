import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../css/AddPart1.css';

export default function Part1() {

    const onSubmit = () => {


    }




    const [audio, setAudio] = useState();






    const [image, setImage] = useState(null);


    return (

        <Container>
            <h1>Part 1</h1>
            <form>

                <Row className="RowQuestion" >
                    <div className="div1">

                        <h3 style={{ textAlign: 'left', marginLeft: '50px' }}>Câu 1</h3>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls="true" src={audio} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={image} style={{ width: 300 }} />
                        </div>

                        <div style={{ textAlign: 'justify', margin: '10px 10px 10px 50px' }}>
                            <input type="radio" id="A" name="Question1" value="A" />
                            <label for="A">A</label><br />
                            <input type="radio" id="B" name="Question1" value="B" />
                            <label for="B">B</label><br />
                            <input type="radio" id="C" name="Question1" value="C" />
                            <label for="C">C</label><br />
                            <input type="radio" id="D" name="Question1" value="D" />
                            <label for="D">D</label><br />
                        </div>
                    </div>

                </Row>

                <button onClick={onSubmit}>Next</button>
            </form>
        </Container >
    )
}