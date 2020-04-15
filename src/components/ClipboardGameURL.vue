<template>
  <div>
    <b-form>
      <h5><b-icon-link/> URLs</h5>

      <b-form-group  label="Game participation:">
        <b-input-group >
          <template v-slot:prepend><b-input-group-text><b-icon-people/></b-input-group-text></template>
          <b-form-input disabled id="input-url" v-model="this.gameUrl"></b-form-input>
          <template v-slot:append>
            <b-button variant="outline-primary" id="copy-gameurl-to-clipboard" type="button"
              v-clipboard:copy="gameUrl"
              v-clipboard:success="onCopyGame"
              v-clipboard:error="onError"><b-icon-clipboard/></b-button>
              <b-popover ref="gamepopover" target="copy-gameurl-to-clipboard" variant="info" placement="bottom" :disabled=true>
                copied!
              </b-popover>
              
                <b-button variant="outline-primary" id="copy-gameurl-to-clipboard" type="button" v-on:click="startGameInNewTab()">
                  <b-icon-box-arrow-up-right/>
                </b-button>
          </template>
        </b-input-group>
      
      </b-form-group>
      <b-form-group  label="Game administration:">
        <b-input-group >
          <template v-slot:prepend><b-input-group-text><b-icon-tools/></b-input-group-text></template>
          <b-form-input disabled id="input-url" v-model="this.adminUrl"></b-form-input>
          <template v-slot:append>
            <b-button variant="outline-primary" id="copy-adminurl-to-clipboard" type="button"
              v-clipboard:copy="adminUrl"
              v-clipboard:success="onCopyAdmin"
              v-clipboard:error="onError"><b-icon-clipboard/></b-button>
              <b-popover ref="adminpopover" target="copy-adminurl-to-clipboard" variant="info" placement="bottom" :disabled=true>
                copied!
              </b-popover>
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
      gameUrl:function () {
        let URLLocation = this.$router.resolve({ 
          name: 'Game',
          params: { gameInstanceId: this.gameInstance.id },
        });
        return window.location.origin + URLLocation.href;
      },
      adminUrl:function () {
        let URLLocation = this.$router.resolve({ 
          name: 'GameAdmin',
          params: { gameInstanceId: this.gameInstance.id },
        });
        return window.location.origin + URLLocation.href;
      }
    },
    methods:{
      onCopyGame: function () {
        this.$refs.gamepopover.$emit('open');
        setTimeout(function() { this.$refs.gamepopover.$emit('close'); }.bind(this), 1000);
      },
      onCopyAdmin: function () {
        this.$refs.adminpopover.$emit('open');
        setTimeout(function() { this.$refs.adminpopover.$emit('close'); }.bind(this), 1000);
      },
      onError: function () {
        alert('Failed to copy texts')
      },
      startGameInNewTab: function () {
        window.open(this.gameUrl, '_blank');
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>