<template>
  <div class="header">{{ num }}</div>
  <button style="width: 40px" @click="num = num * 2">乘以2</button>
</template>

<script>
// *** 不能用setup语法糖，否则这个vue文件无法被webpack解析
// *** 如果需要使用setup语法糖，还需要配置相关的webpack内容
import { ref } from 'vue';

export default {
  name: "Header",
  setup() {
    const num = ref(1);

    return {
      num
    }
  }
}
</script>

<style scoped>
  .header {
    height: 30px;
    background-color: #b7d4a8;
    color: black;
    line-height: 30px;
    font-size: 20px;
  }
</style>
