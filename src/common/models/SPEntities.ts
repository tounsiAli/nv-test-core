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
  public Id: string; //MenuComponent
  public MenuGroupType?: MenuGroup;
  public Label: string; //MenuTitle
  public Url: string; //MenuUrl
  public ProjectType: IProjectType;

}

export interface IProjectType {
  Id: string;
  Label: string;
}
export enum MenuGroup {
  SettingsMenu = 1,
  AdminMenu = 2
}
