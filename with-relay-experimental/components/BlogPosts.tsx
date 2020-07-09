import { useCallback, useEffect } from "react";
import { graphql } from "relay-runtime";
import BlogPostPreview from "./BlogPostPreview";
import { usePaginationFragment } from "react-relay/hooks";
import { BlogPosts_viewer$key } from "../__relay_artifacts__/BlogPosts_viewer.graphql";
import { cache } from "../lib/relay";

const query = graphql`
  fragment BlogPosts_viewer on Viewer
    # @argumentDefinitions(
    #   after: { type: "String" }
    #   first: { type: "Int", defaultValue: 10 }
    # )
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

  const handleLoadMore = useCallback(() => {
    if (isLoadingNext) {
      return;
    }
    loadNext(5);
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
