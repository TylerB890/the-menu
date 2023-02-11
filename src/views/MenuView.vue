<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import type { Ref } from "vue";
import MenuItem from "@/components/MenuItem.vue"; // @ is an alias to /src
import SnackItem from "@/components/SnackItem.vue";

const daysOfTheWeek: string[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

interface Meals {
  lunch_t?: string;
  lunch_a?: string;
  lunch_a_office?: string;
  dinner_t?: string;
  dinner_a_office?: string;
  lunch?: string;
  dinner?: string;
  misc?: string;
}

interface MenuDay {
  date: string;
  meals: Meals;
}

const dayList: Ref<MenuDay[]> = ref([]);
let snacks: Ref<string[]> = ref([]);

axios({
  url: process.env.VUE_APP_API_ENDPOINT + "api/meallistgetter",
  headers: {
    "Content-type": "multipart/form-data",
    "x-functions-key": process.env.VUE_APP_API_KEY,
  },
  method: "get",
})
.then((response) => {
  for (let item in response.data) {
    if (daysOfTheWeek.indexOf(item) > -1) {
      let mealObj = response.data[item].meals as Meals;
      // mealArr.push({meal: response.data[item].meals[meal]})
      dayList.value.push({
        date: response.data[item].date,
        meals: mealObj,
      });
    } else if (item === "snacks") {
      snacks.value = response.data[item] as string[];
    }
  }
})
.catch();
</script>

<template>
  <MenuItem v-for="day in dayList" :mealDay="day" :key="day.date" />
  <SnackItem :snacks="snacks" />
</template>