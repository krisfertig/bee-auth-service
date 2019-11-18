'use strict'
const axios = use('axios');

const GRAFANA_URL = 'http://admin:kmaedelkris@localhost:1234';

class SessionController {
  async create ({ request, auth }) { 
    const { email, password } = request.all()

    console.info('[Session Manager] Validando sessão do usuário', email)
    const token = await auth.attempt(email, password)

    axios.get(`${GRAFANA_URL}/api/users/lookup?loginOrEmail=${email}`)
      .catch(({ response }) => {
        const responseStatus = response.status;
        if (responseStatus === 404) {
          console.info(`[Session Manager] Não encontrou registro de conta do usuário ${email} no grafana!`)
          createGrafanaUser(email, password);
        }
      });
    
    return token
  }
}

const createGrafanaUser = function (email, password) {
  console.info(`[Session Manager] Criando ususário com ${email} no grafana.`)
  const userLogin = /([^@]+)/.exec(email)[0];

  axios.post(`${GRAFANA_URL}/api/admin/users`, {
      name: userLogin,
      email: email,
      login: userLogin,
      password: password
    }).catch(({ response }) => {
      console.info('[Session Manager] Erro ao criar usuário no grafana:', response)
    });
};

module.exports = SessionController
