export const createMetadata = ({
  post,
}: {
  post: {
    metadata: {
      title: string
      description: string
      tags?: string[]
    }
  }
}) => {
  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      authors: ['현정'],
      ...(post.metadata.tags && { tags: post.metadata.tags }),
    },
  }
}
