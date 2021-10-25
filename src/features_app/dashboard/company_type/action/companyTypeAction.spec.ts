import { store } from "../../../../app/store";
import { onGetCompanyType, onCreateCompanyType, onRemoveCompanyType, onUpdateCompanyType } from './companyTypeAction'

test('getCompanyType test', async () => {
    let state = store.getState().companytype
    expect(state.data).toHaveLength(0)

    onGetCompanyType()
    state = await store.getState().companytype
    expect(state.data).toHaveLength(0)
})


test('create CompanyType test', async () => {
    let data = {
        name : "test"
    }
    onCreateCompanyType(data)
})

test('update CompanyType test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateCompanyType(data)
})

test('remove CompanyType test', async () => {
    let data = {
        id : "1"
    }
    onRemoveCompanyType(data)
})
