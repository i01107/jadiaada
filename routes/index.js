require('dotenv').config()
const express = require("express")
const router = express.Router()
const axios = require("axios")

router.get('/greetings', function (req, res) {
  res.status(200).json({
    message : "i'm in",
  })
})

router.get('/get_all_repos', function(req, res) {
  axios({
    method: 'get',
    url: 'https://api.github.com/user/repos',
    headers: {
      'Authorization': `token ${process.env.GITHUB_KEY}`
    }
  })
  .then((response) => {
    res.status(200).json(response.data)
  })
})

router.post('/create_repo', function(req, res) {
  axios({
    method: 'post',
    url: 'https://api.github.com/user/repos',
    headers: {
      'Authorization': `token ${process.env.GITHUB_KEY}`
    },
    data: {
      name: req.body.name,
      description: req.body.description
    }
  })
  .then((response) => {
    res.status(201).json(response.data)
  })
})

router.patch('/edit_repo', function(req, res) {
  axios({
    method: 'patch',
    url: `https://api.github.com/repos/i01107/${req.body.repo}`,
    headers: {
      'Authorization': `token ${process.env.GITHUB_KEY}`
    },
    data: {
      name: req.body.name,
      description: req.body.description
    }
  })
  .then((response) => {
    res.status(200).json(response.data)
  })
  .catch((error) => {
    res.status(404).json({
      message: `Error from github : ${error.message}`
    })
  })
})

module.exports = router