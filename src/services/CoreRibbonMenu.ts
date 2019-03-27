import { find } from "office-ui-fabric-react";
import { Ribbon } from "../common/models/SPEntities";

export class CoreRibbonMenu {
  public readonly hasOwnProp: any = {}.hasOwnProperty;
  private ribbonCollection: Ribbon[];

  private constructor() {
    this.ribbonCollection = [];
  }

  /**
   * Singleton for the page so we capture all the Observers and Observables in one global array;
   */
  public static getInstance(): CoreRibbonMenu {
    if (!window["CoreRibbonMenu"]) {
      window["CoreRibbonMenu"] = new CoreRibbonMenu();
    }
    return window["CoreRibbonMenu"];
  }

  public insert(data: Ribbon): void {
    let _item: Ribbon = find(this.ribbonCollection, i => i.Id === data.Id);
    if (_item === undefined) {
      this.ribbonCollection.push(data);
    }
  }
  public delete(data: Ribbon): void {
    let _item: Ribbon = find(this.ribbonCollection, i => i.Id === data.Id);
    if (_item !== undefined) {
      this.ribbonCollection.splice(this.ribbonCollection.indexOf(_item), 1);
    }
  }
  public dispose(): void {
    this.ribbonCollection = [];
  }
  public get(): Ribbon[] {
    return this.ribbonCollection;
  }
  public getById(id: string): Ribbon {
    return find(this.ribbonCollection, i => i.Id === id);
  }
}
