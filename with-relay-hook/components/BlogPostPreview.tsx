import { graphql } from 'react-relay'
import { useFragment } from 'relay-hooks'
import { BlogPostPreview_post$key } from '../__relay_artifacts__/BlogPostPreview_post.graphql'

const fragments = {
  post: graphql`
    fragment BlogPostPreview_post on BlogPost {
      id
      title
    }
  `,
}

type Props = {
  post: BlogPostPreview_post$key
}

const BlogPostPreview: React.FC<Props> = (props) => {
  const post = useFragment(fragments.post, props.post)
  return <li>{post.title}</li>
}

export default BlogPostPreview
