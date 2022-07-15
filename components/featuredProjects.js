import Head from 'next/head'
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
                        // width={500} automatically provided
                        // height={500} automatically provided
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        />
                        <p><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                        // width={500} automatically provided
                        // height={500} automatically provided
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        />
                        <p><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                        // width={500} automatically provided
                        // height={500} automatically provided
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        />
                        <p><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                    <div className={styles.projectBox}>
                        <Image
                            src={project1Img}
                            alt="Picture of the author"
                            className={styles.projectImg}
                        // width={500} automatically provided
                        // height={500} automatically provided
                        // blurDataURL="data:..." automatically provided
                        // placeholder="blur" // Optional blur-up while loading
                        />
                        <p><b>Aria Dental</b> - UX, Dev </p>
                    </div>
                </div>
                <button className="primaryBtn"><a href="https://linkedin.com/in/gurjotsinghdev">View Projects</a></button>
            </div>

        </>
    )
}