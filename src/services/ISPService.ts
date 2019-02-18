import { Ribbon } from "../common/models/SPEntities";

export interface ISPService {
  AddRibbon(ribbon: Ribbon): void;
}
