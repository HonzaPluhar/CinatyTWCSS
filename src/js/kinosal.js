/*---------------------
nastaveni cen
--------------------- 
*/

let cenaListku = 149;
//zobrazeni ceny listku
function zobrazCenu() {
  let cena = document.querySelector(".cenaZaSedadlo");
  cena.textContent = `${cenaListku} Kč`;
}
zobrazCenu();

/*---------------------
nastaveni salu
--------------------- 
*/

let pocetRadku = 8;
let pocetSedadelVRadku = 6;

let sedadloSkin = "☖";
let vyprodaneSedadlo = "☗";

let sal1 = document.getElementById("sal1");

/*---------------------
DEBUG
--------------------- 
*/
// //vytvor sedadlo pro testovaci ucely v div id sal1

// let sedadlo = document.createElement("p");
// sedadlo.textContent = sedadloSkin;
// sedadlo.classList.add("sedadlo");
// sal1.appendChild(sedadlo);

// if (sedadlo.classList == "sedadlo") {
//   sedadlo.textContent = sedadloSkin;
// } else {
//   sedadlo.textContent = vyprodaneSedadlo;
// }

/*---------------------
OBJEKTY
--------------------- 
*/
//sedadlo jako objekt ktery se bude moci opakovat
let sedadloObj = {
  sedadlo: sedadloSkin,
  vyprodane: vyprodaneSedadlo,
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
    if (sedadlo.classList == "sedadlo") {
      sedadlo.textContent = sedadloSkin;
    } else {
      sedadlo.textContent = vyprodaneSedadlo;
    }
    radek.appendChild(sedadlo);
  }
}

/*---------------------Test vyprodani sedadla---------------------
--------------------- 
*/

let sedadlo00 = document.getElementById("sedadlo00");
sedadlo00.classList.remove("sedadlo");
sedadlo00.classList.add("booked");

let sedadlo21 = document.getElementById("sedadlo21");
sedadlo21.classList.remove("sedadlo");
sedadlo21.classList.add("booked");

let sedadlo33 = document.getElementById("sedadlo33");
sedadlo33.classList.remove("sedadlo");
sedadlo33.classList.add("booked");

let sedadlo44 = document.getElementById("sedadlo44");
sedadlo44.classList.remove("sedadlo");
sedadlo44.classList.add("booked");
