/*

 * Desc: 各种文件模板 
 */
const { getNowFormatDate } = require('../utils')

// index 内容
function indexContent(pageName, options) {
  const { author } = options
  const content = `/*
* Author: ${author}
* Date: ${getNowFormatDate()} 
* Desc: ${pageName} 入口 
*/

import React from "react";
import loadable from "@loadable/component";
import { Loading } from "@/components";

export default loadable(() => import("./${pageName}"), {
  fallback: <Loading/>
});
`
  return content
}

// MapProps 内容
function mapPropsContent(desc, modelName, options) {
  const { author } = options
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
`
  return content
}

// 入口组件内容
function pContent(pageName, options,fileName) {
  const { author } = options
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: 描述
*/
import React, { useState, useEffect } from "react";
import { compose, bindActionCreators } from "redux";
import { actionCreators } from "@/reducers/${pageName}";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SomeComponent } from '../components'
import styles from './${pageName}.scss';


export default compose(
  withRouter,
  connect(
    ({ ${fileName} }) => ({
      ...${fileName}
    }),
    Dispatch => bindActionCreators({ ...actionCreators }, Dispatch)
  )
)(React.memo(${pageName}));

interface I${pageName}Props {
  name:string
}

function ${pageName} (props:I${pageName}Props) {
  const { name } = props
  const [visible, setVisible] = useState(false);
    return (
      <div className={styles.root}>
        <SomeComponent/>
        <div>{name}</div>
      </div>
    );
}

`
  return content
}

// scss 内容
function lessContent() {
  const content = `.root{

}
`
  return content
}

// services 内容
function servicesContent(string, options) {
  const { author } = options
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: ${string} services 
*/
import { get, post } from '@/utils/request';

/** 接口名称
* @param {string} id -所属信息的id
*/
export const cityDataShow = param => get('/topics', param);

/** 接口名称
* @param {string} id -所属信息的id
*/
export const cityDataShowPost = param => post('/epidemic/cityDataShowPost', param);
`
  return content
}

// models 内容
function modelsContent(fileName, options) {
  const { author } = options
  const content = `/*
* Author: ${author} 
* Date: ${getNowFormatDate()} 
* Desc: ${fileName} reducers 
*/
import type { Action, Dispatch, ThunkAction ,State} from '@/types';

import { cityDataShow } from '@/services/${fileName}.js';
import request from '@/utils/request';
import { customeToast } from '@/utils/utils';
const initialState = {
  myData: [], // 数据
};

const UPDATE = "/${fileName}/UPDATE";
const ERROR = "/${fileName}/ERROR";

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case UPDATE:
      return _.assign({}, state, {
        ...action.data
      });
    case ERROR:
      customeToast('error', action.err || '');
      return _.assign({}, state, {
      });
    default:
      return state;
  }
};

export const getMyData= (payload): ThunkAction => async (dispatch: Dispatch ) => {
  try {
    const data = await cityDataShow(payload)
    if (data && data.success) {
      dispatch({
        type: UPDATE,
        data: {
          myData: data.result,
        }
      });
    } else {
      dispatch({ type: ERROR, err: data.errorMsg });
    }
  } catch (err) {
    dispatch({ type: ERROR, err: err.message });
  }
},


`
  return content
}

module.exports = {
  MVCTsindexContent: indexContent,
  MVCTsmapPropsContent: mapPropsContent,
  MVCTspContent: pContent,
  MVCTslessContent: lessContent,
  MVCTsservicesContent: servicesContent,
  MVCTsmodelsContent: modelsContent
}
