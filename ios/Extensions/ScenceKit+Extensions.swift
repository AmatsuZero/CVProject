//
//  ScenceKit.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import SceneKit

extension FloatingPoint {
  var degreesToRadius: Self { return self * .pi / 180 }
  var radiansToDegrees: Self { return self * 180 / .pi }
}

extension matrix_float4x4 {
  var toPosition: SCNVector3 { return SCNVector3Make(self.columns.3.x, self.columns.3.y, self.columns.3.z) }
}
