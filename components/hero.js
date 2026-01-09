import Head from 'next/head'
import styles from '../styles/Hero.module.css'
export default function Hero ( ) {
    const whatsappUrl = 'https://wa.me/17789290374?text=Hi%20Gurjot%2C%20I%27d%20like%20to%20discuss%20a%20project.';

    return (
        <>
            <div className={styles.heroSection}>
                <h1>
                Hello, I&apos;m Gurjot Singh. <br />I build enterprise-grade web applications for mission critical projects. 
               
                </h1>
                <a className="primaryBtn" href={whatsappUrl} rel="noopener noreferrer" target="_blank">
                    Lets Connect
                </a>
                <div className={styles.heroMeta}>
                    <div className={styles.position}>
                        <p className={styles.positionPunjabi}>ਸੋਫਟਵੇਅਰ ਇੰਜੀਨੀਅਰ</p>
                        <p className={styles.positionEnglish}>Software Engineer</p>
                       
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
