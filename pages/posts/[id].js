import Layout from "../../components/layout";
import Head from "next/head";

import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";
import { API_URL, TOKEN } from "../../consts";

export async function getStaticProps({ params }) {
  const response = await fetch(`${API_URL}/posts/${params.id}`, {
    headers: { Authorization: TOKEN },
  });

  const postData = await response.json();

  return {
    props: {
      postData: postData.data,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(`${API_URL}/posts`, {
    headers: { Authorization: TOKEN },
  });

  const posts = await response.json();

  const paths = posts.data.map((post) => ({ params: { id: String(post.id) } }));

  return {
    paths,
    fallback: false,
  };
}

export default function Post({
  postData: {
    attributes: { Title, Content, publishedAt },
  },
}) {
  return (
    <Layout>
      <Head>
        <title>{Title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{Title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={publishedAt} />
        </div>
        <div>{Content}</div>
      </article>
    </Layout>
  );
}
