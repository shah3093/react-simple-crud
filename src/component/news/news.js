import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/news';

///Bootstrap
import {Media, Spinner, Card} from "react-bootstrap";
///Bootstrap

const News = (props) => {

  const [content, setContent] = useState(null);

  useEffect(() => {
    props.showNews()
  }, []);

  useEffect(() => {

    let contnetData = "";

    if (props.articles !== null) {
      contnetData = Object.keys(props.articles).map(key => <Card key={key} className="mt-4">
        <Card.Body>
          <a className="text-decoration-none text-dark" target="_blank" href={props.articles[key].url}>
            <Media>
              <img width={64} height={64} className="align-self-center mr-3" src={props.articles[key].urlToImage} alt={props.articles[key].title}/>
              <Media.Body>
                <p>{props.articles[key].title}</p>
                <strong>{props.articles[key].source.name}</strong>
              </Media.Body>
            </Media>
          </a>
        </Card.Body>
      </Card>);
    }

    setContent(contnetData);

  }, [props.loading]);

  return (<React.Fragment>

    {
      props.articles === null
        ? (<Spinner animation="grow" size="lg"/>)
        : content
    }

  </React.Fragment>);
};

const mapStateToProps = state => {
  return {loading: state.news.loading, articles: state.news.articles}
}

const mapDispatchToProps = dispatch => {
  return {
    showNews: () => dispatch(actions.showingNews())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);
