function Treasure(x, z) {
  var treasure = loader.parse(Models.untaggedTreasure);
  this.Object3D = treasure;
  this.position = new THREE.Vector3(
    x,
    terrain.getSurfaceHeight(x, z),
    z
  );
  this.tagged = false;

  treasure.position.set(this.position.x, this.position.y, this.position.z);
}

Treasure.prototype.tag = function() {
  this.tagged = true;
};

Treasure.prototype.isTagged = function() {
  return this.tagged;
};

Treasure.prototype.update = function(gameTime) {
  if (this.tagged) {
    this.Object3D.rotation.y += 0.1;
  }
};

function TreasureList() {
  this.treasures = [
    new Treasure(35, 35),
    new Treasure(150, 10),
    new Treasure(10, 150),
    new Treasure(15, 15)
  ];
}

TreasureList.prototype.closest = function(position) {
  var treasures = this.treasures.filter(function(t){return !t.tagged});
  var closest = null;
  var closestDistance = Infinity;
  var current;
  var currentDistance;

  for (var i = 0; i < treasures.length; i++) {
    current = treasures[i];
    currentDistance = position.distanceTo(current.position);

    if (currentDistance < closestDistance) {
      closest = current;
      closestDistance = currentDistance;
    }
  }

  return closest;
};
