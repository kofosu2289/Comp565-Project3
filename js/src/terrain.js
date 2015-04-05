function Terrain(width, height) {
  var heightMap = [];
  var row;

  for (var i = 0; i < width; i++) {
    row = [];
    for (var j = 0; j < height; j++) {
      row[j] = 0;
    }
    heightMap.push(row);
  }

  this.width = width;
  this.height = height;
  this.heightMap = heightMap;
}

Terrain.prototype.getSurfaceHeight = function(x, z) {
  var intX = Math.floor(x);
  var intZ = Math.floor(z);

  return this.heightMap[intZ][intX];
};

Terrain.prototype.generateGeometry = function() {
  this.generateBrownianHeightMap();

  var heightMap = this.heightMap;
  var width = this.width;
  var height = this.height;
  var vertices;
  var groundGeometry;

  geometry = new THREE.PlaneGeometry(width, height, width-1, height-1);
  // flatten map into 1D array of vertices
  vertices = Array.prototype.concat.apply([], heightMap);

  for (var i = 0; i < vertices.length; i++) {
    geometry.vertices[i].z = vertices[i];
  }

  return geometry;
};

Terrain.prototype.generateMaterial = function() {
  return new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0x00ff00
  });
};

Terrain.prototype.generateBrownianHeightMap = function() {
  var heightMap = this.heightMap;
  var passes = 2;
  var steps = 200;
  var step = 5;
  var radius = 15;
  var increment = 0.5;
  var centers = [
    [150, 150]
  ];
  var x;
  var z;

  for (var p = 0; p < passes; p++) {
    for (var c = 0; c < centers.length; c++) {
      x = centers[c][0];
      z = centers[c][1];

      for (var s = 0; s < steps; s++) {
        this._incremenetHeightsWithinRadius(x, z, radius, increment);
        x += step * (Math.floor(Math.random() * 3) - 1);
        z += step * (Math.floor(Math.random() * 3) - 1);

        if (!this._isWithinMap(x, z)) {
          x = centers[c][0];
          z = centers[c][1];
        }
      }
    }
  }
};

Terrain.prototype._incremenetHeightsWithinRadius = function(x, z, radius, increment) {
  var startX = x - radius;
  var startZ = z - radius;
  var distance;

  for (var i = startX; i < x + radius; i++) {
    for (var j = startZ; j < z + radius; j++) {
      distance = new THREE.Vector2(x, z)
        .distanceTo(new THREE.Vector2(i, j))

      if (this._isWithinMap(i, j) && distance <= radius) {
        this.heightMap[i][j] += increment;
      }
    }
  }
};

Terrain.prototype._isWithinMap = function(x, z) {
  return x >= 0 && x < this.width && z >= 0 && z < this.height;
};
