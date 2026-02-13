const slugify = require("slugify");

module.exports = function (collections) {
  const posts = collections.posts || [];
  const tagsObj = {};

  posts.forEach(post => {
    if (!post.data.tags) return;
    post.data.tags.forEach(tag => {
      if (!tagsObj[tag]) tagsObj[tag] = [];
      tagsObj[tag].push(post);
    });
  });

  return Object.keys(tagsObj).map(tag => ({
    name: tag,
    posts: tagsObj[tag],
    url: `/tags/${slugify(tag, { lower: true })}/`
  }));
};