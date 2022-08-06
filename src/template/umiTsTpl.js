/*

 * Desc: umi ts 各种文件模板 
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
import ${pageName} from './${pageName}';

export default ${pageName};
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
  onCityDataShow(payload) {
    return dispatch({
      type: '${modelName}/cityDataShow',
      payload,
    });
  },
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
function pContent(fileName, pageName, options) {
  const { author } = options;
  const content = `/*
* Author: ${author}
* Date: ${getNowFormatDate()}
* Desc: 描述
*/
import React, { useState, useEffect } from "react";
import { connect } from 'umi';
import { ResultProps } from './models/${fileName}';
import { mapStateToProps, mapDispatchToProps } from './MapProps';
import styles from './${pageName}.less';

interface ${pageName}Props {
  name:string;
  title?: string;
  onCityDataShow: <T>(params?: T) => ResultProps;
  clearData: () => void;
}

const ${pageName}: React.FC<${pageName}Props> = (props) => {
  const { onCityDataShow } = props;
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div className={styles.root}>
      <h1>内容</h1>
      <h1>{props.title}</h1>
    </div>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(${pageName});
`;
  return content;
}

// less 内容
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
import { get } from '@/utils/request';

type RecordType = Record<string, number | string | boolean> | URLSearchParams;

/** 接口名称
* @param {string} id -所属信息的id
*/
export const cityDataShow = (param: RecordType) => get('/epidemic/cityDataShow', param);
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
import * as ${fileName}Api from '../services/${fileName}';

export interface ResultProps<RecordType extends object = any> {
  errCode: string | number;
  data: RecordType;
}

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
  umiTsindexContent:indexContent,
  umiTsmapPropsContent:mapPropsContent,
  umiTspContent:pContent,
  umiTslessContent:lessContent,
  umiTsservicesContent:servicesContent,
  umiTsmodelsContent:modelsContent
}
