import MasterModules from './MasterModules';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Modules page", () => {
    it('should render all element in dashboard Modules page', () => {
        render(<MasterModules />)
    
        // render main component
        expect(screen.getByText("Master Modules")).toBeInTheDocument();

    })
})
