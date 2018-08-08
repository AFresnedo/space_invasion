// setup a new game with GAME_WIDTHx width GAME_HEIGHTx height
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'gameBox', {
  //
  // put all game funcitons here
  //
  // code required before game starts
  init: init,
  // all assets
  preload: preload,
  // setup game state
  create: create,
  // game loop (game logic, whatever you want to call it)
  update: update
});

function init() {
  console.log('init');
}

function preload() {
  console.log('preload');
  // use phaser's physics (collison, etc)
  game.physics.startSystem(Phaser.Physics.ARCADE);


  //
  // image files
  //
  game.load.image('bg', '../assets/img/cool-space-background.jpg')
  // weapons
  game.load.image('blaster', '../assets/img/beam.png');
  game.load.image('missile', '../assets/img/missile.png');
  /// ships
  game.load.image('player', '../assets/img/ship.png');
  game.load.image('enemy', '../assets/img/enemy.png');

  //
  // animations
  //
  game.load.spritesheet('smallBoom', '../assets/img/explosion.png', 64, 64);

  //
  // audio files
  //
  game.load.audio('music', '../assets/audio/Shadelike.mp3');
  game.load.audio('blaster', ['../assets/audio/laser.ogg',
    '../assets/audio/laser.mp3']);
  game.load.audio('launch', '../assets/audio/Missile.mp3');
  game.load.audio('death', '../assets/audio/explosion.mp3');

}

function create() {
  console.log('create');
  // 0 0 is the starting position (top-left)
  // game.width, game.height is the end position (bottom-right)
  background = game.add.tileSprite(0, 0, game.width, game.height, 'bg');
  // make a scrolling background
  // 30 units backwards on x axis
  background.autoScroll(-30, 0);

  // set sounds and music
  music = game.add.audio('music', 0.5);
  blaster = game.add.audio('blaster', 0.1);
  launch = game.add.audio('launch', 1);
  kill = game.add.audio('death', 0.4);
  music.play();

  // create the player and place it
  player = game.add.sprite(100, 250, 'player');
  // set physics properties of player
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  // set player stats
  player.score = 0;
  player.life = STARTING_LIFE;

  //
  // enemies
  //
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicalBodyType = Phaser.Physics.ARCADE;
  enemies.createMultiple(50, 'enemy');
  enemies.setAll('outOfBoundsKill', true);
  enemies.setAll('checkWorldBounds', true);
  enemies.forEach(function(enemy) {
    enemy.life = ENEMY_LIFE;
  });
  // create a timer to "spawn enemy"
  game.time.events.loop(Phaser.Timer.SECOND * 2, spawnEnemy);

  // add keyboard controls
  // tell phaser which keys you care (but not why, yet)
  cursors = game.input.keyboard.createCursorKeys(); // arrow keys
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR,
  Phaser.Keyboard.ENTER]); // other keys

  // add score and hp text to screen
  // TODO careful of offset, better to be percentage of game_width
  hpText = game.add.text(GAME_WIDTH - 150, 20, 'HP: ' + player.life.toString(),
    {fill: '#00ff00'});
  scoreText = game.add.text(GAME_WIDTH - 150, GAME_HEIGHT - 50, 'Score: '
    + player.score.toString(), {fill: '#ffff00'});

  // TODO refactor weapon group creation
  // create laser objects (must anticipate quantity on screen)
  blasters = game.add.group();
  blasters.enableBody = true;
  blasters.physicsBodyType = Phaser.Physics.ARCADE;
  // create multiple instances of laser objects with above group properties
  blasters.createMultiple(20, 'blaster');
  // blasters should despawn if they are off the gameboard
  blasters.setAll('outOfBoundsKill', true);
  blasters.setAll('checkWorldBounds', true);

  // create missle group
  missiles = game.add.group();
  missiles.enableBody = true;
  missiles.physicsBodyType = Phaser.Physics.ARCADE;
  // create multiple instances of laser objects with above group properties
  missiles.createMultiple(20, 'missile');
  // missiles should despawn if they are off the gameboard
  missiles.setAll('outOfBoundsKill', true);
  missiles.setAll('checkWorldBounds', true);

  // create explosion group
  explosions = game.add.group();
  explosions.createMultiple(20, 'smallBoom');
  explosions.setAll('anchor.x', 0);
  explosions.setAll('anchor.y', 0);
  explosions.forEach(function(explosion) {
    explosion.animations.add('smallBoom');
  });
}

function update(){
  // console.log('update');
  // do not allow multiple contrary key presses
  player.body.velocity.set(0);
  if (cursors.left.isDown && cursors.right.isDown) {
    // stand still
  }
  else if (cursors.left.isDown) {
    player.body.velocity.x = -DEFAULT_SPEED;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = DEFAULT_SPEED;
  }
  if (cursors.down.isDown && cursors.up.isDown) {
    // stand still
  }
  else if (cursors.up.isDown) {
    player.body.velocity.y = -DEFAULT_SPEED;
  }
  else if (cursors.down.isDown) {
    player.body.velocity.y = DEFAULT_SPEED;
  }

  //
  // weapons
  //
  if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
    // fire the weapon
    fireWeapon();
  }
  if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
    // switch weapon
    switchWeapon();
  }

  //
  // collisions
  //
  game.physics.arcade.overlap(player, enemies, crash);
  game.physics.arcade.overlap(blasters, enemies, weaponEnemy);
  game.physics.arcade.overlap(missiles, enemies, weaponEnemy);
}
