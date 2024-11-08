// Add this at the beginning of your script.js
document.addEventListener("DOMContentLoaded", function () {
    // Load navbar
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            // Update active state based on current page
            const currentPage =
                window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll(".nav-link");

            navLinks.forEach((link) => {
                const href = link.getAttribute("href").split("#")[0]; // Remove hash part
                if (href === currentPage) {
                    link.classList.add("active");
                }
            });
        });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        // Handle mobile menu
        const offcanvas = document.querySelector(".offcanvas");

        // Check if we're in mobile view (offcanvas is visible)
        const isMobileView = window.innerWidth < 992; // Bootstrap's lg breakpoint

        if (isMobileView && offcanvas) {
            const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
            if (bsOffcanvas) {
                // Wait for offcanvas to finish hiding before scrolling
                offcanvas.addEventListener(
                    "hidden.bs.offcanvas",
                    function () {
                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    },
                    { once: true }
                );
                bsOffcanvas.hide();
            }
        } else {
            // If in desktop view or no offcanvas, scroll immediately
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Scroll animation for elements
const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with scroll-fade class
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".scroll-fade").forEach((element) => {
        observer.observe(element);
    });
});

// Update active nav link based on scroll position
const sections = document.querySelectorAll("section, #home");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 100) {
            // 100px offset for better UX
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

// Add scroll event listener
window.addEventListener("scroll", updateActiveLink);

// Initial call to set active link on page load
updateActiveLink();

// Add this after your existing code
const facilityData = [
    {
        id: "staffModal",
        image: "assets/images/Friendly-Staff.jpg",
        title: "Our Friendly Team",
        description: "Click to learn more about our team",
        modalTitle: "Our Friendly Team",
        modalContent: `
            <h6>Meet Our Team</h6>
            <p>Our friendly dentists and staff members are here to serve you:</p>
            <ul>
                <li><strong>Top Row (From Left to Right):</strong> Dr. Chris, Dr. Mag and Ina</li>
                <li><strong>Bottom Row (From Left to Right):</strong> Alina, Cyl and Jong</li>
            </ul>
        `,
    },
    {
        id: "waitingRoomModal",
        image: "assets/images/Waiting-Room.jpg",
        title: "Waiting Room",
        description: "Click to see more details",
        modalTitle: "Waiting Room",
        modalContent:
            "Our tastefully decorated waiting room provides a comfortable environment for our patients. We provide indoor slippers for better hygiene - all patients' footwear is kept outside the clinic premise.",
    },
    {
        id: "tvAreaModal",
        image: "assets/images/TV-area.jpg",
        title: "TV Area",
        description: "Click to see more details",
        modalTitle: "TV Area",
        modalContent:
            "Our TV area is designed to help patients relax while waiting. We provide a comfortable seating area with entertainment to make your wait more enjoyable. The TV is equipped with various channels to suit different preferences.",
    },
    {
        id: "kidsCornerModal",
        image: "assets/images/Kids-corner.jpg",
        title: "Kids Corner",
        description: "Click to see more details",
        modalTitle: "Kids Corner",
        modalContent:
            "Our specially designed kids corner provides a fun and welcoming environment for our young patients. It features toys, books, and activities to keep children entertained and help reduce any anxiety before their dental appointment.",
    },
    {
        id: "surgeryModal",
        image: "assets/images/surgery-1.jpg",
        title: "Treatment Rooms",
        description: "Click to see our surgery facilities",
        modalTitle: "Treatment Rooms",
        modalContent: `
            <div class="row mb-3">
                <div class="col-md-6 mb-3">
                    <img src="assets/images/surgery-1.jpg" class="img-fluid rounded" alt="Surgery Room 1" style="width: 100%; height: 400px; object-fit: cover;">
                </div>
                <div class="col-md-6 mb-3">
                    <img src="assets/images/Surgery-2.jpg" class="img-fluid rounded" alt="Surgery Room 2" style="width: 100%; height: 400px; object-fit: cover;">
                </div>
            </div>
            <p>There are two treatment rooms/surgeries in our practice. Each has a Belmont dental chair with clean water system using Reverse Osmosis (RO) water attached. The second surgery has a wall mounted Gendex intra oral Xray unit. This surgery is enclosed by a 6 inches thick brick wall and lead proof doors and frames to prevent others who are outside from being exposed to radiation.</p>
        `,
    },
    {
        id: "cbctModal",
        image: "assets/images/CBCT.jpg",
        title: "CBCT X-Ray Unit",
        description: "Click to learn about our imaging technology",
        modalTitle: "CBCT X-Ray Unit",
        modalContent: `
            <p>There is a VaTech PaxFlex 3D Xray unit in the Xray Room cum Office. It is enclosed by a 10 inches brick wall with its door and frame lead lined for prevention of radiation exposure.</p>
        `,
    },
    {
        id: "sterilisationModal",
        image: "assets/images/sterilisation-R.jpg",
        title: "Sterilisation Room",
        description: "Click to see our sterilisation facilities",
        modalTitle: "Sterilisation Room",
        modalContent: `
            <p>The Sterilisation Room is equipped with two autoclaves:</p>
            <ul>
                <li>Steriline B (B class autoclave)</li>
                <li>Statim (S class autoclave)</li>
                <li>Ultrasonic bath</li>
                <li>Water Wise water distiller</li>
            </ul>
        `,
    },
];

// Function to generate carousel items and modals
function initializeFacilities() {
    const carouselInner = document.querySelector(
        "#facilitiesCarousel .carousel-inner"
    );
    const modalContainer = document.body;
    const isMobile = window.innerWidth < 768;
    const itemsPerSlide = isMobile ? 1 : 3;

    // Clear existing content
    carouselInner.innerHTML = "";

    // Remove existing modals
    document
        .querySelectorAll(".facility-modal")
        .forEach((modal) => modal.remove());

    // Generate carousel items and modals
    facilityData.forEach((facility, index) => {
        const carouselItem = document.createElement("div");
        carouselItem.className = `carousel-item${index === 0 ? " active" : ""}`;

        const row = document.createElement("div");
        row.className = "row g-3";

        if (isMobile) {
            // Mobile view - one item per slide
            const col = document.createElement("div");
            col.className = "col-12";
            col.innerHTML = `
                <div class="position-relative facility-image" role="button" data-bs-toggle="modal" data-bs-target="#${facility.id}">
                    <img src="${facility.image}" class="d-block w-100 rounded-3" alt="${facility.title}">
                    <div class="position-absolute bottom-0 start-0 end-0 p-3 text-white bg-dark bg-opacity-50 rounded-bottom-3">
                        <h6 class="mb-1">${facility.title}</h6>
                        <p class="small mb-0">${facility.description}</p>
                    </div>
                </div>
            `;
            row.appendChild(col);
        } else {
            // Desktop view - three items per slide
            for (let i = 0; i < itemsPerSlide; i++) {
                const facilityIndex =
                    (index * itemsPerSlide + i) % facilityData.length;
                const currentFacility = facilityData[facilityIndex];
                const col = document.createElement("div");
                col.className = "col-12 col-md-4";
                col.innerHTML = `
                    <div class="position-relative facility-image" role="button" data-bs-toggle="modal" data-bs-target="#${currentFacility.id}">
                        <img src="${currentFacility.image}" class="d-block w-100 rounded-3" alt="${currentFacility.title}">
                        <div class="position-absolute bottom-0 start-0 end-0 p-3 text-white bg-dark bg-opacity-50 rounded-bottom-3">
                            <h6 class="mb-1">${currentFacility.title}</h6>
                            <p class="small mb-0">${currentFacility.description}</p>
                        </div>
                    </div>
                `;
                row.appendChild(col);
            }
        }

        carouselItem.appendChild(row);
        carouselInner.appendChild(carouselItem);

        // Create modal with facility-modal class
        const modal = document.createElement("div");
        modal.className = "modal fade facility-modal";
        modal.id = facility.id;
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("aria-hidden", "true");

        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title">${facility.modalTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${
                            facility.id === "surgeryModal"
                                ? `<div>${facility.modalContent}</div>`
                                : `<img src="${facility.image}" class="img-fluid rounded-3 mb-3 w-100" alt="${facility.title}">
                               <div>${facility.modalContent}</div>`
                        }
                    </div>
                </div>
            </div>
        `;

        modalContainer.appendChild(modal);
    });

    // Initialize all modals
    document.querySelectorAll(".facility-modal").forEach((modalEl) => {
        new bootstrap.Modal(modalEl);
    });
}

// Initialize facilities when DOM is loaded and handle resize
document.addEventListener("DOMContentLoaded", () => {
    initializeFacilities();

    // Reinitialize on window resize
    window.addEventListener("resize", () => {
        initializeFacilities();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Initialize scroll animations for service items
    const serviceItems = document.querySelectorAll(
        ".service-category .col-md-6"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    serviceItems.forEach((item) => {
        observer.observe(item);
    });
});

// Add this after your existing code
document.addEventListener("DOMContentLoaded", function () {
    // Function to toggle navbar shadow
    function toggleNavbarShadow() {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 0) {
            navbar.classList.add("navbar-shadow");
        } else {
            navbar.classList.remove("navbar-shadow");
        }
    }

    // Add scroll event listener
    window.addEventListener("scroll", toggleNavbarShadow);

    // Initial check for page load
    toggleNavbarShadow();
});

// Refined scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    // Only run on home page and desktop devices (width > 768px)
    if (!document.body.classList.contains('home-page') || window.innerWidth <= 768) return;

    const sections = document.querySelectorAll('#home, section');
    let isScrolling = false;
    let currentSection = 0;
    let lastScrollTime = Date.now();
    const scrollCooldown = 800;

    // Get current section index
    const getCurrentSection = () => {
        let current = 0;
        let minDistance = Infinity;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
                minDistance = distance;
                current = index;
            }
        });
        return current;
    };

    // Smooth scroll to section
    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length && !isScrolling) {
            isScrolling = true;
            sections[index].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }
    };

    // Wheel event handler with improved detection
    window.addEventListener('wheel', (e) => {
        e.preventDefault();

        const now = Date.now();
        if (now - lastScrollTime < scrollCooldown || isScrolling) return;

        currentSection = getCurrentSection();
        
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
            // Scroll down
            scrollToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
            // Scroll up
            scrollToSection(currentSection - 1);
        }
        
        lastScrollTime = now;
    }, { passive: false });
});

// Simplified Review Carousel
document.addEventListener('DOMContentLoaded', function() {
    const reviews = document.querySelectorAll('.review');
    const progressBar = document.querySelector('.review-progress-bar');
    let currentReview = 0;
    const intervalTime = 5000; // 5 seconds
    
    function showNextReview() {
        reviews[currentReview].classList.remove('active');
        currentReview = (currentReview + 1) % reviews.length;
        reviews[currentReview].classList.add('active');
        
        // Reset and start progress bar
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        
        // Force reflow
        progressBar.offsetHeight;
        
        progressBar.style.transition = `width ${intervalTime}ms linear`;
        progressBar.style.width = '100%';
    }

    // Initial progress bar
    progressBar.style.transition = `width ${intervalTime}ms linear`;
    progressBar.style.width = '100%';
    
    // Set interval for review changes
    setInterval(showNextReview, intervalTime);
});
