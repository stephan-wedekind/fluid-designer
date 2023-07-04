import { random } from "lodash";
import { createStore } from "vuex";

const initialState = {
  isImage: false,
  isPattern: false,
  activeNavigation: "",
  navigations: [
    { id: "style", label: "Style", position: 0 },
    { id: "text", label: "Text", position: 3 },
  ],

  //TRYOUT AREA
  downloadTrigger: 0,
  //TRYOUT AREA

  //Format Auswahl

  toFormatChoice: false,
  isPrint: false,
  activeFormat: null,

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

  //Pattern
  patternStripeStart: 1,
  patternStripeEnd: null,

  patternSeed: 0,

  shapesFactor: 1,

  //Canvas Size
  canvasWidth: 0,
  canvasHeight: 0,

  //Ausgewähltes Bild
  activeImage: null, // gewähltes bild
  imagePath: "Platzhalter/default/default-image.png", //pfad zum gewählten bild

  //Text Inputs

  headline: "", //eingegebene headline
  subheadline: "", //eingegebene subheadline
  copyText: "", //eingegebener Text
  urlQR: "", //eingegeben URL für QR code

  //Umbruch Text

  headlineLines: [], //Zeilenanzahl bei Zeilenumbruch durch User
  subHeadlineLines: [], //-"-
  copyTextLines: [], //-"-
  //QR Code
  qrCodeImage: "", //QR Code

  //refreshing Text

  refreshing: 0, //wenn die zahl sich änder wird der canvas erneuert
  refreshQR: 0, //-"-

  //Fokus Punkt wählen

  chooseFocus: false, //overlay für fokus wahl
  focus: 0.5,

  //Close Warning

  isCloseWarning: false,

  //

  storageId: null,
};

export default createStore({
  state: { ...initialState },

  mutations: {
    //TRYOUT AREA
    incrementDownloadTrigger(state) {
      state.downloadTrigger += 1;
    },
    //TRYOUT AREA

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
      const index = state.navigations.findIndex(
        (navigation) => navigation.id === navigationId
      );
      if (index !== -1) {
        state.navigations.splice(index, 1);
      }
    },
    setActiveNavigation(state, navigationId) {
      state.activeNavigation = navigationId;
    },

    resetState(state) {
      const storedData = localStorage.getItem("storedStates");

      const newData = {
        id: generateUniqueId(),
        timestamp: new Date().toISOString(),
        isPrint: state.isPrint,
        activeFormat: state.activeFormat,
        styleClassic: state.styleClassic,
        styleOverlay: state.styleOverlay,
        stylePattern: state.stylePattern,
        patternMirror: state.patternMirror,
        patternStripe: state.patternStripe,
        patternRandom: state.patternRandom,
        patternFilled: state.patternFilled,
        isCircle: state.isCircle,
        isRectangle: state.isRectangle,
        isTriangle: state.isTriangle,
        patternStripeStart: state.patternStripeStart,
        patternStripeEnd: state.patternStripeEnd,
        patternSeed: state.patternSeed,
        canvasWidth: state.canvasWidth,
        canvasHeight: state.canvasHeight,
        activeImage: state.activeImage,
        imagePath: state.imagePath,
        headline: state.headline,
        subheadline: state.subheadline,
        copyText: state.copyText,
        qrCodeImage: state.qrCodeImage,
        urlQR: state.urlQR,
        headlineLines: state.headlineLines,
        subHeadlineLines: state.subHeadlineLines,
        copyTextLines: state.copyTextLines,
        focus: state.focus,
        isImage: state.isImage,
        isPattern: state.isPattern,
        navigations: state.navigations,
        classicPossible: state.classicPossible,
        shapesFactor: state.shapesFactor,
      };

      console.log("storageId: " + state.storageId);

      let storedStates = [];

      if (storedData) {
        storedStates = JSON.parse(storedData);
      }

      const existingStateIndex = storedStates.findIndex(
        (storedState) => storedState.id === state.storageId
      );

      if (existingStateIndex !== -1) {
        storedStates[existingStateIndex] = newData;
      } else {
        storedStates.push(newData);
      }

      localStorage.setItem("storedStates", JSON.stringify(storedStates));

      Object.assign(state, initialState),
        (state.navigations = [
          { id: "style", label: "Style", position: 0 },
          { id: "text", label: "Text", position: 3 },
        ]);
    },

    discardState(state) {
      Object.assign(state, initialState),
        (state.navigations = [
          { id: "style", label: "Style", position: 0 },
          { id: "text", label: "Text", position: 3 },
        ]);
    },

    setStoredState(state, storedState) {
      state.storageId = storedState.id,
      state.isPrint = storedState.isPrint,
      state.activeFormat = storedState.activeFormat,
      state.styleClassic = storedState.styleClassic,
      state.styleOverlay = storedState.styleOverlay,
      state.stylePattern = storedState.stylePattern,
      state.patternMirror = storedState.patternMirror,
      state.patternStripe = storedState.patternStripe,
      state.patternRandom = storedState.patternRandom,
      state.patternFilled = storedState.patternFilled,
      state.isCircle = storedState.isCircle,
      state.isRectangle = storedState.isRectangle,
      state.isTriangle = storedState.isTriangle,
      state.patternStripeStart = storedState.patternStripeStart,
      state.patternStripeEnd = storedState.patternStripeEnd,
      state.patternSeed = storedState.patternSeed,
      state.canvasWidth = storedState.canvasWidth,
      state.canvasHeight = storedState.canvasHeight,
      state.activeImage = storedState.activeImage,
      state.imagePath = storedState.imagePath,
      state.headline = storedState.headline,
      state.subheadline = storedState.subheadline,
      state.copyText = storedState.copyText,
      state.qrCodeImage = storedState.qrCodeImage,
      state.headlineLines = storedState.headlineLines,
      state.subHeadlineLines = storedState.subHeadlineLines,
      state.copyTextLines = storedState.copyTextLines,
      state.focus = storedState.focus;
      state.isImage = storedState.isImage;
      state.isPattern = storedState.isPattern;
      state.navigations = storedState.navigations;
      state.classicPossible = storedState.classicPossible;
      state.urlQR = storedState.urlQR;
      state.shapesFactor = storedState.shapesFactor;
    },

    //Format Auswahl

    setFormatChoice(state, value) {
      state.toFormatChoice = value;
    },

    setIsPrint(state, value) {
      state.isPrint = value;
    },

    setActiveFormat(state, number) {
      state.activeFormat = number;
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

    setHeadline(state, text) {
      state.headline = text;
    },
    setSubheadline(state, text) {
      state.subheadline = text;
    },
    setCopyText(state, text) {
      state.copyText = text;
    },
    setUrlQR(state, text) {
      state.urlQR = text;
    },

    //Textumbruch Offset

    SET_HEADLINE_LINES(state, lines) {
      state.headlineLines = lines;
    },

    SET_SUBHEADLINE_LINES(state, lines) {
      state.subHeadlineLines = lines;
    },

    //QR Code

    setQRCodeImage(state, qrCodeImage) {
      state.qrCodeImage = qrCodeImage;
    },

    //refreshing
    incrementRefreshing(state) {
      state.refreshing += 1;
    },

    incrementRefreshQR(state) {
      state.refreshQR += 1;
    },

    //Fokus Punkt
    setChooseFocus(state, value) {
      state.chooseFocus = value;
    },

    setFocus(state, number) {
      state.focus = number;
    },

    //Pattern

    increasePatternStripeStart(state) {
      state.patternStripeStart += 1;
    },
    decreasePatternStripeStart(state) {
      state.patternStripeStart -= 1;
    },

    increasePatternStripeEnd(state) {
      state.patternStripeEnd += 1;
    },
    decreasePatternStripeEnd(state) {
      state.patternStripeEnd -= 1;
    },

    increasePatternSeed(state) {
      state.patternSeed += 1;
    },
    decreasePatternSeed(state) {
      state.patternSeed -= 1;
      
    },

    randomPatternSeed(state) {
      state.patternSeed = parseInt(random(0, 255));
    },

    //close Warning

    setIsCloseWarning(state, value) {
      state.isCloseWarning = value;
    },

    increaseShapesFactor(state) {
      state.shapesFactor += 1;
      if(state.shapesFactor >= 3) {
        state.shapesFactor = 4;
      }
    },

    decreaseShapesFactor(state) {
      state.shapesFactor -= 1;
      if (state.shapesFactor === 0) {
        state.shapesFactor = 1;
      } 
      if (state.shapesFactor === 3) {
        state.shapesFactor = 2;
      } 
    }
  },

  actions: {
    //Navigation bearbeiten
    addBild({ commit, state }) {
      if (!state.isImage) {
        if (
          state.navigations.find((navigation) => navigation.id === "pattern")
        ) {
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
        if (
          !state.navigations.find((navigation) => navigation.id === "pattern")
        ) {
          commit("addNavigation", {
            id: "pattern",
            label: "Pattern",
            position: 2,
          });
          state.navigations.sort((a, b) => a.position - b.position);
        }

        commit("setIsPattern", true);
        commit("setIsImage", false);
      }
    },

    //Store wird zurückgesettz, später hier localStorage anbinden
    resetStore({ commit }) {
      commit("resetState");
    },

    discardStore({ commit }) {
      commit("discardState");
    },

    //Formatauswahl offen oder nicht
    handleFormatChoice({ commit }, value) {
      commit("setFormatChoice", value);
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

    //Canvas größe wird je nach format gesetzt
    updateCanvasSize({ commit }, { w, h, p }) {
      commit("setCanvasWidth", w);
      commit("setCanvasHeight", h);
      commit("setIsPrint", p);

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

    //Zeilenumbrüche
    updateHeadlineLines({ commit }, text) {
      const lines = text.split(/\r?\n/).map((line) => line.length);
      commit("SET_HEADLINE_LINES", lines);
    },
    updateSubHeadlineLines({ commit }, text) {
      const lines = text.split(/\r?\n/).map((line) => line.length);
      commit("SET_SUBHEADLINE_LINES", lines);
    },
  },
});

function generateUniqueId() {
  // jedem element aus localStorage storedStates wird einen eindeutige id zugewiesen
  const { v4: uuidv4 } = require("uuid");
  return uuidv4();
}
