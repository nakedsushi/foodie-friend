<template>
  <div class="restaurant">
    {{ randomRestaurant.name }}
  </div>
</template>

<script>
//  import restaurantList from '../data/restaurant-list.yaml'
  const axios = require('axios');
  let restaurantList;
  axios.get('https://jsonplaceholder.typicode.com/todos/1').
  then( function(response) {
    restaurantList = response;
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