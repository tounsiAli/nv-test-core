import { override } from "@microsoft/decorators";
import { BaseApplicationCustomizer } from "@microsoft/sp-application-base";
import { CoreEventEmitter } from "../../services/CoreEventEmitter";
import { NewItemMenuSetting } from "../../common/coreConstants";
import { ItemMenuSetting, MenuGroup } from "../../common/models/SPEntities";

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
  @override
  public onInit(): Promise<void> {
    this._eventEmitter.on(NewItemMenuSetting, this.checkElement.bind(this));
    this.context.placeholderProvider.changedEvent.add(this, this.checkElement);
    return Promise.resolve();
  }
  private checkElement(item: ItemMenuSetting): void {
    this.waitForElement(
      "#O365_SubLink_Change_The_Look",
      this.insertInMenu(item)
    );
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
        .getElementById("O365_SubLink_ShellAboutMe")
        .parentElement.appendChild(ncAnchor);
    } else {
      //MenuGroup.SettingsMenu
      document
        .getElementById("O365_SubLink_Change_The_Look")
        .parentElement.appendChild(ncAnchor);
    }
    jQuery("[id*='" + ncAnchor.id + "']").hover(function() {
      jQuery(this).toggleClass("O365cs-contextMenuItemHover ms-bgc-nl");
    });
  }

  private waitForElement(selector: any, callback: any): void {
    if (jQuery(selector).length) {
      callback();
    } else {
      setTimeout(function() {
        this.waitForElement(selector, callback);
      }, 100);
    }
  }
}
