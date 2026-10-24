const projects = [
  {
    name: "Indian Meal Planner",
    category: "Python & Streamlit",
    image: "assets/project-previews/meal-planner-dashboard.jpg",
    imageWidth: 1140,
    imageHeight: 690,
    imageAlt: "Screenshot of the Indian Meal Planner's live dashboard with recipe and cost-distribution charts.",
    purpose: "A Streamlit app for planning meals around dietary preferences, prep time, and budget, with pantry checks and shopping-list support.",
    implementation: "Uses CSV-based recipe, price, and pantry data to filter recipes, generate meal plans, and estimate ingredient costs and nutrition.",
    learning: "Practised working with tabular data, filtering rules, and connecting planning features in one app.",
    technologies: ["Python", "Streamlit", "Pandas"],
    live: "https://indian-meal-planner-v4bngfmmlhpywp3rmarfyc.streamlit.app/",
    repository: "https://github.com/rishabh506/Indian-meal-planner",
    featured: true
  },
  {
    name: "CI/CD Pipeline Project",
    category: "Cloud & DevOps",
    image: "assets/project-previews/ci-cd-pipeline.jpg",
    imageWidth: 1367,
    imageHeight: 900,
    imageAlt: "GitHub Actions screenshot showing a successful build-and-test run for the CI/CD pipeline project.",
    purpose: "A Flask API project used to practise containerized testing and delivery with GitHub Actions; no public app demo is listed.",
    implementation: "The workflow runs tests and builds a Docker image; push-triggered runs can publish it to Docker Hub when credentials are configured. The repository also includes deployment and health-check scripts.",
    learning: "Practised connecting automated tests, image builds, and deployment steps in a CI/CD workflow.",
    technologies: ["Python", "Flask", "pytest", "Docker", "GitHub Actions"],
    workflow: "https://github.com/rishabh506/cicd-pipeline-project/actions/runs/31328384659",
    repository: "https://github.com/rishabh506/cicd-pipeline-project",
    featured: true
  },
  {
    name: "Amazon UI Clone",
    category: "HTML & CSS",
    image: "assets/project-previews/amazon-ui-clone.jpg",
    imageWidth: 1440,
    imageHeight: 626,
    imageAlt: "Screenshot of the Amazon UI Clone home page, including its banner and product category sections.",
    purpose: "A static shopping-homepage recreation made as an early exercise in web development.",
    implementation: "Builds the page layout, navigation, hero banner, and category sections with HTML and CSS; it does not implement shopping interactions.",
    learning: "Practised structuring a multi-section page and styling layouts with core web technologies.",
    technologies: ["HTML", "CSS"],
    live: "https://ecommerce-amazon-gamma.vercel.app/",
    repository: "https://github.com/rishabh506/ecommerce_amazon"
  },
  {
    name: "Bubble Game",
    category: "JavaScript",
    image: "assets/project-previews/bubble-game.jpg",
    imageWidth: 790,
    imageHeight: 603,
    imageAlt: "Screenshot of the Bubble Game showing the target number, timer, score, and numbered bubbles.",
    purpose: "A timed number-matching browser game: find the target number among the bubbles before the 30-second round ends.",
    implementation: "A delegated click handler checks the selected number, updates the score for a match, and ends the round on a miss.",
    learning: "Practised DOM events, game state, score updates, random targets, and a countdown timer.",
    technologies: ["HTML", "CSS", "JavaScript"],
    live: "https://bubble-game-copy.vercel.app/",
    repository: "https://github.com/rishabh506/bubble-game-copy"
  }
];

const skills = [
  {
    category: "Programming",
    items: ["JavaScript", "Java", "Python (beginner)", "C", "C++"]
  },
  {
    category: "Frontend",
    items: ["HTML", "CSS", "React", "Tailwind CSS", "Bootstrap"]
  },
  {
    category: "Backend & Databases",
    items: ["Node.js", "Express.js", "REST APIs", "SQL", "PostgreSQL", "MongoDB", "Oracle"]
  },
  {
    category: "Cloud & DevOps",
    items: ["AWS fundamentals", "Docker", "CI/CD", "Automation"]
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Vercel", "Render"]
  }
];

const timeline = [
  {
    label: "INTERNSHIP",
    title: "DevOps Intern · ElevateLab",
    description: "Gained practical exposure to Docker, containerization, automation, and CI/CD pipelines."
  },
  {
    label: "EDUCATION · EXPECTED 2027",
    title: "BCA, Cloud Computing · JECRC University",
    description: "Bachelor of Computer Applications, Jaipur, Rajasthan."
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const make = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

let activeFilter = "All";

function createProjectCard(project) {
  const card = make("article", `project-card${project.featured ? " project-card-featured" : ""}`);
  const visual = make("img", "project-image");
  visual.src = project.image;
  visual.alt = project.imageAlt;
  visual.loading = "lazy";
  visual.width = project.imageWidth;
  visual.height = project.imageHeight;

  const content = make("div", "project-content");
  const meta = make("div", "project-meta");
  meta.append(make("span", "project-number", String(projects.indexOf(project) + 1).padStart(2, "0")));
  meta.append(make("span", "project-category", project.category));
  content.append(meta, make("h3", "", project.name));
  content.append(make("p", "project-purpose", project.purpose));

  const details = make("dl", "project-details");
  details.append(make("dt", "", "What I built"), make("dd", "", project.implementation));
  details.append(make("dt", "", "What I learned"), make("dd", "", project.learning));
  content.append(details);

  const tags = make("ul", "tag-list");
  project.technologies.forEach(technology => tags.append(make("li", "", technology)));
  content.append(tags);

  const links = make("div", "project-links");
  if (project.live) addProjectLink(links, project.live, "Live demo");
  if (project.workflow) addProjectLink(links, project.workflow, "Workflow run");
  addProjectLink(links, project.repository, "GitHub");
  content.append(links);
  card.append(visual, content);
  return card;
}

function addProjectLink(container, href, label) {
  const link = make("a", "", label);
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(make("i"));
  link.lastElementChild.dataset.lucide = label === "GitHub" ? "github" : "arrow-up-right";
  link.lastElementChild.setAttribute("aria-hidden", "true");
  container.append(link);
}

function renderFilters() {
  const filters = $("#filters");
  filters.replaceChildren();
  const categories = ["All", ...new Set(projects.map(project => project.category))];

  categories.forEach(category => {
    const button = make("button", "filter-button", category);
    button.type = "button";
    button.setAttribute("aria-pressed", String(category === activeFilter));
    button.addEventListener("click", () => {
      activeFilter = category;
      renderFilters();
      renderProjects();
    });
    filters.append(button);
  });
}

function renderProjects() {
  const grid = $("#projectGrid");
  grid.replaceChildren();
  projects
    .filter(project => activeFilter === "All" || project.category === activeFilter)
    .forEach(project => grid.append(createProjectCard(project)));
  window.lucide?.createIcons();
}

function renderSkills() {
  const list = $("#skillGrid");
  skills.forEach(group => {
    const row = make("section", "skill-row");
    row.append(make("h3", "", group.category));
    const tags = make("ul", "tag-list");
    group.items.forEach(skill => tags.append(make("li", "", skill)));
    row.append(tags);
    list.append(row);
  });
}

function renderTimeline() {
  const list = $("#timeline");
  timeline.forEach((item, index) => {
    const entry = make("li", "timeline-item");
    entry.append(make("span", "timeline-index", String(index + 1).padStart(2, "0")));
    const content = make("div", "timeline-content");
    content.append(make("p", "timeline-label", item.label), make("h3", "", item.title), make("p", "timeline-description", item.description));
    entry.append(content);
    list.append(entry);
  });
}

function initTheme() {
  const button = $("#themeToggle");
  const icon = button.querySelector("[data-lucide]");
  let theme = "light";

  try {
    theme = localStorage.getItem("portfolio-theme") === "dark" ? "dark" : "light";
  } catch (error) {
    console.warn("Could not read the saved theme preference.", error);
  }

  const applyTheme = nextTheme => {
    theme = nextTheme;
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(isDark));
    button.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
    button.title = `Switch to ${isDark ? "light" : "dark"} theme`;
    icon.dataset.lucide = isDark ? "sun" : "moon";
    $("#themeColor").content = isDark ? "#18211c" : "#f4f1e9";
    window.lucide?.createIcons();
  };

  applyTheme(theme);
  button.addEventListener("click", () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch (error) {
      console.warn("Could not save the theme preference.", error);
    }
  });
}

function initNavigation() {
  const header = $("#nav");
  const toggle = $("#burger");
  const menu = $("#menu");
  const navLinks = [...menu.querySelectorAll('a[href^="#"]')];

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    toggle.querySelector("[data-lucide]").dataset.lucide = "menu";
    window.lucide?.createIcons();
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    toggle.querySelector("[data-lucide]").dataset.lucide = isOpen ? "x" : "menu";
    window.lucide?.createIcons();
  });

  menu.addEventListener("click", event => {
    if (event.target.closest('a[href^="#"]')) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    const sections = navLinks
      .map(link => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -58% 0px" });
    sections.forEach(section => observer.observe(section));
  }
}

renderFilters();
renderProjects();
renderSkills();
renderTimeline();
initTheme();
initNavigation();
$("#year").textContent = new Date().getFullYear();
window.lucide?.createIcons();
