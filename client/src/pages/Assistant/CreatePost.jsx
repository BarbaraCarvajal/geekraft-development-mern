import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AssistantMenu from "../../components/AssistantMenu/AssistantMenu";


const CreatePostAssistant = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");

  //crear publicación
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("content", content);
      postData.append("photo", photo);

      const response = await axios.post("/api/v1/blog/blog-create-post", postData);
      if (response.data.success) {
        toast.success("Publicación creada con éxito");
        navigate("/posts");
      } else {
        toast.error(response.data.error || "Error al crear la publicación");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "Algo salió mal al crear la publicación");
    }
  };

  return (
    <Layout title={"Dashboard - Crear Publicación"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AssistantMenu />
          </div>
          <div className="col-md-9">
            <h1>Crear Publicación</h1>
            <div className="m-1 w-75">
              
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Subir imagen"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="Ingresar el título del la publicación"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={content}
                  placeholder="Escribe el cuerpo de la publicación"
                  className="form-control"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREAR PUBLICACIÓN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatePostAssistant;
