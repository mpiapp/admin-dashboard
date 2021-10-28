import { store } from "../../../../app/store";
import { onGetVendorCategory, onCreateVendorCategory, onRemoveVendorCategory, onUpdateVendorCategory } from './vendorCategoryAction'

test('getVendorCategory test', async () => {
  let state = store.getState().vendorcategory;
  expect(state.data).toHaveLength(0);

  onGetVendorCategory()
  state = await store.getState().vendorcategory;
  expect(state.data).toHaveLength(0);
});


test('create VendorCategory test', async () => {
    let data = {
        name : "test"
    }
    onCreateVendorCategory(data);
});

test('update VendorCategory test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateVendorCategory(data);
});

test('remove VendorCategory test', async () => {
    let data = {
        id : "2"
    }
    onRemoveVendorCategory(data);
});
