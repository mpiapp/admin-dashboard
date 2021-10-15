import MasterRoles from './MasterRoles';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
) 

describe("render element dashboard Roles page", () => {
    it('should render all element in dashboard Roles page', () => {
        render(<MasterRoles />)
    
        // render main component
        expect(screen.getByText("Master Roles")).toBeInTheDocument();

    })

    it('should open modal create Roles', () => {
      render(<MasterRoles />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Role/i })
  
      userEvent.click(butonCreateNew)
  
      expect(screen.getByText(/Add New Role/i)).toBeInTheDocument()
      
  
    })

    
})
