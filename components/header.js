import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/gurjotsinghdev_logo.png'
import styles from '../styles/Header.module.css'
import pokeball from '../public/pokeball1.png'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


export default function Header() {
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
                    <Link href="/projects"><a>Projects</a></Link>
                    <Link href="/about"><a>About</a></Link>
                    <Link href="/blog"><a>Blog</a></Link>
                    <Popup trigger={<button className="pokebutton"> <Image
                        src={pokeball}
                        alt="Picture of the author"
                        className={styles.pokeball}
                        width={40}
                        height={40}
                    /> </button>}
                        position="bottom center">
                        <div>GeeksforGeeks</div>
                        <button>Click here</button>
                    </Popup>

                </div>
            </div >
        </>
    )
}