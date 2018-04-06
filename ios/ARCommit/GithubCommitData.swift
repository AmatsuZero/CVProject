//
//  GithubCommitData.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import UIKit

struct GithubCommitData {
  let date: Date
  let color: UIColor
  let count: Int
  var weekDay = 0
  var month = 0
}

extension GithubCommitData: CustomStringConvertible {
  var description: String {
    return "On \(dateString), with \(count) commits in color \(color)"
  }
  var dateString: String {
    let formatter = GitHubCommitHelper.shared.dateFormatter
    return formatter.string(from: date)
  }
}
