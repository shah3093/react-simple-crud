import React, {useState} from 'react';

import classes from './auth.module.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/auth';

//Form Validation
import {useFormik} from 'formik';
import * as Yup from 'yup';
//Form Validation

///bootstrap
import {Spinner,Container,Row,Col,Form,Button,Card,Alert} from "react-bootstrap";
///bootstrap

const Auth = (props) => {

  const [isLoginFrm, setFrmType] = useState(true);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().max(15, 'Must be 15 characters or less').min(6, 'Must be 6 characters or more').required('Password Required'),
      email: Yup.string().email('Invalid email address').required('Required')
    }),
    onSubmit: values => {
      props.tryLogin(values.email, values.password, isLoginFrm);
    }
  });

  let reactDom = null;

  if (props.isAutenticated) {
    reactDom = <Redirect to="/"/>
  }

  const toggleFrmType = (event) => {
    event.preventDefault();
    setFrmType(!isLoginFrm);
  }

  let linkBtn = null;
  if (!isLoginFrm) {
    linkBtn = (<p className={[classes.fadeIn, classes.fourth].join(' ')}>Already member ? &nbsp;
      <a onClick={toggleFrmType} className={[classes.underlineHover, classes.custom_a].join(' ')} href="#">
        Login</a>
    </p>);
  } else {
    linkBtn = (<p className={[classes.fadeIn, classes.fourth].join(' ')}>Don't have account ? &nbsp;
      <a onClick={toggleFrmType} className={[classes.underlineHover, classes.custom_a].join(' ')} href="#">
        register</a>
    </p>);
  }

  return (<React.Fragment>
    {reactDom}
    <Container className={classes.full}>

      <div>
        <Row className={classes.row_top}>
          <Col></Col>
          <Col className={[classes.wrapper, classes.fadeInDown].join(' ')}>

            <Card className={classes.formContent}>
              <Card.Body>
                <div>
                  {
                    isLoginFrm
                      ? (<h2>Login in Social</h2>)
                      : (<h2>Register in Social</h2>)
                  }

                </div>

                {
                  props.reducer_error
                    ? (<Alert variant='danger'>
                      {props.reducer_error}
                    </Alert>)
                      : null
                }

                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control value={formik.values.email} name="email" onChange={formik.handleChange} className={[classes.fadeIn, classes.second].join(" ")} type="email" placeholder="Enter email"/>
                    <Form.Text className="text-danger">
                      {formik.errors.email}
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control onChange={formik.handleChange} name="password" value={formik.values.password} className={[classes.fadeIn, classes.third].join(' ')} type="password" placeholder="Password"/>

                    <Form.Text className="text-danger">
                      {formik.errors.password}
                    </Form.Text>

                  </Form.Group>

                  {linkBtn}

                  <Button size="lg" block="block" className={[classes.fadeIn, classes.fourth, classes.custom_btn].join(' ')} variant="primary" type="submit">

                    {
                      props.loading ? <Spinner animation="border" /> : "Submit"
                    }
                  </Button>

                </Form>
              </Card.Body>
            </Card>

          </Col>
          <Col></Col>
        </Row>

      </div>

    </Container>
  </React.Fragment>);
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    reducer_error: state.auth.error,
    isAutenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryLogin: (email, password, isSignUp) => dispatch(actions.tryLogin(email, password, isSignUp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
