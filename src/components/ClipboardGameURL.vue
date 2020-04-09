<template>
  <div>
    <b-form>
      <b-form-group 
        label="Game participation url:"
      >

        <b-input-group>
          <template v-slot:prepend><b-input-group-text><b-icon-link/></b-input-group-text></template>
          <b-form-input disabled id="input-url" v-model="this.url"></b-form-input>
          <template v-slot:append>
            <b-button variant="outline-primary" id="copy-gameurl-to-clipboard" type="button"
              v-clipboard:copy="url"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"><b-icon-clipboard/></b-button>
              <b-popover ref="popover" target="copy-gameurl-to-clipboard" variant="info" placement="bottom" :disabled=true>
                copied!
              </b-popover>
              
                <b-button variant="outline-primary" id="copy-gameurl-to-clipboard" type="button" v-on:click="startGameInNewTab()">
                  <b-icon-box-arrow-up-right/>
                </b-button>
          </template>
        </b-input-group>
      
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: 'ClipboardGameURL',
    computed: {
      gameInstance () {
        return this.$store.getters.currentGameInstance
      },
      url:function () {
        let URLLocation = this.$router.resolve({ 
          name: 'Game',
          params: { gameInstanceId: this.gameInstance.id },
        });
        return window.location.origin + URLLocation.href;
      }
    },
    methods:{
      onCopy: function () {
        this.$refs.popover.$emit('open');
        setTimeout(function() { this.$refs.popover.$emit('close'); }.bind(this), 1000);
      },
      onError: function () {
        alert('Failed to copy texts')
      },
      startGameInNewTab: function () {
        window.open(this.url, '_blank');
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>