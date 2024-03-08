<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
    <h1 class="text-3xl bg-sky-700 title">
    Hello world!
  </h1>

</template>

<style scoped>
@import './HelloWorld.css';
</style>
