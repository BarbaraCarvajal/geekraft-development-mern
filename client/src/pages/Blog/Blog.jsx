import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import BlogCard from "./BlogCard"; 

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/v1/blog-get-posts"); 
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error al cargar las publicaciones del blog", error);
        // Maneja el error como consideres adecuado
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <h1>Blog</h1>
      <div className="blog-container">
        {posts.map((post) => (
          <BlogCard key={post._id} {...post} />
        ))}
      </div>
    </Layout>
  );
};

export default Blog;
