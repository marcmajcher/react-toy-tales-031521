import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    name: '',
    image: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addNewtoy(this.state);
    this.setState({ name: '', image: '' });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            placeholder="Enter a toy's name..."
            className="input-text"
          />
          <br />
          <input
            type="text"
            name="image"
            onChange={this.handleChange}
            value={this.state.image}
            placeholder="Enter a toy's image URL..."
            className="input-text"
          />
          <br />
          <input
            type="submit"
            name="submit"
            value="Create New Toy"
            className="submit"
          />
        </form>
      </div>
    );
  }
}

export default ToyForm;
