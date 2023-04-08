export interface IAssociatedUser {
    associatedUserId: string
}
export interface IUserAssociationRequest {
    userAssociationRequestId: string
    userAssociationRequestUsername: string
    userAssociationRequestUserFullName: {
        firstName: string
        lastName: string
    }
}
export type UserAssociationRequestsContextType = {
    userAssociationRequests: IUserAssociationRequest[] | null
    getUserAssociationRequests: () => Promise<void>
    addUserAssociationRequest: (
        userAssociationRequestsPayload: IUserAssociationRequest[]
    ) => Promise<void>
}

export type UserAssociationRequestAction =
    | {
          type: 'ADD_USER_ASSOCIATION_REQUESTS'
          payload: IUserAssociationRequest[]
      }
    | {
          type: 'REMOVE_USER_ASSOCIATION_REQUEST'
          payload: IUserAssociationRequest[]
      }
