module.exports = function(collections) {
  // Use the 'posts' collection safely
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
    url: `/tags/${tag}/`
  }));
};