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

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");

  const closeMenu = () => {
    navigation.classList.remove("nav-open");
    menuButton.classList.remove("is-open");
    document.body.classList.remove("nav-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  };

  menuButton.addEventListener("click", () => {

    const isOpen =
      navigation.classList.toggle("nav-open");

    menuButton.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);

    menuButton.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });

  navigation
    .querySelectorAll("a")
    .forEach(link => {
      link.addEventListener("click", closeMenu);
    });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
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
  /* =====================================================
     CAREERS
  ===================================================== */

  const careerForm =
    document.getElementById("career-form");

  const careerPosition =
    document.getElementById("career-position");

  const careerResume =
    document.getElementById("career-resume");

  const careerFileName =
    document.getElementById("career-file-name");

  const careerMessage =
    document.getElementById("career-form-message");

  const careerSubmit =
    document.getElementById("career-submit");

  const careerApplication =
    document.getElementById("career-application");


  /* Hide jobs marked inactive */

  document
    .querySelectorAll(".career-job-card")
    .forEach(card => {

      if (card.dataset.active === "false") {
        card.style.display = "none";
      }

    });


  /* Apply Now buttons */

  document
    .querySelectorAll(".career-apply-position")
    .forEach(button => {

      button.addEventListener("click", () => {

        const position =
          button.dataset.applyPosition;

        if (careerPosition && position) {
          careerPosition.value = position;
        }

        if (careerApplication) {

          careerApplication.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      });

    });


  /* Resume filename + browser-side validation */

  if (careerResume) {

    careerResume.addEventListener(
      "change",
      () => {

        const file =
          careerResume.files[0];

        if (!file) {

          if (careerFileName) {
            careerFileName.textContent =
              "Choose your résumé";
          }

          return;
        }


        const allowedExtensions =
          ["pdf", "doc", "docx"];

        const extension =
          file.name
            .split(".")
            .pop()
            .toLowerCase();


        if (
          !allowedExtensions.includes(extension)
        ) {

          careerResume.value = "";

          if (careerFileName) {
            careerFileName.textContent =
              "Choose your résumé";
          }

          showCareerMessage(
            "Please upload your résumé as a PDF, DOC or DOCX file.",
            "error"
          );

          return;
        }


        const maxSize =
          5 * 1024 * 1024;


        if (file.size > maxSize) {

          careerResume.value = "";

          if (careerFileName) {
            careerFileName.textContent =
              "Choose your résumé";
          }

          showCareerMessage(
            "Your résumé is too large. Please upload a file smaller than 5 MB.",
            "error"
          );

          return;
        }


        if (careerFileName) {
          careerFileName.textContent =
            file.name;
        }


        clearCareerMessage();

      }
    );

  }


  /* Message helpers */

  function showCareerMessage(
    message,
    type
  ) {

    if (!careerMessage) return;

    careerMessage.textContent =
      message;

    careerMessage.className =
      "career-form-message " +
      (
        type === "success"
          ? "is-success"
          : "is-error"
      );

  }


  function clearCareerMessage() {

    if (!careerMessage) return;

    careerMessage.textContent = "";

    careerMessage.className =
      "career-form-message";

  }


  /* Form submission */

  if (careerForm) {

    careerForm.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        clearCareerMessage();


        if (!careerForm.checkValidity()) {

          careerForm.reportValidity();

          return;

        }


        const honeypot =
          document.getElementById(
            "career-company"
          );


        /* Silent success for simple bots */

        if (
          honeypot &&
          honeypot.value.trim() !== ""
        ) {

          careerForm.reset();

          showCareerMessage(
            "Thank you. Your application has been received.",
            "success"
          );

          return;

        }


        const resume =
          careerResume
            ? careerResume.files[0]
            : null;


        if (!resume) {

          showCareerMessage(
            "Please attach your résumé before submitting.",
            "error"
          );

          return;

        }


        const allowedExtensions =
          ["pdf", "doc", "docx"];

        const extension =
          resume.name
            .split(".")
            .pop()
            .toLowerCase();


        if (
          !allowedExtensions.includes(extension)
        ) {

          showCareerMessage(
            "Only PDF, DOC and DOCX résumés are accepted.",
            "error"
          );

          return;

        }


        if (
          resume.size >
          5 * 1024 * 1024
        ) {

          showCareerMessage(
            "Your résumé must be smaller than 5 MB.",
            "error"
          );

          return;

        }


        if (careerSubmit) {

          careerSubmit.disabled = true;

          careerSubmit
            .querySelector("span")
            .textContent =
            "Sending Application...";

        }


        try {

          const formData =
            new FormData(careerForm);


          /*
             BACKEND ENDPOINT

             We will replace this URL in the
             next step after creating the
             secure serverless function.
          */

          const response =
            await fetch(
  "https://aamas-kitchen-careers.aamaskitchen-nyc.workers.dev",
  {
    method: "POST",
    body: formData
  }
);


          if (!response.ok) {

            throw new Error(
              "Application submission failed."
            );

          }


          careerForm.reset();


          if (careerFileName) {

            careerFileName.textContent =
              "Choose your résumé";

          }


          showCareerMessage(
            "Application received! Thank you for your interest in joining Aama's Kitchen. Our team will review your application and contact you if your experience matches one of our opportunities.",
            "success"
          );


        } catch (error) {

          console.error(
            "Career form error:",
            error
          );


          showCareerMessage(
            "We couldn't submit your application right now. Please try again, or call Aama's Kitchen at (347) 808-9595 for assistance.",
            "error"
          );

        } finally {

          if (careerSubmit) {

            careerSubmit.disabled = false;

            careerSubmit
              .querySelector("span")
              .textContent =
              "Submit Application";

          }

        }

      }
    );

  }
});
