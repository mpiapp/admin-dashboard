import MasterVendorCategory from './MasterVendorCategory';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'

const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Vendor Category page", () => {
    it('should render all element in dashboard Vendor Category page', () => {
        render(<MasterVendorCategory />)
     
        // render main component
        expect(screen.getByText("Master Vendor Category")).toBeInTheDocument();

    })

    it('should render all element in dashboard Vendor Category page', () => {
      render(<MasterVendorCategory />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Vendor Category/i })

      userEvent.click(butonCreateNew)

      expect(screen.getByText(/Add New Vendor Category/i)).toBeInTheDocument()
      

  })
})
