import express, { type Express } from 'express'

export function createServer(): Express {
    const app = express()
    app.use(express.json())
    return app
}
