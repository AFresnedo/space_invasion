// game-wide constants
const DEFAULT_SPEED = 300;
const GAME_HEIGHT = 500;
const GAME_WIDTH = 800;
const STARTING_LIFE = 100;
const SWITCH_WEAPON_TIMER = 200;
const ENEMY_LIFE = 100;
var WEAPONS = [
  {name: 'Blaster', velocity: 450, timer: 140, offset: 20, damage: 25},
  {name: 'Missile', velocity: 275, timer: 600, offset: 15, damage: 150}
];
// global variables
var player;
var cursors;
var scoreText, hpText;
var music, blaster;
var lasers;
var weaponTimer = 0;
var currentWeapon = 0;
var switchTimer = 0;
var weaponTimer = 0;
var explosions;
