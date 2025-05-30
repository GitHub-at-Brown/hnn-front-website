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

            popup.classList.add('show'); // show popup

            // Lock background scrolling without hiding the scrollbar
            // ------------------------------------------------------
            // 1) get current y position
            const scrollY = window.scrollY;
            // 2) offset the page by the current y position
            //
            //    this is necessary because the position of
            //    the body is reset when the position is
            //    changed to 'fixed', which will happen when
            //    the "lock-scroll" class is added below
            document.body.style.top = `-${scrollY}px`;
            //3) add "lock-scroll" class
            document.body.classList.add('lock-scroll');

            // Reset popup scroll
            const popupBox = popup.querySelector('.popup-box');
            if (popupBox) {
                popupBox.scrollTop = 0;
            }
        }
    });
});

// Close popup on close button click
document.querySelectorAll('.popup-close').forEach(button => {
    button.addEventListener('click', () => {
        const popupContainer = button.closest('.popup-container');
        if (popupContainer) {
            popupContainer.classList.remove('show'); // hide popup

            // Unlock background scrolling and restore y position
            // ------------------------------------------------------
            // 1) remove "lock-scroll" class
            document.body.classList.remove('lock-scroll');
            // 2) get the y position offset used in top and 
            //    invert its value
            //
            //    e.g., if the offset used above was -100px,
            //    this yields a const of 100px
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            // 3) clear the style.top offset
            document.body.style.top = '';
            // 4) scroll the page back to its previous position
            window.scrollTo(0, scrollY);
        }
    });
});

// Close popup on outside click
popups.forEach(popup => {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('show');

            // Unlock background scrolling and restore y position
            // ------------------------------------------------------
            // 1) remove "lock-scroll" class
            document.body.classList.remove('lock-scroll');
            // 2) get the y position offset used in top and 
            //    invert its value
            //
            //    e.g., if the offset used above was -100px,
            //    this yields a const of 100px
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            // 3) clear the style.top offset
            document.body.style.top = '';
            // 4) scroll the page back to its previous position
            window.scrollTo(0, scrollY);
        }
    });
});

// Adjust padding for scrollbar presence
function adjustRightSpaceIfNoScrollbar() {
    const hasVerticalScrollbar = window.innerWidth > document.documentElement.clientWidth;

    if (!hasVerticalScrollbar) {
        // add padding when scrollbar is not present
        // document.querySelector('.topbar').style.paddingRight = '15px';
        document.querySelector('#content-wrapper').style.paddingRight = '15px';
        document.querySelector('#content-wrapper').style.paddingLeft = '15px';
    } else {
        // remove extra padding when scrollbar is present
        // document.querySelector('.topbar').style.paddingRight = '';
        document.querySelector('#content-wrapper').style.paddingRight = '';
        document.querySelector('#content-wrapper').style.paddingLeft = '';
    }
}

// Run once on load
window.addEventListener('DOMContentLoaded', adjustRightSpaceIfNoScrollbar);
// Run on resize (in case scrollbar appears/disappears)
window.addEventListener('resize', adjustRightSpaceIfNoScrollbar);



// ----------------------- //
// --- Developer Table --- //
// ----------------------- //

// get GitHub images //
// ----------------- //
// Load images from repo, then GitHub profiles, then fallback to default
document.querySelectorAll('img[data-github]').forEach(img => {
    const user = img.getAttribute('data-github');
    const defaultURL = `https://raw.githubusercontent.com/jonescompneurolab/jones-website/refs/heads/master/images/developers/github_icon.png`;

    if (!user) {
        img.src = defaultURL;
        return;
    }

    const baseURL = `https://raw.githubusercontent.com/jonescompneurolab/jones-website/refs/heads/master/images/developers/`;
    const pngURL = `${baseURL}${user}.png`;
    const jpgURL = `${baseURL}${user}.jpg`;
    const jpegURL = `${baseURL}${user}.jpeg`;
    const githubURL = `https://github.com/${user}.png`;

    // Step 1: Try .png
    const testPNG = new Image();
    testPNG.onload = () => {
        img.src = pngURL;
    };
    testPNG.onerror = () => {
        // Step 2: Try .jpg
        const testJPG = new Image();
        testJPG.onload = () => {
            img.src = jpgURL;
        };
        testJPG.onerror = () => {
            // Step 3: Try .jpeg
            const testJPEG = new Image();
            testJPEG.onload = () => {
                img.src = jpegURL;
            };
            testJPEG.onerror = () => {
                // Step 4: Try GitHub
                const testGH = new Image();
                testGH.onload = () => {
                    img.src = githubURL;
                };
                testGH.onerror = () => {
                    // Step 5: Final fallback
                    img.src = defaultURL;
                };
                testGH.src = githubURL;
            };
            testJPEG.src = jpegURL;
        };
        testJPG.src = jpgURL;
    };
    testPNG.src = pngURL;
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

// ----------------------------------------
// Toggle between light and dark themes
// ----------------------------------------
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');

    // Ensure that the themeToggle element exists
    if (!themeToggle) {
        console.error('Could not find .theme-toggle');
        return;
    }

    const sunSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"></path>
        </svg>
    `;
    const moonSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
        </svg>
    `;

    // Check the saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        themeToggle.innerHTML = savedTheme === 'dark' ? moonSVG : sunSVG;
    } else {
        // Default to light theme if no saved preference
        themeToggle.innerHTML = sunSVG;
    }

    // Add click event to toggle theme
    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        themeToggle.innerHTML = isDarkMode ? moonSVG : sunSVG;
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });
});


