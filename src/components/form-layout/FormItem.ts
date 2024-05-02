export type FormItemType = 'input' | 'select' | 'checkbox' | 'radio';

export interface FormItem {
    type: FormItemType;
    payload: any;
    next: (current: FormItem, acients: FormItem[]) => FormItem | null;
    parent: FormItem | null;
}

export function createFormItem(
    formItemType: FormItem['type'],
    payload: FormItem['payload'],
    next?: FormItem['next'],
    parent?: FormItem['parent']
) {
    if (!next) {
        next = () => null
    }
    if (!parent) {
        parent = null;
    }
    const nextFunc: FormItem['next'] = (current, acients) => {
        let nextItem = next!(current, acients)
        if (!nextItem) {
            return null
        }
        nextItem.parent = current
        if (!isReactive(nextItem)) {
            nextItem = reactive(nextItem)
        }
        return nextItem
    };
    const formItem: FormItem = reactive({
        type: formItemType,
        payload,
        next: nextFunc,
        parent,
    });

    return formItem;
}