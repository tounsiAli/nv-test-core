import { find } from "office-ui-fabric-react";
import { ItemMenuSetting } from "../common/models/SPEntities";

export class CoreActionsLinks {
  public items: ItemMenuSetting[];
  public readonly hasOwnProp: any = {}.hasOwnProperty;

  private constructor() {
    this.items = [];
  }

  /**
   * Singleton for the page so we capture all the Observers and Observables in one global array;
   */
  public static getInstance(): CoreActionsLinks {
    if (!window["CoreActionsLinks"]) {
      window["CoreActionsLinks"] = new CoreActionsLinks();
    }
    return window["CoreActionsLinks"];
  }

  public insert(data: ItemMenuSetting): void {
    let _item: ItemMenuSetting = find(
      this.items,
      i => i.Id === data.Id && i.MenuGroupType === data.MenuGroupType
    );
    if (_item === undefined) {
      this.items.push(data);
    }
  }
  public delete(data: ItemMenuSetting): void {
    let _item: ItemMenuSetting = find(
      this.items,
      i => i.Id === data.Id && i.MenuGroupType === data.MenuGroupType
    );
    if (_item === undefined) {
      this.items = this.items.splice(this.items.indexOf(_item), 1);
    }
  }
  public dispose(): void {
    this.items = [];
  }
}
