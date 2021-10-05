import {screen, fireEvent ,render as renderRTL, } from '@testing-library/react'
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';
import Forgot from './Forgot';


const render = (component : any)  => renderRTL (
  <Provider store={store}>
    {component}
  </Provider>
)

describe("render element register page", () => {
    it('should render all element in forgot page', () => {
        render(<Forgot />)
    
        // render navbar component
        expect(screen.getByAltText(/logo mpi/)).toBeInTheDocument()
        // render footer component
        expect(screen.getByText(/pt manajemen pemesanan indonesia/i)).toBeInTheDocument();
        expect(screen.getByText(/copyright/i)).toBeInTheDocument();
    
        // render main component
        expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
        expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name : 'Submit'})).toBeInTheDocument();
        expect(screen.getByRole('link', { name : "Back to Sign In" })).toBeInTheDocument();
    
    })
})


describe("forgot form", () => {
    describe("with invalid email", () => {
      it("renders the email validation error", async () => {
        const {getByLabelText, container} = render(<Forgot />)
        await act(async () => {
          const emailInput = getByLabelText(/email address/i)
          fireEvent.change(emailInput, {target: {value: "invalid email"}})
          fireEvent.blur(emailInput)
        })
        expect(container.innerHTML).toMatch("Email is invalid")

      })
    })
  
})