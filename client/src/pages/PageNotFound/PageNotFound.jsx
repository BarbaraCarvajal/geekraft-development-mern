import React from 'react'
import Layout from '../../components/Layout/Layout'
import { Link } from 'react-router-dom'
import '../PageNotFound/pageNotFound.css'

const PageNotFound = () => {
  return (
    <Layout title={"Devuelvete, página no encontrada"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Página no encontrada </h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
    
  )
}

export default PageNotFound