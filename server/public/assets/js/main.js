document.addEventListener("DOMContentLoaded", function (e) {
  var $installBtn =  document.querySelector('.app__install-btn'),
      $cover = document.querySelector('.cover');
  $installBtn.addEventListener('click', function (e) {
    if(/micromessenger/.test(navigator.userAgent.toLowerCase())) {
      e.preventDefault()
      $cover.classList.add('show')
    }
  }, false)
  $cover.addEventListener('click', function (e) {
    e.preventDefault()
    $cover.classList.remove('show')
  }, false)
})
