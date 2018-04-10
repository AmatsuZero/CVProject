//
//  CommitARPresenter.m
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <React/RCTUIManager.h>
#import <React/UIView+React.h>
#import "CommitARPresenter.h"
#import "CVProject-Swift.h"

@implementation CommitARPresenter

RCT_EXPORT_MODULE(ARPresenter)
RCT_EXPORT_METHOD(presentAR: (nonnull NSNumber *)reactTag) {
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    UIView *view = viewRegistry[reactTag];
    UIViewController *viewController = (UIViewController *)view.reactViewController;
    CommitViewController* ar = [[CommitViewController alloc] init];
    [[NSOperationQueue mainQueue] addOperationWithBlock:^{
      [viewController presentViewController:ar animated:YES completion:nil];
    }];
  }];
}

-(UIView *)view {
  return [UIView new];
}

@end
