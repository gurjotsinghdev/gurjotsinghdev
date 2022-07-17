import Head from 'next/head'
import Link from 'next/link'

import Image from 'next/image'
import styles from '../styles/FeaturedProjects.module.css'
import project1Img from '../public/img/projects/ariadental.png'

export default function FeaturedProjects() {
    return (
        <>
            <div className={styles.featuredProjects}>
                <h1>Selected Projects</h1>
                <div className={styles.projectsList}>  
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width="400"
                            height="200"
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width="400"
                            height="200"
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width="400"
                            height="200"
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width="400"
                            height="200"
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>

                </div>
                <Link href="/work">
                <button className="primaryBtn"><a>View Projects</a></button></Link>
            </div>

        </>
    )
}