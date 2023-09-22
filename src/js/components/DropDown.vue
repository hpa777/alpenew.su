<template>
  <div class="relative" v-on-click-outside="closeList">
    <div @click="showOptions=!showOptions"
      class="relative flex h-16 w-full cursor-pointer items-center overflow-hidden rounded-md border border-slate-400 pl-5"
    >
      <div class="flex items-center text-xl">
        <div class="mr-4 h-11 w-9" v-if="selectedItem.icon" v-html="selectedItem.icon"></div>
        <span>{{ selectedItem.text }}</span>
      </div>

      <div
        class="absolute right-0 top-0 flex h-full w-8 items-center justify-center bg-white"
      >
        <svg
          width="15"
          height="12"
          viewBox="0 0 15 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 2L7.5 11L2 2"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="square"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <div v-show="showOptions"
      class="absolute left-0 top-full z-10 -mt-[1px] w-full overflow-hidden rounded-md border border-slate-400 bg-white"
    >
      <div v-for="(item, key) in options" :key="key" @click="selectedItem = item; showOptions=false;"
        class="flex h-16 cursor-pointer items-center overflow-hidden px-5 text-xl hover:bg-alpen_red hover:text-white"
      >
        <div class="mr-4 h-11 w-9 flex items-center" v-if="item.icon" v-html="item.icon"></div>
        <span class="whitespace-nowrap">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { vOnClickOutside  } from '@vueuse/core'
import { ref } from 'vue'

export default {
  props: {
    options: Array
  },
  data() {
    return {
      showOptions: false,
      selectedItem: {
        icon:'',
        text:''
      }
    }
  },  
  mounted() {

  },
  methods: {
    closeList() {
      this.showOptions = false;
    }
  }
};
</script>

<style></style>
