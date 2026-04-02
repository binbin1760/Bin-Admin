<template>
  <div class="create-plan">
    <n-space
      :size="[16, 8]"
      :item-style="{ width: '260px' }"
    >
      <!-- 方案名称 -->
      <n-form-item
        label="方案名称:"
        :label-width="80"
        label-placement="left"
      >
        <n-input
          v-model:value="baseTableParmas.name"
          placeholder="请输入绩效计划名称"
        />
      </n-form-item>
      <!-- 周期类型 -->
      <n-form-item
        label="周期类型:"
        :label-width="80"
        label-placement="left"
      >
        <n-select
          v-model:value="baseTableParmas.evaluationCycle"
          :options="evaluationCycleOptions"
          :on-update:value="onUpdateEvaluationCycle"
          placeholder="请选择考核周期"
        />
      </n-form-item>
      <!-- 考核周期 -->
      <n-form-item
        label="考核周期:"
        :label-width="80"
        label-placement="left"
      >
        <n-date-picker
          v-model:value="baseTableParmas.cycle"
          :type="nDatePickerType"
          placeholder="请选择考核周期"
        />
      </n-form-item>
      <!-- 方案状态 -->
      <n-form-item
        label="方案状态:"
        :label-width="80"
        label-placement="left"
      >
        <n-select
          v-model:value="baseTableParmas.status"
          :options="statusOptions"
          placeholder="请选择方案状态"
        />
      </n-form-item>
      <n-switch v-model:value="showCollapse">
        <template #checked>
          <span>折叠</span>
        </template>
        <template #unchecked>
          <span>展开</span>
        </template>
      </n-switch>
    </n-space>
    <n-collapse-transition :show="showCollapse">
      <n-space
        :size="[16, 8]"
        :item-style="{ width: '260px' }"
      >
        <!-- 考核对象类型 -->
        <n-form-item
          label="对象类型:"
          :label-width="80"
          label-placement="left"
        >
          <n-select
            v-model:value="baseTableParmas.evaluationSubject"
            :options="evaluationSubjectOptions"
            :on-update:value="onUpdateEvaluationSubjectType"
            placeholder="请选择考核对象类型"
          />
        </n-form-item>
        <!-- 考核对象 -->
        <n-form-item
          label="考核对象:"
          :label-width="80"
          label-placement="left"
        >
          <n-tree-select
            v-show="baseTableParmas.evaluationSubject === 1"
            :options="sujectTreeOptions"
            @load="depOnload"
          />
          <n-tree-select
            v-show="baseTableParmas.evaluationSubject === 2"
            :options="sujectTreeOptions"
            @load="userOnLoad"
          />
        </n-form-item>
      </n-space>
    </n-collapse-transition>
    <n-space
      :size="16"
      justify="space-between"
    >
      <n-space :size="16">
        <n-button
          type="info"
          @click="cratePlanModal"
        >
          新 建
        </n-button>
      </n-space>
      <n-space>
        <n-button>重 置</n-button>
        <n-button type="info">搜 索</n-button>
      </n-space>
    </n-space>
    <!-- table -->
    <div class="data-table">
      <base-table
        ref="baseTableRef"
        :columns="column()"
        :request-api="getPlanList"
        :other-props="{ 'scroll-x': 1800 }"
        v-model:query="baseTableParmas"
      />
    </div>
    <!-- page modal -->
    <CreatePlanModal v-model:show="showCreateModal" />
  </div>
</template>

<script setup lang="ts">
  import { DataTableColumns } from 'naive-ui'
  import {
    EvaluationCycle,
    evaluationCycleOptions,
    // PerformancePlan,
    NdatePickerType,
    PlanListDataFileterParams,
    evaluationSubjectOptions,
    statusOptions,
    PlanTable
  } from '../index'
  import { useUserAndDepSelectHook } from '@/hooks'
  import { getPlanList } from '@/api'
  import { CreatePlanModal } from './compoments'
  // const plan = reactive<Nullable<PerformancePlan>>({
  //   name: null,
  //   evaluationCycle: null,
  //   cycle: null,
  //   evaluationSubject: null,
  //   subjectName: null,
  //   subjectId: null,
  //   status: null
  // })

  const { initData, initDepData, depOnload, userOnLoad } =
    useUserAndDepSelectHook()
  const evaluationCycleValue = ref<EvaluationCycle | null>(3)
  const nDatePickerType = ref<NdatePickerType>('year')
  const sujectTreeOptions = computed(() => {
    if (baseTableParmas.evaluationSubject === 1) {
      return initDepData.value ? [initDepData.value] : []
    } else if (baseTableParmas.evaluationSubject === 2) {
      return initData.value ? [initData.value] : []
    } else {
      return []
    }
  })
  const showCollapse = ref<boolean>(false)
  const baseTableParmas = reactive<PlanListDataFileterParams>({
    name: '',
    evaluationCycle: null,
    cycle: null,
    evaluationSubject: null,
    status: null,
    subjectId: null
  })
  const showCreateModal = ref<boolean>(false)
  //data table config
  const column = (): DataTableColumns<PlanTable> => [
    {
      title: '序号',
      key: '',
      align: 'center',
      fixed: 'left',
      width: 60,
      render(_row, index) {
        return h('span', {}, index + 1)
      }
    },
    {
      title: '方案名称',
      key: 'name',
      align: 'center'
    },
    {
      title: '周期类型',
      key: 'evaluationCycle',
      align: 'center'
    },
    {
      title: '考核周期',
      key: 'cycle',
      align: 'center'
    },
    {
      title: '考核对象类型',
      key: 'evaluationSubject',
      align: 'center'
    },
    {
      title: '考核对象',
      key: 'subjectName',
      align: 'center'
    },
    {
      title: '方案状态',
      key: 'status',
      align: 'center'
    }
  ]
  function onUpdateEvaluationCycle(value: number) {
    const typeArr = ['month', 'quarter', 'year']
    nDatePickerType.value = typeArr[value - 1] as unknown as NdatePickerType
    evaluationCycleValue.value = value as EvaluationCycle
  }
  function onUpdateEvaluationSubjectType(value: number) {
    baseTableParmas.evaluationSubject = value
  }
  //show crate modal
  function cratePlanModal() {
    showCreateModal.value = true
  }
</script>
<style scoped lang="less">
  .create-plan {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .data-table {
      flex: 1;
      overflow: hidden;
      margin-top: var(--padding-main-top);
    }
  }
  .nspace-custom-itme {
    width: 280px;
  }
</style>
