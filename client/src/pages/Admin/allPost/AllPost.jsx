import React, { useState, useEffect } from "react";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../../components/Layout/Layout";
import { Link, Navigate } from "react-router-dom";
import "./estilo.css"


const AllPost = () => {
  const [posts, setPosts] = useState([]);

  //obtener todos los productos
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/blog-get-posts");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los productos");
    }
  };

  //Ciclo de vida
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <Layout title={"Publicaciones"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Publicaciones</h1>
          <ul className="list-group">
            {posts?.map((posts) => (
              <li key={posts._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="post-details">
                  <img
                    src={`/api/v1/blog/blog-post-photo/${posts._id}`}
                    alt={posts.title}
                    className="post-image"
                  />
                  <div>
                    <h5 className="post-title">{posts.title}</h5>
                    <p className="post-description">{posts.content.substring(0,400)}</p>
                  </div>
                </div>
                <Link to={`/dashboard/admin/blog-update-post/${posts.slug}`} className="btn btn-primary">
                  Modificar
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
  
  
  
};

export default AllPost;
