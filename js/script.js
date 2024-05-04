// Toogle Class Active
const navbarNav = document.querySelector('.navbar-nav');
// ketika humberger menu di klik
document.querySelector('#hamburger-menu').onClick = () => {
    navbarNav.classList.toggle('active');
};