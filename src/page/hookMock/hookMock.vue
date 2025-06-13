<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="文本">
        <el-input v-model="form.text"></el-input>
      </el-form-item>
      <el-form-item label="核心短语"> 
        <el-input v-model="form.coreValuePhrase"></el-input>
      </el-form-item>
      <el-form-item label="身份证"> 
        <el-input v-model="form.idCard"></el-input>
      </el-form-item>
      <el-form-item label="邮箱"> 
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="省、市"> 
        <el-input v-model="form.provinceCity"></el-input>
      </el-form-item>
      <el-form-item label="职位">
        <el-input v-model="form.jobTitle"></el-input>
      </el-form-item>
      <el-form-item label="时间"> 
        <el-input v-model="form.currentDateTime"></el-input>
      </el-form-item>
      <el-form-item label="公司"> 
        <el-input v-model="form.companyName"></el-input>
      </el-form-item>
      <el-form-item label="车牌">
        <el-input v-model="form.licensePlate"></el-input>
      </el-form-item>
      <el-form-item label="民族"> 
        <el-input v-model="form.ethnicGroup"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用代码"> 
        <el-input v-model="form.unifiedSocialCreditCode"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { generatePhoneNumber,generateChineseName,generateCoreValuePhrase,generateRandomText,generateIDCard,
  generateEmail,generateProvinceCity,generateJobTitle,generateCurrentDateTime,generateCompanyName,generateLicensePlate,
  generateEthnicGroup,generateUnifiedSocialCreditCode
 } from '../../assets/js/hockText.js';
export default {
  props: {},
  components: {},
  watch: {},
  computed: {},
  data () {
    return {
      form: {
        phone: generatePhoneNumber(),
        name: generateChineseName(),
        text: generateRandomText(),
        coreValuePhrase: generateCoreValuePhrase(),
        idCard: generateIDCard(),
        email: generateEmail(),
        provinceCity: generateProvinceCity(),
        jobTitle: generateJobTitle(),
        currentDateTime: generateCurrentDateTime('yyyy-MM-dd HH:mm:ss'),//默认yyyy-MM-dd
        companyName:generateCompanyName(),
        licensePlate:generateLicensePlate(),
        ethnicGroup:generateEthnicGroup(),
        unifiedSocialCreditCode:generateUnifiedSocialCreditCode()
      }
    };
  },
  mounted () {},
  created () {},
  methods: {},
  beforeCreated () {},
  beforeMounted () {},
  beforeUpdated () {},
  updated () {},
  beforeDestroy () {},
  destroyed () {},
}

</script>
<style lang='less' scoped>
</style>