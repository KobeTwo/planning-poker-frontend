<template>
  <div>
    <h1>Game ClipboardGameURL</h1>
    URL: {{this.url}}
    <button type="button"
      v-clipboard:copy="url"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy to clipboard!</button>
  </div>
</template>

<script>
  export default {
    name: 'ClipboardGameURL',
    computed: {
        url:function () {
          let URLLocation = this.$router.resolve({ 
            name: 'Game',
            params: { gameInstanceId: this.$store.state.currentGameInstance.id },
          });
          return window.location.origin + URLLocation.href;
        }
    },
    methods:{
      onCopy: function (e) {
        alert('You just copied: ' + e.text)
      },
      onError: function () {
        alert('Failed to copy texts')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>