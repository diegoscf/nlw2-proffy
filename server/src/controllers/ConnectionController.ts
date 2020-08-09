import { Request, Response } from 'express';

import db from '../database/connection';

class ConnectionController {
    async index(req: Request, resp: Response) {
        const ttlConnections = await db('connections').count('* as total');

        const { total } = ttlConnections[0];

        return resp.json({total});
    }

    async store(req: Request, resp: Response) {
        const {user_id} = req.body;

        await db('connections').insert({
            user_id
        });

        return resp.status(201).send();
    }
}

export default ConnectionController;