import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import NavBar from './NavBar.jsx'

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
        <div key={i}>
          <label htmlFor="exampleInputEmail1">Requerimiento {i + 1} &emsp; </label>
          <input type="text" value={this.state.value[i] || ''} onChange={this.handleChange.bind(this, i)} required/>
          <input type='button' value='Remove' onClick={this.removeClick.bind(this, i)}/>
        </div>
      )
    }
    return uiItems || null;
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.call('tasks.insert', this.state);
    window.location.href = '/projects';

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
    return (
      <div>
        <NavBar/>
        <form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Nombre del Proyecto</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                   value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}
                   placeholder="Nombre..."/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Slogan</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                   value={this.state.slogan} onChange={(event) => this.setState({slogan: event.target.value})}
                   placeholder="Slogan..."/>
            <small id="emailHelp" className="form-text text-muted">Una frase corta que muestre la esencia de tu proyecto
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Descripción del Proyecto</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                   value={this.state.description} onChange={(event) => this.setState({description: event.target.value})}
                   placeholder="Descripción..."/>
            <small id="emailHelp" className="form-text text-muted">Describe completamente tu proyecto</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Thumbnail del proyecto</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required
                   value={this.state.thumbnail} onChange={(event) => this.setState({thumbnail: event.target.value})}
                   placeholder="url..."/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Lista de requerimientos de tu proyecto</label>
            {this.renderRequirements()}
            <input type='button' value='Agregar más' onClick={this.addClick.bind(this)}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleSelect1">Selecciona la etapa de tu proyecto</label>
            <select className="form-control" id="exampleSelect1" required
                    onChange={(e) => this.state.stage = e.target.value}>
              <option>Gestación</option>
              <option>Puesta en Marcha</option>
              <option>Desarrollo Inicial</option>
              <option>Crecimiento y consolidación</option>
            </select>
          </div>
          <div style={{width: '100%', textAlign: 'center'}}>
            <button style={{display: 'inline-block', textAlign: 'center', marginBottom: '20px', width: '30%'}}
                    type="submit" className="btn btn-primary">¡Publicar proyecto!
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateProject;