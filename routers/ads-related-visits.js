const express = require('express')
const router = new express.Router()
const { pool } = require('../db/connect')

router.post('/ads-visit', async (req, res) => {})

router.get('/ads-visit', async (req, res) => {})

module.exports = {router}