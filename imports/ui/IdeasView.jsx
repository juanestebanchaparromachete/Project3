import React, {Component, PropTypes} from 'react';
import Idea from './Idea.jsx';
import {createContainer} from 'meteor/react-meteor-data';
import {ideas} from '/imports/api/ideas.jsx';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar.jsx'

// IdeasView component - represents the whole app
class IdeasView extends Component {

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

  renderIdeas() {
    let filteredIdeas = this.props.ideas;
    if (this.state.hideCompleted) {
      filteredIdeas = filteredIdeas.filter(idea => !idea.checked);
    }
    return filteredIdeas.map((idea) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = idea.owner === currentUserId;

      return (
        <Idea
          key={idea._id}
          idea={idea}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('ideas.insert', text);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="row my-4">
          <div className="col-lg-8">
            <img className="img-fluid rounded" src="http://www.goaugment.io/wp-content/uploads/2016/07/Innovation-is-an-Attitude.jpg" alt=""/>
          </div>
          <div className="col-lg-4">
            <h1>Oportunidades</h1>
            <i id="sl">Adopta ideas ¡Soluciona problemas!</i>
            <p>Te presentamos los proyectos de innovación en desarrollo en la Universidad de los Andes.
              ¡Puedes aportar en el desarrollo de estos proyectos comentando ideas, aportando recursos o te
              puedes unir al equipo de trabajo!</p>
            <a className="btn btn-primary btn-lg" href="#">Call to Action!</a>
          </div>
        </div>

        <div className="card text-white bg-secondary my-4 text-center">
          <div className="card-body">
            <p className="text-white m-0">This call to action card is a great place to showcase some important information or display a clever tagline!</p>
          </div>
        </div>

        <div className="row">
          {this.renderIdeas()}
          {this.renderIdeas()}
          {this.renderIdeas()}
          {this.renderIdeas()}
        </div>
      </div>

    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('ideas');
  return {
    ideas: ideas.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: ideas.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
}, IdeasView);