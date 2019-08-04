import React from 'react';
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
class App extends React.Component {
  state = {
    email:'test@test.com',
    password:'testtest',
    googleSigninUrl: "",
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

  componentDidMount(){
    if(window.location.pathname === "/api/google/callback"){
      // passback the code and log us in
      const params = new URLSearchParams(window.location.search);
      console.log(params.code)
      axios.post("/api/google/code", {code: params.get("code")}).then(response => console.log(response.data))
    } else {
      this.getGoogleSigninUrl()
    }
    
  }

  getGoogleSigninUrl = () => {
    axios.get('/api/google/url').then(response => {
      console.log(response.data)
      this.setState({googleSigninUrl: response.data.url})
    })
  }

  

  render(){
    return (
      <div>
        <h1>Start</h1>
        { this.state.googleSigninUrl.length > 0
          ? (<a href={this.state.googleSigninUrl}>Sign in with google</a>)
          : ("")
        }
        
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
