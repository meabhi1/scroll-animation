
gsap.registerPlugin(ScrollTrigger);

const car = document.getElementById("car");
const trail = document.getElementById("trail");
const letters = gsap.utils.toArray(".value-letter");
const boxes = gsap.utils.toArray(".text-box");

// Dynamic sizes
let carWidth = car.offsetWidth;
let endX = window.innerWidth - carWidth - 50;

// 🚗 MAIN ANIMATION
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top top",
    end: "bottom top",
    scrub: 1.5,
    pin: ".track",
  }
});

tl.to(car, {
  x: endX,
  ease: "none",
  onUpdate: () => {
    let carX = gsap.getProperty(car, "x") + carWidth / 2;

    // LETTER REVEAL
    letters.forEach((letter) => {
      let rect = letter.getBoundingClientRect();
      if (carX >= rect.left) {
        gsap.to(letter, { opacity: 1, duration: 0.2 });
      }
    });

    // TRAIL
    gsap.set(trail, {
      width: carX
    });
  }
});

// INITIAL TEXT ANIMATION
gsap.from(letters, {
  opacity: 0,
  y: 20,
  stagger: 0.05,
  duration: 0.8,
  ease: "power3.out"
});

// STATS ANIMATION
boxes.forEach((box, i) => {
  gsap.to(box, {
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: ".section",
      start: `top+=${400 + i * 200} top`,
      end: `top+=${500 + i * 200} top`,
      scrub: true
    }
  });
});