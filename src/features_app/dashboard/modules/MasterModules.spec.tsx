import MasterModules from './MasterModules';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import userEvent from '@testing-library/user-event'


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
) 

describe("render element dashboard Modules page", () => {
  it('should render all element in dashboard Modules page', () => {
      render(<MasterModules />)
  
      // render main component
      expect(screen.getByText("Master Modules")).toBeInTheDocument();

  })

  it('should open modal create modules', () => {
    render(<MasterModules />)
    const butonCreateNew = screen.getByRole("button",{ name : /Create New Modules/i })

    userEvent.click(butonCreateNew)

    expect(screen.getByText(/Add New Modules/i)).toBeInTheDocument()
    

  })
})

