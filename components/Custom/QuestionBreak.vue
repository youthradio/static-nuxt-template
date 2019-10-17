<template>
  <div :class="[`question-${id}`, 'break-question']">
    <main>
      <h3 class="questionstyle">
        {{ questionData.headline }}
      </h3>
      <ul>
        <li
          v-for="(option,i) in questionData.options"
          :key="`question-${i}`"
        >
          <input
            :id="`question-${id}-option-${i}`"
            v-model="innervalue"
            :name="questionData.topic"
            type="radio"
            :value="option"
          >
          <div class="check" />
          <label :for="`question-${id}-option-${i}`">
            {{ option.option }} </label>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      require: true,
      default: null
    },
    questionData: {
      type: Object,
      require: true,
      default: null
    },
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      innervalue: null
    }
  },
  watch: {
    innervalue () {
      this.$emit('input', this.innervalue)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '~@/css/vars';
// Unique colors for both Subheader and Break question
.question-0{
  background-color: #FFDB5A;
}
.question-1{
  background-color: #F7825D;
}
.question-2{
  background-color: #ED5B5B;
}
.question-3{
  background-color: #3C76CB;
}
.question-4{
  background-color: #3CC2CB;
}
.break-question {
  border-radius: 1rem;
  padding: 1rem;
  display: block;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.break-question label{
  display: block;
  position: relative;
}
.questionstyle{
  font-size: 1rem;
}
h3 {
  font-weight: 900;
}
main{
  max-width: 30rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;

  li{
    color: $black;
    display: block;
    display: flex;
    align-items: center;
    position: relative;

    .check {
      display: block;
      position: absolute;
      top: 3px;
      left: 3px;
      border: 1.5px solid $black;
      border-radius: 100%;
      height:1rem;
      width: 1rem;
      z-index: 5;
      transition: border .25s linear;

      &::before {
        display: block;
        position: absolute;
        content: '';
        border-radius: 100%;
        left: calc(-1.5px + 0.25rem);
        top: calc(-1.5px + 0.25rem);
        height: 0.5rem;
        width: 0.5rem;
        transition: background 0.25s linear;
      }
    }
    input[type=radio]{
      position: absolute;
      visibility: hidden;
    }
    label {
      z-index: 20;
      cursor: pointer;
      padding-left: 1.5rem;
      transition: all 0.25s linear;
    }
    &:hover label{
      color: $white;
    }
    &:hover .check {
      border:1.5px solid $white;
    }
  }

}
  input[type=radio]:checked ~ .check {
    border: 1.5px solid $white;
  }

  input[type=radio]:checked ~ .check::before{
    background: $white;
  }

  input[type=radio]:checked ~ label{
    color: $white;
  }
</style>
