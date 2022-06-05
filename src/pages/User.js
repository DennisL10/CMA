import '../styles/App.css';
import { Component } from 'react';
import logo from '../assets/logo.png';
import Input from '../components/Atoms/Input';
import Button from '../components/Atoms/buttons/button';

class User extends Component {
  render() {
    return(
      <div className="App">
        <header className="App-header">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first">
                <img src={logo} width="400px" alt="User Icon" />
              </div>
            </div>
          </div>
        </header>
      </div>


    );}
}

export default User;
