import Head from 'next/head'
import styles from '../styles/AboutMe.module.css'


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
                <h3>Product Management</h3> 
                <p>Trello, Notion, Slack, Skype, Teams</p>   
                <h3>UX Design and Research</h3>  
                <p>UI Kit, Userflow, Persona, Wireframing, Prototypes </p>   
                <h3>Frontend Development</h3>   
                <p>HTML, CSS, Typescript, React, Redux, Next.js </p>   
                <h3>Backend Development</h3>    
                <p>Node.js, Express.js, Strapi, MongoDB, PostgreSQL</p>   
                <h3>Site Reliability Engineering</h3> 
                <p>Datadog, Kibana </p>   
   
            </div>
            
        </>
    )
}