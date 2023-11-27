import React from "react";
import "./BlogCard.css"; // Asegúrate de crear un archivo CSS para estilos específicos de BlogCard

const BlogCard = ({ title, summary, imageUrl, link }) => {
  return (
    <div className="blog-card">
      {imageUrl && <img src={imageUrl} alt={title} className="blog-card-image" />}
      <div className="blog-card-content">
        <h2 className="blog-card-title">{title}</h2>
        <p className="blog-card-summary">{summary}</p>
        <a href={link} className="blog-card-read-more">Read More</a>
      </div>
    </div>
  );
};

export default BlogCard;
