let cenaListku = 149;

//zobrazeni ceny listku

let pocetRadku = 8;
let pocetSedadelVRadku = 6;

let sedadloSkin = "☗";
let vyprodaneSedadlo = "☖";

//oznacene sedadlo bude #ffa600

let sal1 = document.getElementById("sal1");

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
    radek.appendChild(sedadlo);
  }
}
