//
//  PointInCircle.h
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>

@interface PointInCircle : XCTestCase

// 圆心坐标为（0，0）
-(BOOL)circleRadius:(CGFloat)radius center:(CGPoint)center containPoint:(CGPoint)point;

@end
