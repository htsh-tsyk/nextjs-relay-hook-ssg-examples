import { useCallback } from "react";
import { graphql } from "relay-runtime";
import BlogPostPreview from "./BlogPostPreview";
import { usePaginationFragment } from "react-relay/hooks";
import { BlogPosts_viewer$key } from "../__relay_artifacts__/BlogPosts_viewer.graphql";

const query = graphql`
  fragment BlogPosts_viewer on Viewer
    @argumentDefinitions(
      after: { type: "String" }
      first: { type: "Int", defaultValue: 5 }
    )
    @refetchable(queryName: "BlogPostsPagingQuery") {
    allBlogPosts(first: $first, after: $after, orderBy: createdAt_DESC)
      @connection(key: "BlogPosts_allBlogPosts") {
      edges {
        node {
          id
          ...BlogPostPreview_post
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
const fragments = {
  viewer: query,
};

type Props = {
  viewer: BlogPosts_viewer$key;
};

const BlogPosts: React.FC<Props> = (props) => {
  const actions = usePaginationFragment(fragments.viewer, props.viewer);

  const { data, loadNext, isLoadingNext } = actions;

  const handleLoadMore = useCallback(async () => {
    if (isLoadingNext) {
      return;
    }

    await new Promise((resolve, reject) => {
      loadNext(5, {
        onComplete: (error) => {
          error ? reject(error) : resolve();
        },
      });
    });
  }, [isLoadingNext, loadNext]);

  return (
    <div>
      <h1>Blog posts</h1>
      <ul>
        {data.allBlogPosts.edges.map(({ node }) => (
          <BlogPostPreview key={node.id} post={node} />
        ))}
      </ul>

      <button onClick={handleLoadMore}>load more</button>
    </div>
  );
};

export default BlogPosts;
