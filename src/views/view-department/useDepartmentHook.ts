import { ref, reactive, computed } from 'vue'
import {
  DepartmentType,
  IDENTITY,
  ISVIRTUALORG,
  JOBGRADE,
  LEVEL,
  OPERATION_OR_FUNCTION,
  STAFF_JOB_LEVEL,
  STAFF_STATUS,
  StaffType,
  TIRLEVEL
} from './baseType'
import { AsyncBaseFormConfig } from '@/components'
import { TreeOption, TreeSelectOption } from 'naive-ui'
import { useUserAndDepSelectHook } from '@/hooks'
import { depStaffStore } from '@/store/modules/departmentAndStaff'

export const useDepartmentHook = () => {
  const { getDepAndUserSelectNodeData, initData, getDepChildNdoeData } =
    useUserAndDepSelectHook()
  const useDpeStaffStore = depStaffStore()
  const currUserDep = useDpeStaffStore.getCurrentUserDep

  //dep tree data
  const depData = ref<Array<TreeOption>>()
  //部门表单配置
  const depFormModel = reactive<Nullable<DepartmentType>>({
    name: null,
    code: null,
    leaderId: null,
    leader: null,
    level: null,
    treeLevel: null,
    agentLeaderId: null,
    agentLeader: null,
    divisionLeaderId: null,
    divisionLeader: null,
    tirLevel: null,
    operationOrFunction: null,
    dataEntryUserId: null,
    dataEntryUser: null,
    isVirtualOrg: false,
    parentId: null,
    description: null
  })

  const depFormConfig = ref<Array<AsyncBaseFormConfig>>([
    {
      type: 'number',
      label: '组织编码',
      gridSpan: 6,
      path: 'code',
      value: null,
      rule: {
        type: 'number',
        required: true,
        message: '组织编号不能为空',
        trigger: ['blur']
      }
    },
    {
      type: 'input',
      label: '组织名称',
      path: 'name',
      gridSpan: 6,
      value: null,
      rule: {
        required: true,
        message: '组织名称不能为空',
        trigger: ['blur']
      }
    },
    {
      type: 'tree-select',
      label: '组织负责人',
      path: 'leaderId',
      gridSpan: 6,
      value: '',
      options: [initData.value],
      otherProps: {
        'on-load': getUserSelect
      },
      upadteValue: (value) => {
        depFormModel.leader = value.option.label
      },
      rule: {
        required: true,
        message: '请选择组织负责人',
        trigger: ['blur']
      }
    },
    {
      type: 'tree-select',
      label: '授权代理人',
      path: 'agentLeaderId',
      gridSpan: 6,
      value: '',
      options: [initData.value],
      upadteValue: (value) => {
        depFormModel.agentLeader = value.option.label
      },
      otherProps: {
        'on-load': getUserSelect
      }
    },
    {
      type: 'tree-select',
      label: '分管领导',
      path: 'divisionLeaderId',
      gridSpan: 6,
      value: '',
      options: [initData.value],
      otherProps: {
        'on-load': getUserSelect
      },
      upadteValue: (value) => {
        depFormModel.divisionLeader = value.option.label
      }
    },
    {
      type: 'select',
      label: '组织层级',
      path: 'level',
      gridSpan: 6,
      value: '',
      options: LEVEL.map((item) => ({
        label: item,
        value: item
      })),
      rule: {
        required: true,
        message: '请选择组织层级',
        trigger: ['blur']
      }
    },
    {
      type: 'select',
      label: '分布层级',
      path: 'tirLevel',
      gridSpan: 6,
      value: null,
      options: TIRLEVEL.map((item) => ({
        label: item,
        value: item
      })),
      rule: {
        required: true,
        message: '请选择分布层级',
        trigger: ['blur']
      }
    },
    {
      type: 'select',
      label: '职能运营',
      path: 'operationOrFunction',
      gridSpan: 6,
      value: null,
      options: [
        {
          label: '运营部门',
          value: OPERATION_OR_FUNCTION.OPERATION
        },
        {
          label: '职能部门',
          value: OPERATION_OR_FUNCTION.FUNCTION
        }
      ]
    },
    {
      type: 'radio',
      label: '虚拟组织',
      path: 'isVirtualOrg',
      gridSpan: 6,
      value: 0,
      options: [
        {
          label: '是',
          value: ISVIRTUALORG.IS_VIRTUAL_ORG_TRUE
        },
        {
          label: '否',
          value: ISVIRTUALORG.IS_VIRTUAL_ORG_FALSE
        }
      ],
      rule: {
        type: 'boolean',
        required: true,
        message: '请确认该组织是否为虚拟组织',
        trigger: ['change']
      }
    },
    {
      type: 'tree-select',
      label: '数据录入管理员',
      path: 'dataEntryUserId',
      gridSpan: 6,
      value: 1,
      options: [initData.value],
      otherProps: {
        'on-load': getUserSelect
      },
      upadteValue: (value) => {
        depFormModel.dataEntryUser = value.option.label
      }
    },
    {
      type: 'textarea',
      label: '部门描述',
      gridSpan: 12,
      path: 'description',
      value: ''
    }
  ])

  const editDepformConfig = computed(() => {
    return depFormConfig.value.map((item) => ({ ...item, gridSpan: 12 }))
  })

  async function getUserSelect(node: TreeSelectOption) {
    const res = await getDepAndUserSelectNodeData(node.key as unknown as string)
    node.children = res as unknown as TreeSelectOption[]
  }

  async function getDepData(parentId: string) {
    const res = await getDepChildNdoeData(parentId)
    if (res.length > 0 && depData.value) {
      depData.value[0].children = res as unknown as TreeOption[]
    }
  }
  async function getTopDep() {
    const topDep = useDpeStaffStore.getTopDepInfo
    if (topDep.depId) {
      depData.value = [
        {
          label: topDep.depName ?? undefined,
          key: topDep.depId,
          isLeaf: false,
          nodeData: topDep
        }
      ]

      if (topDep.depId !== currUserDep.depId && currUserDep.depId) {
        getDepData(currUserDep.depId)
      }
    }
  }
  getTopDep()
  //员工表单配置
  const userFormModel = ref<Nullable<StaffType>>({
    name: null,
    code: null,
    companyTenure: null,
    hireDate: null,
    secondaryHireDate: null,
    directSuperior: null,
    directSuperiorId: null,
    position: null,
    sarayGroup: null,
    jobLevel: null,
    jobGrade: null,
    mGrade: null,
    pGrade: null,
    sGrade: null,
    noeGrade: null,
    towGrade: null,
    identity: null,
    status: null,
    agent: null,
    agentId: null,
    agentTime: null,
    department: null,
    departmentId: null
  })
  const userFormConfig = computed<Array<AsyncBaseFormConfig>>(() => {
    return [
      {
        type: 'input',
        label: '员工名称',
        path: 'name',
        value: null,
        gridSpan: 6,
        rule: {
          required: true,
          message: '员工名称不能为空',
          trigger: ['blur']
        }
      },
      {
        type: 'number',
        label: '员工编号',
        path: 'code',
        value: null,
        gridSpan: 6,
        rule: {
          type: 'number',
          required: true,
          message: '员工编号不能为空',
          trigger: ['blur']
        }
      },
      {
        type: 'number',
        label: '工龄',
        path: 'companyTenure',
        value: null,
        gridSpan: 6,
        rule: {
          type: 'number',
          required: true,
          message: '员工工龄不能为空',
          trigger: ['blur']
        }
      },
      {
        type: 'date',
        label: '入职时间',
        path: 'hireDate',
        value: null,
        gridSpan: 6,
        rule: {
          type: 'number',
          required: true,
          message: '请选择入职日期',
          trigger: ['blur']
        }
      },
      {
        type: 'date',
        label: '二次入职时间',
        path: 'secondaryHireDate',
        value: null,
        gridSpan: 6
      },
      {
        type: 'tree-select',
        label: '直接上级',
        path: 'directSuperiorId',
        value: null,
        gridSpan: 6,
        options: [initData.value],
        rule: {
          required: true,
          message: '请选择直属上级',
          trigger: ['blur']
        },
        otherProps: {
          'on-load': getUserSelect
        },
        upadteValue: (val) => {
          userFormModel.value.directSuperior = val.option.label
        }
      },
      {
        type: 'input',
        label: '职位',
        path: 'position',
        value: null,
        gridSpan: 6,
        rule: {
          required: true,
          message: '请输入员工职位',
          trigger: ['blur']
        }
      },
      {
        type: 'select',
        label: '职级',
        path: 'jobLevel',
        value: null,
        gridSpan: 6,
        options: STAFF_JOB_LEVEL.map((item) => ({ label: item, value: item })),
        rule: {
          type: 'string',
          required: true,
          message: '请选择职级',
          trigger: ['blur', 'change']
        }
      },
      {
        type: 'select',
        label: '薪资组',
        path: 'sarayGroup',
        value: null,
        gridSpan: 6,
        options: [
          { label: '上海薪资组', value: '上海薪资组' },
          { label: '北京薪资组', value: '北京薪资组' },
          { label: '四川薪资组', value: '四川薪资组' },
          { label: '成都薪资组', value: '成都薪资组' },
          { label: '安岳薪资组', value: '安岳薪资组' },
          { label: '乐山薪资组', value: '乐山薪资组' }
        ]
      },
      {
        type: 'select',
        label: 'MPS序列',
        path: 'jobGrade',
        gridSpan: 6,
        rule: {
          type: 'number',
          required: true,
          message: '请在M,P,S三个序列选择一个',
          trigger: ['blur', 'change']
        },
        options: [
          { label: 'M序列', value: JOBGRADE.M_GRADE },
          { label: 'P序列', value: JOBGRADE.P_GRADE },
          { label: 'S序列', value: JOBGRADE.S_GRADE }
        ]
      },
      {
        type: 'select',
        label: 'M序列',
        path: 'mGrade',
        gridSpan: 6,
        disabled: userFormModel.value.jobGrade === 1 ? false : true,
        options: [
          { label: '架构师', value: 'AA' },
          { label: '小组长', value: '111' },
          { label: '打灰的', value: '111A' }
        ]
      },
      {
        type: 'select',
        label: 'P序列',
        path: 'pGrade',
        gridSpan: 6,
        disabled: userFormModel.value.jobGrade === 2 ? false : true,
        options: [
          { label: 'P序列的架构师', value: 'AA' },
          { label: 'p序列的小组长', value: '111' },
          { label: '襟', value: '111A' }
        ]
      },
      {
        type: 'select',
        label: 'S序列',
        path: 'sGrade',
        gridSpan: 6,
        disabled: userFormModel.value.jobGrade === 3 ? false : true,
        options: [
          { label: 'super 打灰的', value: 'AA' },
          { label: 'SSS 打会的', value: '111' },
          { label: '摆渡人', value: '111A' }
        ]
      },
      {
        type: 'select',
        label: '一级序列',
        path: 'noeGrade',
        gridSpan: 6,
        disabled: false,
        options: [
          { label: '水', value: 'AA' },
          { label: '开水', value: '111' },
          { label: '白开水', value: '111A' }
        ]
      },
      {
        type: 'select',
        label: '二级序列',
        path: 'towGrade',
        gridSpan: 6,
        disabled: false,
        options: [
          { label: '咖啡', value: 'AA' },
          { label: '甜的咖啡', value: '111' },
          { label: '苦的咖啡', value: '111A' }
        ]
      },
      {
        type: 'select',
        label: '身份',
        path: 'identity',
        gridSpan: 6,
        disabled: false,
        rule: {
          type: 'number',
          required: true,
          message: '未设置员工身份',
          trigger: ['trigger', 'chenge']
        },
        options: [
          { label: '正式员工', value: IDENTITY.IDENTITY_1 },
          { label: '实习生', value: IDENTITY.IDENTITY_2 },
          { label: '劳务派遣', value: IDENTITY.IDENTITY_3 },
          { label: '外包人员', value: IDENTITY.IDENTITY_4 }
        ]
      },
      {
        type: 'select',
        label: '状态',
        path: 'status',
        value: null,
        gridSpan: 6,
        options: [
          { label: STAFF_STATUS.STAFF_STATUS_1, value: 1 },
          { label: STAFF_STATUS.STAFF_STATUS_2, value: 2 },
          { label: STAFF_STATUS.STAFF_STATUS_3, value: 3 }
        ]
      },
      {
        type: 'tree-select',
        label: '代理人',
        path: 'agentId',
        value: null,
        gridSpan: 6,
        options: [initData.value],
        rule: {
          require: true,
          message: '请选择直属上级',
          trigger: ['blur']
        },
        otherProps: {
          'on-load': getUserSelect,
          clearable: true
        },
        upadteValue: (val) => {
          userFormModel.value.agent = val.option ? val.option.label : null
        }
      },
      {
        label: '代理时间',
        type: 'date',
        path: 'agentTime',
        otherProps: {
          type: 'daterange'
        }
      }
    ]
  })

  const userFormEditConfig = computed(() => {
    return userFormConfig.value.map((item) => ({ ...item, gridSpan: 12 }))
  })

  return {
    depFormModel,
    depFormConfig,
    currUserDep,
    depData,
    editDepformConfig,
    userFormModel,
    userFormConfig,
    userFormEditConfig,
    getTopDep
  }
}
