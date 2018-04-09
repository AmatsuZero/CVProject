//
//  PointInCircle.m
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>

@interface PointInCircle : XCTestCase

- (BOOL) circleRadius:(CGFloat)radius center:(CGPoint)center containPoint:(CGPoint)point;

@end

@implementation PointInCircle

- (BOOL) circleRadius:(CGFloat)radius center:(CGPoint)center containPoint:(CGPoint)point {
  // 根据回复，这里可以这样优化
  CGFloat xDistance = point.x - center.x;
  CGFloat yDistance = point.y - center.y;
  CGFloat distance = MAX(fabs(xDistance), fabs(yDistance));
  if (distance > radius) return false;
  // 直接使用乘法在大量数据下，效率会高一些，可以参考这篇：https://www.cnblogs.com/zhanghuaye/p/5089947.html
  //  CGFloat distance = sqrt(xDistance * xDistance + yDistance * yDistance);
  // 根据Stack Overflow上面的解法，似乎还有别的高效的方法：
  distance = hypot(xDistance, yDistance);
  return distance <= radius;
}

- (void)testPerformanceExample {
    [self measureBlock:^{
      CGPoint center = CGPointZero;
      CGFloat radius = 10;
      XCTAssertTrue([self circleRadius:radius center:center containPoint:CGPointMake(5, 5)]);
    }];
}

@end
