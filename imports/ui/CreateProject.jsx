import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar.jsx'
import {Redirect} from 'react-router';

var styles = {
  btn: {
    margin: '1em auto',
    padding: '1em 2em',
    outline: 'none',
    fontSize: 16,
    fontWeight: '600',
    background: '#C94E50',
    color: '#FFFFFF',
    border: 'none'
  },
  container: {
    padding: '2em',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    color: '#C94E50',
    fontWeight: 400
  }
}

class CreateProject extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: [],
      count: 1,
      name: '',
      slogan: '',
      description: '',
      thumbnail: '',
      requirements: [],
      stage: 'Gestación'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({value});
  }

  renderRequirements() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div key={i} style={{display:'inline'}}>
          {/*<label htmlFor="exampleInputEmail1">Requerimiento {i + 1} &emsp; </label>*/}
          <input type="text" value={this.state.value[i] || ''} placeholder={'Requerimiento '+(i + 1)+' ...'}
                   onChange={this.handleChange.bind(this, i)} required className="requirementInput"/>
          <input type='button' value='Remover' className="removeReqButton" onClick={this.removeClick.bind(this, i)}/>
        </div>
      )
    }
    return uiItems || null;
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('tasks.insert', this.state);
    // window.location.href = '/projects';
    // this.context.router.push('/projects');
    this.setState({redirect: true});
    // Clear form
  }

  addClick() {
    this.setState({count: this.state.count + 1})
  }

  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      value
    })
  };

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/projects"/>;
    }
    return (
      <div>
        <NavBar/>
        <div className="container2">
          <form id="contact" className="form" onSubmit={this.handleSubmit}>
            <h3>Publica tu proyecto</h3>
            {/*<h4>Contact us for custom quote</h4>*/}
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                     value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}
                     placeholder="Nombre..."/>
            </fieldset>
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                     value={this.state.slogan} onChange={(event) => this.setState({slogan: event.target.value})}
                     placeholder="Slogan..."/>
            </fieldset>
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                     value={this.state.description}
                     onChange={(event) => this.setState({description: event.target.value})}
                     placeholder="Descripción..."/>
            </fieldset>
            <fieldset>
              <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                     value={this.state.thumbnail} onChange={(event) => this.setState({thumbnail: event.target.value})}
                     placeholder="Url thumbnail..."/>
            </fieldset>
            <fieldset>
              <div>
                <label htmlFor="exampleInputEmail1">Lista de requerimientos de tu proyecto</label><br/>
                {this.renderRequirements()}
                <input type='button' value='Agregar más' id="addMoreButton" onClick={this.addClick.bind(this)}/>
              </div>
            </fieldset>
            <fieldset>
              <select className="form-control" id="exampleSelect1" required
                      onChange={(e) => this.state.stage = e.target.value}>
                <option>Gestación</option>
                <option>Puesta en Marcha</option>
                <option>Desarrollo Inicial</option>
                <option>Crecimiento y consolidación</option>
              </select>
            </fieldset>
            <fieldset>
              <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
            </fieldset>
          </form>
        </div>
      </div>
    )
  }
}

export default CreateProject;