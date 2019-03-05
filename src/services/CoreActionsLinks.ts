import { find } from "office-ui-fabric-react";
import { ItemMenuSetting } from "../common/models/SPEntities";

export class CoreActionsLinks {
  public readonly hasOwnProp: any = {}.hasOwnProperty;
  private items: ItemMenuSetting[];

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
  public disposeType(data: ItemMenuSetting): void {
    this.items = this.items.filter(i => i.ProjectType !== data.ProjectType);
  }
  public dispose(): void {
    this.items = [];
  }
  public get(): ItemMenuSetting[] {
    return this.items;
  }
  public insertFileHeader(fileUrl:string):void {
    const isFileExist:boolean=this.checkFileExist(fileUrl);
    if(!isFileExist){
        const head: any = document.getElementsByTagName("head")[0] || document.documentElement;
        const articleRedirectScriptTag: HTMLScriptElement = document.createElement("script");
        articleRedirectScriptTag.src = fileUrl;
        articleRedirectScriptTag.type = "text/javascript";
        head.insertAdjacentElement("beforeEnd", articleRedirectScriptTag);
    }    
  }
  private checkFileExist(fileUrl:string):boolean {
    const http:XMLHttpRequest =new XMLHttpRequest();
    http.open("HEAD",fileUrl,false);
    http.send();
    return http.status!==404;
}

}
