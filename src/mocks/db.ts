import { factory, primaryKey, manyOf } from "@mswjs/data";
import { v4 as uuid } from 'uuid'

export const stages = [
    { id: uuid(), title: 'Backlog' },
    { id: uuid(), title: 'Doing' },
    { id: uuid(), title: 'Review' },
    { id: uuid(), title: 'Done' }
]

export const db = factory({
    stages: {
      id: primaryKey(String),
      title: String,
      cards: manyOf('cards'),
    },
    cards: {
        id: primaryKey(String),
        title: String,
        stage_id: String
    }
});

stages.forEach((stage) => db.stages.create(stage))