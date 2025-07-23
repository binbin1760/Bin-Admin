import { GlobalThemeOverrides } from 'naive-ui'
//naive ui组件样式配置
export const naiveComponentStyle: GlobalThemeOverrides = {
  common: {
    // 字体
    fontSize: '14px',
    fontSizeHuge: '16px',
    fontSizeMini: '12px',
    fontWeight: '400',
    fontWeightStrong: '500',
    // 圆角
    borderRadius: '4px',
    borderRadiusSmall: '2px',
    //常规颜色
    primaryColor: '#63E2B7FF',
    primaryColorHover: '#7FE7C4FF',
    primaryColorPressed: '#5ACEA7FF',
    //信息颜色
    infoColor: '#1890FF',
    infoColorHover: '#40A9FF',
    infoColorPressed: '#BAE7FF',
    //成功颜色
    successColor: '#52C41A',
    successColorHover: '#73D13D',
    successColorPressed: '#D9F7BE',
    //警告颜色
    warningColor: '#FAAD14',
    warningColorHover: '#FFC53D',
    warningColorPressed: '#FFE7BA',
    //错误颜色
    errorColor: '#FF4D4F',
    errorColorHover: '#FF7875',
    errorColorPressed: '#FFF1F0'
  },
  //侧栏菜单组件样式
  Menu: {
    //激活菜单的背景
    itemColorActive: '#FF1856',
    itemColorHover: '#1890FF',
    itemColorActiveHover: '#FF1856',
    //激活菜单文本样式
    itemTextColor: '#FFFFFF',
    itemTextColorHover: '#FFFFFF',
    itemTextColorActive: '#FFFFFF',
    itemTextColorActiveHover: '#FFFFFF',
    itemTextColorChildActive: '#FFFFFF',
    itemTextColorChildActiveHover: '#ffffff',
    //菜单icon样式
    itemIconColor: '#ffffff',
    itemIconColorHover: '#FFFFFF',
    itemIconColorActiveHover: '#FFFFFF',
    itemIconColorActive: '#FFFFFF',
    itemIconColorChildActive: '#ffffff',
    itemIconColorChildActiveHover: '#ffffff',
    //箭头
    arrowColor: '#FFFFFF',
    arrowColorHover: '#ffffff',
    arrowColorActive: '#FFFFFF',
    arrowColorActiveHover: '#ffffff',
    arrowColorChildActive: '#ffffff',
    arrowColorChildActiveHover: '#ffffff',
    //菜单压缩后的样式
    itemIconColorCollapsed: '#ffffff'
  },
  //下拉菜单
  Dropdown: {
    color: '#FFFFFF',
    optionTextColor: '#333333',
    optionTextColorHover: '#ffffff',
    optionTextColorActive: '#ffffff',
    optionColorActive: '#2C8DE8',
    optionColorHover: '#2C8DE8',
    prefixColor: '#000000'
  },
  //输入框
  Input: {
    heightMedium: '34px',
    fontSizeMedium: '14px',
    borderRadius: '3px',
    colorFocus: '#FFFFFF',
    textColor: '#333333',
    caretColor: '#333333',
    placeholderColor: '#999999',
    textColorDisabled: '#999999',
    color: '#ffffff',
    border: '1px solid #E0E0E6',
    borderFocus: '1px solid  #E71920FF',
    borderHover: '1px solid  #E71920FF',
    boxShadowFocus: '0 0 8px #E71920FF'
  },
  Tag: {
    colorInfo: '#1FA3E5FF'
  },
  Tree: {
    nodeColorActive: '#55BABE' //节点激活时的背景颜色
  }
}
