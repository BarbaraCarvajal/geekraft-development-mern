import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import "./PostsList.css"; // Importa tus estilos personalizados

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/blog/blog-get-posts");
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  if (loading) return <h1>Cargando publicaciones...</h1>;

  return (
    <Layout title={"Últimas publicaciones"}>
      <div className="blog-posts">
        <h1>Nuestras últimas publicaciones</h1>
        {posts.map((post) => (
          <div className="blog-post" key={post._id}>
            <img
              src={`/api/v1/blog/blog-post-photo/${post._id}`}
              alt={post.title}
              className="blog-post-image"
            />
            <div className="blog-post-content">
              <h3 className="blog-post-title">{post.title}</h3>
              <p className="blog-post-text">
                {post.content.substring(0, 200)}...
              </p>
              <button
                className="btn btn-primary ms-1"
                onClick={() => navigate(`/blog/blog-get-posts/${post.slug}`)}
              >
                Leer más
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PostsList;
