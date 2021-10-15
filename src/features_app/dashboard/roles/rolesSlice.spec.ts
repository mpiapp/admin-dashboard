import rolesReducer, {
    fetchRoles
} from './rolesSlice';
import { RolesInput } from './rolesTypes'
import { store } from '../../../app/store'

describe('INITIAL STATE STORE Roles SLICE', () => {
    it('should handle initial state', () => {
      expect(rolesReducer(undefined, { type: 'unknown' })).toEqual({
        data: [] as RolesInput[],
        loading : false,
        error : null,
        loading_create : false,
        error_create: null,
        create : false,
        loading_update : false,
        error_update: null,
        update : false,
        loading_remove : false,
        error_remove: null,
        remove : false
      });
    });
})

describe('TEST REDUX SLICE', () => {
  it('fetchRoles action success', async () => {
    const data  = [{
      "__v": 0, 
    }]

    // const response = await store.dispatch(fetchRoles())
    // // console.log(response,' repos')
    // expect(response.payload).toMatch(/__v/i)
  });
  // it('fetchRoles action failed', async () => {
  //   expect(await fetchRoles()).toHaveLength(0)
  // });
})


// describe('REDUX ASYNTHUNK', () => {
//   it('get data action success', async () => {
//     const value : InputState = {
//       email : 'demo@admin.com',
//       password : `${process.env.REACT_APP_PASSWORD_TEST}`
//     }
//     const data : DataUser = {
//       access_token : 'accesstoken',
//       id_token : 'idtoken', 
//       expires_in : 9000,
//       email : "johndoe@gmail.com",
//       fullname : "John Doe",
//       avatar : "https://image.com",
//       auth_id : "authid",
//       login: true
//     }
//     expect(await getData(value)).toStrictEqual(data)
//   });

//   it('get data action failed', async () => {
//     const pass = "123abscs"
//     const value : InputState = {
//       email : 'hello@gmail.com',
//       password : pass
//     }
//     expect(await getData(value)).toStrictEqual(null)
//   });


//   it('dispatch login success action', async () => {
//     const value : InputState = {
//       email : 'demo@admin.com',
//       password : `${process.env.REACT_APP_PASSWORD_TEST}`
//     }

//     const data : DataUser = {
//       access_token : 'accesstoken',
//       id_token : 'idtoken', 
//       expires_in : 9000,
//       email : "johndoe@gmail.com",
//       fullname : "John Doe",
//       avatar : "https://image.com",
//       auth_id : "authid",
//       login: true
//     }

//     const response = await store.dispatch(loginAction(value))
//     expect(response.payload).toEqual(data)
//   });

//   it('dispatch login failed action', async () => {
//     const value : InputState = {
//       email : 'dem@admin.com',
//       password : `${process.env.REACT_APP_PASSWORD_TEST}`
//     }
 
//     const response = await store.dispatch(loginAction(value))
//     expect(response.payload).toBe("Wrong email or password!")
//   });

//   it('check initial login true', async () => {
//     let data = {
//       access_token : 'accesstoken',
//       id_token : 'idtoken', 
//       expires_in : 9000,
//       email : "johndoe@gmail.com",
//       fullname : "John Doe",
//       avatar : "https://image.com",
//       auth_id : "authid",
//       login: true
//     }
 
//     expect(await checkInitalLogin(data)).toBe(true)
//   });

//   it('check initial login false', async () => {
//     let data = null
 
//     expect(await checkInitalLogin(data)).toBe(false)
//   });

// })

// describe('LOGIN SLICE TESTS', () => {
//   it('should set loading true while action is pending', () => {
//       const action = {type: loginAction.pending};
//       const initialState = RolesReducer(
//       { 
//         login: false,
//         data : {} as DataUser,
//         loading : false,
//         error : null
//       }, action);
//       expect(initialState).toEqual(
//         {
//           login: false,
//           data : {} as DataUser,
//           loading : true,
//           error : null
//         }
//       )
//     })

//   it('should set data object when action is fulfilled', () => {
//       const action = {
//           type: loginAction.fulfilled, 
//           payload:{ 
//             access_token : 'accesstoken',
//             id_token : 'idtoken',
//             expires_in : 9000,
//             email : "johndoe@gmail.com",
//             fullname : "John Doe",
//             avatar : "https://image.com",
//             auth_id : "authid",
//             login: true
//           }
//       };
//       const initialState = RolesReducer(
//         { 
//           login: false,
//           data : {} as DataUser,
//           loading : false,
//           error : null
//         }, action);
//         expect(initialState).toEqual(
//           {
//             login: true,
//             data : {
//               access_token : 'accesstoken',
//               id_token : 'idtoken',
//               expires_in : 9000,
//               email : "johndoe@gmail.com",
//               fullname : "John Doe",
//               avatar : "https://image.com",
//               auth_id : "authid",
//               login: true
//             },
//             loading : false,
//             error : null
//           }
//         )
//   })

//   it('should set error when action is rejected', () => {
//       const action = {
//         type: loginAction.rejected,
//         payload : "Wrong email or password!"
//       };
//       const initialState = RolesReducer(
//         { 
//           login: false,
//           data : {} as DataUser,
//           loading : false,
//           error : null
//         }, action);
//         expect(initialState).toEqual(
//           {
//             login: false,
//             data : {} as DataUser,
//             loading : false,
//             error : "Wrong email or password!"
//           }
//         )
//     })
// })
    
