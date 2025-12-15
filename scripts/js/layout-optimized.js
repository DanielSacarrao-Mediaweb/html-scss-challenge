const sidemenu = document.querySelector(".sidemenu");
const toggleBtn = document.querySelector(".sidemenu-toggle");

/**
 * !Toggle Sidemenu
 * Toggles the visibility of the side menu and updates accessibility attributes.
 * Relies on CSS for the default collapsed state, only adding a class for expansion.
 */
function toggleSidemenu() {
    // Guard clause to prevent runtime errors if elements are missing
    if (!sidemenu || !toggleBtn) return;

    // Toggle the class and capture the resulting state (true = added, false = removed)
    const isExpanded = sidemenu.classList.toggle("sidemenu--expanded");

    // Update ARIA attributes to match the visual state
    toggleBtn.setAttribute("aria-expanded", String(isExpanded));
    toggleBtn.setAttribute(
        "aria-label",
        isExpanded ? "Close main navigation" : "Open main navigation"
    );
}

// Attach listener if the button exists
toggleBtn?.addEventListener("click", toggleSidemenu);

/**
 * !Set active nav item
 */
const setActiveNavItem = () => {
    const navItems = document.querySelectorAll(".sidemenu-nav__item");

    navItems.forEach((navItem) => {
        navItem.addEventListener("click", () => {
            navItems.forEach((item) =>
                item.classList.remove("sidemenu-nav__item--active")
            );
            navItem.classList.add("sidemenu-nav__item--active");
        });
    });
};

setActiveNavItem();

const sidebarRight = document.querySelector(".sidebar-right");
const sidebarRightToggle = document.querySelector(".sidebar-right-toggle");

/**
 * !Toggle Right Sidebar
 * Toggles the visibility of the right sidebar and updates accessibility attributes.
 * Uses a single class 'sidebar-right--open' to manage state.
 */
function toggleSidebarRight() {
    // Guard clause to ensure elements exist
    if (!sidebarRight || !sidebarRightToggle) return;

    // Toggle the active class and capture the new state
    const isOpen = sidebarRight.classList.toggle("sidebar-right--open");

    // Update ARIA attributes to reflect the new visual state
    sidebarRightToggle.setAttribute("aria-expanded", String(isOpen));
    sidebarRightToggle.setAttribute(
        "aria-label",
        isOpen ? "Hide secondary panel" : "Open secondary panel"
    );
}

// Bind the event listener if the toggle element exists
sidebarRightToggle?.addEventListener("click", toggleSidebarRight);
































/**
 * !Get HTMLElement
 * Helper to resolve an input to a DOM element.
 * Accepts either a query selector string or an existing HTMLElement.
 * @param {string|HTMLElement} input - The selector or element to resolve.
 * @returns {HTMLElement|null} The resolved element or null if not found.
 */
function getElement(input) {
    if (input instanceof HTMLElement) {
        return input;
    }
    if (typeof input === "string") {
        return document.querySelector(input);
    }
    return null;
}

/**
 * !Generic Toggle Utility
 * Generic utility to bind toggle behavior.
 * Synchronizes ARIA attributes on load and handles toggle events.
 *
 * @param {string|HTMLElement} triggerInput - CSS Selector or HTMLElement for the button.
 * @param {string|HTMLElement} targetInput - CSS Selector or HTMLElement for the content.
 * @param {string} activeClass - The CSS class that indicates the 'open' state.
 * @param {Object} labels - Configuration for accessibility text.
 * @param {string} labels.open - The aria-label text when closed.
 * @param {string} labels.close - The aria-label text when open.
 */
function setupToggle(triggerInput, targetInput, activeClass, labels) {
    const trigger = getElement(triggerInput);
    const target = getElement(targetInput);

    // Guard clause to ensure required elements exist
    if (!trigger || !target) return;

    /**
     * !Sync ARIA State
     * Internal helper to sync ARIA attributes with the current DOM state.
     * Checks the class list to determine if the element is effectively open.
     */
    const syncAriaState = () => {
        const isOpen = target.classList.contains(activeClass);

        trigger.setAttribute("aria-expanded", String(isOpen));
        trigger.setAttribute(
            "aria-label",
            isOpen ? labels?.close || "Close" : labels?.open || "Open"
        );
    };

    // Initialization: Run once immediately to handle server-rendered state
    syncAriaState();

    // Interaction: Bind the click event
    trigger.addEventListener("click", () => {
        target.classList.toggle(activeClass);
        syncAriaState();
    });
}

// --- Usage ---

// Example 1: Passing strings (selectors) directly
setupToggle(".triggerElement", ".targetElement", "activeClass", { open: "Open main navigation", close: "Close main navigation" });

// Example 2: Passing specific HTMLElements
const triggerElement = document.querySelector(".triggerElement");
const targetElement = document.querySelector(".targetElement");
setupToggle(triggerElement, targetElement, "activeClass", { open: "Open secondary panel", close: "Hide secondary panel" });
