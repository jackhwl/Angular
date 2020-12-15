export class AppUserAuth {
    userName: string = "";
    bearerToken: string = "";
    isAuthenticated: boolean = false;
    canAccessProducts: boolean = false;
    canAddProduct: boolean = false;
    canSaveProduct: boolean = false;
    canAccessCategories: boolean = false;
    canAddCategory: boolean = false;
}