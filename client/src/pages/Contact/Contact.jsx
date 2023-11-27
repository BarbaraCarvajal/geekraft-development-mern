import React from 'react'
import Layout from '../../components/Layout/Layout'
import { BiMailSend, BiPhoneCall } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import contacto from "../../assets/contacto.png";
import './contact.css'

const Contact = () => {

  const instagramUrl = "https://www.instagram.com/jc.geekraft/";


  return (
    <Layout title={"Contactanos"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
        <img src={contacto} alt="Geekraft Logo" className="contacto" />
        </div>
        <div className="col-md-4">
          <h1 className="bg-contacto p-2 text-white text-center">¡Sigamos en contacto!</h1>
          <p className="text-justify mt-2">
            Puedes contactarnos por los siguientes medios
          </p>
          <p className="mt-3">
            <BiMailSend /> : juancarlosgallardo87@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +569 8386 5008
          </p>
          <p className="mt-3">
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <AiOutlineInstagram /> Instagram
            </a>
          </p>
        </div>
      </div>
    </Layout>
    
  )
}

export default Contact