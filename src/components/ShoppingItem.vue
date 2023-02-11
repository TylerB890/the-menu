<script setup lang="ts">
  import {ref, reactive } from "vue";
  import type {Ref} from "vue";

  interface Item {
    name: string,
  };

  const props = defineProps<{
    item: Item
  }>();

  const emits = defineEmits<{
    (e: 'checkedItem', id: string): void
  }>();

  const striked: Ref<boolean> = ref(false);
  const styleObject = reactive({
    textDecoration: "line-through",
    textDecorationThickness: "2px",
  });

  function checked() {
    striked.value = !striked.value;
    emits("checkedItem", props.item.name);
  }
</script>

<template>
  <div class="bg-gray-300 rounded-lg my-1 p-2 w-4/5 md:w-3/5 flex">
    <input
      class="checkbox mr-8 ml-2 w-6 h-6"
      type="checkbox"
      id="{{item.name}}"
      @change="checked()"
    />
    <label
      class="my-auto font-bold"
      :for="item.name"
      :striked="striked"
      :style="striked ? styleObject : 'none'"
      >{{ item.name }}</label
    >
  </div>
</template>