import { rest } from 'msw'

export const handlers = [

    // mock capabilities crud
    rest.get(`${process.env.REACT_APP_API_URL}capabilities`, (req, res, ctx) => {
        return res(ctx.json({
            "name": "delete",
            "id": "YiliWMj"
          }))
    }),
    rest.post(`${process.env.REACT_APP_API_URL}capabilities`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "apalah",
          "id": "LtUmlB0"
        })
      )
    }),
    rest.put(`${process.env.REACT_APP_API_URL}capabilities/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name" : "test",
          "id": "YiliWMj"
        })
      )
    }),
    rest.delete(`${process.env.REACT_APP_API_URL}capabilities/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name" : "test",
          "id": "YiliWMj"
        })
      )
    }),

    // mock modules crud
    rest.get(`${process.env.REACT_APP_API_URL}modules/`, (req, res, ctx) => {
        return res(ctx.json({
            "name": "Manage PR",
            "link": "/manage-pr",
            "flag": "VENDOR",
            "feature_ids": [
              "1",
              "2"
            ],
            "id": "asdfadfa13asdsfa"
          },))
    }),

    // mock roles crud
    rest.get(`${process.env.REACT_APP_API_URL}roles`, (req, res, ctx) => {
        return res(ctx.json({
            "id": "asdfah123sda",
            "name": "Admin",
            "flag": "VENDOR",
            "module_ids": [
              "mid1",
              "mid2"
            ]
          }))
    }),

    // mock features crud
    rest.get(`${process.env.REACT_APP_API_URL}features`, (req, res, ctx) => {
        return res(ctx.json( {
            "name": "asdfadfa",
            "flag": "VENDOR",
            "capabilities": [
              "YiliWMj"
            ],
            "id": "QCVJk0a"
          }))
    }),
    rest.post(`${process.env.REACT_APP_API_URL}features`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "Purchase Order",
          "flag": "BUYER",
          "capability_ids": [
              "id1",
              "id2"
          ],
          "id": "Yxdgpia"
      })
      )
    }),
    rest.put(`${process.env.REACT_APP_API_URL}features/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "Purchase Order",
          "flag": "BUYER",
          "capability_ids": [
              "id1",
              "id2"
          ],
          "id": "Yxdgpia"
      })
      )
    }),
    rest.delete(`${process.env.REACT_APP_API_URL}features/1`, (req, res, ctx) => {
      return res(
        ctx.json({})
      )
    }),

    // mock status crud
    rest.get(`${process.env.REACT_APP_API_URL}status`, (req, res, ctx) => {
        return res(ctx.json({
            "name": "Open",
            "id": "YiliWMj"
          }))
    }),

     // mock configstatus crud
     rest.get(`${process.env.REACT_APP_API_URL}configstatus`, (req, res, ctx) => {
        return res(ctx.json({
            "name": "Open to Submit",
            "current": "Open",
            "next": [
              {
                "id": "_byDibm",
                "name": "Submit"
              }
            ],
            "id": "D-6CDDf"
          }))
    }),

]