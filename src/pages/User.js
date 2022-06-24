import '../styles/App.css';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';

const url='http://localhost:9000/HOSPITAL/pacientes/';
class User extends Component {
  state={
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    form:{
      id: '',
      nombre: '',
      sexo: '',
      edad: '',
      correo: '',
      telefono: '',
      estado: '',
      VuM: '',
      tipoModal: ''

    }
  }

  peticionGet=()=>{
    axios.get(url).then(response=>{
      this.setState({data: response.data});
    }).catch(error=>{
      console.log(error.message);
    })
  }

peticionPost=async()=>{
    await axios.post(url, this.state.form).then(response =>{
      this.modalInsertar();
      this.peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })

  }

  peticionPut=()=>{
    axios.put(url, this.state.form).then(response=>{
      this.modalInsertar();
      this.peticionGet();
    })
  }

  peticionDelete=()=>{
    axios.delete(url + this.state.form.id).then(response=>{
      this.setState({modalEliminar: false});
      this.peticionGet();
    })
  }

  modalInsertar=()=>{
    this.setState({modalInsertar: !this.state.modalInsertar});
  }

  seleccionarPaciente=(patient)=>{
    this.setState({
      tipoModal: 'actualizar',
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

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  componentDidMount() {
    this.peticionGet();
  }


  render(){
    const {form}=this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="wrapper fadeInDown">
            <div id="formUser">
        <br /><br />
        <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Agregar Paciente</button>
        <br /><br />
        <table className="table ">
          <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>Sexo</th>
            <th>Edad</th>
            <th>Correo de Contacto</th>
            <th>Telefono de Contacto</th>
            <th>Estado</th>
            <th>VoM</th>
            <th>Acciones</th>
          </tr>
          </thead>
          <tbody>
          {this.state.data.map(patient=>{
            return(
              <tr>
                <td>{patient.nombre}</td>
                <td>{patient.sexo}</td>
                <td>{patient.edad}</td>
                <td>{patient.correo}</td>
                <td>{patient.telefono}</td>
                <td>{patient.estado}</td>
                <td>{patient.VuM}</td>
                <td>
                  <button className="btn btn-primary" onClick={()=>{this.seleccionarPaciente(patient); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarPaciente(patient); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalBody>
            <div className="form-group">
              <br />
              <label htmlFor="nombre">Nombre</label>
              <br />
              <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form?form.nombre: ''}/>
              <br />
              <label htmlFor="sexo">Sexo</label>
              <br />
              <input className="form-control" type="text" name="sexo" id="sexo" onChange={this.handleChange} value={form?form.sexo: ''}/>
              <br />
              <label htmlFor="edad">Edad</label>
              <br />
              <input className="form-control" type="text" name="edad" id="edad" onChange={this.handleChange} value={form?form.edad: ''}/>
              <br />
              <label htmlFor="correo">Correo</label>
              <br />
              <input className="form-control" type="text" name="correo" id="correo" onChange={this.handleChange} value={form?form.correo: ''}/>
              <br />
              <label htmlFor="telefono">Telefono</label>
              <br />
              <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono: ''}/>
              <br />
              <label htmlFor="estado">Estado</label>
              <br />
              <input className="form-control" type="text" name="estado" id="estado" onChange={this.handleChange} value={form?form.estado: ''}/>
              <br />
              <label htmlFor="vum">VuM</label>
              <br />
              <input className="form-control" type="text" name="vum" id="vum" onChange={this.handleChange} value={form?form.VuM: ''}/>
            <br />
            </div>
          </ModalBody>

          <ModalFooter>
            {this.state.tipoModal==='insertar'?
              <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                Insertar
              </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                Actualizar
              </button>
            }
            <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Estás seguro que deseas eliminar a {form && form.nombre}
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
