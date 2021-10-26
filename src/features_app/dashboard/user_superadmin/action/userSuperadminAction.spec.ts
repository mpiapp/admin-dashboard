import { store } from "../../../../app/store";
import { onGetUserSuperadmin, onCreateUserSuperadmin, onRemoveUserSuperadmin, onUpdateUserSuperadmin } from './userSuperadminAction'

test('getUserSuperadmin test', async () => {
  let state = store.getState().capabilities;
  expect(state.data).toHaveLength(0);

  onGetUserSuperadmin()
  state = await store.getState().capabilities;
  expect(state.data).toHaveLength(0);
});

let pass = "asdfadf"
test('create UserSuperadmin test', async () => {
    let data = {
        name : "johndoe",
        email : "johndoe@email.com",
        password : pass,
        flag : "BUYER",
        role : "Superadmin",
        verified : false,
    }
    onCreateUserSuperadmin(data);
});

test('update UserSuperadmin test', async () => {
    let data = {
        name : "johndoe",
        email : "johndoe@email.com",
        password : pass,
        flag : "BUYER",
        role : "Superadmin",
        verified : false,
        id: "12"
    }
    onUpdateUserSuperadmin(data);
});

test('remove UserSuperadmin test', async () => {
    let data = {
        id : "22"
    }
    onRemoveUserSuperadmin(data);
});
