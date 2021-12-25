import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import image from "../phone.jpg";
import { GoogleLogin } from "react-google-login";
import axios from "axios";

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
  const responseGoogle = async (response) => {
    console.log("res", response);
    try {
      const res = await axios.post("/api/users/google_login", {
        tokenId: response.tokenId,
      });
      console.log("res1", res);
      dispatch(
        login(
          res.data.email,
          `${res.data.email}6V7E69P&^{9(fSvc}8r(Jf#?Q,Hq+yF,k$&KuAc~;=?wXA"w23`
        )
      );
    } catch (error) {
      console.log("error");
      alert("vous avez changer votre mot de passe");
    }
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
            className="mx-5 my-4"
            style={{ width: "60vh", borderRadius: "5px" }}
          >
            Sign In
          </Button>

          <GoogleLogin
            className="social"
            clientId="971874584120-fa39pgif9p2tk3rqhmue4glhk02as2tf.apps.googleusercontent.com"
            buttonText="Login with google"
            onSuccess={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />

          <Row className="text-center my-4">
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
