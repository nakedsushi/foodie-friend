<template>
  <div class="question">
    <div class="speech-bubble">
      {{ body }}
    </div>

    <div class="choices--container">
      <div v-for="choice in choices" class="choice" :key="choice.key">
        <input type="checkbox"
               :name="choice"
               :value="choice.key || choice"
               :id="questionNumber + (choice.key || choice)"
               v-model="selectedChoices"
               class="checkbox--hidden"
        >
        <label v-bind:for="questionNumber + (choice.key || choice)" class="bubble choice-bubble">{{choice.text || choice}}</label>
      </div>
    </div>

    <div class="send">
      <div v-if="lastQuestion">
        <button @click="submit" v-if="showReady" class="bubble button__forward">
          send
        </button>
      </div>
      <div v-else>
        <button @click="nextQuestion" class="bubble button__forward">
          send
        </button>
      </div>
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
      const body = question.body;
      const choices = question.choices;
      const selectedChoices = [];
      const lastQuestion = false;
      const showAnswer = false;
      const showReady = true;
      return {
        body,
        choices,
        questionNumber,
        selectedChoices,
        lastQuestion,
        showAnswer,
        showReady,
      }
    },
    methods: {
      populateState: function () {
        const questionNumber = store.getters.currentQuestionNumber;
        this.body = questions[questionNumber].body;
        this.choices = questions[questionNumber].choices;
        this.questionNumber = questionNumber;
        if (questionNumber === (questions.length - 1)) {
          this.lastQuestion = true;
        }
      },
      nextQuestion: function() {
        store.commit('changeQuestion', 1);
        this.populateState();
      },
      previousQuestion: function() {
        store.commit('changeQuestion', -1);
        this.populateState();
      },
      submit: function() {
        this.showAnswer = true;
        this.showReady = false;
      }
    }
  }
</script>

<style>
  .question {
    margin: 80px 0;
    grid-column-start: 1;
    grid-column-end: 5;
    display: grid;
  }

  .question .speech-bubble{
    grid-column-start: 2;
    grid-column-end: 5;
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
    padding: 8px 15px;
    margin: 5px 10px;
    display: inline-block;
  }
  .choice-bubble {
    color: #333333;
  }

  .checkbox--hidden {
    display: none;
  }

  .checkbox--hidden:checked + .choice-bubble {
    background-color: hsl(120, 60%, 70%);
  }

  .send {
    margin: 40px auto;
    grid-column-start: 1;
    grid-column-end: 5;
  }

  button.button__forward {
    color: hsl(0, 0%, 99%);
    background: linear-gradient(to bottom, #00D0EA 10%, #0085D1 100%);
    font-size: 16px;
    font-weight: 600;
    padding: 5px 20px;
    border: none;
  }

  .answer {
    grid-column-start: 1;
    grid-column-end: 5;
    text-align: right;
  }
</style>