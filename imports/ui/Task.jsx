import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Session } from 'meteor/session'

// Task component - represents a single todo item
export default class Task extends Component {

  render() {

    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    return (
      <div className="col-md-3 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h2 className="card-title">{this.props.task.name}</h2>
            <img className="card-img-top" src={this.props.task.thumbnail} width="200px" alt="Imagen descriptiva proyecto"/>
            <p className="card-text">{this.props.task.slogan}</p>
          </div>
          <div className="card-footer">
            <Link onClick={() => Session.set('projectId', this.props.task._id)} to={{pathname: '/projects/view/' + this.props.task.name, query: this.props.task}} className="btn btn-primary moreInfoButton">Ver proyecto</Link>
          </div>
        </div>
      </div>
      // <li className={taskClassName}>
      //   <button className="delete" onClick={this.deleteThisTask.bind(this)}>
      //     &times;
      //   </button>
      //
      //   <input
      //     type="checkbox"
      //     readOnly
      //     checked={this.props.task.checked}
      //     onClick={this.toggleChecked.bind(this)}
      //   />
      //
      //   { this.props.showPrivateButton ? (
      //     <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
      //       { this.props.task.private ? 'Private' : 'Public' }
      //     </button>
      //   ) : ''}
      //
      //   <span className="text">{this.props.task.text}</span>
      //   <span className="text">
      //     <strong>{this.props.task.username}</strong>: {this.props.task.text}
      //   </span>
      // </li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  // task: PropTypes.object.isRequired,
};