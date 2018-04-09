//
//  CGValue+Extensions.swift
//  CVProject
//
//  Created by modao on 2018/4/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import SceneKit

extension CGPoint {

  init(_ size: CGSize) {
    self.init(x: size.width, y: size.height)
  }

  init(_ vector: SCNVector3) {
    self.init(x: CGFloat(vector.x), y: CGFloat(vector.y))
  }

  func distanceTo(_ point: CGPoint) -> CGFloat {
    return (self - point).length()
  }

  func length() -> CGFloat {
    return sqrt(self.x * self.x + self.y * self.y)
  }

  func midpoint(_ point: CGPoint) -> CGPoint {
    return (self + point) / 2
  }

  func friendlyString() -> String {
    return "(\(String(format: "%.2f", x)), \(String(format: "%.2f", y)))"
  }
}

func + (left: CGPoint, right: CGPoint) -> CGPoint {
  return CGPoint(x: left.x + right.x, y: left.y + right.y)
}

func - (left: CGPoint, right: CGPoint) -> CGPoint {
  return CGPoint(x: left.x - right.x, y: left.y - right.y)
}

func += (left: inout CGPoint, right: CGPoint) {
  left = left + right
}

func -= (left: inout CGPoint, right: CGPoint) {
  left = left - right
}

func / (left: CGPoint, right: CGFloat) -> CGPoint {
  return CGPoint(x: left.x / right, y: left.y / right)
}

func * (left: CGPoint, right: CGFloat) -> CGPoint {
  return CGPoint(x: left.x * right, y: left.y * right)
}

func /= (left: inout CGPoint, right: CGFloat) {
  left = left / right
}

func *= (left: inout CGPoint, right: CGFloat) {
  left = left * right
}

extension CGSize {

  init(_ point: CGPoint) {
    self.init(width: point.x, height: point.y)
  }

  func friendlyString() -> String {
    return "(\(String(format: "%.2f", width)), \(String(format: "%.2f", height)))"
  }
}

func + (left: CGSize, right: CGSize) -> CGSize {
  return CGSize(width: left.width + right.width, height: left.height + right.height)
}

func - (left: CGSize, right: CGSize) -> CGSize {
  return CGSize(width: left.width - right.width, height: left.height - right.height)
}

func += (left: inout CGSize, right: CGSize) {
  left = left + right
}

func -= (left: inout CGSize, right: CGSize) {
  left = left - right
}

func / (left: CGSize, right: CGFloat) -> CGSize {
  return CGSize(width: left.width / right, height: left.height / right)
}

func * (left: CGSize, right: CGFloat) -> CGSize {
  return CGSize(width: left.width * right, height: left.height * right)
}

func /= (left: inout CGSize, right: CGFloat) {
  left = left / right
}

func *= (left: inout CGSize, right: CGFloat) {
  left = left * right
}

extension CGRect {
  var mid: CGPoint {
    return CGPoint(x: midX, y: midY)
  }
}

extension Float {
  enum LengthUnit: Int {
    case Meter = 0//米
    case CentiMeter //厘米
    case Foot //英尺
    case Inch //英寸
    case Ruler //尺

    var rate:(Float,String) {
      switch self {
      case .Meter:
        return (1.0, "m")
      case .CentiMeter:
        return (100.0, "cm")
      case .Foot:
        return (3.2808399, "ft")
      case .Inch:
        return (39.3700787, "in")
      case .Ruler:
        return (3.0, "尺")
      }
    }
  }
}
