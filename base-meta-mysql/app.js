const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
const MySQLAdapter = require('@bot-whatsapp/database/mysql')

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = ''
const MYSQL_DB_NAME = 'prueba1'
const MYSQL_DB_PORT = '3306'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 ',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 .',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 ',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer(
        [
            '',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MySQLAdapter({
        host: MYSQL_DB_HOST,
        user: MYSQL_DB_USER,
        database: MYSQL_DB_NAME,
        password: MYSQL_DB_PASSWORD,
        port: MYSQL_DB_PORT,
    })
    const adapterFlow = createFlow([flowPrincipal])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: 'EAACHzjLEaIoBALBTsBXOTkk0obZByiO7dWMpZBlY3DcBd0GB2djnUY5beNA2uyrHcOpCnH3yVSdkds1YRRPc9SOOpbIusgHPiV4XkxdteNfv9OoOIM31d0NNnQUtPNnqXK4raGjc9dD67EdHYhhUqqpM9c9GwngRbffHcmZBt2FZAlUqucqyZCOnc7M1nvRVsZBRC36fqlNL6kfZAOCXmYmZCUzCv9XGkQaqyywsrTgalgZDZD',
        numberId: '112034248525654',
        verifyToken: 'EAACHzjLEaIoBALBTsBXOTkk0obZByiO7dWMpZBlY3DcBd0GB2djnUY5beNA2uyrHcOpCnH3yVSdkds1YRRPc9SOOpbIusgHPiV4XkxdteNfv9OoOIM31d0NNnQUtPNnqXK4raGjc9dD67EdHYhhUqqpM9c9GwngRbffHcmZBt2FZAlUqucqyZCOnc7M1nvRVsZBRC36fqlNL6kfZAOCXmYmZCUzCv9XGkQaqyywsrTgalgZDZD',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
