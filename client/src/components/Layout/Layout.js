import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { Helmet } from 'react-helmet'

export default function Layout({children,title,keywords,author,description}) {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
    </Helmet>
    <Header/>
    <main className="bg-dark main">{children}</main>
    <Footer/>
    </>
  )
}

Layout.defaultProps={
  title:"ECommerce",
  description:"ECommerce website which is used to shop various type of product at maximum discount.",
  author:"Vicky Kumar Singh",
  keywords:"html,css,javascript,react.js,node.js,full stack ecommerce , shoping website , mern project"
}