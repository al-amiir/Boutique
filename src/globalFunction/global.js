import anime from "animejs/lib/anime.es.js";

export function addToCartAnimation() {
  anime
    .timeline({ loop: false })
    .add({
      targets: ".ml5",
      opacity: [0.5, 1],
      easing: "easeInOutExpo",
      duration: 200,
      width: ["0vw", "90vw"],
    })
    .add({
      targets: ".ml5 .line",
      opacity: [0.5, 1],
      scaleX: [0, 1],
      easing: "easeInOutExpo",
      duration: 200,
    })
    .add({
      targets: ".ml5 .line",
      duration: 300,
      easing: "easeOutExpo",
      translateY: (el, i) => -0.625 + 0.625 * 2 * i + "em",
    })
    .add({
      targets: ".ml5 .ampersand",
      opacity: [0, 1],
      scaleY: [0.5, 1],
      easing: "easeOutExpo",
      duration: 200,
    })
    .add({
      targets: ".ml5 .letters-left",
      opacity: [0, 1],
      translateX: ["0.5em", 0],
      easing: "easeOutExpo",
      duration: 200,
    })
    .add({
      targets: ".ml5 .letters-right",
      opacity: [0, 1],
      translateX: ["-0.5em", 0],
      easing: "easeOutExpo",
      duration: 200,
    })
    .add({
      targets: ".ml5",
      opacity: [1, 0],
      duration: 100,
      easing: "easeOutExpo",
      delay: 1000,
    })
    .add({
      targets: ".ml5 .line",
      duration: 10,
      easing: "easeOutExpo",
      translateY: (el, i) => +0 + "em",
    })
    .add({
      targets: ".ml5",
      easing: "linear",
      duration: 10,
      width: ["100vw", "0vw"],
    });
}
