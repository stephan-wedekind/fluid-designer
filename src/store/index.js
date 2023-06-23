import { createStore } from "vuex";

const initialState = {
  isImage: false,
  isPattern: false,
  activeNavigation: "",
  navigations: [
    { id: "style", label: "Style", position: 0 },
    { id: "text", label: "Text", position: 3 },
  ],

  //Format Auswahl

  toFormatChoice: false,

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

  //Ausgewähltes Bild 
  activeImage: null,
  imagePath: "Platzhalter/default/default-image.png",

  //Text Inputs

  headline: "",
  subheadline: "",
  copyText: "",
  urlQR: "",
  
  //QR Code
  qrCodeImage: "",

  //refreshing Text

  refreshing : 0,
  refreshQR: 0,

  //Canvas Destroyer

  canvasDestroyer: 0,
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
    addNavigation(state, navigation) {
      state.navigations.push(navigation);
    },
    removeNavigation(state, navigationId) {
      const index = state.navigations.findIndex((navigation) => navigation.id === navigationId);
      if (index !== -1) {
        state.navigations.splice(index, 1);
      }
    },
    setActiveNavigation(state, navigationId) {
      state.activeNavigation = navigationId;
    },
    resetState(state) {
      Object.assign(state, initialState),
      
      state.navigations = [
        { id: "style", label: "Style", position: 0 },
        { id: "text", label: "Text", position: 3 },
      ];
    },

    //Format Auswahl

    setFormatChoice(state, value){
      state.toFormatChoice = value;
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

    // Ausgewähltes Bild

    setActiveImage(state, number) {
      state.activeImage = number;
    },

    setImagePath(state, text) {
      state.imagePath = text;
    },

    //Text Inputs

    setHeadline(state, text){
      state.headline = text;
    },
    setSubheadline(state, text){
      state.subheadline = text;
    },
    setCopyText(state, text){
      state.copyText = text;
    },
    setUrlQR(state, text){
      state.urlQR = text;
    },

    //QR Code

    setQRCodeImage(state, qrCodeImage) {
      state.qrCodeImage = qrCodeImage;
    },

    //refreshing
    incrementRefreshing(state){
      state.refreshing += 1;
    },

    incrementRefreshQR(state){
      state.refreshQR += 1;
    },

    //Canvas Destroyer
    setCanvasDestroyer(state) {
      console.log('Canvas destroyer')
      state.canvasDestroyer += 1;
    }
  },



  actions: {
    addBild({ commit, state }) {
      if (!state.isImage) {
        if (state.navigations.find((navigation) => navigation.id === "pattern")) {
          commit("removeNavigation", "pattern");
        }
        if (!state.navigations.find((navigation) => navigation.id === "bild")) {
          commit("addNavigation", { id: "bild", label: "Bild", position: 1 });
          state.navigations.sort((a, b) => a.position - b.position);
        }

        commit("setIsImage", true);
        commit("setIsPattern", false);
      }
    },
    addPattern({ commit, state }) {
      if (!state.isPattern) {
        if (state.navigations.find((navigation) => navigation.id === "bild")) {
          commit("removeNavigation", "bild");
        }
        if (!state.navigations.find((navigation) => navigation.id === "pattern")) {
          commit("addNavigation", { id: "pattern", label: "Pattern", position: 2 });
          state.navigations.sort((a, b) => a.position - b.position);
        }

        commit("setIsPattern", true);
        commit("setIsImage", false);
      }
    },
    resetStore({ commit }) {
      commit("resetState");
    },

    handleFormatChoice({ commit }, value){
      
      commit("setFormatChoice", value)
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
      if (ratio >= 0.71) {
        commit("setClassicPossible", false);
        if (this.state.styleClassic) {
          commit("setStyleClassic", false);
          commit("setStyleOverlay", true);
        }
      } else {
        
        commit("setClassicPossible", true);
      }
    },
  },
});
