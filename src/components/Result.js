import React from "react";
import { ProgressBar, Container, Row, Col } from "react-bootstrap";
// import {ProgressBar} from 'react-bootstrap'
import styled from "styled-components";

const BarStyle = styled.div`
  width: 100%;
  .barDiv {
    margin-top: 1.5vh;
    .bar {
      height: 3vh;
    }
  }
`;

const Result = (results) => {
  console.log(results);
  const variants = ["success", "info", "warning", "danger"];
  return (
    <BarStyle>
      <Container>
        {results.results.length > 0
          ? results.results.map((result) => (
              <Row className="barDiv">
                <Col xs={1}> {result.className}</Col>
                <Col xs={10}>
                  <ProgressBar
                    striped
                    className="bar"
                    label={`${Math.round(result.probability * 100)}%`}
                    key={result.className}
                    variant={variants[results.results.indexOf(result)]}
                    now={Math.round(result.probability * 100)}
                  />
                </Col>
              </Row>
            ))
          : null}
      </Container>
    </BarStyle>
  );
};

export default Result;
