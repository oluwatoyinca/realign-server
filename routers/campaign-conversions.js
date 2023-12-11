const express = require('express')
const router = new express.Router()
const { pool } = require('../db/connect')

router.post('/conversions', async (req, res) => {})

router.get('/conversions', async (req, res) => {})

router.patch('/conversions/:id', async (req, res) => {})

module.exports = {router}