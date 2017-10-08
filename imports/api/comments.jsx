import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('comments', function commentsPublication() {
    console.log(Comments.find({
      // project: this.userId
    }))
    return Comments.find({});
  });
}

Meteor.methods({
  'comments.insert'(task, projectId) {
    check(task, text);

    // Make sure the user is logged in before inserting a task
    // if (! Meteor.userId()) {
    //   throw new Meteor.Error('not-authorized');
    // }
    Comments.insert({
      createdAt : new Date(),
      owner : Meteor.userId(),
      username : Meteor.user().username,
      text: task,
      projectId: projectId,
    });
  },
});