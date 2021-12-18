import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import image from "../phone.jpg";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let location = useLocation();
  let navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "";
  console.log("object", redirect);

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Row>
      <Col
        md={6}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "95vh",
        }}
      ></Col>

      <Col md={6} style={{ width: "100vh" }}>
        <h1 style={{ textAlign: "center" }}> Sign In</h1>
        <i
          className="fas fa-lock"
          style={{
            fontSize: "35px",
            color: "#406882 ",
            display: "flex",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        ></i>
        {error && <h2 className="text-center">CHECK YOUR COORDINATE </h2>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email" className="mx-5">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="mx-5">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3 "
            disabled={email.length < 10}
            className="mx-5 my-5"
            style={{ width: "60vh", borderRadius: "5px" }}
          >
            Sign In
          </Button>

          <Row className="text-center">
            <Col>
              New Coustomer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default LoginScreen;
