<template>
  <div class="restaurant--container">
    <div class="restaurant speech-bubble">
      <div v-if="showAnswer">
        How about <span class="restaurant__name">{{ randomRestaurant.name }}</span>?
        <br />
        {{ randomRestaurant.summary }}
      </div>
      <div v-else-if="randomRestaurant">
        Sorry, nothing comes to mind with what you want. Maybe you want to <a href="/">start over</a> with
        some different choices?
      </div>
      <div v-else>
        typing...
      </div>
    </div>
    <div class="other">
      <div v-if="showAnswer" class="bubble choice-bubble choice-bubble__another" @click="showBye=true">
        thanks
      </div>
      <div v-if="showAnswer" class="bubble choice-bubble choice-bubble__another" @click="anotherOne">
        nah, something else
      </div>
    </div>
    <div class="restaurant speech-bubble" v-if="showBye">
      You're welcome. If you thought I was helpful, spread the word and tell your friends about me!
      <br />
      <a href="/">Do you want to start over?</a>
    </div>
  </div>
</template>

<script>
  const axios = require('axios');

  function queryForRestaurant(vueContext) {
    const tags = encodeURI(vueContext.tags.join(','));
    axios.get(`https://jhtob6nlmb.execute-api.us-west-2.amazonaws.com/prod/restaurant?tags=${tags}`).then(function (response) {
      if (response.data.Count > 0) {
        const restaurantList = response.data.Items;
        vueContext.randomRestaurant = restaurantList[Math.floor(Math.random() * response.data.Count)];
      } else {
        vueContext.randomRestaurant = {};
      }
    });
  }

  export default {
    name: 'Restaurant',
    props: ['tags'],
    data() {
      return {
        randomRestaurant: false,
        showBye: false
      }
    },
    methods: {
      anotherOne: function() {
        queryForRestaurant(this);
      }
    },
    computed: {
      showAnswer: function() {
        return this.randomRestaurant && this.randomRestaurant.name;
      }
    },
    mounted() {
      queryForRestaurant(this);
    }
  }
</script>

<style>
  .restaurant--container {
    text-align: left;
  }
  .restaurant.speech-bubble {
    padding: 15px 20px;
  }

  .restaurant.speech-bubble a, a:visited {
    color: hsl(202, 90%, 90%);
  }
  .restaurant__name {
    font-weight: 600;
  }
  .other {
    margin-top: 20px;
  }
</style>