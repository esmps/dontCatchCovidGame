const gameState = {}

function preload() {
  this.load.image('player', 'assets/img/hero.png');
  this.load.image('background', 'assets/img/background.png');
  this.load.image('platform', 'assets/img/ground.png');
  this.load.image('health_star', 'assets/img/health_star.png');
}

function create() {
  //ADD BACKGROUND
  this.add.image(400, 300, 'background');

  //CREATE JACK
  gameState.player = this.physics.add.sprite(30, 0, 'player');
  //make sure jack can't leave the bounds of the screen
  gameState.player.setCollideWorldBounds(true);

  //CREATE KEYS
  gameState.keys = this.input.keyboard.createCursorKeys();

  //CREATE FLATFORM
  const platforms = this.physics.add.staticGroup()
  platforms.create(300, 580, 'platform')

  //COLLIDER FOR JACK AND PLATFORMS
  this.physics.add.collider(gameState.player, platforms);

  //ADD HEALTH STARS
  const health_star = this.physics.add.group();
  function gen_star() {
    const xCoord = Math.random() * 600;
    health_star.create(xCoord, 10, 'health_star');
  }
  this.physics.add.collider(health_star, platforms);
  gen_star();

}

function update() {
   // LEFT/RIGHT ARROW KEY MOVEMENTS
  if (gameState.keys.right.isDown){
    gameState.player.x += 3;
    gameState.player.setVelocityX(10);
  }else if (gameState.keys.left.isDown){
    gameState.player.x -= 3;
    gameState.player.setVelocityX(-10);
  }
  else {
    gameState.player.setVelocityX(0);
  }
  //UP ARROW KEY MOVEMENTS
  if (gameState.keys.up.isDown){
    gameState.player.y -= 4;
  }
}

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 600,
	scene: {
    preload: preload,
    create: create,
    update: update
	},
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      enableBody: true,
      debug: false
    }
  }
}

const game = new Phaser.Game(config);