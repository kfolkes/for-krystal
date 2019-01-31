import { Router } from 'express'
import validate from 'express-validation'

import { accounts, created, preChecks } from '../fixtures/linkAccounts'
import { linkAccount, linkAccountPreCheck } from '../lib/validation'
/* import request from 'request-promise'
import { server } from '../server.config'
import { parseToQuery } from '../lib/utils' */

const router = Router()

router.get('/', (req, res, next) => {
	setTimeout(() => {
		res.json(accounts)
	}, 5000)
})

router.post('/', validate(linkAccount), (req, res, next) => {
	const { password, username, companyId, linkedAccount } = req.body
	const dataAccount = {
		'company_id': companyId,
		'password': password,
		'username': username,
		'linkedaccount': {
			'linkedaccount_username': linkedAccount.username,
			'linkedaccount_platform_display_name': linkedAccount.account,
			'linkedaccount_alias': linkedAccount.alias
		}
	}
	console.log(dataAccount)

	setTimeout(() => {
		res.json(created)
	}, 5000)
})

router.post('/pre-check', validate(linkAccountPreCheck), (req, res, next) => {
	const { password, username, companyId } = req.body
	const dataAccount = {
		'linkedaccount_password' : password,
		'linkedaccount_username' : username,
		'linkedaccount_company_id' : companyId
	}
	console.log(dataAccount)

	setTimeout(() => {
		res.json(preChecks)
	}, 5000)
})


export default router
