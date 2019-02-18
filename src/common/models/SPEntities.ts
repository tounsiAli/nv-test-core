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
