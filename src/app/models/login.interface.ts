export interface Credentials {
   userName: string;
   password: string;
}

export interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    expiration: number;
}

export interface RefreshTokenResource {
    userName: string,
    token: string
}