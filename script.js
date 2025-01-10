document.addEventListener("DOMContentLoaded", function () {
    // Load navbar
    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("navbar-placeholder").innerHTML = data;

            // Initialize mobile navigation AFTER navbar is loaded
            initializeMobileNav();

            // Update active state based on current page
            const currentPage =
                window.location.pathname.split("/").pop() || "index.html";
            const navLinks = document.querySelectorAll(".nav-link");

            navLinks.forEach((link) => {
                const href = link.getAttribute("href");
                // Add this check to prevent errors with links that don't have href
                if (href) {
                    const hrefPath = href.split("#")[0]; // Remove hash part
                    if (hrefPath === currentPage) {
                        link.classList.add("active");
                    }
                }
            });
        });

    // Move mobile nav initialization to a separate function
    function initializeMobileNav() {
        const hamburgerInput = document.querySelector("#hamburger-input");
        const mobileNav = document.querySelector(".mobile-nav");

        if (hamburgerInput && mobileNav) {
            console.log("Mobile nav elements found"); // Debug log

            hamburgerInput.addEventListener("change", function (e) {
                console.log("Hamburger clicked, checked:", this.checked); // Debug log
                if (this.checked) {
                    mobileNav.classList.add("active");
                    document.body.style.overflow = "hidden";
                } else {
                    mobileNav.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });

            // Close menu when clicking links
            const mobileNavLinks = document.querySelectorAll(
                ".mobile-nav-links a"
            );
            mobileNavLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    hamburgerInput.checked = false;
                    mobileNav.classList.remove("active");
                    document.body.style.overflow = "";
                });
            });
        } else {
            console.log("Mobile nav elements not found"); // Debug log
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
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

    // Check if carousel exists before proceeding
    if (!carouselInner) return; // Exit if carousel doesn't exist on this page

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

// Initialize facilities only if needed
document.addEventListener("DOMContentLoaded", () => {
    const hasFacilities = document.querySelector("#facilitiesCarousel");
    if (hasFacilities) {
        initializeFacilities();

        // Reinitialize on window resize only if facilities exist
        window.addEventListener("resize", () => {
            initializeFacilities();
        });
    }
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
        if (!navbar) return; // Exit if navbar doesn't exist

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

// Add this after your existing DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
    // Intersection Observer for fade-in animations
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

    // Observe all elements with team-fade class
    document.querySelectorAll(".team-fade").forEach((element) => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const testimonialData = {
        1: {
            name: 'Charlyn Ngu',
            type: 'Parent',
            text: '"Great experience for the kids. Dentist & Assistant are very patient with children. Make sure children understand the tools & let them touch & try it before starting any procedures. Great job!"',
            date: '19 Nov 2023',
            image: 'assets/images/charlyn.png'
        },
        2: {
            name: 'Joel Lai',
            type: 'Long-term Patient',
            text: '"In 2010, I had a tooth accident which saw the uproot of my top front Incisor (tooth came out, root and all). Dr Christina helped plant it back, providing guidance on the potential outcomes of a replanted dead tooth - especially decolorization (tooth goes black over time). Over the course of time being overseas, I had decreasingly consistent check-ups whenever I came home to visit, and recently I also had another accident to the tooth which saw it getting chipped in the lower corner. Coming back after the Pandemic, Dr Christina helped repair the tooth and helped whiten the tooth to match the others. This has helped regain the confidence to smile wholeheartedly again. Thanks, Dr Christina!"',
            date: '8 Feb 2023',
            image: 'assets/images/joel.png'
        },
        3: {
            name: 'Grace Sanchez',
            type: 'Orthodontic Patient',
            text: '"Last month, thanks God my whole program with my braces done, I\'m glad for my best dental doctor did her best to restore even my broken tooth into nice and bring me with a nice smile. I\'m also amaze with the nice and comfortable new clear retainer. Thank you doctor Cristina May the Almighty Father bless you more and give more happy smile to others."',
            date: '24 Nov 2023',
            image: 'assets/images/grace.png'
        },
        4: {
            name: 'Daniel Van Laeken',
            type: 'Local Guide',
            text: '"Professional friendly care. Compassionate follow-up. Very satisfying 👍"',
            date: '7 weeks ago',
            image: 'assets/images/daniel.png'
        },
        5: {
            name: 'Frances Gregory',
            type: 'International Patient',
            text: '"I\'m from USA. She is very kind very caring. Details and making sure everything is done correctly. Very patience. As a woman who fear dentist and pain. She and all her adorable staffs make us very comfortable. I would definitely recommended her to anybody from USA that going to Sarawak to her."',
            date: '47 weeks ago',
            image: 'assets/images/frances.png'
        },
        6: {
            name: 'Simon Heeringa (Skylit)',
            type: 'International Patient',
            text: '"Dr Christina was very knowledgeable and helpful around interventions with my teeth. She was efficient and cost effective. I would definitely come back again. I come from New Zealand and her practice is on par with the west for sure. Thanks!"',
            date: '4 weeks ago',
            image: 'assets/images/simon.png'
        },
        7: {
            name: 'Lai Ah Huat',
            type: 'Periodontal Patient',
            text: '"As the saying goes, long pain is worse than short pain, or short pain is better than long pain. After struggling for a long time, i finally made up my mind to summon the courage to treat my periodontal disease. The treatment process is divided into several stages. Inevitably, the gums are loose, swollen and bleeding teeth which must be removed without any suspense in order to reduce the soreness of the clenching force of the teeth. Fortunately, through the introduction of relatives, Dr. Christina and her team came to the meeting. Feel their professional service and friendly attitude. After several treatment, my periodontal symptoms have improved a lot and i can chew meat such as pork and beef. Thanks again Dr. Christina and her professional service provided by the team."',
            date: '9 Nov 2022',
            image: 'assets/images/lai.png'
        },
        8: {
            name: 'Teo Chung',
            type: 'Implant Patient',
            text: '"Within this 2 years of heartwarming experience with Dr Christina on my treatment for a crown, bridge and 4 implants. These treatment took me approximately 2 years to complete where Dr Christina has provide me with her professional skills and advise along the way. All staffs are kind and helpful. Highly recommended!!"',
            date: '4 Oct 2023',
            image: 'assets/images/teo.png'
        },
        9: {
            name: 'Michael Tsw',
            type: 'International Patient',
            text: '"I booked my dental appointment from Perth. I am very impressed with the level of communication from the initial booking of the appointment through to follow up after the dental procedure. It\'s excellent. Dr Christina run a very professional dental surgery. She is very pleasant and friendly and is an experienced dentist. She provided good advice Re dental implants. Thank you so much."',
            date: '14 weeks ago',
            image: 'assets/images/michael.png'
        },
        10: {
            name: 'Liew Kiufoo',
            type: 'Implant Patient',
            text: '"Exceptional experience with tooth implants. The procedure was virtually painless but took long time, and the results are remarkable. My new implants look and feel natural, enhancing both my smile and confidence. I highly recommend this solution to anyone seeking a long-term, reliable fix for missing teeth. Five stars!"',
            date: '47 weeks ago',
            image: 'assets/images/liew.png'
        },
        11: {
            name: 'Giovanni Gandolfi',
            type: 'International Patient',
            text: '"I am an Italian and recently being treated by Dr Christina in Kuching where I have being living for 6 years. The treatment I underwent consisted in 5 upside implants and 6 crowns. After 2 years all the implants are showing a perfect performance and never received any complications."',
            date: '27 Nov 2021',
            image: 'assets/images/giovanni.png'
        },
        12: {
            name: 'Charles Rake',
            type: 'Long-term Patient',
            text: '"Dr Christina is the most pleasant/most experienced dentist in Kuching. My wife and I have both been Dr. Christina\'s patients for more than 15 years and we are extremely satisfied. All dental work performed by Dr Christina always feels very polished, comfortable, and nicely sculpted. I\'ve had several procedures performed by Dr. Christina including dental implants, root canals, crowns, a bridge, numerous fillings, dentures, and many creative tooth saving processes. I\'m extremely happy with the final results of each and every procedure. At age 72, I feel very fortunate to have teeth which permit me to comfortably eat nearly every kind of food I wish. This has only been possible due to Dr. Christina\'s determined efforts and skills. While being able to enjoy food is important, so is personal appearance."',
            date: '18 weeks ago',
            image: 'assets/images/charles.png'
        }
    };

    // Function to update testimonial content
    function updateTestimonial(patientId) {
        const data = testimonialData[patientId];
        document.getElementById('testimonialText').textContent = data.text;
        document.getElementById('testimonialName').textContent = data.name;
        document.getElementById('testimonialType').textContent = data.type;
        
        // Add date if it exists
        const dateElement = document.getElementById('testimonialDate');
        if (dateElement) {
            dateElement.textContent = data.date;
        }
    }

    // Add click event listeners to pills
    const pills = document.querySelectorAll('.testimonial-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Remove active class from all pills
            pills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            this.classList.add('active');
            // Update testimonial content
            const patientId = this.getAttribute('data-patient-id');
            updateTestimonial(patientId);
        });
    });

    // Initialize with first testimonial and ensure first pill is active
    const firstPill = document.querySelector('.testimonial-pill');
    if (firstPill) {
        firstPill.classList.add('active');
        updateTestimonial(1);
    }
});

// Alternative approach with dynamic scroll amount
document.addEventListener('wheel', function(e) {
    const baseScrollAmount = 30; // Reduced base amount for smoother scrolling
    const scrollMultiplier = 0.3; // Reduced multiplier for more control
    
    const scrollAmount = baseScrollAmount * Math.sign(e.deltaY);
    
    window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth'
    });
});
