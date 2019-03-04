import { override } from "@microsoft/decorators";
import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";
import { CoreEventEmitter } from "../../services/CoreEventEmitter";
import { ItemMenuSetting, MenuGroup } from "../../common/models/SPEntities";
import actionMenuItem, { IActionMenuItemProps } from "./actionMenuItems";
import { CoreReactHelper, ReactContainersTypes } from "../../CoreReactHelper";
import { NewItemMenuSetting, NewRibbonId } from "../../common/coreConstants";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as jQ from "jquery";
import { find } from "office-ui-fabric-react";

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IActionMenuApplicationCustomizerProperties {}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class ActionMenuApplicationCustomizer extends BaseApplicationCustomizer<
  IActionMenuApplicationCustomizerProperties
> {
  private readonly _eventEmitter: CoreEventEmitter = CoreEventEmitter.getInstance();
  private items = [];
  @override
  public onInit(): Promise<void> {
    //this.context.placeholderProvider.changedEvent.add(this,this._renderPlaceHolders);
    //this._checkEvent();
    //return Promise.resolve();
    this._eventEmitter.on(NewItemMenuSetting, this.checkElement.bind(this));

    //  // this.context.placeholderProvider.changedEvent.add(this, this.startEvent);
    return Promise.resolve();
  }

  private test(): void {
    alert("test");
  }
  private inc: number = 0;
  private _checkEvent(): void {
    const sleep: any = milliseconds => {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    };
    let self: any = this;
    sleep(500).then(() => {
      let isFind: boolean = self.isFind(NewItemMenuSetting);
      if (!isFind) {
        self.inc += 500;
        if (self.inc < 11000) {
          self._checkEvent();
        }
      } else {
        self._eventEmitter.on(NewItemMenuSetting, self.checkElement.bind(self));
      }
    });
  }

  //  /**
  //  * check if the event exist
  //  * @param name of the event
  //  */
  private isFind(name: string): boolean {
    let fnName: string = `$${name}`;
    if (this._eventEmitter.subjects[fnName]) {
      return true;
    } else {
      return false;
    }
  }

  // private _renderPlaceHolders():void {

  //       const element:React.ReactElement<IActionMenuItemProps>=React.createElement(
  //         actionMenuItem, {}
  //       );
  //       ReactDOM.render(
  //         element,
  //         CoreReactHelper.injectDynamicContainerElement(
  //           ReactContainersTypes.Dialog,
  //           0,
  //           document.querySelector(".od-Files-topBar") as HTMLElement)
  //       );
  // }

  private checkElement(item: ItemMenuSetting): void {
    // this.waitForElement(
    //   "#O365_SubLink_Change_The_Look",
    //   this.insertInMenu(item)
    // );

    let self: any = this;
    // let intervalId:any=setInterval(function(){
    //   if (jQ("#O365_SubLink_Change_The_Look").length || jQ("#O365_SubLink_ShellSignout").length) {
    //     let _menu:string=find(current.items,(it)=> {return (it===item.Id);});
    //     clearInterval(intervalId);
    //     if(_menu===undefined) {
    //       current.items.push(item.Id);
    //       current.insertInMenu(item);
    //     }
    //   }
    // },100);
    if (
      jQ("#O365_SubLink_Change_The_Look").length ||
      jQ("#O365_SubLink_ShellSignout").length
    ) {
      let _menu: string = find(self.items, it => {
        return it === item.Id;
      });
      if (_menu === undefined) {
        self.items.push(item.Id);
        self.insertInMenu(item);
      }
      // self.insertInMenu(item);
    } else {
      setTimeout(function() {
        self.checkElement(item);
      }, 100);
    }
  }

  private insertInMenu(item: ItemMenuSetting): void {
    var ncAnchor = document.createElement("a") as HTMLElement;
    let randomid: any = Math.random();
    var ncAdminId = "O365_SubLink_" + "nc" + randomid;
    ncAnchor.setAttribute(
      "class",
      "o365button o365cs-contextMenuItem ms-fcl-b ms-fcl-b-h ms-fcl-b-f"
    );
    ncAnchor.setAttribute("role", "link");
    ncAnchor.setAttribute("id", ncAdminId);
    ncAnchor.setAttribute("href", item.Url);
    ncAnchor.setAttribute("style", "text-decoration: none;");
    ncAnchor.textContent = item.Label;
    if (item.MenuGroupType === MenuGroup.AdminMenu) {
      document
        .getElementById("O365_SubLink_ShellSignout")
        .parentElement.appendChild(ncAnchor);
    } else {
      document
        .getElementById("O365_SubLink_Change_The_Look")
        .parentElement.appendChild(ncAnchor);
    }
    jQ("[id*='" + ncAnchor.id + "']").hover(function() {
      jQ(this).toggleClass("O365cs-contextMenuItemHover ms-bgc-nl");
    });
  }

  private waitForElement(selector: any, callback: any): void {
    if (jQ(selector).length) {
      callback();
    } else {
      setTimeout(function() {
        this.waitForElement(selector, callback);
      }, 100);
    }
  }
}
