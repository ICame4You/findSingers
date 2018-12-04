import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    let searchResult = this.state.value.split(' ').join('+');
    fetch(`${proxyurl}https://itunes.apple.com/search?term=${searchResult}`)
    .then(this.handleErrors)
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log(data.results);
      return data;
    })
    .catch(error => console.log(error))
  }

  handleErrors(request) {
    if(!request.ok) {
      throw Error(request.status);
    }
    return request;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class OutputBlock extends Component {
  render() {
    return <h1>Output songs</h1>;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchForm />
          <OutputBlock name='Alex' />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
