<template>
  <div>
    <div class="box">
      <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">用户登录</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
      <el-button type="" @click="fetchHtml">测试</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  components: {},
  data () {
    return {
       //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
      ruleForm: {
        //username和password默认为空
        username: 'admin',
        password: '123456',
        code: '',
        randomStr: '',
        codeimg: ''
      },
      //rules前端验证
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    };
  },

  created() {},

  methods: {
    submitForm(formName) {
      this.$router.push({ path:'/DatePickerWeek' })
      this.$refs[formName].validate(valid => {
        if (valid) {
         
        } else {
          
        }
      })
    },
    fetchHtml(){
      // fetch('http://192.168.4.2:8090/#/').then((result) => {
        
      // }).catch((err) => {
        
      // });
    },
  },

  computed: {},

  mounted(){},

  watch: {}
}

</script>
<style lang='css' scoped>
.box{
  justify-content: center;
  display: flex;
  align-items: center;
}
</style>