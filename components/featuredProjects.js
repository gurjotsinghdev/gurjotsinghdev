import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/FeaturedProjects.module.css'

export default function FeaturedProjects ( ) {
    return (
        <>
            <div className={styles.featuredProjects}>
               <h1>Selected Projects</h1>
               <div className="projectsList">
                   <div className="project1">
                       {/* <Image src="/public/img/projects/unifypartners.png" alt="" width={500} height={300} /> */}
                   </div>
               </div>
               <button className="primaryBtn"><a href="https://linkedin.com/in/gurjotsinghdev">View All Projects</a></button>
            </div>
            
        </>
    )
}