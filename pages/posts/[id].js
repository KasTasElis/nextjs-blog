import Layout from "../../components/layout";
import Head from "next/head";

import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
  const response = await fetch(`${process.env.API_URL}/posts/${params.id}`, {
    headers: { Authorization: process.env.TOKEN },
  });

  const postData = await response.json();

  return {
    props: {
      postData: postData.data,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetch(`${process.env.API_URL}/posts`, {
    headers: { Authorization: process.env.TOKEN },
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
    attributes: { title, content, publishedAt },
  },
}) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={publishedAt} />
        </div>
        <div>{content}</div>
      </article>
    </Layout>
  );
}
