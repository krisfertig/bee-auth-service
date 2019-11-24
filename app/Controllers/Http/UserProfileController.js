'use strict'

const UserProfile = use('App/Models/UserProfile')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with userprofiles
 */
class UserProfileController {
	/**
	 * Show a list of all userprofiles.
	 * GET userprofiles
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	// Listar todos os registros
	async index({ request, response, view }) {
		const userProfiles = UserProfile.all()

		return userProfiles
	}

	/**
	 * Render a form to be used for creating a new userprofile.
	 * GET userprofiles/create
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	/*
	async create({ request, response, view }) {
	}
	*/

	/**
	 * Create/save a new userprofile.
	 * POST userprofiles
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	// Criar novo registro
	async store({ auth, request, response }) {

		const { id } = auth.user
		const data = request.only([
			'firstName',
			'lastName',
			'userRole'
		])

		const userProfile = await UserProfile.create({
			first_name: data.firstName,
			last_name: data.lastName,
			user_role: data.userRole,
			user_id: id
		})

		return userProfile
	}

	/**
	 * Display a single userprofile.
	 * GET userprofiles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	// Exibir um registro
	async show({ params, request, response, view }) {
		const userProfile = await UserProfile.findOrFail(params.id)

		return userProfile
	}

	/**
	 * Render a form to update an existing userprofile.
	 * GET userprofiles/:id/edit
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	/*
	async edit({ params, request, response, view }) {
	}
	*/

	/**
	 * Update userprofile details.
	 * PUT or PATCH userprofiles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	// Alterar um registro
	async update ({ params, request, response }) {
		const userProfile = await UserProfile.findOrFail(params.id)
		
		const data = request.only([
			'firstName',
			'lastName',
			'userRole'
		])
		
		userProfile.merge({
			first_name: data.firstName,
			last_name: data.lastName,
			user_role: data.userRole,
		})
		
		await userProfile.save()

		return userProfile
	}

	/**
	 * Delete a userprofile with id.
	 * DELETE userprofiles/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	// Remover um registro
	async destroy ({ params, auth, response }) {
		const userProfile = await UserProfile.findOrFail(params.id)

		if (userProfile.user_id !== auth.user.id) {
			return response.status(401).send({ error: 'Not authorized' })
		}

		await userProfile.delete()
	}
}

module.exports = UserProfileController
