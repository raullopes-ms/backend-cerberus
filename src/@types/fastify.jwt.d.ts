import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        payload: {
            sub: string,
            setorId?: string,
            role?: "admin",
        }
        user: {
            sub: string,
            setorId?: string,
            role?: "admin",
        }
    }
}