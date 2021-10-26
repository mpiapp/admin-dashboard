import MasterUserSuperadmin from './MasterUserSuperadmin';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'

const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element dashboard User Superadmin page", () => {
    it('should render all element in dashboard User Superadmin page', () => {
        render(<MasterUserSuperadmin />)
    
        // render main component
        expect(screen.getByText("Master Users Superadmin")).toBeInTheDocument();

    })

    it('should render all element in dashboard User Superadmin page', () => {
      render(<MasterUserSuperadmin />)
      const butonCreateNew = screen.getByRole("button",{ name : /Create New User/i })

      userEvent.click(butonCreateNew)

      expect(screen.getByText(/Add New User/i)).toBeInTheDocument()
      

  })
})
