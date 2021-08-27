const gameState = {}

function preload() {
  this.load.image('jack', 'assets/img/hero.png');
  this.load.image('background', 'assets/img/background.png');
}

function create() {
  this.add.image(400, 300, 'background');
  gameState.jack = this.add.sprite(300, 300, 'jack');
  gameState.cursors = this.input.keyboard.createCursorKeys();

}

function update() {
  // Update based on keypress here!
  if (gameState.cursors.right.isDown){
    gameState.jack.x += 5;
  }
  if (gameState.cursors.left.isDown){
    gameState.jack.x -= 5;
  }
  if (gameState.cursors.down.isDown){
    gameState.jack.y += 5;
  }
  if (gameState.cursors.up.isDown){
    gameState.jack.y -= 5;
  }
}

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 600,
	backgroundColor: "#5f2a55",
    inputKeyboard: true,
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 200 }
        }
    },
	scene: {
    preload,
    create,
    update
	}
}

const game = new Phaser.Game(config);