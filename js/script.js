function toggleMenu() {
  var navbarNav = document.querySelector('.navbar-nav');
  navbarNav.classList.toggle('show');
}

// Feather icons
document.addEventListener('DOMContentLoaded', function() {
  feather.replace();
});

document.getElementById("search").addEventListener("click", function() {
  document.getElementById("search-container").classList.toggle("show-search");
});

