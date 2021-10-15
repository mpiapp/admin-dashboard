import MasterFeatures from './MasterFeatures';
import { render as renderRTL, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import { store } from '../../../app/store';


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
})
