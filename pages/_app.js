import '../styles/globals.css'
import Head from "next/head";
import Header from '../components/header.js'
import Footer from '../components/footer.js'


function MyApp({ Component, pageProps }) {

  return <>
  <Head lang="en">            
    <title>Gurjot - Software Engineer</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <Header />
  <Component {...pageProps} />
  <Footer />
  </>
}

export default MyApp