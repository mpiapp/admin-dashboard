import MasterFeatures from './MasterFeatures';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
) 

describe("render element dashboard Features page", () => {
    it('should render all element in dashboard Features page', () => {
        render(<MasterFeatures />)
    
        // render main component
        expect(screen.getByText("Master Features")).toBeInTheDocument();

    })

    it('should open modal create Features', () => {
      render(<MasterFeatures />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Feature/i })
  
      userEvent.click(butonCreateNew)
  
      expect(screen.getByText(/Add New Feature/i)).toBeInTheDocument()
      
  
    })
})
