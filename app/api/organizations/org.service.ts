import { organization } from "better-auth/plugins"
import {OrganizationRepo} from "./org.repo"
import { APIError, ErrCode } from "encore.dev/api"

export const OrganizationService = {
     // getById
     async getById( id: string){
          const org = await OrganizationRepo.getById(id)

          if(!org){
               throw new APIError(ErrCode.NotFound, "Organization not found")
          }

          return org
     },

     // create
     async create(
          input: {name: string},
          ctx: {organizationId: string, role: string}
     ){
          if(ctx.role!="admin"){
               throw new APIError(ErrCode.PermissionDenied, "Admin only create organization")
          }

          const org = await OrganizationRepo.create({
               name: input.name, 
          })
     },

     // update
     async update(
          input: {name: string},
          ctx: {organizationId: string, role: string}
     ){
          if(ctx.role!="admin"){
               throw new APIError(ErrCode.PermissionDenied, "Admin only update organization")
          }

          return OrganizationRepo.update(ctx.organizationId, input.name)     
     }
}