import Head from 'next/head'
import styles from '../styles/Hero.module.css'


export default function Hero ( ) {
    return (
        <>
            <div className={styles.heroSection}>
                <h1>
                Hello, I&apos;m Gurjot Singh. <br />I build scalable products 
                with <span className="dark">design</span> & <span className="dark">engineering</span>. 
                </h1>
                <button className="primaryBtn"><a href="https://linkedin.com/in/gurjotsinghdev">Let's Connect</a></button>
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