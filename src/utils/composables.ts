import { reactive, watch, nextTick, readonly } from 'vue'

/**
 * Use instead of ref(boolean) for vue-better-transition.
 * @param {boolean} value
 * @param {number} delay - (optional) The delay in milliseconds (default 500) for the transition.
 * @returns - The reactive object that is similar to a boolean ref.
 * @example
 * const showConfirmationModal = transitionBoolean(false)
 *
 * <BetterTransition v-if="showConfirmationModal.value" :visible="showConfirmationModal"> ... </BetterTransition>
 */
export const transitionBoolean = (value: boolean, delay: number = 500) => {
  const obj = reactive({
    value,
    __realValue: value,
  })
  let internalChange = false
  let timeout: any
  watch(
    () => obj.__realValue,
    async (newValue) => {
      console.log('real value changed to', newValue, internalChange)
      if (internalChange) {
        internalChange = false
        return
      }
      if (newValue) {
        internalChange = true
        obj.value = true
        await nextTick()
        internalChange = false
        timeout && clearTimeout(timeout)
      } else {
        timeout = setTimeout(async () => {
          internalChange = true
          obj.value = false
          await nextTick()
          internalChange = false
        }, delay)
      }
    },
    { immediate: true },
  )
  watch(
    () => obj.value,
    async (newValue, oldValue) => {
      if (internalChange) return
      if (!newValue) {
        internalChange = true
        obj.value = oldValue
        await nextTick()
        internalChange = false
      }
      obj.__realValue = newValue
    },
  )
  return obj
}

/**
 * Use instead of `computed()` for vue-better-transition.
 * @param {function} getter - The getter function.
 * @param {number} [delay=500] - (Optional) The delay (in milliseconds) for the transition.
 * @returns {object} - The reactive object that is similar to a computed.
 * @example
 * const showErrorModal = computedTransitionBoolean(() => errors.value.length > 0)
 * <BetterTransition v-if="showErrorModal.value" :visible="showErrorModal"> ... </BetterTransition>
 **/
export const computedTransitionBoolean = (
  getter: () => boolean,
  delay: number = 500,
) => {
  const obj = reactive({
    value: getter(),
    __realValue: getter(),
  })
  let timeout: any
  watch(
    () => obj.__realValue,
    (newValue) => {
      if (newValue) {
        obj.value = true
        timeout && clearTimeout(timeout)
      } else {
        timeout = setTimeout(() => {
          obj.value = false
        }, delay)
      }
    },
    { immediate: true },
  )
  watch(getter, (newValue) => {
    obj.__realValue = newValue
  })
  return readonly(obj)
}
