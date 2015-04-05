var Inspector = {
  update: function update() {
    Inspector.updatePositionAndRotation();
    Inspector.updateNextGoalAndTreasure();
    Inspector.updatePositionAndRotation();
  },
  updateTreauresTagged: function updateTreauresFound() {
    var playerElement = document.getElementById('player-treaures-tagged');
    var npcElement = document.getElementById('npc-treaures-tagged');

    playerElement.innerHTML = player.treasuresTagged;
    npcElement.innerHTML = npc.treasuresTagged;
  },

  updatePositionAndRotation: function updatePositionAndRotation() {
    var playerPositionElement = document.getElementById('player-position');
    var playerRotationElement = document.getElementById('player-rotation');
    var pp = player.Object3D.position;
    var pr = player.Object3D.rotation;

    playerPositionElement.innerHTML = '('+
      roundToTwoDecimals(pp.x)+', '+
      roundToTwoDecimals(pp.y)+', '+
      roundToTwoDecimals(pp.z)+
    ')';

    playerRotationElement.innerHTML = '('+
      roundToTwoDecimals(pr.x)+', '+
      roundToTwoDecimals(pr.y)+', '+
      roundToTwoDecimals(pr.z)+
    ')';

    var npcPositionElement = document.getElementById('npc-position');
    var npcRotationElement = document.getElementById('npc-rotation');
    var np = npc.Object3D.position;
    var nr = npc.Object3D.rotation;

    npcPositionElement.innerHTML = '('+
      roundToTwoDecimals(np.x)+', '+
      roundToTwoDecimals(np.y)+', '+
      roundToTwoDecimals(np.z)+
    ')';

    npcRotationElement.innerHTML = '('+
      roundToTwoDecimals(nr.x)+', '+
      roundToTwoDecimals(nr.y)+', '+
      roundToTwoDecimals(nr.z)+
    ')';
  },
  updateNextGoalAndTreasure: function updateNextGoalAndTreasure() {
    var npcStateElement = document.getElementById('npc-state');
    var npcNextPositionElement = document.getElementById('npc-next-position');
    var npcNextPosition;

    if (npc.pathFollowing) {
      npcStateElement.innerHTML = 'Goal';
      npcNextPosition = npc.nextNode.position;
    } else {
      npcStateElement.innerHTML = 'Treasure';
      npcNextPosition = npc.nextTreasure.position;
    }

    npcNextPositionElement.innerHTML = '('+
      roundToTwoDecimals(npcNextPosition.x)+', '+
      roundToTwoDecimals(npcNextPosition.y)+', '+
      roundToTwoDecimals(npcNextPosition.z)+
    ')';
  }
};

function roundToTwoDecimals(n) {
  return Math.round(n * 100) / 100;
}
