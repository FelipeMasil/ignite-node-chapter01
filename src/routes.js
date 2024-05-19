import { randomUUID as uuid } from 'node:crypto'

import { Database } from './database.js';
import { BuildRoutePath } from './utils/build-route-path.js';

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: BuildRoutePath('/users'),
        handler: (req, res)=>{
        const { search } = req.query;            
        const users = database.select('users', {
            name: search,
            email: search
        })
        return res
        .end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: BuildRoutePath('/users'),
        handler: (req, res)=>{            
            const { name, email } = req.body;
            const user = {
                id: uuid(),
                name,
                email,
            }    
            database.insert('users', user)    
            return res.writeHead('201').end();
        }
    },
    {
        method: 'DELETE',
        path: BuildRoutePath('/users/:id'),
        handler: (req, res) =>{
            const { id } = req.params;

            database.delete('users', id)

            res.writeHead('204').end()
        }
    },
    {
        method: 'PUT',
        path: BuildRoutePath('/users/:id'),
        handler: (req, res) =>{
            const { id } = req.params;
            const {name, email} = req.body;

            database.update('users', id, {
                name,
                email
            })

            res.writeHead('204').end()
        }
    }
]