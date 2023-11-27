import React, {useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({path = 'login'}) => {

  const [count, setCount] = useState(3); // 3 segundos
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(()=>{
      setCount((prevValue)=> --prevValue)
    },1000)
    count === 0 && navigate(`/${path}`, 
    {state: {from: location.pathname}})
    return () => clearInterval(interval)
  },[count,navigate, location, path])

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center"
    style={{height: "100vh"}}>
      <h1 className="text-center">Redirigiendote en {count} </h1>
      <div className="spinner-grow text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
