function Dog(x, z) {
  var dog = loader.parse(Models.dog);
  dog.position.set(x, 0, z);
  this.Object3D = dog;
  this.step = 0.25;
  this.isWalking = false;
  this.targetLocation = dog.position;
  this.tagDistance = 2;
  this.isCollidable = true;
  this.collisionDistance = 2;
  this.ray = {
    forward: new THREE.Vector3(0, 0, 1),
    backward: new THREE.Vector3(0, 0, -1)
  };

  var boundingGeometry = new THREE.BoxGeometry(2, 3, 3);
  var boundingMaterial = new THREE.MeshBasicMaterial({transparent: true, opacity: 0});
  this.boundingBox = new THREE.Mesh(boundingGeometry, boundingMaterial);
  this.boundingBox.position.set(0, 1.5, 0);
  dog.add(this.boundingBox);
}

Dog.prototype.update = function(gameTime) {
  var dog = this.Object3D;
  var x = dog.position.x;
  var z = dog.position.z;
  var collidables = Components.collidable();

  if (!this.isWalking) {
    this.isWalking = true;

    var xDirection = Math.floor(Math.random() * 3) - 1;
    var zDirection = Math.floor(Math.random() * 3) - 1;
    var xDistance = (Math.random() * 20) + 10;
    var zDistance = (Math.random() * 20) + 10;

    var target = new THREE.Vector3(
      x + xDirection * xDistance,
      0,
      z + zDirection * zDistance
    );
    dog.lookAt(target);
    
    this.targetLocation = target;
  } else {
    dog.translateZ(this.step);

    if (Collision.objectsCollide(dog, collidables, this.ray.forward, this.collisionDistance)) {
      dog.translateZ(-this.step);
    } else if (dog.position.distanceTo(this.targetLocation) <= this.tagDistance) {
      this.isWalking = false;
    }
  }

  if (terrain._isWithinMap(x, z)) {
    dog.position.y = terrain.getSurfaceHeight(x, z);
  }
};
