function NPC() {
  var npc = loader.parse(Models.player);
  this.Object3D = npc;
  this.Object3D.position.z = -10;
  this.Object3D.rotation.y = -Math.PI;
}

NPC.prototype.update = function(gameTime) {
  var npc = this.Object3D;

};
