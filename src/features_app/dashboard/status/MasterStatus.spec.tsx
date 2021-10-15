import MasterStatus from './MasterStatus';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Status page", () => {
    it('should render all element in dashboard Status page', () => {
        render(<MasterStatus />)
    
        // render main component
        expect(screen.getByText("Master Status")).toBeInTheDocument();

    })
})
