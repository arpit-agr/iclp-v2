---
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - "all"
    - "pages"
    - "posts"
    - "tagsList"
  addAllPagesToCollections: true
layout: "layouts/tags.html"
permalink: "/tags/{{ tag | slugify }}/"
eleventyComputed:
  title: "Tag: {{ tag | replace('-', ' ') -}}"
---
