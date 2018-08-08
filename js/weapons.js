function fireWeapon() {
  if (game.time.now < weaponTimer || player.life <= 0) {
    // cannot fire, return out of function
    console.log('weapon jammed!');
    return;
  }
  var weapon;
  if (WEAPONS[currentWeapon].name === 'Blaster') {
    console.log('FUEGO!');
    weapon = blasters.getFirstExists(false);
    blaster.play();
  }
  if (WEAPONS[currentWeapon].name === 'Missile') {
    console.log('Box One!');
    weapon = missiles.getFirstExists(false);
    launch.play();
  }
  // what? spawn here? yes, so it shoots from ship
  weapon.reset(player.x + WEAPONS[currentWeapon].offset, player.y
    + WEAPONS[currentWeapon].offset);
  weapon.body.velocity.x = WEAPONS[currentWeapon].velocity;
  weaponTimer = game.time.now + WEAPONS[currentWeapon].timer;
}

function switchWeapon() {
  if (game.time.now < switchTimer) {
    return;
  }
  console.log('Switching Weapons!');
  // switch to next weapon
  currentWeapon++;
  currentWeapon = currentWeapon % WEAPONS.length;
  console.log(currentWeapon);

  switchTimer = game.time.now + SWITCH_WEAPON_TIMER;
}
