import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

import Link from "next/link";
import Date from "../components/date";
import { API_URL, TOKEN } from "../consts";

export async function getStaticProps() {
  const response = await fetch(`${API_URL}/posts`, {
    headers: { Authorization: TOKEN },
  });

  const posts = await response.json();

  return {
    props: {
      posts: posts.data,
    },
  };
}

export default function Home({ posts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I am a very cool developer with a 💩 blog!</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, attributes: { Title, publishedAt } }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{Title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={publishedAt} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
