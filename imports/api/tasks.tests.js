import { Meteor }from 'meteor/meteor'
import { Tasks } from "./tasks";
import { assert } from "meteor/practicalmeteor:chai";
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';
import faker from "faker";

if (Meteor.isServer) {
  describe('tasks', function () {

    describe('tasks.insert', function () {

      let tempObject = {
        count: faker.Random,
        name: faker.name.findName(),
        slogan: faker.name.findName(),
        description: faker.lorem.sentence(),
        thumbnail: faker.image.imageUrl(),
        requirements: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.words()],
        stage: faker.lorem.word()
      };

      beforeEach(function () {
        // Tasks.insert(tempObject);
        resetDatabase();
        Factory.define('user', Meteor.users, {
          username: faker.name.findName(),
        });
        currentUser = Factory.create('user');
        sinon.stub(Meteor, 'user');
        Meteor.user.returns(currentUser);
      })

      afterEach(() => {
        Meteor.user.restore();
        resetDatabase();
      });

      it('should add a new task/project', function () {
        Meteor.call('tasks.insert', tempObject)

        let retreivedTask = Tasks.find({name:tempObject.name}).fetch()[0];

        assert.equal(tempObject.count, retreivedTask.count)
        assert.equal(tempObject.description, retreivedTask.description)
        assert.equal(tempObject.name, retreivedTask.name)
        assert.equal(tempObject.slogan, retreivedTask.slogan)
        assert.equal(tempObject.thumbnail, retreivedTask.thumbnail)
      })
    })
  })
}