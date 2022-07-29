import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/gurjotsinghdev_logo.png'
import pokeball from '../public/pokeball.png'
import styles from '../styles/Header.module.css'

export default function Header ( ) {
    return (
        <>  
    
            <div className={styles.header}>
                <h1 className={styles.logo}> 
                <Link href="/"><a>
                <Image
                        src={logo}
                        alt="Picture of the author"
                        className={styles.logo}
                        width={80}
                        height={80}
                    />
                </a></Link> 
                </h1>
                <div className={styles.mainMenu}>
                    <Link href="/work"><a>Work</a></Link>
                    <Link href="/about"><a>About</a></Link>
                    <Link href="/blog"><a>Blog</a></Link>
                    {/* <Link href="/pokedex"><a>
                    <Image
                        src={pokeball}
                        alt="Picture of the author"
                        className={styles.pokeball}
                        width={40}
                        height={40}
                    />
                    </a>
                    </Link> */}

                </div>
            </div>
        </>
    )
}