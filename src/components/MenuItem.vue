<template>
  <div class="container flex justify-center items-center">
    <div class="bg-green-700 rounded-md mt-4 p-2 w-4/5 lg:w-1/2">
      <h1 class="font-bold text-lg">{{ mealDay.date }}</h1>
      <p v-if="mealDay.meals.lunch_t">
        &#x1F468; Lunch: {{ mealDay.meals.lunch_t }}
      </p>
      <p v-if="mealDay.meals.lunch_a_office">
        &#x1F469; &#x1F3E2; Lunch: {{ mealDay.meals.lunch_a_office }}
      </p>
      <p v-else-if="mealDay.meals.lunch_a">
        &#x1F469; Lunch: {{ mealDay.meals.lunch_a }}
      </p>
      <p v-if="mealDay.meals.dinner_t">
        &#x1F468; Dinner: {{ mealDay.meals.dinner_t }}
      </p>
      <p v-if="mealDay.meals.dinner_a_office">
        &#x1F469; &#x1F3E2; Dinner: {{ mealDay.meals.dinner_a_office }}
      </p>
      <p v-else-if="mealDay.meals.dinner_a">
        &#x1F469; Dinner: {{ mealDay.meals.dinner_a }}
      </p>
      <p v-if="mealDay.meals.dinner">
        &#x1F46B; Dinner: {{ mealDay.meals.dinner }}
      </p>
      <p v-if="mealDay.meals.misc">&#x23F0; Misc: {{ mealDay.meals.misc }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MenuItem",
  props: {
    mealDay: {
      type: Object,
      required: true,
    },
  },
});
</script>
