module.exports = function (eleventyConfig) {

  // ---------------------------
  // PASSTHROUGH COPY
  // ---------------------------
  eleventyConfig.addPassthroughCopy("src/media");
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // ---------------------------
  // POSTS COLLECTION
  // ---------------------------
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  // ---------------------------
  // TAGS COLLECTION
  // ---------------------------
  eleventyConfig.addCollection("tags", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("src/posts/*.md") || [];
    const tagsObj = {};

    posts.forEach(post => {
      if (!post.data.tags) return;
      post.data.tags.forEach(tag => {
        if (!tagsObj[tag]) tagsObj[tag] = [];
        tagsObj[tag].push(post);
      });
    });

    return Object.keys(tagsObj)
      .sort()
      .map(tag => ({
        name: tag,
        posts: tagsObj[tag].sort((a, b) =>
          new Date(b.date || b.data.date) - new Date(a.date || a.data.date)
        ),
        url: `/tags/${tag.toLowerCase().replace(/ /g, "-")}/`
      }));
  });

  // ---------------------------
  // DATE FILTER FOR NUNJUCKS
  // ---------------------------
  eleventyConfig.addFilter("date", (dateObj) => {
    if (!dateObj) return "";
    return new Date(dateObj).toDateString(); // Example: "Tue Feb 10 2026"
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