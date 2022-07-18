import Head from 'next/head';
import Link from 'next/link';

import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'
import Date from '../../components/date';

export async function getStaticProps({ params }) {
    
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}


export default function Post({ postData }) {
    return (
      <>
        <Head>
        <title>{postData.title}</title>
        </Head>
        <article className="blogPosts">
        <h2>{postData.title}</h2>
        <hr />
        {/* {postData.id} */}
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        <Link href="/blog">
          <button className="primaryBtn"><a>Back to All Blogs</a></button></Link>
        </article>
      </>
    );
  }
  
  


