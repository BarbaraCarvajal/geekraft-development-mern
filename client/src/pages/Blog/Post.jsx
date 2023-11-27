import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../../components/Layout/Layout";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/v1/blog-get-posts/${slug}`);
        setPost(response.data.post);
      } catch (error) {
        console.error("Error al cargar el post", error);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <Layout>
      {post ? (
        <div>
          <h1>{post.title}</h1>
          <img src={`/api/v1/blog-post-photo/${post.slug}`} alt={post.title} />
          <p>{post.content}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Layout>
  );
};

export default Post;
