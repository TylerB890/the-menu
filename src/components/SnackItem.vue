<template>
  <div class="container flex justify-center items-center">
    <div
      v-if="snacks.length > 0"
      class="bg-cyan-600 rounded-md mt-4 p-2 w-4/5 lg:w-1/2"
    >
      <h1 class="font-bold text-lg">&#x1F968; Snacks:</h1>
      <ul>
        <li v-for="snack in snacks" :key="snack" class="snack">{{ snack }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "SnackItem",
  props: {
    snacks: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
});
</script>
