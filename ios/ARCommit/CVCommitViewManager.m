//
//  CVCommitViewManager.m
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CVCommitViewManager.h"
#import "CVProject-Swift.h"

@implementation CVCommitViewManager

RCT_EXPORT_MODULE(CommitImageView)
- (UIView*) view {
  return [[CVCommitImageView alloc] init];
}

@end

