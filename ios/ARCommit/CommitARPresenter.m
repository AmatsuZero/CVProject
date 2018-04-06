//
//  CommitARPresenter.m
//  CVProject
//
//  Created by modao on 2018/4/6.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CommitARPresenter.h"
#import "CVProject-Swift.h"

@implementation CommitARPresenter

RCT_EXPORT_MODULE(ARPresenter)
RCT_EXPORT_METHOD(presnetAR) {
  [CommitViewController presentAR];
}

@end
