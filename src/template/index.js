/*

 * Desc: 各种文件模板
 */
const fs = require('fs')
const chalk = require('chalk')

const { umiJsindexContent, umiJsmapPropsContent, umiJspContent, umiJslessContent, umiJsservicesContent, umiJsmodelsContent } = require('./umiJsTpl')

const { umiTsindexContent, umiTsmapPropsContent, umiTspContent, umiTslessContent, umiTsservicesContent, umiTsmodelsContent } = require('./umiTsTpl')

const {
  MVCJsindexContent,
  MVCJsmapPropsContent,
  MVCJspContent,
  MVCJslessContent,
  MVCJsservicesContent,
  MVCJsmodelsContent
} = require('./reduxMvcJsTpl')

const {
  MVCTsindexContent,
  MVCTsmapPropsContent,
  MVCTspContent,
  MVCTslessContent,
  MVCTsservicesContent,
  MVCTsmodelsContent
} = require('./reduxMvcTsTpl')

const { fcTsindexContent, fcTspContent, fcTslessContent } = require('./fcTsTpl')
const { fcJsindexContent, fcJspContent, fcJslessContent } = require('./fcJsTpl')

// 默认 umi 模板
let indexContent = umiJsindexContent
let mapPropsContent = umiJsmapPropsContent
let pContent = umiJspContent
let lessContent = umiJslessContent
let servicesContent = umiJsservicesContent
let modelsContent = umiJsmodelsContent

function writeFileByType(filePath, pageName, file, argv) {
  const { templateLanguage, pageType } = argv
  if (pageType === 'mvc') {
    if (templateLanguage === 'TS') {
      indexContent = MVCTsindexContent
      mapPropsContent = MVCTsmapPropsContent
      pContent = MVCTspContent
      lessContent = MVCTslessContent
      servicesContent = MVCTsservicesContent
      modelsContent = MVCTsmodelsContent
      writeMvcPageFile(filePath, pageName, file, argv, 'ts')
      return
    }
    if (templateLanguage === 'JS') {
      indexContent = MVCJsindexContent
      mapPropsContent = MVCJsmapPropsContent
      pContent = MVCJspContent
      lessContent = MVCJslessContent
      servicesContent = MVCJsservicesContent
      modelsContent = MVCJsmodelsContent
      writeMvcPageFile(filePath, pageName, file, argv, 'js')
    }
  }
  if (pageType === 'umi') {
    if (templateLanguage === 'TS') {
      indexContent = umiTsindexContent
      mapPropsContent = umiTsmapPropsContent
      pContent = umiTspContent
      lessContent = umiTslessContent
      servicesContent = umiTsservicesContent
      modelsContent = umiTsmodelsContent

      writeUmiPageFileByLanguage(filePath, pageName, file, argv, 'ts')
      return
    }
    if (templateLanguage === 'JS') {
      writeUmiPageFileByLanguage(filePath, pageName, file, argv, 'js')
    }
  }
}
function writeComponentFileByLanguage(filePath, pageName, file, argv) {
  const { templateLanguage } = argv
  if (templateLanguage === 'TS') {
    indexContent = fcTsindexContent
    pContent = fcTspContent
    lessContent = fcTslessContent
    // umi ts 函数组件
    writeFcFile(filePath, pageName, file, argv, 'ts')
    return
  }
  if (templateLanguage === 'JS') {
    indexContent = fcJsindexContent
    pContent = fcJspContent
    lessContent = fcJslessContent
    // umi ts 函数组件
    writeFcFile(filePath, pageName, file, argv, 'js')
  }
}
// 创建组件对应文件并写入内容
function writeFcFile(filePath, pageName, fileName, argv, filesuffix = 'ts') {
  // 创建文件，写入内容
  // index.(t|j)s
  writeFile(`${filePath}/index.${filesuffix}`, indexContent(fileName, argv))
  // xxx.(t|j)sx
  writeFile(`${filePath}/${fileName}.${filesuffix}x`, pContent(fileName, argv))
  // xxx.scss
  writeFile(`${filePath}/${fileName}.scss`, lessContent(fileName),true)
}
// 创建umi 页面结构并写入
function writeUmiPageFileByLanguage(filePath, pageName, file, argv, filesuffix = 'ts') {
  // 创建文件，写入内容
  // index.ts
  writeFile(`${filePath}/index.${filesuffix}x`, indexContent(pageName, argv))
  // MapProps.js
  writeFile(`${filePath}/MapProps.${filesuffix}`, mapPropsContent(pageName, file, argv))
  // xxxPage.tsx
  writeFile(`${filePath}/${pageName}.${filesuffix}x`, pContent(file, pageName, argv))
  // xxxPage.scss
  writeFile(`${filePath}/${pageName}.scss`, lessContent(argv),true)
  // // services.ts
  // writeFile(`${filePath}/services/${file}.${filesuffix}`, servicesContent(file, argv))
  // // models.tsx
  // writeFile(`${filePath}/models/${file}.${filesuffix}`, modelsContent(file, argv), true)
}
function wirteUmiSrcModelAndService(filePath, file, argv, filesuffix = 'ts') {
    // services.js
    if (filePath.includes('services')) {
      writeFile(`${filePath}/${file}.${filesuffix}`, servicesContent(file, argv))
    }
    // models.js
    if (filePath.includes('models')) {
      writeFile(`${filePath}/${file}.${filesuffix}`, modelsContent(file, argv))
    }
}
// 创建 redux mvc 页面结构并写入
function writeMvcPageFile(filePath, pageName, file, argv, filesuffix = 'ts') {
  // 创建文件，写入内容

  writeFile(`${filePath}/index.${filesuffix}x`, indexContent(pageName, argv))

  // writeFile(`${filePath}/MapProps.${filesuffix}`, mapPropsContent(pageName, file, argv))

  writeFile(`${filePath}/${pageName}.${filesuffix}x`, pContent(pageName, argv,file))

  writeFile(`${filePath}/${pageName}.scss`, lessContent(argv),true)
}
// mvc 页面模式下 需在src文件夹下写入对应的reducer及service 及 M 和C 层目录结构
function writeReduxMCFile(filePath, file, argv, filesuffix = 'ts') {
  // services.js
  if (filePath.includes('services')) {
    writeFile(`${filePath}/${file}.${filesuffix}`, servicesContent(file, argv))
  }
  // reducers.js
  if (filePath.includes('reducers')) {
    writeFile(`${filePath}/${file}.${filesuffix}`, modelsContent(file, argv))
  }
}
// 创建文件
function writeFile(filename, fileContent = '', flag = false) {
  fs.writeFile(filename, fileContent, 'utf8', error => {
    if (error) {
      const err = chalk.red(error)
      console.info(err) // eslint-disable-line
      return false
    }
    if (flag) {
      const msg = chalk.green('模块创建成功！！！')
      console.info(msg) // eslint-disable-line
      return true
    }
  })
}

module.exports = {
  writeFileByType,
  writeComponentFileByLanguage,
  writeReduxMCFile,
  wirteUmiSrcModelAndService
}
