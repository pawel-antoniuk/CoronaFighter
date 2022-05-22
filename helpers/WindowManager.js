import { Dimensions } from "react-native";

windowWidth = Math.round(Dimensions.get('window').width);
windowHeight = Math.round(Dimensions.get('window').height);

export class WindowDimensionsProvider {
  isEntityOutside(entity) {
    return entity.position[1] < -entity.dimensions[1]
      || entity.position[1] > windowHeight
      || entity.position[0] < -entity.dimensions[0]
      || entity.position[0] > windowWidth;
  }

  getWidth() {
    return windowWidth;
  }

  getHeight() {
    return windowHeight;
  }
}

export let windowDimensionsProvider = new WindowDimensionsProvider();
