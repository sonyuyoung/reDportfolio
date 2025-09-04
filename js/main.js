/* ===================================================================
 * Mueller 1.0.0 - Main JS (safe version)
 * --------------------------------------------------------------- */
(function (html) {
  "use strict";

  /* ---------- Skills: observer & percentage position ---------- */
  const spans = document.querySelectorAll(".bar span");
  const percentages = document.querySelectorAll(".percentage");
  const skillContainer = document.querySelector(".skills-container");

  if (skillContainer && (spans.length || percentages.length)) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!spans.length && !percentages.length) return;
        if (entry.isIntersecting) {
          spans.forEach((s) => s.classList.add("animate"));
          percentages.forEach((p) => p.classList.add("animate"));
        } else {
          spans.forEach((s) => s.classList.remove("animate"));
          percentages.forEach((p) => p.classList.remove("animate"));
        }
      });
    });
    observer.observe(skillContainer);
  }

  function updatePercentagePositions() {
    const percEls = document.querySelectorAll(".percentage");
    if (!percEls.length) return;
    percEls.forEach((percentage) => {
      const bar = percentage.parentElement?.querySelector(".bar");
      if (!bar) return;
      const barWidth = bar.clientWidth || 0;
      const widthPercentage = parseFloat(percentage.textContent) / 100 || 0;
      percentage.style.left = `${barWidth * widthPercentage - 12.5}px`;
    });
  }
  updatePercentagePositions();

  /* ---------- Preloader ---------- */
  const ssPreloader = function () {
    const siteBody = document.querySelector("body");
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    html.classList.add("ss-preload");

    window.addEventListener("load", function () {
      html.classList.remove("ss-preload");
      html.classList.add("ss-loaded");

      preloader.addEventListener("transitionend", function afterTransition(e) {
        if (e.target.matches("#preloader")) {
          siteBody.classList.add("ss-show");
          e.target.style.display = "none";
          preloader.removeEventListener(e.type, afterTransition);
        }
      });
    });
  };

  /* ---------- Sticky header ---------- */
  const ssMoveHeader = function () {
    const hdr = document.querySelector(".s-header");
    const hero = document.querySelector("#intro");
    if (!(hdr && hero)) return;

    let triggerHeight;
    setTimeout(function () {
      triggerHeight = hero.offsetHeight - 170;
    }, 300);

    window.addEventListener("scroll", function () {
      const loc = window.scrollY;

      if (loc > triggerHeight) hdr.classList.add("sticky");
      else hdr.classList.remove("sticky");

      if (loc > triggerHeight + 20) hdr.classList.add("offset");
      else hdr.classList.remove("offset");

      if (loc > triggerHeight + 150) hdr.classList.add("scrolling");
      else hdr.classList.remove("scrolling");
    });
  };

  /* ---------- Mobile menu ---------- */
  const ssMobileMenu = function () {
    const toggleButton = document.querySelector(".s-header__menu-toggle");
    const mainNavWrap = document.querySelector(".s-header__nav");
    const siteBody = document.querySelector("body");
    if (!(toggleButton && mainNavWrap)) return;

    toggleButton.addEventListener("click", function (e) {
      e.preventDefault();
      toggleButton.classList.toggle("is-clicked");
      siteBody.classList.toggle("menu-is-open");
    });

    mainNavWrap.querySelectorAll(".s-header__nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 800px)").matches) {
          toggleButton.classList.toggle("is-clicked");
          siteBody.classList.toggle("menu-is-open");
        }
      });
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 801px)").matches) {
        siteBody.classList.remove("menu-is-open");
        toggleButton.classList.remove("is-clicked");
      }
    });
  };

  /* ---------- ScrollSpy (safe) ---------- */
  const ssScrollSpy = function () {
    const sections = document.querySelectorAll(".target-section");
    if (!sections.length) return;

    function navHighlight() {
      const scrollY = window.pageYOffset;
      sections.forEach(function (current) {
        const sectionHeight = current.offsetHeight || 0;
        const sectionTop = (current.offsetTop || 0) - 50;
        const sectionId = current.getAttribute("id");
        if (!sectionId) return;

        // 정확 매칭: href="#sectionId"
        const link = document.querySelector(`.s-header__nav a[href="#${sectionId}"]`);
        if (!link || !link.parentNode) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.parentNode.classList.add("current");
        } else {
          link.parentNode.classList.remove("current");
        }
      });
    }

    window.addEventListener("scroll", navHighlight);
    navHighlight(); // 초기 1회
  };

  /* ---------- Masonry ---------- */
  const ssMasonry = function () {
    const containerBricks = document.querySelector(".bricks-wrapper");
    if (!containerBricks || typeof imagesLoaded !== "function" || typeof Masonry !== "function") return;

    imagesLoaded(containerBricks, function () {
      new Masonry(containerBricks, {
        itemSelector: ".entry",
        columnWidth: ".grid-sizer",
        percentPosition: true,
        resize: true,
      });
    });
  };

  const ssMasonry2 = function () {
    const containerBricks = document.querySelector(".bricks-wrapper2");
    if (!containerBricks || typeof imagesLoaded !== "function" || typeof Masonry !== "function") return;

    imagesLoaded(containerBricks, function () {
      new Masonry(containerBricks, {
        itemSelector: ".entry2",
        columnWidth: ".grid-sizer2",
        percentPosition: true,
        resize: true,
      });
    });
  };

  /* ---------- Swiper ---------- */
  const ssSwiper = function () {
    if (typeof Swiper !== "function") return;
    const sliderEl = document.querySelector(".s-testimonials__slider");
    if (!sliderEl) return;

    new Swiper(".s-testimonials__slider", {
      slidesPerView: 1,
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        401: { slidesPerView: 1, spaceBetween: 20 },
        801: { slidesPerView: 2, spaceBetween: 50 },
        1181: { slidesPerView: 2, spaceBetween: 100 },
      },
    });

    document.querySelectorAll(".s-testimonials__slide a").forEach((link) => {
      link.addEventListener("click", (e) => e.stopPropagation());
    });
  };

  /* ---------- Mailchimp ---------- */
  const ssMailChimpForm = function () {
    const mcForm = document.querySelector("#mc-form");
    if (!mcForm) return;

    mcForm.setAttribute("novalidate", true);

    function hasError(field) {
      if (
        field.disabled ||
        field.type === "file" ||
        field.type === "reset" ||
        field.type === "submit" ||
        field.type === "button"
      )
        return;

      const validity = field.validity;
      if (validity.valid) return;
      if (validity.valueMissing) return "Please enter an email address.";
      if (validity.typeMismatch && field.type === "email")
        return "Please enter a valid email address.";
      if (validity.patternMismatch) return field.getAttribute("title") || "Please match the requested format.";
      return "The value you entered for this field is invalid.";
    }

    function showError(field, error) {
      const errorMessage = field.form.querySelector(".mc-status");
      if (!errorMessage) return;
      errorMessage.classList.remove("success-message");
      errorMessage.classList.add("error-message");
      errorMessage.innerHTML = error;
    }

    window.displayMailChimpStatus = function (data) {
      if (!data.result || !data.msg || !window.mcStatus) return;
      window.mcStatus.innerHTML = data.msg;
      if (data.result === "error") {
        window.mcStatus.classList.remove("success-message");
        window.mcStatus.classList.add("error-message");
      } else {
        window.mcStatus.classList.remove("error-message");
        window.mcStatus.classList.add("success-message");
      }
    };

    function submitMailChimpForm(form) {
      const urlBase = (window.cfg && window.cfg.mailChimpURL) || "";
      const emailField = form.querySelector("#mce-EMAIL");
      if (!urlBase || !emailField) return;

      let url = urlBase.replace("/post?u=", "/post-json?u=");
      url += "&" + encodeURIComponent(emailField.name) + "=" + encodeURIComponent(emailField.value) + "&c=displayMailChimpStatus";

      const ref = window.document.getElementsByTagName("script")[0];
      const script = window.document.createElement("script");
      script.src = url;

      window.mcStatus = form.querySelector(".mc-status");
      if (window.mcStatus) {
        window.mcStatus.classList.remove("error-message", "success-message");
        window.mcStatus.innerText = "Submitting...";
      }

      ref.parentNode.insertBefore(script, ref);
      script.onload = function () { this.remove(); };
    }

    mcForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const emailField = event.target.querySelector("#mce-EMAIL");
      const error = hasError(emailField);
      if (error) {
        showError(emailField, error);
        emailField.focus();
        return;
      }
      submitMailChimpForm(this);
    }, false);
  };

  /* ---------- Lightbox ---------- */
  const ssLightbox = function () {
    const videoLink = document.querySelector(".s-intro__content-video-btn");
    if (videoLink) {
      videoLink.addEventListener("click", function (e) {
        const vLink = this.getAttribute("href");
        const iframe = "<iframe src='" + vLink + "' frameborder='0'></iframe>";
        e.preventDefault();
        const instance = basicLightbox.create(iframe);
        instance.show();
      });
    }

    const folioLinks = document.querySelectorAll(".brick .entry__link ");
    if (!folioLinks.length) return;

    const modals = [];
    folioLinks.forEach(function (link) {
      const modalbox = link.getAttribute("href");
      const modalEl = document.querySelector(modalbox);
      if (!modalEl || typeof basicLightbox === "undefined") return;
      const instance = basicLightbox.create(modalEl, {
        onShow: function (inst) {
          document.addEventListener("keydown", function (event) {
            if ((event || window.event).key === "Escape") inst.close();
          });
        },
      });
      modals.push(instance);
    });

    folioLinks.forEach(function (link, index) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        if (modals[index]) modals[index].show();
      });
    });
  };

  /* ---------- Alert boxes ---------- */
  const ssAlertBoxes = function () {
    const boxes = document.querySelectorAll(".alert-box");
    if (!boxes.length) return;
    boxes.forEach(function (box) {
      box.addEventListener("click", function (event) {
        if (event.target.matches(".alert-box__close")) {
          event.stopPropagation();
          event.target.parentElement.classList.add("hideit");
          setTimeout(function () { box.style.display = "none"; }, 500);
        }
      });
    });
  };

  /* ---------- Back to Top ---------- */
  const ssBackToTop = function () {
    const pxShow = 900;
    const goTopButton = document.querySelector(".ss-go-top");
    if (!goTopButton) return;

    if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");
    window.addEventListener("scroll", function () {
      if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");
      else goTopButton.classList.remove("link-is-visible");
    });
  };

  /* ---------- Smooth scroll ---------- */
  const ssMoveTo = function () {
    if (typeof MoveTo !== "function") return;
    const triggers = document.querySelectorAll(".smoothscroll");
    if (!triggers.length) return;

    const easeFunctions = {
      easeInQuad: (t, b, c, d) => (c * (t /= d) * t + b),
      easeOutQuad: (t, b, c, d) => (-c * (t /= d) * (t - 2) + b),
      easeInOutQuad: (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      },
      easeInOutCubic: (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t * t + b;
        t -= 2;
        return (c / 2) * (t * t * t + 2) + b;
      },
    };

    const moveTo = new MoveTo(
      { tolerance: 0, duration: 1200, easing: "easeInOutCubic", container: window },
      easeFunctions
    );

    triggers.forEach((trigger) => moveTo.registerTrigger(trigger));
  };

  /* ---------- Init ---------- */
  (function ssInit() {
    ssPreloader();
    ssMoveHeader();
    ssMobileMenu();
    ssScrollSpy();
    ssMasonry();
    ssMasonry2();
    ssSwiper();
    ssMailChimpForm();
    ssLightbox();
    ssAlertBoxes();
    ssBackToTop();
    ssMoveTo();
  })();
})(document.documentElement);
