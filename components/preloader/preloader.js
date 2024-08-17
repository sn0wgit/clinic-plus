export const preloader = () => {
  const preloaderDiv = document.createElement("div");
  preloaderDiv.className = "preloader fullscreen";
  preloaderDiv.innerHTML = `
      <div class="preloader__body container">
       <div class="pill">
		<div class="pill__main">
		 <div class="pill__glare"></div>
		</div>
		<div class="pill__shadow"></div>
	   </div>
      </div>
  `;

  document.body.prepend(preloaderDiv);

  setTimeout(() => {
      preloaderDiv.remove();
  }, 3000);
};

window.addEventListener("load", preloader);