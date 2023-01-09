import Head from 'next/head'
import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <>
            <div className={styles.footer}>
                <p className={styles.footerSocial}>
                    <a href="https://www.youtube.com/@gurjotsinghdev"> Youtube </a> -
                    <a href="https://www.github.com/gurjotsinghdev"> Github </a> -
                    <a href="https://codepen.io/gurjotsinghdev/"> Codepen </a> -
                    <a href="https://stackoverflow.com/users/17474663/gurjot-singh"> Stack Overflow </a>
                    </p>

                <p className={styles.footerText}>Source code&nbsp;<u><a href="https://github.com/gurjotsinghdev/gurjotsinghdev">available on GitHub</a></u>.</p>

            </div>
        </>
    )
}