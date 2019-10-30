<template>
  <div class="subscriptions">
    <div>
      <h3 class="title">
        Get Fresh Updates
      </h3>
      <form class="mc-form" method="POST" action="" @submit.prevent="submit">
        <input
          v-model="email"
          class="text email"
          type="email"
          name="mc-email"
          rrequired
          placeholder="enter email address"
        >
        <input v-model="name" type="text" value="pending" name="status" hidden="">
        <button class="submit icon-arrow-right" type="submit" name="submit" />
        <p v-if="response && response.error" class="message error-message">
          {{ response.message }}
        </p>
        <p v-if="response && response.sucess" class="message">
          {{ response.message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      name: null,
      email: null,
      response: null

    }
  },
  methods: {
    encode (obj) {
      return Object.keys(obj).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
      }).join('&')
    },
    async submit () {
      const url = 'https://yr.media/wp-admin/admin-ajax.php'

      const data = {
        action: 'mailchimp_subscription',
        email: this.email

      }
      try {
        const res = await fetch(url,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;'
            },
            body: this.encode(data)
          })
        this.response = await res.json()
      } catch (error) {
        // console.log(error)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~@/css/mixins';
@import "~@/css/vars";

form {

    > input[type="text"],
    > input[type="email"]{
      &:invalid {
        color: $red;
      }

      &:valid {
        color: $white;
      }
    }
}

ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
}
a {
    border-bottom: 0px;
}

footer {
    padding-top: 1rem;
}

.top-block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 3rem 2rem 3rem 2rem;
    background-color: $black;
    @include breakpoint (medium){
        padding: 2rem 4rem 2rem 4rem;
        flex-direction: row;
    }
    .item {
        padding: 1rem 1rem 1rem 1rem;
        @include breakpoint (medium){
            padding: 0rem 0.5rem 0rem 0.5rem;
        }
    }
}
.logo{
    display: none;
    width: 0;
    margin-right: 0;
    transform: translateY(0) scale(0);
    @include breakpoint (small){
        transform: translateY(0.5rem) scale(1.65);
        display: block;
        width: 40px;
        margin-right: 2rem;
    }
}
.menu-container{
    text-transform: uppercase;
      font: 900 22px/1.8 "Roboto Mono", sans-serif;
      letter-spacing: 2px;
      text-transform: uppercase;
        a {
        color: $green;

        }
        a:hover {
            color: $white;
            background-color: inherit;
        }
        ul {
            column-count: 1;
              @include breakpoint (large){
                column-count: 2;
              }
            column-gap: 40px;
        }
        li {
          padding: 0.2rem 0 0.2rem 0;
        }
}
.social-container{
        a {
        color: $grey;
        }
        p {
        font-size: 70%;
        color: $grey;
        }
        li {
            text-align: center;
        }
        ul {
            column-count: 4;
        }
}

.subscriptions {
    padding: 3rem 2rem 3rem 2rem;
    background-color: $green;

    & > div {
      @include breakpoint(large) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .title {
      margin-bottom: 20px;
      color: white;
      font: 700 25px 'Calps', sans-serif;
      letter-spacing: 1.35px;

      @include breakpoint(small) {
        font: 700 57px 'Calps', sans-serif;
        letter-spacing: 0.57px;
      }
      @include breakpoint(large) {
        margin: 0;
        margin-right: 30px;
      }

    }

    .message {
      margin-top: 20px;
      font: 20px 'Roboto Mono', sans-serif;
      color: white;
    }
  }

.mc-form {
  position: relative;
  width: 100%;
  max-width: 600px;

  .text {
    width: 100%;
    padding: 15px 50px 15px 15px;
    background-color: transparent;
    border: 3px solid white;
    color: white;
    font: 700 15px 'Calps', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1.5px;

    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: white;
    }
    &::-moz-placeholder { /* Firefox 19+ */
      color: white;
    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: white;
    }
    &:-moz-placeholder { /* Firefox 18- */
      color: white;
    }

    @include breakpoint(small) {
      padding: 12px 50px 12px 15px;
      font: 700 20px 'Roboto Mono', sans-serif;
      letter-spacing: 8.05px;
      color: white;

      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: white;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        color: white;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        color: white;
      }
      &:-moz-placeholder { /* Firefox 18- */
        color: white;
      }

    }
  }

  .submit {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 53px;
    background-color: white;
    font-size: 20px;

    @include breakpoint(small) {
      height: 55px;
    }

    &::before {
      color: $green;

      @include breakpoint(small) {
        color: $green;
      }
    }
  }

  .message {
    padding-left: 15px;

    @include breakpoint(small) {
      padding-left: 12px;
    }
  }

  .error-message {
    color: red;
  }
}
</style>
