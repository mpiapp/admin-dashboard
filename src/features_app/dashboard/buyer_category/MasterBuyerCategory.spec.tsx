import MasterBuyerCategory from './MasterBuyerCategory';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'

const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard Buyer Category page", () => {
    it('should render all element in dashboard Buyer Category page', () => {
        render(<MasterBuyerCategory />)
     
        // render main component
        expect(screen.getByText("Master Buyer Category")).toBeInTheDocument();

    })

    it('should render all element in dashboard Buyer Category page', () => {
      render(<MasterBuyerCategory />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New Buyer Category/i })

      userEvent.click(butonCreateNew)

      expect(screen.getByText(/Add New Buyer Category/i)).toBeInTheDocument()
      

  })
})
