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

    const [audio1, setAudio1] = useState();




    const [image1, setImage1] = useState(null);

    const onImageChange1 = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage1(URL.createObjectURL(event.target.files[0]));
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

                <button type="submit" onClick={onSubmit}>Save</button>
                <button>Next</button>
            </form>
        </Container >
    )
}