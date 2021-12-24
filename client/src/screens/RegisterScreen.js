import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login, register } from "../actions/userActions";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMassage] = useState(null);
  let location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "";

  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMassage("password do not match");
    } else {
      dispatch(register(name, email, password));
    }
  };
  const responseGoogle = async (response) => {
    console.log("res", response);
    try {
      const res = await axios.post("/api/users/google_login", {
        tokenId: response.tokenId,
      });
      console.log("res1", res.data);
      setEmail(res.data.email);
      setPassword(res.data.password);

      // dispatch(register(name, email, password));
      dispatch(login(email, password));
    } catch (error) {
      console.log("error");
      alert("error");
    }
  };
  return (
    <FormContainer>
      <h1 className="text-center"> Sign UP</h1>
      {error && <h2>verifier votre coordonner {error}</h2>}
      {error && <h3 variant="danger">{message}</h3>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name </Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password Address</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirm Password </Form.Label>
          <Form.Control
            type="password"
            placeholder="confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="my-3 "
          disabled={email.length < 10}
        >
          Register
        </Button>
        <div className="hr">Or Login With</div>
        <div className="social">
          <GoogleLogin
            clientId="971874584120-fa39pgif9p2tk3rqhmue4glhk02as2tf.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
        <Row className="py-3">
          <Col>
            Have an Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
