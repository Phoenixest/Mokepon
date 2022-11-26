const attackSelectionSection = document.getElementById("attack-selection");
const petSelectionSection = document.getElementById("pet-selection");
const resetSection = document.getElementById("reset");
const cardsContainer = document.getElementById("cards-container");
const attacksContainer = document.getElementById("attacks-container");

const petButton = document.getElementById("pet-button");
const resetButton = document.getElementById("reset-button");

const playersPetName = document.getElementById("player-pet-name");
const enemyPetName = document.getElementById("enemy-pet-name");
const spanPlayerLives = document.getElementById("player-pet-lives");
const spanEnemyLives = document.getElementById("enemy-pet-lives");

const messages = document.getElementById("result");
const playerAttacks = document.getElementById("player-attacks");
const enemyAttacks = document.getElementById("enemy-attacks");

const showMapSection = document.getElementById("show-map");
const map = document.getElementById("map");

let canvas = map.getContext("2d");
let range;
let backgroundMap = new Image()
backgroundMap.src = "./assets/mokemap.png"
let maxWidthMap = 800
let screenHeight
let widthMap = window.innerWidth - 20
screenHeight = widthMap * 600 / 800
map.width = widthMap
map.height = screenHeight

if (widthMap > maxWidthMap){
  widthMap = maxWidthMap - 20
}

let mokepones = [];
let playerPet;
let playerPetObject;
let mokeponAttacks;
let enemyMokeponAttacks;
let playerAttack;
let enemyAttack;
let combatResult;
let secuencePlayerAttacks = [];
let secuenceEnemyAttacks = [];
let mokeponesOption;
let playerLives = 3;
let playerVictories = 0;
let enemyLives = 3;
let enemyVictories = 0;

let hipodogeInput;
let capipepoInput;
let ratigueyaInput;
let langostelvisInput;
let tucapalmaInput;
let pydosInput;

let fireButton;
let waterButton;
let grassButton;
let buttons = [];

class Mokepon {
  constructor(name, photo, life) {
    this.name = name;
    this.photo = photo;
    this.life = life;
    this.attacks = [];
    this.width = 60;
    this.height = 60;
    this.x = randomNumber(0, map.width - this.width);
    this.y = randomNumber(0, map.height - this.height);
    this.mapPhoto = new Image();
    this.mapPhoto.src = photo;
    this.speedX = 0;
    this.speedY = 0;
  }

  drawMokepon() {
    canvas.drawImage(
      this.mapPhoto,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5);
let capipepo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5);
let ratigueya = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5);
let langostelvis = new Mokepon("Langostelvis", "./assets/Langostelvis.png", 5);
let tucapalma = new Mokepon("Tucapalma", "./assets/Tucapalma.png", 5);
let pydos = new Mokepon("Pydos", "./assets/Pydos.png", 5);

let enemyHipodoge = new Mokepon("Hipodoge", "./assets/Hipodoge.png", 5);
let enemyCapipepo = new Mokepon("Capipepo", "./assets/Capipepo.png", 5);
let enemyRatigueya = new Mokepon("Ratigueya", "./assets/Ratigueya.png", 5);

hipodoge.attacks.push(
  { name: "💧", id: "water-button" },
  { name: "💧", id: "water-button" },
  { name: "🔥", id: "fire-button" },
  { name: "🍃", id: "grass-button" }
);

enemyHipodoge.attacks.push(
  { name: "💧", id: "water-button" },
  { name: "💧", id: "water-button" },
  { name: "🔥", id: "fire-button" },
  { name: "🍃", id: "grass-button" }
);

capipepo.attacks.push(
  { name: "🔥", id: "fire-button" },
  { name: "🍃", id: "grass-button" },
  { name: "💧", id: "water-button" },
  { name: "🍃", id: "grass-button" }
);

enemyCapipepo.attacks.push(
  { name: "🔥", id: "fire-button" },
  { name: "🍃", id: "grass-button" },
  { name: "💧", id: "water-button" },
  { name: "🍃", id: "grass-button" }
);

enemyRatigueya.attacks.push(
  { name: "💧", id: "water-button" },
  { name: "🍃", id: "grass-button" },
  { name: "🔥", id: "fire-button" },
  { name: "🔥", id: "fire-button" }
);

ratigueya.attacks.push(
  { name: "💧", id: "water-button" },
  { name: "🍃", id: "grass-button" },
  { name: "🔥", id: "fire-button" },
  { name: "🔥", id: "fire-button" }
);

langostelvis.attacks.push(
  { name: "💧", id: "water-button" },
  { name: "💧", id: "water-button" },
  { name: "🔥", id: "fire-button" },
  { name: "🍃", id: "grass-button" }
);

tucapalma.attacks.push(
  { name: "🔥", id: "fire-button" },
  { name: "🍃", id: "grass-button" },
  { name: "💧", id: "water-button" },
  { name: "🍃", id: "grass-button" }
);

pydos.attacks.push(
  { name: "💧", id: "water-button" },
  { name: "🍃", id: "grass-button" },
  { name: "🔥", id: "fire-button" },
  { name: "🔥", id: "fire-button" }
);

mokepones.push(hipodoge, capipepo, ratigueya, langostelvis, tucapalma, pydos);

function startGame() {
  attackSelectionSection.style.display = "none";
  resetSection.style.display = "none";
  showMapSection.style.display = "none";

  mokepones.forEach((mokepon) => {
    mokeponesOption = `
    <input type="radio" name="pet" id=${mokepon.name} />
    <label class="mokepon-card" for=${mokepon.name}>
      <p>${mokepon.name}</p>
      <img src=${mokepon.photo} alt=${mokepon.name}>
    </label>
    `;

    cardsContainer.innerHTML += mokeponesOption;
  });

  hipodogeInput = document.getElementById("Hipodoge");
  capipepoInput = document.getElementById("Capipepo");
  ratigueyaInput = document.getElementById("Ratigueya");
  langostelvisInput = document.getElementById("Langostelvis");
  tucapalmaInput = document.getElementById("Tucapalma");
  pydosInput = document.getElementById("Pydos");

  petButton.addEventListener("click", petSelector);
  resetButton.addEventListener("click", resetGame);
}

function petSelector() {
  showMapSection.style.display = "flex";
  petSelectionSection.style.display = "none";

  if (hipodogeInput.checked) {
    playersPetName.innerHTML = hipodogeInput.id;
    playerPet = hipodogeInput.id;
  } else if (capipepoInput.checked) {
    playersPetName.innerHTML = capipepoInput.id;
    playerPet = capipepoInput.id;
  } else if (ratigueyaInput.checked) {
    playersPetName.innerHTML = ratigueyaInput.id;
    playerPet = ratigueyaInput.id;
  } else if (langostelvisInput.checked) {
    playersPetName.innerHTML = langostelvisInput.id;
    playerPet = langostelvisInput.id;
  } else if (tucapalmaInput.checked) {
    playersPetName.innerHTML = tucapalmaInput.id;
    playerPet = tucapalmaInput.id;
  } else if (pydosInput.checked) {
    playersPetName.innerHTML = pydosInput.id;
    playerPet = pydosInput.id;
  } else {
    alert("No has seleccionado a ninguna mascota.");
    location.reload();
  }

  extractAttacks(playerPet);
  startMap()
}

function extractAttacks(playerPet) {
  let attacks;
  for (let i = 0; i < mokepones.length; i++) {
    if (playerPet == mokepones[i].name) {
      attacks = mokepones[i].attacks;
    }
  }
  showAttacks(attacks);
}

function showAttacks(attacks) {
  attacks.forEach((attack) => {
    mokeponAttacks = `
      <button id=${attack.id} class="attack-button">${attack.name}</button>
    `;
    attacksContainer.innerHTML += mokeponAttacks;
  });

  fireButton = document.getElementById("fire-button");
  waterButton = document.getElementById("water-button");
  grassButton = document.getElementById("grass-button");

  buttons = document.querySelectorAll(".attack-button");
}

function secuenceAttack() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.textContent == "🔥") {
        secuencePlayerAttacks.push("FUEGO");
      } else if (e.target.textContent == "💧") {
        secuencePlayerAttacks.push("AGUA");
      } else {
        secuencePlayerAttacks.push("PLANTA");
      }
      button.style.background = "#112F58";
      button.disabled = true;
      randomEnemyAttack();
    });
  });
}

function enemyPetSelector(enemy) {
  enemyPetName.innerHTML = enemy.name;
  enemyMokeponAttacks = enemy.attacks;
  secuenceAttack();
}

function randomEnemyAttack() {
  let randomAttack = randomNumber(0, enemyMokeponAttacks.length - 1);

  if (randomAttack == 0 || randomAttack == 1) {
    secuenceEnemyAttacks.push("FUEGO");
  } else if (randomAttack == 3 || randomAttack == 4) {
    secuenceEnemyAttacks.push("AGUA");
  } else {
    secuenceEnemyAttacks.push("PLANTA");
  }
  startCombat();
}

function startCombat() {
  if (secuencePlayerAttacks.length == 4) {
    combat();
  }
}

function indexAttacks(i) {
  playerAttack = secuencePlayerAttacks[i];
  enemyAttack = secuenceEnemyAttacks[i];
}

function combat() {
  for (let i = 0; i < secuencePlayerAttacks.length; i++) {
    indexAttacks(i);
    if (secuencePlayerAttacks[i] == secuenceEnemyAttacks[i]) {
      combatResult = "Empataste 😮";
    } else if (
      (secuencePlayerAttacks[i] == "FUEGO" &&
        secuenceEnemyAttacks[i] == "PLANTA") ||
      (secuencePlayerAttacks[i] == "PLANTA" &&
        secuenceEnemyAttacks[i] == "AGUA") ||
      (secuencePlayerAttacks[i] == "AGUA" && secuenceEnemyAttacks[i] == "FUEGO")
    ) {
      combatResult = "Ganaste 🥳";
      playerVictories++;
      spanPlayerLives.innerHTML = playerVictories;
    } else {
      combatResult = "Perdiste 😣";
      enemyVictories++;
      spanEnemyLives.innerHTML = enemyVictories;
    }
    addMessage();
    checkLives();
  }
}

function checkLives() {
  if (playerVictories == enemyVictories) {
    addFinishMessage("Ha sido un empate!!! 😲");
  } else if (playerVictories > enemyVictories) {
    addFinishMessage("FELICITACIONES! GANASTE 😃");
  } else {
    addFinishMessage("Lo sentimos, Perdiste 😔");
  }
}

function addMessage() {
  let newPlayerAttack = document.createElement("p");
  let newEnemyAttack = document.createElement("p");

  messages.innerHTML = combatResult;
  newPlayerAttack.innerHTML = playerAttack;
  newEnemyAttack.innerHTML = enemyAttack;

  playerAttacks.appendChild(newPlayerAttack);
  enemyAttacks.appendChild(newEnemyAttack);
}

function addFinishMessage(result) {
  messages.innerHTML = result;
  resetSection.style.display = "flex";
}

function resetGame() {
  location.reload();
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawCanvas() {
  playerPetObject.x += playerPetObject.speedX;
  playerPetObject.y += playerPetObject.speedY;
  canvas.clearRect(0, 0, map.width, map.height);
  canvas.drawImage(backgroundMap, 0, 0, map.width, map.height)
  playerPetObject.drawMokepon()
  enemyHipodoge.drawMokepon()
  enemyCapipepo.drawMokepon()
  enemyRatigueya.drawMokepon()
  if (playerPetObject.speedX != 0 || playerPetObject.speedY != 0) {
    getCollision(enemyHipodoge)
    getCollision(enemyCapipepo)
    getCollision(enemyRatigueya)
  }
}

function moveRight() {
  playerPetObject.speedX = 5;
}

function moveLeft() {
  playerPetObject.speedX = -5;
}

function moveDown() {
  playerPetObject.speedY = 5;
}

function moveUp() {
  playerPetObject.speedY = -5;
}

function stopMove() {
  playerPetObject.speedX = 0;
  playerPetObject.speedY = 0;
}

function pressKey(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;

    case "ArrowDown":
      moveDown();
      break;

    case "ArrowLeft":
      moveLeft();
      break;

    case "ArrowRight":
      moveRight();
      break;

    default:
      break;
  }
}

function startMap(){
  playerPetObject = getPet(playerPet)
  range = setInterval(drawCanvas, 35);

  window.addEventListener("keydown", pressKey);
  window.addEventListener("keyup", stopMove);
}

function getPet(playerPet){
  for (let i = 0; i < mokepones.length; i++) {
    if (playerPet == mokepones[i].name) {
      return mokepones[i]
    }
  }
}

function getCollision(enemy) {
  const upEnemy = enemy.y
  const downEnemy = enemy.y + enemy.height
  const rightEnemy = enemy.x + enemy.width
  const leftEnemy = enemy.x

  const upPet = playerPetObject.y
  const downPet = playerPetObject.y + playerPetObject.height
  const rightPet = playerPetObject.x + playerPetObject.width
  const leftPet = playerPetObject.x

  if (
    downPet < upEnemy ||
    upPet > downEnemy ||
    rightPet < leftEnemy ||
    leftPet > rightEnemy
  ) {
    return
  }
  stopMove()
  clearInterval(range)
  attackSelectionSection.style.display = "flex";
  showMapSection.style.display = "none";
  enemyPetSelector(enemy);
}

window.addEventListener("load", startGame);
