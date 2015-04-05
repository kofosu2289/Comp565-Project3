function NPC() {
  var npc = loader.parse(Models.player);
  npc.position.set(25, 0, 25);
  this.nextTreasure = null;
  this.savedNode = null;
  this.nextNode = path.next();
  npc.lookAt(this.nextNode.position);
  this.Object3D = npc;
  this.step = 0.25;
  this.tagDistance = 2;
  this.pathFollowing = true;
  this.treasuresTagged = 0;
}

NPC.prototype.update = function(gameTime) {
  var npc = this.Object3D;
  var x = npc.position.x;
  var z = npc.position.z;
  var distance;
  var nextTreasure;

  if (keyboard.pressed('n') && (nextTreasure = treasures.closest(npc.position)) !== null) {
    this.pathFollowing = false;
  }

  // treasure state
  if (!this.pathFollowing) {
    if (this.nextTreasure === null) {
      this.savedNode = this.nextNode;
      this.nextTreasure = nextTreasure;
      npc.lookAt(this.nextTreasure.position);
    }

    npc.translateZ(this.step);
    distance = npc.position.distanceTo(this.nextTreasure.position);

    if (distance <= this.tagDistance) {
      if (!this.nextTreasure.isTagged()) {
        this.nextTreasure.tag();
        this.treasuresTagged++;
        Inspector.updateTreauresTagged();
      }
      this.nextTreasure = null;
      this.pathFollowing = true;
      this.nextNode = this.savedNode;
      this.savedNode = null;
      npc.lookAt(this.nextNode.position);
    }
  } else {
    distance = npc.position.distanceTo(this.nextNode.position);
    if (distance <= this.tagDistance) {
      this.nextNode = path.next();
      npc.lookAt(this.nextNode.position);
    } else {
      npc.translateZ(this.step);
    }
  }

  if (terrain._isWithinMap(x, z)) {
    npc.position.y = terrain.getSurfaceHeight(x, z);
  }
};
