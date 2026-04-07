import { defineComponent, toRefs, h, ref } from 'vue'
import { NForm, NFormItem, NButton } from 'naive-ui'
import styles from './dynamic-form.module.css'
import { DynamicFormItem, props } from './props'
import { componentList } from './ui'
import { cloneDeep } from 'lodash'

// import { cloneDeep } from 'lodash'

// use props.config create model
function createModel(
  config: Array<DynamicFormItem> | undefined
): Record<string, any> {
  if (!config) {
    return {}
  }
  return config.reduce(
    (obj, item) => {
      obj[item.path] = item.value
      return obj
    },
    {} as unknown as Record<string, any>
  )
}

export default defineComponent({
  name: 'dynamic-form',
  props,
  setup(props, { expose }) {
    const { gridColumns, config, placement, gap, btnConfig } = toRefs(props)
    const formRef = ref<any>()
    const originalConfig = cloneDeep(config.value)
    const formModel = ref(createModel(config.value))

    const resetForm = () => {
      formModel.value = createModel(originalConfig)
      formRef.value?.restoreValidation()
    }

    expose({
      formRef,
      resetForm
    })

    return () => (
      <NForm
        ref={formRef}
        model={formModel.value}
        labelPlacement={placement.value}
      >
        <div
          class={styles['form-gird-container']}
          style={{ gridTemplateColumns: gridColumns.value, gap: gap.value }}
        >
          {config.value?.map((item, _index) => {
            const { placeholder, options, otherProps, realatedField } = item
            const props = {
              placeholder,
              options,
              ...otherProps
            }

            const Comp = componentList[item.componentName]
            return (
              <NFormItem
                rule={item.rule}
                label={item.label}
                path={item.path}
              >
                <Comp
                  {...props}
                  value={formModel.value[item.path]}
                  onUpdate:value={(val: any) => {
                    formModel.value[item.path] = val
                    item.value = val
                    if (
                      realatedField &&
                      realatedField.callBack &&
                      config.value
                    ) {
                      const tagretItem = config.value?.find(
                        (item) => item.path === realatedField?.path
                      )
                      if (!tagretItem) {
                        console.error('has no realted filed')
                        return
                      }
                      realatedField.callBack(tagretItem, item)
                    }
                  }}
                />
              </NFormItem>
            )
          })}
          <div class={styles['btn-list']}>
            {btnConfig.value &&
              btnConfig.value?.map((btn, _index) => (
                <NButton
                  type={btn.type}
                  onClick={() => {
                    formRef.value?.validate((errors: any) => {
                      if (!errors && btn.valid) {
                        const data = formModel.value
                        btn.callBack(data, cloneDeep(originalConfig))
                      } else {
                        const data = formModel.value
                        btn.callBack(data, cloneDeep(originalConfig))
                      }
                    })
                  }}
                >
                  {btn.text}
                </NButton>
              ))}
          </div>
        </div>
      </NForm>
    )
  }
})
