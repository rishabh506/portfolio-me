const roles = [
  {
    icon: "panels-top-left",
    title: "Frontend development",
    filter: "Frontend",
    text: "Building responsive interfaces and learning to turn product ideas into clear, usable web experiences.",
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    icon: "server",
    title: "Backend / Software Development",
    filter: "Backend & Software",
    text: "Developing application logic, working with databases, and learning to build reliable APIs and software systems.",
    skills: ["Java", "Python", "SQL", "REST API concepts"]
  },
  {
    icon: "cloud",
    title: "Cloud / DevOps",
    filter: "Cloud & DevOps",
    text: "Exploring cloud infrastructure, containerization, automation, and CI/CD workflows.",
    skills: ["AWS", "Docker", "Git", "CI/CD", "Linux basics"]
  },
  {
    icon: "chart-no-axes-combined",
    title: "Data analytics",
    filter: "Data & Analytics",
    text: "Working with structured data and Python tools to explore useful patterns and insights.",
    skills: ["Python", "Pandas", "NumPy", "SQL"]
  }
];

const projects = [
  {
    name: "Reelcast · Video Streaming Platform",
    visual: "streaming",
    mark: "Reelcast",
    caption: "Adaptive streaming · watch parties",
    status: "Major project",
    purpose: "A full-stack video platform for adaptive streaming, synchronized watch parties, and subscription-based premium content.",
    tech: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Redis", "FFmpeg", "Socket.io", "AWS S3", "Stripe"],
    categories: ["Frontend", "Backend & Software", "Cloud & DevOps"],
    live: "https://video-streaming-platform-theta-gilt.vercel.app/",
    code: "https://github.com/rishabh506/video-streaming-platform",
    highlights: ["Background FFmpeg transcoding to adaptive HLS video qualities", "Real-time watch parties with synchronized playback and chat", "JWT authentication and Stripe subscription billing"]
  },
  {
    name: "Tic-Tac-Toe",
    visual: "tictactoe",
    mark: "Tic-Tac-Toe",
    caption: "Play against a minimax AI",
    status: "Featured project",
    purpose: "A framework-free game with a computer opponent powered by a minimax decision tree.",
    tech: ["JavaScript", "HTML", "CSS", "Minimax AI"],
    categories: ["Frontend"],
    code: "https://github.com/rishabh506/tic-tak-toe",
    highlights: ["Three AI difficulty levels and accessible keyboard interaction", "Persistent scores, dark/light themes, and synthesized audio"]
  },
  {
    name: "Indian Meal Planner",
    visual: "meal",
    mark: "Indian Meal Planner",
    caption: "Planning · pantry · cost",
    purpose: "A meal-planning app focused on Indian meals, pantry management, and cost optimization in INR.",
    tech: ["Python", "Streamlit"],
    categories: ["Backend", "Data & Analytics"],
    live: "https://indian-meal-planner-v4bngfmmlhpywp3rmarfyc.streamlit.app/",
    code: "https://github.com/rishabh506/Indian-meal-planner",
    highlights: ["Plan meals and manage pantry items", "Explore cost-conscious meal planning"]
  },
  {
    name: "Bubble Game",
    visual: "game",
    mark: "Bubble Game",
    caption: "A small browser game",
    purpose: "A browser-based game built to practise interaction and event handling with vanilla JavaScript.",
    tech: ["HTML", "CSS", "JavaScript"],
    categories: ["Frontend"],
    live: "https://bubble-game-copy.vercel.app/",
    code: "https://github.com/rishabh506/bubble-game-copy",
    highlights: ["Click-based gameplay"]
  },
  {
    name: "Amazon UI Clone",
    visual: "shop",
    mark: "Amazon UI Clone",
    caption: "First web project",
    purpose: "An educational shopping-site interface recreation made while learning core web development.",
    tech: ["HTML", "CSS"],
    categories: ["Frontend"],
    live: "https://ecommerce-amazon-gamma.vercel.app/",
    code: "https://github.com/rishabh506/ecommerce_amazon",
    highlights: ["Practice with page structure and styling"]
  }
];

const skills = {
  "Frontend": ["HTML", "CSS", "JavaScript", "React", "Vite", "Tailwind CSS", "Bootstrap"],
  "Programming": ["Python", "Java", "C", "C++"],
  "Backend & Databases": ["SQL", "Oracle Database", "MongoDB", "Node.js fundamentals", "REST API concepts"],
  "Cloud & DevOps": ["AWS fundamentals", "Docker", "CI/CD", "Automation", "Git", "GitHub", "Linux fundamentals"],
  "Data analytics": ["Pandas", "NumPy", "Matplotlib", "SQL querying", "Data visualization basics"],
  "Tools": ["VS Code", "Streamlit"]
};

const timeline = [
  {
    date: "Internship",
    title: "ElevateLab",
    text: "Gained practical exposure to Docker, CI/CD pipelines, automation, and containerization."
  },
  {
    date: "Expected 2027",
    title: "BCA, JECRC University",
    text: "Studying Cloud Computing and Web Development in Jaipur, Rajasthan."
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

let activeFilter = "All";

function renderRoles() {
  const grid = $("#roleGrid");
  roles.forEach(role => {
    const card = make("article", "capability");
    const icon = make("span", "capability-icon");
    icon.innerHTML = `<i data-lucide="${role.icon}" aria-hidden="true"></i>`;
    card.append(icon, make("h3", "", role.title), make("p", "", role.text));

    const tags = make("ul", "tag-list");
    role.skills.forEach(skill => tags.append(make("li", "", skill)));
    card.append(tags);

    const button = make("button", "", `Explore ${role.title.toLowerCase()} projects`);
    button.type = "button";
    button.addEventListener("click", () => {
      setFilter(role.filter);
      $("#projects").scrollIntoView({ behavior: "smooth" });
    });
    card.append(button);
    grid.append(card);
  });
}

function renderFilters() {
  const filters = $("#filters");
  filters.replaceChildren();

  ["All", "Frontend", "Backend & Software", "Cloud & DevOps", "Data & Analytics"].forEach(filter => {
    const button = make("button", "", filter);
    button.type = "button";
    button.setAttribute("aria-pressed", String(filter === activeFilter));
    button.addEventListener("click", () => setFilter(filter));
    filters.append(button);
  });
}

function addProjectLink(links, url, label, icon) {
  if (!url) return;
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.append(make("i"));
  link.firstElementChild.setAttribute("data-lucide", icon);
  link.firstElementChild.setAttribute("aria-hidden", "true");
  link.append(document.createTextNode(label));
  links.append(link);
}

function renderProjects() {
  const grid = $("#projectGrid");
  grid.replaceChildren();

  const visibleProjects = projects.filter(project =>
    activeFilter === "All" || project.categories.includes(activeFilter)
  );

  if (!visibleProjects.length) {
    grid.append(make("p", "empty", "No projects are listed in this area yet."));
    return;
  }

  visibleProjects.forEach(project => {
    const card = make("article", "project-card");
    const visual = make("div", `project-visual ${project.visual}`);
    visual.setAttribute("aria-hidden", "true");
    const visualContent = make("div", "project-visual-inner");
    visualContent.append(
      make("span", "project-mark", project.mark),
      make("span", "project-caption", project.caption)
    );
    visual.append(visualContent);

    const content = make("div", "project-content");
    const heading = make("div", "project-heading");
    heading.append(make("h3", "", project.name));
    if (project.status) heading.append(make("span", "project-status", project.status));
    content.append(heading, make("p", "project-description", project.purpose));

    const tags = make("ul", "tag-list");
    project.tech.forEach(technology => tags.append(make("li", "", technology)));
    content.append(tags);

    const highlights = make("ul", "project-highlights");
    project.highlights.forEach(highlight => highlights.append(make("li", "", highlight)));
    content.append(highlights);

    const links = make("div", "project-links");
    addProjectLink(links, project.live, "Live demo", "arrow-up-right");
    addProjectLink(links, project.code, "Source code", "github");
    if (links.childElementCount) content.append(links);

    card.append(visual, content);
    grid.append(card);
  });

  window.lucide?.createIcons();
}

function setFilter(filter) {
  activeFilter = filter;
  renderFilters();
  renderProjects();
}

function renderSkills() {
  const grid = $("#skillGrid");
  Object.entries(skills).forEach(([category, items]) => {
    const card = make("section", "skill-card");
    card.append(make("h3", "", category));
    const tags = make("ul", "tag-list");
    items.forEach(item => tags.append(make("li", "", item)));
    card.append(tags);
    grid.append(card);
  });
}

function renderTimeline() {
  const list = $("#timeline");
  timeline.forEach(item => {
    const entry = make("li");
    entry.append(make("small", "", item.date), make("h3", "", item.title), make("p", "", item.text));
    list.append(entry);
  });
}

function initTheme() {
  const button = $("#themeToggle");
  const icon = button.querySelector("[data-lucide]");
  let theme = "dark";

  try {
    theme = localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
  } catch (error) {
    console.warn("Could not read the saved theme preference.", error);
  }

  const applyTheme = nextTheme => {
    theme = nextTheme;
    const isLight = theme === "light";
    document.documentElement.dataset.theme = theme;
    button.setAttribute("aria-pressed", String(isLight));
    button.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
    button.title = `Switch to ${isLight ? "dark" : "light"} theme`;
    icon.setAttribute("data-lucide", isLight ? "moon" : "sun");
    $("#themeColor").content = isLight ? "#f5f8f5" : "#101613";
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

function initNav() {
  const nav = $("#nav");
  const burger = $("#burger");
  const menu = $("#menu");
  const links = [...menu.querySelectorAll('a[href^="#"]')];

  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 8), { passive: true });
  burger.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    burger.querySelector("[data-lucide]").setAttribute("data-lucide", isOpen ? "x" : "menu");
    window.lucide?.createIcons();
  });

  menu.addEventListener("click", event => {
    if (!event.target.closest("a")) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open navigation");
    burger.querySelector("[data-lucide]").setAttribute("data-lucide", "menu");
    window.lucide?.createIcons();
  });

  const sections = links
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(section => observer.observe(section));
  }
}

renderRoles();
renderFilters();
renderProjects();
renderSkills();
renderTimeline();
initTheme();
initNav();
$("#year").textContent = new Date().getFullYear();
window.lucide?.createIcons();
