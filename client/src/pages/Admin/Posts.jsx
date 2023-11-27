import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  //obtener todas las publicaciones
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/blog-get-posts");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener las publicaciones");
    }
  };

  //Ciclo de vida
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Layout title={"Blog"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Últimas publicaciones</h1>
          <div className="row">
            {" "}
            {/* Agrega una fila para las tarjetas */}
            {posts?.map((posts) => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
                {" "}
                {/* Define el ancho de la columna para cada tarjeta */}
                <Link
                  key={posts._id}
                  to={`/dashboard/admin/blog/${posts.slug}`}
                  className="product-link"
                >
                  <div className="card">
                    <img
                      src={`/api/v1/blog/blog-photo/${posts._id}`}
                      className="card-img-top img-fluid"
                      alt={posts.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{posts.name}</h5>
                      <p className="card-text">{posts.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Posts;
