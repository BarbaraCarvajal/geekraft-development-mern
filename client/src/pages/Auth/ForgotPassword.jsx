import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import Layout from "../../components/Layout/Layout";
import "./estilos-register-login.css";

const ForgotPassword = () => {
  //Inicialización de estados para el formulario de inicio de sesión
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  //Inicialización de hook para redireccionar
  const navigate = useNavigate();

  //Función para enviar el formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/auth/forgot-password', {
        email,
        newPassword,
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
    <Layout title={"Cambiar Contraseña"}>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h1>Cambiar contraseña</h1>

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
              Nueva contraseña
            </label>
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="contraseña123"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Ingresa tu respuesta secreta (color favorito)
            </label>
            <input
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              type="text"
              className="form-control"
              id="exampleInputText"
              placeholder="rojo"
              required
            />
          </div>
          <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Cambiar contraseña
          </button>
          <br /><br />
          </div>
          
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
