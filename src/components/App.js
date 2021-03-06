import agent from '../agent';
import Header from './Header';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
// import Article from '../components/Article';
import Home from '../components/Home';
import Singles from '../components/Singles';
import { store } from '../store';
import { push } from 'react-router-redux';
import * as firebase from "firebase";

export const firebaseConfig = {
  apiKey: 'AIzaSyB2RMYFAl9hwGI63hbRq9sChng3mwn8LWQ',
  authDomain: 'easysend-website.firebaseapp.com',
  databaseURL: 'https://easysend-website.firebaseio.com',
  storageBucket: "easysend-website.appspot.com",
  projectId: 'easysend-website',
  messagingSenderId: '1088779523001'
};

const FirebaseConfig = {
  apiKey: "AIzaSyDxjATtQGZksO9RMbkS5r2f5lkZQa89kuE",
  authDomain: 'mesangleim-app.firebaseapp.com',
  projectId: 'mesangleim-app',
};

firebase.initializeApp(FirebaseConfig);

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    if (token) {
      agent.setToken(token);
    }

    this.props.onLoad(token ? agent.Auth.current() : null, token);
  }


  render() {
    if (this.props.appLoaded) {
      return (
        <div>
          <Header/>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/singles" component={Singles} />
            <Route path="/singles/:id" component={Singles} />
            </Switch>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
