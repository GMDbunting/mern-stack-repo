import colors from "colors"

const C = { GET: "green", POST: "blue", PUT: "yellow", DELETE: "red" }

const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[
      C[req.method]
    ]
  )
  next()
}

export default logger
