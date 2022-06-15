import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import logo from '../../../assets/logo.png';
import Input from '../../Atoms/Input';
import Button from '../../Atoms/buttons/button';

const SignInForm = () => {
  const MySwal = withReactContent(Swal);
  const [User, setUser] = useState('');
  const [Pass, setPass] = useState('');

  const onChangeUserName = (e) => {
    setUser(e.target.value);
  };

  const onChangePassword = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    if (cookies.get('token')) {
      await MySwal.fire({
        title: 'Estas logeado',
        text: 'Cierra la sesión primero',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    } else {
      if (User === '' || Pass === '') {
        await MySwal.fire({
          title: 'Error',
          text: 'Por favor llene todos los campos',
          icon: 'error',
          confirmButtonText: false,
          timer: 2000
        });
      } else {
        axios
          .post('http://localhost:9000/HOSPITAL/login', {
            headers: {
              'Content-Type': 'application/json'
            },
            usuario: User,
            pass: Pass
          })
          .then(
            async (response) => {
              await MySwal.fire({
                position: 'center',
                icon: 'success',
                title: 'Sesion Iniciada',
                showConfirmButton: false,
                timer: 2500
              });
            },
            async (error) => {
              await MySwal.fire({
                position: 'center',
                icon: 'error',
                text: 'Usuario/Contraseña inorrectos',
                showConfirmButton: false,
                timer: 2500
              });
            }
          );
        console.log(User);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first">
              <img src={logo} width="400px" alt="User Icon" />
            </div>
            <form onSubmit={handleSubmit}>
              <label type="text" className="InicioText" name="login">
                <p>INICIO DE SESION</p>
              </label>
              <Input
                type="text"
                className="fadeIn use"
                name="login"
                placeholder="Usuario"
                onChange={onChangeUserName}
                required
              />
              <Input
                type="password"
                className="fadeIn pass"
                name="passw"
                placeholder="Contraseña"
                onChange={onChangePassword}
                required
              />
              <br />
              <br />
              <Button className="btnlogin" type="submit" path="/Dashboard">
                INICIAR SESION
              </Button>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
};
export default SignInForm;
