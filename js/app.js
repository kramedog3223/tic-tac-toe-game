import View from "./view.js";
import Store from "./store.js";

// window.addEventListener("load", App.init);

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];
function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  // current tab state changes
  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  //different tab state changes
  window.addEventListener("storage", () => {
    console.log("state changed from another tab");
    view.render(store.game, store.stats);
  });

  //first load of doc
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
  });

  view.bindPlayerMOveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    //advance to next state by pushing moves to moves array
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
