import React from 'react';
import axios from 'axios'
class App extends React.Component {
  state = {
    email:'test@test.com',
    password:'testtest'
  }

  handleInput = event => {
    const {name,value} = event.target
    this.setState({
      [name]: value
    })
  }

  // let's try and login

  handleFormSubmit = event => {
    event.preventDefault()
    const {email,password} = this.state
    axios.post("/api/login", {email, password}).then(result => {console.log(result.data)})
  }

  render(){
    return (
      <div>
        <h1>Start</h1>
        <form>
          <input onChange={this.handleInput} name="email" value={this.state.email} type="text"/>
          <input onChange={this.handleInput} name="password" value={this.state.email} type="password"/>
          <button onClick={this.handleFormSubmit}>Login</button>
        </form>
      </div>
    );
  }
}

export default App;
