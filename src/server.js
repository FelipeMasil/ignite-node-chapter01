import http from 'node:http'; //usar o prefixo "node:" para módulos internos no Nodejs

/**
 *      MÉTODOS DE REQUISIÇÃO
 *      
 *      GET => Buscar recurso no backend
 *      POST => Criar um recurso no backend
 *      PUT => Atualizar um recurso no backend
 *      PATCH => Atualizar uma informação específica de um recurso no backend
 *      DELETE => Deletar um recurso no backend
 * 
 */

const users = []

const server = http.createServer((req, res)=>{
    const { method, url } = req;

    if(method === 'GET' && url === '/users'){
        return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(users))
    }

    if(method === 'POST' && url === '/users'){
        
        users.push({
            id: 1,
            name: 'John Doe',
            email: 'john.doe@mail.com'
        })

        return res.writeHead('201').end();
    }

    return res.writeHead('404').end();
})

server.listen(3333)