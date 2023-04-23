# Vue Better Transition

<a href="https://www.npmjs.com/package/vue-better-transition"><img src="https://img.shields.io/npm/v/vue-better-transition.svg" alt="Version"></a>
<a href="https://www.npmjs.com/package/vue-better-transition"><img src="https://img.shields.io/github/license/effcnt/vue-better-transition.svg" alt="Vue Better Transition is released under the MIT license."></a>
<a href="https://www.npmjs.com/package/vue-better-transition"><img src="https://img.shields.io/npm/dm/vue-better-transition.svg" alt="Downloads"></a>
<a href=""><img src="https://img.shields.io/badge/Dependencies-0-lightgray" alt="Vue Better Transition has no dependencies"></a>

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
