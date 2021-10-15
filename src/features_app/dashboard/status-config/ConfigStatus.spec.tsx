import ConfigStatus from './ConfigStatus';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


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

    it('should open modal create Config', () => {
      render(<ConfigStatus />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Config/i })
  
      userEvent.click(butonCreateNew)
  
      expect(screen.getByText(/Add New Config/i)).toBeInTheDocument()
      
  
    })
})
