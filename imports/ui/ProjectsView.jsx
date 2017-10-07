import React, {Component, PropTypes} from 'react';
import Task from './Task.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import {Tasks} from '/imports/api/tasks.jsx';
import ReactDOM from 'react-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import {Meteor} from 'meteor/meteor';

// ProjectsView component - represents the whole app
class ProjectsView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          name={task.name}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div>

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">Start Bootstrap</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#">Home
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Services</a>
                </li>
                <li className="nav-item">
                  <AccountsUIWrapper/>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div class="row my-4">
          <div class="col-lg-8">
            <img class="img-fluid rounded" src="http://placehold.it/900x400" alt=""/>
          </div>
          <div class="col-lg-4">
            <h1>Business Name or Tagline</h1>
            <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
            <a class="btn btn-primary btn-lg" href="#">Call to Action!</a>
          </div>
        </div>

        <div class="card text-white bg-secondary my-4 text-center">
          <div class="card-body">
            <p class="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p>
          </div>
        </div>

        <div className="container">
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
          {/*<header>*/}
          {/*<label className="hide-completed">*/}
          {/*<input*/}
          {/*type="checkbox"*/}
          {/*readOnly*/}
          {/*checked={this.state.hideCompleted}*/}
          {/*onClick={this.toggleHideCompleted.bind(this)}*/}
          {/*/>*/}
          {/*Hide Completed Tasks*/}
          {/*</label>*/}
          {/*{ this.props.currentUser ?*/}
          {/*<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >*/}
          {/*<input*/}
          {/*type="text"*/}
          {/*ref="textInput"*/}
          {/*placeholder="Type to add new tasks"*/}
          {/*/>*/}
          {/*</form> : ''*/}
          {/*}*/}
          {/*</header>*/}
        </div>

        <div className="row">
          {this.renderTasks()}
        </div>
      </div>

    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('tasks');
  return {
    tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
}, ProjectsView);