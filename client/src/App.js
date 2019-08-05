import React from 'react';
import axios from 'axios'
class App extends React.Component {
  state = {
    email:'test@test.com',
    password:'testtest',
    welcomeEmail: ""
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
    axios.post("/api/login", {email, password})
      .then(result => {
        console.log(result.data)
        this.loadProfileInfo()
      })
  }
  handleFormLogout = event => {
    event.preventDefault()
    axios.get("/api/logout")
      .then(result => {
        console.log(result.data)
        this.setState({ welcomeEmail: ""})
      })
  }

  loadProfileInfo = () => {
    axios.get('/api/user/me')
      .then(response => {
        this.setState({welcomeEmail: response.data.email})
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    this.loadProfileInfo()
  }

  render(){
    return (
      <div>
        <h1>{this.state.welcomeEmail.length > 0 
          ? "Welcome " + this.state.welcomeEmail
          : "Login"}</h1>
        <form>
          <input onChange={this.handleInput} name="email" value={this.state.email} type="text"/>
          <input onChange={this.handleInput} name="password" value={this.state.email} type="password"/>
          <button onClick={this.handleFormSubmit}>Login</button>
          <button onClick={this.handleFormLogout}>Logout</button>
        </form>
      </div>
    );
  }
}

export default App;
