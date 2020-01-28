'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

const mainRoute = '/api/v1';

Route.get('/', () => {
	return { greeting: 'Hello world in JSON' }
})

Route.post(`${mainRoute}/users`, 'UserController.create')

Route.get(`${mainRoute}/users`, 'UserController.show')
	.middleware('auth')

Route.post(`${mainRoute}/sessions`, 'SessionController.create')

Route.resource(`${mainRoute}/userProfiles`, 'UserProfileController')
	.apiOnly()
	.middleware('auth')
