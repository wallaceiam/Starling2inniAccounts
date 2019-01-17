<template>
  <div id="file-download">
    <div id="success-box" v-if="isSuccess">
      <div class="face">
        <div class="eye"></div>
        <div class="eye right"></div>
        <div class="mouth happy"></div>
      </div>
      <div class="shadow scale"></div>
      <div class="message">
        <h1 class="alert">Success!</h1>
        <p>yay, everything is working.</p>
      </div>
      <button class="button-box btn btn-primary btn-lg pb_btn-pill btn-shadow-blue" v-on:click="exportCSV">
        Continue
      </button>
    </div>
    <div id="error-box" v-if="isFailed">
      <div class="face2">
        <div class="eye"></div>
        <div class="eye right"></div>
        <div class="mouth sad"></div>
      </div>
      <div class="shadow move"></div>
      <div class="message">
        <h1 class="alert">Error!</h1>
        <p>oh no, something went wrong.</p>
        <p>{{ uploadError }}</p>
      </div>
      <button class="button-box btn btn-primary btn-lg pb_btn-pill btn-shadow-blue" v-on:click="reset">
        <h1 class="red">try again</h1>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {
    ...mapGetters(["isSuccess", "isFailed"]),
    ...mapState(['uploadError'])
  },
  methods: {
    exportCSV: function() {
      let csvContent = "data:text/csv;charset=utf-8,";
      const data = this.$store.state.csvData;
      csvContent += [
        Object.keys(data[0]).join(","),
        ...data.map(item => Object.values(item).join(","))
      ]
        .join("\n")
        .replace(/(^\[)|(\]$)/gm, "");

      const href = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", href);
      link.setAttribute("download", this.$store.state.csvFileName);
      link.click();
    },
    reset: function() {
      this.$store.dispatch("reset");
    }
  }
};
</script>

<style lang="scss">
$white: #fcfcfc;
$gray: #c3cdd3;
$dark: #777777;
$error: #ef8d9c;
$orange: #ef8d9c;
$success: #5cb85c;
$secondary: #5cb85c;


#file-download {
  position: relative;
  margin: auto;
  overflow: hidden;
  min-width: 255px;
  min-height: 200px;
  height: 250px;

  h1 {
    font-size: 0.9em;
    font-weight: 100;
    letter-spacing: 3px;
    padding-top: 5px;
    color: $white;
    padding-bottom: 5px;
    text-transform: uppercase;
  }

  .green {
    color: $success;
  }

  .red {
    color: $error;
  }

  .alert {
    font-weight: 700;
    letter-spacing: 5px;
  }

  p {
    margin-top: -5px;
    font-size: 0.5em;
    font-weight: 100;
    color: darken($dark, 10%);
    letter-spacing: 1px;
  }

  button {
    cursor: pointer;
  }

  #success-box {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #error-box {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .face {
    position: absolute;
    width: 22%;
    height: 22%;
    background: $white;
    border-radius: 50%;
    border: 2px solid $dark;
    top: 21%;
    left: 37.5%;
    z-index: 2;
    animation: bounce 1s ease-in infinite;
  }

  .face2 {
    position: absolute;
    width: 22%;
    height: 22%;
    background: $white;
    border-radius: 50%;
    border: 1px solid $dark;
    top: 21%;
    left: 37.5%;
    z-index: 2;
    animation: roll 3s ease-in-out infinite;
  }

  .eye {
    position: absolute;
    width: 5px;
    height: 5px;
    background: $dark;
    border-radius: 50%;
    top: 40%;
    left: 20%;
  }

  .right {
    left: 68%;
  }

  .mouth {
    position: absolute;
    top: 43%;
    left: 41%;
    width: 7px;
    height: 7px;
    border-radius: 50%;
  }

  .happy {
    border: 2px solid;
    border-color: transparent $dark $dark transparent;
    transform: rotate(45deg);
  }

  .sad {
    top: 49%;
    border: 2px solid;
    border-color: $dark transparent transparent $dark;
    transform: rotate(45deg);
  }

  .shadow {
    position: absolute;
    width: 21%;
    height: 3%;
    opacity: 0.5;
    background: $dark;
    left: 40%;
    top: 43%;
    border-radius: 50%;
    z-index: 1;
  }

  .scale {
    animation: scale 1s ease-in infinite;
  }
  .move {
    animation: move 3s ease-in-out infinite;
  }

  .message {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 40%;
    top: 47%;
  }

   .button-box {
     position: absolute;
     bottom: 10%;
     left: 20%;
   }

  @keyframes bounce {
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes scale {
    50% {
      transform: scale(0.9);
    }
  }

  @keyframes roll {
    0% {
      transform: rotate(0deg);
      left: 25%;
    }
    50% {
      left: 60%;
      transform: rotate(168deg);
    }
    100% {
      transform: rotate(0deg);
      left: 25%;
    }
  }

  @keyframes move {
    0% {
      left: 25%;
    }
    50% {
      left: 60%;
    }
    100% {
      left: 25%;
    }
  }
}
</style>
