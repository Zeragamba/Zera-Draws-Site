const namespace = 'tags'

export const TagQueryKeys = {
  namespace,
  getAllTags: () => [ 'tags', 'all' ],
  getTag: (id: string) => [ 'tags', { id } ],
}
