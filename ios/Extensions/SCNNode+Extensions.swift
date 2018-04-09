//
//  SCNode+Extensions.swift
//  CVProject
//
//  Created by modao on 2018/4/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import SceneKit

extension SCNNode {
  func setUniformScale(_ scale: Float) {
    self.scale = SCNVector3Make(scale, scale, scale)
  }

  func renderOnTop() {
    self.renderingOrder = 2
    if let geom = self.geometry {
      for material in geom.materials {
        material.readsFromDepthBuffer = false
      }
    }
    for child in self.childNodes {
      child.renderOnTop()
    }
  }

  func setPivot() {
    let minVec = self.boundingBox.min
    let maxVec = self.boundingBox.max
    let bound = SCNVector3Make( maxVec.x - minVec.x, maxVec.y - minVec.y, maxVec.z - minVec.z);
    self.pivot = SCNMatrix4MakeTranslation(bound.x / 2, bound.y / 2, bound.z / 2);
  }

  static func rayIntersectionWithHorizontalPlane(rayOrigin: SCNVector3, direction: SCNVector3, planeY: Float) -> SCNVector3? {
    let direction = direction.normalized()
    // Special case handling: Check if the ray is horizontal as well.
    guard direction.y != 0 else {
      if rayOrigin.y == planeY {
        // The ray is horizontal and on the plane, thus all points on the ray intersect with the plane.
        // Therefore we simply return the ray origin.
        return rayOrigin
      } else {
        // The ray is parallel to the plane and never intersects.
        return nil
      }
    }
    // The distance from the ray's origin to the intersection point on the plane is:
    //   (pointOnPlane - rayOrigin) dot planeNormal
    //  --------------------------------------------
    //          direction dot planeNormal
    // Since we know that horizontal planes have normal (0, 1, 0), we can simplify this to:
    let dist = (planeY - rayOrigin.y) / direction.y
    // Do not return intersections behind the ray's origin.
    guard dist >= 0 else { return nil }
    // Return the intersection point.
    return rayOrigin + (direction * dist)
  }

  static func createAxesNode(quiverLength: CGFloat, quiverThickness: CGFloat) -> SCNNode {
    let quiverThickness = (quiverLength / 50.0) * quiverThickness
    let chamferRadius = quiverThickness / 2.0

    let xQuiverBox = SCNBox(width: quiverLength, height: quiverThickness, length: quiverThickness, chamferRadius: chamferRadius)
    xQuiverBox.materials = [SCNMaterial.material(withDiffuse: UIColor.red, respondsToLighting: false)]
    let xQuiverNode = SCNNode(geometry: xQuiverBox)
    xQuiverNode.position = SCNVector3Make(Float(quiverLength / 2.0), 0.0, 0.0)

    let yQuiverBox = SCNBox(width: quiverThickness, height: quiverLength, length: quiverThickness, chamferRadius: chamferRadius)
    yQuiverBox.materials = [SCNMaterial.material(withDiffuse: UIColor.green, respondsToLighting: false)]
    let yQuiverNode = SCNNode(geometry: yQuiverBox)
    yQuiverNode.position = SCNVector3Make(0.0, Float(quiverLength / 2.0), 0.0)

    let zQuiverBox = SCNBox(width: quiverThickness, height: quiverThickness, length: quiverLength, chamferRadius: chamferRadius)
    zQuiverBox.materials = [SCNMaterial.material(withDiffuse: UIColor.blue, respondsToLighting: false)]
    let zQuiverNode = SCNNode(geometry: zQuiverBox)
    zQuiverNode.position = SCNVector3Make(0.0, 0.0, Float(quiverLength / 2.0))

    let quiverNode = SCNNode()
    quiverNode.addChildNode(xQuiverNode)
    quiverNode.addChildNode(yQuiverNode)
    quiverNode.addChildNode(zQuiverNode)
    quiverNode.name = "Axes"
    return quiverNode
  }

  static func createCrossNode(size: CGFloat = 0.01, color: UIColor = UIColor.green, horizontal: Bool = true, opacity: CGFloat = 1.0) -> SCNNode {
    // Create a size x size m plane and put a grid texture onto it.
    let planeDimension = size

    var fileName = ""
    switch color {
    case UIColor.blue:
      fileName = "crosshair_blue"
    case UIColor.yellow:
      fallthrough
    default:
      fileName = "crosshair_yellow"
    }

    let path = Bundle.main.path(forResource: fileName, ofType: "png", inDirectory: "Models.scnassets")!
    let image = UIImage(contentsOfFile: path)

    let planeNode = SCNNode(geometry: SCNPlane.createSquarePlane(size: planeDimension, contents: image))
    if let material = planeNode.geometry?.firstMaterial {
      material.ambient.contents = UIColor.black
      material.lightingModel = .constant
    }

    if horizontal {
      planeNode.eulerAngles = SCNVector3Make(Float.pi / 2.0, 0, Float.pi) // Horizontal.
    } else {
      planeNode.constraints = [SCNBillboardConstraint()] // Facing the screen.
    }

    let cross = SCNNode()
    cross.addChildNode(planeNode)
    cross.opacity = opacity
    return cross
  }
}

