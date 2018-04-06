//
//  GithubCommitHelper.swift
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import UIKit

final class GitHubCommitHelper {
  static let shared = GitHubCommitHelper()
  private init() {}

  lazy var webData: String? = {
    let url = URL(string: "https://github.com/users/AmatsuZero/contributions")!
    return try? String(contentsOf: url, encoding: .utf8)
  }()

  private(set) lazy var dateFormatter: DateFormatter = {
    let dateFormatter = DateFormatter()
    dateFormatter.timeZone = TimeZone(identifier: "UTC")
    dateFormatter.dateFormat = "yyyy-MM-dd"
    return dateFormatter
  }()

  private lazy var reg: NSRegularExpression = {
    let pattern = "(fill=\")(#[^\"]{6})(\" data-count=\")([^\"]{1,})(\" data-date=\")([^\"]{10})(\"/>)"
    do {
      return try NSRegularExpression(pattern: pattern, options: .dotMatchesLineSeparators)
    } catch {
      fatalError("Regex error")
    }
  }()

  func fetchCommitForAR() -> [GithubCommitData]? {
    guard let webData = webData else { return nil }
    let matched = reg.matches(in: webData, range: NSRange(location: 0, length: webData.count))
    let commitArray: [GithubCommitData] = matched.map { item in
      let substringForRange: (Int) -> String = { index in
        return webData.substring(with: Range(item.rangeAt(index), in: webData)!)
      }
      let color = UIColor(hexString: substringForRange(2))
      let count = Int(substringForRange(4))!
      let date = dateFormatter.date(from: substringForRange(6))!
      let itemData = GithubCommitData(date: date, color: color, count: count,
                                      weekDay: date.weekday, month: date.month)

      return itemData
    }
    return commitArray
  }

  func fetchCommit() -> [[GithubCommitData]]? {
    guard let tempArray = fetchCommitForAR(), tempArray.count > 0 else {
      return nil
    }
    var commits = [[GithubCommitData]]()
    let tempArrayLength = tempArray.count - 1
    let today = tempArray.last
    let weekDay = today!.date.weekday
    commits.append((0...weekDay).map {tempArray[tempArrayLength - weekDay + $0]})
    for weekFromNow in 0..<50 {
      commits.append((1...7).map {tempArray[tempArrayLength-weekDay-weekFromNow*7-7+$0]})
    }
    return commits
  }
}
