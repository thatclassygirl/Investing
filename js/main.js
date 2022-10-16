const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const showBestInvestorsBtn = document.getElementById("show-best-investors");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
    time: Math.floor(2 + Math.random() * 5) + " Años",
  };

  addData(newUser);
}

// sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

// filter best investors
function showBestInvestors() {
  data = data.filter((user) => user.money > 500000);
  updateDOM();
}

// calculate wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthE1 = document.createElement("div");
  wealthE1.innerHTML = `<h3>Inversiones Totales: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthE1);
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

// update DOM
function updateDOM(provideData = data) {
  // clear main div
  main.innerHTML =
    "<h2><strong>Usuario</strong> <strong>Ganancias</strong> Tiempo</h2>";

  provideData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> <strong>${formatMoney(
      item.money
    )}</strong> ${item.time}`;
    main.appendChild(element);
  });
}

// format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// event listeners
addUserBtn.addEventListener("click", getRandomUser);
sortBtn.addEventListener("click", sortByRichest);
showBestInvestorsBtn.addEventListener("click", showBestInvestors);
calculateWealthBtn.addEventListener("click", calculateWealth);
