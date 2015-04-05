var Components = (function() {
  var components = [];
  var componentsHelpers = {
    add: function add(object) {
      components.push(object);
    },
    update: function update(gameTime) {
      var component;

      for (var i = 0; i < components.length; i++) {
        component = components[i];
        if (component.update !== undefined) {
          component.update(gameTime);
        }
      }
    },
    collidable: function collidable() {
      return components.filter(function(component) {
        return component.isCollidable;
      });
    }
  }

  return componentsHelpers;
})();
