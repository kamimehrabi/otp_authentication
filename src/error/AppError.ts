class AppError extends Error {
    constructor(
        public status: number,
        public message: string,
        public options?: { metadata: unknown },
    ) {
        super(message);
    }
}

export default AppError;
