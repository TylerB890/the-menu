<template>
  <div class="bg-gray-300 rounded-lg my-1 p-2 w-4/5 md:w-3/5 flex">
    <input
      class="checkbox mr-8 ml-2 w-6 h-6"
      type="checkbox"
      id="{{item.id}}"
      @change="checked()"
    />
    <label
      class="my-auto font-bold"
      :for="item.id"
      :striked="striked"
      :style="striked ? styleObject : 'none'"
      >{{ item.name }}</label
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import type { Ref } from "vue";

export default defineComponent({
  name: "ShoppingItem",
  emits: ["checkedItem"],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const striked: Ref<boolean> = ref(false);
    const styleObject = reactive({
      textDecoration: "line-through",
      textDecorationThickness: "2px",
    });

    function checked() {
      striked.value = !striked.value;
      context.emit("checkedItem", props.item.id);
    }

    return {
      striked,
      checked,
      styleObject,
    };
  },
});
</script>
