'use strict'
let UnicornList = [];
const Zones = {
  BARN: 1,
  PASTURE: 2,
  TRAIL: 3
};
function Unicorn(name, loc, foods, color) {
  this.name = name;
  this.location = loc;
  this.food = foods;
  this.color = color;
  UnicornList.push(this);
}
Unicorn.prototype.renderTr = function () {
  let foodString = ''
  for (let i = 0; i < this.food.length; i++) {
    foodString += `${this.food[i]} `;
  }
  let table = $("#unicorn-table");
  let row = document.createElement("tr");
  table.append(row);
  let name = document.createElement("td");
  name.textContent = this.name;
  let color = document.createElement("td");
  color.textContent = this.color;
  let location = document.createElement("td");
  location.textContent = this.location;
  let foods = document.createElement("td");
  foods.textContent = foodString;
  row.append(name);
  row.append(color);
  row.append(location);
  row.append(foods);
};
function retrieveFromLocalStorage() {

  let retrievedObj = JSON.parse(localStorage.getItem('unicorns'));
  if (retrievedObj) {
    rebuildUnicorns(retrievedObj);

  }
  else { console.log('No Data in Local Storage'); }

}
function rebuildUnicorns(json) {

  for (let i = 0; i < json.length; i++) {
    new Unicorn(json[i].name, json[i].location, json[i].food, json[i].color);

  }
}
function renderUnicorns() {
  for (let i = 0; i < UnicornList.length; i++) {
    UnicornList[i].renderTr();
  }
}
retrieveFromLocalStorage();
renderUnicorns();