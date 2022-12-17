import Head from 'next/head'
import styles from '../styles/Hero.module.css'


export default function Hero ( ) {
    return (
        <>
            <div className={styles.heroSection}>
                <h1>
                Hello, I&apos;m Gurjot Singh. <br />I build <u>Enterprise Wordpress</u> applications for mission critical projects. 
               
                </h1>
                <a href="https://linkedin.com/in/gurjotsinghdev">
                <button className="primaryBtn">Lets Connect</button></a>
                <div className={styles.heroMeta}>
                    <div className={styles.position}>
                        <p className={styles.positionPunjabi}>ਐਂਟਰਪ੍ਰਾਈਜ਼ ਵਰਡਪ੍ਰੈਸ ਸਲਾਹਕਾਰ</p>
                        <p className={styles.positionEnglish}>Enterprise Wordpress Consultant</p>
                       
                    </div>
                    <div className={styles.location}>
                    <p className={styles.locationPunjabi}>ਵੈਨਕੂਵਰ, ਬੀ.ਸੀ</p>
                    <p className={styles.locationEnglish}>Vancouver, BC</p>
                    </div>
                </div>
            
            </div>
            
        </>
    )
}