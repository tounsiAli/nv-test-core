import { ISPService } from "./ISPService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { ExtensionContext } from "@microsoft/sp-extension-base";
import { Ribbon } from "../common/models/SPEntities";
import { CoreEventEmitter } from "./CoreEventEmitter";
import { NewRibbonId } from "../common/coreConstants";
import { EventData } from "../common/models/EventData";

export default class SPService implements ISPService {
  private readonly _eventEmitter: CoreEventEmitter = CoreEventEmitter.getInstance();
  constructor(
    private _context:
      | WebPartContext
      | ApplicationCustomizerContext
      | ExtensionContext
  ) {}

  /**
   * Add Ribbon (commandSet) in Sharxx Menu
   * @param ribbon
   */
  public AddRibbon(ribbon: Ribbon): void {
    // Events
    // Add to CommandSet
    this._eventEmitter.emit(NewRibbonId, ribbon as EventData);
  }
}
