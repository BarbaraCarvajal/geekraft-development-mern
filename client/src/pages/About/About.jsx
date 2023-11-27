import React from "react";
import Layout from "../../components/Layout/Layout";
import about from "../../assets/sobre-nosotros.webp";


const About = () => {
  return (
    <Layout title={"Sobre Nosotros - Geekraft"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
        <img src={about} alt="Geekraft Logo" className="contacto" />

        </div>
        <div className="col-md-4">
        <h1 className="bg-contacto p-2 text-white text-center">Sobre Nosotros</h1>

          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;