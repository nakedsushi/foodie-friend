<template>
  <div class="app">
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div class="container">
      <div class="welcome speech-bubble" >
        Hey, I can suggest a place for you to eat if you help me narrow down what you have in mind.
      </div>
      <div class="friend__img">
        <a href="/"><img alt="tap this image to go back to the beginning" src="/images/foodie-friend.png" width="135" /></a>
      </div>
    </div>

    <Question />
  </div>
</template>

<script>
  import Question from './components/Question.vue'

  export default {
    metaInfo: {
      title: 'Foodie Friend says hi!'
    },
    components: {
      Question
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
      padding: 20px 0 0 0;
    }
  }

  body {
    font-family: sans-serif;
    line-height: 1.5;
  }

  .app {
    height: 100%;
    margin: 20px 10px;
  }

  .home-links {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    padding: 10px;
    background-color: #0096e7;
  }

  .home__icon {
    width: 32px;
  }
  .home-links a, a:visited {
    text-decoration: none;
    color: hsl(202, 100%, 85%)
  }

  .container {
    display: grid;
    grid-template-columns: 20%;
    align-items: end;
  }
  .friend__img {
    grid-column-start: 4;
    grid-column-end: 5;
    text-align: right;
  }
  .friend__img img {
    width: 72px;
  }
  .welcome {
    grid-column-start: 1;
    grid-column-end: 4;
    margin-right: 20px;
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
