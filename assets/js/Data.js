const Container = document.querySelector("main .extensions .content");
const FilterList = document.querySelectorAll(".extensions header ul li button");

function createExtensionItem(extension) {
  return `
    <article class="extension-item">
      <div class="info">
        <div class="logo-container">
          <img width="50px" src="${extension.logo}" alt="${
    extension.name
  } logo">
        </div>
        <div class="details">
          <h2 class="extension-name">${extension.name}</h2>
          <p class="extension-description">${extension.description}</p>
        </div>
      </div>
      <div class="actions">
        <button class="remove-button">Remove</button>
        <div class="checkbox-wrapper">
          <div class="checkbox-wrapper-2">
            <input type="checkbox" class="sc-gJwTLC ikxBAC" ${
              extension.isActive ? "checked" : ""
            }>
          </div>
        </div>
      </div>
    </article>
  `;
}

function FillData(Url, Filter = "all") {
  Container.innerHTML = "";

  fetch(Url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((ExtensionsData) => {
      ExtensionsData.forEach((extension) => {
        if (
          Filter === "all" ||
          (Filter === "active" && extension.isActive) ||
          (Filter === "inactive" && !extension.isActive)
        ) {
          const Article = document.createElement("article");
          Article.innerHTML = createExtensionItem(extension);
          Container.appendChild(Article);
        }
      });
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}

// Initialize filter from localStorage
let currentFilter = localStorage.getItem("filter") || "all";
localStorage.setItem("filter", currentFilter);

// Apply initial active class
FilterList.forEach((element) => {
  element.classList.toggle(
    "active",
    element.classList.contains(`${currentFilter}-filter`)
  );
});

// Initial data load
FillData("../../data.json", currentFilter);

// Set up filter button event listeners
FilterList.forEach((button) => {
  button.addEventListener("click", () => {
    FilterList.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedFilter = button.textContent.trim().toLowerCase();
    localStorage.setItem("filter", selectedFilter);
    FillData("../../data.json", selectedFilter);
  });
});

Container.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-button")) {
    const article = event.target.closest(".extension-item");
    if (article) {
      article.remove();
      console.log("Extension removed:", article);
    }
  }
});
