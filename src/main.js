const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')

const conf = require('./config')
const { capitalize, smallLetters } = require('./utils')
const { writeFileByType, writeComponentFileByLanguage, writeReduxMCFile } = require('./template')

const UMI_DIRS = ['models', 'services', 'components']
const MVC_DIRS = ['reducers', 'services']

const CHOOSE_TEMPLATE_TYPE = [
  { name: '页面', value: 'Page' },
  { name: '组件', value: 'Component' }
]
const CHOOSE_LANGUAGE_TYPE = [
  { name: 'TypeScript', value: 'TS' },
  { name: 'javaScript', value: 'JS' }
]
const CHOOSE_PAGE_TYPE = [
  { name: 'umi', value: 'umi' },
  { name: 'mvc', value: 'mvc' }
]
let templateInfo = {}
async function Main(argv) {
  const { _: files } = argv
  if (!files?.length) {
    const msg = chalk.yellow(`请输入要创建的模块名称！！！`)
    console.info(msg) // eslint-disable-line
    return
  }
  await getTemplateType()
  const newArgv = { ...argv, ...templateInfo }

  files.map(file => {
    start(file, newArgv)
    return null
  })
}
async function getTemplateType() {
  const { templateLanguage, templateType } = await inquirer.prompt([
    {
      type: 'list',
      message: '选择模板语言',
      defaultValue: 'TS',
      name: 'templateLanguage',
      choices: CHOOSE_LANGUAGE_TYPE
    },
    {
      type: 'list',
      message: '请选择选择模板类型',
      name: 'templateType',
      choices: CHOOSE_TEMPLATE_TYPE
    }
  ])
  templateInfo = { templateLanguage, templateType }
  if (templateType === 'Page') {
    const { pageType } = await inquirer.prompt({
      type: 'list',
      message: '选择页面目录结构',
      name: 'pageType',
      choices: CHOOSE_PAGE_TYPE
    })
    templateInfo = { ...templateInfo, pageType }
  }
}

function start(file, argv) {
  if (file.length) {
    const { templateType, pageType, templateLanguage } = argv

    // 公共组件和页面模板组件，路径不相同
    let root = './'
    if (templateType === 'Component' && isExisDir(conf.rootCompPath)) {
      root = conf.rootCompPath || './'
    } else if (isExisDir(conf.root)) {
      root = conf.root || './'
    }
    // 获取 root 下面的所有文件夹
    const pagesPath = path.resolve(process.cwd(), root)
    const allDirs = findDirs(pagesPath)
    if (allDirs.includes(file)) {
      const msg = chalk.yellow(`${file} 文件夹已经存在，请重命名输入！！！`)
      console.info(msg) // eslint-disable-line
      return
    }

    // 组件模板处理函数
    if (templateType === 'Component') {
      const fileName = capitalize(file)
      const pageName = `${capitalize(file)}Page`
      const filePath = path.resolve(process.cwd(), root, fileName)
      // 创建目录
      mkdirsSync(filePath)

      writeComponentFileByLanguage(filePath, pageName, fileName, argv)
      return
    }

    if (pageType === 'umi') {
      const fileName = smallLetters(file)
      const filePath = path.resolve(process.cwd(), root, capitalize(file))
      const pageName = `${capitalize(file)}Page`

      // 创建目录
      UMI_DIRS.forEach(dirName => {
        mkdirsSync(`${filePath}/${dirName}`)
      })

      writeFileByType(filePath, pageName, fileName, argv)
      return
    }
    if (pageType === 'mvc') {
      const fileName = smallLetters(file)
      const filePath = path.resolve(process.cwd(), root, capitalize(file))
      const pageName = `${capitalize(file)}Page`
      const fileSuffix = templateLanguage === 'TS' ? 'ts' : 'js'
      // 创建目录
      mkdirsSync(`${filePath}/${'components'}`)
      writeFileByType(filePath, pageName, fileName, argv)
      // 文件结构按MVC格式走的时候需要在src目录下的reducers及services文件夹下建立对应的文件
      MVC_DIRS.forEach(dirName => {
        const dirPath = path.resolve(process.cwd(), 'src')
        if (!findDirs(dirPath).includes(dirName)) {
          mkdirsSync(`${dirPath}/${dirName}`)
        }
        writeReduxMCFile(`${dirPath}/${dirName}`, fileName, argv, fileSuffix)
      })
    }
  }
}

// 检查某个目录是否存在
function isExisDir(dir) {
  try {
    const stat = fs.statSync(dir)
    if (stat) {
      return true
    }
  } catch (error) {
    return false
  }
  return false
}

// 获取所有子目录
function findDirs(dirs) {
  const dirArr = []
  const dirArray = fs.readdirSync(dirs)
  for (const d of dirArray) {
    const filePath = path.resolve(dirs, d)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      dirArr.push(d)
    }
  }
  return dirArr
}

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname)
    return true
  }
}

module.exports = Main
