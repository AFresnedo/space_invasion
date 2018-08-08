function addScore(amount) {
  player.score += amount;
  scoreText.text = 'Score: ' + player.score.toString();
}

function gameOver() {
  console.log('game over');
  music.pause();

  swal({
    title: 'Game over!',
    text: 'Your duty has ended.',
    type: 'warning',
    showCancelButton: false,
    confirmButtonText: 'Alrightey then',
    closeOnConfirm: true
  });
}
