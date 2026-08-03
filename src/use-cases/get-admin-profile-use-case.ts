import { Admin } from "../../generated/prisma/client";
import { AdminsRepository } from "../repositories/admins-repositories";
import { UserNotFoundError } from "./errors/userNotFound";

interface GetAdminProfileUseCaseRequest {
    id: number;
}
interface GetAdminProfileUseCaseResponse {
    admin: Admin;
}
export class GetAdminProfileUseCase {
    constructor(private adminsRepository: AdminsRepository) {}
    async execute({ id }: GetAdminProfileUseCaseRequest): Promise<GetAdminProfileUseCaseResponse> {
        const admin = await this.adminsRepository.findById(id);
        if (!admin) {
            throw new UserNotFoundError();
        }
        return { admin };
    }
}
