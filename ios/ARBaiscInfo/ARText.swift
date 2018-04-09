//
//  ARText.swift
//  CVProject
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import ARKit
import SceneKit

final class ARText: SCNText {

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  init(text:String,
       font:UIFont,
       color:UIColor,
       depth:CGFloat){
    super.init()
    self.string = text
    self.extrusionDepth = depth
    self.font = font
    self.alignmentMode = kCAAlignmentCenter
    self.truncationMode = kCATruncationMiddle
    self.firstMaterial?.isDoubleSided = true
    self.firstMaterial!.diffuse.contents = color
    self.flatness = 0.3
  }
}

final class TextNode: SCNNode {

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
  }

  init(distance:Float, scntext:SCNText, sceneView:ARSCNView, scale:CGFloat) {
    super.init()

    guard let pointOfView = sceneView.pointOfView else { return }

    let mat = pointOfView.transform
    let dir = SCNVector3(-1 * mat.m31, -1 * mat.m32, -1 * mat.m33)
    let currentPosition = pointOfView.position + (dir * distance)

    self.geometry = scntext
    self.position = currentPosition
    self.simdRotation = pointOfView.simdRotation
    self.setPivot()
    self.scale = SCNVector3(scale, scale, scale)

  }
}
