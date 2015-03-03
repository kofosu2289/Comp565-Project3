var GameComponents = (function() {
  var components = [];
  var componentsHelpers = {
    add: function add(obj3D) {
      components.push(obj3D);
    },
    update: function update(gameTime) {
      var component;

      for (var i = 0; i < components.length; i++) {
        component = components[i];

        if (component.update !== undefined) {
          components[i].update(gameTime);
        }
      }
    }
  }

  return componentsHelpers;
})();