import { store } from "../../../../app/store";
import {  
    onGetModules,
    onCreateModules,
    onUpdateModules,
    onRemoveModules 
} from './modulesAction'

test('getModules test', async () => {
    let state = store.getState().modules;
    expect(state.data).toHaveLength(0);

    onGetModules()
    state = await store.getState().modules;
    expect(state.data).toHaveLength(0);
});


test('create Modules test', async () => {
    let data = {
        name : "test"
    }
    onCreateModules(data);
});

test('update Modules test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateModules(data);
});

test('remove Modules test', async () => {
    let data = {
        id : "1"
    }
    onRemoveModules(data);
});
