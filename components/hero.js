import Head from 'next/head'
import styles from '../styles/Hero.module.css'
import Link from 'next/link'


export default function Hero ( ) {
    return (
        <>
            <div className={styles.heroSection}>
                <h1>
                Hello, I&apos;m Gurjot Singh. <br />I build enterprise-grade web applications and digital ecommerce solutions for mission critical projects. 
               
                </h1>
                <Link href="https://linkedin.com/in/gurjotsinghdev" rel="noopener noreferrer" target="_blank">
                <button className="primaryBtn">Lets Connect</button></Link>
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