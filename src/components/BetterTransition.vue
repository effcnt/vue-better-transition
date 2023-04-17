<template>
  <Transition v-bind="$props">
    <template v-if="isMounted && visible.__realValue">
      <slot />
    </template>
  </Transition>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

defineProps<Props>()

const isMounted = ref(false)
onMounted(async () => {
  await nextTick()
  isMounted.value = true
})
</script>

<script lang="ts">
import { TransitionProps } from 'vue'
type Visible = { value: boolean; __realValue: boolean }

interface Props extends TransitionProps {
  visible: Visible
}
</script>
