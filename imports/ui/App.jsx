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
      <Router history={browserHistory}>
        <div>
          <Route path="/projects" component={ProjectsView}/>
          <Route path="/project/create" component={CreateProject}/>
          <Route path="/pro" component={NotFound}/>
        </div>
      </Router>
    );
  }
}

const NotFound = () => (
  <h1>404.. This page is not found!</h1>);

export default App;