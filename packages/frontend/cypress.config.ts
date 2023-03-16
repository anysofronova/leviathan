import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://localhost:3000/'
  },
  env: {
    API_URL: 'http://localhost:1776/api'
  }
})
