function NavNode(x, z) {
  this.position = new THREE.Vector3(
    x,
    terrain.getSurfaceHeight(x, z),
    z
  );

  var nodeGeometry = new THREE.BoxGeometry(1, 1, 1);
  var nodeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000});
  var node = new THREE.Mesh(nodeGeometry, nodeMaterial);
  node.position.set(this.position.x, this.position.y, this.position.z);
  scene.add(node);
}

function Path() {
  this.nodes = [
    new NavNode(25, 25),
    new NavNode(25, 50),
    new NavNode(100, 100),
    new NavNode(50, 25)
  ];
  this.nodeIndex = 0;
}

Path.prototype.next = function() {
  var node = this.nodes[this.nodeIndex];
  this.nodeIndex = (this.nodeIndex + 1) % this.nodes.length;

  return node;
};
