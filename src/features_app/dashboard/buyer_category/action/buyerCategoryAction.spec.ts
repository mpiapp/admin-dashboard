import { store } from "../../../../app/store";
import { onGetBuyerCategory, onCreateBuyerCategory, onRemoveBuyerCategory, onUpdateBuyerCategory } from './buyerCategoryAction'

test('getBuyerCategory test', async () => {
  let state = store.getState().buyercategory;
  expect(state.data).toHaveLength(0);

  onGetBuyerCategory()
  state = await store.getState().buyercategory;
  expect(state.data).toHaveLength(0);
});


test('create BuyerCategory test', async () => {
    let data = {
        name : "test"
    }
    onCreateBuyerCategory(data);
});

test('update BuyerCategory test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdateBuyerCategory(data);
});

test('remove BuyerCategory test', async () => {
    let data = {
        id : "2"
    }
    onRemoveBuyerCategory(data);
});
