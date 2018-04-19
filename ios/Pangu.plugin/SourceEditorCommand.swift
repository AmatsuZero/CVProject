//
//  SourceEditorCommand.swift
//  Pangu.plugin
//
//  Created by modao on 2018/4/19.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import Foundation
import XcodeKit

class SourceEditorCommand: NSObject, XCSourceEditorCommand {

  func perform(with invocation: XCSourceEditorCommandInvocation,
               completionHandler: @escaping (Error?) -> Void ) -> Void {
    if let selection = invocation.buffer.selections.firstObject as? XCSourceTextRange {
      let index = selection.start.line
      if let text = invocation.buffer.lines[index] as? String {
        invocation.buffer.lines[index] = text.spaced
      }
    }
    completionHandler(nil)
  }

}
