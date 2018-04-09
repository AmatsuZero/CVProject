//
//  Collections.swift
//  CVProject
//
//  Created by modao on 2018/4/8.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import SceneKit

// MARK: - Collection extensions
extension Array where Iterator.Element == CGFloat {
  var average: CGFloat? {
    guard !isEmpty else {
      return nil
    }
    var ret = self.reduce(CGFloat(0)) { (cur, next) -> CGFloat in
      var cur = cur
      cur += next
      return cur
    }
    let fcount = CGFloat(count)
    ret /= fcount
    return ret
  }
}

extension Array where Iterator.Element == SCNVector3 {
  var average: SCNVector3? {
    guard !isEmpty else {
      return nil
    }
    var ret = self.reduce(SCNVector3Zero) { (cur, next) -> SCNVector3 in
      var cur = cur
      cur.x += next.x
      cur.y += next.y
      cur.z += next.z
      return cur
    }
    let fcount = Float(count)
    ret.x /= fcount
    ret.y /= fcount
    ret.z /= fcount
    return ret
  }
}

extension RangeReplaceableCollection {
  mutating func keepLast(_ elementsToKeep: Int) {
    if count > elementsToKeep {
      self.removeFirst(count - elementsToKeep)
    }
  }
}

