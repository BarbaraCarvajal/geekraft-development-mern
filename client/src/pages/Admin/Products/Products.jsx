import React, { useState, useEffect } from "react";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./estilo.css";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para buscar productos
  const searchProducts = async (keyword) => {
    try {
      if (!keyword.trim()) {
        getAllProducts();
        return;
      }
      const { data } = await axios.get(`/api/v1/product/search/${keyword}`);
      setProducts(data); // Actualiza los productos con los resultados de la búsqueda
    } catch (error) {
      console.log(error);
      toast.error("Error al buscar productos");
    }
  };

  // Efecto para manejar la búsqueda
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchProducts(searchTerm);
    }, 500); // Retraso para no sobrecargar con peticiones

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  //obtener todos los productos
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener los productos");
    }
  };

  //Ciclo de vida
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Productos"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Productos</h1>
  
          {/* Campo de Búsqueda */}
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '50%', height: '30px' }}
          />
          <ul className="list-group">
            {products.map((producto) => (
              <li key={producto._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="product-details">
                  <img
                    src={`/api/v1/product/product-photo/${producto._id}`}
                    alt={producto.name}
                    className="product-image"
                  />
                  <div>
                    <h5 className="product-title">{producto.name}</h5>
                    <p className="product-description">{producto.description.substring(0, 100)}</p>
                  </div>
                </div>
                <Link to={`/dashboard/admin/product/${producto.slug}`} className="btn btn-primary">
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

export default Products;
