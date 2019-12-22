import React, {useEffect, useState} from 'react';

import {connect} from 'react-redux';

import * as actions from '../../store/actions/quotes';

///Bootstrap
import {Media, Spinner, Card} from "react-bootstrap";
///Bootstrap

const Quotes = (props) => {

  const [content, setContent] = useState(null);

  useEffect(() => {
    props.showQuotes()
  }, []);

  useEffect(() => {

    let contnetData = "";

    if (props.quotes !== null) {
      contnetData = Object.keys(props.quotes).slice(0, 5).map(key =>
        <Card key={key} className="mt-4">
        <Card.Body>
          <Media>
            <Media.Body>
              <p>{props.quotes[key].text}</p>

              <p><strong>{props.quotes[key].author}</strong></p>
            </Media.Body>
          </Media>
        </Card.Body>
      </Card>);
    }

    setContent(contnetData);

  }, [props.loading]);

  return (<React.Fragment>
    {
      props.quotes === null
        ? (<Spinner animation="grow" size="lg"/>)
        : content
    }
  </React.Fragment>);
};

const mapStateToProps = state => {
  return {loading: state.quotes.loading, quotes: state.quotes.quotes}
}

const mapDispatchToProps = dispatch => {
  return {
    showQuotes: () => dispatch(actions.showingQuotes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quotes);
