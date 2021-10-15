import { store } from "../../../../app/store";
import { 
    fetchFeatures,  
    postFeatures,
    updateFeatures,
    removeFeatures 
} from '../reducers/featuresReducers'

export const onGetFeatures = (): void => {
    store.dispatch(fetchFeatures());
  };
  
export const onCreateFeatures = (data: any): void => {
    store.dispatch(postFeatures(data));
};

export const onUpdateFeatures = (data: any): void => {
    store.dispatch(updateFeatures(data));
};
 
export const onRemoveFeatures = (data: any): void => {
    store.dispatch(removeFeatures(data));
};
