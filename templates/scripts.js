// ----------------------- //
// ---- Dropdown Menu ---- //
// ----------------------- //

// E.g.: if open, close it; if closed, open it
function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.style.display =
        dropdownContent.style.display === 'block' ? 'none' : 'block';
}

// Toggle the dropdown when clicking the dropdownButton
document.addEventListener('DOMContentLoaded', () => {
    document
        .getElementById('dropdownButton')
        .addEventListener('click', event => {
            // stopPropagation ensures the button click only toggles the 
            // dropdown and doesn’t also trigger the outside-click handler 
            // that would close it.
            event.stopPropagation();
            toggleDropdown();
        });
});

// Close the dropdown if clicking anywhere outside the dropdown
window.addEventListener('click', event => {
    if (!event.target.closest('.dropdown')) {
        document.querySelector('.dropdown-content').style.display = 'none';
    }
});

// -------------------- //
// --- Mobile Menu --- //
// -------------------- //

// Function to toggle mobile menu
// ------------------------------
function toggleMobileMenu() {
    const menu = document.getElementById("mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    const isVisible = menu.style.display === "flex";

    menu.style.display = isVisible ? "none" : "flex";
    hamburger.classList.toggle("menu-open", !isVisible);
}

// Close the menu if clicking anywhere 
// outside of the menu or hamburger
// ------------------------------
document.addEventListener("click", function(event) {
    const menu = document.getElementById("mobile-menu");
    const hamburger = document.querySelector(".hamburger");
    
    // Check if the click is outside of the hamburger and menu
    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.style.display = "none";
        hamburger.classList.remove("menu-open");
    }
});

// Close the menu on window resize 
// ------------------------------
// Note: triggered if the width is greater than 650px

window.addEventListener("resize", function() {
    if (window.innerWidth > 650) {
        const menu = document.getElementById("mobile-menu");
        menu.style.display = "none"; // Close the menu if resizing above 650px
    }
});

// Enable topbar to scroll with page
// ------------------------------
window.addEventListener('scroll', () => {
    const scrollX = window.scrollX;
    document.querySelector('.topbar').style.transform = `translateX(${-scrollX}px)`;
});

// ------------------- //
// --- Card Popups --- //
// ------------------- //
const cards = document.querySelectorAll('.card');
const popups = document.querySelectorAll('.popup-container');

// Show popup on card click
cards.forEach(card => {
    card.addEventListener('click', () => {
        const popupId = card.getAttribute('data-popup');
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add('show'); // add 'show' class to display the popup
            document.body.style.overflow = 'hidden'; // disable body scrolling

            // Reset scroll position when the popup is opened
            const popupBox = popup.querySelector('.popup-box');
            if (popupBox) {
                popupBox.scrollTop = 0; // Set scroll position to the top
            }
        }
    });
});

// Close popup on close button click
document.querySelectorAll('.popup-close').forEach(button => {
    button.addEventListener('click', () => {
        const popupContainer = button.closest('.popup-container');
        if (popupContainer) {
            popupContainer.classList.remove('show'); // Remove 'show' class to hide the popup
            document.body.style.overflow = ''; // Re-enable body scrolling
        }
    });
});

// Close popup on outside click
popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) { // Check if the click is outside the popup content
            popup.classList.remove('show'); // Remove 'show' class to hide the popup
            document.body.style.overflow = ''; // Re-enable body scrolling
        }
    });
});

// ----------------------- //
// --- Developer Table --- //
// ----------------------- //

// get GitHub images //
// ----------------- //
// Load images from repo, fallback to GitHub if not found
document.querySelectorAll('img[data-github]').forEach(img => {
    const user = img.getAttribute('data-github');
    if (!user) {
        img.src = 'default.png'; // fallback image
        return;
    }

    const repoURL = `https://raw.githubusercontent.com/jonescompneurolab/jones-website/refs/heads/master/images/developers/${user}.png`;
    const githubURL = `https://github.com/${user}.png`;

    const testImage = new Image();
    testImage.onload = () => {
        img.src = repoURL;
    };
    testImage.onerror = () => {
        img.src = githubURL;
    };
    testImage.src = repoURL;
});

// image tooltips for additional contributors
document.querySelectorAll('.dev-grid.additional img[data-github]').forEach(img => {
    img.addEventListener('mouseenter', () => {
        const altText = img.alt; // Get alt text of the image
        if (!altText) return; // No alt text, no tooltip
        
        // Create the tooltip div
        const tooltip = document.createElement('div');
        tooltip.classList.add('name-tooltip');
        tooltip.innerText = altText; // Set the tooltip text to the alt text
        document.body.appendChild(tooltip);
        
        // Position the tooltip
        const rect = img.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 4}px`; // Small gap below the image
        
        // Fade in the tooltip
        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
        });
        
        // Hide tooltip when mouse leaves
        img.addEventListener('mouseleave', () => {
            tooltip.remove();
        });
    });
});


// Set section width //
// ----------------- //
window.addEventListener("load", () => {
    const activeCards = document.querySelectorAll(".dev-grid:not(.inactive) .dev-card");

    activeCards.forEach(card => {
        const name = card.querySelector('.name');
        const image = card.querySelector('img');

        const imageWidth = image.offsetWidth;
        const nameScrollWidth = name.scrollWidth;
        const baseWidth = Math.max(imageWidth, 0); // fallback in case

        if (nameScrollWidth > baseWidth) {
            // Name is wider than image → expand card
            card.style.width = `${nameScrollWidth + 20}px`;
        } else {
            // Otherwise match image width (plus padding if you want)
            card.style.width = `${imageWidth + 20}px`;
        }
    });
});

// Tooltips for names and positions //
// --------------------------------- //
document.querySelectorAll('.dev-card .name, .dev-card .position').forEach(textElement => {
    const originalText = textElement.textContent;  // Store the original text
    const checkOverflow = () => {
        // Check if the text is overflowing
        const isOverflowing = textElement.scrollWidth > textElement.clientWidth;

        if (isOverflowing && !textElement.querySelector('a')) {
            // Create the anchor tag when the text overflows
            const anchor = document.createElement('a');
            anchor.setAttribute('href', 'javascript:void(0)');
            anchor.setAttribute('tabindex', '-1');
            anchor.setAttribute('name-tooltip', originalText);
            anchor.textContent = originalText;
            textElement.innerHTML = '';  // Clear the text element
            textElement.appendChild(anchor);
        } else if (!isOverflowing && textElement.querySelector('a')) {
            // Remove the anchor tag if the text is no longer overflowing
            textElement.innerHTML = originalText;  // Restore original text
        }
    };

    // Check overflow initially and on window resize
    window.addEventListener('load', checkOverflow);
    window.addEventListener('resize', checkOverflow);
});

(() => {
    let tooltipVisible = false;

    // Delegate hover events
    document.addEventListener('mouseenter', (e) => {
        const link = e.target.closest('.dev-card .name a[name-tooltip], .dev-card .position a[name-tooltip]');
        if (!link) return;
        if (tooltipVisible) return;

        link._tt = setTimeout(() => {
            document.querySelectorAll('.name-tooltip').forEach(t => t.remove());

            const tip = document.createElement('div');
            tip.className = 'name-tooltip';
            tip.innerText = link.getAttribute('name-tooltip');
            document.body.appendChild(tip);

            const r = link.getBoundingClientRect();
            tip.style.position = 'absolute';
            tip.style.left = `${r.left + window.scrollX}px`;
            tip.style.top = `${r.bottom + window.scrollY + 4}px`;

            requestAnimationFrame(() => { tip.style.opacity = '1'; });
            tooltipVisible = true;
        }, 300);  // 300ms delay
    }, true);

    document.addEventListener('mouseleave', (e) => {
        const link = e.target.closest('.dev-card .name a[name-tooltip], .dev-card .position a[name-tooltip]');
        if (!link) return;

        clearTimeout(link._tt);
        document.querySelectorAll('.name-tooltip').forEach(t => t.remove());
        tooltipVisible = false;
    }, true);
})();
