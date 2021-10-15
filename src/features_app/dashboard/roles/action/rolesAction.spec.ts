import { store } from "../../../../app/store";
import {  
    onGetRoles,
    onCreateRoles,
    onUpdateRoles,
    onRemoveRoles 
} from './rolesAction'

test('getRoles test', async () => {
  let state = store.getState().roles;
  expect(state.data).toHaveLength(0);

  await onGetRoles()
  state = await store.getState().roles;
  expect(state.data).toHaveLength(0);
});


test('create Roles test', async () => {
    let data = {
        name : "test"
    }
    await onCreateRoles(data);
});

test('update Roles test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    await onUpdateRoles(data);
});

test('remove Roles test', async () => {
    let data = {
        id : "1"
    }
    await onRemoveRoles(data);
});
