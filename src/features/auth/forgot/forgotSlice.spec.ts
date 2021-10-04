import forgotReducer, {
    ForgotState,
  } from './forgotSlice';
  
describe('test auth forgot slice redux', () => {
    it('should handle initial state', () => {
      expect(forgotReducer(undefined, { type: 'unknown' })).toEqual({
        forgot: false,
      });
    });
  
});