// require('dotenv').config()
const fsp = require("fs").promises
const path = require("path")
const dayjs = require("dayjs")
const Font = require("ascii-art-font")
require("./mdt")

;(async () => {
  const now = dayjs()
  const today = now.format("YYYY-MM-DD")
  const moment = now.format("YYYY-MM-DD HH:mm:ss")
  /**
   * @type {String} output
   */
  const [o1, o2, template] = await Promise.all([
    Font.create("UTC :", "Doom"),
    Font.create(today, "Doom"),
    fsp.readFile(path.resolve(__dirname, "TEMPLATE.md"), {
      encoding: "utf-8",
    }),
  ])

  const matrix = template.replace(/{{replace}}/g, (o1 + o2).trimEnd()).replace(/{{date}}/g, moment)
  await fsp.writeFile(path.resolve(__dirname, "README.md"), matrix)
})()
