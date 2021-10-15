import SettingPage from './SettingPage';
import { render , screen } from '@testing-library/react';


describe("render element dashboard roles page", () => {
    it('should render all element in dashboard roles page', () => {
        render(<SettingPage />)
    
        // render main component
        expect(screen.getByText(/setting/i)).toBeInTheDocument();

    })
})
