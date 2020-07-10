import { graphql } from "react-relay";
import BlogPostPreview from "./BlogPostPreview";
import { usePagination } from "relay-hooks";
import { BlogPosts_viewer$key } from "../__relay_artifacts__/BlogPosts_viewer.graphql";
import { useCallback } from "react";

type Props = {
  viewer: BlogPosts_viewer$key;
};

const connectionConfig = {
  getVariables(props, { count, cursor }, fragmentVariables) {
    return {
      first: count,
      after: cursor,
    };
  },
  getFragmentVariables(prevVars, first) {
    return {
      ...prevVars,
      first,
    };
  },

  query: graphql`
    query BlogPosts_Query($first: Int!, $after: String) {
      viewer {
        ...BlogPosts_viewer
      }
    }
  `,
};

const fragments = {
  viewer: graphql`
    fragment BlogPosts_viewer on Viewer {
      allBlogPosts(first: $first, after: $after, orderBy: createdAt_DESC)
        @connection(key: "BlogPosts_allBlogPosts") {
        edges {
          node {
            ...BlogPostPreview_post
            id
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  `,
};

const BlogPosts: React.FC<Props> = (props) => {
  const [viewer, { isLoading, hasMore, loadMore }] = usePagination(
    fragments.viewer,
    props.viewer
  );

  const handleLoadMore = useCallback(async () => {
    if (!hasMore() || isLoading()) {
      return;
    }

    await new Promise((resolve, reject) => {
      loadMore(
        connectionConfig,
        5,
        (error) => {
          if (error) {
            return reject(error);
          }
          resolve();
        },
        {}
      );
    });
  }, []);

  return (
    <div>
      <h1>Blog posts</h1>
      <ul>
        {viewer.allBlogPosts.edges.map(({ node }) => (
          <BlogPostPreview key={node.id} post={node} />
        ))}
      </ul>

      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default BlogPosts;
