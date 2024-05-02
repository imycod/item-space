import {createFormItem} from "@/components/form-layout/FormItem.ts";

const item1 = createFormItem(
    'input',
    {label: 'Name', placeholder: 'Enter your name'},
    current => (current.payload.value === 'test1' ? item2 : null)
)

const item2 = createFormItem(
    'select',
    {
        label: 'test2',
        options: [
            {label: 'test2-2', value: 'test2-2'},
            {label: 'test2-3', value: 'test2-3'},
            {label: 'test2-4', value: 'test2-4'},
        ],
        value: 'test2-1'
    },
    current => {
        if (current.payload.value === 'test2-2') {
            return item3
        } else if (current.payload.value === 'test2-3') {
            return item4
        } else {
            return null
        }
    }
)

const item3 = createFormItem(
    'checkbox',
    {
        label: 'test3',
        options: [
            {label: 'test3-1', value: 'test3-1'},
            {label: 'test3-2', value: 'test3-2'},
            {label: 'test3-3', value: 'test3-3'},
        ],
        value: ['test3-1', 'test3-2']
    },
    current => (current.payload.value.includes('test3-1') ? item4 : null)
)

let item5Options = ref([
    {label: 'test5-1', value: 'test5-1'},
])
const item4 = createFormItem(
    'radio',
    {
        label: 'test4',
        options: [
            {label: 'test4-1', value: 'test4-1'},
            {label: 'test4-2', value: 'test4-2'},
            {label: 'test4-3', value: 'test4-3'},
        ],
        value: 'test4-1'
    },
    (current) => {
        const value = current.payload.value
        if (value === 'test4-1') {
            item5Options.value = [
                {label: 'test5-1', value: 'test5-1'},
            ]
        } else if (value === 'test4-2') {
            item5Options.value = [
                {label: 'test5-1', value: 'test5-1'},
                {label: 'test5-2', value: 'test5-2'},
            ]
        } else if (value === 'test4-3') {
            item5Options.value = [
                {label: 'test5-1', value: 'test5-1'},
                {label: 'test5-2', value: 'test5-2'},
                {label: 'test5-3', value: 'test5-3'},
            ]
        } else {
            item5Options.value = []
        }
        return item5
    },
)
const item5 = createFormItem(
    'radio',
    {
        label: 'test5',
        options: item5Options,
        value: 'test5-1'
    },
)

export default item1