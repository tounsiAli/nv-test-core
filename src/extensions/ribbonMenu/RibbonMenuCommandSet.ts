import * as React from "react";
import * as ReactDom from "react-dom";
import { CoreReactHelper, ReactContainersTypes } from "../../CoreReactHelper";
import {
  commandSetMenu,
  ICommandSetMenuProperties
} from "./components/commandSetMenu";
import { override } from "@microsoft/decorators";
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters,
  RowAccessor
} from "@microsoft/sp-listview-extensibility";
import { CoreEventEmitter } from "../../services/CoreEventEmitter";
import { IContextualMenuItem, find, Fabric, IconType, ImageFit } from "office-ui-fabric-react";
import { NewRibbonId } from "../../common/coreConstants";
import { EventData } from "../../common/models/EventData";
import { Ribbon } from "../../common/models/SPEntities";
import { RibbonMenuLists } from "./ribbonMenuLists";
import { CoreRibbonMenu } from "../../services/CoreRibbonMenu";
require("./components/commandSetMenu.scss");

export interface IRibbonMenuCommandSetProperties { }

export default class RibbonMenuCommandSet extends BaseListViewCommandSet<
  IRibbonMenuCommandSetProperties
  > {
  private readonly _eventEmitter: CoreEventEmitter = CoreEventEmitter.getInstance();
  private ribbonMenuLists: RibbonMenuLists = new RibbonMenuLists();
  private coreRibbonMenu: CoreRibbonMenu = CoreRibbonMenu.getInstance();
  private items: Array<IContextualMenuItem> = new Array();
  private selectedRows: ReadonlyArray<RowAccessor> = new Array();
  @override
  public onInit(): Promise<void> {
    this._eventEmitter.on(NewRibbonId, this._receiveRibbon.bind(this));
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {    
    this.selectedRows = new Array();
    this.selectedRows = event.selectedRows;
    const compareOneCommand: Command = this.tryGetCommand("ribbonMenu");
    if (compareOneCommand) {
      compareOneCommand.visible = false;
    }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case "ribbonMenu":
        // this.sendButtonItems();
        break;
      case "COMMAND_2":
        break;
      default:
        throw new Error("Unknown command");
    }
  }

  private createSharxxMenu() {
    CoreReactHelper.removeButton(ReactContainersTypes.Ribbon, 0, document.querySelector(".CommandBar-mainArea") as HTMLElement);
    let list: any = this.context.pageContext.list;
    if (this.ribbonMenuLists.lists.filter(m => m.RegistrationId == list._baseTemplate).length > 0) {
      let menuProperties: ICommandSetMenuProperties = {
        items: this.items,
        ribbonsActive: this.items.length > 0 ? false : true
      };
      let sharxxElement = React.createElement(commandSetMenu, menuProperties);
      ReactDom.render(
        sharxxElement,
        CoreReactHelper.injectDynamicContainerElement(ReactContainersTypes.Ribbon, 0, document.querySelector(".CommandBar-mainArea") as HTMLElement)
      );
    }
  }

  private _receiveRibbon(data: Ribbon): void {
    let _ribbon: Ribbon = this.coreRibbonMenu.getById(data.Id);
    if (_ribbon !== undefined) {
      // exist
      if (data.IsAdding) {
        // change Info : language changed
        _ribbon.Label = data.Label;
      } else {
        // delete ribbon
        this.coreRibbonMenu.delete(_ribbon);
      }
    } else {
      if (data.IsAdding) {
        // add new label
        _ribbon = new Ribbon();
        _ribbon.Id = data.Id;
        _ribbon.Label = data.Label;
        _ribbon.Url = data.Url;
        this.coreRibbonMenu.insert(_ribbon);
      }
    }
    this.items = this._castRibbonToContextMenu();
    this.createSharxxMenu();
  }
  private _castRibbonToContextMenu(): Array<IContextualMenuItem> {
    let _items: Array<IContextualMenuItem> = new Array();
    this.coreRibbonMenu.get().forEach(rib => {
      let item: IContextualMenuItem = {
        key: rib.Id,
        name: rib.Label,
        iconProps: {
          iconType: IconType.Image,
          imageProps: {
            src: rib.Url,
            imageFit: ImageFit.contain,
            width: 20,
            height: 20,
          }
        },
        onClick: () => this._ribbonClick(rib)
      }
      _items.push(item);
    });
    return _items;
  }

  private _ribbonClick(data: EventData): void {
    this._eventEmitter.emit(data.Id, data);
  }
}
