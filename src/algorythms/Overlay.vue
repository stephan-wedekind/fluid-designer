<template>
  
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'Overlay',

  computed: {
    ...mapState(['headline', 'subheadline', 'copyText', 'urlQR'])
  },

  methods: {
    ...mapMutations(['setHeadline', 'setSubheadline', 'setCopyText', 'setUrlQR']),
  },
}
</script>

<style scoped>
</style>