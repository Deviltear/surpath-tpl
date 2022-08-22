/*
 * Desc: 函数组件 (js) 各种文件模板
 */
const { getNowFormatDate } = require('../utils')

// index 内容
function indexContent(fileName, options) {
  const { author } = options
  const content = `/*
* Author: ${author}
* Date: ${getNowFormatDate()}
* Desc: ${fileName} 组件入口
*/
import ${fileName} from './${fileName}';

export default ${fileName};
`
  return content
}

// 组件内容
function pContent(fileName, options) {
  const { author } = options
  const content = `/*
* Author: ${author}
* Date: ${getNowFormatDate()}
* Desc: 描述
*/
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import cn from 'classnames';
import styles from './${fileName}.scss';


const ${fileName} = (props) => {
  const { style, className } = props;
  const [visible, setVisible] = useState(false);
  const classNames = cn(className);

  return (
    <div className={classNames} style={style}>
      <h1>组件内容</h1>
      <div className={styles.title}>标题</div>
    </div>
  );
};

${fileName}.propTypes = {
  className: PropTypes.string,
}
export default ${fileName};
`
  return content
}

// scss 内容
function lessContent(fileName) {
  const content = `.${fileName}{

  }
  `
  return content
}

module.exports = {
  fcJsindexContent: indexContent,
  fcJspContent: pContent,
  fcJslessContent: lessContent
}
