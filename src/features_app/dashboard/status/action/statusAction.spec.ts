import { store } from "../../../../app/store";
import { 
    onGetStatus, 
    onCreateStatus, 
    onRemoveStatus,
    onUpdateStatus 
} from './statusAction'

test('getStatus test', async () => {
  let state = store.getState().status;
  expect(state.data).toHaveLength(0);

    onGetStatus()
  state = await store.getState().status;
  expect(state.data).toHaveLength(0);
});


test('create Status test', async () => {
    let data = {
        name : "test"
    }
    onCreateStatus(data);
});

test('update Status test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateStatus(data);
});

test('remove Status test', async () => {
    let data = {
        id : "1"
    }
    onRemoveStatus(data);
});
