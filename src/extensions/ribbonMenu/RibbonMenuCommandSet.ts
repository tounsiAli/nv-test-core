import * as React from "react";
import * as ReactDom from "react-dom";
import { CoreReactHelper, ReactContainersTypes } from "../../CoreReactHelper";
import { commandSetMenu } from "./components/commandSetMenu";
import { override } from "@microsoft/decorators";
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from "@microsoft/sp-listview-extensibility";

export interface IRibbonMenuCommandSetProperties {}

export default class RibbonMenuCommandSet extends BaseListViewCommandSet<IRibbonMenuCommandSetProperties> {
  @override
  public onInit(): Promise<void> {    
    let fff = this.context;
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(
    event: IListViewCommandSetListViewUpdatedParameters): void {
    const compareOneCommand: Command = this.tryGetCommand("ribbonMenu");
    if (compareOneCommand) {
      compareOneCommand.visible = false;
    }
    
    const element: React.ReactElement<{}> = React.createElement(commandSetMenu);
    ReactDom.render(
      element,
      CoreReactHelper.injectDynamicContainerElement(
        ReactContainersTypes.Ribbon,
        0,
        document.querySelector(".CommandBar-mainArea") as HTMLElement
        // document.querySelector(".od-Files-commandBar") as HTMLElement
      )
    );
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
}
