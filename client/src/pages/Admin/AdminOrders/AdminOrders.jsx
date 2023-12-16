import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import Layout from "../../../components/Layout/Layout";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { Select } from "antd";
import "./orders.css";

const { Option } = Select;

const { o } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "No procesado",
    "Procesando",
    "Enviado",
    "Entregado",
    "Cancelado",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //obtener ordenes
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const calculateOrderTotal = (products) => {
    // Asegúrate de que products es un array antes de llamar a reduce
    if (!products || !Array.isArray(products)) {
      return 0;
    }
  
    return products.reduce((acc, product) => acc + product.price, 0);
  };
  

  return (
    <Layout title={"Pedidos"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Todos los pedidos</h1>
          {orders?.map((o, i) => {
            const orderTotal = calculateOrderTotal(o.products);
            return (
              <div className="adminOrder adminOrder-shadow">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Estado</th>
                      <th scope="col">Comprador</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Pago</th>
                      <th scope="col">Cantidad</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Exito" : "Fallido"}</td>
                      <td>{o?.products?.length}</td>
                      <td>{orderTotal.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div key={p._id} className="adminOrder-list-item">
                      <div className="adminOrder-list-item-image">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="adminOrder-small-img"
                          alt={p.name}
                          width={"50px"}
                        />
                      </div>
                      <div className="adminOrder-list-item-details">
                        <h5 className="adminOrder-title">{p.name}</h5>
                        <p className="adminOrder-price">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
