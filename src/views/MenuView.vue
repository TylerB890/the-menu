<template>
  <MenuItem v-for="day in dayList" :mealDay="day" :key="day.date" />
  <SnackItem :snacks="snacks" />
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";
import { Ref } from "vue";
import MenuItem from "@/components/MenuItem.vue"; // @ is an alias to /src
import SnackItem from "@/components/SnackItem.vue";

export default defineComponent({
  name: "MenuView",
  components: {
    MenuItem,
    SnackItem,
  },
  setup() {
    const daysOfTheWeek: string[] = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    const menuTitle: Ref<string> = ref("PlaceHolder");

    interface Meals {
      lunch_t: string | null;
      lunch_a: string | null;
      lunch_a_office: string | null;
      dinner_t: string | null;
      dinner_a_office: string | null;
      lunch: string | null;
      dinner: string | null;
      misc: string | null;
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

    return {
      dayList,
      menuTitle,
      snacks,
    };
  },
});
</script>
