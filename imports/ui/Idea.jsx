import React, {Component, PropTypes} from 'react';
import {Ideas} from '../api/ideas.jsx';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';

// idea component - represents a single todo item
export default class Idea extends Component {

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('ideas.setChecked', this.props.idea._id, !this.props.idea.checked);
  }

  togglePrivate() {
    Meteor.call('ideas.setPrivate', this.props.idea._id, !this.props.idea.private);
  }

  deleteThisIdea() {
    Meteor.call('ideas.remove', this.props.idea._id);
  }

  render() {

    const ideaClassName = classnames({
      checked: this.props.idea.checked,
      private: this.props.idea.private,
    });

    return (
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <h2 className="card-title">{this.props.idea.name}</h2>
            <img className="card-img-top" src={this.props.idea.thumbnail} alt="Imagen descriptiva proyecto"/>
            <p className="card-text">{this.props.idea.slogan}</p>
          </div>
          <div className="card-footer">
            <a href="#" className="btn btn-primary">More Info</a>
          </div>
        </div>
      </div>
      // <li className={ideaClassName}>
      //   <button className="delete" onClick={this.deleteThisidea.bind(this)}>
      //     &times;
      //   </button>
      //
      //   <input
      //     type="checkbox"
      //     readOnly
      //     checked={this.props.idea.checked}
      //     onClick={this.toggleChecked.bind(this)}
      //   />
      //
      //   { this.props.showPrivateButton ? (
      //     <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
      //       { this.props.idea.private ? 'Private' : 'Public' }
      //     </button>
      //   ) : ''}
      //
      //   <span className="text">{this.props.idea.text}</span>
      //   <span className="text">
      //     <strong>{this.props.idea.username}</strong>: {this.props.idea.text}
      //   </span>
      // </li>
    );
  }
}

idea.propTypes = {
  // This component gets the idea to display through a React prop.
  // We can use propTypes to indicate it is required
  // idea: PropTypes.object.isRequired,
};