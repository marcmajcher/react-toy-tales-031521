import React from 'react';
import './App.css';

import Header from './components/Header';
import ToyForm from './components/ToyForm';
import ToyContainer from './components/ToyContainer';

const toyApi = 'http://localhost:3000/toys';
const headers = {
  Accepts: 'application/json',
  'Content-type': 'application/json',
};

class App extends React.Component {
  state = {
    display: false,
    toys: [],
  };

  handleClick = () => {
    let newBoolean = !this.state.display;
    this.setState({
      display: newBoolean,
    });
  };

  componentDidMount() {
    fetch(toyApi)
      .then((res) => res.json())
      .then((toys) => this.setState({ toys }));
  }

  addNewToy = (toy) => {
    toy.likes = 0;

    // TBD: show a loading thingy
    fetch(toyApi, {
      method: 'POST',
      headers,
      body: JSON.stringify(toy),
    })
      .then((res) => res.json())
      .then((newToy) => this.setState({ toys: [...this.state.toys, newToy] }))
      .catch((err) => console.error(err));
  };

  deleteToy = (id) => {
    fetch(`${toyApi}/${id}`, {
      method: 'DELETE',
      headers,
    })
      .then(() =>
        this.setState({ toys: this.state.toys.filter((toy) => toy.id !== id) })
      )
      .catch((err) => console.error(err));
  };

  addLike = (toy) => {
    fetch(`${toyApi}/${toy.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ likes: toy.likes + 1 }),
    })
      .then((res) => res.json())
      .then((json) =>
        this.setState({
          toys: this.state.toys.map((t) => (t.id === toy.id ? json : t)),
        })
      )
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <>
        <Header />
        {this.state.display ? <ToyForm addNewtoy={this.addNewToy} /> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer
          toys={this.state.toys}
          deleteToy={this.deleteToy}
          addLike={this.addLike}
        />
      </>
    );
  }
}

export default App;
