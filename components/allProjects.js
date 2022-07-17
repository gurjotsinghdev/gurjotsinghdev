import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/AllProjects.module.css'
import project1Img from '../public/img/projects/ariadental.png'
import Link from 'next/link'

export default function AllProjects() {
    return (
        <>
            <div className={styles.allProjects}>
                <h1>Selected Projects</h1>
                <div className={styles.projectsList}>  
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width={600}
                            height={300}
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width={600}
                            height={300}
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width={600}
                            height={300}
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                            width={600}
                            height={300}
                        />
                        <p className={styles.projectTitle}><b>Aria Dental</b> - UX, Dev </p>
                    </div>

                </div>
                <Link href="/about">
                <button className="primaryBtn"><a>About Me</a></button></Link>
            </div>

        </>
    )
}