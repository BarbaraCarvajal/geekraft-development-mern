import React from "react";
import { NavLink } from "react-router-dom";
import "./AssistantMenu.css"; 

const AssistantMenu = () => {
  return (
    <>
      <div className="text-center">
        <ul className="list-group">
          <h1>Panel de Asistente</h1>
          <NavLink
            to="/dashboard/assistant/create-category"
            className="list-group-item purple-link"
            aria-current="true"
          >
            Categorías
          </NavLink>
          <NavLink
            to="/dashboard/assistant/create-product"
            className="list-group-item purple-link"
          >
            Crear Producto
          </NavLink>
          <NavLink
            to="/dashboard/assistant/products"
            className="list-group-item purple-link"
          >
            Productos
          </NavLink>
          <NavLink
            to="/dashboard/assistant/blog-create-post"
            className="list-group-item purple-link"
          >
            Crear publicación
          </NavLink>
          <NavLink
            to="/dashboard/assistant/blog-get-posts"
            className="list-group-item purple-link"
          >
            Ver publicaciones
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default AssistantMenu;
