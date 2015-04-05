var Collision = {
  objectsCollide: function objectsCollide(source, objects, direction, distance) {
    var object;
    var collisions;
    var matrix = new THREE.Matrix4();
    var ray;
    direction = direction.clone();

    matrix.extractRotation(source.matrix);
    ray = direction.applyMatrix4(matrix);

    var caster = new THREE.Raycaster();
    caster.set(source.position, ray);

    for (var i = 0; i < objects.length; i++) {
      object = objects[i];
      collisions = caster.intersectObject(object.Object3D, true);

      for (var j = 0; j < collisions.length; j++) {
        if (collisions[j].distance <= distance) {
          return true;
        }
      }
    }

    return false;
  }
};
