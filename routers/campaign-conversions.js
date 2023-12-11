const express = require('express')
const router = new express.Router()
const { pool } = require('../db/connect')

const PRODUCT_CHOICE = ['passion_test', 'talent_test']
const STATUS = ['not_contacted', 'contacted', 'success_closed', 'failed_closed']

const passBasicChecks = (paramsArray) => {
    const hasInvalidParams = paramsArray.some(param => param[0] == null || param[0].length == 0 || param[0].length > param[1])
    return !hasInvalidParams
}

router.post('/conversions', async (req, res) => {
    const { name, email, product_choice } = req.body
    if (passBasicChecks([[name, 50], [email, 100], [product_choice, 50]]) && PRODUCT_CHOICE.includes(product_choice)) {
        try {
            const insertQuery = 'INSERT INTO campaign_conversions (name, email, product_choice, status) VALUES($1, $2, $3, $4)'
            const insertValues = [name, email, product_choice, STATUS[0]]
            
            const insertResponse = await pool.query(insertQuery, insertValues)
            res.status(201).send({ data: insertResponse.rows })
        } catch(e) {
            res.status(500).send(e)
        }
    }
    else res.status(400).send(new Error('Invalid arguments!'))
})

router.get('/conversions', async (req, res) => {
    try {
        const {email, product_choice} = req.query
        const getByParams = email != null && product_choice != null
        const checkQuery = `select * FROM campaign_conversions${getByParams ? ' WHERE email = $1 and product_choice = $2' : ''}`
        const checkValues = getByParams ? [email, product_choice] : []
        
        const checkResponse = await pool.query(checkQuery, checkValues)
        res.status(200).send({ data: checkResponse.rows })
    } catch(e) {
        res.status(500).send(e)
    }
})

router.patch('/conversions/:id', async (req, res) => {
    const fieldsProvided = Object.keys(req.body)
    if (fieldsProvided.lengh > 0) {
        let isValid = true
        fieldsProvided.forEach(e => {
            if (!['status', 'notes'].includes(e)) isValid = false
            else if (e == 'status' && (!STATUS.includes(e) || !passBasicChecks([[e, 50]]))) isValid = false
            else if (e == 'notes' && e.length > 1500) isValid = false
        })
    
        if (isValid) {
            try {
                const updateQuery = `UPDATE campaign_conversions SET ${fieldsProvided[0]} = $3${fieldsProvided.length > 1 ? `, ${fieldsProvided[1]} = $4` : ''}, lastUpdatedAt = $2 WHERE id = $1`
                const updateValues = [req.params.id, new Date(), req.body[fieldsProvided[0]], req.body[fieldsProvided[1]]]
                
                const updateResponse = await pool.query(updateQuery, updateValues)
                res.status(204).send({ data: updateResponse.rows })
            } catch(e) {
                res.status(500).send(e)
            }
        }
        else res.status(400).send(new Error('Invalid arguments!'))
    }
    else res.status(400).send(new Error('Invalid arguments!'))
})

module.exports = {router}