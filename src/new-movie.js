import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './App.css';
import Validator from './validator';

class NewMovie extends Component {

  static propTypes = {
      onSubmit: PropTypes.func.isRequired,
      onCancel: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.validator = new Validator();
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      name: '',
      year: '',
      genres: '',
      ageLimit: '',
      rating: '',
      director: '',
      synopsis: ''
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  onCancel() {
    this.props.onCancel();
  }

  onSubmit() {
    if(this.validator.validateInputs(this.state)) {
        this.props.onSubmit(this.state);
    }
  }

  render() {
    return (
      <div className="input-panel">
      <br/>
      <br/>
      <span className="form-caption">New movie:</span>
      <br/>
      <br/>
      <div>
        <label className="field-name">Name:<br/>
          <input value={this.state.name} name="name" maxLength="100" required onChange={this.handleInputChange} placeholder="item name" />
        </label>
      </div>
      <div>
        <label className="field-name">Year:<br/>
          <input value={this.state.year} name="year" maxLength="4" pattern="[0-9]{1,4}" onChange={this.handleInputChange} placeholder="year" />
        </label>
      </div>
      <div>
        <label className="field-name">Genres:<br/>
          <input value={this.state.genres} name="genres" maxLength="200" onChange={this.handleInputChange} placeholder="genres" />
        </label>
      </div>
      <div>
        <label className="field-name">Age limit:<br/>
          <input value={this.state.ageLimit} name="ageLimit" maxLength="4" pattern="[0-9]{1,3}" onChange={this.handleInputChange} placeholder="age" />
        </label>
      </div>
      <div>
        <label className="field-name">Rating:<br/>
          <input value={this.state.rating} name="rating" maxLength="4" pattern="[0-9]{1,2}" onChange={this.handleInputChange} placeholder="rating" />
        </label>
      </div>
      <div>
        <label className="field-name">Director:<br/>
          <textarea value={this.state.director} name="director" maxLength="100" onChange={this.handleInputChange} placeholder="director" />
        </label>
      </div>
      <div>
        <label className="field-name">Synopsis:<br/>
          <textarea value={this.state.synopsis} name="synopsis" onChange={this.handleInputChange} placeholder="synopsis" />
        </label>
      </div>
      <br/>
      <button onClick={() => this.onCancel()}>Cancel</button>&nbsp;
      <button onClick={() => this.onSubmit()}>Create</button>
      </div>
    );
  }
}

export default NewMovie;
