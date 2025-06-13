/**
 * 工具函数集合
 * 提供各种实用工具函数
 */

/**
 * MARK:生成随机手机号码
 * @param {Object} options 配置选项
 * @param {string} [options.prefix=''] 手机号前缀，如：138、139等，不传则随机生成
 * @param {number} [options.count=1] 生成数量，默认生成1个
 * @param {string} [options.format='normal'] 格式化方式：'normal'不格式化，'space'按3-4-4格式添加空格，'hyphen'按3-4-4格式添加连字符
 * @returns {string|Array<string>} 当count=1时返回字符串，否则返回字符串数组
 */
export function generatePhoneNumber(options = {}) {
  const { prefix = '', count = 1, format = 'normal' } = options;
  
  // 常见手机号前缀
  const commonPrefixes = [
    // 移动
    '134', '135', '136', '137', '138', '139', '150', '151', '152', '157', '158', '159',
    '182', '183', '184', '187', '188', '178', '147', '172', '198',
    // 联通
    '130', '131', '132', '155', '156', '185', '186', '145', '146', '166', '175', '176',
    // 电信
    '133', '153', '180', '181', '189', '177', '173', '199',
    // 虚拟运营商
    '170', '171'
  ];
  
  // 生成单个手机号
  function generateSingle() {
    // 确定前缀
    let actualPrefix = prefix;
    if (!actualPrefix) {
      // 随机选择一个前缀
      const randomIndex = Math.floor(Math.random() * commonPrefixes.length);
      actualPrefix = commonPrefixes[randomIndex];
    }
    
    // 生成剩余的数字（总共11位，减去前缀的位数）
    const remainingLength = 11 - actualPrefix.length;
    let remainingNumbers = '';
    for (let i = 0; i < remainingLength; i++) {
      remainingNumbers += Math.floor(Math.random() * 10);
    }
    
    // 完整的手机号
    let phoneNumber = actualPrefix + remainingNumbers;
    
    // 格式化
    if (format === 'space') {
      phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
    } else if (format === 'hyphen') {
      phoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    
    return phoneNumber;
  }
  
  // 根据count返回单个号码或号码数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK:生成随机中文姓名
 * @param {Object} options 配置选项
 * @param {string} [options.surname=''] 指定姓氏，不传则随机生成
 * @param {number} [options.nameLength=2] 名字长度，1或2，默认2个字
 * @param {number} [options.count=1] 生成数量，默认生成1个
 * @returns {string|Array<string>} 当count=1时返回字符串，否则返回字符串数组
 */
export function generateChineseName(options = {}) {
  const { surname = '', nameLength = 2, count = 1 } = options;

  // 常见姓氏列表（按照使用频率排序的前100个姓氏）
  const commonSurnames = [
    '李', '王', '张', '刘', '陈', '杨', '黄', '赵', '周', '吴',
    '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
    '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧',
    '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
    '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎',
    '余', '潘', '杜', '戴', '夏', '钟', '汪', '田', '任', '姜',
    '范', '方', '石', '姚', '谭', '廖', '邹', '熊', '金', '陆',
    '郝', '孔', '白', '崔', '康', '毛', '邱', '秦', '江', '史',
    '顾', '侯', '邵', '孟', '龙', '万', '段', '雷', '钱', '汤'
  ];

  // 常用于名字的汉字（剔除了不适合用作名字的字）
  const nameCharacters = [
    '伟', '华', '建', '明', '志', '永', '思', '远', '静', '晓',
    '芳', '春', '家', '文', '龙', '玉', '天', '宇', '博', '雅',
    '慧', '秀', '娟', '英', '君', '子', '云', '平', '欣', '怡',
    '晶', '莉', '凯', '瑞', '宁', '安', '轩', '然', '风', '雨',
    '阳', '海', '林', '诚', '致', '德', '佳', '涛', '亮', '梅',
    '智', '勇', '敏', '杰', '峰', '磊', '强', '军', '洋', '星',
    '光', '国', '良', '翔', '飞', '鹏', '和', '美', '琪', '健',
    '康', '乐', '正', '元', '信', '成', '锦', '瑜', '浩', '清'
  ];

  // 生成单个姓名
  function generateSingle() {
    // 确定姓氏
    let actualSurname = surname;
    if (!actualSurname) {
      const randomIndex = Math.floor(Math.random() * commonSurnames.length);
      actualSurname = commonSurnames[randomIndex];
    }

    // 生成名字
    let firstName = '';
    for (let i = 0; i < nameLength; i++) {
      const randomIndex = Math.floor(Math.random() * nameCharacters.length);
      firstName += nameCharacters[randomIndex];
    }

    return actualSurname + firstName;
  }

  // 根据count返回单个姓名或姓名数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK:从社会主义核心价值观中生成文字组合
 * @param {Object} options 配置选项
 * @param {number} [options.count=10] 选择的词语数量，默认10个
 * @param {boolean} [options.allowRepeat=false] 是否允许重复选择同一个词语，默认false
 * @param {string} [options.separator='，'] 词语之间的分隔符，默认为中文逗号
 * @param {boolean} [options.addPrefix=false] 是否在每个词语前添加前缀，默认false
 * @param {string} [options.prefix=''] 词语前缀，如"践行"、"弘扬"等，默认为空
 * @returns {string} 生成的文字组合
 */
export function generateCoreValuePhrase(options = {}) {
  const { 
    count = 4, 
    allowRepeat = false, 
    separator = '', 
    addPrefix = true,
    prefix = '学习'
  } = options;
  
  // 社会主义核心价值观词语
  const coreValues = [
    '富强', '民主', '文明', '和谐',
    '自由', '平等', '公正', '法治',
    '爱国', '敬业', '诚信', '友善',
    '仁爱', '谦逊', '坚韧', '自律',
    '感恩', '互助', '包容', '勤勉',
    '担当', '奉献', '清廉', '务实',
    '亲民', '创新', '协同'
  ];
  
  // 如果不允许重复且请求数量大于可用词语，则调整为可用词语数量
  const actualCount = !allowRepeat && count > coreValues.length 
    ? coreValues.length 
    : count;
  
  // 选择词语
  const selectedValues = [];
  const valuesCopy = [...coreValues]; // 创建副本以避免修改原数组
  
  for (let i = 0; i < actualCount; i++) {
    if (allowRepeat) {
      // 允许重复，直接从原数组随机选择
      const randomIndex = Math.floor(Math.random() * coreValues.length);
      selectedValues.push(coreValues[randomIndex]);
    } else {
      // 不允许重复，从副本中随机选择并移除
      const randomIndex = Math.floor(Math.random() * valuesCopy.length);
      selectedValues.push(valuesCopy[randomIndex]);
      valuesCopy.splice(randomIndex, 1); // 从副本中移除已选项
    }
  }
  
  // 添加前缀（如果需要）
  const formattedValues = addPrefix 
    ? selectedValues.map(value => prefix + value)
    : selectedValues;
  
  // 组合成文字
  return formattedValues.join(separator);
}

/**
 * MARK:从源文本中随机抽取字符组成新的文本
 * @param {Object} options 配置选项
 * @param {string} [options.sourceText=''] 源文本，默认使用内置的山水文章
 * @param {number} [options.length=10] 生成文本的长度，默认10个字
 * @param {boolean} [options.allowRepeat=true] 是否允许重复字符，默认true
 * @param {number} [options.count=1] 生成数量，默认生成1个
 * @returns {string|Array<string>} 当count=1时返回字符串，否则返回字符串数组
 */
export function generateRandomText(options = {}) {
  // 默认的山水文章
  const defaultText = '至若暮春时节，山花烂漫，漫山遍野，五彩斑斓。余或采野果于林间，或捕鸣蝉于枝头。夏日炎炎，则避暑于古木之下，卧看流云舒卷，静听蝉噪鸟鸣。秋高气爽，枫叶如丹，层林尽染。余登高远眺，见山川壮丽，心旷神怡。冬雪皑皑，银装素裹，山川寂寥。余围炉而坐，温酒赏雪，与友人谈诗论文，不亦乐乎。';
  
  const { 
    sourceText = defaultText, 
    length = 10, 
    allowRepeat = true, 
    count = 1 
  } = options;
  
  // 清理源文本，移除标点符号和空格
  const cleanText = sourceText.replace(/[，。、；：""''？！,.;:"'?!\s]/g, '');
  
  // 如果不允许重复且请求长度大于可用字符，则调整为可用字符数量
  const actualLength = !allowRepeat && length > cleanText.length 
    ? cleanText.length 
    : length;
  
  // 生成单个文本
  function generateSingle() {
    let result = '';
    
    if (allowRepeat) {
      // 允许重复，直接随机选择
      for (let i = 0; i < actualLength; i++) {
        const randomIndex = Math.floor(Math.random() * cleanText.length);
        result += cleanText[randomIndex];
      }
    } else {
      // 不允许重复，创建副本并随机选择
      const textCopy = cleanText.split('');
      for (let i = 0; i < actualLength; i++) {
        const randomIndex = Math.floor(Math.random() * textCopy.length);
        result += textCopy[randomIndex];
        textCopy.splice(randomIndex, 1); // 从副本中移除已选字符
      }
    }
    
    return result;
  }
  
  // 根据count返回单个文本或文本数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK:生成中国大陆身份证号码
 * @param {number} count - 要生成的身份证数量
 * @returns {string|string[]} 单个身份证或身份证数组
 */
export function generateIDCard(count = 1) {
  // 地区码前两位（省份）
  const provinceCodes = [
    '11', '12', '13', '14', '15',  // 华北
    '21', '22', '23',              // 东北
    '31', '32', '33', '34', '35', '36', '37',  // 华东
    '41', '42', '43', '44', '45', '46',        // 中南
    '50', '51', '52', '53', '54',              // 西南
    '61', '62', '63', '64', '65'               // 西北
  ];
  
  // 加权因子
  const weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  // 校验码对应值
  const checkCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  
  // 生成单个身份证
  function generateSingle() {
    // 1. 生成前6位地区码
    const provinceCode = provinceCodes[Math.floor(Math.random() * provinceCodes.length)];
    const cityCode = Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0');
    const districtCode = Math.floor(Math.random() * 20 + 1).toString().padStart(2, '0');
    const areaCode = provinceCode + cityCode + districtCode;
    
    // 2. 生成出生日期（1900-2020年之间）
    const year = Math.floor(Math.random() * (2020 - 1900 + 1)) + 1900;
    const month = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
    const day = Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0'); // 简单起见，最多28天
    const birthDate = year.toString() + month + day;
    
    // 3. 生成顺序码（3位）
    const sequenceCode = Math.floor(Math.random() * 999 + 1).toString().padStart(3, '0');
    
    // 4. 生成前17位
    const id17 = areaCode + birthDate + sequenceCode;
    
    // 5. 计算校验码
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(id17.charAt(i)) * weightFactors[i];
    }
    const checkCode = checkCodes[sum % 11];
    
    return id17 + checkCode;
  }
  
  // 根据count返回单个身份证或身份证数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK:生成随机电子邮箱
 * @param {number} count - 要生成的邮箱数量
 * @returns {string|string[]} 单个邮箱或邮箱数组
 */
export function generateEmail(count = 1) {
  // 常用邮箱域名
  const emailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
    'qq.com', '163.com', '126.com', 'sina.com', 'sohu.com',
    'foxmail.com', 'icloud.com', 'live.com', 'msn.com'
  ];
  
  // 常用用户名前缀
  const namePrefixes = [
    'john', 'mike', 'david', 'peter', 'alice', 'lisa', 'sarah', 'emma',
    'user', 'member', 'customer', 'service', 'info', 'support', 'admin'
  ];
  
  // 常用数字和连接符组合
  const numberSuffixes = ['', '123', '2023', '88', '666', '007', '1', '2', '3'];
  
  // 生成单个邮箱
  function generateSingle() {
    const prefix = namePrefixes[Math.floor(Math.random() * namePrefixes.length)];
    const number = numberSuffixes[Math.floor(Math.random() * numberSuffixes.length)];
    const domain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
    
    // 随机决定是否添加点号或下划线
    const separator = Math.random() > 0.5 ? 
      (Math.random() > 0.5 ? '.' : '_') : '';
    const secondPart = Math.random() > 0.3 ? 
      namePrefixes[Math.floor(Math.random() * namePrefixes.length)] : '';
    
    const username = prefix + separator + secondPart + number;
    return `${username}@${domain}`.toLowerCase();
  }
  
  // 根据count返回单个邮箱或邮箱数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK:生成随机中国省市地址
 * @param {number} count - 要生成的地址数量
 * @returns {string|string[]} 单个地址或地址数组
 */
export function generateProvinceCity(count = 1) {
  // 省份和对应的城市列表
  const provinceCities = {
    '北京市': ['北京市'],
    '天津市': ['天津市'],
    '河北省': ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'],
    '山西省': ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'],
    '内蒙古自治区': ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市'],
    '辽宁省': ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'],
    '吉林省': ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市'],
    '黑龙江省': ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市'],
    '上海市': ['上海市'],
    '江苏省': ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
    '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
    '安徽省': ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'],
    '福建省': ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
    '江西省': ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'],
    '山东省': ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'],
    '河南省': ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市'],
    '湖北省': ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市'],
    '湖南省': ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市'],
    '广东省': ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'],
    '广西壮族自治区': ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'],
    '海南省': ['海口市', '三亚市', '三沙市', '儋州市'],
    '重庆市': ['重庆市'],
    '四川省': ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市'],
    '贵州省': ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市'],
    '云南省': ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市'],
    '西藏自治区': ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市'],
    '陕西省': ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'],
    '甘肃省': ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市'],
    '青海省': ['西宁市', '海东市'],
    '宁夏回族自治区': ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
    '新疆维吾尔自治区': ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市']
  };

  // 生成单个地址
  function generateSingle() {
    const provinces = Object.keys(provinceCities);
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    const cities = provinceCities[province];
    const city = cities[Math.floor(Math.random() * cities.length)];
    return `${province} ${city}`;
  }

  // 根据count返回单个地址或地址数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK:生成随机职位名称
 * @param {number} count - 要生成的职位数量
 * @returns {string|string[]} 单个职位或职位数组
 */
export function generateJobTitle(count = 1) {
  // 职位前缀
  const prefixes = [
    '高级', '资深', '首席', '初级', '中级', '助理', '实习', '特聘', '特邀', '核心',
    '项目', '产品', '技术', '市场', '销售', '运营', '客户', '财务', '行政', '人力资源'
  ];
  
  // 职位中缀
  const middles = [
    '开发', '设计', '管理', '运营', '营销', '销售', '分析', '策划', '推广', '维护',
    '测试', '实施', '咨询', '培训', '支持', '服务', '研究', '架构', '编辑', '采购'
  ];
  
  // 职位后缀
  const suffixes = [
    '工程师', '专员', '经理', '主管', '总监', '顾问', '专家', '助理', '代表', '师',
    '员', '分析师', '策划师', '设计师', '开发员', '管理员', '运营官', '执行官'
  ];
  
  // 完整职位（不需要组合的常见职位）
  const fullTitles = [
    'CEO', 'CTO', 'CFO', 'COO', 'CMO', 'CIO', 'HRD', '产品经理', '项目经理',
    '前端开发工程师', '后端开发工程师', 'UI设计师', 'UX设计师', '数据分析师',
    '市场总监', '销售代表', '客户经理', '财务主管', '行政助理'
  ];
  
  // 生成单个职位
  function generateSingle() {
    // 30%概率使用完整职位，70%概率组合生成
    if (Math.random() < 0.3) {
      return fullTitles[Math.floor(Math.random() * fullTitles.length)];
    }
    
    let title = '';
    // 50%概率添加前缀
    if (Math.random() > 0.5) {
      title += prefixes[Math.floor(Math.random() * prefixes.length)];
    }
    
    // 添加中缀
    title += middles[Math.floor(Math.random() * middles.length)];
    
    // 添加后缀
    title += suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return title;
  }
  
  // 根据count返回单个职位或职位数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK:生成当前日期时间并格式化
 * @param {string} format - 日期格式，默认为'yyyy-MM-dd'
 * @returns {string} 格式化后的日期字符串
 */
export function generateCurrentDateTime(format = 'yyyy-MM-dd') {
  const now = new Date();
  
  const pad = (num) => num.toString().padStart(2, '0');
  
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  
  // 替换格式标记
  return format
    .replace(/yyyy/g, year)
    .replace(/MM/g, month)
    .replace(/dd/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds);
}

/**
 * MARK生成随机公司名称
 * @param {number} count - 要生成的公司名称数量
 * @returns {string|string[]} 单个公司名称或公司名称数组
 */
export function generateCompanyName(count = 1) {
  // 公司名称前缀
  const prefixes = [
    '华夏', '东方', '南方', '北方', '中天', '环球', '国际', '亚太', '世纪', '时代',
    '神州', '华夏', '九州', '四海', '天下', '星辰', '银河', '阳光', '大地', '蓝天',
    '创新', '科技', '智慧', '数字', '未来', '先锋', '卓越', '精英', '领航', '开拓'
  ];
  
  // 公司名称中缀
  const middles = [
    '科技', '信息', '网络', '数据', '智能', '软件', '系统', '电子', '数码', '云计算',
    '金融', '投资', '资本', '财富', '证券', '保险', '银行', '信托', '基金', '理财',
    '咨询', '管理', '服务', '传媒', '广告', '文化', '教育', '培训', '设计', '创意',
    '工程', '建筑', '地产', '物业', '环保', '能源', '材料', '制造', '工业', '贸易'
  ];
  
  // 公司名称后缀
  const suffixes = [
    '有限公司', '有限责任公司', '集团', '控股集团', '科技集团', '国际集团', '发展有限公司',
    '技术有限公司', '信息技术有限公司', '网络科技有限公司', '股份有限公司', '咨询有限公司',
    '服务有限公司', '实业有限公司', '投资有限公司', '贸易有限公司', '电子商务有限公司'
  ];
  
  // 完整公司名称（不需要组合的常见公司名）
  const fullNames = [
    '阿里巴巴集团', '腾讯科技', '百度在线', '京东商城', '美团点评', 
    '字节跳动', '华为技术', '小米科技', '联想集团', '海尔集团',
    '中国移动', '中国电信', '中国联通', '工商银行', '建设银行',
    '招商银行', '平安保险', '中国人寿', '中信证券', '中金公司'
  ];
  
  // 生成单个公司名称
  function generateSingle() {
    // 20%概率使用完整公司名，80%概率组合生成
    if (Math.random() < 0.2) {
      return fullNames[Math.floor(Math.random() * fullNames.length)];
    }
    
    let name = '';
    // 添加前缀
    name += prefixes[Math.floor(Math.random() * prefixes.length)];
    
    // 80%概率添加中缀
    if (Math.random() < 0.8) {
      name += middles[Math.floor(Math.random() * middles.length)];
    }
    
    // 添加后缀
    name += suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return name;
  }
  
  // 根据count返回单个公司名称或公司名称数组
  if (count === 1) {
    return generateSingle();
  } else {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(generateSingle());
    }
    return result;
  }
}

/**
 * MARK生成随机车牌号
 * @param {boolean} newEnergy 是否生成新能源车牌，默认为false
 * @returns {string} 随机车牌号
 */
export function generateLicensePlate(newEnergy = false) {
  // 省份简称
  const provinces = [
    '京', '津', '冀', '晋', '蒙', '辽', '吉', '黑',
    '沪', '苏', '浙', '皖', '闽', '赣', '鲁', '豫',
    '鄂', '湘', '粤', '桂', '琼', '渝', '川', '贵',
    '云', '藏', '陕', '甘', '青', '宁', '新'
  ];
  
  // 字母（不包括I和O）
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  
  // 数字
  const numbers = '0123456789';
  
  // 新能源车牌专用字母
  const newEnergyLetters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  
  // 生成普通车牌
  if (!newEnergy) {
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    const letter = letters[Math.floor(Math.random() * letters.length)];
    
    // 生成5位数字和字母组合
    let plateNumber = '';
    for (let i = 0; i < 5; i++) {
      // 30%概率生成字母，70%概率生成数字
      if (Math.random() < 0.3 && i > 0) { // 第一位必须是数字
        plateNumber += letters[Math.floor(Math.random() * letters.length)];
      } else {
        plateNumber += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }
    
    return `${province}${letter}${plateNumber}`;
  }
  // 生成新能源车牌
  else {
    const province = provinces[Math.floor(Math.random() * provinces.length)];
    const letter = newEnergyLetters[Math.floor(Math.random() * newEnergyLetters.length)];
    
    // 新能源车牌格式：省份简称+字母+5位数字或字母（D/F代表纯电/混动）
    const energyType = Math.random() > 0.5 ? 'D' : 'F';
    let plateNumber = '';
    
    // 生成6位数字和字母组合（第一位必须是字母D或F）
    plateNumber += energyType;
    for (let i = 0; i < 5; i++) {
      // 20%概率生成字母，80%概率生成数字
      if (Math.random() < 0.2) {
        plateNumber += newEnergyLetters[Math.floor(Math.random() * newEnergyLetters.length)];
      } else {
        plateNumber += numbers[Math.floor(Math.random() * numbers.length)];
      }
    }
    
    return `${province}${letter}${plateNumber}`;
  }
}

/**
 * mark生成随机民族
 * @returns {string} 随机民族名称
 */
export function generateEthnicGroup() {
  // 中国56个民族列表（实际有56个，但常用说法是56个民族）
  const ethnicGroups = [
    '汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', 
    '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族', '哈尼族',
    '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族',
    '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族', '土族', '达斡尔族',
    '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族',
    '普米族', '塔吉克族', '怒族', '乌孜别克族', '俄罗斯族', '鄂温克族', '德昂族',
    '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族',
    '珞巴族', '基诺族'
  ];
  
  return ethnicGroups[Math.floor(Math.random() * ethnicGroups.length)];
}

/**
 * MARK 生成随机统一社会信用代码
 * @returns {string} 18位统一社会信用代码
 */
export function generateUnifiedSocialCreditCode() {
  // 登记管理部门代码（工商:1, 其他:2-9）
  const departmentCodes = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  
  // 机构类别代码（企业:1, 个体工商户:2, 农民专业合作社:3）
  const orgTypeCodes = ['1', '2', '3'];
  
  // 行政区划代码（前6位，随机生成一个行政区划）
  function generateRegionCode() {
    // 省级代码（11-65）
    const provinceCode = Math.floor(Math.random() * (65 - 11 + 1)) + 11;
    // 市级代码（01-20）
    const cityCode = Math.floor(Math.random() * 20) + 1;
    // 区县级代码（01-20）
    const districtCode = Math.floor(Math.random() * 20) + 1;
    
    return `${provinceCode.toString().padStart(2, '0')}${cityCode.toString().padStart(2, '0')}${districtCode.toString().padStart(2, '0')}`;
  }
  
  // 生成9位组织机构代码（第9位是校验码）
  function generateOrgCode() {
    const chars = '0123456789ABCDEFGHJKLMNPQRTUWXY';
    let code = '';
    let sum = 0;
    const weights = [3, 7, 9, 10, 5, 8, 4, 2];
    
    // 前8位
    for (let i = 0; i < 8; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      code += char;
      sum += weights[i] * chars.indexOf(char);
    }
    
    // 计算第9位校验码
    const c9 = 11 - (sum % 11);
    let checkCode;
    if (c9 === 10) {
      checkCode = 'X';
    } else if (c9 === 11) {
      checkCode = '0';
    } else {
      checkCode = c9.toString();
    }
    
    return code + checkCode;
  }
  
  // 生成信用代码主体
  const departmentCode = departmentCodes[Math.floor(Math.random() * departmentCodes.length)];
  const orgTypeCode = orgTypeCodes[Math.floor(Math.random() * orgTypeCodes.length)];
  const regionCode = generateRegionCode();
  const orgCode = generateOrgCode();
  
  // 组合成17位代码
  const code17 = departmentCode + orgTypeCode + regionCode + orgCode;
  
  // 计算第18位校验码
  const weights18 = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
  const chars = '0123456789ABCDEFGHJKLMNPQRTUWXY';
  let sum18 = 0;
  
  for (let i = 0; i < 17; i++) {
    sum18 += weights18[i] * chars.indexOf(code17[i]);
  }
  
  const c18 = 31 - (sum18 % 31);
  const checkCode18 = c18 === 31 ? '0' : chars[c18];
  
  return code17 + checkCode18;
}

