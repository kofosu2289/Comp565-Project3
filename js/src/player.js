function Player() {
  var player = loader.parse(Models.player);
  this.Object3D = player;
}

Player.prototype.update = function(gameTime) {
  var player = this.Object3D;

  if (keyboard.pressed('up')) {
    player.translateZ(-0.25);
  }
  if (keyboard.pressed('down')) {
    player.translateZ(0.25);
  }
  if (keyboard.pressed('left')) {
    player.rotation.y += 0.02;
  }
  if (keyboard.pressed('right')) {
    player.rotation.y -= 0.02;
  }
};
