//
//  ARCamera+Extensions.swift
//  CVProject
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import ARKit

extension ARCamera.TrackingState {
  var presentationString: String {
    switch self {
    case .notAvailable:
      return "TRACKING UNAVAILABLE"
    case .normal:
      return "TRACKING NORMAL"
    case .limited(let reason):
      switch reason {
      case .excessiveMotion:
        return "TRACKING LIMITED\nToo much camera movement"
      case .insufficientFeatures:
        return "TRACKING LIMITED\nNot enough surface detail"
        //case .none:
      //  return "TRACKING NOT LIMITED"
      case .initializing:
        return "TRACKING LIMITED\nInitialization in progress"
      case .relocalizing:
        return "TRACKING LIMITED\nRelocalizing in progress"
      }
    }
  }
}
