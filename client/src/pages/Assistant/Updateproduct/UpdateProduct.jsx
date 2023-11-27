import React, { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./estilos.css";
import AssistantMenu from "../../../components/AssistantMenu/AssistantMenu";

const { Option } = Select;

const UpdateProductAssistant = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [updating, setUpdating] = useState(false);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //obtener un producto
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category._id);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //obtener todas las categorias
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //actualizar producto
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Validar que los campos requeridos no estén vacíos
    if (!name || !description || !price || !category || !quantity) {
      toast.error("Todos los campos son obligatorios.");
      return; // Detiene la ejecución si hay algún campo vacío
    }
    
    // Configura el estado de actualización a true
    setUpdating(true);
    
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      
      // Realizar la petición de actualización
      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
  
      // Verificar el éxito de la respuesta
      if (data?.success) {
        toast.success("Producto actualizado con éxito.");
        navigate("/dashboard/assistant/products");
      } else {
        // Si hay un mensaje de error del servidor, muéstralo
        toast.error(data?.message);
      }
    } catch (error) {
      // Manejar los errores de la petición
      console.log(error);
      toast.error("Algo salió mal al actualizar el producto.");
    } finally {
      // Configura el estado de actualización a false independientemente del resultado
      setUpdating(false);
    }
  };
  

  //eliminar producto
  const handleDelete = async (e) => {
    try {
      let answer = window.prompt("¿Estás seguro de eliminar este producto?");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Producto eliminado con exito");
      navigate("/dashboard/assistant/products");
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal al eliminar el producto");
    }
  };

  return (
    <Layout title={"Actualizar Producto"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AssistantMenu />
          </div>
          <div className="col-md-9">
            <h1>Actualizar Producto</h1>
            {/* Mensaje de actualización y spinner */}
            {updating && (
              <div className="updating-message text-center">
                <div className="spinner"></div>
                <h3>Actualizando producto...</h3>
              </div>
            )}
            <div className="m-1 w-75">
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Actualizar imagen"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Cambiar nombre del producto"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Cambiar la descripción"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Actualizar precio $"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Stock"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <Select
                bordered={true}
                placeholder="Cambiar de categoría"
                size="large"
                className=" mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
              <button className="btn btn-primary ms-3" onClick={handleUpdate} disabled={updating}>
                  ACTUALIZAR PRODUCTO
                </button>
                
                <button className="btn btn-danger ms-3" onClick={handleDelete} disabled={updating}>
                  ELIMINAR PRODUCTO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProductAssistant;
