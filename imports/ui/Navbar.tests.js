import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow, mount, render } from 'enzyme';
import { assert } from "meteor/practicalmeteor:chai";
import { chai } from 'meteor/practicalmeteor:chai';
import { configure } from 'enzyme';
import Navbar from './SmallElements/NavBar.jsx'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Navbar', () => {

  it('Should render', () => {
    const renderedNavBar = shallow(<Navbar/>);
    assert.isTrue(renderedNavBar.hasClass('navbar'), true);
    assert.isTrue(renderedNavBar.find('.container').length > 0)
    assert.isTrue(renderedNavBar.find('.navbar-nav').length > 0)
    assert.isTrue(renderedNavBar.find('.nav-item').length == 4)
    assert.equal(renderedNavBar.find('#projectLink').prop('to'), '/projects');
    console.log( );
    // chai.assert(!item.hasClass('checked'));
    // chai.assert.equal(item.find('.editing').length, 0);
    // chai.assert.equal(item.find('input[type="text"]').prop('defaultValue'), 'testing');
  });
});