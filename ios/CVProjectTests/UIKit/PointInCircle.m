//
//  PointInCircle.m
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "PointInCircle.h"

@implementation PointInCircle

-(BOOL)circleRadius:(CGFloat)radius center:(CGPoint)center containPoint:(CGPoint)point {
  CGFloat xDistance = point.x - center.x;
  CGFloat yDistance = point.y - center.y;
  CGFloat distance = sqrt(xDistance * xDistance + yDistance * yDistance);
  return distance <= radius;
}

-(void)testPointInCircle {
  CGPoint center = CGPointZero;
  CGFloat radius = 10;
  XCTAssertTrue([self circleRadius:radius center:center containPoint:CGPointMake(5, 5)]);
}

@end
