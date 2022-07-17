import { getSortedPostsData } from '../lib/posts';
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

export default function Blog({ allPostsData }) {
  return (

    <section className="blogArchive">
      <h2>Blog</h2>
      <ul>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
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