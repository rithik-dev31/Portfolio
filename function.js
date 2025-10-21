


document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navCenter = document.querySelector('.nav-center');
    const hamburger = document.querySelector('.hamburger');

  navToggle.addEventListener('click', () => {
    navCenter.classList.toggle('open');
    navToggle.classList.toggle('open');
        hamburger.classList.toggle('open');

  });
});


const header = document.querySelector("header");
const sections = document.querySelectorAll(".panel");

function updateHeaderColor() {
  let closestSectionIndex = -1;
  let closestDistance = Infinity;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top);

    if (distance < closestDistance && rect.top <= 5) { // only consider sections at or above viewport top + threshold
      closestDistance = distance;
      closestSectionIndex = index;
    }
  });

  if (closestSectionIndex === 1 || closestSectionIndex === 3) {
    gsap.to(header, { backgroundColor: "#09081e", duration: 0.2 });
  } else {
    gsap.to(header, { backgroundColor: "transparent", duration: 0.2 });
  }
}

window.addEventListener("scroll", updateHeaderColor);
window.addEventListener("load", updateHeaderColor);


window.addEventListener("load", () => {
  setTimeout(() => {
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    const textArray = [
      "Junior Full Stack Developer",
      "AI & Deep Learning Enthusiast",
      "Automation Builder"
    ];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 1200;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }

    function erase() {
      if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 200);
      }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);
  }, 1000); // delay to start typing after h1 animation
});

// animation for h1 on page load-----------end



// gsap animation for about me section
  gsap.registerPlugin(ScrollToPlugin);

// const header = document.querySelector("header"); // select your header

// const sections = document.querySelectorAll(".panel");
let targetIndex = 0;
let currentIndex = 0;
let isAnimating = false;




function goToSection(index) {
  if (index < 0) index = 0;
  if (index >= sections.length) index = sections.length - 1;
  targetIndex = index;

  if (isAnimating) return; // If animating, wait for current to finish

  isAnimating = true;

  gsap.to(window, {
    duration: 1,
    scrollTo: { y: sections[targetIndex], offsetY: 0 },
    ease: "power2.inOut",
    onComplete: () => {
      currentIndex = targetIndex;
      isAnimating = false;

      updateHeaderColorOnScroll();

     function updateHeaderColorOnScroll() {
  let visibleSectionIndex = -1;
  const scrollPosition = window.scrollY + window.innerHeight / 2; // middle of viewport

  sections.forEach((section, index) => {
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      visibleSectionIndex = index;
    }
  });

  if (visibleSectionIndex === 1 || visibleSectionIndex === 3) {
    gsap.to(header, { backgroundColor: "#09081e", duration: 0.2 });
  } else {
    gsap.to(header, { backgroundColor: "transparent", duration: 0.2 });
  }
}


window.addEventListener("scroll", updateHeaderColorOnScroll);

      // if (currentIndex === 1 || currentIndex===3) { // second section
      //   gsap.to(header, { backgroundColor: "#09081e", duration: 0.2 }); // new color
      // } else {
      //   header.style.backgroundColor = "transparent"; // original color
      // }
      // If targetIndex changed during animation, animate again
      if (targetIndex !== currentIndex) {
        goToSection(targetIndex);
      }
    }
  });
}

window.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (isAnimating) return; // Ignore scrolls while animating

  if (e.deltaY > 1) {
    targetIndex = Math.min(targetIndex + 1, sections.length - 1);
  } else if (e.deltaY < -1) {
    targetIndex = Math.max(targetIndex - 1, 0);
  }

  goToSection(targetIndex);

}, { passive: false });


// navigation----------------------------------------------

const navLinks = document.querySelectorAll('nav a'); // adjust selector for your nav links

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      if(targetSection==="aboutme"){
        gsap.to(header, { backgroundColor: "#09081e", duration: 0.2 }); // new color
        targetSection.scrollIntoView({ behavior: 'smooth' }); // native smooth scroll
      }
      else{
        targetSection.scrollIntoView({ behavior: 'smooth' }); // native smooth scroll
      }
    }
  });
});



// mobile navigation
const isMobile = () => window.innerWidth <= 768; // define mobile breakpoint (768px typical)

if (!isMobile()) {
  window.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (isAnimating) return;

    if (e.deltaY > 1) {
      targetIndex = Math.min(targetIndex + 1, sections.length - 1);
    } else if (e.deltaY < -1) {
      targetIndex = Math.max(targetIndex - 1, 0);
    }

    goToSection(targetIndex);

  }, { passive: false });
}







// animation for scrolling

// Make sure GSAP script is included in your page head or before this script:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
const slider = document.querySelector(".skills-slider");
const sliderWidth = slider.scrollWidth / 2; // since items are duplicated

// Animate horizontal scroll of skill list infinitely to the right
gsap.to(slider, {
  x: -sliderWidth,
  duration: 20,      // Adjust for scroll speed
  ease: "none",
  repeat: Infinity,
  modifiers: {
    x: gsap.utils.unitize(x => parseFloat(x) % sliderWidth)
  }
});




// gsap animtion for profle image


// GSAP Profile Animation
gsap.fromTo(".profile-pic", 
  { scale: 0, rotation: -180, opacity: 0 },
  { 
    scale: 1, 
    rotation: 0, 
    opacity: 1, 
    duration: 1.2, 
    delay: 0.5, 
    ease: "back.out(1.7)" 
  }
);

// Floating animation for profile
gsap.to(".profile-pic", {
  y: -15,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// Mouse parallax effect
document.addEventListener("mousemove", (e) => {
  const pic = document.querySelector(".profile-pic");
  const shapes = document.querySelectorAll(".shape");
  
  const x = (window.innerWidth / 2 - e.pageX) / 50;
  const y = (window.innerHeight / 2 - e.pageY) / 50;
  
  gsap.to(pic, { 
    x: x, 
    y: y, 
    duration: 0.6,
    ease: "power1.out"
  });
  
  shapes.forEach((shape, index) => {
    gsap.to(shape, {
      x: x * (index + 1) * 0.3,
      y: y * (index + 1) * 0.3,
      duration: 0.8,
      ease: "power1.out"
    });
  });
});




// animation for section 2
document.addEventListener("DOMContentLoaded", () => {
  const animateDivs = document.querySelectorAll(".container");
  const timeline = document.querySelector(".timeline");
  
  if (!animateDivs.length || !timeline) return;
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      
      if (entry.isIntersecting && entry.target && entry.target.classList) {
        // Animate individual containers
        header.style.backgroundColor=" #09081e"
        if (entry.target.classList.contains("container")) {
          entry.target.classList.add("ani-c");
          observer.unobserve(entry.target);
        }

        // Animate timeline line
        if (entry.target.classList.contains("timeline")) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      }
    });
  }, { threshold: 0.3 });
  
  animateDivs.forEach(el => observer.observe(el));
  observer.observe(timeline);
});



// adding header to colour section


document.addEventListener("DOMContentLoaded", () => {
  const skills = document.getElementById("projects");
  
  
  // if (!animateDivs.length || !timeline) return;
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
                 

      if (entry.isIntersecting && entry.target && entry.target.classList) {
        // Animate individual containers
        header.style.backgroundColor=" #09081e"
        // console.log("hello")

      
      }
    });
  }, { threshold: 0.3 });
  
  
  observer.observe(skills);
});


// Project modal logic
window.addEventListener('DOMContentLoaded', () => {
  const projectItems = document.querySelectorAll('.project-item');
  const modalBackdrop = document.getElementById('projectModalBackdrop');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalPreviewBtn = document.getElementById('modalPreviewBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.querySelector('.projects-grid');
  const filterDropdown = document.getElementById('filterDropdown');

  // Safety check for modal elements
  if (!modalBackdrop || !modalImg || !modalTitle || !modalDesc || !modalPreviewBtn || !closeModalBtn) {
    console.error('Modal elements missing from the DOM');
    return;
  }

  // Open modal on project card click
  projectItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.project-info h3').textContent;
      const desc = item.querySelector('.description').textContent;
      const previewUrl = item.getAttribute('data-preview') || '';

      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      if (previewUrl && previewUrl !== '#') {
        modalPreviewBtn.href = previewUrl;
        modalPreviewBtn.style.pointerEvents = 'auto';
        modalPreviewBtn.style.opacity = '1';
      } else {
        modalPreviewBtn.removeAttribute('href');
        modalPreviewBtn.style.pointerEvents = 'none';
        modalPreviewBtn.style.display = 'none';
      }

      modalBackdrop.style.display = "flex";
      document.body.style.overflow = "hidden"; // prevent background scroll
    });
  });

  // Close modal events
  closeModalBtn.addEventListener('click', () => {
    modalBackdrop.style.display = "none";
    document.body.style.overflow = "";
  });

  modalBackdrop.addEventListener('click', e => {
    if (e.target === modalBackdrop) {
      modalBackdrop.style.display = "none";
      document.body.style.overflow = "";
    }
  });

  // Adjust grid size if exactly two visible items
 function adjustGridSize() {
  if (!projectsGrid) return;
  const visibleItems = Array.from(projectItems).filter(p => p.style.display !== 'none');
  const screenWidth = window.innerWidth;

  // Apply two-items class ONLY when exactly 2 visible AND screen wider than 600px
  if (visibleItems.length === 2 && screenWidth > 600) {
    projectsGrid.classList.add('two-items');
  } else {
    projectsGrid.classList.remove('two-items');
  }
}

  // Function to filter projects (used by buttons and dropdown)
  function filterProjects(filter) {
    let visibleCount = 0;
    projectItems.forEach(p => {
      const match = filter === 'all' || p.classList.contains(filter);
      p.style.display = match ? '' : 'none';
      p.classList.remove('single');
      if (match) visibleCount++;
    });

    // Expand if only one project visible
    projectsGrid.classList.toggle('single', visibleCount === 1);
    projectItems.forEach(p => {
      if (visibleCount === 1 && p.style.display !== 'none') p.classList.add('single');
    });

    adjustGridSize();

    // Animate visible projects
    let delay = 0;
    projectItems.forEach(p => {
      if (p.style.display !== 'none') {
        p.classList.remove('show');
        setTimeout(() => p.classList.add('show'), delay);
        delay += 100;
      } else {
        p.classList.remove('show');
      }
    });
  }

  // Filter buttons event listeners + sync dropdown
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (filterDropdown) filterDropdown.value = btn.getAttribute('data-filter');

      filterProjects(btn.getAttribute('data-filter'));
    });
  });

  // Dropdown change event listener + clear buttons active
  if (filterDropdown) {
    filterDropdown.addEventListener('change', e => {
      filterButtons.forEach(b => b.classList.remove('active'));
      filterProjects(e.target.value);
    });
  }

  // Animate all projects on load
  let delay = 0;
  projectItems.forEach(p => {
    setTimeout(() => p.classList.add('show'), delay);
    delay += 100;
  });
});


// window.addEventListener('load', updateHeaderColorOnScroll);
