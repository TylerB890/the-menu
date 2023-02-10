<template>
  <iframe name="dummyframe" id="dummyframe" style="display: none"></iframe>
  <form enctype="multipart/form-data" target="dummyframe">
    <label for="mealList">Select the Meal List File to Upload:</label><br />
    <input
      type="file"
      id="mealList"
      name="mealList"
      accept=".txt"
      @change="handleFileChange($event)"
      ref="fileForm"
    />
    <div>
      <button
        class="flex mx-auto mt-4 px-2 bg-blue-400 rounded-lg"
        @click="submitClick"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "LoadView",
  setup() {
    let fileData: File;
    function handleFileChange($event: Event) {
      const target = $event.target as HTMLInputElement;
      if (target && target.files) {
        fileData = target.files[0];
      }
    }
    function submitClick() {
      const formData = new FormData();
      if (!fileData) {
        return;
      } else {
        formData.append("mealList", fileData);
        axios({
          url: process.env.VUE_APP_API_ENDPOINT + "/api/mymeallisttrigger",
          headers: {
            "Content-type": "multipart/form-data",
            "x-functions-key": process.env.VUE_APP_API_KEY,
          },
          method: "post",
          data: formData,
        })
          .then()
          .catch();
      }
    }

    return {
      submitClick,
      handleFileChange,
    };
  },
});
</script>
