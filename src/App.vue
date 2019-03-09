<template>
    <div id="app">
        <nav
            class="navbar navbar-expand-lg navbar-dark pb_navbar pb_scrolled-light"
            v-bind:class="navbarClasses"
            id="pb-navbar"
        >
            <div class="container">
                <a class="navbar-brand" href="/">Starling 2 inniAccounts</a>
                <!-- <button
          class="navbar-toggler ml-auto"
          type="button"
          data-toggle="collapse"
          data-target="#probootstrap-navbar"
          aria-controls="probootstrap-navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <i class="ion-navicon"></i>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="probootstrap-navbar">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#home">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#features">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#reviews">Reviews</a>
            </li>
            <! - - <li class="nav-item">
              <a class="nav-link" href="#section-pricing">Pricing</a>
            </li>- - >
            <li class="nav-item">
              <a class="nav-link" href="#faq">FAQ</a>
            </li>
            <! - - <li class="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0">
              <a class="nav-link" href="https://uicookies.com/" target="_blank">
                <span class="pb_rounded-4 px-4">Get Started</span>
              </a>
            </li> - - >
          </ul>
                </div>-->
            </div>
        </nav>
        <!-- END nav -->
        <router-view/>

        <footer class="pb_footer bg-light" role="contentinfo">
            <div class="container">
                <div class="row text-center">
                    <div class="col">
                        <!-- <ul class="list-inline">
                            <li class="list-inline-item">
                                <a href="#" class="p-2">
                                    <i class="fa fa-facebook"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="p-2">
                                    <i class="fa fa-twitter"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="p-2">
                                    <i class="fa fa-linkedin"></i>
                                </a>
                            </li>
                        </ul> -->
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <p class="pb_font-14">
                            &copy; 2019
                            Chris Wallace. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'App',
    data: () => ({
        navbarClasses: { scrolled: false, awake: false }
    }),
    methods: {
        handleScroll (event) {
            const st = window.scrollY;

            if (st > 150) {
                if (!this.navbarClasses.scrolled) {
                    this.navbarClasses.scrolled = true;
                }
            }
            if (st < 150) {
                if (this.navbarClasses.scrolled) {
                    this.navbarClasses.scrolled = false;
                }
            }
            if (st > 350) {
                if (!this.navbarClasses.awake) {
                    this.navbarClasses.awake = true;
                }
            }
            if (st < 350) {
                if (this.navbarClasses.awake) {
                    this.navbarClasses.awake = false;
                }
            }
        }
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
    }
};
</script>

<style lang="scss">
@import "./assets/scss/bootstrap/bootstrap";
@import "./assets/scss/slick";
@import "./assets/scss/slick-theme";
@import "./assets/scss/helpers";
@import "./assets/scss/style";
@import "./assets/scss/landing-2";

#section-home {
    .container {
        margin-top: 2em;
        margin-bottom: 2em;
    }
}
</style>
