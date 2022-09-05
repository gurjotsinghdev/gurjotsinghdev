import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/AllProjects.module.css'
import project1Img from '../public/img/projects/ariadental.png'
import project2Img from '../public/img/projects/unifypartners.png'
import project3Img from '../public/img/projects/ncsfn.png'
import project4Img from '../public/img/projects/fvcl.png'
import Link from 'next/link'

export default function AllProjects() {
    return (
        <>
            <div className={styles.allProjects}>
                <h1>Selected Projects</h1>
                <div className={styles.projectsList}>
                    <Link href="https://ariadental.com/">
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
                    </Link><Link href="https://ariadental.com/">
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
                    </Link>
                    <Link href="https://ariadental.com/">
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
                    </Link>
                    <Link href="https://unifypartners.co/">
                        <div className={styles.projectBox}>
                            <Image
                                src={project2Img}
                                alt="Picture of the author"
                                className={styles.projectImg}
                                width="400"
                                height="200"
                            />
                            <p className={styles.projectTitle}><b>Unify Partners</b> - UI, UX, Dev </p>
                        </div>
                    </Link>
                    <Link href="https://northcoastskeenafirstnations.ca/">
                        <div className={styles.projectBox}>
                            <Image
                                src={project3Img}
                                alt="Picture of the author"
                                className={styles.projectImg}
                                width="400"
                                height="200"
                            />
                            <p className={styles.projectTitle}><b>North Coast Skeena </b> - UX, Dev </p>
                        </div>
                    </Link>
                    <Link href="https://fvcl.ca/">
                        <div className={styles.projectBox}>
                            <Image
                                src={project4Img}
                                alt="Picture of the author"
                                className={styles.projectImg}
                                width="400"
                                height="200"
                            />
                            <p className={styles.projectTitle}><b>Fraser Valley Cataract & Laser</b> - Dev </p>
                        </div>
                    </Link>

                </div>
                <Link href="/about">
                    <button className="primaryBtn"><a>About Me</a></button></Link>
            </div>

        </>
    )
}