import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./navBar.css"; // Asegúrate de que este archivo contenga los estilos CSS actualizados
import Logo from "../../assets/logo.png";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Sesión cerrada con éxito");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-purple">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <img src={Logo} alt="Geekraft Logo" className="logo" />
          Geekraft
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link">
                Inicio
              </NavLink>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                data-bs-toggle="dropdown"
              >
                Categorias
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/categories"}>
                    Todas las categorías
                  </Link>
                </li>
                {categories?.map((c) => (
                  <li key={c.slug}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Botón del Blog con la nueva clase CSS */}
            <li className="nav-item">
              <NavLink to={"/posts"} className="nav-link nav-blog-link">
                Blog
              </NavLink>
            </li>
          </ul>

          <SearchInput />

          {/* Menú desplegable para usuario autenticado */}
          <ul className="navbar-nav ml-auto">
            {auth?.user ? (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1
                          ? "admin"
                          : auth?.user?.role === 2
                          ? "assistant"
                          : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Panel de control
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      Cerrar Sesión
                    </NavLink>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink to="/register" className="nav-link">
                    Registrarse
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Iniciar Sesión
                  </NavLink>
                </li>
              </>
            )}

            <li className="nav-item cart-item">
              <Badge count={cart?.length} showZero>
                <NavLink to={"/cart"} className="nav-link">
                  <i className="fas fa-shopping-cart"></i>{" "}
                  <i className="bi bi-cart"></i>
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
