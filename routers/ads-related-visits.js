const express = require('express')
const router = new express.Router()
const { pool } = require('../db/connect')

const passBasicChecks = (paramsArray) => {
    const hasInvalidParams = paramsArray.some(param => param[0] == null || param[0].length == 0 || param[0].length > param[1])
    return !hasInvalidParams
}

router.post('/ads-visit', async (req, res) => {
    const { utm_campaign, page} = req.body
    if (passBasicChecks([[utm_campaign, 300], [page, 100]])) {
        try {
            const insertQuery = 'INSERT INTO ads_related_visits (utm_campaign, page_slug) VALUES($1, $2)'
            const insertValues = [utm_campaign, page]
            
            const insertResponse = await pool.query(insertQuery, insertValues)
            res.status(201).send({ data: insertResponse.rows })
        } catch(e) {
            res.status(500).send(e)
        }
    }
    else res.status(400).send(new Error('Invalid arguments!'))
})

router.get('/ads-visit', async (req, res) => {
    try {
        const checkQuery = 'select * FROM ads_related_visits'
        const checkResponse = await pool.query(checkQuery)
        res.status(200).send({ data: checkResponse.rows })
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = {router}