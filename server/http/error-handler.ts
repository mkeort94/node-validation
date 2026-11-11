import type { ErrorRequestHandler, RequestHandler } from 'express'
import { ApiError } from './api-error'

export const notFoundHandler: RequestHandler = (req, res) => {
    res.status(404).json({ message: `Route ${req.method} ${req.path} not found` })
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message, errors: err.details })
        return
    }

    // Errors raised by Express middlewares (e.g. malformed JSON in express.json()).
    if (isClientHttpError(err)) {
        res.status(err.status).json({ message: err.message })
        return
    }

    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
}

function isClientHttpError(err: unknown): err is { status: number; message: string } {
    if (typeof err !== 'object' || err === null) return false
    const { status, expose } = err as { status?: unknown; expose?: unknown }
    return typeof status === 'number' && status >= 400 && status < 500 && expose === true
}
