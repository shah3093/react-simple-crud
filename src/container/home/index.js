import React from 'react';

///Bootstrap
import {Container, Row, Col} from "react-bootstrap";
///Bootstrap

import Navbar from '../../component/navbar/navbar';
import News from '../../component/news/news';
import Quotes from '../../component/quotes/quotes';
import Posts from '../../component/posts/posts';

import Post from './createPost/post';

const Home = (props) => {
  return (<React.Fragment>

    <Navbar/>

    <Container>
      <Row>
        <Col md={3}><News/></Col>
        <Col md={6}>
          <Post/>
          <Posts/>

        </Col>
        <Col md={3}><Quotes/></Col>
      </Row>
    </Container>

  </React.Fragment>);
};

export default Home;
