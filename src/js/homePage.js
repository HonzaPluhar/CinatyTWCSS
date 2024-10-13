import { movies } from "./movies.js";

//Verison settings
let version = "1.0.5";
let lastUpdate = "14.10.2024";

document.querySelector(".version").textContent = `DEV ${version}`;
document.querySelector(".lastUpdate").textContent = `${lastUpdate}`;

// Elements
let film1 = document.getElementById("movieCard1");
let film2 = document.getElementById("movieCard2");
let film3 = document.getElementById("movieCard3");
let film4 = document.getElementById("movieCard4");
let film5 = document.getElementById("movieCard5");
let film6 = document.getElementById("movieCard6");

//set filmKartu href and img from movies.js
film1.href = movies[0].urlKinosalu;
film1.children[0].src = movies[0].imgHref;

film2.href = movies[1].urlKinosalu;
film2.children[0].src = movies[1].imgHref;

film3.href = movies[2].urlKinosalu;
film3.children[0].src = movies[2].imgHref;

film4.href = movies[3].urlKinosalu;
film4.children[0].src = movies[3].imgHref;

film5.href = movies[4].urlKinosalu;
film5.children[0].src = movies[4].imgHref;

film6.href = movies[5].urlKinosalu;
film6.children[0].src = movies[5].imgHref;
