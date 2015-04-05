// Globals 
//accessible by all js files loaded in index.html after stage.js
var Game = {};
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.ObjectLoader();
var keyboard = new THREEx.KeyboardState();
var cameraList;
var inspectorElement = document.getElementById('inspector');
var canvasElement = document.getElementById('game');

renderer.setClearColor(0xffffff); // set white background
renderer.setSize(window.innerWidth, window.innerHeight - 100); // account for inspector
canvasElement.appendChild(renderer.domElement);

var terrain;
var path;
var treasures;
var player;
var npc;

Game.loadContent = function() {
  // ground
  var terrainWidth = 200;
  var terrainHeight = 200;
  terrain = new  Terrain(terrainWidth, terrainWidth);
  var groundGeometry = terrain.generateGeometry();
  var groundMaterial = terrain.generateMaterial();
  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.material.side = THREE.DoubleSide;
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(terrainWidth / 2, 0, terrainHeight / 2);
  scene.add(ground);

  path = new Path();

  // cameras
  cameraList = new CameraList();
  Components.add(cameraList);
  for (var i = 0; i < cameraList.cameras.length; i++) {
    scene.add(cameraList.cameras[i].camera);
  }

  // player
  var playerFollowCamera = cameraList.get('player_follow');
  var playerHoverCamera = cameraList.get('player_hover');
  player = new Player();
  player.Object3D.add(playerFollowCamera);
  player.Object3D.add(playerHoverCamera);
  Components.add(player);
  scene.add(player.Object3D);

  // npc
  var npcFollowCamera = cameraList.get('npc_follow');
  var npcHoverCamera = cameraList.get('npc_hover');
  npc = new NPC();
  npc.Object3D.add(npcFollowCamera);
  npc.Object3D.add(npcHoverCamera);
  Components.add(npc);
  scene.add(npc.Object3D);

  // dogs
  var dog1 = new Dog(50, 50);
  var dog2 = new Dog(100, 50);
  var dog3 = new Dog(50, 100);
  Components.add(dog1);
  Components.add(dog2);
  Components.add(dog3);
  scene.add(dog1.Object3D);
  scene.add(dog2.Object3D);
  scene.add(dog3.Object3D);

  //treasures
  treasures = new TreasureList();
  var treasure;
  for (var i = 0; i < treasures.treasures.length; i++) {
    treasure = treasures.treasures[i];
    Components.add(treasure);
    scene.add(treasure.Object3D);
  }
};

// update inspector once per ~1 second
var prevInspectorTick = new Date().getTime();
Game.update = function() {
  var gameTime = new Date().getTime();
  Components.update(gameTime);
  if (gameTime - prevInspectorTick >= 1000) {
    Inspector.update();
    prevInspectorTick = gameTime;
  }
};

Game.render = function() {
  Game.update()
  renderer.render(scene, cameraList.activeCamera);
  requestAnimationFrame(Game.render);
};

Game.loadContent();
Game.render();
