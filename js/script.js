// 'use strict';

// // Remove preload class once page is fully loaded

// window.addEventListener('load', function() {
//   Array.from(document.getElementsByTagName('body')).forEach(function(el) {
//     el.classList.remove('preload');
//   });
// });

// // Add class to navigation when scrolling down

// document.addEventListener('scroll', function() {
//   const header = document.querySelector('.header-main');
//   if (window.scrollY >= 20) {
//     header.classList.add('fade-in');
//   } else {
//     header.classList.remove('fade-in');
//   }
// });

// // Add class when mobile navigation icon is clicked

// Array.from(document.getElementsByClassName('nav-toggle')).forEach(function(el) {
//   el.addEventListener('click', function() {
//     Array.from(document.getElementsByTagName('body')).forEach(function(el) {
//       el.classList.toggle('no-scroll');
//     });
//     Array.from(document.getElementsByClassName('header-main')).forEach(function(el) {
//       el.classList.toggle('active');
//     });
//   });
// });

// // Prevent background from scrolling on mobile when navigation is toggled

// document.addEventListener('touchmove', function(evt) {
//   evt.preventDefault();
// });

// Toogle Class Active
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