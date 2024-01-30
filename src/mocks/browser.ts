import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
import { CardProps } from '../@types';
import { db } from './db'
 
export const worker = setupWorker(
    ...db.stages.toHandlers("rest", "http://localhost:3001/api/v1/"),
    http.post('http://localhost:3001/api/v1/cards', async ({ request }) => {
        const data = await request.json() as CardProps;
        
        const newCard = db.cards.create(data)
        
        db.stages.update({ 
            where: { 
                id: { equals: data.stage_id }
            },
            data: {
                cards: db.cards.findMany({ where: { stage_id: { equals: data.stage_id }}})
            }
        })

        return HttpResponse.json(newCard)
    })
)