import Link from 'next/link'
import styles from '../styles/FeaturedProjects.module.css'


export default function FeaturedProjects() {
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
            href: 'https://vpacconstruction.com/',
            tag: 'Web design',
        },
    ];

    return (
        <>
            <section className={styles.featuredProjects} aria-labelledby="selected-projects">
                <div className={styles.sectionHeader}>
                    <h2 id="selected-projects">Selected Projects</h2>
                    <p>Focused on production-ready development and scalable delivery.</p>
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
                    <Link href="/projects">
                        <a className="primaryBtn">View All Projects</a>
                    </Link>
                </div>
            </section>

        </>
    )
}
