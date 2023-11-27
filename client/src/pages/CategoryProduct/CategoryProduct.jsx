import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { set } from "mongoose";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.slug) getProductsByCategory();
  }, [params?.slug]);

  const getProductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h1>{category?.name}</h1>
        <h5>{products?.length} productos encontrados</h5>
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex flex-wrap">
              {products?.map((product) => (
                <div className="product-card" key={product._id}>
                  <div className="product-image-container">
                    <img
                      src={`/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      effect="blur"
                      className="img-top"
                    />
                  </div>
                  <div className="product-info">
                    <h5 className="product-name">{product.name}</h5>
                    <p className="product-price">
                      {product.price.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })}
                    </p>
                    <p className="product-description">
                      {product.description.substring(0, 20)}...
                    </p>
                    <div className="product-meta">
                      <p className="product-stock">Stock: {product.quantity}</p>
                      <div className="product-actions">
                        <button
                          className="btn details-button"
                          onClick={() => navigate(`/product/${product.slug}`)}
                        >
                          Más detalles
                        </button>
                        {/*  <button
                      className="btn btn-primary"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem("cart", JSON.stringify([...cart, product]));
                        toast.success("Producto agregado al carrito 🛒");
                      }}
                    >
                      Agregar al carrito
                    </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
