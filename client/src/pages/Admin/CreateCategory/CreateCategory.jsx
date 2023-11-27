import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import AdminMenu from "../../../components/AdminMenu/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../../components/Form/CategoryForm";
import { Modal } from "antd";
import './CreateCategory.css'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");


  //crear categoria
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`La categoria ${name} ha sido creada con exito`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal al crear la categoria");
    }
  };

  //obtener todas las categorias
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al obtener las categorias");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  //actualizar categoria
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(
          `La categoria ${updatedName} ha sido actualizada con exito`
        );
        setSelected(null);
        setUpdatedName("");
        setOpen(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal al actualizar la categoria");
    }
  };

  //eliminar categoria
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`La categoria ${name} ha sido eliminada con exito`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal al actualizar la categoria");
    }
  };



  return (
    <Layout title={"Agregar nueva categoría"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manejo de categorias</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75"></div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {categories?.map((category) => (
                    <>
                      <tr>
                        <td className="nameCategory" key={category._id}>{category.name}</td>
                        <td>
                          <button
                            className="btn btn-info"
                            onClick={() => {
                              setOpen(true);
                              setUpdatedName(category.name);
                              setSelected(category);
                            }}
                          >
                            Editar
                          </button>
                          
                          <button
                            className="btn btn-danger mt-2 ms-3"
                            onClick={() => {
                              handleDelete(category._id);
                            }}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
                
              </table>
            </div>
            <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
