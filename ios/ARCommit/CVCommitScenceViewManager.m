//
//  CVCommitScenceViewManager.m
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CVCommitScenceViewManager.h"
#import "CVProject-Swift.h"

@implementation CVCommitScenceViewManager

RCT_EXPORT_MODULE(CommitSceneView)
- (UIView*) view {
  return [[CVCommitScenceView alloc] init];
}

@end
