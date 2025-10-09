import { fastify } from 'fastify';
import fastifyStatic from '@fastify/static'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'
import { DataBasePostgres } from './database-postgres.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const server = fastify()

const database = new DataBasePostgres()

server.register(fastifyStatic, {
  root: join(__dirname, 'public'),
})

// request body

server.post('/videos', async (req, rep) => {
    const {title, description, duration} = req.body


    await database.create({
        title: title,
        description: description,
        duration: duration,
    })

    return rep.status(201).send()
});

server.get('/videos', async (req, res) => {
    const search = req.query.search

    const videos = await database.list(search)

    return videos
});

server.put('/videos/:id', async (req, rep) => {
    const videoId = req.params.id
    const {title, description, duration} = req.body

    await database.update(videoId, {
        title: title,
        description: description,
        duration: duration,
    })

    return rep.status(204).send()
});

server.delete('/videos/:id', async(req, rep) => {
    const videoId = req.params.id

    await database.delete(videoId)

    return rep.status(204).send()
});

server.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running on port 3333!');
});