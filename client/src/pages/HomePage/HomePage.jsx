import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "./homePage.css";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { Prices } from "../../components/Prices/Prices";
import "react-lazy-load-image-component/src/effects/blur.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (checked.length === 0) {
        setProducts(data?.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Todos nuestros productos - Geekraft"}>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3 filter-wrapper">
            <div className="filter-category">
              <h4>Filtrar por categoría</h4>
              <div className="d-flex flex-column">
                {categories?.map((category) => (
                  <Checkbox
                    key={category._id}
                    onChange={(e) =>
                      handleFilter(e.target.checked, category._id)
                    }
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </div>
            </div>
            <div className="filter-price">
              <h4>Filtrar por Precio</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices?.map((price) => (
                    <div key={price._id}>
                      <Radio value={price.array}>{price.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="filter-actions ">
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                QUITAR FILTROS
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h1>Nuestros Productos</h1>
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
                        <button
                          className="btn add-to-cart-button"
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
                  </div>
                </div>
              ))}
            </div>
            <div className="loadmore-container">
              {products && products.length < total && (
                <button
                  className="btn loadmore-button"
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                >
                  {loading ? (
                    <div className="loading-text">
                      Cargando... <AiOutlineReload className="icon-spin" />
                    </div>
                  ) : (
                    "Cargar más productos"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
