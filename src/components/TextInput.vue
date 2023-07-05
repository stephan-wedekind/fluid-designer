<template>
  <div class="padding-60">

    <section class="user-input">
      <h2 class="fontLila">Headline</h2>
      <textarea :class="{'filled' : newHeadline.length > 0}" maxlength="72" v-model="newHeadline" @input="updateHeadline(newHeadline)" placeholder="z.B. Finde dein Studium"></textarea>
    </section>

    <section class="user-input">
      <h2 class="fontLila">Subheadline</h2>
      <textarea :class="{'filled' : newSubheadline.length > 0}" maxlength="85" v-model="newSubheadline" @input="updateSubheadline(newSubheadline)" placeholder="z.B. Dienstag 27.06.2023..."></textarea>
    </section>

    <section class="user-input">
      <h2 class="fontLila">Text</h2>
      <textarea :class="{'filled' : newCopyText.length > 0}" maxlength="500" v-model="newCopyText" @input="updateCopyText(newCopyText)" placeholder="Weitere Informationen" :disabled="!isPrint"></textarea>
    </section>

    <section class="qr-code" v-if="isPrint">
      <h2 class="fontLila">QR-Code</h2>
      <div class="qr-code-input">
        <input type="text" v-model="newUrlQR" class="qr-url" @input="updateUrlQR(newUrlQR)" :class="{'filled' : newUrlQR.length > 0}" placeholder="URL hier einfügen">
        <Btn buttonType="Secondary" buttonName="Generieren" buttonIcons="Share.png" class="qr-btn" @click="incrementRefreshQR"/>
      </div>
    </section>

    <div class="buttons">
      <Btn buttonType="Secondary" buttonName="Aktualisieren" buttonIcons="Wiederholen.png" id="refresh" @click="incrementRefreshing"/>
     <!--  <Btn buttonType="Primary" buttonName="Download" buttonIcons="Download.png" id="download" @click="incrementDownloadTrigger"/> -->
    </div>
    
  </div>
</template>

<script>
import Btn from '@/components/Button.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'TextInput',
  
  data() {
    return {
      newHeadline: "",
      newSubheadline: "",
      newCopyText: "",
      newUrlQR: "",
    }
  },

  components: {
    Btn,
  },

  watch: {
    headline(newValue) {
      this.updateHeadlineLines(newValue);
    },
    subheadline(newValue) {
      this.updateSubHeadlineLines(newValue);
    },
    copyText(newValue) {
      this.updateCopyLines(newValue);
    }
  },

  computed: {
    ...mapState(['headline', 'subheadline', 'copyText', 'urlQR', 'refreshing', 'refreshQR', 'isPrint', 'headlineLines', 'isPrint'])
  },

  methods: {
    ...mapMutations(['setHeadline', 'setSubheadline', 'setCopyText', 'setUrlQR', 'incrementRefreshing', 'incrementRefreshQR', 'incrementDownloadTrigger']),
    ...mapActions(['updateHeadlineLines', 'updateSubHeadlineLines', 'updateCopyLines']),

    updateHeadline(newHeadline){
      this.setHeadline(newHeadline);
    },
    updateSubheadline(newSubheadline){
      this.setSubheadline(newSubheadline);
    },
    updateCopyText(newCopyText){
      this.setCopyText(newCopyText);
    },
    updateUrlQR(newUrlQR){
      this.setUrlQR(newUrlQR);
    },
  },

  created() {
    this.newHeadline = this.headline;
    this.newSubheadline = this.subheadline;
    this.newCopyText = this.copyText;
    this.newUrlQR = this.urlQR;
  },
}
</script>



<style scoped>
.user-input {
  margin-bottom: 45px;
}

.user-input input,
textarea {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
  padding-top: 15px;
  padding-bottom: 15px;
  overflow: hidden;
}

textarea:disabled {
  border-color: #8D8D8D;
  background-color: #f2f2f2;
}




.qr-code {
  margin-bottom: 45px;
}

.qr-code-input {
  display: flex;
  justify-content: space-between;
}

.qr-url {
  width: calc(60% - 15px);
}

.qr-btn {
  width: 40%;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

#refresh {
  width: calc(50% - 7.5px);
}


</style>
