// proměnné pro ceny vstupenek
let d2cena = 89;
let d3cena = 109;

// Načtení cen z localStorage
loadFromLocalStorage();

// Funkce pro načtení cen z localStorage
function loadFromLocalStorage() {
  if (localStorage.getItem("d2cena")) {
    d2cena = JSON.parse(localStorage.getItem("d2cena"));
  }
  if (localStorage.getItem("d3cena")) {
    d3cena = JSON.parse(localStorage.getItem("d3cena"));
  }

  // Pokud existují inputy pro ceny, nastavíme jim hodnoty
  const d2cenaInput = document.getElementById("2dcena");
  const d3cenaInput = document.getElementById("3dcena");

  if (d2cenaInput) {
    d2cenaInput.value = d2cena;
  }
  if (d3cenaInput) {
    d3cenaInput.value = d3cena;
  }
}

// Funkce pro uložení cen do localStorage
export function savePricesToLocalStorage() {
  localStorage.setItem("d2cena", JSON.stringify(d2cena));
  localStorage.setItem("d3cena", JSON.stringify(d3cena));
}

// Pokud existuje tlačítko pro uložení nastavení, přidáme mu event listener
const saveButton = document.getElementById("saveCinemaSettingsBtn");

if (saveButton) {
  saveButton.addEventListener("click", () => {
    d2cena = document.getElementById("2dcena").value;
    d3cena = document.getElementById("3dcena").value;
    savePricesToLocalStorage();
    console.log("Ceny uloženy");
  });
}

// Export nastavení cen
export const ticketNastaveni = {
  ticket2d: {
    price: d2cena,
  },
  ticket3d: {
    price: d3cena,
  },
};
