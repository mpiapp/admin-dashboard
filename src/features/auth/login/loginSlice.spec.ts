import loginReducer, {
    LoginState,
  } from './loginSlice';
  
describe('test auth slice redux', () => {
    it('should handle initial state', () => {
      expect(loginReducer(undefined, { type: 'unknown' })).toEqual({
        login: false,
      });
    });
  
});