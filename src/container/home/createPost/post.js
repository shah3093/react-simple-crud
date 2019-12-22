import React,{useState} from 'react';

import {connect} from 'react-redux';

import * as actions from '../../../store/actions/posts';

///Bootstrap
import {Card,Form,Modal,Button} from "react-bootstrap";
///Bootstrap

const Post = (props) => {

    const [show, setShow] = useState(false);
    const [post, setPost] = useState(null);

    const handleClose = () => {
      setShow(false);
      setPost(null);
    };
    const handleShow = () => {
      setShow(true)
      setPost(null);
    };

    const savePost = (event) => {
      event.preventDefault();
      props.createPost(post);
      setShow(false);
      setPost(null);
    }

  return (<React.Fragment>

    <Card className="mt-4">
    <Card.Header>Write something</Card.Header>
      <Card.Body>

        <Form>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control onClick={handleShow} as="textarea" rows="3" placeholder="What are you thinking?" />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
       </Modal.Header>
       <Modal.Body>
       <Form>
         <Form.Group controlId="exampleForm.ControlTextarea1">
           <Form.Control defaultValue={post} onChange={event=>{event.preventDefault();setPost(event.target.value)}}  as="textarea" rows="3" placeholder="What are you thinking?" />
         </Form.Group>
       </Form>
       </Modal.Body>
       <Modal.Footer>
         <Button variant="secondary" onClick={handleClose}>
           Close
         </Button>
         <Button variant="primary" onClick={savePost}>
           Post
         </Button>
       </Modal.Footer>
     </Modal>

    </React.Fragment>);
};

const mapStateToProps = state => {
  return {loading: state.posts.loading}
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: (content) => dispatch(actions.createPost(content))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
