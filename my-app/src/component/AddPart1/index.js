import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import '../../css/AddPart1.css';
import NavPart from "../NavPart";

export default function AddPart1() {

    const onSubmit = () => {


    }


    const onAudioChange1 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudio1(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onAudioChange2 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudio2(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onAudioChange3 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudio3(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onAudioChange4 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudio4(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onAudioChange5 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudio5(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onAudioChange6 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAudio6(URL.createObjectURL(event.target.files[0]));
        }
    }

    const [audio1, setAudio1] = useState();
    const [audio2, setAudio2] = useState();
    const [audio3, setAudio3] = useState();
    const [audio4, setAudio4] = useState();
    const [audio5, setAudio5] = useState();
    const [audio6, setAudio6] = useState();



    // const loadAudioFile = (e) => {
    //     const url = URL.createObjectURL(e.files[0]);
    //     document.getElementById('track').setAttribute("src", url);
    // }
    // const uploadAudio = (selectorAudio) => {
    //     if (selectorAudio) {
    //         setAudio(selectorAudio[0]);
    //     }
    // };


    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [image5, setImage5] = useState(null);
    const [image6, setImage6] = useState(null);

    const onImageChange1 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage1(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onImageChange2 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage2(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onImageChange3 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage3(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onImageChange4 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage4(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onImageChange5 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage5(URL.createObjectURL(event.target.files[0]));
        }
    }
    const onImageChange6 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage6(URL.createObjectURL(event.target.files[0]));
        }
    }
    return (
        <Container>
            <NavPart />
            <h1>Part 1</h1>
            <form>

                <Row className="RowQuestion" >
                    <div className="div1">

                        <h1 style={{ textAlign: 'center' }}>Question 1</h1>

                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>

                            {/* <input type="file" id="fileInput" accept=".mp4" onchange={loadAudioFile} /> <br /> */}
                            {/* <input type="file" onChange={(e) => uploadAudio(e.target.files)} /> */}

                            {/* <audio style={{ width: 300, textAlign: 'center' }} src={URL.createObjectURL(audio)} id="track" controls="true"></audio> */}
                            {/* {audio && (
                            <audio controls="true">
                                <source src={URL.createObjectURL(audio)} />
                            </audio>
                        )} */}
                            <input type="file" onChange={onAudioChange1} className="filetype" style={{ marginBottom: '10px' }} />
                            <audio controls="true" src={audio1} ></audio>
                        </div>


                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <input type="file" onChange={onImageChange1} className="filetype" style={{ marginBottom: '10px' }} />
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
                            <input type="file" onChange={onAudioChange2} className="filetype" style={{ marginBottom: '10px' }} />
                            <audio controls="true" src={audio2} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <input type="file" onChange={onImageChange2} className="filetype" style={{ marginBottom: '10px' }} />
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
                            <input type="file" onChange={onAudioChange3} className="filetype" style={{ marginBottom: '10px' }} />
                            <audio controls="true" src={audio3} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <input type="file" onChange={onImageChange3} className="filetype" style={{ marginBottom: '10px' }} />
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
                            <input type="file" onChange={onAudioChange4} className="filetype" style={{ marginBottom: '10px' }} />
                            <audio controls="true" src={audio4} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <input type="file" onChange={onImageChange4} className="filetype" style={{ marginBottom: '10px' }} />
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
                            <input type="file" onChange={onAudioChange5} className="filetype" style={{ marginBottom: '10px' }} />
                            <audio controls="true" src={audio5} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <input type="file" onChange={onImageChange5} className="filetype" style={{ marginBottom: '10px' }} />
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
                            <input type="file" onChange={onAudioChange6} className="filetype" style={{ marginBottom: '10px' }} />
                            <audio controls="true" src={audio6} ></audio>
                        </div>
                        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'grid', padding: "10px" }}>
                            <input type="file" onChange={onImageChange6} className="filetype" style={{ marginBottom: '10px' }} />
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

                <button type="submit" onClick={onSubmit}>Save</button>
                <button>Next</button>
            </form>
        </Container >
    )
}