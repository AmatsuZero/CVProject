//
//  UIColor+Extensions.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import UIKit

extension UIColor {
  convenience init(hexString string: String) {
    var rgbValue: UInt32 = 0
    let scanner = Scanner(string: string)
    scanner.scanLocation = 1
    scanner.scanHexInt32(&rgbValue)
    let red = CGFloat((rgbValue & 0xFF0000) >> 16) / 255.0
    let green = CGFloat((rgbValue & 0xFF00) >> 8) / 255.0
    let blue = CGFloat(rgbValue & 0xFF) / 255.0
    self.init(red: red, green: green, blue: blue, alpha: 1.0)
  }
  static var customYellow: UIColor {
    return UIColor(red: 250/255, green: 207/255, blue: 93/255, alpha: 1)
  }
}
