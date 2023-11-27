import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { message } from "antd";

const Profile = () => {
  //contexto
  const [auth, setAuth] = useAuth();

  //estado
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  //obtener datos del usuario
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        toast.error(data?.error);
      }else{
        toast.success("Perfil actualizado exitosamente 😄");
        setAuth({...auth, user:data?.updatedUser});
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo ha salido mal :c");
    }
  };

  return (
    <Layout title={"Panel de control -  Perfil"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">
            <div className="form">
              <form onSubmit={handleSubmit}>
                <h1>Editar perfil</h1>
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
                    
                    disabled
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
                    
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Actualizar cuenta
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
