<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import type { Ref } from "vue";
import ShoppingItem from "@/components/ShoppingItem.vue"; // @ is an alias to /src

interface ShoppingListItem {
  name: string;
}

const apiKey = process.env.VUE_APP_API_KEY;

const itemList: Ref<ShoppingListItem[]> = ref([]);
const boughtList: Ref<string[]> = ref([]);

axios({
  url: process.env.VUE_APP_API_ENDPOINT + "api/meallistgetter",
  headers: {
    "Content-type": "multipart/form-data",
    "x-functions-key": apiKey,
  },
  method: "get",
})
.then((response) => {
  let listItems = response.data.shopping_list;
  let boughtItems = response.data.bought;
  let itemsLeft: string[] = [];
  if (boughtItems) {
    itemsLeft = listItems.filter(
      (item: string) => !boughtItems.includes(item)
    );
  } else {
    itemsLeft = listItems;
  }
  itemsLeft.forEach((item: string) => {
    addItem({ name: item } as ShoppingListItem);
  });
})
.catch();

function addItem(item: ShoppingListItem) {
  if (item.name !== "") {
    itemList.value.push(item);
  } else {
    throw new Error("Empty sting provided for item name");
  }
}

function onItemSelect(item: ShoppingListItem) {
  if (item.name !== "" && !boughtList.value.includes(item.name)) {
    boughtList.value.push(item.name);
  } else if (item.name !== "") {
    boughtList.value.splice(boughtList.value.indexOf(item.name), 1);
  } else {
    throw new Error("item name passed to function is empty");
  }
}

function clearItems() {
  axios({
    url: process.env.VUE_APP_API_ENDPOINT + "api/shoppinglistupdater",
    headers: {
      "Content-type": "application/json",
      "x-functions-key": apiKey,
    },
    method: "put",
    data: boughtList, //will update most recent meallist
  })
    .then((response) => {
      itemList.value = itemList.value.filter(
        (item) => boughtList.value.indexOf(item.name) === -1
      );
      boughtList.value = [];
    })
    .catch();
}

</script>

<template>
  <div class="container grid place-items-center grid-cols-1 mx-auto">
    <ShoppingItem
      v-for="item in itemList"
      :key="item.name"
      :item="item"
      @checkedItem="onItemSelect(item)"
    />
  </div>
  <div class="fixed inset-x-0 bottom-0">
    <button
      class="bg-blue-400 rounded-t-md inset-x-0 w-full md:w-3/5 p-2 mx-auto sticky bottom-0"
      :onClick="clearItems"
    >
      Finish Grocery Run
    </button>
  </div>
</template>
