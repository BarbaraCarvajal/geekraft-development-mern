import Layout from "../../components/Layout/Layout";
import "./CartPage.css";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Transferencia from "../../assets/transferenciaaa.png";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [transferReceipt, setTransferReceipt] = useState("");

  const postData = new FormData();
  postData.append("transferReceipt", transferReceipt);

  const navigate = useNavigate();

  const [payByTransfer, setPayByTransfer] = useState(false);

  // Manejar cambio en el checkbox de pago por transferencia
  const handleTransferChange = (e) => {
    setPayByTransfer(e.target.checked);
  };

  // Manejar la subida del comprobante de transferencia
  const handleTransferReceiptUpload = (e) => {
    setTransferReceipt(e.target.files[0]);
  };

  // Remover item del carrito
  const removeCartItem = (pid) => {
    const updatedCart = cart.filter((item) => item._id !== pid);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Obtener pago gateway token
  const getToken = async () => {
    try {
      const response = await axios.get("/api/v1/product/braintree/token");
      setClientToken(response.data.clientToken);
    } catch (error) {
      console.error("Error al obtener el token de Braintree:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  // Procesar pago
  const handlePayment = async () => {
    setLoading(true);
    try {
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      toast.success("Pago realizado con éxito");
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      toast.error("Error al realizar el pago");
    } finally {
      setLoading(false);
    }
  };

  // Esta función debe ser llamada cuando un usuario agrega un producto al carrito.
  const addProductToCart = (productToAdd, quantityToAdd) => {
    const cartItem = {
      ...productToAdd,
      cartQuantity: quantityToAdd, // Usamos 'cartQuantity' para evitar confusión con el 'quantity' del stock
    };
    delete cartItem.quantity; // Eliminamos el 'quantity' original para evitar confusión.
    setCart([...cart, cartItem]);
  };

  const incrementQuantity = (productId) => {
    const newCart = cart.map((item) => {
      if (item._id === productId) {
        return { ...item, cartQuantity: item.cartQuantity + 1 };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  
  const decrementQuantity = (productId) => {
    const newCart = cart.map((item) => {
      if (item._id === productId && item.cartQuantity > 1) {
        return { ...item, cartQuantity: item.cartQuantity - 1 };
      }
      return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  

  // Actualiza la función de cálculo del total para usar 'cartQuantity' en lugar de 'quantity'.
  const totalPrice = () => {
    return (
      cart
        ?.reduce((acc, item) => acc + item.price * (item.cartQuantity || 1), 0)
        .toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
        }) || "0"
    );
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-ligth p-2 mb-1">
              {`Hola ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `Tienes ${cart?.length} productos en tu carrito ${
                    auth?.token ? "" : "Inicia sesión para comprar"
                  }`
                : "Tu carrito esta vacío "}
              <i className="bi bi-cart3"></i>
            </h4>
          </div>
          <div className="row">
            <div className="col-md-8 cart-items-list">
              {cart?.map((p) => (
                <div key={p._id} className="cart-item">
                  <div className="cart-item-image">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h5 className="cart-item-title">{p.name}</h5>
                    <p className="cart-item-price">${p.price}</p>
                    <p className="cart-item-quantity">
                      Cantidad: {p.cartQuantity}
                    </p>
                    <p className="cart-item-total">
                      Precio total: ${p.price * p.cartQuantity}
                    </p>
                  </div>
                  <button
                    className="btn btn-danger remove-item-button"
                    onClick={() => removeCartItem(p._id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                  <div className="quantity-controls">
                    <button onClick={() => decrementQuantity(p._id)}>-</button>
                    <span>{p.cartQuantity}</span>
                    <button onClick={() => incrementQuantity(p._id)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4 text-center">
              <h2>Resumen de tu compra</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total: {totalPrice()}</h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Dirección para el envío</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Actualizar dirección
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Actualizar Dirección
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Por favor iniciar sesión
                    </button>
                  )}
                </div>
              )}
              <div className="payment-options">
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button className="btn btn-primary" onClick={handlePayment}>
                      {loading ? "Procesando..." : "Pagar con Tarjeta"}
                    </button>
                  </>
                )}
                <br />
                <div>
                  <input
                    type="checkbox"
                    id="payByTransfer"
                    checked={payByTransfer}
                    onChange={handleTransferChange}
                  />
                  <label htmlFor="payByTransfer">
                    Pagar por Transferencia Bancaria
                  </label>
                </div>
                {payByTransfer && (
                  <div>
                    <img
                      src={Transferencia}
                      alt="Geekraft transferencia"
                      className="transferencia"
                    />

                    <div>
                      <label className="btn btn-primary">
                        {transferReceipt
                          ? transferReceipt.name
                          : "Subir comprobante"}
                        <input
                          type="file"
                          name="transferReceipt"
                          accept="image/*"
                          onChange={(e) =>
                            setTransferReceipt(e.target.files[0])
                          }
                          hidden
                        />
                      </label>
                    </div>
                    <div>
                      {transferReceipt && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(transferReceipt)}
                            alt="transferReceipt"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
