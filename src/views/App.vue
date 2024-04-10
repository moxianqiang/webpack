<template>
  <div class="main">
    <div>你好，世界！！</div>
    <Header />
  </div>
</template>

<script>
import Header from "./header/Header.vue";

export default {
  name: "App",
  components: { Header }
}
</script>

<style lang="less" scoped>
  .main {
    color: indianred;
    font-size: 30px;
  }
</style>
