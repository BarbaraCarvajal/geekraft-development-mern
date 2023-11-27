import useCategory from "../../hooks/useCategory";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import React, {useState, useEffect} from "react";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"Todas las categorías"}>
      <h1>Todas las categorías</h1>
      <div className="container">
        <div className="row">
          {categories.map((c) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
