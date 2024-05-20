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

// carousel menu
  const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list"); 
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

  // Update thumb position on mouse move
      const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

  // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    }

  // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }

  // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  // Call these two functions when image list scrolls
    imageCarousel.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });

  // Initial function calls
  updateScrollThumbPosition();
  handleSlideButtons();
}

document.addEventListener("DOMContentLoaded", initSlider); 
window.addEventListener("resize", initSlider);

// carousel menu

//$(document).ready(function(){
  //$('.image-carousel').slick({
    //slidesToShow: 1,
    //slidesToScroll: 1,
    //arrows: false,
    //fade: true,
    //asNavFor: '.image-carousel-nav'
  //});
//});




// Create a chart instance
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [{
            label: 'Dataset 1',
            data: [10, 20, 30],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// Get the dropdown menu and add an event listener for the change event
  const select = document.getElementById('chart-select');
  select.addEventListener('change', () => {

// Retrieve the selected value
  const selectedValue = select.value;

// Update the chart datasets based on the selected value
    if (selectedValue === 'dataset1') {
        chart.data.datasets = [{
            label: 'Dataset 1',
            data: [10, 20, 30],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }];
    } else if (selectedValue === 'dataset2') {
        chart.data.datasets = [{
            label: 'Dataset 2',
            data: [5, 15, 25],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }];
    } else if (selectedValue === 'dataset3') {
        chart.data.datasets = [{
            label: 'Dataset 3',
            data: [2, 8, 18],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        }];
    }

    // Update the chart
    chart.update();
});
