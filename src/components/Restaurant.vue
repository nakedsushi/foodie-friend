<template>
  <div class="restaurant speech-bubble">
    How about <span class="restaurant__name">{{ randomRestaurant.name }}</span>?
    <br />
    {{ randomRestaurant.summary }}
  </div>
</template>

<script>
  const axios = require('axios');
  let restaurantList;
  axios.get('https://raw.githubusercontent.com/nakedsushi/foodie-friend/master/src/data/restaurant-list.json').
  then( function(response) {
    restaurantList = response.data;
  });

  export default {
    name: 'Restaurant',
    props: ['tags'],
    data() {
      return {
        restaurantList
      }
    },
    computed: {
      randomRestaurant() {
        const matches = [];
        this.tags.forEach(() => {
          matches.push(restaurantList.filter(item => item.tags.indexOf(this.tags[0]) > - 1));
      });

        const randomPick = matches[Math.floor(Math.random() * matches.length)][0];
        return randomPick;
      }
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