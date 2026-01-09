import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/AllProjects.module.css'
import project1Img from '../public/img/projects/ariadental.png'
import project2Img from '../public/img/projects/unifypartners.png'
import project3Img from '../public/img/projects/ncsfn.png'
import project4Img from '../public/img/projects/fvcl.png'
import sharanContentImg from '../public/img/projects/sharan-content.png'
import loginMagicianImg from '../public/img/projects/login-magician.png'

import Link from 'next/link'

export default function AllProjects() {
    return (
        <>
            <div className={styles.allProjects}>
                <h1>Projects Library</h1>
                <div className={styles.projectsList}>
                    <Link href="https://unifypartners.co/">
                        <div className={styles.projectBox}>
                            <Image
                                src={project2Img}
                                alt="Picture of the author"
                                className={styles.projectImg}
                                width="400"
                                height="200"
                            />
                            <p className={styles.projectTitle}><b>Unify Partners</b> - Full Stack Development</p>
                        </div>
                    </Link>
                    <Link href="https://wordpress.org/plugins/login-magician/">
                        <div className={styles.projectBox}>
                            <Image
                                src={loginMagicianImg}
                                alt="Picture of the author"
                                className={styles.projectImg}
                                width="400"
                                height="200"
                            />
                            <p className={styles.projectTitle}><b>Login Magician</b> - Plugin Development</p>
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
                            <p className={styles.projectTitle}><b>Aria Dental</b> - Web Development</p>
                        </div>
                    </Link>
                    <Link href="https://github.com/gurjotsinghdev/sharan-content">
                        <div className={styles.projectBox}>
                            <Image
                                src={sharanContentImg}
                                alt="Picture of the author"
                                className={styles.projectImg}
                                width="400"
                                height="200"
                            />
                            <p className={styles.projectTitle}><b>Sharan Content</b> - Web App Development</p>
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
                            <p className={styles.projectTitle}><b>North Coast Skeena </b> - Web Development</p>
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
                            <p className={styles.projectTitle}><b>FVCL</b> - Web Development</p>
                        </div>
                    </Link>

                </div>
                <Link href="/about">
                    <button className="primaryBtn"><a>About Me</a></button></Link>
            </div>

        </>
    )
}
