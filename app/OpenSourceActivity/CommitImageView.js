import { requireNativeComponent, NativeModules } from "react-native";

const CommitImageView = requireNativeComponent("CommitImageView", null);
const CommitSceneView = requireNativeComponent("CommitSceneView", null);
const ARPresenter = NativeModules.ARPresenter;

export { CommitImageView, CommitSceneView, ARPresenter };
