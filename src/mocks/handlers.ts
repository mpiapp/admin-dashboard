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
          "name" : "testt",
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
    rest.post(`${process.env.REACT_APP_API_URL}modules`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "Manage PR",
          "link": "/manage-pr",
          "flag": "BUYER",
          "feature_ids": [
              "id1",
              "id2"
          ],
          "id": "aoLxXdv"
      })
      )
    }),
    rest.put(`${process.env.REACT_APP_API_URL}modules/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "feature_ids": ["id1", "id2"], 
          "flag": "VENDOR", 
          "id": "asdfadfa13asdsfa", 
          "link": "/manage-pr", 
          "name": "Manage PR"
      })
      )
    }),
    rest.delete(`${process.env.REACT_APP_API_URL}modules/1`, (req, res, ctx) => {
      return res(
        ctx.json({})
      )
    }),



    // mock roles crud
    rest.get(`${process.env.REACT_APP_API_URL}roles`, (req, res, ctx) => {
        return res(ctx.json({
            "id": "asdfah123s",
            "name": "Admin",
            "flag": "VENDOR",
            "module_ids": [
              "mid1",
              "mid2" 
            ]
          }))
    }),
    rest.post(`${process.env.REACT_APP_API_URL}roles`, (req, res, ctx) => {
      return res(
        ctx.json({
          "id": "asdfah123sda",
          "name": "Admin",
          "flag": "VENDOR",
          "module_ids": [
            "mid1",
            "mid2"
          ]
      })
      )
    }),
    rest.put(`${process.env.REACT_APP_API_URL}roles/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "id": "asdfah123sdaa",
          "name": "Admin",
          "flag": "VENDOR",
          "module_ids": [
            "mid1",
            "mid2"
          ]
      })
      )
    }),
    rest.delete(`${process.env.REACT_APP_API_URL}roles/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "id" : "delroles"
        })
      )
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
          "id": "Yxdgpiaa"
      })
      )
    }),
    rest.delete(`${process.env.REACT_APP_API_URL}features/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "id" : "delfeature"
        })
      )
    }),

    
    // mock status crud
    rest.get(`${process.env.REACT_APP_API_URL}status`, (req, res, ctx) => {
        return res(ctx.json({
            "name": "Open",
            "id": "YiliWMj"
          }))
    }),

    rest.post(`${process.env.REACT_APP_API_URL}status`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "Status",
          "id": "ozavvbx"
      })
      )
    }),
    rest.put(`${process.env.REACT_APP_API_URL}status/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "Status",
          "id": "ozavvbxa"
      })
      )
    }),
    rest.delete(`${process.env.REACT_APP_API_URL}status/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "id": "ozavvbx"
      })
      )
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
    rest.post(`${process.env.REACT_APP_API_URL}configstatus`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "Open to Status",
          "current": "Open",
          "next": [
              {
                  "id": "_byDibm",
                  "name": "Submit"
              }
          ],
          "id": "sIkSRjK"
      })
      )
    }),
    rest.put(`${process.env.REACT_APP_API_URL}configstatus/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "name": "Open to Status",
          "current": "Open",
          "next": [
              {
                  "id": "_byDibm",
                  "name": "Submit"
              }
          ],
          "id": "sIkSRjKa"
      })
      )
    }),
    rest.delete(`${process.env.REACT_APP_API_URL}configstatus/1`, (req, res, ctx) => {
      return res(
        ctx.json({
          "id": "sIkSRjK"
      })
      )
    }),

]