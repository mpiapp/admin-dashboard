import loginReducer, {
    DataUser,
    loginAction,
  } from './loginSlice';
  
describe('INITIAL STATE STORE LOGINSLICE', () => {
    it('should handle initial state', () => {
      expect(loginReducer(undefined, { type: 'unknown' })).toEqual({
        login: false,
        data : {} as DataUser,
        loading : false,
        error : null
      });
    });
})

describe('LOGIN SLICE TESTS', () => {
  it('should set loading true while action is pending', () => {
      const action = {type: loginAction.pending};
      const initialState = loginReducer(
      { 
        login: false,
        data : {} as DataUser,
        loading : false,
        error : null
      }, action);
      expect(initialState).toEqual(
        {
          login: false,
          data : {} as DataUser,
          loading : true,
          error : null
        }
      )
    })

  it('should set data object when action is fulfilled', () => {
      const action = {
          type: loginAction.fulfilled, 
          payload:{ 
            access_token : 'accesstoken',
            id_token : 'idtoken',
            expires_in : 9000,
            email : "johndoe@gmail.com",
            fullname : "John Doe",
            avatar : "https://image.com",
            auth_id : "authid",
            login: true
          }
      };
      const initialState = loginReducer(
        { 
          login: false,
          data : {} as DataUser,
          loading : false,
          error : null
        }, action);
        expect(initialState).toEqual(
          {
            login: true,
            data : {
              access_token : 'accesstoken',
              id_token : 'idtoken',
              expires_in : 9000,
              email : "johndoe@gmail.com",
              fullname : "John Doe",
              avatar : "https://image.com",
              auth_id : "authid",
              login: true
            },
            loading : false,
            error : null
          }
        )
  })

  it('should set error when action is rejected', () => {
      const action = {
        type: loginAction.rejected,
        payload : "Wrong email or password!"
      };
      const initialState = loginReducer(
        { 
          login: false,
          data : {} as DataUser,
          loading : false,
          error : null
        }, action);
        expect(initialState).toEqual(
          {
            login: false,
            data : {} as DataUser,
            loading : false,
            error : "Wrong email or password!"
          }
        )
    })
})
    
