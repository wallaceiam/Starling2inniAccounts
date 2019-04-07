<template>
    <div id="file-download">
        <div id="content">
            <div class="notify successbox" v-if="isSuccess">
                <span class="alerticon">
                    <i class="fas fa-check-circle" alt="checkmark"></i>
                </span>
                <p class="mbt-1">Click continue to download your new CSV file which you can import into inniAccounts</p>
                <button
                    class="button-box btn btn-primary btn-lg pb_btn-pill btn-shadow-blue"
                    v-on:click="exportCSV"
                >Continue</button>
                <p class="mtb-1">
                    <a href="#" v-on:click="reset">Convert another?</a>
                </p>
            </div>

            <div class="notify errorbox" v-if="isFailed">
                <span class="alerticon">
                    <i class="fas fa-exclamation-circle" alt="error"></i>
                </span>
                <p class="mbt-1">Oh no, something went wrong.</p>
                <p class="mtb-1">{{ uploadError }}</p>

                <button
                    class="button-box btn btn-primary btn-lg pb_btn-pill btn-shadow-blue"
                    v-on:click="reset"
                >Try again</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    computed: {
        ...mapGetters(["isSuccess", "isFailed"]),
        ...mapState(["uploadError"])
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
/** typography **/
h1 {
    color: #444;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}
h1:before,
h1:after {
    content: "";
    position: relative;
    display: inline-block;
    width: 50%;
    height: 1px;
    vertical-align: middle;
    background: #f0f0f0;
}
h1:before {
    left: -0.5em;
    margin: 0 0 0 -50%;
}
h1:after {
    left: 0.5em;
    margin: 0 -50% 0 0;
}
h1 > span {
    display: inline-block;
    vertical-align: middle;
    white-space: normal;
}
a {
    color: #1d82ff;
}
p.mtb-1 {
    margin-top: 1rem;
    margin-bottom: 1rem;
}
/** page structure **/
#w {
    display: block;
    width: 750px;
    margin: 0 auto;
    padding-top: 30px;
}
#content {
    display: block;
    width: 100%;
    background: #fff;
    padding: 25px 20px;
    padding-bottom: 35px;
}

/** notifications **/
.notify {
    display: block;
    background: #fff;
    padding: 12px 18px;
    max-width: 400px;
    margin: 0 auto;
}
.notify h1 {
    margin-bottom: 6px;
}
.successbox h1,
.successbox .alerticon {
    color: #155724;
}
.errorbox h1,
.errorbox .alerticon {
    color: #721c24;
}
.successbox h1:before,
.successbox h1:after {
    background: #cad8a9;
}
.errorbox h1:before,
.errorbox h1:after {
    background: #d6b8b7;
}
.notify .alerticon {
    display: block;
    text-align: center;
    margin-bottom: 10px;
    i {
        font-size: 3em;
    }
}

.myButton {
    background-color: #7892c2;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    border: 1px solid #4e6096;
    display: inline-block;
    cursor: pointer;
    color: #ffffff;
    font-family: Arial;
    font-size: 17px;
    padding: 16px 31px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #283966;
}
.myButton:hover {
    background-color: #476e9e;
}
.myButton:active {
    position: relative;
    top: 1px;
}

/*$white: #fcfcfc;
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
        margin-left: auto;
        margin-right: auto;
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
}*/
</style>
