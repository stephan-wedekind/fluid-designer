import { createStore } from 'vuex'

const initialState = {
  isImage: false,
    isPattern: false,
    activeItem: '',
    items : [
      { id: 'style', label: 'Style', position: 0},
      { id: 'text', label: 'Text', position: 3},
    ]
}

export default createStore({
  state: { ...initialState},
  mutations: {
    setIsImage(state, value){
      state.isImage = value;
    },
    setIsPattern(state, value){
      state.isPattern = value;
    },
    addItem(state, item){
      state.items.push(item);
    },
    removeItem(state, itemId) {
      const index = state.items.findIndex(item => item.id === itemId);
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
      state.items = [
        { id: 'style', label: 'Style', position: 0},
        { id: 'text', label: 'Text', position: 3},
      ];
    }
  },
  actions: {
    addBild({ commit, state }) {
      
      if (!state.isImage) {
        if (state.items.find(item => item.id === 'pattern')){
          commit('removeItem', 'pattern');
        }
        if (!state.items.find(item => item.id === 'bild')) {
          commit('addItem', { id: 'bild', label: 'Bild', position: 1});
          state.items.sort((a,b) => a.position - b.position);
        }

        commit('setIsImage', true);
        commit('setIsPattern', false);
      }
    },
    addPattern({ commit, state }) {

      if (!state.isPattern) {
        if (state.items.find(item => item.id === 'bild')){
          commit('removeItem', 'bild');
        }
        if (!state.items.find(item => item.id === 'pattern')) {
          commit('addItem', { id: 'pattern', label: 'Pattern', position: 2});
          state.items.sort((a,b) => a.position - b.position);
        }

        commit('setIsPattern', true);
        commit('setIsImage', false);
      }
    },
    resetStore({ commit }) {
      commit('resetState');
    },
  }
});
