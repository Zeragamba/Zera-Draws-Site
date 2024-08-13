import { TagData } from "../../Models/TagData"

export interface TagFilter {
  name?: string
  minPosts?: number
  featured?: true
}

export function filterTags(allTags: TagData[], filter: TagFilter): TagData[] {
  let filtered = allTags

  if (filter.featured) {
    filtered = filtered.filter((tag) => tag.featured)
  }

  if (filter.minPosts) {
    const minPosts = filter.minPosts
    filtered = filtered.filter((tag) => tag.num_posts >= minPosts)
  }

  if (filter.name) {
    const searchTerms = filter.name.split(/\s+/)
    searchTerms.forEach((term) => {
      term = term.trim().toLocaleLowerCase()
      filtered = filtered.filter((tag) =>
        tag.name.toLocaleLowerCase().includes(term),
      )
    })
  }

  return filtered
}
