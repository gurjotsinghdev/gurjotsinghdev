import '../styles/globals.css'
import Head from "next/head";
import Header from '../components/header.js'
import Footer from '../components/footer.js'


function MyApp({ Component, pageProps }) {

  return <>
  <Head>            
    <title>Gurjot Singh - Software Engineer</title>
    <link rel="icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      key="description"
      name="description"
      content="Gurjot Singh is a software engineer focused on full stack development, building reliable web applications and APIs."
    />
  </Head>
  <Header />
  <Component {...pageProps} />
  <Footer />
  </>
}

export default MyApp
