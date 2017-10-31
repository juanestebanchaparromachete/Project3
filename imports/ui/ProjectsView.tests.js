import React from 'react';
import { Meteor } from 'meteor/meteor';
import { shallow, mount, render } from 'enzyme';
import { assert } from "meteor/practicalmeteor:chai";
import { chai } from 'meteor/practicalmeteor:chai';
import ProjectsView from './ListView/ProjectsView.jsx'

describe('ProjectsView', () => {

  it('Should render', () => {
    const renderedProjectsView = shallow(<ProjectsView/>);
    console.log(renderedProjectsView.hasClass('row'))
    // assert.isTrue(renderedNavBar.hasClass('navbar'), true);
    console.log( renderedProjectsView );
    // assert.isTrue(renderedProjectsView.find('.card').length > 0)
    // assert.isTrue(renderedNavBar.find('.navbar-nav').length > 0)
    // assert.isTrue(renderedNavBar.find('.nav-item').length == 4)
    // assert.equal(renderedNavBar.find('#projectLink').prop('to'), '/projects');

  });
});