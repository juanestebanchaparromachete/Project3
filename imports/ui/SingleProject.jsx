import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar.jsx'
import {Redirect} from 'react-router';
import {Comments} from '/imports/api/comments';
import Comment from "./Comment";
import {createContainer} from 'meteor/react-meteor-data';
import { Session } from 'meteor/session'

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
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      // const showPrivateButton = task.owner === currentUserId;

      return (
        <Comment
          key={task._id}
          comment={task}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('comments.insert', this.state.value, this.state.task._id);
    // window.location.href = '/projects';
    // this.context.router.push('/projects');
    // this.setState({redirect: true});
    // Clear form
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
              {/*<!-- Requirements Widget -->*/}
              <div className="card my-4">
                <h5 className="card-header">Requerimientos</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul className="list-unstyled mb-12">
                        {
                          this.state.task.requirements.map((task) => {
                            const currentUserId = this.props.currentUser && this.props.currentUser._id;
                            // const showPrivateButton = task.owner === currentUserId;
                            return (
                              <div>
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

              {/*<!-- Categories Widget -->*/}
              <div className="card my-4">
                <h5 className="card-header">Categories</h5>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <a href="#">Web Design</a>
                        </li>
                        <li>
                          <a href="#">HTML</a>
                        </li>
                        <li>
                          <a href="#">Freebies</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul className="list-unstyled mb-0">
                        <li>
                          <a href="#">JavaScript</a>
                        </li>
                        <li>
                          <a href="#">CSS</a>
                        </li>
                        <li>
                          <a href="#">Tutorials</a>
                        </li>
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