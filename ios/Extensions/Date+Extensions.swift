//
//  Date+Extensions.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation

extension Date {

  public func component(_ component: Calendar.Component) -> Int {
    let calendar = Calendar.autoupdatingCurrent
    return calendar.component(component, from: self)
  }

  public var weekday: Int {
    return component(.weekday)
  }

  public var month: Int {
    return component(.month)
  }
}
