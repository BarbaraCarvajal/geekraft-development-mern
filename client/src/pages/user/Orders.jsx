import React, { useState, useEffect } from "react";
import UserMenu from "../../components/UserMenu/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  //obtener ordenes
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Tus Pedidos"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Tus Pedidos</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Comprador</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Pago</th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Exito" : "Fallido"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row">
                        <div className="col-md-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height={"100px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <h5 className="card-title">{p.name}</h5>
                          <p className="card-text">{p.description}</p>
                          <p className="card-text">${p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
