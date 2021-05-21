import React from 'react';
import './App.css';

import Header from './components/Header';
import ToyForm from './components/ToyForm';
import ToyContainer from './components/ToyContainer';

const toyApi = 'http://localhost:3000/toys';

class App extends React.Component {
  state = {
    display: true,
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
      .then((toys) => this.setState({toys}));
  }

  addNewToy = (toy) => {
    this.setState({toys: [toy, ...this.state.toys]})
    /// add toy via post
  }

  render() {
    return (
      <>
        <Header />
        {this.state.display ? <ToyForm addNewtoy={this.addNewToy}/> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} />
      </>
    );
  }
}

export default App;
