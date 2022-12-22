import Head from 'next/head'
import styles from '../styles/Hero.module.css'

export default function Hero ( ) {
    return (
        <>
            
            <div className={styles.heroSection}>
                <div className={styles.heroInfo}>
                    <h1>
                    Hello, I&apos;m Gurjot Singh. <br />I build <u>Enterprise Wordpress</u> applications for mission critical projects. 
                
                    </h1>
                    <a href="https://linkedin.com/in/gurjotsinghdev">
                    <button className="primaryBtn">Lets Connect</button></a>
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

                <div className={styles.heroLottie}>
                <div>  
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
          <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_1cazwtnc.json"  background="transparent"  speed="0.5"  loop autoplay></lottie-player>
        </div>
                </div>
            </div>
            
            
        </>
    )
}