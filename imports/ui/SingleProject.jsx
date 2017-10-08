import React, {Component, PropTypes} from 'react';
import { Meteor } from 'meteor/meteor';
import NavBar from './NavBar.jsx'
import { Redirect } from 'react-router';
import { Comments } from '/imports/api/comments';
import Comment from "./Comment";
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

class SingleProject extends Component {

  constructor(props) {
    super(props);
    window.scrollTo(0,0);
    this.state = {
      task: props.location.query,
      value: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  renderComments() {
    let filteredTasks = this.props.comments;
    // if (this.state.hideCompleted) {
    //   filteredTasks = filteredTasks.filter(task => !task.checked);
    // }
    return filteredTasks.map((task, i) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      // const showPrivateButton = task.owner === currentUserId;
      return (
        <Comment
          key={i}
          comment={task}
        />
      );
    });
  }

  sendMail() {
      // Client: Asynchronously send an email.
      Meteor.call(
          'sendEmail',
          'Alice <dianasbeltran@gmail.com>',
          'admin@luisplazas.co',
          'Hello from Meteor!',
          'This is a test of Email.send.'
      );
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('comments.insert', this.state.value, this.state.task._id, function (error, result) {
      if (error) {
        Bert.alert( 'Debes iniciar sesión para poder comentar!', 'danger', 'growl-top-right' );
      }
    });
  }

  render() {
    if (!this.state.task) {
      return <Redirect push to="/projects"/>;
    }
    return (
      <div>
        <NavBar/>
        <div className="container" style={{marginTop:'10px'}}>

          <div className="row">

            {/*<!-- Post Content Column -->*/}
            <div className="col-lg-8">

              {/*<!-- Title -->*/}
              <h1 className="mt-4" style={{fontSize:'64px'}}>{this.state.task.name}</h1>

              {/*<!-- Author -->*/}
              <p className="lead">
                by {' '+this.state.task.username}
              </p>

              <hr/>

                {/*<!-- Date/Time -->*/}
                <p>Posted on {new Date(this.state.task.createdAt).toDateString()}</p>

                <hr/>

                  {/*<!-- Preview Image -->*/}
                  <img className="img-fluid rounded" src={this.state.task.thumbnail} alt="Project image"/>

                    <hr/>

                      {/*<!-- Post Content -->*/}
                      <p className="lead">{this.state.task.description}</p>

                      <hr/>

                        {/*<!-- Comments Form -->*/}
                        <div className="card my-4">
                          <h5 className="card-header">Leave a Comment:</h5>
                          <div className="card-body">
                            <div style={{textAlign:'left', marginBottom:'10px'}}>
                              <AccountsUIWrapper/>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                              <div className="form-group">
                                <textarea className="form-control" rows="3" onChange={(event) => this.setState({value: event.target.value})}></textarea>
                              </div>
                              <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                          </div>
                        </div>

                        {/*<!-- Single Comment -->*/}
                        {this.renderComments()}
                        {/*<Comment/>*/}
            </div>

            {/*<!-- Sidebar Widgets Column -->*/}
            <div className="col-md-4">
                {/*<!-- Participar Widget -->*/}
              <div className="card my-4">
                <h5 className="card-header">Participar</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <button type="submit" onClick={this.sendMail} className="btn btn-primary">Enviar mensaje</button>
                    </div>
                  </div>
                </div>
              </div>

              {/*<!-- Requirements Widget -->*/}
              <div className="card my-4">
                <h5 className="card-header">Requerimientos</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="list-unstyled mb-12">
                        {
                          this.state.task.requirements.map((task,i) => {
                            const currentUserId = this.props.currentUser && this.props.currentUser._id;
                            // const showPrivateButton = task.owner === currentUserId;
                            return (
                              <div key={i}>
                                <li className="col-lg-12" style={{textAlign:'justify'}}>
                                  {task}
                                </li>
                                <hr/>
                              </div>
                            );
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/*<!-- /.row -->*/}

        </div>
      </div>
    )
  }
}

// export default createContainer(() => {
//   Meteor.subscribe('comments');
//   console.log(Comments.find({}).fetch())
//   return {
//     // comments: Comments.find({}, {sort: {createdAt: -1}}).fetch(),
//     comments: Comments.find({}).fetch(),
//     currentUser: Meteor.user(),
//   };
//   console.log(comments)
// }, SingleProject);

export default createContainer(() => {
  Meteor.subscribe('comments', Session.get('projectId'));
  return {
    comments: Comments.find({}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Comments.find({checked: {$ne: true}}).count(),
    currentUser: Meteor.user(),
  };
}, SingleProject);