import Head from 'next/head'
import styles from '../styles/AboutMe.module.css'
import Link from 'next/link'


export default function AboutMe ( ) {
    return (
        <>
            <div className={styles.aboutMe}>
                <h2>About Me</h2>
                <p>
                Hello, I&apos;m Gurjot Singh, a software engineer focused on full stack development.
                I build reliable, scalable web applications and APIs for teams that need production-ready systems.
                I care about performance, accessibility, and maintainable architecture.
                <br/><br/>

                I have 5+ years of experience in enterprise web application development, focused on building
                ROI-driven products that emphasize security, uptime, and speed.
                My work is centered on scalable systems, clean code, and long-term maintainability.
                <br/><br/>

                In my free time, I enjoy walking, meditation and classical music.
                </p>
                <br /> <hr /> 
                <h2>
                    Skillset 
                </h2>
                <h3>Frontend Development</h3>
                <p>HTML, CSS, JavaScript, TypeScript, React, Next.js, Redux</p>
                <h3>Backend Development</h3>
                <p>Node.js, Express, REST APIs, MongoDB, PostgreSQL, MySQL, PHP</p>
                <h3>DevOps &amp; Infrastructure</h3>
                <p>Linux, Nginx, Docker, Kubernetes, Ansible, AWS, Linode</p>
                <a href="https://gurjotsinghdev.vercel.app/resume.pdf">
                <button className="primaryBtn">Download Resume</button></a>
                
            </div>
            
        </>
    )
}
