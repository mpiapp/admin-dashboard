import { store } from "../../../../app/store";
import { 
    onGetPaymentTerms, 
    onCreatePaymentTerms, 
    onRemovePaymentTerms,
    onUpdatePaymentTerms 
} from './paymentTermsAction'

test('getPaymentTerms test', async () => {
  let state = store.getState().paymentterms;
  expect(state.data).toHaveLength(0);

    onGetPaymentTerms()
  state = await store.getState().paymentterms;
  expect(state.data).toHaveLength(0);
});


test('create PaymentTerms test', async () => {
    let data = {
        name : "test"
    }
    onCreatePaymentTerms(data);
});

test('update PaymentTerms test', async () => {
    let data = {
        name : "test",
        id: "1"
    }
    onUpdatePaymentTerms(data);
});

test('remove PaymentTerms test', async () => {
    let data = {
        id : "1"
    }
    onRemovePaymentTerms(data);
});
