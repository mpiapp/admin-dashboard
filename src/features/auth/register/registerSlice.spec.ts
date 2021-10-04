import registerSlice, {
    RegisterState,
  } from './registerSlice';
  
describe('test auth register slice redux', () => {
    it('should handle initial state', () => {
      expect(registerSlice(undefined, { type: 'unknown' })).toEqual({
        register: false,
      });
    });
  
});