import jquery from 'jquery';

/* Expand and collapse navbar  */
const toggle = document.querySelector(".menu-icon");
const menu = document.querySelector("#invenio-nav");

/* Toggle mobile menu */
function toggleMenu() {
  if (menu.classList.contains("active")) {
    menu.classList.remove("active");
  } else {
    menu.classList.add("active");
  }
}
toggle && toggle.addEventListener("click", toggleMenu, false);


/* User profile dropdown */
jquery('#user-profile-dropdown.ui.dropdown')
  .dropdown({
    showOnFocus: false,
    selectOnKeydown: false,
    action: (text, value, element) => {
      // needed to trigger navigation on keyboard interaction
      let path = element.attr('href');
      window.location.pathname=path;
    },
    onShow: () => {
      jquery('#user-profile-dropdown-btn').attr('aria-expanded', true)
    },
    onHide: () => {
      jquery('#user-profile-dropdown-btn').attr('aria-expanded', false)
    }
  });
