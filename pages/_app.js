import '../styles/globals.css'
import Head from "next/head";
import Header from '../components/header.js'
import Footer from '../components/footer.js'


function MyApp({ Component, pageProps }) {

  return <>
  <Head>            
    <title>Gurjot - Pokémon Trainer & Software Engineer </title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
  <Header />
  <Component {...pageProps} />
  <Footer />
  </>
}

export default MyApp