import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./estilos.css";

const UpdatePost = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [updating, setUpdating] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //obtener una publicación
  const getSinglePost = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/blog/blog-get-posts/${params.slug}`
      );
      setTitle(data.post.title);
      setId(data.post._id);
      setContent(data.post.content);
    
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSinglePost();
    //eslint-disable-next-line
  }, []);

  //actualizar publicación
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Validar que los campos requeridos no estén vacíos
    if (!title || !content) {
      toast.error("Todos los campos son obligatorios.");
      return; // Detiene la ejecución si hay algún campo vacío
    }
    
    // Configura el estado de actualización a true
    setUpdating(true);
    
    try {
      const postData = new FormData();
      postData.append("title", title);
      postData.append("content", content);
      if (photo) postData.append("photo", photo);
      
      // Realizar la petición de actualización
      const { data } = await axios.put(
        `/api/v1/blog/blog-update-post/${id}`,
        postData
      );
  
      // Verificar el éxito de la respuesta
      if (data?.success) {
        toast.success("Publicación actualizada con éxito.");
        navigate("/dashboard/admin/blog-get-posts");
      } else {
        // Si hay un mensaje de error del servidor, muéstralo
        toast.error(data?.message);
      }
    } catch (error) {
      // Manejar los errores de la petición
      console.log(error);
      toast.error("Algo salió mal al actualizar la publicación.");
    } finally {
      // Configura el estado de actualización a false independientemente del resultado
      setUpdating(false);
    }
  };
  

  //eliminar publicación
  const handleDelete = async (e) => {
    try {
      let answer = window.prompt("¿Estás seguro de eliminar esta publicación?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/blog/blog-delete-post/${id}`
      );
      toast.success("Publicación eliminada con exito");
      navigate("/dashboard/admin/blog-get-posts");
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal al eliminar la publicación");
    }
  };

  return (
    <Layout title={"Actualizar Publicación"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Actualizar Publicación</h1>
            {/* Mensaje de actualización y spinner */}
            {updating && (
              <div className="updating-message text-center">
                <div className="spinner"></div>
                <h3>Actualizando Publicación...</h3>
              </div>
            )}
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Actualizar imagen"}
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/blog/blog-post-photo/${id}`}
                      alt="post_photo"
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
                  placeholder="Cambiar el titulo de la publicación"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={content}
                  placeholder="Cambiar el contenido de la publicación"
                  className="form-control"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate} disabled={updating}>
                  ACTUALIZAR PUBLICACIÓN
                </button>
                <button className="btn btn-danger ms-3" onClick={handleDelete} disabled={updating}>
                  ELIMINAR PUBLICACIÓN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdatePost;
