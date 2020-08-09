import { Request, Response } from 'express';

import db from '../database/connection';
import {ScheduleItem, Filters} from '../interfaces/global';
import hourToMinutes from '../utils/convertHourtToMinutes';

class ClassController {
    async index(req: Request, resp: Response) {
        const filters = Object.assign({} as Filters, req.query);

        if (!filters.weekday || !filters.subject || !filters.time) {
            return resp.status(400).json({
                "message": "You must fill all filters" 
            });
        }

        const timeInMinutes = hourToMinutes(filters.time);

        // whereRaw requer a crase nos nomes de tabela e atributos
        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`weekday` = ??', [Number(filters.weekday)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where(
                'classes.subject', 
                'like', 
                '%' + filters.subject + '%'
            )
            .join(
                'users', 
                'classes.user_id', 
                '=', 
                'users.id'
            )
            .select(['classes.*', 'users.*']);

        return resp.json(classes);

    }

    async store(req: Request, resp: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const dbTrx = await db.transaction();
    
        try {
    
            const usersIds = await dbTrx('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
    
            const classesIds = await dbTrx('classes').insert({
                subject,
                cost,
                user_id: usersIds[0]
            });
    
            const classSchedule = schedule.map((item: ScheduleItem) => {
                return {
                    class_id: classesIds[0],
                    weekday: item.weekday,
                    from: hourToMinutes(item.from),
                    to: hourToMinutes(item.to)
                }
            });
    
            await dbTrx('class_schedule').insert(classSchedule);
    
            await dbTrx.commit();
    
            return resp.status(201).send();
    
        } catch(err) {
            await dbTrx.rollback();
            console.log(err);
            return resp.status(400).json({
                message: "Unexpected error while creating class"
            });
        }
    }
}

export default ClassController;