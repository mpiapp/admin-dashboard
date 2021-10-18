import { store } from "../../../../app/store";
import { onGetFeatures, onCreateFeatures, onRemoveFeatures, onUpdateFeatures } from './featuresAction'

test('getFeatures test', async () => {
    let state = store.getState().features
    expect(state.data).toHaveLength(0)

    onGetFeatures()
    state = await store.getState().features
    expect(state.data).toHaveLength(0)
})


test('create Features test', async () => {
    let data = {
        name : "test"
    }
    onCreateFeatures(data)
})

test('update Features test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateFeatures(data)
})

test('remove Features test', async () => {
    let data = {
        id : "1"
    }
    onRemoveFeatures(data)
})
