/*

 * Desc: 各种文件模板 
 */
const { getNowFormatDate } = require('../utils');

// index 内容
function indexContent(pageName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author}
* Date: ${getNowFormatDate()} 
* Desc: ${pageName} 入口 
*/
import dynamic from 'umi/dynamic';

export default dynamic({
  loader: () => import('./${pageName}'),
});
`;
  return content;
}

// MapProps 内容
function mapPropsContent(desc, modelName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()}
* Desc: ${desc} MapProps 
*/
export const mapStateToProps = ({ ${modelName}, loading }) => ({
  loading: loading.models.${modelName},
  myData: ${modelName}.myData,
});

export const mapDispatchToProps = dispatch => ({
  onUpdate(payload) {
    dispatch({
      type: '${modelName}/update',
      payload,
    });
  },
  clearData(payload) {
    dispatch({
      type: '${modelName}/clearData',
      payload,
    });
  },
});
`;
  return content;
}

// 入口组件内容
function pContent(pageName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: 描述
*/
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { connect } from 'umi';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './${pageName}.scss';

interface I${pageName}Props {
  name:string;
  age?number
}
const ${pageName} = (props:I${pageName}Props) => {
  const { name ,age} =props
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.root}>
      内容
    </div>
  )
}


${pageName}.propTypes = {
  name :PropTypes.string.isRequired,
  age : PropTypes.number,
}


export default connect(mapStateToProps, mapDispatchToProps)(${pageName});
`;
  return content;
}

// scss 内容
function lessContent() {
  const content = `.root{
  :global{

  }
}
`;
  return content;
}

// services 内容
function servicesContent(string, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: ${string} services 
*/
import { get } from 'utils/request';

/** 接口名称
* @param {string} id -所属信息的id
*/
export const cityDataShow = param => get('/epidemic/cityDataShow', param);
`;
  return content;
}

// models 内容
function modelsContent(fileName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: ${fileName} models 
*/
import * as ${fileName}Api from '../services/${fileName}.js';

const initData = {
  myData: [], // 数据
};

export default {
  namespace: '${fileName}',
  state: {
    ...initData,
  },

  effects: {
    *cityDataShow({ payload }, { call, put }) {
      const result = yield call(${fileName}Api.cityDataShow, payload);
      const { errCode, data } = result;
      if (errCode === 0) {
        yield put({
          type: 'update',
          payload: {
            myData: data || [],
          },
        });
      }
      return result;
    },
  },
  reducers: {
    update: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    clearData: () => ({ ...initData }),
  },
};

`;
  return content;
}

module.exports = {
   umiJsindexContent:indexContent,
   umiJsmapPropsContent:mapPropsContent,
   umiJspContent:pContent,
   umiJslessContent:lessContent,
   umiJsservicesContent:servicesContent,
   umiJsmodelsContent:modelsContent
}
