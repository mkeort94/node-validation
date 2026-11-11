export class ApiError extends Error {
    override name = 'ApiError'

    constructor(
        message: string,
        public readonly status = 500,
        public readonly details?: unknown,
        options?: ErrorOptions,
    ) {
        super(message, options)
    }
}
