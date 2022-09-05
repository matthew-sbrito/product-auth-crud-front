export class ApplicationUser {
  id: number;
  name: string;
  username: string;
  createAt: Date;
  updatedAt: Date;

  constructor(id: number, name: string, username: string, createAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.createAt = createAt;
    this.updatedAt = updatedAt;
  }

  static fromApi(args: any) : ApplicationUser {
    return new ApplicationUser(
      Number(args['id']),
      args['name'],
      args['username'],
      new Date(args['createAt']),
      new Date(args['updatedAt']),
    );
  }
}

export class AuthenticationResponse {
  user: ApplicationUser;
  token: string;
  type: string;
  expireIn: number;
  createIn: number;

  constructor(user: ApplicationUser, token: string, type: string, expireIn: number, createIn: number) {
    this.user = user;
    this.token = token;
    this.type = type;
    this.expireIn = expireIn;
    this.createIn = createIn;
  }

  static fromApi(args: any) : AuthenticationResponse {
    return new AuthenticationResponse(
      ApplicationUser.fromApi(args['user']),
      args['token'],
      args['type'],
      Number(args['expireIn']),
      Number(args['createIn']),
    );
  }
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  name: string;
}
