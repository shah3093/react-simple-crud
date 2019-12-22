import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';
import * as actions from '../../store/actions/posts';

///Bootstrap
import {
  Card,
  Form,
  Media,
  Button,
  Spinner,
  Dropdown,
  Modal
} from "react-bootstrap";
///Bootstrap

//Font Awesome
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock, faHome, faCaretDown} from '@fortawesome/free-solid-svg-icons';
//Font Awesome

const Posts = (props) => {

  const DELETE_ITEM = "DELETE_ITEM";
  const EDIT_ITEM = "EDIT_ITEM";

  const [content, setContent] = useState(null);

  const [show, setShow] = useState(false);
  const [postid, setPostid] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [postContent, setPostContent] = useState(null);

  const handleClose = () => {
    setShow(false);
    setPostid(null);
  };

  const handleShow = (event, pid, type) => {

    if (type === DELETE_ITEM) {
      setModalAction(false);
      setModalContent(<p className="text-center">Are you sure ??</p>)
    } else if (type === EDIT_ITEM) {
      props.fetchingSinglePost(pid);
      setModalAction(true);
      setModalContent(true);
    }

    setShow(true);
    setPostid(pid);
  };

  useEffect(() => {
    setPostContent(props.singlePost);
    console.log(props.singlePost);
  }, [props.singlePost])

  const editPostHandelar = () => {
    props.editPost(postid,postContent)
    setShow(false);
    setPostid(null);
    setPostContent(null);
  };

  const deletePost = () => {
    setShow(false);
    setPostid(null);
  };

  const deletePostHandeler = () => {
    props.deletePost(postid);
    setShow(false);
    setPostid(null);
  }

  useEffect(() => {
    props.fetchingPosts();
  }, []);

  useEffect(() => {
    let contnetData = "";

    if (props.posts !== null) {
      contnetData = Object.keys(props.posts).slice(0).reverse().map(key => <Card key={key} className="mt-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <h5>@{props.posts[key].userName}</h5>
            </div>

            <div>
              {
                props.posts[key].userid === localStorage.getItem('userId')
                  ? (<Dropdown>
                    <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic"></Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={event => handleShow(event, key, EDIT_ITEM)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={event => handleShow(event, key, DELETE_ITEM)} href="#">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>)
                  : null
              }
            </div>

          </div>

        </Card.Header>
        <Card.Body>
          <Media>
            <Media.Body>
              <div className="text-muted h7 mb-2">
                <FontAwesomeIcon icon={faClock}/>
                &nbsp;&nbsp;Created at {new Date(props.posts[key].created_at).toDateString()}
              </div>

              <p className="card-text">
                {props.posts[key].content}
              </p>
            </Media.Body>
          </Media>
        </Card.Body>
      </Card>)
    }

    setContent(contnetData);
  }, [props.loading]);

  return (<React.Fragment>
    {
      props.posts === null
        ? (<Spinner animation="grow" size="lg"/>)
        : content
    }

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton="closeButton"></Modal.Header>
      <Modal.Body>
        {
          modalContent === true
            ? (<Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Control as="textarea" rows="3" onChange={event=>{event.preventDefault();setPostContent(event.target.value)}} defaultValue={postContent}/>
              </Form.Group>
            </Form>)
            : modalContent
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={modalAction === true
            ? editPostHandelar
            : deletePostHandeler}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  </React.Fragment>);
};

const mapStateToProps = state => {
  return {loading: state.posts.loading, posts: state.posts.posts, singlePost: state.posts.singlePost}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchingPosts: () => dispatch(actions.fetchingPosts()),
    deletePost: (posid) => dispatch(actions.deletePost(posid)),
    fetchingSinglePost: (posid) => dispatch(actions.fetchingSinglePost(posid)),
    editPost: (posid,content) => dispatch(actions.editPost(posid,content)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
