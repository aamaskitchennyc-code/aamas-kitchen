document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     FOOTER YEAR
  ===================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================================
     HEADER SCROLL EFFECT
  ===================================================== */

  const header = document.querySelector(".site-header");

  const updateHeader = () => {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const menuButton =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".nav");

  if (menuButton && navigation) {

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );

    menuButton.setAttribute(
      "aria-label",
      "Open navigation"
    );


    const closeMenu = () => {

      navigation.classList.remove("nav-open");

      menuButton.textContent = "☰";

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      menuButton.setAttribute(
        "aria-label",
        "Open navigation"
      );

    };


    menuButton.addEventListener(
      "click",
      () => {

        const open =
          navigation.classList.toggle(
            "nav-open"
          );

        if (open) {

          menuButton.textContent = "✕";

          menuButton.setAttribute(
            "aria-expanded",
            "true"
          );

          menuButton.setAttribute(
            "aria-label",
            "Close navigation"
          );

        } else {

          closeMenu();

        }

      }
    );


    navigation
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          closeMenu
        );

      });


    document.addEventListener(
      "keydown",
      event => {

        if (event.key === "Escape") {
          closeMenu();
        }

      }
    );

  }


  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".feature-grid article, " +
      ".menu-card-item, " +
      ".visit-card, " +
      ".section-heading, " +
      ".lead"
    );


  if (
    "IntersectionObserver" in window &&
    revealElements.length > 0
  ) {

    revealElements.forEach(element => {

      element.classList.add(
        "pre-reveal"
      );

    });


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.08,

          rootMargin:
            "0px 0px -30px 0px"
        }
      );


    revealElements.forEach(element => {

      observer.observe(element);

    });

  }


  /* =====================================================
     CLOSE MOBILE MENU WHEN SCREEN GETS WIDER
  ===================================================== */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 850 &&
        navigation &&
        menuButton
      ) {

        navigation.classList.remove(
          "nav-open"
        );

        menuButton.textContent = "☰";

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );

});
