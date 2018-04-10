import React, { PureComponent } from "react";
import {
  requireNativeComponent,
  UIManager,
  findNodeHandle,
  View
} from "react-native";

const CommitImageView = requireNativeComponent("CommitImageView", null);
const CommitSceneView = requireNativeComponent("CommitSceneView", null);
const ARPresenter = requireNativeComponent("ARPresenter", null);

class Presenter extends PureComponent {
  presentAR() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.ARPresenter.Commands.presentAR,
      null
    );
  }
  render() {
    return <ARPresenter />;
  }
}

export { CommitImageView, CommitSceneView, Presenter };
