import {Team} from "./entity/team";

export interface MemberInfo {
  id: number;
  team: Team;
  name: string;
  email: string;
}