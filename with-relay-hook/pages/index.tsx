import Link from "next/link";
import React from "react";
import { fetchQuery, graphql } from "relay-runtime";
import { useQuery, STORE_OR_NETWORK } from "relay-hooks";

import { initEnvironment } from "../lib/relay";
import BlogPosts from "../components/BlogPosts";
import { pagesQuery } from "../__relay_artifacts__/pagesQuery.graphql";
import { NextPage } from "next";

const query = graphql`
  query pagesQuery($first: Int!, $after: String) {
    viewer {
      ...BlogPosts_viewer
    }
  }
`;

const Index: NextPage = () => {
  const { error, props } = useQuery<pagesQuery>(
    query,
    {
      first: 5,
    },
    {
      fetchPolicy: STORE_OR_NETWORK,
    }
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  if (props === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link href="/about">
        <a>About</a>
      </Link>

      <BlogPosts viewer={props.viewer} />
    </>
  );
};

export async function getStaticProps() {
  const environment = initEnvironment();
  const queryProps = await fetchQuery<pagesQuery>(environment, query, {
    first: 5,
  });
  const initialRecords = environment.getStore().getSource().toJSON();

  return {
    props: {
      ...queryProps,
      initialRecords,
    },
  };
}

export default Index;
