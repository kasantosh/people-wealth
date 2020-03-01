const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRadomUser();
getRadomUser();
getRadomUser();

// fetch random user and add money
async function getRadomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Double everyone's money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 }
  });

  updateDOM();

}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // clear main div 
  main.innerHTML = '<h2><span class="person-title">Person</span>Wealth</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name} </strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  })

}

// format number as money
function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRadomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);




