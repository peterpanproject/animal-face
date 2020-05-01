import React, { useState } from "react";
import * as tmImage from "@teachablemachine/image";
import "./App.css";
import styled from "styled-components";
// import Switch from "./components/Switch";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/DropdownToggle";

const Styled = styled.div`
  .header {
    display: flex;
    width: 100%;
    height: 8.3vh;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 25px;
    font-weight: 600;
    background-color: #c43333;
  }
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    .input {
      flex-direction: column;
    }
    .exp {
      margin-top: 5vh;
      margin-bottom: 5vh;
    }
  }
  .button {
    border-radius: 25px;
    border: 1px solid #c43333;
    background-color: #c43333;
  }
`;
const Header = styled.div``;

const InputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
  width: 50vh;
  height: 50vh;
  border-radius: 10px;
  border: 5px dashed #555555;
  cursor: pointer;
`;

const Input = styled.input.attrs((props) => ({ type: "file" }))`
  display: none;
`;

const App = () => {
  const [result, setResult] = useState([]);
  const [male, setMale] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [isLoading, setIsLoading] = useState(null);
  const [state, setState] = useState({
    file: "",
    imagePreviewUrl: "",
  });
  const URL = "https://teachablemachine.withgoogle.com/models/EeDNh2EX7/";
  let model;

  const onChange = async (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    setIsLoading(true);
    console.log("loading...");

    reader.onloadend = () => {
      setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
    setIsDone(true);
    init().then(() => predict());
    // console.log(e.target.files[0]);
  };

  const onChangeGender = () => {
    setMale(!male);
  };

  // Load the image model and setup the webcam
  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
  }

  async function predict() {
    const prediction = await model.predict(
      document.getElementById("img_preview")
    );
    await setResult(prediction);
    setIsLoading(false);
    console.log("loaded");
  }

  return (
    <Styled>
      <Container>
        <Row xs="1">
          <Col className="header">
            <Header>동물상 테스트</Header>
          </Col>
          <Col className="row exp">
            <h2>인공지능을 이용한 동물상 TEST</h2>
          </Col>
          <Col className="row">
            <ButtonGroup className="gender">
              <Button variant="secondary">남자</Button>
              <Button variant="secondary">여자</Button>
            </ButtonGroup>
            {/* <Switch isChecked={isChecked} changeGender={onChangeGender} /> */}
          </Col>
          <Col className="row input">
            {!isDone ? (
              <label>
                <InputDiv>이곳을 눌러서 사진을 올리세요.</InputDiv>
                <Input
                  onChange={(e) => {
                    onChange(e);
                  }}
                  disabled={isDone}
                />
              </label>
            ) : null}
            {state.imagePreviewUrl && (
              <img
                id="img_preview"
                src={state.imagePreviewUrl}
                alt="Your Face"
              />
            )}
            {isLoading && <Spinner animation="border" role="status" />}
            {result &&
              result.map((e) => (
                <div>
                  {e.className}
                  {Math.round(e.probability * 100)}
                  <p />
                </div>
              ))}
          </Col>
          <Col className="row">
            <Button className="button">中文</Button>
            <Button className="button">ENG</Button>
          </Col>
          <Col className="row">광고</Col>
        </Row>
      </Container>
    </Styled>
  );
};

export default App;
