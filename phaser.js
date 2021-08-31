const gameState = {
  vaccineScore: 0,  
  maskScore: 0,
  totalScore: 0,
  lives: 3,
  highScore: 0
};
const WIDTH = 800;
const HEIGHT = 600;

function preload() {
  /***************** LOAD IMAGES *****************/
  this.load.image('player', 'assets/img/person.png');
  this.load.image('background', 'assets/img/background.png');
  this.load.image('platform', 'assets/img/platform.png');
  this.load.image('life', 'assets/img/life.png');
  this.load.image('mask', 'assets/img/mask.png');
  this.load.image('covid', 'assets/img/covid.png');
  this.load.image('vaccine', 'assets/img/syringe.png');
}

function create() {
/***************** CREATE ELEMENTS *****************/
  //CREATE BACKGROUND
  this.add.image(400, 300, 'background');

  //CREATE JACK
  gameState.player = this.physics.add.sprite(30, 500, 'player');
  //make sure jack can't leave the bounds of the screen
  gameState.player.setCollideWorldBounds(true);

  //CREATE PLATFORM
  const platforms = this.physics.add.staticGroup();
  platforms.create(400, 620, 'platform');
  this.physics.add.collider(gameState.player, platforms);

  //CREATE KEYS
  gameState.keys = this.input.keyboard.createCursorKeys();

  //CREATE LIFE IMAGES
  const healthLives = this.add.group();
  let life1 = healthLives.create(775, 25, 'life');
  let life2 = healthLives.create(735, 25, 'life');
  let life3 = healthLives.create(695, 25, 'life');
  // healthLives.setScale(3);

  //SET GAME SCORE TEXT
  gameState.scoreText = this.add.text(10, 5, `Total Score: 0\nHigh Score: ${gameState.highScore}\nMasks Collected: 0\nVaccines Collected: 0`, { fontFamily: '"Oswald", sans-serif', fontSize: '1rem', fill: '#FFFFFF' });

/***************** COVID SPRITE *****************/
  //ADD COVID SPRITE AT RANDOM LOCATION
  const covid = this.physics.add.group();
  function genCovid(){
    const xCoord = Math.random() * WIDTH;
    covid.create(xCoord, 10, 'covid');
    covid.setVelocityY(300);
  }
  //DROP COVID SPRITE EVERY X SECONDS
  const covidGenLoop = this.time.addEvent({
    delay: 1000,
    callback: genCovid,
    callbackScope: this,
    loop: true
  });
  //DESTROY COVID SPRITES WHEN THEY COLLIDE WITH PLATFORM
  this.physics.add.collider(covid, platforms, function(covidSprite) {
    covidSprite.destroy();
  });

/***************** MASK SPRITE *****************/
 //ADD MASK SPRITE AT RANDOM LOCATION
  const mask = this.physics.add.group();
  function genMasks(){
    const xCoord = Math.random() * WIDTH;
    mask.create(xCoord, 10, 'mask');
    mask.setVelocityY(200);
  }
  //DROP MASK SPRITE EVERY X SECONDS
  const maskGenLoop = this.time.addEvent({
    delay: 2000,
    callback: genMasks,
    callbackScope: this,
    loop: true
  });
 //DESTROY MASK SPRITES WHEN THEY COLLIDE WITH PLATFORM
  this.physics.add.collider(mask, platforms, function(maskSprite) {
    maskSprite.destroy();
  });

/***************** VACCINE SPRITE *****************/
 //ADD VACCINE SPRITE AT RANDOM LOCATION
 const vaccine = this.physics.add.group();
 function genVaccines(){
   const xCoord = Math.random() * WIDTH;
   vaccine.create(xCoord, 10, 'vaccine');
   vaccine.setVelocityY(250);
 }
 //DROP VACCINE SPRITE EVERY X SECONDS
 const vaccineGenLoop = this.time.addEvent({
   delay: 3000,
   callback: genVaccines,
   callbackScope: this,
   loop: true
 });
 //DESTROY VACCINE SPRITES WHEN THEY COLLIDE WITH PLATFORM
  this.physics.add.collider(vaccine, platforms, function(vaccineSprite) {
    vaccineSprite.destroy();
  });

/***************** LIFE SPRITE *****************/
//ADD LIFE SPRITE AT RANDOM LOCATION
const lives = this.physics.add.group();
function genLives(){
  const xCoord = Math.random() * WIDTH;
  lives.create(xCoord, 10, 'life');
  lives.setVelocityY(100);
}
//DROP LIFE SPRITE EVERY X SECONDS
const lifeGenLoop = this.time.addEvent({
  delay: 10000,
  callback: genLives,
  callbackScope: this,
  loop: true
});
//DESTROY LIFE SPRITES WHEN THEY COLLIDE WITH PLATFORM
 this.physics.add.collider(lives, platforms, function(vaccineSprite) {
   vaccineSprite.destroy();
 });


/***************** PLAYER COLLISIONS *****************/
  //DESTROY LIFES WHEN PLAYER COLLIDES WITH COVID
  this.physics.add.collider(gameState.player, covid, function(player, covidSprite) {
    gameState.lives -= 1;
    covidSprite.destroy();
    if (gameState.lives == 2){
      life3.destroy();
    }
    else if (gameState.lives == 1){
      life2.destroy();
    }
    else{
      life1.destroy();
        covidGenLoop.destroy();
        maskGenLoop.destroy();
        vaccineGenLoop.destroy();
        lifeGenLoop.destroy();
      this.physics.pause();
      gameState.scoreText.setText(``);
      this.add.text(300, 160, 'GAME OVER', { align: 'center', fontFamily: '"Oswald", sans-serif', fontSize: '50px', fill: '#FFFFFF' });
      this.add.text(315, 215, 'Click anywhere to play again!', { align: 'center', fontFamily: '"Oswald", sans-serif', fontSize: '18px', fill: '#FFFFFF' });
      this.add.text(340, 240, `Total Score: ${gameState.totalScore}\nHigh Score: ${gameState.highScore}\nMasks Collected: ${gameState.maskScore}\nVaccines Collected: ${gameState.vaccineScore}`, { align: 'center', fontFamily: '"Oswald", sans-serif', fontSize: '18px', fill: '#FFFFFF' });
    }
  
    this.input.on('pointerup', () => {
      if (gameState.highScore < gameState.totalScore){
        gameState.highScore = gameState.totalScore;
      }
      gameState.totalScore = 0;
      gameState.maskScore = 0;
      gameState.vaccineScore = 0;
      gameState.lives = 3;
      this.scene.restart();
    })
  }.bind(this));


   //DESTROY LIFE SPRITES WHEN THEY COLLIDE WITH PLAYER
  this.physics.add.collider(gameState.player, lives, function(player, lifeSprite) {
    if (gameState.lives == 2){
      life3 = healthLives.create(695, 25, 'life');
      gameState.lives += 1;
    }
    else if (gameState.lives == 1){
      life2 = healthLives.create(735, 25, 'life');
      gameState.lives += 1;
    }
    lifeSprite.destroy();
  });

  //DESTROY MASK SPRITES WHEN THEY COLLIDE WITH PLAYER
  this.physics.add.collider(gameState.player, mask, function(player, maskSprite) {
    gameState.totalScore += 5;
    gameState.maskScore += 1;
    gameState.scoreText.setText(`Total Score: ${gameState.totalScore}\nHigh Score: ${gameState.highScore}\nMasks Collected: ${gameState.maskScore}\nVaccines Collected: ${gameState.vaccineScore}`);
    maskSprite.destroy();
  });

  //DESTROY VACCINE SPRITES WHEN THEY COLLIDE WITH PLAYER
  this.physics.add.collider(gameState.player, vaccine, function(player, vaccineSprite) {
    gameState.totalScore += 10;
    gameState.vaccineScore += 1;
    gameState.scoreText.setText(`Total Score: ${gameState.totalScore}\nHigh Score: ${gameState.highScore}\nMasks Collected: ${gameState.maskScore}\nVaccines Collected: ${gameState.vaccineScore}`)
    vaccineSprite.destroy();
  });

}

function update() {
   // LEFT/RIGHT ARROW KEY MOVEMENTS
  if (gameState.keys.right.isDown){
    gameState.player.x += 5;
    gameState.player.setVelocityX(100);
    gameState.player.setFlipX(false);
  }else if (gameState.keys.left.isDown){
    gameState.player.x -= 5;
    gameState.player.setVelocityX(-100);
    gameState.player.setFlipX(true);
  }
  else {
    gameState.player.setVelocityX(0);
  }
  if (gameState.keys.up.isDown){
    gameState.player.y -= 4;
  }
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
    preload: preload,
    create: create,
    update: update
	},
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
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