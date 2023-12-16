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
  const [quantity, setQuantity] = useState(1);
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

  // Función para agregar productos al carrito
  const addProductToCart = (productToAdd) => {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item._id === productToAdd._id);
    if (existingProduct) {
      // Incrementar la cantidad
      const updatedCart = cart.map((cartItem) =>
        cartItem._id === productToAdd._id
          ? { ...cartItem, cartQuantity: cartItem.cartQuantity + quantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // Agregar nuevo producto con la cantidad seleccionada
      const newProductToAdd = { ...productToAdd, cartQuantity: quantity };
      setCart([...cart, newProductToAdd]);
    }
    // Actualizar el almacenamiento local
    localStorage.setItem("cart", JSON.stringify(cart));
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
  
            <div className="product-quantity">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                min="1"
                max={product.quantity} // Asegúrate de no permitir una cantidad mayor al stock disponible
              />
            </div>
  
            <button
              className="btn btn-primary"
              onClick={() => {
                addProductToCart(product);
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
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Más detalles
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        addProductToCart(p);
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
