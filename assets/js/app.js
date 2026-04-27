/**
 * SLR AI Guide — Modern ES6+ Application
 * Features: Class-based architecture, DaisyUI Toast, IntersectionObserver
 * Enhanced with TOC, Reading Time, Scroll Spy, and improved UX
 */

(function () {
  "use strict";

  // ── Icon Library ──────────────────────────────────────────────
  const IconLib = {
    book: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>`,
    userPlus: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM13 7a1 1 0 112 0v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1V7z"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`,
    checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/></svg>`,
    logout: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"/></svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/></svg>`,
    sun: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"/></svg>`,
    moon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`,
    spinner: `<span class="loading loading-spinner loading-xs"></span>`,
  };

  // ── Toast Notification System (DaisyUI) ───────────────────────
  class ToastManager {
    #container;

    constructor() {
      this.#container = document.createElement("div");
      this.#container.className = "toast toast-end toast-top z-50";
      document.body.appendChild(this.#container);
    }

    show(message, type = "info", duration = 3000) {
      const alertClass =
        {
          success: "alert-success",
          error: "alert-error",
          warning: "alert-warning",
          info: "alert-info",
        }[type] || "alert-info";

      const icon =
        type === "success"
          ? IconLib.checkCircle
          : type === "error"
            ? IconLib.warning
            : type === "warning"
              ? IconLib.warning
              : IconLib.check;

      const toast = document.createElement("div");
      toast.className = `alert ${alertClass} shadow-lg transition-all duration-300 translate-x-full opacity-0`;
      toast.innerHTML = `${icon}<span>${message}</span>`;

      this.#container.appendChild(toast);

      // Animate in
      requestAnimationFrame(() => {
        toast.classList.remove("translate-x-full", "opacity-0");
      });

      // Auto dismiss
      setTimeout(() => this.#dismiss(toast), duration);

      return toast;
    }

    #dismiss(toast) {
      toast.classList.add("translate-x-full", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }
  }

  // ── Table of Contents Manager ─────────────────────────────────
  class TOCManager {
    #content;
    #tocNav;
    #tocNavMobile;
    #observer;
    #headingElements = [];

    constructor() {
      this.#content = document.getElementById("modul-content");
      this.#tocNav = document.getElementById("toc-nav");
      this.#tocNavMobile = document.getElementById("toc-nav-mobile");

      if (this.#content && (this.#tocNav || this.#tocNavMobile)) {
        this.#init();
      }
    }

    #init() {
      this.#generateTOC();
      this.#setupScrollSpy();
      this.#setupMobileToggle();
    }

    #generateTOC() {
      // Find all H2 and H3 headings in the content
      const headings = this.#content.querySelectorAll("h2, h3");

      if (headings.length === 0) return;

      const tocItems = [];
      const usedIds = new Set();

      headings.forEach((heading, index) => {
        // Generate unique ID if not present
        let id = heading.id;
        if (!id) {
          // Create slug from text
          id = heading.textContent
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .substring(0, 50);
        }

        // Ensure unique ID
        let uniqueId = id;
        let counter = 1;
        while (usedIds.has(uniqueId)) {
          uniqueId = `${id}-${counter}`;
          counter++;
        }
        usedIds.add(uniqueId);

        if (!heading.id) {
          heading.id = uniqueId;
        }

        const level = heading.tagName.toLowerCase();
        const text = heading.textContent.trim();

        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = text;
        link.dataset.level = level === "h3" ? "3" : "2";
        link.dataset.target = heading.id;
        link.className = "truncate";
        link.setAttribute("role", "listitem");

        // Smooth scroll on click
        link.addEventListener("click", (e) => {
          e.preventDefault();
          heading.scrollIntoView({ behavior: "smooth", block: "start" });

          // Close mobile TOC
          const mobileToc = document.getElementById("toc-mobile");
          if (mobileToc && !mobileToc.classList.contains("hidden")) {
            mobileToc.classList.add("hidden");
            const chevron = document.getElementById("toc-chevron");
            if (chevron) {
              chevron.style.transform = "rotate(0deg)";
            }
          }
        });

        // Keyboard navigation support
        link.addEventListener("keydown", (e) => {
          if (e.key === "ArrowDown" || e.key === "j") {
            e.preventDefault();
            const nextLink = link.nextElementSibling;
            if (nextLink) nextLink.focus();
          } else if (e.key === "ArrowUp" || e.key === "k") {
            e.preventDefault();
            const prevLink = link.previousElementSibling;
            if (prevLink) prevLink.focus();
          } else if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            link.click();
          }
        });

        tocItems.push(link);
        this.#headingElements.push(heading);
      });

      // Add to desktop TOC
      if (this.#tocNav) {
        this.#tocNav.setAttribute("role", "list");
        this.#tocNav.setAttribute("aria-label", "Daftar isi");
        tocItems.forEach((item) =>
          this.#tocNav.appendChild(item.cloneNode(true)),
        );
      }

      // Add to mobile TOC
      if (this.#tocNavMobile) {
        this.#tocNavMobile.setAttribute("role", "list");
        this.#tocNavMobile.setAttribute("aria-label", "Daftar isi");
        tocItems.forEach((item) =>
          this.#tocNavMobile.appendChild(item.cloneNode(true)),
        );
      }
    }

    #setupScrollSpy() {
      // Create intersection observer to track active section
      const observerOptions = {
        root: null,
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      };

      this.#observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.#setActiveLink(entry.target.id);
          }
        });
      }, observerOptions);

      this.#headingElements.forEach((heading) => {
        this.#observer.observe(heading);
      });
    }

    #setActiveLink(id) {
      // Update desktop TOC
      if (this.#tocNav) {
        this.#tocNav.querySelectorAll("a").forEach((link) => {
          link.classList.remove("active");
          if (link.dataset.target === id) {
            link.classList.add("active");
          }
        });
      }

      // Update mobile TOC
      if (this.#tocNavMobile) {
        this.#tocNavMobile.querySelectorAll("a").forEach((link) => {
          link.classList.remove("active");
          if (link.dataset.target === id) {
            link.classList.add("active");
          }
        });
      }
    }

    #setupMobileToggle() {
      const toggle = document.getElementById("toc-toggle");
      const mobileToc = document.getElementById("toc-mobile");
      const chevron = document.getElementById("toc-chevron");

      if (toggle && mobileToc) {
        toggle.addEventListener("click", () => {
          mobileToc.classList.toggle("hidden");
          if (chevron) {
            const isHidden = mobileToc.classList.contains("hidden");
            chevron.style.transform = isHidden
              ? "rotate(0deg)"
              : "rotate(180deg)";
          }
        });
      }
    }
  }

  // ── Reading Time Manager ──────────────────────────────────────
  class ReadingTimeManager {
    #content;
    #readingTimeEl;
    #wordCountEl;

    constructor() {
      this.#content = document.getElementById("modul-content");
      this.#readingTimeEl = document.getElementById("reading-time");
      this.#wordCountEl = document.getElementById("word-count");

      if (this.#content) {
        this.#calculate();
      }
    }

    #calculate() {
      // Get text content excluding code blocks
      const text = this.#content.innerText || this.#content.textContent || "";

      // Count words (Indonesian/English approximation)
      const words = text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
      const wordCount = words.length;

      // Calculate reading time (average 200 words per minute)
      const wordsPerMinute = 200;
      const minutes = Math.ceil(wordCount / wordsPerMinute);

      // Update UI
      if (this.#readingTimeEl) {
        this.#readingTimeEl.textContent = `${minutes} menit baca`;
      }

      if (this.#wordCountEl) {
        this.#wordCountEl.textContent = `${wordCount.toLocaleString()} kata`;
      }
    }
  }

  // ── Scroll Manager ────────────────────────────────────────────
  class ScrollManager {
    #scrollTopBtn;

    constructor() {
      this.#scrollTopBtn = document.getElementById("scroll-top");
      this.#init();
    }

    #init() {
      // Scroll to top button
      if (this.#scrollTopBtn) {
        this.#scrollTopBtn.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      }

      // Show/hide scroll to top based on scroll position
      window.addEventListener("scroll", this.#handleScroll.bind(this), {
        passive: true,
      });
    }

    #handleScroll() {
      const scrollY = window.scrollY;

      if (this.#scrollTopBtn) {
        if (scrollY > 500) {
          this.#scrollTopBtn.classList.remove(
            "opacity-0",
            "pointer-events-none",
          );
          this.#scrollTopBtn.classList.add("opacity-100");
        } else {
          this.#scrollTopBtn.classList.add("opacity-0", "pointer-events-none");
          this.#scrollTopBtn.classList.remove("opacity-100");
        }
      }
    }
  }

  // ── Code Copy Manager ─────────────────────────────────────────
  class CodeCopyManager {
    #toast;

    constructor(toastManager) {
      this.#toast = toastManager;
      this.#init();
    }

    #init() {
      const blocks = document.querySelectorAll("#modul-content pre");
      blocks.forEach((pre) => this.#enhanceBlock(pre));
    }

    #enhanceBlock(pre) {
      pre.classList.add("relative", "group");

      const btn = document.createElement("button");
      btn.className =
        "btn btn-xs btn-ghost absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 copy-btn";
      btn.innerHTML = `${IconLib.copy}<span class="ml-1">Copy</span>`;
      btn.setAttribute("aria-label", "Copy code");

      btn.addEventListener("click", () => this.#handleCopy(pre, btn));
      pre.appendChild(btn);
    }

    async #handleCopy(pre, btn) {
      const code = pre.querySelector("code");
      const text = code?.textContent ?? pre.textContent;

      try {
        await navigator.clipboard.writeText(text);
        this.#showSuccess(btn);
        this.#toast.show("Kode berhasil disalin!", "success");
      } catch (err) {
        // Try fallback method
        const success = this.#fallbackCopy(text);
        if (success) {
          this.#showSuccess(btn);
          this.#toast.show("Kode berhasil disalin!", "success");
        } else {
          this.#toast.show("Gagal menyalin kode", "error");
        }
      }
    }

    #showSuccess(btn) {
      const original = btn.innerHTML;
      btn.innerHTML = `${IconLib.check}<span class="ml-1">Tersalin!</span>`;
      btn.classList.add("btn-success");

      setTimeout(() => {
        btn.innerHTML = original;
        btn.classList.remove("btn-success");
      }, 2000);
    }

    #fallbackCopy(text) {
      try {
        const ta = Object.assign(document.createElement("textarea"), {
          value: text,
          style: "position:fixed;opacity:0;left:-9999px;",
        });
        document.body.appendChild(ta);
        ta.select();
        const success = document.execCommand("copy");
        ta.remove();
        return success;
      } catch (err) {
        console.error("Fallback copy failed:", err);
        return false;
      }
    }
  }

  // ── Progress Manager ──────────────────────────────────────────
  class ProgressManager {
    #toast;
    #btn;
    #btnFloating;
    #slug;

    constructor(toastManager) {
      this.#toast = toastManager;
      this.#btn = document.getElementById("btn-complete");
      this.#btnFloating = document.getElementById("btn-complete-floating");

      if (this.#btn && !this.#btn.disabled) {
        this.#slug = this.#btn.dataset.slug;
        this.#init();
      }
    }

    #init() {
      this.#btn.addEventListener("click", () => this.#markComplete());

      // Also handle floating button if it exists
      if (this.#btnFloating && !this.#btnFloating.disabled) {
        this.#btnFloating.addEventListener("click", () => this.#markComplete());
      }
    }

    async #markComplete() {
      // Disable both buttons to prevent race condition
      this.#btn.disabled = true;
      this.#btn.innerHTML = `${IconLib.spinner}<span>Menyimpan...</span>`;

      if (this.#btnFloating) {
        this.#btnFloating.disabled = true;
        this.#btnFloating.innerHTML = `${IconLib.spinner}<span>Menyimpan...</span>`;
      }

      try {
        const response = await fetch(`/api/progress/${this.#slug}`, {
          method: "POST",
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          // Try to get error message from response
          let errorMsg = "Gagal menyimpan progress";
          try {
            const data = await response.json();
            if (data.error) {
              errorMsg = data.error;
            }
          } catch (e) {
            // Ignore JSON parse error
          }
          throw new Error(errorMsg);
        }

        this.#updateUI();
        this.#toast.show("Modul berhasil diselesaikan!", "success");

        // Trigger confetti effect
        this.#triggerConfetti();
      } catch (err) {
        this.#btn.disabled = false;
        this.#btn.innerHTML = `${IconLib.check}<span>Tandai Selesai</span>`;
        this.#toast.show(err.message || "Gagal menyimpan progress", "error");
        console.error(err);
      }
    }

    #updateUI() {
      // Update desktop button
      this.#btn.innerHTML = `${IconLib.checkCircle}<span>Modul Selesai</span>`;
      this.#btn.classList.remove("btn-primary");
      this.#btn.classList.add("btn-success");

      // Update floating button if exists
      if (this.#btnFloating) {
        this.#btnFloating.disabled = true;
        this.#btnFloating.innerHTML = `${IconLib.checkCircle}<span>Modul Selesai</span>`;
        this.#btnFloating.classList.remove("btn-primary");
        this.#btnFloating.classList.add("btn-success");
      }

      // Update sidebar
      const link = document.querySelector(`a[href="/slr-frontend/modul/${this.#slug}"]`);
      if (
        link &&
        !link.querySelector(".badge-success, [class*='text-success']")
      ) {
        const checkIcon = document.createElement("span");
        checkIcon.className =
          "flex-shrink-0 w-5 h-5 rounded-full bg-success/10 text-success flex items-center justify-center";
        checkIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>`;
        link.appendChild(checkIcon);
      }

      // Update progress ring
      const progressRing = document.getElementById("progress-ring");
      if (progressRing) {
        const currentText = progressRing.parentElement.querySelector(
          "span.text-xl, span.text-2xl",
        );
        if (currentText) {
          const current = parseInt(currentText.textContent) + 1;
          currentText.textContent = current;

          // Update ring
          const max = parseInt(
            progressRing.parentElement
              .querySelector("span.text-xs")
              .textContent.replace("/", ""),
          );
          const circumference = 283;
          const offset = circumference - (current / max) * circumference;
          progressRing.style.strokeDashoffset = offset;
        }
      }
    }

    #triggerConfetti() {
      // Simple CSS-based celebration
      const btn = this.#btn;
      btn.classList.add("animate-pulse");
      setTimeout(() => btn.classList.remove("animate-pulse"), 1000);
    }
  }

  // ── Syntax Highlight Manager ──────────────────────────────────
  class SyntaxHighlightManager {
    constructor() {
      if (typeof hljs !== "undefined") {
        this.#init();
      }
    }

    #init() {
      // Use IntersectionObserver for lazy highlighting
      const codeBlocks = document.querySelectorAll("pre code");

      if (codeBlocks.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              hljs.highlightElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "50px" },
      );

      codeBlocks.forEach((block) => observer.observe(block));
    }
  }

  // ── Theme Manager ─────────────────────────────────────────────
  class ThemeManager {
    #buttons;

    constructor() {
      this.#buttons = document.querySelectorAll(
        "#theme-toggle, #theme-toggle-mobile",
      );
      this.#init();
    }

    #init() {
      // Check for saved theme or system preference
      const savedTheme = localStorage.getItem("theme");
      const systemDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      if (savedTheme) {
        this.setTheme(savedTheme);
      } else if (systemDark) {
        this.setTheme("dark");
      }

      // Listen for system theme changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            this.setTheme(e.matches ? "dark" : "light");
          }
        });

      // Setup toggle buttons
      this.#buttons.forEach((btn) => {
        if (btn) {
          btn.addEventListener("click", () => this.toggle());
        }
      });
    }

    setTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      this.#updateIcons(theme);
    }

    toggle() {
      const current = document.documentElement.getAttribute("data-theme");
      const newTheme = current === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    }

    #updateIcons(theme) {
      // Update theme toggle icons
      this.#buttons.forEach((btn) => {
        if (btn) {
          btn.innerHTML = theme === "dark" ? IconLib.sun : IconLib.moon;
        }
      });
    }
  }

  // ── Sidebar Collapsible Manager ────────────────────────────────
  class SidebarCollapsibleManager {
    constructor() {
      this.init();
    }

    init() {
      const headers = document.querySelectorAll(".sidebar-section-header");

      headers.forEach((header) => {
        header.addEventListener("click", () => {
          const section = header.parentElement;
          section.classList.toggle("collapsed");

          // Save state to localStorage
          const sectionId = section.dataset.section;
          if (sectionId) {
            const isCollapsed = section.classList.contains("collapsed");
            localStorage.setItem(
              `sidebar-${sectionId}`,
              isCollapsed ? "collapsed" : "expanded",
            );
          }
        });

        // Restore state from localStorage
        const section = header.parentElement;
        const sectionId = section.dataset.section;
        if (sectionId) {
          const savedState = localStorage.getItem(`sidebar-${sectionId}`);
          if (savedState === "collapsed") {
            section.classList.add("collapsed");
          }
        }
      });
    }
  }

  // ── Module Search Manager ───────────────────────────────────────
  class ModuleSearchManager {
    #searchInput;
    #clearBtn;
    #moduleLinks;

    constructor() {
      this.#searchInput = document.getElementById("module-search");
      this.#clearBtn = document.getElementById("clear-search");

      if (this.#searchInput) {
        // Get all module links in sidebar
        this.#moduleLinks = document.querySelectorAll(
          "aside a[href^='/modul/']",
        );
        this.#init();
      }
    }

    #init() {
      // Search input event
      this.#searchInput.addEventListener("input", (e) => {
        this.#handleSearch(e.target.value);
      });

      // Clear button
      if (this.#clearBtn) {
        this.#clearBtn.addEventListener("click", () => {
          this.#searchInput.value = "";
          this.#handleSearch("");
          this.#searchInput.focus();
        });
      }

      // Keyboard shortcut: / to focus search
      document.addEventListener("keydown", (e) => {
        if (e.key === "/" && !this.#isInputFocused()) {
          e.preventDefault();
          this.#searchInput.focus();
        }
      });
    }

    #isInputFocused() {
      const tag = document.activeElement.tagName.toLowerCase();
      return (
        tag === "input" ||
        tag === "textarea" ||
        document.activeElement.isContentEditable
      );
    }

    #handleSearch(query) {
      const searchTerm = query.toLowerCase().trim();

      // Show/hide clear button
      if (this.#clearBtn) {
        this.#clearBtn.classList.toggle("hidden", !searchTerm);
      }

      // Filter module links
      this.#moduleLinks.forEach((link) => {
        const title = link.textContent.toLowerCase().trim();
        const isMatch = !searchTerm || title.includes(searchTerm);

        if (isMatch) {
          link.classList.remove("hidden");
        } else {
          link.classList.add("hidden");
        }
      });
    }
  }

  // ── Global Search Manager (Ctrl+K) ───────────────────────────────
  class GlobalSearchManager {
    #modal;
    #input;
    #results;
    #allModules;

    constructor(allModules = []) {
      this.#modal = document.getElementById("global-search-modal");
      this.#input = document.getElementById("global-search-input");
      this.#results = document.getElementById("search-results");
      this.#allModules = allModules;

      if (this.#modal && this.#input) {
        this.#init();
      }
    }

    #init() {
      // Keyboard shortcut: Ctrl+K or Cmd+K
      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "k") {
          e.preventDefault();
          this.#openModal();
        }
      });

      // Close on ESC
      this.#modal.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          this.#closeModal();
        }
      });

      // Search on input
      this.#input.addEventListener("input", (e) => {
        this.#performSearch(e.target.value);
      });

      // Keyboard navigation in results
      this.#input.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          this.#focusNext();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.#focusPrev();
        } else if (e.key === "Enter") {
          e.preventDefault();
          this.#selectFocused();
        }
      });
    }

    #openModal() {
      this.#modal.showModal();
      this.#input.focus();
      this.#input.value = "";
      this.#results.innerHTML = `
        <div class="text-center py-8 text-base-content/50">
          <p>Mulai mengetik untuk mencari...</p>
        </div>
      `;
    }

    #closeModal() {
      this.#modal.close();
    }

    #performSearch(query) {
      const searchTerm = query.toLowerCase().trim();

      if (!searchTerm) {
        this.#results.innerHTML = `
          <div class="text-center py-8 text-base-content/50">
            <p>Mulai mengetik untuk mencari...</p>
          </div>
        `;
        return;
      }

      // Search in modules
      const results = this.#allModules
        .filter(
          (m) =>
            m.title.toLowerCase().includes(searchTerm) ||
            m.description?.toLowerCase().includes(searchTerm),
        )
        .slice(0, 10);

      if (results.length === 0) {
        this.#results.innerHTML = `
          <div class="text-center py-8 text-base-content/50">
            <p>Tidak ada hasil untuk "${searchTerm}"</p>
          </div>
        `;
        return;
      }

      this.#results.innerHTML = results
        .map(
          (m, i) => `
        <a href="/slr-frontend/modul/${m.slug}" class="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors ${i === 0 ? "bg-base-200" : ""}" data-index="${i}">
          <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary">${m.icon || "school"}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">${m.title}</p>
            <p class="text-xs text-base-content/60 truncate">${m.description || ""}</p>
          </div>
          <kbd class="kbd kbd-xs hidden sm:inline-block">↵</kbd>
        </a>
      `,
        )
        .join("");

      // Add click handlers
      this.#results.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => this.#closeModal());
      });
    }

    #focusNext() {
      const items = this.#results.querySelectorAll("[data-index]");
      const current = document.activeElement;
      let idx = Array.from(items).indexOf(current);
      if (idx === -1) idx = 0;
      else idx = (idx + 1) % items.length;
      items[idx]?.focus();
    }

    #focusPrev() {
      const items = this.#results.querySelectorAll("[data-index]");
      const current = document.activeElement;
      let idx = Array.from(items).indexOf(current);
      if (idx === -1) idx = 0;
      else idx = (idx - 1 + items.length) % items.length;
      items[idx]?.focus();
    }

    #selectFocused() {
      const focused = document.activeElement;
      if (focused.tagName === "A") {
        window.location.href = focused.href;
      }
    }
  }

  // ── Reading Progress Bar Manager ─────────────────────────────────
  class ReadingProgressManager {
    #progressBar;
    #progressFill;

    constructor() {
      this.#progressBar = document.getElementById("reading-progress");
      this.#progressFill = this.#progressBar?.querySelector(".transition-all");

      if (this.#progressBar) {
        this.#init();
      }
    }

    #init() {
      window.addEventListener("scroll", () => this.#updateProgress(), {
        passive: true,
      });
      this.#updateProgress();
    }

    #updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progress > 5) {
        this.#progressBar.classList.remove("hidden");
      } else {
        this.#progressBar.classList.add("hidden");
      }

      if (this.#progressFill) {
        this.#progressFill.style.width = `${progress}%`;
      }
    }
  }

  // ── Bookmark Manager ─────────────────────────────────────────────
  class BookmarkManager {
    #btn;
    #toast;
    #slug;

    constructor(toastManager) {
      this.#btn = document.getElementById("btn-bookmark");
      this.#toast = toastManager;

      if (this.#btn) {
        this.#slug = document.querySelector("[data-slug]")?.dataset.slug;
        this.#init();
      }
    }

    #init() {
      // Check if already bookmarked
      this.#updateIcon();

      this.#btn.addEventListener("click", () => this.#toggleBookmark());
    }

    #updateIcon() {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      const isBookmarked = bookmarks.includes(this.#slug);

      if (isBookmarked) {
        this.#btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-warning" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span class="text-warning">Tersimpan</span>
        `;
      } else {
        this.#btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
          <span>Bookmark</span>
        `;
      }
    }

    #toggleBookmark() {
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
      const idx = bookmarks.indexOf(this.#slug);

      if (idx > -1) {
        bookmarks.splice(idx, 1);
        this.#toast.show("Bookmark dihapus", "info");
      } else {
        bookmarks.push(this.#slug);
        this.#toast.show("Modul disimpan ke bookmark!", "success");
      }

      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      this.#updateIcon();
    }
  }

  // ── PDF Export Manager ───────────────────────────────────────────
  class PDFExportManager {
    #btn;

    constructor() {
      this.#btn = document.getElementById("btn-pdf-export");

      if (this.#btn) {
        this.#init();
      }
    }

    #init() {
      this.#btn.addEventListener("click", () => this.#exportPDF());
    }

    async #exportPDF() {
      // Use browser print with PDF printer
      this.#btn.disabled = true;
      this.#btn.innerHTML = `
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Membuat PDF...</span>
      `;

      // Trigger print dialog
      window.print();

      setTimeout(() => {
        this.#btn.disabled = false;
        this.#btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>PDF</span>
        `;
      }, 2000);
    }
  }

  // ── App Initialization ────────────────────────────────────────
  class SLRApp {
    #toast;
    #modules = [];

    constructor() {
      this.#toast = new ToastManager();
    }

    init() {
      // Check if we're on a module page (has modul-content element)
      const isModulePage = document.getElementById("modul-content") !== null;

      // Get nav data from server (injected in template)
      const navData = window.__NAV_DATA__ || [];

      // Initialize all modules
      this.#modules.push(
        new TOCManager(),
        new ReadingTimeManager(),
        new ScrollManager(),
        new SyntaxHighlightManager(),
        new CodeCopyManager(this.#toast),
        new ProgressManager(this.#toast),
        new ThemeManager(),
        new SidebarCollapsibleManager(),
        new ModuleSearchManager(),
        new GlobalSearchManager(navData), // Modules loaded from server
        new ReadingProgressManager(),
        new BookmarkManager(this.#toast),
        new PDFExportManager(),
      );

      // Show welcome toast on first visit ONLY on module pages
      if (isModulePage && !sessionStorage.getItem("visited")) {
        this.#toast.show("Selamat datang di SLR AI Guide!", "info", 5000);
        sessionStorage.setItem("visited", "true");
      }

      console.log("SLR AI Guide initialized");
    }
  }

  // ── Bootstrap ─────────────────────────────────────────────────
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => new SLRApp().init());
  } else {
    new SLRApp().init();
  }
})();
