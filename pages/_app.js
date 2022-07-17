import '../styles/globals.css'
import Head from "next/head";
import Header from '../components/header.js'
import Footer from '../components/footer.js'


function MyApp({ Component, pageProps }) {

  return <>
  <Header />
  <Component {...pageProps} />
  <Footer />
  </>
}

export default MyApp