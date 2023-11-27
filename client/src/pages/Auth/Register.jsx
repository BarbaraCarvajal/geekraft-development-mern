import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import Layout from "../../components/Layout/Layout";
import "./estilos-register-login.css";

const Register = () => {
  //Inicialización de estados para el formulario de registro
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");


  //Inicialización de hook para redireccionar
  const navigate = useNavigate();

  //Función para enviar el formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/register', {
        name,
        email,
        password,
        phone,
        address,
        answer
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo ha salido mal :c");
    }
  };

  return (
    <Layout title={"¡Registrate ahora!"}>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1>Registro</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Nombre de usuario
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              className="form-control"
              id="exampleInputText"
              placeholder="Mario Hugo"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputMail" className="form-label">
              Correo electrónico
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="mail"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="geekraft@mail.com"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Contraseña
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="contraseña123"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPhone" className="form-label">
              Teléfono
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder="+569 8386 5008"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              Dirección para envíos
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Av. Siempreviva 123"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputAddress" className="form-label">
              ¿Cuál es tu color favorito?
            </label>
            <input
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="ejem: rosado"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Crear cuenta
          </button>
          
        </form>
      </div>
    </Layout>
  );
};

export default Register;
