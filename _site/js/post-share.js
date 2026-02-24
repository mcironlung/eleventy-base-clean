document.addEventListener("DOMContentLoaded", () => {
  const shareBtn = document.querySelector("#shareBtn");
  const resultPara = document.querySelector(".result");

  if (!shareBtn || !navigator.share) return; // exit if API not supported

  const shareData = {
    title: document.title,
    text: "Check this out!",
    url: window.location.href
  };

  shareBtn.addEventListener("click", async () => {
    try {
      await navigator.share(shareData);
      resultPara.textContent = "Post shared successfully!";
    } catch (err) {
      resultPara.textContent = `Error: ${err.message}`;
    }
  });
});