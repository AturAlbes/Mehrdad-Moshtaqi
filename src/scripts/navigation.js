


document.addEventListener("DOMContentLoaded", async () => {
  const menuButton = document.getElementById("menuButton");
  const homeButton = document.getElementById("homeButton");
  const menuPanel = document.getElementById("menuPanel");
  const homeControls = document.getElementById("homeControls");
  const mainMenu = document.getElementById("mainMenu");
  const menuGrid = document.getElementById("menuGrid");
  const languageButton = document.getElementById("languageButton");

  let currentLanguage = localStorage.getItem("siteLanguage") || "fa";
  let menuData = null;
  let selectedSection = null;

  try {
    const response = await fetch("content/menu.json");

    if (!response.ok) {
      throw new Error("Could not load menu.json");
    }

    menuData = await response.json();
  } catch (error) {
    console.error("Menu loading error:", error);
    return;
  }

  function updateLanguage() {
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
      currentLanguage === "fa" ? "rtl" : "ltr";

    if (languageButton) {
      languageButton.textContent =
        currentLanguage === "fa" ? "EN" : "FA";
    }

    renderMainMenu();
    if (selectedSection) {
      renderCards(selectedSection);
    }
  }

  function renderMainMenu() {
    mainMenu.innerHTML = "";

    menuData.sections.forEach((section) => {
      const button = document.createElement("button");

      button.className = "menu-section";
      button.textContent = section.title[currentLanguage];
      button.type = "button";

      button.addEventListener("click", () => {
        if (selectedSection === section.id) {
          selectedSection = null;
          menuGrid.hidden = true;
          renderMainMenu();
        } else {
          selectedSection = section.id;
          renderMainMenu();
          renderCards(section);
        }
      });

      if (selectedSection && selectedSection !== section.id) {
        button.hidden = true;
      }

      mainMenu.appendChild(button);
    });
  }

  function renderCards(section) {
    menuGrid.innerHTML = "";

    section.cards.forEach((card) => {
      const link = document.createElement("a");
      link.className = "menu-card";
      link.href = card.pages[currentLanguage] || "#";

      const image = document.createElement("img");
      image.src = card.image;
      image.alt = card.title[currentLanguage] || "";

      const title = document.createElement("span");
      title.className = "menu-card-title";
      title.textContent = card.title[currentLanguage] || "";

      link.appendChild(image);
      link.appendChild(title);
      menuGrid.appendChild(link);
    });

    menuGrid.hidden = false;
  }

  function openMenu() {
    menuPanel.hidden = false;
    homeControls.hidden = true;
    selectedSection = null;
    menuGrid.hidden = true;
    renderMainMenu();
  }

  function closeMenu() {
    menuPanel.hidden = true;
    homeControls.hidden = false;
    selectedSection = null;
    menuGrid.hidden = true;
  }

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (menuPanel.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      !menuPanel.hidden &&
      !menuPanel.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  menuPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  if (homeButton) {
    homeButton.addEventListener("click", () => {
      window.location.href = "/";
    });
  }

  if (languageButton) {
    languageButton.addEventListener("click", () => {
      currentLanguage =
        currentLanguage === "fa" ? "en" : "fa";

      localStorage.setItem("siteLanguage", currentLanguage);
      updateLanguage();
    });
  }

  updateLanguage();
});




