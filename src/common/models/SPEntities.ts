import { EventData } from "./EventData";
export class Ribbon implements EventData {
  public Label: string;
  public Url: string;
  public Id: string;
  public IsAdding: boolean;

  public constructor() {
    this.IsAdding = true;
  }
}

export class ItemMenuSetting implements EventData {
  Id: string; //MenuComponent
  MenuGroupType?: MenuGroup;
  Label: string; //MenuTitle
  Url: string; //MenuUrl
  public IsAdding: boolean;
}
export enum MenuGroup {
  SettingsMenu = 1,
  AdminMenu = 2
}
