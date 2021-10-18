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

    onGetRoles()
  state = await store.getState().roles;
  expect(state.data).toHaveLength(0);
});


test('create Roles test', async () => {
    let data = {
        name : "test"
    }
    onCreateRoles(data);
});

test('update Roles test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateRoles(data);
});

test('remove Roles test', async () => {
    let data = {
        id : "1"
    }
    onRemoveRoles(data);
});
