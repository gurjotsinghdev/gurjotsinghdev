import Head from 'next/head'
import styles from '../styles/AboutMe.module.css'
import Link from 'next/link'


export default function AboutMe ( ) {
    return (
        <>
            <div className={styles.aboutMe}>
                <h2>About Me</h2>
                <p>
                Hello, I&apos;m Gurjot Singh. A Product Manager & Software Engineer. 
                I&apos;m passionate about solving problems through delightful user experience. 
                This passion has taken me on a journey through my career in engineering, design, and project leadership. 
                <br/><br/>

                In my free time, I enjoy walking, meditation and classical music.
                </p>
                <br /> <hr /> 
                <h2>
                    Skillset 
                </h2>
                <h3>Full Stack Development </h3>
                <p>HTML, CSS, Javascript, Reactjs, Redux,  Nextjs, Nodejs, Express, MongoDB</p>   
                <h3>UI/UX Design</h3>  
                <p>Branding, UI Kits, Design Systems, Userflow, Wireframes</p>   
                <h3>Site Reliability Engineering</h3>  
                <p>Linux, Nginx, Docker, Kubernetes, Ansible, AWS, Linode</p>    
                <a href="https://gurjotsinghdev.vercel.app/resume.pdf">
                <button className="primaryBtn">Download Resume</button></a>
                
            </div>
            
        </>
    )
}