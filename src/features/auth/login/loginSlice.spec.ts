import loginReducer, {
    DataUser,
    loginAction,
    InputState,
    getData,
    checkInitalLogin
} from './loginSlice';
import { store } from '../../../app/store'

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

describe('REDUX ASYNTHUNK', () => {
  it('get data action success', async () => {
    const value : InputState = {
      email : 'demo@admin.com',
      password : 'Admin@20212020'
    }
    const data : DataUser = {
      access_token : 'accesstoken',
      id_token : 'idtoken', 
      expires_in : 9000,
      email : "johndoe@gmail.com",
      fullname : "John Doe",
      avatar : "https://image.com",
      auth_id : "authid",
      login: true
    }
    expect(await getData(value)).toStrictEqual(data)
  });

  it('get data action failed', async () => {
    const value : InputState = {
      email : 'hello@gmail.com',
      password : 'passrod'
    }
    expect(await getData(value)).toStrictEqual(null)
  });


  it('dispatch login success action', async () => {
    const value : InputState = {
      email : 'demo@admin.com',
      password : 'Admin@20212020'
    }

    const data : DataUser = {
      access_token : 'accesstoken',
      id_token : 'idtoken', 
      expires_in : 9000,
      email : "johndoe@gmail.com",
      fullname : "John Doe",
      avatar : "https://image.com",
      auth_id : "authid",
      login: true
    }

    const response = await store.dispatch(loginAction(value))
    expect(response.payload).toEqual(data)
  });

  it('dispatch login failed action', async () => {
    const value : InputState = {
      email : 'dem@admin.com',
      password : 'Admin@20212020'
    }
 
    const response = await store.dispatch(loginAction(value))
    expect(response.payload).toBe("Wrong email or password!")
  });

  it('check initial login true', async () => {
    let data = {
      access_token : 'accesstoken',
      id_token : 'idtoken', 
      expires_in : 9000,
      email : "johndoe@gmail.com",
      fullname : "John Doe",
      avatar : "https://image.com",
      auth_id : "authid",
      login: true
    }
 
    expect(await checkInitalLogin(data)).toBe(true)
  });

  it('check initial login false', async () => {
    let data = null
 
    expect(await checkInitalLogin(data)).toBe(false)
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
    
