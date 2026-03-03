import { Service } from './Services';

export class UserService extends Service {
  static async getMeDetails(): Promise<UserService.GetMeDetailsResponse> {
    const { data } = await UserService.client.get<UserService.GetMeDetailsResponse>('/users/me');

    return data;
  }
}

export namespace UserService {
  export type GetMeDetailsResponse = {
    username: string;
  };
}
