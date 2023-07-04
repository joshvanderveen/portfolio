window.onscroll = () => {
  const scrollNotice = document.querySelector(".page__link");

  if (window.scrollY < 10) {
    scrollNotice.style.display = "none"; // Hide notice
  } else {
    scrollNotice.style.display = "flex";
  }
};
