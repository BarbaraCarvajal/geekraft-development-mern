import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Helmet } from 'react-helmet'
import { Toaster } from 'react-hot-toast'

const Layout = ({children, title, description,keywords, author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{minHeight: '70vh'}}>
        <Toaster />
        {children}
      </main>
      <Footer/>
    </div>
  );
};

Layout.defaultProps = {
  title: 'Geekraft',
  description: 'Tienda de productos geek realizados en impresion 3d ',
  keywords: 'geek, productos, tienda, gamer, geekraft, impresion 3d, gamer, anime, geekraft',
  author: 'Bárbara Carvajal - Juan Carlos Gallardo'
};

export default Layout