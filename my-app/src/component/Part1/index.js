import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../css/AddPart1.css';

export default function Part1() {

    const onSubmit = () => {


    }




    const [audio1, setAudio1] = useState();
    const [audio2, setAudio2] = useState();
    const [audio3, setAudio3] = useState();
    const [audio4, setAudio4] = useState();
    const [audio5, setAudio5] = useState();
    const [audio6, setAudio6] = useState();






    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);


    return (
        <Container>
            <h1>Part 1</h1>
            <form>

                <Row className="RowQuestion" >
                    <div className="div1">

                        <h1 style={{ textAlign: 'center' }}>Question 1</h1>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>


                            <audio controls="true" src={audio1} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={image1} style={{ width: 300 }} />
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

                <Row className="RowQuestion" >
                    <div className="div1">
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                            <h1 style={{ textAlign: 'center' }}>Question 2</h1>
                            <audio controls="true" src={audio2} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={image2} style={{ width: 300 }} />
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

                <Row className="RowQuestion" >
                    <div className="div1">
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                            <h1 style={{ textAlign: 'center' }}>Question 3</h1>
                            <audio controls="true" src={audio3} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={image3} style={{ width: 300 }} />
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
                <Row className="RowQuestion" >
                    <div className="div1">
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                            <h1 style={{ textAlign: 'center' }}>Question 4</h1>
                            <audio controls="true" src={audio4} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={image4} style={{ width: 300 }} />
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
                <Row className="RowQuestion" >
                    <div className="div1">
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                            <h1 style={{ textAlign: 'center' }}>Question 5</h1>
                            <audio controls="true" src={audio5} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={image5} style={{ width: 300 }} />
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
                <Row className="RowQuestion" >
                    <div className="div1">
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                            <h1 style={{ textAlign: 'center' }}>Question 6</h1>
                            <audio controls="true" src={audio6} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <img alt="preview " src={image6} style={{ width: 300 }} />
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