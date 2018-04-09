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

extension SCNMaterial {
  static func material(withDiffuse diffuse: Any?, respondsToLighting: Bool = true) -> SCNMaterial {
    let material = SCNMaterial()
    material.diffuse.contents = diffuse
    material.isDoubleSided = true
    if respondsToLighting {
      material.locksAmbientWithDiffuse = true
    } else {
      material.ambient.contents = UIColor.black
      material.lightingModel = .constant
      material.emission.contents = diffuse
    }
    return material
  }
}
