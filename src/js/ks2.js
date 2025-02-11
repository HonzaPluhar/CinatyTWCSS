import { ticketNastaveni } from "./cinemaOptions.js";
import { movies } from "./movies.js";

/*---------------------
NASTAVENI KINA - EDITABLE!!!!!
--------------------- 
*/

/*---------------------
// VYSILANY FILM
--------------------- 
*/
let film = 2;

//nazev filmu
let nazevFilmu = movies[film - 1].title;
//cislo salu
let cisloSalu = 2;
//cena listku
let cenaListku = ticketNastaveni.ticket2d.price;
//pocet rad
let pocetRadku = 8;
//pocet sedadel v rade
let pocetSedadelVRadku = 6;

/*---------------------
NASTAVENI ID - pro rozliseni vice salu
--------------------- 
*/

let salID = `bookedSeats${cisloSalu}`;

/*---------------------
prirazeni hodnot
--------------------- 
*/
//nazev filmu
let nazev = document.querySelector(".vysilanyFilm");
nazev.textContent = nazevFilmu;
//cislo salu
let cislo = document.querySelector(".cisloKinosalu");
cislo.textContent = cisloSalu;
//cena listku
let cena = document.querySelector(".cenaZaSedadlo");
cena.textContent = `${cenaListku} Kč`;
//celkova cena
let celkovaCena = document.querySelector(".celkovaCena");
celkovaCena.textContent = `0 Kč`;
//vybrana sedadla
let vybranaSedadla = document.querySelector("#vybranaSedadla");

/*---------------------
nastaveni salu
--------------------- 
*/

let sedadloSkin = "☖";
let vyprodaneSedadlo = "☗";
let sal1 = document.getElementById("sal1");
let selectedSeats = 0;
let finalPrice = 0;

/*---------------------
OBJEKTY
--------------------- 
*/
//sedadlo jako objekt ktery se bude moci opakovat
let sedadloObj = {
  sedadlo: sedadloSkin,
  vyprodane: vyprodaneSedadlo,
  isSelected: false,
  isSold: false,
  checkAvailability: function () {
    if (this.classList == "sedadlo") {
      return this.sedadlo;
    } else {
      return this.vyprodane;
    }
  },
};

/*---------------------
VYTVORENI SALU 
--------------------- 
*/

//vytvor sal
let sal = document.querySelector(".sal");

//vytvor radky
for (let i = 0; i < pocetRadku; i++) {
  let radek = document.createElement("div");
  radek.classList.add("radek");
  sal.appendChild(radek);

  //vytvor sedadla
  for (let j = 0; j < pocetSedadelVRadku; j++) {
    let sedadlo = document.createElement("p");
    sedadlo.textContent = sedadloObj.checkAvailability();
    sedadlo.classList.add("sedadlo");
    sedadlo.id = `sedadlo${i}${j}`;
    sedadlo.rada = j + 1;
    sedadlo.sedadlo = i + 1;
    if (sedadlo.classList == "sedadlo") {
      sedadlo.textContent = sedadloSkin;
    } else {
      sedadlo.textContent = vyprodaneSedadlo;
    }
    radek.appendChild(sedadlo);
  }
}

/*---------------------Vybrani sedadla---------------------
--------------------- 
*/

let sedadla = document.querySelectorAll(".sedadlo");
sedadla.forEach((sedadlo) => {
  sedadlo.addEventListener("click", (e) => {
    if ((sedadlo.classList == "sedadlo") & (sedadlo.classList != "booked")) {
      sedadlo.classList.remove("sedadlo");
      sedadlo.classList.add("selected");
      selectedSeats++;
      showSelectedSeats(sedadlo);
      finalPrice = selectedSeats * cenaListku;
      console.log(finalPrice);
      celkovaCena.textContent = `${finalPrice} Kč`;
    } else if (sedadlo.classList == "booked") {
      console.log("sedadlo je vyprodane");
    } else {
      sedadlo.classList.remove("selected");
      sedadlo.classList.add("sedadlo");
      selectedSeats--;
      removeSelectedSeat(sedadlo);
    }
  });
});

/*---------------------Zmena selected sedadla na booked po kliknuti na tlacitko rezervovat---------------------
--------------------- 
*/

let rezervovat = document.getElementById("confirmBtn");
rezervovat.addEventListener("click", (e) => {
  if (selectedSeats == 0) {
    alert("Není vybrane žádné sedadlo");
    return;
  } else {
    alert(`Rezervace byla úspěšná. 
      Počet lístků: ${selectedSeats}.
      Celková cena: ${finalPrice} Kč.`);
  }
  let selected = document.querySelectorAll(".selected");
  selected.forEach((sedadlo) => {
    sedadlo.classList.remove("selected");
    sedadlo.classList.add("booked");
    saveToLocalStorage();
    reset();
    removeSelectedSeatsFromInfo();
    console.log(
      `Sedadlo bylo zarezervovano.  Rada: ${sedadlo.rada} Sedadlo: ${sedadlo.sedadlo}`
    );
  });
});

/*---------------------Reset hodnot---------------------
--------------------- 
*/

function reset() {
  selectedSeats = 0;
  finalPrice = 0;
  celkovaCena.textContent = `${finalPrice} Kč`;
}

/*---------------------Funkce pro ulozeni---------------------
--------------------- 
*/

function saveToLocalStorage() {
  //pridat id salu aby bylo mozne rozlisit mezi vice saly

  let bookedSeats = document.querySelectorAll(".booked");
  let bookedSeatsArray = [];
  bookedSeats.forEach((sedadlo) => {
    bookedSeatsArray.push(sedadlo.id);
  });
  localStorage.setItem(salID, JSON.stringify(bookedSeatsArray));
}

/*---------------------Funkce pro nacteni---------------------
--------------------- 
*/

function loadFromLocalStorage() {
  let bookedSeats = JSON.parse(localStorage.getItem(salID));
  if (bookedSeats) {
    bookedSeats.forEach((sedadlo) => {
      let sedadloElement = document.getElementById(sedadlo);
      sedadloElement.classList.remove("sedadlo");
      sedadloElement.classList.add("booked");
    });
  }
}

loadFromLocalStorage();

/*---------------------Vyresetovani kinosalu---------------------
--------------------- 
*/

let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", (e) => {
  let bookedSeats = document.querySelectorAll(".booked");

  // evaulating if there is something to reset fix

  bookedSeats.forEach((sedadlo) => {
    sedadlo.classList.remove("booked");
    sedadlo.classList.add("sedadlo");
  });
  // localStorage.clear();
  reset();
  saveToLocalStorage();
});

/*---------------------Funkce vyresetovani zobrazeni vybranych sedadel---------------------
--------------------- 
*/
//removeSelectedSeatsFrom "vzbranaSedadla"
function removeSelectedSeatsFromInfo() {
  let sedadlaInfo = document.querySelectorAll("#vybranaSedadla p");
  sedadlaInfo.forEach((sedadlo) => {
    sedadlo.remove();
  });
}

/*---------------------Funkce zobrazeni vybranych sedadel---------------------
--------------------- 
*/

function showSelectedSeats(sedadlo) {
  let sedadloInfo = document.createElement("p");
  sedadloInfo.innerHTML = `Řada: <span class="text-primaryColor font-bold text-xl"> ${sedadlo.rada} </span> Sedadlo: <span class="text-primaryColor font-bold text-xl"> ${sedadlo.sedadlo} </span>`;
  vybranaSedadla.appendChild(sedadloInfo);
}

/*---------------------Funkce odebrani najdi sedadlo a odeber ho---------------------
---------------------
*/

function removeSelectedSeat(sedadlo) {
  let sedadlaInfo = document.querySelectorAll("#vybranaSedadla p");
  sedadlaInfo.forEach((sedadloInfo) => {
    if (
      sedadloInfo.innerHTML ==
      `Řada: <span class="text-primaryColor font-bold text-xl"> ${sedadlo.rada} </span> Sedadlo: <span class="text-primaryColor font-bold text-xl"> ${sedadlo.sedadlo} </span>`
    ) {
      sedadloInfo.remove();
      finalPrice = finalPrice - cenaListku;
      celkovaCena.textContent = `${finalPrice} Kč`;
    }
  });
}
