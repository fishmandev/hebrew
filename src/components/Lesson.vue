<template>
    <div class="lesson">
        <div class="disabled" :class="{ show: answer }">
            <span v-if="answer == 'incorrect'">{{ question.ru }} - <span
                    :class="{ cursive: cursive }">{{ question.text }}</span></span>
        </div>
        <div class="container">
            <div class="row">
                <div class="question-col">
                    <div class="question" v-if="question">{{ question.ru }}</div>
                </div>
            </div>
            <!--
            <div class="row">
                <div class="sound">
                    <spna><img src="sound.png" alt="sound"></spna>
                </div>
            </div>
            -->
            <div class="row">
                <div class="space"></div>
            </div>
            <div class="row">
                <div class="correct" :class="{ show: answer == 'correct' }">
                    <a class="thumbnail" @click="reset">
                        <img src="./../assets/correct.png" alt="correct">
                    </a>
                </div>
                <div class="incorrect" :class="{ show: answer == 'incorrect' }">
                    <a class="thumbnail" @click="reset">
                        <img src="./../assets/incorrect.png" alt="correct">
                    </a>
                </div>
            </div>
            <div class="row">
                <div class="answer-col"
                     v-for="word of dictionaryItems">
                    <button type="button"
                            class="btn"
                            @click="checkAnswer(word)"
                            :class="{ cursive: cursive }">{{ word.text }}</button>
                </div>
            </div>
        </div>
        <footer class="footer">
            <label>
                <input type="checkbox" v-model="cursive"><span>רָהוּט</span>
            </label>
        </footer>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'lesson',
    data () {
      return {
        dictionary: [],
        question: null,
        answer: null,
        cursive: false
      }
    },
    created () {
      this.loadDictionary()
    },
    computed: {
      dictionaryItems () {
        return this.dictionary.map((a) => {
          if (this.cursive) {
            a.text = a.he
          } else {
            a.text = a.heVowel
          }
          return a
        })
      }
    },
    methods: {
      checkAnswer (word) {
        if (word.id === this.question.id) {
          this.answer = 'correct'
        } else {
          this.answer = 'incorrect'
        }
        var data = new URLSearchParams()
        data.append('id', this.question.id)
        data.append('answer', this.answer)
        axios.post('http://10.0.3.173/lesson/answer', data)
      },
      loadDictionary () {
        axios.get('http://10.0.3.173/lesson/' + this.$route.params.id)
          .then(response => {
            this.dictionary = response.data.dictionary
            this.question = response.data.dictionary[Math.floor(Math.random() * response.data.dictionary.length)]
          })
      },
      reset () {
        this.answer = null
        this.loadDictionary()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @font-face {
        font-family: Motek;
        src: url(./../assets/motek.ttf);
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
    }

    .disabled {
        z-index: 1;
        width: 100%;
        height: 100%;
        display: none;
        position: absolute;
        top: 0%;
        left: 0%;
        background-color: #000;
        color: #aaa;
        opacity: 0.8;
        filter: alpha(opacity=100);
        text-align: center;
        font-size: 25px;
        color: white;
        padding-top: 20px;
    }

    .cursive {
        font-family: Motek;
        font-size: 40px;
    }

    .container {
        margin-right: auto;
        margin-left: auto;
    }

    .container, .question-col, .sound {
        padding-right: 15px;
        padding-left: 15px;
    }

    .sound img {
        width: 24px;
        height: 24px;
    }

    .space {
        min-height: 70px;
    }

    .thumbnail {
        width: 100%;
        display: block;
        text-align: center;
    }

    .thumbnail img {
        width: 128px;
        height: 128px;
        z-index: 2;
        left: 0;
        right: 0;
        margin: 0 auto;
        position: absolute;
        top: 140px;
    }

    .correct, .incorrect {
        display: none;
    }

    .show {
        display: block;
    }

    .row {
        margin-right: -15px;
        margin-left: -15px;
    }

    .question-col {
        width: 100%;
        position: relative;
        float: left;
        padding-top: 10px;
    }

    .question {
        font-size: 24px;
    }

    .answer-col {
        width: 50%;
        float: left;
        position: relative;
        min-height: 1px;
        text-align: center;
        padding: 15px;
    }

    .answer-col > .cursive {
        font-size: 35px;
    }

    .btn {
        height: 60px !important;
        background-repeat: repeat-x;
        border-color: #245580;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, .2);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);
        background-image: linear-gradient(to bottom, #337ab7 0, #265a88 100%);
        display: block;
        font-size: 20px;
        width: 100%;
        padding: 0 15px;
        line-height: 1.3333333;
        border-radius: 6px;
        color: #fff;
        background-color: #337ab7;
        margin-bottom: 0;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        border: 1px solid transparent;
        user-select: none;
        -webkit-appearance: button;
        text-transform: none;
        overflow: visible;
        direction: rtl;
    }

    .btn:active {
        background-color: #204d74;
        border-color: #122b40;
        background-position: 0 -15px;
        background-image: none;
        box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
    }

    .btn:focus {
        outline: none;
        background-color: #265a88;
        background-position: 0 -15px;
        text-decoration: none;
        outline-offset: -2px;
    }

    .btn:hover {
        background-color: #265a88;
        background-position: 0 -15px;
        border-color: #204d74;
        text-decoration: none;
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 40px;
        background-color: #f5f5f5;
        padding: 10px;
        direction: rtl;
    }

    .footer label {
        display: block;
        padding-right: 10px;
        white-space: nowrap;
    }

    .footer input {
        vertical-align: middle;
    }

    .footer label span {
        vertical-align: middle;
    }
</style>