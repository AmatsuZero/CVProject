//
//  UIViewController+Extensions.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import UIKit

extension UIViewController {
  func alert(message: String) {
    let controller = UIAlertController(title: message,
                                       message: nil,
                                       preferredStyle: .alert)
    let action = UIAlertAction(title: "OK", style: .default, handler: nil)
    controller.addAction(action)
    present(controller, animated: true, completion: nil)
  }
}
