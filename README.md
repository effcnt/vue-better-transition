# Vue Better Transition

`vue-better-transition` is a simple package that provides a better Vue.js transition component that works with the `v-if` directive and can retain its transition.

## Features

- Works with `v-if` directive for better control over transitions
- Built on top of Vue.js' `transition` component and supports all of its props and events
- ships with `transitionBoolean` and `computedTransitionBoolean` (equivalent to ref/reactive and computed) that can be used with `<BetterTransition>` component

## Installation

Install the package using your favorite package manager:

```sh
# Yarn
yarn add vue-better-transition

# pnpm
pnpm add vue-better-transition

# npm
npm install vue-better-transition
```

## Usage

```html
<template>
  <button @click="toggleShow">Click me</button>
  <BetterTransition v-if="show.value" :visible="show">
    <p>hello</p>
  </BetterTransition>
</template>

<script setup lang="ts">
  import { transitionBoolean, BetterTransition } from 'vue-better-transition'
  const show = transitionBoolean(true)

  const toggleShow = () => {
    show.value = !show.value
  }
</script>
```

## Documentation

For a comprehensive guide and complete API reference, please visit the [official documentation](https://vue-better-transition.netlify.app/)

## Contributing

Contributions, issues and feature requests are welcome!

## License

This project is licensed under the MIT License.
