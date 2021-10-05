import forgotReducer, {
    sendEmail
  } from './forgotSlice';
  
describe('INITAL STATE STORE FORGOTSLICE', () => {
    it('should handle initial state', () => {
      expect(forgotReducer(undefined, { type: 'unknown' })).toEqual({
        forgot: false,
        loading : false,
        error : null
      });
    });
  
});


describe('LOGIN SLICE TESTS', () => {
  it('should set loading true while action is pending', () => {
      const action = {type: sendEmail.pending};
      const initialState = forgotReducer(
      { 
        forgot: false,
        loading : false,
        error : null
      }, action);
      expect(initialState).toEqual(
        {
          forgot: false,
          loading : true,
          error : null
        }
      )
    })

  it('should set forgot state when action is fulfilled', () => {
      const action = {
          type: sendEmail.fulfilled, 
          payload:{ 
            data : {
              email : "johndoe@email.com"
            }
          }
      };
      const initialState = forgotReducer(
        { 
          forgot: true,
          loading : false,
          error : null
        }, action);
        expect(initialState).toEqual(
          {
            forgot: true,
            loading : false,
            error : null
          }
        )
  })

  it('should set error when action is rejected', () => {
      const action = {
        type: sendEmail.rejected,
        payload : "Error Server"
      };
      const initialState = forgotReducer(
        { 
          forgot: false,
          loading : false,
          error : null
        }, action);
        expect(initialState).toEqual(
          {
            forgot: false,
            loading : false,
            error : "Error Server"
          }
        )
    })
})