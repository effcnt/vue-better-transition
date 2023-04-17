import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Vue Better Transition',
  description: 'Use v-if on transition ✨',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/get-started' },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/effcnt/vue-better-transition',
      },
    ],
  },
})
