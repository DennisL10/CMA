import '../styles/App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const url = 'http://localhost:9000/HOSPITAL/pacientes/';

class User extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      nombre: '',
      sexo: '',
      edad: '',
      correo: '',
      telefono: '',
      estado: '',
      VuM: '',
      tipoModal: ''
    }
  };

  peticionGet = () => {
    axios.get(url).then((res) => {
      console.log(res.data);
      this.setState({ data: res.data });
    }).catch((err) => {
      console.log(err);
    });
  };

  peticionPost = async () => {
    delete this.state.form.id;
    await
      axios.post(url, this.state.form).then((res) => {
      console.log(res.data);
      this.setState({ modalInsertar: false });
      this.peticionGet();
    }).catch((err) => {
      console.log(err);
    });
  };

  peticionDelete=()=>{
    axios.delete(url+this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }


  peticionPut = () => {
    axios.put(url + this.state.form.id, this.state.form).then((res) => {
      this.modalInsertar();
      this.peticionGet();
    })
    }


  seleccionarPaciente = (patient) => {
    this.setState({
      tipoModal: 'update',
      form: {
        id: patient.id,
        nombre: patient.nombre,
        sexo: patient.sexo,
        edad: patient.edad,
        correo: patient.correo,
        telefono: patient.telefono,
        estado: patient.estado,
        VuM: patient.VuM
      }
    })
}

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  handleChange = async e => {
    e.persist();
    await this.setState(prevState => ({
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value
      }
    }));
    console.log(this.state.form);
  }

  componentDidMount() {
    this.peticionGet();
  }

  render(){
    const {form} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="wrapper fadeInDown">
        <div id="formUser">
        <br />
        <button className="btn btn-success" onClick={() => {this.setState({form: null, tipoModal: 'insert'}); this.modalInsertar()}}>
          Agregar Paciente
        </button>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th>Nombre Completo</th>
              <th>Sexo</th>
              <th>Edad</th>
              <th>Corre de Contacto</th>
              <th>Telefono de Contacto</th>
              <th>Estado</th>
              <th>VoM</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((patient) => {
              return (
                <tr>
                  <td>{patient.nombre}</td>
                  <td>{patient.sexo}</td>
                  <td>{patient.edad}</td>
                  <td>{patient.correo}</td>
                  <td>{patient.telefono}</td>
                  <td>{patient.estado}</td>
                  <td>{patient.VuM}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => {this.seleccionarPaciente(patient); this.modalInsertar()}}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>{' '}
                    <button className="btn btn-danger" onClick={() => {this.seleccionarPaciente(patient); this.setState({modalEliminar: true})}}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>
              x
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form">
              <label htmlFor="nombre">Nombre Completo</label>
              <br />
              <input type="text" className="form" id="nombre" name="nombre" onChange={this.handleChange} value={form?form.nombre: ''} required/>
              <br />
              <label htmlFor="sexo">Sexo</label>
              <br />
              <input type="text" className="form" id="sexo" name="sexo" onChange={this.handleChange} value={form?form.sexo: ''} required/>
              <br />
              <label htmlFor="edad">Edad</label>
              <br />
              <input type="number" className="form" id="edad" name="edad" onChange={this.handleChange}value={form?form.edad: ''} required/>
              <br />
              <label htmlFor="correo">Correo de Contacto</label>
              <br />
              <input type="email" className="forml" id="correo" name="correo" onChange={this.handleChange} value={form?form.correo: ''} required/>
              <br />
              <label htmlFor="telefono">Telefono de Contacto</label>
              <br />
              <input type="tel" className="form" id="telefono" name="telefono" onChange={this.handleChange} value={form?form.telefono: ''} required/>
              <br />
              <label htmlFor="estado">Estado</label>
              <br />
              <input type="text" className="form" id="estado" name="estado" onChange={this.handleChange} value={form?form.estado: ''} required/>
              <br />
              <label htmlFor="VuM">VoM</label>
              <br />
              <input type="text" className="form" id="VuM" name="VuM" onChange={this.handleChange} value={form?form.VuM: ''} required/>
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal === 'insert'?
              <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                Agregar
              </button> : <button className="btn btn-success" onClick={()=>this.peticionPut()}>
                Actualizar
              </button>
            }
              <button className="btn btn-danger" onClick={() => this.modalInsertar()}>
                Cancelar
              </button>
          </ModalFooter>
        </Modal>
          <Modal isOpen={this.state.modalEliminar}>
            <ModalBody>
              Estas seguro que quieres eliminar a: {form && form.nombre}
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
              <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
            </ModalFooter>
          </Modal>
        </div>
          </div>
        </header>
      </div>
    );
  }
}

export default User;
