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
import classnames from 'classnames';
import classPrefix from 'prefix-classnames';
import './${fileName}.less';

const PREFIX = 'c-${fileName}';
const px = classPrefix(PREFIX);



const ${fileName} = (props) => {
  const { style, className } = props;
  const [visible, setVisible] = useState(false);
  const classNames = classnames(px('root'), className);

  return (
    <div className={classNames} style={style}>
      <h1>组件内容</h1>
    </div>
  );
};

${fileName}.propTypes = {
  className : PropTypes.string,
}
export default ${fileName};
`
  return content
}

// less 内容
function lessContent(fileName) {
  const content = `@prefix: c-${fileName};

.@{prefix} {
  &- {
    &root {
      padding: 16px 16px 0 16px;
    }
  }
}
`
  return content
}

module.exports = {
  fcJsindexContent: indexContent,
  fcJspContent: pContent,
  fcJslessContent: lessContent
}
