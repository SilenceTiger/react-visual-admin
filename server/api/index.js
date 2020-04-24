let express = require("express")
let Mock = require("mockjs")
let router = express.Router()

//router.get router.post
router.all("/get", function (req, res) {
  res.json(
    Mock.mock({
      code: 200,
      "data|1-9": [
        {
          "name|5-8": /[a-zA-Z]/,
          "id|+1": 1,
          "value|0-500": 20,
        },
      ],
    })
  )
})

module.exports = router
