const body = document.body;


// left sidemenu toggle + overlay

const sidemenu = document.querySelector('.sidemenu');
const sidemenuToggle = document.querySelector('.sidemenu__toggle');
const appOverlay = document.querySelector('.app-overlay');

function openSidemenu() {
  body.classList.add('app--sidemenu-expanded');
  if (sidemenu) {
    sidemenu.classList.remove('sidemenu--collapsed');
    sidemenu.classList.add('sidemenu--expanded');
  }
  sidemenuToggle.setAttribute('aria-expanded', 'true');
  sidemenuToggle.setAttribute('aria-label', 'Close main navigation');
}

function closeSidemenu() {
  body.classList.remove('app--sidemenu-expanded');
  if (sidemenu) {
    sidemenu.classList.remove('sidemenu--expanded');
    sidemenu.classList.add('sidemenu--collapsed');
  }
  sidemenuToggle.setAttribute('aria-expanded', 'false');
  sidemenuToggle.setAttribute('aria-label', 'Open main navigation');
}

function toggleSidemenu() {
  const isExpanded = body.classList.contains('app--sidemenu-expanded');
  if (isExpanded) {
    closeSidemenu();
  } else {
    openSidemenu();
  }
}

// toggle by clicking on the arrow button
if (sidemenuToggle) {
  sidemenuToggle.addEventListener('click', toggleSidemenu);
}

// close by clicking on the overlay
if (appOverlay) {
  appOverlay.addEventListener('click', closeSidemenu);
}



// right sidebar toggle

const sidebarRightToggle = document.querySelector('.page-arrow--right');

function toggleSidebarRight() {
  const isCollapsed = body.classList.contains('app--sidebar-right-collapsed');

  if (isCollapsed) {
    body.classList.remove('app--sidebar-right-collapsed');
    sidebarRightToggle.setAttribute('aria-expanded', 'true');
    sidebarRightToggle.setAttribute('aria-label', 'Hide secondary panel');
  } else {
    body.classList.add('app--sidebar-right-collapsed');
    sidebarRightToggle.setAttribute('aria-expanded', 'false');
    sidebarRightToggle.setAttribute('aria-label', 'Show secondary panel');
  }
}

if (sidebarRightToggle) {
  sidebarRightToggle.addEventListener('click', toggleSidebarRight);
}