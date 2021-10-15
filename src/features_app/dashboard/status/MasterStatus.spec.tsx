import MasterStatus from './MasterStatus';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


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

    it('should open modal create Status', () => {
      render(<MasterStatus />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Status/i })
  
      userEvent.click(butonCreateNew)
  
      expect(screen.getByText(/Add New Status/i)).toBeInTheDocument()
      
  
    })
})
