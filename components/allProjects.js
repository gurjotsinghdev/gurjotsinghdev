import Link from 'next/link'
import styles from '../styles/AllProjects.module.css'

export default function AllProjects() {
    const projects = [
        {
            title: 'WWPMC',
            href: 'https://wwpmc.com/',
            tag: 'Web design',
        },
        {
            title: 'Sauna Viking',
            href: 'https://saunaviking.com/',
            tag: 'Web design',
        },
        {
            title: 'Central Gas Services',
            href: 'https://centralgasservices.com/',
            tag: 'Web design',
        },
        {
            title: 'VPAC Construction',
            href: 'https://centralgasservices.com/',
            tag: 'Web design',
        },
        {
            title: 'Nero Tondo',
            href: 'https://nerotondo.com/',
            tag: 'Web design',
        },
        {
            title: 'Somy Digital',
            href: 'https://somydigital.com/',
            tag: 'Web design',
        },
        {
            title: 'Hitech Advisors',
            href: 'https://somydigital.com/',
            tag: 'Web design',
        },
    ];

    return (
        <>
            <section className={styles.allProjects} aria-labelledby="project-library">
                <div className={styles.sectionHeader}>
                    <h2 id="project-library">Projects Library</h2>
                    <p>More client and product work focused on development delivery.</p>
                </div>
                <div className={styles.projectsList}>
                    {projects.map((project) => (
                        <a
                            key={project.title}
                            className={styles.projectCard}
                            href={project.href}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <div className={styles.projectTop}>
                                <h3>{project.title}</h3>
                                <span className={styles.projectType}>{project.tag}</span>
                            </div>
                            <span className={styles.projectCta}>View project</span>
                        </a>
                    ))}
                </div>
                <div className={styles.projectFooter}>
                    <Link href="/about">
                        <a className="primaryBtn">About Me</a>
                    </Link>
                </div>
            </section>

        </>
    )
}
