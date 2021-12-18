import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#6998AB" }}>
      <Container>
        <Row>
          <Col className="text-center my-3 ">
            eDonec by Ahmed Yazid Mejri 😏
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
