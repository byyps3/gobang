/*
 * @Author: lyp
 * @Date: 2020-07-22 17:25:39
 * @LastEditors: lyp
 * @LastEditTime: 2020-07-22 17:26:51
 * @Description: 
 */
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))