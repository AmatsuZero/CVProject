//
//  Tricks.swift
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import XCTest

class Tricks: XCTestCase {

  private var userDefaults: UserDefaults!

  override func setUp() {
    super.setUp()
    // https://twitter.com/johnsundell/status/855713943809032192
    userDefaults = UserDefaults(suiteName: #file)
    userDefaults.removePersistentDomain(forName: #file)
  }

  func sum(_ nums: Int...) -> Int {
    return nums.reduce(0, {$0 + $1})
  }

  // https://twitter.com/johnsundell/status/854365916716572672
  func testVariadicParameters() {
    XCTAssertEqual(sum(1,2,3,4,5,6,7,8,9,10), 55)
  }
}

infix operator ∈
func ∈ <T: Equatable>(lhs: T, rhs: [T]) -> Bool {
  return rhs.contains(lhs)
}
