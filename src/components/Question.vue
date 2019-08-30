<template>
  <div class="question">
    <div class="speech-bubble">
      {{ question.body }}
    </div>

    <div class="choices--container">
      <div v-for="choice in question.choices" class="choice" :key="choice.key">
        <input type="checkbox"
               :name="choice.key || choice"
               :value="choice.key || choice"
               :id="questionNumber + (choice.key || choice)"
               v-model="selectedChoices"
               class="checkbox--hidden"
        >
        <label v-bind:for="questionNumber + (choice.key || choice)" class="bubble choice-bubble">{{choice.text || choice}}</label>
      </div>
    </div>

    <div class="send" v-if="!showAnswer">
      <button @click="nextQuestion" class="bubble button__forward">
        <div>{{ sendOption }}</div>
      </button>
    </div>
    <div v-if="showAnswer" class="answer">
      <Restaurant :tags="selectedChoices"/>
    </div>
  </div>
</template>

<script>
  import questions from '../data/questions.json'
  import Restaurant from './Restaurant.vue'
  import { store } from '../store/store.js'

  export default {
    name: 'Question',
    components: {
      Restaurant
    },
    data () {
      const questionNumber = store.getters.currentQuestionNumber;
      const question = questions[questionNumber];
      const selectedChoices = [];
      const lastQuestion = false;
      const showAnswer = false;
      const showReady = true;
      return {
        question,
        questionNumber,
        selectedChoices,
        lastQuestion,
        showAnswer,
        showReady
      }
    },
    methods: {
      populateState: function () {
        const questionNumber = store.getters.currentQuestionNumber;
        this.question = questions[questionNumber];
        this.questionNumber = questionNumber;
      },
      nextQuestion: function() {
        if (store.getters.currentQuestionNumber === (questions.length - 1)) {
          // last question
          this.$root.$emit('getRestaurant');
          this.showAnswer = true;
          this.showReady = false;
        } else {
          store.commit('changeQuestion', 1);
        }
        this.populateState();
      }
    },
    computed: {
      inputType: function() {
        return this.question.inputType || 'checkbox'
      },
      sendOption: function() {
        let picked = false;
        const question = this.question;
        this.selectedChoices.forEach(function(p) {
          question.choices.forEach(function(c) {
            let choice = c;
            if (c.key) {
              choice = c.key;
            }
            if (p === choice) {
              picked = true;
            }
          });
        });
        if (picked) {
          return question.sendOptionPicked;
        } else {
          return question.sendOptionDefault;
        }
      }
    }
  }
</script>

<style>
  .question {
    margin: 2px 0;
    grid-column-start: 1;
    grid-column-end: 5;
    display: grid;
  }

  @media only screen and (min-width: 769px) {
    .question {
      margin: 80px 0;
    }
  }

  .question .speech-bubble{
    grid-column-start: 2;
    grid-column-end: 5;
    margin-top: 20px;
  }

  .choice {
    display: inline-block;
  }

  .choices--container {
    grid-column-start: 1;
    grid-column-end: 5;
  }

  .bubble {
    background: hsl(0, 0%, 83%);
    background-attachment: fixed;
    position: relative;
    border-radius: 20px;
    padding: 8px 12px;
    margin: 5px 10px;
    display: inline-block;
  }
  .choice-bubble {
    color: #333333;
    cursor: pointer;
  }

  .choice-bubble:hover {
    background: hsl(0, 0%, 93%);
  }

  .checkbox--hidden {
    display: none;
  }

  .checkbox--hidden:checked + .choice-bubble {
    background-color: hsl(180, 60%, 80%);
  }

  .send {
    margin: 40px auto;
    grid-column-start: 1;
    grid-column-end: 5;
  }

  button.button__forward {
    color: hsl(0, 0%, 99%);
    background: linear-gradient(to bottom, #00D0EA 10%, #0085D1 70%);
    font-size: 16px;
    font-weight: 500;
    padding: 5px 80px;
    border: 0px;
    border-radius: 10px;
    cursor: pointer;
  }

  .answer {
    grid-column-start: 1;
    grid-column-end: 5;
    text-align: right;
  }
</style>