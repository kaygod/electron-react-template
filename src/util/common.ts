import axios, { AxiosResponse } from 'axios';
import { api_url } from 'mock/config';
import { mockDataList } from './mockData';

const service_ip = process.env.NODE_ENV === 'development' ? api_url : '';

export const formatExchange = (data: string, fields: string[]) => {
  try {
    let new_data = eval('(' + data + ')');
    new_data = new_data.msg_list.map((val: any, index: number) => {
      let new_item: any = {};
      const item = val.split('|');
      fields.forEach((ele, i) => {
        new_item[ele] = item[i];
        if (ele == 'status') {
          if (item[i] == 101) {
            new_item[ele] = 100;
          }
        }
      });
      return new_item;
    });
    return new_data;
  } catch {
    return [];
  }
};

export const fetch = (params: any) => {
  return new Promise<any>(async (resolve, reject) => {
    let result = null;
    try {
      result = await windowFetch(params);
      resolve(result);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

/**
 * windows下获取数据
 */
const windowFetch = (params: any) => {
  if (process.env.NODE_ENV === 'production') {
    // windows下的生产环境
    return mockData(params);
  }

  params.url = `${service_ip}${params.url}`;
  const data = params.data || {};
  return new Promise((resolve, reject) => {
    axios({
      ...params,
      method: params.method || 'post',
      data,
      withCredentials: true,
      crossDomain: true,
    })
      .then((res: AxiosResponse<any>) => {
        if (typeof res == 'string') {
          res = JSON.parse(res);
        }
        const rResult = res.data;
        if (rResult.error == null) {
          resolve(rResult);
        } else {
          if (rResult.error == '1030' || rResult.error == '1040') {
            //没有登录 或者 被挤下来了
            //store.commit('noLogin');
          }
          Alert(msgCode(rResult.error));
          reject(rResult.error);
        }
      })
      .catch((error) => {
        if (error.code === 'ECONNABORTED') {
          Alert('请求超时');
          return false;
        }
        reject(error);
      });
  });
};

/**
 * 模拟的假数据
 */
const mockData = (params: { url: keyof typeof mockDataList }) => {
  const result = mockDataList[params.url];
  return Promise.resolve(result);
};

//错误码
export const msgCode = (n: string) => {
  if (n === undefined) {
    return '未知错误';
  }
  n = n.toString();
  switch (n) {
    case '100':
      return 'json解析错误';
    case '101':
      return '	缺少参数';
    case '102':
      return '参数有误';
    case '200':
      return '数据校验错误';
    case '625':
      return '数据库操作失败';
    case '1000':
      return '	用户不存在';
    case '1001':
      return '用户被锁定';
    case '1010':
      return '发票不存在';
    case '1011':
      return '	本状态下，不能更新到 被指定的状态';
    case '1012':
      return '发票物流还没被接收，不能更新到“已完成”状态';
    case '1013':
      return '信息异常，不能更新到被指定的状态';
    case '1014':
      return '信息异常，不能更新数据';
    case '1015':
      return '	信息还没开始处理，不能更新';
    case '1016':
      return '	信息已经处理完毕，不能更新';
    case '1020':
      return '	发票还没有发送，不能发送此信息';
    case '1021':
      return '	信息已发送';
    case '1022':
      return '	请先发送 通知信息';
    case '1040':
      return '	结算信息不存在';
    case '1041':
      return '	已发送“发票已收到”，不能再发送“审批不成功';
    case '1050':
      return '	工程师不存在';
    case '1051':
      return '	不能删除唯一的工程师';
    case '1052':
      return '	不能删除没审批通过的工程师';
    case '1071':
      return '	本信息是别的操作员操作的';
    case '1080':
      return '	本状态下，不能 对此操作';
    case '1081':
      return '	本状态下，不能发送通知信息';
    case '1082':
      return '	请先发送 收到发票 的通知信息';
    case '1083':
      return '	不符合发送信息的条件';
    case '1090':
      return '	客户咨询不存在';
    case '1091':
      return '	本状态下，不能更新到 被指定的状态';
    case '1100':
      return '	订单不存在';
    case '1101':
      return '	订单已经被取消了';
    case '1102':
      return '	订单已完成，不能取消';
    case '1103':
      return '	订单生成者不是输入用户';
    case '1104':
      return '	接单服务商不是输入用户';
    case '1110':
      return '	微信退款出错';
    case '1111':
      return '	支付宝退款出错';
    case '1120':
      return '	投诉不存在';
    case '1130':
      return '	该用户已经因此订单扣过分了';
    case '1140':
      return '已经存在相同的组名，操作失败';
    case '1141':
      return '部门不存在';
    case '1142':
      return '信息已被删除';
    case '1143':
      return '部门还存在人员，不能删除';
    case '1150':
      return '已经存在相同的用户名，操作失败';
    case '1151':
      return '用户不存在';
    case '1152':
      return '用户不是服务商';
    case '1160':
      return '公司名字已存在';
    case '1170':
      return '工程师信息不存在';
    case '1180':
      return '企业审批信息不存在';
    case '1181':
      return '企业审批结果还没决定';
    case '1182':
      return '企业已经被审批，重复审批无效';
    case '1183':
      return '只有“正在审批”且“信息正常”状态下，才能更新审批结果';
    case '1184':
      return '用户状态有误，更新失败';
    case '1185':
      return '公司名字已经给注册了，更新失败';
    case '1190':
      return '资证信息不存在';
    case '1191':
      return '更新图片不属于本资证内容';
    case '1192':
      return '审批数量和资证图片不符';
    case '1193':
      return '图片已审批，不能重复审批';
    case '1200':
      return '工程师已经被审批，不能重复审批';
    case '1210':
      return '验证码错误';
    case '1211':
      return '管理员不存在';
    case '1212':
      return '登录密码错误';
    case '1213':
      return '还没登录';
    case '1300':
      return '没权限';
    case '1310':
      return 'Rma信息不存在';
    case '1311':
      return 'Rma还没达到“处理完毕”条件';
    case '1312':
      return 'Rma编号已存在';
    case '1313':
      return 'Rma已取消，不能进行更新';
    case '1314':
      return '快递还没发出，不能完成';
    case '1320':
      return '反馈不存在';
    case '1321':
      return '反馈已阅读';
    case '1330':
      return 'Chia客户不存在';
    case '1331':
      return 'Chia存在相同客户名称';
    case '1332':
      return '服务器已经绑定了另外的客户';
    case '1333':
      return 'Cus_id不存在';
    case '1334':
      return '客户还有服务器，不能删除';
    case '1334':
      return '已绑定机器信息，暂不能删除';
    case '1335':
      return '此手机号码已绑定其他账号';
    default:
      return '未知错误';
  }
};

/**
 * 提示框
 */
export const Alert = (msg: string) => {
  window.alert(msg);
};

/**
 * 弹框
 */
export const Confirm = (msg: string) => {
  return new Promise((resolve, reject) => {
    if (window.confirm(msg)) {
      resolve(true);
    } else {
      reject(null);
    }
  });
};
