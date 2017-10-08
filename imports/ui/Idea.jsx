import React, {Component, PropTypes} from 'react';
import {Ideas} from '../api/ideas.jsx';
import {Meteor} from 'meteor/meteor';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

// idea component - represents a single todo item
export default class Idea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: [],
            count: 1,
        };
    }

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

    renderTags() {
        let uiItems = [];
        for (let i = 0; i < this.state.count; i++) {
            uiItems.push(
                <div className="center-div" style={{textAlign: 'center'}} key={i}>
                    <div className="row" style={{display: 'inline', textAlign: 'center'}}>
                        {/*<label htmlFor="exampleInputEmail1">Requerimiento {i + 1} &emsp; </label>*/}
                        <select className="form-control" id="exampleSelect1" required style={{display: 'inline'}}
                                onChange={(e) => this.handleChange(i, e)} value={this.state.value[i] || ''}
                                placeholder={'Requerimiento ' + (i + 1) + ' ...'}>
                            <option>Medicina</option>
                            <option>Ingeniería</option>
                            <option>Planeación</option>
                            <option>Software</option>
                            <option>Imagenes</option>
                            <option>Biología</option>
                            <option>Finanzas</option>
                            <option>Ciencias</option>
                            <option>Mecánica</option>
                            <option>Química</option>
                        </select>
                        <input type='button' value='Remover' className="removeReqButton"
                               onClick={this.removeClick.bind(this, i)}/>
                    </div>
                </div>
            )
        }
        return uiItems || null;
    }

    render() {

        const ideaClassName = classnames({
            checked: this.props.idea.checked,
            private: this.props.idea.private,
        });

        return (
            <div className="col-md-3 mb-3">
                <div className="card h-100">
                    <div className="card-body">
                        <h2 className="card-title">{this.props.idea.name}</h2>
                        <img className="card-img-top" src={this.props.idea.thumbnail} width="200px"
                             alt="Imagen descriptiva proyecto"/>
                        <p className="card-text">{this.props.idea.slogan}</p>
                    </div>
                    <div className="card-footer">
                        <Link to={{pathname: '/projects/create'}} onChange={(e) => this.deleteThisIdea()} href="#"
                              className="btn btn-primary moreInfoButton">Adoptar</Link>
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


Idea.propTypes = {
    // This component gets the idea to display through a React prop.
    // We can use propTypes to indicate it is required
    // idea: PropTypes.object.isRequired,
};