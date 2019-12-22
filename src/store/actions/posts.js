import * as actionTypes from '../../constants/action_types';
import * as projectConstant from '../../constants/projects';


export const gettingPostsStart = () => {
  return {
    type: actionTypes.GETTING_POSTS
  }
}

export const createPostStart = (content) => {
  return {
    type: actionTypes.CREATE_POST
  }
}

export const deletePostStart = () => {
  return {
    type: actionTypes.DELETE_POST
  }
}

export const deletePost = (postid) => {
  return dispatch => {
    dispatch(deletePostStart());

    const token = localStorage.getItem('token');
    const url = projectConstant.PROJECT_DB_URL;

    fetch(url + "/posts/"+postid+".json?auth=" + token, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        dispatch(fetchingPosts());
      });
  }
}

export const createPost = (content) => {
  return dispatch => {
    dispatch(createPostStart());

    const postData = JSON.stringify({
      userid: localStorage.getItem('userId'),
      userName: localStorage.getItem('userName'),
      content: content,
      created_at: new Date()
    });

    const token = localStorage.getItem('token');

    const url = projectConstant.PROJECT_DB_URL;

    fetch(url + "/posts.json?auth=" + token, {
        method: 'POST',
        body: postData,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        dispatch(fetchingPosts());
      });
  }
}


export const gettingPostStart = (content) => {
  return {
    type: actionTypes.GETTING_POSTS
  }
}

export const showPosts = (responseData) => {
  return {
    type: actionTypes.SHOW_POSTS,
    posts: responseData
  }
}

export const fetchingPosts = () => {
  return dispatch => {
    dispatch(gettingPostStart());

    const token = localStorage.getItem('token');
    const url = projectConstant.PROJECT_DB_URL;

    fetch(url + "/posts.json?auth=" + token).then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        dispatch(showPosts(responseData))
      });
  }
}

export const showSinglePost = (responseData) => {
  return {
    type: actionTypes.SHOW_SINGLE_POSTS,
    singlePost: responseData.content
  }
}

export const fetchingSinglePost = (postid) => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const url = projectConstant.PROJECT_DB_URL;

    fetch(url + "/posts/"+postid+".json?auth=" + token).then(response => response.json())
      .then(responseData => {
        dispatch(showSinglePost(responseData))
      });
  }
}

export const editPostStart = (responseData) => {
  return {
    type: actionTypes.EDIT_POST
  }
}

export const editPost = (postId,content) => {
  return dispatch => {

    dispatch(editPostStart());

    const postData = JSON.stringify({
      content: content
    });

    const token = localStorage.getItem('token');

    const url = projectConstant.PROJECT_DB_URL;

    fetch(url + "/posts/"+postId+".json?auth=" + token, {
        method: 'PATCH',
        body: postData,
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => response.json())
      .then(responseData => {
        dispatch(fetchingPosts());
      });
  }
}
