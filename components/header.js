import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/gurjotsinghdev_logo.png'
import styles from '../styles/Header.module.css'
import pokeball from '../public/pokeball.png'
import 'reactjs-popup/dist/index.css';

let pokepop = () => {
    let pokepop = document.getElementById("pokepopboxid");
    if (pokepop.style.display == "block") {
        pokepop.style.display = "none";
      } else {
        pokepop.style.display = "block";
        setTimeout(() => {
            pokepop.style.display = "none";
          }, "3000")
      }
}


  

let HidePokeBox = () => {
    let hirePokeBox = document.getElementById("pokepopboxid");
    hirePokeBox.style.display = "none";
}


export default function Header() {

    return (
        <>
            <div className={styles.topHeader}>
                <p>Want to chat about your dream project? <a href="https://calendly.com/gurjotsinghdev/schedule-consultation">Schedule Your FREE Consultation today!</a></p>
            </div>
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
                    <Link href="/">
                    <a onClick={() => pokepop()} >
                    <Image
                        src={pokeball}
                        alt="Picture of the author"
                        className={styles.pokeball}
                        width={40}
                        height={40}

                    /></a></Link>

                </div>
                <div onScroll={ () => HidePokeBox() } id="pokepopboxid" className="pokepopbox">
                    <h2>Fun Fact #27</h2>
                    <p>JavaScript in FUN!</p>
                    
                </div>
            </div >
        </>
    )
}