function Player() {
  var player = loader.parse(Models.player);
  player.position.set(25, 0, 25);
  this.Object3D = player;
  this.step = 0.25
  this.rotation = 0.02;
  this.tagDistance = 5;
  this.treasuresTagged = 0;
  this.isCollidable = true;
  this.collisionDistance = 2;
  this.ray = {
    forward: new THREE.Vector3(0, 0, 1),
    backward: new THREE.Vector3(0, 0, -1)
  };

  var boundingGeometry = new THREE.BoxGeometry(4, 7, 4);
  var boundingMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
  this.boundingBox = new THREE.Mesh(boundingGeometry, boundingMaterial);
  this.boundingBox.position.set(0, 3.5, 0);
  player.add(this.boundingBox);
}

Player.prototype.update = function(gameTime) {
  var player = this.Object3D;
  var x = player.position.x;
  var z = player.position.z;
  var closestTreasure;
  var distance;
  var collidables = Components.collidable();

  if (keyboard.pressed('up')) {
    player.translateZ(this.step);

    if (Collision.objectsCollide(player, collidables, this.ray.forward, this.collisionDistance)) {
      player.translateZ(-this.step);
    }
  }
  if (keyboard.pressed('down')) {
    player.translateZ(-this.step);

    if (Collision.objectsCollide(player, collidables, this.ray.backward, this.collisionDistance)) {
      player.translateZ(this.step);
    }
  }
  if (keyboard.pressed('left')) {
    player.rotation.y += this.rotation;
  }
  if (keyboard.pressed('right')) {
    player.rotation.y -= this.rotation;
  }

  closestTreasure = treasures.closest(player.position);
  if (closestTreasure !== null) {
    distance = player.position.distanceTo(closestTreasure.position);

    if (distance <= this.tagDistance) {
      closestTreasure.tag();
      this.treasuresTagged++;
      Inspector.updateTreauresTagged();
    }
  }

  if (terrain._isWithinMap(x, z)) {
    player.position.y = terrain.getSurfaceHeight(x, z);
  }
};
