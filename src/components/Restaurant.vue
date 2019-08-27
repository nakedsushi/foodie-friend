<template>
  <div class="restaurant speech-bubble">
    <div v-if="randomRestaurant && randomRestaurant.name">
      How about <span class="restaurant__name">{{ randomRestaurant.name }}</span>?
      <br />
      {{ randomRestaurant.summary }}
    </div>
    <div v-else-if="randomRestaurant">
      Sorry, can't really think of a good place right now.
    </div>
    <div v-else>
      typing...
    </div>
  </div>
</template>

<script>
  const axios = require('axios');

  export default {
    name: 'Restaurant',
    props: ['tags'],
    data() {
      return {
        randomRestaurant: false
      }
    },
    mounted() {
      const that = this;
      const tags = encodeURI(this.tags.join(','));
      axios.get(`https://jhtob6nlmb.execute-api.us-west-2.amazonaws.com/prod/restaurant?tags=${tags}`).
        then( function(response) {
          if (response.data.Count > 0) {
            const restaurantList = response.data.Items;
            that.randomRestaurant = restaurantList[Math.floor(Math.random() * response.data.Count)];
          } else {
            that.randomRestaurant = {};
          }
        });
    }
  }
</script>

<style>
  .restaurant {
    text-align: left;
  }
  .restaurant.speech-bubble {
    padding: 10px 20px;
  }
  .restaurant__name {
    font-weight: 600;
  }
</style>