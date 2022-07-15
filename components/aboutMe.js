import Head from 'next/head'
import styles from '../styles/AboutMe.module.css'


export default function AboutMe ( ) {
    return (
        <>
            <div className={styles.aboutMe}>
                <h2>
                    About Me
                </h2>
                <p>
                    Hello there
                </p>
                <br /> <br />
                <h2>
                    Skillset
                </h2>
                <h3>Product Management</h3> 
                <p>Hello there</p>   
                <h3>UX Design and Research</h3>  
                <h3>Frontend Development</h3>    
                <h3>Backend Development</h3>    
                <h3>Site Reliability Engineering</h3>    
            </div>
            
        </>
    )
}