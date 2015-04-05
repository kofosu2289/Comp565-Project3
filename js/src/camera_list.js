function CameraList() {
  var cameras = [];

  // load default cameras

  // player cameras
  var playerFollowCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  playerFollowCamera.position.y = 10;
  playerFollowCamera.position.z = -20;
  playerFollowCamera.rotation.y = Math.PI
  cameras.push({camera: playerFollowCamera, name: 'player_follow'});

  var playerHoverCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  playerHoverCamera.position.y = 20;
  playerHoverCamera.rotation.x = Math.PI / 2;
  playerHoverCamera.rotation.y = Math.PI
  cameras.push({camera: playerHoverCamera, name: 'player_hover'});

  // npc cameras
  var npcFollowCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  npcFollowCamera.position.y = 10;
  npcFollowCamera.position.z = -20;
  npcFollowCamera.rotation.y = Math.PI
  cameras.push({camera: npcFollowCamera, name: 'npc_follow'});

  var npcHoverCamera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );
  npcHoverCamera.position.y = 20;
  npcHoverCamera.rotation.x = Math.PI / 2;
  npcHoverCamera.rotation.y = Math.PI
  cameras.push({camera: npcHoverCamera, name: 'npc_hover'});

  this.cameras = cameras;
  this.activeCamera = cameras[0].camera;
}

CameraList.prototype.add = function(camera) {
  if (this.cameras.length < 9) {
    this.cameras.push(camera);
  }
};

CameraList.prototype.get = function(name) {
  var cameras = this.cameras;
  var cameraObj;
  var resultCamera = null;

  for (var i = 0; i < cameras.length; i++) {
    cameraObj = cameras[i];
    if (cameraObj.name === name) {
      resultCamera = cameraObj.camera;
      break;
    }
  }

  return resultCamera;
};

CameraList.prototype.update = function(gameTime) {
  var cameras = this.cameras;
  var cameraKeyString;

  for (var i = 0; i < cameras.length; i++) {
    cameraKeyString = (i+1).toString();

    if (keyboard.pressed(cameraKeyString)) {
      this.activeCamera = cameras[i].camera;
      break;
    }
  }
};
