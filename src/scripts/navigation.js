
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const homeButton = document.getElementById("homeButton");
  const menuPanel = document.getElementById("menuPanel");
  const homeControls = document.getElementById("homeControls");
  const mainMenu = document.getElementById("mainMenu");
  const menuGrid = document.getElementById("menuGrid");
  const sideControls = document.querySelector(".side-controls");

  if (!menuButton || !menuPanel || !mainMenu || !menuGrid) {
    return;
  }

  // Open and close the expanded menu
  function openMenu() {
    menuPanel.hidden = false;
    homeControls.hidden = true;
    mainMenu.hidden = false;
    menuGrid.hidden = true;
  }

  function closeMenu() {
    menuPanel.hidden = true;
    homeControls.hidden = false;
    mainMenu.hidden = false;
    menuGrid.hidden = true;
  }

  // Menu button
  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (menuPanel.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  // Select a main section
  mainMenu.querySelectorAll(".menu-section").forEach((button) => {
    button.addEventListener("click", () => {
      mainMenu.querySelectorAll(".menu-section").forEach((item) => {
        item.hidden = true;
      });

      button.hidden = false;
      menuGrid.hidden = false;
    });
  });

  // Clicking the selected section again returns to the main menu
  mainMenu.addEventListener("click", (event) => {
    const button = event.target.closest(".menu-section");

    if (button && button.dataset.selected === "true") {
      mainMenu.querySelectorAll(".menu-section").forEach((item) => {
        item.hidden = false;
        item.dataset.selected = "false";
      });

      menuGrid.hidden = true;
    } else if (button) {
      button.dataset.selected = "true";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !menuPanel.hidden &&
      !menuPanel.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Home button
  if (homeButton) {
    homeButton.addEventListener("click", () => {
      window.location.href = "/";
    });
  }

  // Prevent clicks inside the menu from closing it
  menuPanel.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

