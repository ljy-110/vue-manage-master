<template>
  <div class="hello">
    <h2>水平垂直居中</h2>
    <div class="box center">
      <div class="box-a">
        <img src="../assets/logo.png" alt="" srcset="">
      </div>
    </div>
    <!-- <h3>让多个元素实现水平垂直居中的效果</h3>
    <div class="box center-duo">
      <div class="box-a">
        <img src="../assets/logo.png" alt="" srcset="">
      </div>
      <div class="box-a">
        <img src="../assets/logo.png" alt="" srcset="">
      </div>
      <div class="box-a">
        <img src="../assets/logo.png" alt="" srcset="">
      </div>
    </div> -->
    <!-- <h3>让icon多个元素实现水平垂直居中的效果,并排效果</h3>
    <div class="box center-icon">
      <div class="box-a">
        <img src="../assets/logo.png" alt="" srcset="">
      </div>
      <div class="box-a">
        <img src="../assets/logo.png" alt="" srcset="">
      </div>
      <div class="box-a">
        <img src="../assets/logo.png" alt="" srcset="">
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{
  width: 400px;
  height: 400px;
  background-color: #ccc;
}
.box-a{
  width: 200px;
  height: 200px;
  /* background-color: greenyellow; */
}
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
.center-duo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box-a img{
  width: 50px;
}
.center-icon{
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
