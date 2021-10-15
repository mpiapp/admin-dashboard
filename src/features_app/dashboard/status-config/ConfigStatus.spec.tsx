import ConfigStatus from './ConfigStatus';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Config Status page", () => {
    it('should render all element in dashboard Config Status page', () => {
        render(<ConfigStatus />)
    
        // render main component
        expect(screen.getByText("Master Config Status")).toBeInTheDocument();

    })
})
