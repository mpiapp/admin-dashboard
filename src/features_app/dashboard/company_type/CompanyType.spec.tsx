import CompanyType from './CompanyType';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
) 

describe("render element dashboard Company Type page", () => {
    it('should render all element in dashboard Company Type page', () => {
        render(<CompanyType />)
    
        // render main component
        expect(screen.getByText("Master Company Type")).toBeInTheDocument();

    })

    it('should open modal create Company Type', () => {
      render(<CompanyType />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Type/i })
  
      userEvent.click(butonCreateNew)
  
      expect(screen.getByText(/Add New Type/i)).toBeInTheDocument()
      
  
    })
})
