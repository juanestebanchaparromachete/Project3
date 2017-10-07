import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import ProjectsView from './ProjectsView.jsx'
import CreateProject from './CreateProject.jsx'

const browserHistory = createBrowserHistory();

// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <div>
      <Router history={browserHistory}>
        <div>
          <Route exact path="/projects" component={ProjectsView}/>
          <Route exact path="/projects/create" component={CreateProject}/>
          <Route path="/pro" component={NotFound}/>
        </div>
      </Router>
      </div>
    );
  }
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

export default App;