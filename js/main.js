'use strict'
var UnicornList = [];
const Zones = {
  BARN: 'Barn',
  PASTURE: 'Pasture',
  TRAIL: 'Trail'
};
function Unicorn(name, loc, foods, color) {
  this.name = name;
  this.location = loc;
  this.food = foods;
  this.color = color;
  this.htmlLi = this.createHtmlElementLi();
  UnicornList.push(this);
}

Unicorn.prototype.createHtmlElementLi = function () {
  let liTag = document.createElement("li");
  liTag.id = `${this.name}-list-item`;
  liTag.textContent = this.name;
  let barnATag = document.createElement("a");
  barnATag.id = `${this.name}-barn-change`;
  barnATag.href = '#';
  barnATag.textContent = `Barn`;
  let pastureATag = document.createElement("a");
  pastureATag.id = `${this.name}-pasture-change`;
  pastureATag.textContent = `Pasture`;
  pastureATag.href = '#';
  let trailATag = document.createElement("a");
  trailATag.id = `${this.name}-trail-change`;
  trailATag.textContent = `Trail`;
  trailATag.href = '#';
  liTag.appendChild(barnATag);
  liTag.appendChild(pastureATag);
  liTag.appendChild(trailATag);
  return liTag;

};
Unicorn.prototype.allowMovement = function () {
  (this.location === Zones.BARN) ? $(`#${this.name}-barn-change`).hide() : $(`#${this.name}-barn-change`).show();
  (this.location === Zones.PASTURE) ? $(`#${this.name}-pasture-change`).hide() : $(`#${this.name}-pasture-change`).show();
  (this.location === Zones.TRAIL) ? $(`#${this.name}-trail-change`).hide() : $(`#${this.name}-trail-change`).show();
};
Unicorn.prototype.renderUnicorns = function () {

  switch (this.location) {
    case Zones.BARN:
      $("#barn-list").append(this.htmlLi);
      break;
    case Zones.PASTURE:
      $("#pasture-list").append(this.htmlLi);
      break;
    case Zones.TRAIL:
      $("#trail-list").append(this.htmlLi);
      break;
    default:
      console.log(this.name + ' does not fit criteria!');
      break;
  }

};
function initializePage() {
  new Unicorn("Hansel", Zones.BARN, ["Schnitzel", "Beer", "Carrots"], "grey");
  new Unicorn("Gretel", Zones.BARN, ["Pretzels", "Beer", "Carrots"], "red");
  new Unicorn("Wayne", Zones.TRAIL, ["Pizza", "Burgers", "Potato Chips"], "purple");

  new Unicorn("Foxy", Zones.BARN, ["Ice Cream", "Butter", "Carrots"], "grey");
  new Unicorn("Gentle", Zones.PASTURE, ["Carrots", "Celery", "Tears of Dwarves"], "brown");
  new Unicorn("Sadie", Zones.TRAIL, ["Gumbo", "Grilled Cheese", "Potato Chips"], "pink");

  new Unicorn("Priss", Zones.TRAIL, ["Gold"], "grey");
  new Unicorn("Chuck", Zones.BARN, ["Craft Beer", "Tequila", "Burbon"], "black");
  new Unicorn("Amy", Zones.TRAIL, ["Chili", "Happiness"], "grey");

  new Unicorn("Phil", Zones.BARN, ["Hot Dogs", "Lumpia", "Donuts"], "yellow");
  new Unicorn("Jackson", Zones.PASTURE, ["Cupcakes", "Sprinkles", "Vanilla"], "black");
  new Unicorn("Zelda", Zones.TRAIL, ["Dirt", "Carrots", "Fish"], "green");



  refreshPage();
}
function refreshPage() {
  for (let i = 0; i < UnicornList.length; i++) {
    UnicornList[i].renderUnicorns();
    UnicornList[i].allowMovement();
  }
}

function saveToLocalStorage() {
  let unicornListString = JSON.stringify(UnicornList);
  localStorage.setItem('unicorns', unicornListString);
  console.log('Saved Unicorns to Local Storage');
}
function retrieveFromLocalStorage() {

  let retrievedObj = JSON.parse(localStorage.getItem('unicorns'));

}
//Events
$("#unicorn-farm-zones").click(
  function (e) {
    let name = (e.target.id).split('-');
    for (let i = 0; i < UnicornList.length; i++) {
      if (UnicornList[i].name === name[0]) {
        let zone;
        switch (name[1]) {
          case 'pasture':
            zone = Zones.PASTURE;
            break;
          case 'barn':
            zone = Zones.BARN;
            break;
          case 'trail':
            zone = Zones.TRAIL;
            break;
          default:
            console.log('Unable to determine location');
            zone = Zones.BARN;
            break;
        }
        UnicornList[i].location = zone;
      }
    }
    refreshPage();
  }
);
$("#page-two-link").click(function () {
  saveToLocalStorage();
});
//Run
initializePage();
