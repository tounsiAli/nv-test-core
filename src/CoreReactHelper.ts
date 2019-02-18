import * as ReactDom from "react-dom";

export enum ReactContainersTypes {
  Ribbon,
  Dialog,
  others
}

export class CoreReactHelper {
  private static readonly _placeholderElementIdPrefix: string =
    "lb-react-container-";

  public static injectDynamicContainerElement(
    containerType: ReactContainersTypes,
    key: number,
    parentElement: HTMLElement
  ): HTMLElement {
    return CoreReactHelper.ensureDynamicPlaceholderContainer(
      containerType,
      key,
      parentElement
    );
  }

  public static clearDynamicContainerElementContent(
    containerType: ReactContainersTypes,
    key: number
  ): void {
    const id: string =
      CoreReactHelper._placeholderElementIdPrefix +
      key +
      containerType.toString();
    ReactDom.unmountComponentAtNode(document.getElementById(id));
  }
  private static ensureDynamicPlaceholderContainer(
    type: ReactContainersTypes,
    key: number,
    rootContainer: HTMLElement
  ): HTMLElement {
    const id: string =
      CoreReactHelper._placeholderElementIdPrefix + key + type.toString();

    let containerDiv: HTMLElement = rootContainer.querySelector(
      `#${id}`
    ) as HTMLElement;
    if (containerDiv) {
      containerDiv.parentElement.removeChild(containerDiv);
    }
    // if (!containerDiv) {
    containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", id);

    if (type === ReactContainersTypes.Ribbon) {
      //nv-sharxxCommand ms-OverflowSet-item
      containerDiv.setAttribute(
        "class",
        "nv-sharxxCommand CommandBarItem beak-anchor command"
      );
      // let lastChild = rootContainer.children[rootContainer.children.length - 1];
      let lastChild = rootContainer.children[0];
      rootContainer.insertBefore(containerDiv, lastChild);
    } else {
      rootContainer.appendChild(containerDiv);
    }
    // }
    return containerDiv;
  }
}
