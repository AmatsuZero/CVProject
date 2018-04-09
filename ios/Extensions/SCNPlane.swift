//
//  SCNPlane.swift
//  CVProject
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import SceneKit

extension SCNPlane {
  static func createSquarePlane(size: CGFloat, contents: AnyObject?) -> SCNPlane {
    let plane = SCNPlane(width: size, height: size)
    plane.materials = [SCNMaterial.material(withDiffuse: contents)]
    return plane
  }

  static func createPlane(size: CGSize, contents: AnyObject?) -> SCNPlane {
    let plane = SCNPlane(width: size.width, height: size.height)
    plane.materials = [SCNMaterial.material(withDiffuse: contents)]
    return plane
  }
}
