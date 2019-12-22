import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';


//External Packages
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
///

//Reducers
import authReducer from './store/reducers/auth';
import newsReducer from './store/reducers/news';
import quotesReducer from './store/reducers/quotes';
import postsReducer from './store/reducers/posts';
//

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const rootReducer = combineReducers({
    auth: authReducer,
    news: newsReducer,
    quotes: quotesReducer,
    posts: postsReducer,
});


const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
