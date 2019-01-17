<template>
  <div class="home-page">
    <section
      class="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1"
      id="home"
    >
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-3 relative align-self-center">
            <div class="bg-white rounded">
              <file-upload v-if="isInitial || isSaving"/>
              <file-download v-else/>
              <!-- <hr>
              <div class="form-group text-center pb-5">
                {{ csvFileName }}
                <br/>
                <button
                  :disabled="csvData === undefined"
                  v-on:click="exportCSV"
                  class="btn btn-primary btn-lg pb_btn-pill"
                  v-bind:class="{'btn-shadow-blue' : csvData !== undefined}"
                >Download</button>
              </div>-->
            </div>
            <!-- <form action="#" class="bg-white rounded pb_form_v1">
              <h2 class="mb-4 mt-0 text-center">Sign Up for Free</h2>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control pb_height-50 reverse"
                  placeholder="Full name"
                >
              </div>
              <div class="form-group">
                <input type="text" class="form-control pb_height-50 reverse" placeholder="Email">
              </div>
              <div class="form-group">
                <input type="text" class="form-control pb_height-50 reverse" placeholder="Email">
              </div>
              <div class="form-group">
                <div class="pb_select-wrap">
                  <select class="form-control pb_height-50 reverse">
                    <option value selected>Type</option>
                    <option value>Basic</option>
                    <option value>Business</option>
                    <option value>Free</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  class="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue"
                  value="Register"
                >
              </div>
            </form>-->
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-6">
            <h2 class="heading mb-3">Welcome</h2>
            <div class="sub-heading">
              <p
                class="mb-6"
              >Convert your Starling Business Account CSV extracts to inniAccounts faster and easier.
                <!-- New free template by
                <a href="http://uicookies.com" target="_blank">uicookies.com</a>. For more templates visit the
                <a href="http://uicookies.com" target="_blank">site</a>. Lorem ipsum dolor sit amet, consectetur adipisicing elit.-->
              </p>
              <!-- <p class="mb-5">
                <a class="btn btn-success btn-lg pb_btn-pill smoothscroll" href="#section-pricing">
                  <span class="pb_font-14 text-uppercase pb_letter-spacing-1">See Pricing</span>
                </a>
              </p>-->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- END section -->
    <!-- <section
      class="pb_xl_py_cover overflow-hidden pb_slant-light pb_gradient_v1 cover-bg-opacity-8"
      style="background-image: url(assets/images/1900x1200_img_5.jpg)"
    >
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-md-5 justify-content-center">
            <h2 class="heading mb-5 pb_font-40">Join over 1M+ people who uses Instant App</h2>
            <div class="sub-heading">
              <p class="mb-4">New free template by
                <a href="http://uicookies.com" target="_blank">uicookies.com</a>. For more templates visit the
                <a href="http://uicookies.com" target="_blank">site</a>. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-5">
            <form action="#" class="bg-white rounded pb_form_v1">
              <h2 class="mb-4 mt-0 text-center">Sign Up for Free</h2>
              <div class="form-group">
                <input type="text" class="form-control py-3 reverse" placeholder="Full name">
              </div>
              <div class="form-group">
                <input type="text" class="form-control py-3 reverse" placeholder="Email">
              </div>
              <div class="form-group">
                <input type="text" class="form-control py-3 reverse" placeholder="Email">
              </div>
              <div class="form-group">
                <div class="pb_select-wrap">
                  <select class="form-control pb_height-50 reverse">
                    <option value selected>Type</option>
                    <option value>Basic</option>
                    <option value>Business</option>
                    <option value>Free</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <input
                  type="submit"
                  class="btn btn-primary btn-lg btn-block pb_btn-pill btn-shadow-blue"
                  value="Register"
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>-->
    <!-- END section -->
  </div>
</template>

<script>
/* eslint-disable */
import FileUpload from "./FileUpload";
import FileDownload from "./FileDownload";
import Vue from "vue";

import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    FileUpload,
    FileDownload
  },
  methods: {
  },
  computed: {
    ...mapGetters(["isInitial", "isSaving"])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.rounded {
  border-radius: 1rem !important;
}
</style>
