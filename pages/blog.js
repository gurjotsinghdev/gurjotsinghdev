import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link';
import Date from '../components/date';



export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home ({ allPostsData }) { 
    return (
                 <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
              {allPostsData.map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                <Link href={`/blog/${id}`}>
                  <a>{title}</a>
                </Link>
                <br />
                
              </li>
              
              ))}
            </ul>
          </section>
      );

}