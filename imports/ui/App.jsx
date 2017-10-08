import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import ProjectsView from './ProjectsView.jsx'
import IdeasView from './IdeasView.jsx'
import CreateProject from './CreateProject.jsx'
import SingleProject from './SingleProject.jsx'
// import TransitionGroup from "react-transition-group/TransitionGroup";
import CreateIdea from './CreateIdea.jsx'

import TransitionGroup from "react-transition-group/TransitionGroup";

const browserHistory = createBrowserHistory();

// const firstChild = props => {
//   const childrenArray = React.Children.toArray(props.children);
//   return childrenArray[0] || null;
// };

// App component - represents the whole app
class App extends Component {

  render() {
    return (
      <div>
      <Router history={browserHistory}>
        <div>
          <Route exact path="/projects" component={ProjectsView}/>
          <Route exact path="/projects/create" component={CreateProject}/>
          <Route exact path="/ideas" component={IdeasView}/>
          <Route path="/projects/view/:name" component={SingleProject}/>
          <Route exact path="/ideas/create" component={CreateIdea}/>
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