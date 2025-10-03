// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Mouse follower effect
  const mouseLight = document.getElementById("mouseLight");
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (mouseLight) {
      mouseLight.style.left = mouseX - 192 + "px";
      mouseLight.style.top = mouseY - 192 + "px";
    }
  });

  // 3D tilt effect on hero content
  const heroContent = document.getElementById("heroContent");

  if (heroContent) {
    document.addEventListener("mousemove", function (e) {
      const xAxis = (window.innerWidth / 2 - e.clientX) / 100;
      const yAxis = (window.innerHeight / 2 - e.clientY) / 100;

      heroContent.style.transform = `perspective(1000px) rotateX(${yAxis}deg) rotateY(${-xAxis}deg)`;
    });
  }

  // Generate animated particles

  // Trigger entrance animations
  setTimeout(function () {
    const badge = document.getElementById("heroBadge");
    const title = document.getElementById("heroTitle");
    const subtitle = document.getElementById("heroSubtitle");
    const buttons = document.getElementById("heroButtons");

    if (badge) badge.style.opacity = "1";
    if (title) title.style.opacity = "1";
    if (subtitle) subtitle.style.opacity = "1";
    if (buttons) buttons.style.opacity = "1";
  }, 100);

  // Button click ripple effect
  const buttons = document.querySelectorAll(".btn-hero");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      ripple.className = "click-ripple";

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      button.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add click ripple styles
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .click-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyle);

  // Smooth scroll for internal links (if any)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Performance optimization: pause animations when page is not visible
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      document.body.style.animationPlayState = "paused";
    } else {
      document.body.style.animationPlayState = "running";
    }
  });
});
