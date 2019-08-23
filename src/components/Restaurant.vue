<template>
  <div class="restaurant speech-bubble">
    <div v-if="randomRestaurant">
      How about <span class="restaurant__name">{{ randomRestaurant.name }}</span>?
      <br />
      {{ randomRestaurant.summary }}
    </div>
    <div v-else>
      Hm...I can't really think of anything off the top of my head.
    </div>
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
        this.tags.forEach((tag) => {
          matches.push(restaurantList.filter(item => item.tags.indexOf(tag) > - 1));
        });

        let randomPick;
        if (matches.length > 0) {
          randomPick = matches[Math.floor(Math.random() * matches.length)];
        }
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