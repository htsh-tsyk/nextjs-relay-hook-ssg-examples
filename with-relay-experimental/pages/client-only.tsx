import Link from "next/link";
import BlogPosts from "../components/BlogPosts";
import { graphql } from "relay-runtime";
import React from "react";
import { useLazyLoadQuery } from "react-relay/hooks";
import NoSSR from "react-no-ssr";
import { NextPage } from "next";
import { suspenseQuery } from "../__relay_artifacts__/suspenseQuery.graphql";

const query = graphql`
  query suspenseQuery($first: Int!, $after: String) {
    viewer {
      ...BlogPosts_viewer
    }
  }
`;

const PostQuery: NextPage = () => {
  const props = useLazyLoadQuery<suspenseQuery>(
    query,
    { first: 5 },
    { fetchPolicy: "store-or-network" }
  );

  return <BlogPosts viewer={props.viewer} />;
};

const Index = () => {
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

      <h1>fetch BlogPosts from client side.</h1>
      <NoSSR>
        <React.Suspense fallback={<p>Loading...</p>}>
          <PostQuery />
        </React.Suspense>
      </NoSSR>
    </>
  );
};

export default Index;
