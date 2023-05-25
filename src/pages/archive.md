---
title: "Post Archive"

pagination:
  data: collections.posts
  size: 6
  alias: posts
  reverse: true

layout: "layouts/archive.html"
permalink: "archive/{% if pagination.pageNumber === 0 %}/index.html{% else %}{{ pagination.pageNumber + 1 }}/index.html{% endif %}"
---
