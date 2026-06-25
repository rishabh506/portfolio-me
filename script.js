// ---------- Mouse relative coords inside cards for Flashlight Effect ----------
    document.querySelectorAll('.card, .skill-cat, .proj-card, .cert-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const bounds = card.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // ---------- Ambient cursor coordinates ----------
    const glowContainer = document.getElementById('glow-container');
    document.addEventListener('mousemove', (e) => {
      document.body.style.setProperty('--mouse-x', e.clientX + 'px');
      document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // ---------- Loading removal ----------
    window.addEventListener('load', () => {
      setTimeout(() => {
        const l = document.getElementById('loader');
        l.classList.add('hide');
        setTimeout(() => l.style.display = 'none', 500);
      }, 1000);
    });

    // ---------- Dark/Light Toggle ----------
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    const curTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', curTheme);
    themeIcon.textContent = curTheme === 'dark' ? '🌙' : '☀️';

    themeToggle.addEventListener('click', () => {
      const nextTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      themeIcon.textContent = nextTheme === 'dark' ? '🌙' : '☀️';
    });

    // ---------- Navigation Menu (Mobile) ----------
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // ---------- Scroll Telemetry & Back to Top ----------
    const scrollbar = document.getElementById('scrollbar');
    const toTop = document.getElementById('toTop');
    window.addEventListener('scroll', () => {
      const doc = document.documentElement;
      const pct = (doc.scrollTop) / (doc.scrollHeight - doc.clientHeight) * 100;
      scrollbar.style.width = pct + '%';
      if (doc.scrollTop > 450) {
        toTop.classList.add('show');
      } else {
        toTop.classList.remove('show');
      }
    });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- Scroll Reveal Animations ----------
    const revealElements = document.querySelectorAll('.reveal');
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });
    revealElements.forEach(el => scrollObserver.observe(el));

    // ---------- Skill Bar Fill Animations ----------
    const skillMeters = document.querySelectorAll('.meter-fill');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target;
          bar.style.width = bar.dataset.w + '%';
        }
      });
    }, { threshold: 0.2 });
    skillMeters.forEach(m => skillObserver.observe(m));

    // ---------- Circular SVG Dials Animations ----------
    const dialFills = document.querySelectorAll('.dial-fill');
    const dialObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const dial = e.target;
          const pct = +dial.dataset.percent;
          // Circle perimeter: 2 * PI * r = 2 * 3.14159 * 40 = 251.3
          const offset = 251.3 - (251.3 * pct) / 100;
          dial.style.strokeDashoffset = offset;
        }
      });
    }, { threshold: 0.2 });
    dialFills.forEach(d => dialObserver.observe(d));

    // ---------- Stats Dashboard Counter ----------
    const statNums = document.querySelectorAll('.metric-num');
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const card = e.target;
          const target = +card.dataset.count;
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 25));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            card.textContent = current;
          }, 50);
          statsObserver.unobserve(card);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(n => statsObserver.observe(n));

    // Live public GitHub repositories counter fallback
    fetch('https://api.github.com/users/rishabh506')
      .then(res => res.json())
      .then(data => {
        const repoCounter = document.querySelector('[data-count="10"]');
        if (repoCounter && data.public_repos) {
          repoCounter.dataset.count = data.public_repos;
          // If already triggered, update directly
          if(repoCounter.textContent !== '0') {
            repoCounter.textContent = data.public_repos;
          }
        }
      }).catch(() => {});

    // ---------- Role typing animation ----------
    const roles = [
      "Future Cloud Engineer",
      "AWS Architecture Student",
      "Linux System Enthusiast",
      "DevOps Learner"
    ];
    const roleLine = document.getElementById('roleLine');
    let roleIdx = 0, charIdx = 0, isDeleting = false;
    
    function writeRole() {
      const currentRoleText = roles[roleIdx];
      if (!isDeleting) {
        charIdx++;
        roleLine.textContent = currentRoleText.slice(0, charIdx) + "█";
        if (charIdx === currentRoleText.length) {
          isDeleting = true;
          setTimeout(writeRole, 1500);
          return;
        }
      } else {
        charIdx--;
        roleLine.textContent = currentRoleText.slice(0, charIdx) + "█";
        if (charIdx === 0) {
          isDeleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(writeRole, isDeleting ? 30 : 65);
    }
    writeRole();

    // ---------- Projects filtering logic ----------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.proj-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.dataset.f;
        projectCards.forEach(card => {
          if (filterVal === 'all' || card.dataset.cat === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // ---------- Contact Dispatch Logic ----------
    function handleSubmit(e) {
      e.preventDefault();
      const formFields = e.target.querySelectorAll('input, textarea');
      const [name, email, subject, message] = formFields;
      const bodyFormat = `Sender Address: ${name.value} (${email.value})\n\nLog Payload:\n${message.value}`;
      
      window.location.href = `mailto:rishabhgupta3451@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(bodyFormat)}`;
      
      document.getElementById('formNote').textContent = "[OK] Initializing local SMTP mailto handler...";
      return false;
    }

    // ---------- Interactive Terminal Simulator ----------
    const termInput = document.getElementById('termInput');
    const termBody = document.getElementById('termBody');
    const termOutput = document.getElementById('termOutput');

    function focusTerminal() {
      termInput.focus();
    }

    // Auto focus on load/clicks inside terminal
    window.addEventListener('click', (e) => {
      if (document.getElementById('terminal').contains(e.target) && e.target !== termInput) {
        termInput.focus();
      }
    });

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const command = termInput.value.trim();
        if (command) {
          processCommand(command);
        }
        termInput.value = '';
      }
    });

    const commandHistory = [];
    let historyIndex = -1;

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (commandHistory.length > 0) {
          if (historyIndex === -1) historyIndex = commandHistory.length - 1;
          else if (historyIndex > 0) historyIndex--;
          termInput.value = commandHistory[historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (commandHistory.length > 0 && historyIndex !== -1) {
          if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            termInput.value = commandHistory[historyIndex];
          } else {
            historyIndex = -1;
            termInput.value = '';
          }
        }
      }
    });

    function processCommand(cmd) {
      commandHistory.push(cmd);
      historyIndex = -1;
      
      const line = document.createElement('div');
      line.className = 'term-line';
      line.innerHTML = `<span class="prompt">guest@rishabh-infra:~$</span> <span>${escapeHTML(cmd)}</span>`;
      termOutput.appendChild(line);

      const lowCmd = cmd.toLowerCase().split(' ')[0];
      let rawResponse = '';
      let isHTML = false;

      switch(lowCmd) {
        case 'help':
          rawResponse = `Available commands:
  - <span style="color:var(--primary)">about</span>      : Display system configuration profile summary
  - <span style="color:var(--primary)">skills</span>     : Display technical capabilities metrics
  - <span style="color:var(--primary)">projects</span>   : List deployed system configurations
  - <span style="color:var(--primary)">socials</span>    : Print active networking interfaces (LinkedIn, GitHub)
  - <span style="color:var(--primary)">neofetch</span>   : Run a hardware specs diagnostic report
  - <span style="color:var(--primary)">contact</span>    : Print communication access routes
  - <span style="color:var(--primary)">clear</span>      : Reset terminal output buffer
  - <span style="color:var(--primary)">sudo hack</span>  : Initialize privilege escalation override test`;
          isHTML = true;
          break;
        case 'about':
          rawResponse = `System Profile: Rishabh Agarwal
Role Target: Cloud / DevOps / Site Reliability Internship
Location: Jaipur, Rajasthan, India
Summary: I broke a server once — and that's when I actually fell in love with infrastructure. I'm Rishabh, a Computer Applications student at JECRC University with a hands-on obsession with how systems actually run in production — not just how they're coded. I spend my free hours in the terminal: spinning up EC2 instances, breaking and fixing Docker containers, and mapping out networks.`;
          break;
        case 'skills':
          rawResponse = `Core Skillset Metrics:
[☁️ Cloud]   AWS (EC2, VPC, RDS, 3-Tier Architecture) - 80%
[🖥️ DevOps]  Linux Admin, Docker Containerization, Git & GitHub, TCP/IP - 78%
[💻 Dev]     Python, Java, C++, JavaScript - 71%
[🗄️ DBs]     MySQL, MongoDB - 70%`;
          break;
        case 'projects':
          rawResponse = `Active Deployments List:
1. AWS 3-Tier Architecture (VPC, EC2, RDS, IAM)
2. Indian Meal Planner App (Python, Streamlit, AI APIs)
3. Amazon Clone UI (HTML, CSS3 Grid, JavaScript)
4. JS Bubble Game (DOM Coordinates, CSS Animations)`;
          break;
        case 'socials':
          rawResponse = `Active Networking Interfaces:
- GitHub   : <a href="https://github.com/rishabh506" target="_blank" style="color:var(--primary)">github.com/rishabh506</a>
- LinkedIn : <a href="https://www.linkedin.com/in/rishabh-agarwal-a70384321" target="_blank" style="color:var(--primary)">linkedin.com/in/rishabh-agarwal-a70384321</a>`;
          isHTML = true;
          break;
        case 'neofetch':
          rawResponse = `<span style="color:var(--primary)">       ______</span>       <span style="color:var(--accent)">guest@rishabh-infra</span>
<span style="color:var(--primary)">      /     /|</span>      -------------------
<span style="color:var(--primary)">     /_____/ |</span>      <b>OS</b>: JECRC CloudOS v2.6-stable
<span style="color:var(--primary)">     | === | |</span>      <b>Host</b>: JECRC University Cluster
<span style="color:var(--primary)">     |_____|/</span>       <b>Kernel</b>: 5.15.0-x86_64-aws
<span style="color:var(--primary)">     | === | |</span>      <b>Uptime</b>: 2 years (learning)
<span style="color:var(--primary)">     |_____|/</span>       <b>Shell</b>: bash 5.1.16-guest
<span style="color:var(--primary)">     | === | /</span>      <b>Target</b>: Cloud/DevOps Engineer
<span style="color:var(--primary)">     |_____|/</span>       <b>Memory</b>: 16GB / Unlimited Passion
                    <b>Disk</b>: 256GB SSD (Docker Volumes)`;
          isHTML = true;
          break;
        case 'contact':
          rawResponse = `Communication Access Routes:
- Email : <a href="mailto:rishabhgupta3451@gmail.com" style="color:var(--primary)">rishabhgupta3451@gmail.com</a>
- Phone : +91 83021 00635
- Coord : Jaipur, Rajasthan, India`;
          isHTML = true;
          break;
        case 'clear':
          termOutput.innerHTML = '';
          termBody.scrollTop = termBody.scrollHeight;
          return;
        case 'sudo':
          if(cmd.toLowerCase() === 'sudo hack') {
            rawResponse = `<span style="color:red; font-weight:bold;">[WARNING] PRIVILEGE ESCALATION BYPASS INITIATED...</span>
Connecting to master cluster... [OK]
Bypassing JECRC firewall... [OK]
Retrieving internship job description... [OK]
Injecting candidate Rishabh Agarwal... [OK]
<span style="color:var(--success)">Root access granted! Ready to begin pair-programming. Let's build scalable systems together.</span>`;
            isHTML = true;
          } else {
            rawResponse = `guest is not in the sudoers file. This incident will be reported.`;
          }
          break;
        default:
          rawResponse = `bash: command not found: ${lowCmd}. Type 'help' for valid options.`;
      }
      
      writeDelayedOutput(rawResponse, isHTML);
    }

    // Write terminal lines with realistic line-by-line printing delay
    function writeDelayedOutput(content, isHTML) {
      const out = document.createElement('div');
      out.className = 'term-output';
      termOutput.appendChild(out);

      if (!isHTML) {
        const lines = content.split('\n');
        let index = 0;
        function printNextLine() {
          if (index < lines.length) {
            const lineDiv = document.createElement('div');
            lineDiv.textContent = lines[index];
            out.appendChild(lineDiv);
            index++;
            termBody.scrollTop = termBody.scrollHeight;
            setTimeout(printNextLine, 35);
          }
        }
        printNextLine();
      } else {
        // Parse HTML nodes and append sequentially
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        const nodes = Array.from(tempDiv.childNodes).map(n => n.cloneNode(true));
        let index = 0;
        function printNextNode() {
          if (index < nodes.length) {
            out.appendChild(nodes[index]);
            index++;
            termBody.scrollTop = termBody.scrollHeight;
            setTimeout(printNextNode, 30);
          }
        }
        printNextNode();
      }
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    }

    // ---------- Constellation Particle Background ----------
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particleArray = [];
    const maxParticles = 65;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const activeColor = body.getAttribute('data-theme') === 'light' ? '2, 132, 199' : '56, 189, 248';
        ctx.fillStyle = `rgba(${activeColor}, 0.6)`;
        ctx.fill();
      }
    }

    function initParticles() {
      particleArray = [];
      for (let i = 0; i < maxParticles; i++) {
        particleArray.push(new Particle());
      }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const activeColor = body.getAttribute('data-theme') === 'light' ? '2, 132, 199' : '56, 189, 248';
      
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
      }
      
      // Draw lines between nearby particles
      for (let i = 0; i < particleArray.length; i++) {
        for (let j = i + 1; j < particleArray.length; j++) {
          const dx = particleArray[i].x - particleArray[j].x;
          const dy = particleArray[i].y - particleArray[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particleArray[i].x, particleArray[i].y);
            ctx.lineTo(particleArray[j].x, particleArray[j].y);
            ctx.strokeStyle = `rgba(${activeColor}, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
