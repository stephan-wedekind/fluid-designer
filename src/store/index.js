import { createStore } from "vuex";

const initialState = {
  isImage: false,
  isPattern: false,
  activeItem: "",
  items: [
    { id: "style", label: "Style", position: 0 },
    { id: "text", label: "Text", position: 3 },
  ],

  //Style Auswahl
  classicPossible: false,

  styleClassic: false,
  styleOverlay: false,
  stylePattern: false,

  //Pattern Auswahl
  patternMirror: true,
  patternStripe: false,
  patternRandom: false,

  //Pattern Filled?
  patternFilled: false,

  //Pattern Shapes

  isCircle: true,
  isRectangle: true,
  isTriangle: true,

  //Canvas Size
  canvasWidth: 0,
  canvasHeight: 0,
};

export default createStore({
  state: { ...initialState },
  mutations: {
    setIsImage(state, value) {
      state.isImage = value;
    },
    setIsPattern(state, value) {
      state.isPattern = value;
    },
    addItem(state, item) {
      state.items.push(item);
    },
    removeItem(state, itemId) {
      const index = state.items.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        state.items.splice(index, 1);
      }
    },
    setActiveItem(state, itemId) {
      state.activeItem = itemId;
    },
    resetState(state) {
      state.isImage = initialState.isImage;
      state.isPattern = initialState.isPattern;
      state.activeItem = initialState.activeItem;
      state.styleClassic = initialState.stateClassic;
      state.styleOverlay = initialState.stateOverlay;
      state.stylePattern = initialState.statePattern;
      state.items = [
        { id: "style", label: "Style", position: 0 },
        { id: "text", label: "Text", position: 3 },
      ];
    },

    //Style Auswahl
    setClassicPossible(state, value) {
      state.classicPossible = value;
    },
    setStyleClassic(state, value) {
      state.styleClassic = value;
    },
    setStyleOverlay(state, value) {
      state.styleOverlay = value;
    },
    setStylePattern(state, value) {
      state.stylePattern = value;
    },

    //Pattern Auswahl

    setSelectedPattern(state, text) {
      state.selectedPattern = text;
    },

    setPatternMirror(state, value) {
      state.patternMirror = value;
    },
    setPatternStripe(state, value) {
      state.patternStripe = value;
    },
    setPatternRandom(state, value) {
      state.patternRandom = value;
    },

    //Pattern Fillded?

    setPatternFilled(state, value) {
      state.patternFilled = value;
    },

    //Pattern Shapes

    setIsCircle(state, value) {
      state.isCircle = value;
    },
    setIsRectangle(state, value) {
      state.isRectangle = value;
    },
    setIsTriangle(state, value) {
      state.isTriangle = value;
    },

    //Canvas Size

    setCanvasWidth(state, number) {
      state.canvasWidth = number;
    },
    setCanvasHeight(state, number) {
      state.canvasHeight = number;
    },
  },
  actions: {
    addBild({ commit, state }) {
      if (!state.isImage) {
        if (state.items.find((item) => item.id === "pattern")) {
          commit("removeItem", "pattern");
        }
        if (!state.items.find((item) => item.id === "bild")) {
          commit("addItem", { id: "bild", label: "Bild", position: 1 });
          state.items.sort((a, b) => a.position - b.position);
        }

        commit("setIsImage", true);
        commit("setIsPattern", false);
      }
    },
    addPattern({ commit, state }) {
      if (!state.isPattern) {
        if (state.items.find((item) => item.id === "bild")) {
          commit("removeItem", "bild");
        }
        if (!state.items.find((item) => item.id === "pattern")) {
          commit("addItem", { id: "pattern", label: "Pattern", position: 2 });
          state.items.sort((a, b) => a.position - b.position);
        }

        commit("setIsPattern", true);
        commit("setIsImage", false);
      }
    },
    resetStore({ commit }) {
      commit("resetState");
    },

    //Style Auswahl
    changeStyle({ commit }, style) {
      if (style === "style01") {
        commit("setStyleClassic", true);
        commit("setStyleOverlay", false);
        commit("setStylePattern", false);
      } else if (style === "style02") {
        commit("setStyleClassic", false);
        commit("setStyleOverlay", true);
        commit("setStylePattern", false);
      } else if (style === "style03") {
        commit("setStyleClassic", false);
        commit("setStyleOverlay", false);
        commit("setStylePattern", true);
      }
    },

    // Pattern Auswahl

    changePattern({ commit }, pattern) {
      if (pattern === "mirror") {
        commit("setPatternMirror", true);
        commit("setPatternStripe", false);
        commit("setPatternRandom", false);
      } else if (pattern === "stripe") {
        commit("setPatternMirror", false);
        commit("setPatternStripe", true);
        commit("setPatternRandom", false);
      } else if (pattern === "random") {
        commit("setPatternMirror", false);
        commit("setPatternStripe", false);
        commit("setPatternRandom", true);
      }
    },

    // Pattern Filled?

    patternFill({ commit }, choice) {
      if (choice === "fill") {
        commit("setPatternFilled", true);
      } else if (choice === "outline") {
        commit("setPatternFilled", false);
      }
    },

    // Pattern Shapes

    handleCircle({ commit, state }) {
      if (state.isCircle) {
        commit("setIsCircle", false);
      } else {
        commit("setIsCircle", true);
      }
    },
    handleRectangle({ commit, state }) {
      if (state.isRectangle) {
        commit("setIsRectangle", false);
      } else {
        commit("setIsRectangle", true);
      }
    },

    handleTriangle({ commit, state }) {
      if (state.isTriangle) {
        commit("setIsTriangle", false);
      } else {
        commit("setIsTriangle", true);
      }
    },

    updateCanvasSize({ commit }, { w, h }) {
      commit("setCanvasWidth", w);
      commit("setCanvasHeight", h);

      let ratio = w / h;
      console.log(ratio);
      if (ratio >= 0.71) {
        commit("setClassicPossible", false);
        if (this.state.styleClassic) {
          commit("setStyleClassic", false);
          commit("setStyleOverlay", true);
        }
      } else {
        console.log("else");
        commit("setClassicPossible", true);
      }
    },
  },
});
