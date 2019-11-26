'use strict'

const User = use("App/Models/User")

class UserController {
	async create({ request }) {
		const data = request.only(["username", "email", "password"])

		const user = await User.create(data)

		return user
	}

	async show({ auth, response }) {
		console.info(`[User Data Manager] Verificando se pode requisitar dados do próprio usuário`)
		try {
			const { id, username, email } = await auth.getUser()
			const data = {
				id,
				username,
				email
			}
			console.info(`[User Data Manager] Retornando os principais dados do usuário:`, data)

			return {
				...data
			}
		} catch (error) {
			console.info(`[User Data Manager] Não foi possível requisitar os dados. Motivo: Token inválido.`)
			response.send('Missing or invalid jwt token')
		}
	}
}

module.exports = UserController
