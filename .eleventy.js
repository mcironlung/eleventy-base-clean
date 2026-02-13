module.exports = function (eleventyConfig) {
  // ---------------------------
  // PASSTHROUGH COPY
  // ---------------------------
  // Copy media folder directly to output
  eleventyConfig.addPassthroughCopy("src/media");

  // ---------------------------
  // POSTS COLLECTION
  // ---------------------------
  // Define a collection called "posts" from your posts folder
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.html").reverse();
  });

  // ---------------------------
  // TAGS COLLECTION
  // ---------------------------
  // Creates an array of tags, each with a name, URL, and posts that have that tag
  eleventyConfig.addCollection("tags", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.html") || [];
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
  });

  // ---------------------------
  // RETURN DIR CONFIG
  // ---------------------------
  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "layouts",
      includes: "includes"
    }
  };
};