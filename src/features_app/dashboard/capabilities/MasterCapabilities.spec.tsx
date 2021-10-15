import MasterCapabilities from './MasterCapabilities';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'

const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Capabilities page", () => {
    it('should render all element in dashboard Capabilities page', () => {
        render(<MasterCapabilities />)
    
        // render main component
        expect(screen.getByText("Master Capabilities")).toBeInTheDocument();

    })

    it('should render all element in dashboard Capabilities page', () => {
      render(<MasterCapabilities />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Capabilities/i })

      userEvent.click(butonCreateNew)

      expect(screen.getByText(/Add New Capability/i)).toBeInTheDocument()
      

  })
})
