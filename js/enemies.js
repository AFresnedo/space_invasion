function spawnEnemy() {
  console.log('Spawn A Fool');
  var enemy = enemies.getFirstExists(false);
  enemy.reset(GAME_WIDTH - 10, game.rnd.integerInRange(50, GAME_HEIGHT - 50));
  enemy.body.velocity.x = -250;
  enemy.life = ENEMY_LIFE;
}

function crash(player, enemy) {
  console.log('call AAA');
  enemy.kill();
  kill.play()
  player.life -= 25;
  hpText.text = 'HP: ' + player.life.toString();

  var explosion = explosions.getFirstExists(false);
  explosion.reset(player.body.x, player.body.y);
  explosion.play('smallBoom', 50);

  if (player.life <= 0) {
    console.log('game over!');
    player.kill();
    gameOver();
  }
  else if (player.life <= 50) {
    // TODO investigate how to turn this code to work in update
    // hpText = game.add.text(GAME_WIDTH - 150, 20, 'HP: '
      // + player.life.toString(), {fill: '#00ff00'});
    console.log('low health!');
  }
}

function weaponEnemy(weapon, enemy) {
  // sound and visual effects
  kill.play();
  var explosion = explosions.getFirstExists(false);
  explosion.reset(enemy.body.x, enemy.body.y);
  explosion.play('smallBoom', 50, false, true);

  // game logic
  enemy.life -= WEAPONS[currentWeapon].damage;
  if (enemy.life <= 0) {
    enemy.kill();
    addScore(10);
  }
  weapon.kill();
}
