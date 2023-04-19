# Get Started

This page represents the entire documentation and guide for `vue-better-transition`. If you are looking for the API documentation, you can find it [here](#api-reference).

## What is Vue Better Transition

`vue-better-transition` is a simple package that provides you with better vue transition components that work with v-if and can retain their transition. If you are not sure what this means continue reading below.

## Installation

::: code-group

```sh [yarn]
yarn add vue-better-transition
```

```sh [pnpm]
pnpm add vue-better-transition
```

```sh [npm]
npm install vue-better-transition
```

:::

## Basic Usage

```html{3,9,10}
<template>
  <button @click="toggleShow"> Click me </button>
  <BetterTransition v-if="show.value" :visible="show">
    <p>hello</p>
  </BetterTransition>
</template>

<script setup lang='ts'>
import { transitionBoolean, BetterTransition } from 'vue-better-transition'
const show = transitionBoolean(true)

const toggleShow = () => {
  show.value = !show.value
}
</script>
```

<div class="custom-block">
<button class="m-btn" @click="show3.value = !show3.value"> Click me </button>
<BetterTransition v-if="show3.value" :visible="show3">

<p>hello</p>
</BetterTransition>
</div>

::: warning Note
`show` is mimicking a vue `ref`, it's actually a `reactive` object with a `value` property. check out the [API Reference](#api-reference) for more info.
:::

## Motivation

Vue provides an easy way to handle transitions in your app with thu use of 2 components: `Transition` and `TransitionGroup`. A simple example (taken from the [official docs](https://vuejs.org/guide/built-ins/transition.html#the-transition-component)) is the following:

```html
<Transition>
  <p v-if="show">hello</p>
</Transition>
```

<script setup lang='ts'>
import { BetterTransition} from  '../src/components'
import { transitionBoolean} from  '../src/utils'
import { ref } from 'vue'
const show = ref(true)
const show2 = ref(true)
const show3 = transitionBoolean(true)
const show4 = transitionBoolean(true)
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.m-btn {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #3eaf7c;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
}
.m-btn:hover {
  background-color: #3eaf7c;
  opacity: 0.8;
}
</style>

<button class="m-btn" @click="show = !show"> Click me </button>
<Transition>

  <p style="padding: 0.25rem" v-if="show">hello</p>
</Transition>

**However**, if you put the v-if on the transition itself then the transition won't work anymore.

```html{1}
<Transition v-if="show">
  <p>hello</p>
</Transition>
```

<button class="m-btn" @click="show2 = !show2"> Click me </button>
<Transition v-if="show2"> <p style="padding: 0.25rem" >hello</p> </Transition>

When `show` is set to false, vue immediately removes the transition node (and its children) from the DOM without waiting for the transition to complete. In other words you're not supposed to use it like this.

In some cases however, this is exactly what you want to do. To make it work, you usually have to use resort to suboptimal solutions that make your code less readable and maintainable. This is where `vue-better-transition` comes in. It allows you to do exactly that.

Here's an example where you might want to use this:

```html
<MyComponent1 v-if="show1" />
<Transition v-else-if="hasOtherItems">
  <MyComponent2 v-if="otherItem === '2'" />
  <MyComponent3 v-if="otherItem === '3'" />
  ...
</Transition>
```

You can't do tho above using `Transition` from vue. It won't work as expected. But you can achieve the expected behavior using `vue-better-transition`.

```html{2}
<MyComponent1 v-if="show1" />
<BetterTransition v-else-if="hasOtherItems.value" :visible="hasOtherItems">
  <MyComponent2 v-if="otherItem === '2'" />
  <MyComponent3 v-if="otherItem === '3'" />
  ...
</BetterTransition>
```

## Demo

```html
<template>
  <button @click="toggleShow">Click me</button>
  <BetterTransition v-if="show.value" :visible="show">
    <p>hello</p>
  </BetterTransition>
</template>
```

Notice how the transition works as expected event though `v-if` is used on the transition itself.

<button class="m-btn" @click="show4.value = !show4.value"> Toggle </button>
<BetterTransition v-if='show4.value' :visible='show4'>

  <p style="padding: 0.25rem" v-if="show">hello</p>
</BetterTransition>

## API Reference

### BetterTransition.vue

#### Props

`BetterTransition` accepts the same props as `Transition` from vue. It also accepts a required prop: `visible` that will help it wait for the transition to finish before destroying the transition node.

| Name                  | Type                                                                               | Default / Required | Description                                                     |
| --------------------- | ---------------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------- |
| visible               | `reactive` object created using `transitionBoolean` or `computedTransitionBoolean` | required: true     | helps `BetterTransition` time the visibility correctly          |
| Vue's TransitionProps | found [here](https://v3.vuejs.org/api/built-in-components.html#transition-props)   | -                  | Props that are passed to the underlying `Transition` component. |

#### Slots

`BetterTransition` accepts the same slot as `Transition` from vue, which is the `default` slot.

#### Emits

`BetterTransition` emits the same events as `Transition` from vue, which are described [here](https://vuejs.org/api/built-in-components.html#transition).

### transitionBoolean

transitionBoolean is a function that creates a `reactive` object with a `value` property. It's used to create a boolean that can be used with `BetterTransition` to time the visibility correctly.

#### Arguments

| Name   | Type    | Default | Description                       |
| ------ | ------- | ------- | --------------------------------- |
| value  | boolean | -       | the initial value of the boolean  |
| delay? | number  | 500     | the minimum delay in milliseconds |

The `delay` is used to make sure that the transition has enough time to finish before the transition node is destroyed. if you have slow transitions you might want to increase the delay. In most cases you don't need to worry about this.

::: info Note
you may be conservative and set the delay to a higher value than the actual transition duration. This will have no negative effect on the transition. It will just make sure that the transition node is not destroyed before the transition is finished.
:::

#### Returns

A `reactive` object with a `value` property and a `__realValue` property. The `value` property is the boolean that you can use to control the visibility of the transition. The `__realValue` property is used internally and should not be used.

```ts
type TransitionBoolean = {
  value: boolean
  __realValue: boolean // this is used internally, don't use it
}
```

### computedTransitionBoolean

`computedTransitionBoolean` is very similar to `transitionBoolean`. The difference is that you can create a `computed` boolean that can be used with `BetterTransition`. For example:

```ts
const myItems = ref([])
const show = computedTransitionBoolean(() => myItems.value.length > 0)

onMounted(() => {
  console.log(show.value) // ---> false
  myItems.value = [1, 2, 3]
  nextTick(() => {
    console.log(show.value) // --->  becomes `true` just like a computed() boolean
  })
})
```

#### Arguments

| Name   | Type          | Default | Description                                 |
| ------ | ------------- | ------- | ------------------------------------------- |
| getter | () => boolean | -       | the getter function of the computed boolean |
| delay? | number        | 500     | same as `transitionBoolean`                 |

#### Returns

it returns a **readonly** `TransitionBoolean`

## License

MIT
