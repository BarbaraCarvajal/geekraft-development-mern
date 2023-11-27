import React from "react";
import Layout from "../../components/Layout/Layout";
import policy from "../../assets/politicas-envio.jpg";


const Policy = () => {
  return (
    <Layout title={"Politica de privacidad"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
        <img src={policy} alt="Geekraft Logo" className="contacto" />
        
        </div>
        <div className="col-md-4">
        <h1 className="bg-contacto p-2 text-white text-center">Politicas de envío y entregas</h1>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates animi ratione earum architecto beatae quibusdam minima necessitatibus aliquam odio? Repudiandae doloremque id recusandae perferendis illum, vel quibusdam ducimus non aliquid.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;