import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../utils/boxOfStates";

export default function SignUp() {
  const { user, setUser } = useContext(AppContext);
  return (
    <div className="sign-up">
      <LogInForm user={user} setUser={setUser} />
      <h1>Or</h1>
      <Register />
    </div>
  );
}

function Register() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <h1>Create your account</h1>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const body = {
            email: e.target.email.value,
            login: e.target.loginR.value,
            password: e.target.passwordR.value,
            finished_rent: [],
            finished_buy: [],
          };
          setUser({ data: body, logged: true });
          navigate("/account");
        }}
      >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginR">
          <Form.Label>Login</Form.Label>
          <Form.Control type="text" placeholder="Enter login" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordR">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button className="button darkBtn" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}

function LogInForm({ user, setUser, createNotification }) {
  const navigate = useNavigate("./");

  const handleSubmit = (event) => {
    event.preventDefault();
    const { loginS, passwordS } = event.target;
    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: loginS.value,
        password: passwordS.value,
      }),
    })
      .then(function (response) {
        if (response.status === 404) {
          alert("We do not have this user in database");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data === undefined) {
          throw new Error("wrong data");
        }
        setUser({ logged: true, data });
        navigate("/account");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="login-form" style={{ zIndex: "1", position: "relative" }}>
        <div className="z-index">Server side is disconnected</div>
        <h1>Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginS">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" placeholder="Enter login" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordS">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="button darkBtn" variant="primary" type="submit">
            Log in
          </Button>
        </Form>
      </div>
    </>
  );
}
