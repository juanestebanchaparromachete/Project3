import { Meteor }from 'meteor/meteor'
import { Comments } from './comments.jsx'
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";

describe('comments', function () {

  function createTestTask() {
    let obj = {
      count: faker.Random,
      name: faker.name.findName(),
      slogan: faker.name.findName(),
      description: faker.lorem.sentence(),
      thumbnail: faker.image.imageUrl(),
      requirements: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.words()],
      stage: faker.lorem.word()
    };
    return obj;
  }

  function createTestComment() {
    let obj = faker.lorem.sentence();
    return obj;
  }

  describe('comments.insert', function () {

    beforeEach(function () {
      resetDatabase();
      Factory.define('user', Meteor.users, {
        username: faker.name.findName(),
        userId: "j8H12k9l98UjL"
      });
      currentUser = Factory.create('user');
      sinon.stub(Meteor, 'user');
      sinon.stub(Meteor, 'userId');
      Meteor.userId.returns(currentUser.userId);
      Meteor.user.returns(currentUser);
    });

    afterEach(() => {
      Meteor.user.restore();
      Meteor.userId.restore();
      resetDatabase();
    });

    it('Should add a new task/project', function () {
      let tempObject = createTestTask();
      let projectId = Meteor.call('tasks.insert', tempObject)
      let tempComment = createTestComment();
      Meteor.call('comments.insert', tempComment, projectId)

      // let retreivedTask = Tasks.find({name:tempObject.name}).fetch()[0];
      //
      // assert.equal(tempObject.count, retreivedTask.count)
      // assert.equal(tempObject.description, retreivedTask.description)
      // assert.equal(tempObject.name, retreivedTask.name)
      // assert.equal(tempObject.slogan, retreivedTask.slogan)
      // assert.equal(tempObject.thumbnail, retreivedTask.thumbnail)
      // assert.deepEqual(tempObject.requirements, retreivedTask.requirements)
      // assert.equal(tempObject.stage, retreivedTask.stage)
    })
  });
})