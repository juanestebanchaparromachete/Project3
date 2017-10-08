import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar.jsx'
import {Redirect} from 'react-router';
import {Comments} from '/imports/api/comments.jsx';
import Comment from "./Comment";
import {createContainer} from 'meteor/react-meteor-data';

class SingleProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      task: props.location.query,
    }
    console.log(this.state.task)
  }

  renderComments() {
    let filteredTasks = this.props.comments;
    console.log(filteredTasks )
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
                            <form>
                              <div className="form-group">
                                <textarea className="form-control" rows="3"></textarea>
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

export default createContainer(() => {
  Meteor.subscribe('comments');
  console.log(Comments.find({}))
  return {
    // comments: Comments.find({}, {sort: {createdAt: -1}}).fetch(),
    comments: Comments.find({}).fetch(),
    currentUser: Meteor.user(),
  };
  console.log(comments)
}, SingleProject);