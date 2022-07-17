import Head from 'next/head'
import FeaturedProjects from '../components/featuredProjects'
import Hero from '../components/hero'

export default function Home() {
  return (
    <>
     <Head>
        <title>Gurjot Singh - Software Engineer</title>

      </Head>
    <Hero />
    <FeaturedProjects />
    </>
  )
}