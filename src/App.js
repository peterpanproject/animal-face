import React, { useState } from "react";
import * as tmImage from "@teachablemachine/image";
import styled from "styled-components";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import Result from "./components/Result";

const Styled = styled.div`
  .header {
    display: flex;
    width: 100%;
    height: 7.3vh;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 25px;
    font-weight: 600;
    background-color: #5e4232;
    border-radius: 10px;
  }
  .row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 3vh;
    .input {
      flex-direction: column;
      background-color: #f6f7fa;
      border-radius: 20px;
      padding: 25px;
    }
    .exp {
      margin-top: 5vh;
      margin-bottom: 5vh;
      font-size: 1.5rem;
    }
    .spinner {
      margin-top: 2vh;
      margin-bottom: 2vh;
    }
  }
  .button {
    border-radius: 25px;
    border: 1px solid #c43333;
    background-color: #c43333;
  }
  .image {
    width: 50vh;
    margin-top: 2vh;
    margin-bottom: 5vh;
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
  const [results, setResults] = useState([]);
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
    await setResults(prediction);
    setIsLoading(false);
    console.log("loaded");
  }
  console.log(male);
  return (
    <Styled>
      <Container>
        <Row xs="1">
          <Col className="header">
            <Header>동물상 테스트</Header>
          </Col>
          <Col className="row exp">인공지능을 이용한 동물상 TEST</Col>
          <Col className="row">
            <ButtonGroup className="gender">
              <Button onClick={() => setMale(true)} variant="secondary">
                남자
              </Button>
              <Button onClick={() => setMale(false)} variant="secondary">
                여자
              </Button>
            </ButtonGroup>
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
                className="image"
                id="img_preview"
                src={state.imagePreviewUrl}
                alt="Your Face"
                width="100%"
              />
            )}
            {isLoading && (
              <Spinner className="spinner" animation="border" role="status" />
            )}
            {results && <Result results={results} />}
          </Col>
          <Col> </Col>
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
