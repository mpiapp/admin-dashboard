import LegalDocument from './LegalDocument';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Legal Document page", () => {
    it('should render all element in dashboard Legal Document page', () => {
        render(<LegalDocument />)
    
        // render main component
        expect(screen.getByText("Master Legal Document")).toBeInTheDocument();

    })

    it('should open modal create Legal Document', () => {
      render(<LegalDocument />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Legal Document/i })
  
      userEvent.click(butonCreateNew)
  
      expect(screen.getByText(/Add New Legal Document/i)).toBeInTheDocument()
      
  
    })
})
