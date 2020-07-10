import Link from "next/link";
import { initEnvironment } from "../lib/relay";
import BlogPosts from "../components/BlogPosts";
import { fetchQuery, graphql } from "relay-runtime";
import React from "react";
import { useLazyLoadQuery } from "react-relay/hooks";
import { NextPage } from "next";
import { pagesQuery } from "../__relay_artifacts__/pagesQuery.graphql";

const query = graphql`
  query pagesQuery($first: Int!, $after: String) {
    viewer {
      ...BlogPosts_viewer @arguments(first: $first, after: $after)
    }
  }
`;

const Index: NextPage = () => {
  const props = useLazyLoadQuery<pagesQuery>(query, { first: 5 });

  return (
    <>
      <Link href="/">
        <a>Home</a>
      </Link>
      <span> | </span>
      <Link href="/about">
        <a>About</a>
      </Link>
      <span> | </span>
      <Link href="/client-only">
        <a>Client only</a>
      </Link>

      <h1>fetch BlogPosts from server side.</h1>
      <BlogPosts viewer={props.viewer} />
    </>
  );
};

export async function getStaticProps() {
  const environment = initEnvironment();
  await fetchQuery<pagesQuery>(environment, query, { first: 5 });
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      initialRecords,
    },
  };
}

export default Index;
