import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./productDetails.css";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  //detalles iniciales
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //obtener productos
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getRelatedProducts(data?.product?._id, data?.product?.category?._id);
    } catch (error) {}
  };

  //obtener productos relacionados
  const getRelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {}
  };

  return (
    <Layout>
      <div className="product-details-container">
        <div className="product-main">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="product-image"
          />
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <p>
              Quedan {product.quantity} {product.name} disponibles
            </p>
            <p className="category">Categoría: {product.category?.name}</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Producto agregado al carrito 🛒");
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
        <hr />
        <div className="related-products">
          <h4 className="text-center">También te podría gustar</h4>
          <div className="card-container">
            {relatedProducts.length < 1 ? (
              <p>No hay más productos relacionados</p>
            ) : (
              relatedProducts.map((p) => (
                <div key={p._id} className="card">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5>{p.name}</h5>
                    <button
                      className="btn details-button"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      Más detalles
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Producto agregado al carrito 🛒");
                      }}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
