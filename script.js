// ===== Mobile navigation =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// ===== Current year in the footer =====
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

// ===== Typing animation =====
// Change these phrases to match your interests and goals.
const typedRole = document.querySelector("#typed-role");
const roles = ["CA Student", "Creative Learner", "Future Developer", "Curious Problem-Solver"];
let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeNextRole() {
  if (!typedRole) return;

  const currentRole = roles[roleIndex];
  typedRole.textContent = currentRole.slice(0, characterIndex);

  if (!deleting && characterIndex < currentRole.length) {
    characterIndex++;
    setTimeout(typeNextRole, 90);
  } else if (!deleting && characterIndex === currentRole.length) {
    deleting = true;
    setTimeout(typeNextRole, 1300);
  } else if (deleting && characterIndex > 0) {
    characterIndex--;
    setTimeout(typeNextRole, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeNextRole, 250);
  }
}
if (typedRole) {
  typedRole.textContent = "";
  typeNextRole();
}

// ===== Résumé button reminder =====
// Replace the placeholder email in index.html with your real email address.
const emailLink = document.querySelector("#email-link");
if (emailLink && emailLink.getAttribute("href") === "mailto:your.email@example.com") {
  emailLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Please replace your.email@example.com with your own email address in index.html.");
  });
}

// ===== Project category filters =====
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card[data-category]');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

// ===== Project detail pop-ups =====
const projectDetails = [
  {title:'B.B.S. — Barangay Blotter System',meta:'Computer Programming 2 · SY 2022–2023, Semester 2',description:'A software project designed to digitize and streamline the barangay blotter and complaint process.',highlights:['Organized complaint records for easier storage and retrieval.','Planned automated generation of complaint documents.','Included a way to identify repeated complaint attempts by the same individuals.']},
  {title:'Power Supply',meta:'Fundamentals of Computer Applications 2 · SY 2022–2023, Semester 2',description:'An electronics project focused on building a stable AC-to-DC power supply.',highlights:['Used a transformer, capacitors, and voltage regulators.','Assembled and troubleshot circuits.','Focused on providing a consistent output.']},
  {title:'Amplitude-Modulated Radio Transmitter',meta:'Advanced Computer Circuits · SY 2023–2024, Semester 1',description:'A functional AM radio transmitter designed for short-range audio transmission.',highlights:['Applied analog circuit design.','Explored signal processing and modulation techniques.','Built practical experience with transmitter circuits.']},
  {title:'Integrated Security and Monitoring System for Sikyop',meta:'Programming for Internet of Things · SY 2024–2025, Semester 1',description:'An environmental monitoring prototype intended to support tourism management decisions.',highlights:['Used water-level, raindrop, and PIR sensors.','Displayed environmental sensor information.','Provided real-time data to support site monitoring.']},
  {title:'Banana Quality Inspection and Lifespan Detection',meta:'Embedded System Programming · SY 2025–2026, Semester 1',description:'A Raspberry Pi Pico-based embedded system concept to monitor storage conditions and support banana shelf-life forecasting.',highlights:['Tracked temperature, humidity, and methane gas.','Aimed to improve post-harvest storage and reduce food waste.','Focused on affordable technology for sustainable farming and food security.']},
  {title:'XIAO ESP32S3-Based Edge AIoT Prototype for Calamansi HLB Detection',meta:'Undergraduate Thesis · SY 2025–2026, Semester 2',description:'An exploratory design and evaluation of an edge-computing prototype for Huanglongbing (citrus greening) detection in calamansi.',highlights:['Used the XIAO ESP32S3 platform.','Combined embedded systems and on-device processing for real-time detection.','Evaluated prototype performance to support early diagnosis and crop management.']}
];
const projectModal = document.querySelector('#project-modal');
if (projectModal) {
  const modalTitle = document.querySelector('#modal-title');
  const modalMeta = document.querySelector('#modal-meta');
  const modalDescription = document.querySelector('#modal-description');
  const modalHighlights = document.querySelector('#modal-highlights');
  const modalCourse = document.querySelector('#modal-course');
  document.querySelectorAll('.details-button').forEach((button) => {
    button.addEventListener('click', () => {
      const project = projectDetails[Number(button.dataset.project)];
      if (!project) return;
      modalTitle.textContent = project.title;
      modalMeta.textContent = project.meta;
      modalDescription.textContent = project.description;
      modalHighlights.replaceChildren(...project.highlights.map((item) => {
        const li = document.createElement('li'); li.textContent = item; return li;
      }));
      modalCourse.textContent = 'Academic project details are summarized from the information provided.';
      projectModal.showModal();
    });
  });
  document.querySelector('.modal-close')?.addEventListener('click', () => projectModal.close());
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) projectModal.close();
  });
}

// ===== Copy email address =====
const copyEmailButton = document.querySelector('#copy-email');
const copyStatus = document.querySelector('#copy-status');
if (copyEmailButton && copyStatus) {
  copyEmailButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('arochavanessa67@gmail.com');
      copyStatus.textContent = 'Email copied to clipboard!';
    } catch (error) {
      copyStatus.textContent = 'Copy unavailable in this browser. Select the email address above to copy it.';
    }
  });
}
