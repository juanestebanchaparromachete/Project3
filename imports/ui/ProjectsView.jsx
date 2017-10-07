import React, {Component, PropTypes} from 'react';
import Task from './Task.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import {Tasks} from '/imports/api/tasks.jsx';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar.jsx'

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
        <NavBar/>
        <div className="row my-4">
          <div className="col-lg-8">
            <img className="img-fluid rounded" src="http://placehold.it/900x400" alt=""/>
          </div>
          <div className="col-lg-4">
            <h1>Business Name or Tagline</h1>
            <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
            <a className="btn btn-primary btn-lg" href="#">Call to Action!</a>
          </div>
        </div>

        <div className="card text-white bg-secondary my-4 text-center">
          <div className="card-body">
            <p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p>
          </div>
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