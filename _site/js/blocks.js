// src/js/blocks.js
module.exports = function(eleventyConfig) {
  // PAIRED SHORTCODE: Split Content
  // This allows us to wrap content between tags
  eleventyConfig.addPairedShortcode("splitContent", function(content, image, title, imageLeft = true) {
    const direction = imageLeft ? "" : "is-flex-direction-row-reverse";
    
    return `
      <section class="section">
        <div class="container">
          <div class="columns is-vcentered ${direction}">
            <div class="column is-6">
              <figure class="image">
                <img src="${image}" alt="${title}" class="is-rounded" style="object-fit: cover; width: 100%; max-height: 500px;">
              </figure>
            </div>
            <div class="column is-6">
              <div class="content">
                <h2 class="title is-2">${title}</h2>
                <div class="block-body">
                  ${content}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  });
};