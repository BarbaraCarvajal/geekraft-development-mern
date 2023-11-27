import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./PostDetail.css"; // Asegúrate de que el archivo de estilos esté correctamente vinculado

const PostDetail = () => {
  const params = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    if (params?.slug) getPost();
  }, [params?.slug]);

  const getPost = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/blog/blog-get-posts/${params.slug}`
      );
      setPost(data?.post);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="post-detail-container">
        <div className="post-image">
          <img
            src={`/api/v1/blog/blog-post-photo/${post._id}`}
            alt={post.title}
          />
        </div>
        <div className="post-content">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      </div>
    </Layout>
  );
};

export default PostDetail;
