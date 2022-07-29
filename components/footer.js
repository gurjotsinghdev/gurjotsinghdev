import Head from 'next/head'
import styles from '../styles/Footer.module.css'

export default function Footer ( ) {
    return (
        <>
            <p className={styles.footerSocial}><a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">Email</a> - <a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">LinkedIn</a> - <a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">Github</a> - <a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">Youtube</a> - <a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">Dribbble</a> - <a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">Codepen</a> </p>
            <div className={styles.footer}>
                <p className={styles.footerTitle}>Built with <u><a href="https://www.youtube.com/watch?v=rmru_nIRf9Q&t=727s">Hukam</a></u>, <u><a href="https://www.youtube.com/watch?v=CZqNR42LjlU&t=43s">Kirtan</a></u> & <u><a href="https://nextjs.org/">Next.js</a></u></p>
                <p className={styles.footerText}>Source code&nbsp;<u><a href="https://github.com/gurjotsinghdev/gurjotsinghdev">{    }available on GitHub</a></u>.</p>
             
            </div>
        </>
    )
}