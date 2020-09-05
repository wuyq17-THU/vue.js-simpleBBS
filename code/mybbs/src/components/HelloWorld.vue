<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>点击下方登录进入，如已经登录请点击上方home链接</p>
    <el-button type="success" round @click="login">登录</el-button>    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    login:function(){
      this.$router.push({name:'login'});
    }
  }
}
</script>