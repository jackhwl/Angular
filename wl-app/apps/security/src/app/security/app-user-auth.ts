import { AppUserClaim } from "./app-user-claim";

export class AppUserAuth {
    userName: string = "";
    bearerToken: string = "";
    isAuthenticated: boolean = false;
    claims: AppUserClaim[] = [];
    // canAccessProducts: boolean = false;
    // canAddProduct: boolean = false;
    // canSaveProduct: boolean = false;
    // canAccessCategories: boolean = false;
    // canAddCategory: boolean = false;
}