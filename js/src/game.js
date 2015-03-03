// Globals 
//accessible by all js files loaded in index.html after stage.js
var Game = {};
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.ObjectLoader();
var keyboard = new THREEx.KeyboardState();
var cameraList;

renderer.setClearColor(0xffffff); // set white background
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

Game.loadContent = function() {
  // cameras
  cameraList = new CameraList();
  GameComponents.add(cameraList);
  for (var i = 0; i < cameraList.cameras.length; i++) {
    scene.add(cameraList.cameras[i].camera);
  }

  // player
  var playerFollowCamera = cameraList.get('player_follow');
  var playerHoverCamera = cameraList.get('player_hover');
  var player = new Player();
  player.Object3D.add(playerFollowCamera);
  player.Object3D.add(playerHoverCamera);
  GameComponents.add(player);
  scene.add(player.Object3D);

  // npc
  var npcFollowCamera = cameraList.get('npc_follow');
  var npcHoverCamera = cameraList.get('npc_hover');
  var npc = new NPC();
  npc.Object3D.add(npcFollowCamera);
  npc.Object3D.add(npcHoverCamera);
  GameComponents.add(npc);
  scene.add(npc.Object3D);

  // ground
  var groundGeometry = new THREE.PlaneGeometry(100, 100, 100, 100);
  var groundMaterial = new THREE.MeshBasicMaterial({wireframe: true, color: 0x00ff00});
  ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);
};

Game.update = function() {
  var gameTime = new Date().getTime();
  GameComponents.update(gameTime);
};

Game.render = function() {
  Game.update()
  renderer.render(scene, cameraList.activeCamera);
  requestAnimationFrame(Game.render);
};

Game.loadContent();
Game.render();