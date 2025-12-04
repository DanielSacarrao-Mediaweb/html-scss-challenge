const sidemenu = document.querySelector('.sidemenu');
const sidemenuToggle = document.querySelector('.sidemenu__toggle');
const appOverlay = document.querySelector('.app-overlay');
const sidebarRight = document.querySelector('.sidebar-right');
const sidebarRightToggle = document.querySelector('.page-arrow--right');

const main = document.querySelector('.main');
const employeesSection = document.querySelector('.employees');
const mainHeaderTitle = document.querySelector('.main-header__title');

const preferencesFooter = document.querySelector('.sidemenu__footer');
const preferencesLabelEl = document.querySelector('.sidemenu__preferences-label');




// create an "empty" section for the other pages (Homepage, Statistics, Favourites, Preferences)
let placeholderSection = document.querySelector('.main-placeholder');
if (!placeholderSection && main) {
  placeholderSection = document.createElement('section');
  placeholderSection.className = 'main-placeholder';
  placeholderSection.setAttribute('aria-label', 'Page content');
  placeholderSection.hidden = true;
  main.appendChild(placeholderSection);
}




// sidemenu
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

// click on sidemenu items (Homepage / Statistics / Favourites / Employees)
const navItems = document.querySelectorAll('.sidemenu-nav__item');

function setActiveNavItem(item, options = {}) {
  if (!item) return;
  const { isPreferences = false } = options;

  // remove highlight from all items
  navItems.forEach((li) =>
    li.classList.remove('sidemenu-nav__item--employees')
  );
  if (preferencesFooter) {
    preferencesFooter.classList.remove('sidemenu__footer--active');
  }

  let label = '';

  if (isPreferences) {
    // activate Preferences
    if (preferencesFooter) {
      preferencesFooter.classList.add('sidemenu__footer--active');
    }
    label =
      (preferencesLabelEl && preferencesLabelEl.textContent.trim()) ||
      'Preferences';
  } else {
    // activate regular nav item
    item.classList.add('sidemenu-nav__item--employees');
    const labelEl = item.querySelector('.sidemenu-nav__label');
    label = labelEl ? labelEl.textContent.trim() : '';
  }

  // update main header title
  if (mainHeaderTitle && label) {
    mainHeaderTitle.textContent = label;
  }

  // show/hide employees list
  if (employeesSection && placeholderSection) {
    if (label === 'Employees') {
      employeesSection.hidden = false;
      placeholderSection.hidden = true;
    } else {
      employeesSection.hidden = true;
      placeholderSection.hidden = false;
    }
  }
}



// listeners on menu links
navItems.forEach((item) => {
  const link = item.querySelector('.sidemenu-nav__link');
  if (!link) return;

  link.addEventListener('click', (event) => {
    event.preventDefault(); // prevents jumping to the top
    setActiveNavItem(item);
  });
});


if (preferencesFooter && preferencesLabelEl) {
  preferencesFooter.addEventListener('click', (event) => {
    event.preventDefault();
    setActiveNavItem(preferencesFooter, { isPreferences: true });
  });
}



// start on the "Employees" page
const employeesNavItem = document.querySelector('.sidemenu-nav__item--employees');
if (employeesNavItem) {
  setActiveNavItem(employeesNavItem);
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




// overlay - closes sidemenu
if (appOverlay) {
  appOverlay.addEventListener('click', () => {
    if (sidemenu && sidemenu.classList.contains('sidemenu--expanded')) {
      closeSidemenu();
    }
  });
}




// Primary/Secondary Action toggle
const headerActionButtons = document.querySelectorAll('.main-header__actions .btn');

if (headerActionButtons.length === 2) {
  headerActionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // all become "secondary"
      headerActionButtons.forEach((b) => {
        b.classList.remove('btn--primary');
        b.classList.add('btn--secondary');
      });

      // the clicked one becomes "primary"
      btn.classList.add('btn--primary');
      btn.classList.remove('btn--secondary');
    });
  });
}




// Advanced Filters - toggle
const filtersButton = document.querySelector('.btn--filters');

if (filtersButton) {
  filtersButton.addEventListener('click', () => {
    filtersButton.classList.toggle('btn--filters-active');
    const isActive = filtersButton.classList.contains('btn--filters-active');
    filtersButton.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}




// Lily Jones card - expand/collapse
const lilyRow = document.querySelector('.employee-row--with-details');

if (lilyRow) {
  const lilyToggle = lilyRow.querySelector('.employee-row__status-toggle');
  const lilyDetails = lilyRow.querySelector('.employee-row__details');
  const lilyMain = lilyRow.querySelector('.employee-row__main');
  const lilyIcon = lilyRow.querySelector('.employee-row__status-icon');

  let isOpen = true; // initial state: open

  function setLilyState(open) {
    if (!lilyDetails || !lilyMain || !lilyIcon || !lilyToggle) return;

    isOpen = open;

    if (open) {
      // expanded: show details, highlight row and use inverted badge colors
      lilyDetails.style.display = 'grid';
      lilyMain.classList.add('employee-row__main--highlight');
      lilyRow.classList.add('employee-row--with-details');
      lilyIcon.setAttribute('src', 'assets/icons/arrow-up.svg');
      lilyToggle.setAttribute('aria-label', 'Hide details for Lily Jones');
      lilyRow.classList.add('employee-row--open');
    } else {
      // collapsed: hide details, remove highlight and make badge like others
      lilyDetails.style.display = 'none';
      lilyMain.classList.remove('employee-row__main--highlight');
      lilyRow.classList.remove('employee-row--with-details');
      lilyIcon.setAttribute('src', 'assets/icons/arrow-down.svg');
      lilyToggle.setAttribute('aria-label', 'Show details for Lily Jones');
      lilyRow.classList.remove('employee-row--open');
    }
  }

  // ensure a consistent initial state
  setLilyState(true);

  // click anywhere on the card (except links) to toggle
  lilyRow.addEventListener('click', (event) => {
    const clickedLink = event.target.closest('a');
    if (clickedLink) return; // keep links usable

    setLilyState(!isOpen);
  });
}



// pagination - active page
const pagination = document.querySelector('.pagination');

if (pagination) {
  const pageButtons = Array.from(
    pagination.querySelectorAll('.pagination__page')
  );
  const controls = pagination.querySelectorAll('.pagination__control');
  const prevButton = controls[0];
  const nextButton = controls[1];

  function getActiveIndex() {
    const index = pageButtons.findIndex((btn) =>
      btn.classList.contains('pagination__page--active')
    );
    return index === -1 ? 0 : index;
  }

  function setActivePage(index) {
    if (index < 0 || index >= pageButtons.length) return;

    pageButtons.forEach((btn) =>
      btn.classList.remove('pagination__page--active')
    );
    pageButtons[index].classList.add('pagination__page--active');
  }

  let currentIndex = getActiveIndex();

  // click directly on a page number
  pageButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      currentIndex = index;
      setActivePage(currentIndex);
    });
  });

  // previous / next arrows
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex -= 1;
        setActivePage(currentIndex);
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      if (currentIndex < pageButtons.length - 1) {
        currentIndex += 1;
        setActivePage(currentIndex);
      }
    });
  }
}