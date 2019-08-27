<template>
  <div class="app">
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div class="container" v-if="!hideWelcome">
      <div class="welcome speech-bubble" >
        Hey, I heard you're looking for a place to eat. I can give you a few suggestions.
      </div>
      <div class="friend__img">
        <img alt="Example image" src="./foodie-friend.png" width="135" />
      </div>
    </div>

    <div @click="hide">
      <Question />
    </div>

    <div class="home-links">
      <a href="/">back</a>
    </div>
  </div>
</template>

<script>
  import Question from './components/Question.vue'

  export default {
    data() {
      return {
        hideWelcome: false
      }
    },
    metaInfo: {
      title: 'Foodie Friend says hi!'
    },
    components: {
      Question
    },
    methods: {
      hide: function() {
        this.hideWelcome = true;
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
  }

  @media only screen and (min-width: 769px) {
    body {
      width: 600px;
      margin: auto;
    }
  }

  body {
    font-family: sans-serif;
    line-height: 1.5;
    margin-top: 20px;
  }
  .app {
    height: 100%;
  }
  .home-links {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 1rem;
  }

  .home-links a, a:visited {
    text-decoration: none;
    color: hsl(202, 100%, 85%)
  }

  .container {
    display: grid;
    grid-template-columns: 20%;
  }
  .friend__img {
    grid-column-start: 4;
    grid-column-end: 5;
    text-align: right;
  }
  .welcome {
    grid-column-start: 1;
    grid-column-end: 4;
  }

  .speech-bubble {
    color: white;
    background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
    background-attachment: fixed;
    position: relative;
    border-radius: 20px;
    padding: 8px 15px;
    margin-top: 5px;
    margin-bottom: 5px;
    display: inline-block;
  }

  .speech-bubble:before {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    right: -8px;
    height: 20px;
    width: 20px;
    background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
    background-attachment: fixed;
    border-bottom-left-radius: 15px;
  }

  .speech-bubble:after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    right: -10px;
    width: 10px;
    height: 20px;
    background: white;
    border-bottom-left-radius: 10px;
  }

</style>
