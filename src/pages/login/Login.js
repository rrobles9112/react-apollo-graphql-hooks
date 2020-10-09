import React, {useEffect} from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import useLoginMutation from "../../hooks/useLoginMutation";
import { useDispatch, useTrackedState } from "../../store";

export const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const state = useTrackedState();
  const doLogin = useLoginMutation();
  const mountedComponent = useEffect(() => {
    console.log(state.isAuthenticated)
  },[])

  const handleLogin = (e) => {
    e.preventDefault();
    doLogin({
      variables: {
        cellphone: e.target.elements.username.value,
        password: e.target.elements.pass.value,
      },
      // variables: { username: "testuser", password: "testpass" },
    }).then(
      (data) => {
        console.log(data);
        let token = data.data.login.token;
        if(token){
          localStorage.setItem("token", data.data.login.token);
          dispatch({type:'SET_TOKEN', token});
          dispatch({type:'SET_AUTHENTICATION', isAuthenticated:true});
          history.push("/list");
        }else{
          localStorage.clear();
          dispatch({type:'SET_TOKEN', payload:null});
          dispatch({type:'SET_AUTHENTICATION', payload:false});
        }

      },
      (e) => {
        // history.push("/list");

        console.log(e);
      }
    );
  };
  return (
    <>
      <Container className="mt-4">
        <h2>Login Clients</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username">
            <Form.Label>Telephone Number</Form.Label>
            <Form.Control autoFocus type="text" placeholder="Enter your phone number" />
          </Form.Group>
          <Form.Group controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="mr-2" variant="primary" type="submit">
            Login
          </Button>

        </Form>
      </Container>
    </>
  );
};
