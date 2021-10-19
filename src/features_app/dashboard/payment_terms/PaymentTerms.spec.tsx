import PaymentTerms from './paymentTerms';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Payment Terms page", () => {
    it('should render all element in dashboard Payment Terms page', () => {
        render(<PaymentTerms />)
    
        // render main component
        expect(screen.getByText("Master Payment Terms")).toBeInTheDocument();
    })

    it('should open modal create Payment Terms', () => {
      render(<PaymentTerms />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Payment Terms/i })
  
      userEvent.click(butonCreateNew)
  
      expect(screen.getByText(/Add New Payment Terms/i)).toBeInTheDocument()
      
  
    })
})
