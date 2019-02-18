import { Subject } from "rx-lite";

export class CoreEventEmitter {
  public subjects: Object;
  public readonly hasOwnProp: any = {}.hasOwnProperty;

  private constructor() {
    this.subjects = {};
  }

  /**
   * Singleton for the page so we capture all the Observers and Observables in one global array;
   */
  public static getInstance(): CoreEventEmitter {
    if (!window["EventEmitter"]) {
      window["EventEmitter"] = new CoreEventEmitter();
    }
    return window["EventEmitter"];
  }

  /**
   * Emitts (broadcasts) event to Observers (Subscribers).
   * @param name name of the event
   * @param data event data
   */
  public emit(name: string, data: Object): void {
    let fnName: string = this._createName(name);

    if (!this.subjects[fnName]) {
      this.subjects[fnName] = new Subject();
    }

    this.subjects[fnName].onNext(data);
  }

  /**
   * Subscribes for event stream.
   * If the event is broadcasted then handler (method)
   * would be triggered and would receive data from the broadcasted event as method param.
   * @param name name of the event
   * @param handler event handler (method)
   */
  public on(name: string, handler: any): void {
    let fnName: string = this._createName(name);

    if (!this.subjects[fnName]) {
      this.subjects[fnName] = new Subject();
    }

    this.subjects[fnName].subscribe(handler);
  }

  /**
   * Unsubscribes Observer (Subscriber) from event.
   * @param name name of the event
   */
  public off(name: string): void {
    let fnName: string = this._createName(name);

    if (this.subjects[fnName]) {
      this.subjects[fnName].dispose();
      delete this.subjects[fnName];
    }
  }

  public dispose(): void {
    let subjects: Object = this.subjects;

    for (let prop in subjects) {
      if (this.hasOwnProp.call(subjects, prop)) {
        subjects[prop].dispose();
      }
    }

    this.subjects = {};
  }

  private _createName(name: string): string {
    return `$${name}`;
  }
}
