//
//  Foundation.m
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "NSObject+MockKVO.h"

@interface MockClass: NSObject

@property(nonatomic, copy)NSString* text;

@end

@implementation MockClass

@end

@interface Foundation : XCTestCase

@end

@implementation Foundation
{
  MockClass* mock;
  NSString* observingValue;
  XCTestExpectation* expection;
}

-(void)setUp {
  mock = [MockClass new];
  expection = [[XCTestExpectation alloc] initWithDescription:@"KVO Mock"];
  [mock mock_addObserver:self forKey:@"text" withBlock:^(id observedValue, NSString *observedKey, id oldValue, id newValue) {
    observingValue = newValue;
    [expection fulfill];
  }];
}

-(void)tearDown {
  [mock mock_removeObserver:self forKey:@"text"];
}

- (void)testMockKVO {
  mock.text = @"Daubert";
  [self waitForExpectations:@[expection] timeout:300];
  XCTAssertTrue([observingValue isEqualToString:mock.text]);
}

@end
