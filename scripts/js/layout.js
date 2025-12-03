const sidemenu = document.querySelector('.sidemenu');
const sidemenuToggle = document.querySelector('.sidemenu__toggle');
const appOverlay = document.querySelector('.app-overlay');
const sidebarRight = document.querySelector('.sidebar-right');
const sidebarRightToggle = document.querySelector('.page-arrow--right');

// left sidemenu
function openSidemenu() {
  if (!sidemenu || !sidemenuToggle) return;

  sidemenu.classList.add('sidemenu--expanded');
  sidemenu.classList.remove('sidemenu--collapsed');

  sidemenuToggle.setAttribute('aria-expanded', 'true');
  sidemenuToggle.setAttribute('aria-label', 'Close main navigation');
}

function closeSidemenu() {
  if (!sidemenu || !sidemenuToggle) return;

  sidemenu.classList.remove('sidemenu--expanded');
  sidemenu.classList.add('sidemenu--collapsed');

  sidemenuToggle.setAttribute('aria-expanded', 'false');
  sidemenuToggle.setAttribute('aria-label', 'Open main navigation');
}

function toggleSidemenu() {
  if (!sidemenu) return;

  const isExpanded = sidemenu.classList.contains('sidemenu--expanded');
  if (isExpanded) {
    closeSidemenu();
  } else {
    openSidemenu();
  }
}

// toggle sidemenu by clicking on the arrow button
if (sidemenuToggle) {
  sidemenuToggle.addEventListener('click', toggleSidemenu);
}

// right sidebar
function openSidebarRight() {
  if (!sidebarRight || !sidebarRightToggle) return;

  sidebarRight.classList.remove('sidebar-right--collapsed');
  sidebarRight.classList.add('sidebar-right--open');

  sidebarRightToggle.setAttribute('aria-expanded', 'true');
  sidebarRightToggle.setAttribute('aria-label', 'Hide secondary panel');
}

function closeSidebarRight() {
  if (!sidebarRight || !sidebarRightToggle) return;

  sidebarRight.classList.remove('sidebar-right--open');
  sidebarRight.classList.add('sidebar-right--collapsed');

  sidebarRightToggle.setAttribute('aria-expanded', 'false');
  sidebarRightToggle.setAttribute('aria-label', 'Open secondary panel');
}

function toggleSidebarRight() {
  if (!sidebarRight) return;

  const isOpen = sidebarRight.classList.contains('sidebar-right--open');
  if (isOpen) {
    closeSidebarRight();
  } else {
    openSidebarRight();
  }
}

// toggle right sidebar by clicking on the arrow button
if (sidebarRightToggle) {
  sidebarRightToggle.addEventListener('click', toggleSidebarRight);
}

// overlay - collapses sidemenu
if (appOverlay) {
  appOverlay.addEventListener('click', () => {
    if (sidemenu && sidemenu.classList.contains('sidemenu--expanded')) {
      closeSidemenu();
    }
  });
}