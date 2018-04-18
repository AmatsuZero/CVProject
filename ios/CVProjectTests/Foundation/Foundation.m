//
//  Foundation.m
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <XCTest/XCTest.h>
#import "NSObject+MockKVO.h"
#import "NSObject+MultiArgs.h"

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
  [super setUp];
  mock = [MockClass new];
  expection = [[XCTestExpectation alloc] initWithDescription:@"KVO Mock"];
  [mock mock_addObserver:self forKey:@"text" withBlock:^(id observedValue, NSString *observedKey, id oldValue, id newValue) {
    observingValue = newValue;
    [expection fulfill];
  }];
}

-(void)tearDown {
  [super tearDown];
  [mock mock_removeObserver:self forKey:@"text"];
}

-(NSNumber*)threeSumWithA:(NSNumber*) A B:(NSNumber*)B C:(NSNumber*)C {
  return @(A.integerValue+B.integerValue+C.integerValue);
}

// JD Interview
- (void) testPerformSelectorWithMultiArgs {
  NSNumber* ret = [self performSelector:@selector(threeSumWithA:B:C:) withObjects:@[@1,@2,@3]];
  XCTAssertEqual(ret.integerValue, 6);
}

- (void) testMockKVO {
  mock.text = @"Daubert";
  [self waitForExpectations:@[expection] timeout:300];
  XCTAssertTrue([observingValue isEqualToString:mock.text]);
}

- (void) testMultiThread {
  // 1 创建并发队列
  dispatch_queue_t BCqueue = dispatch_queue_create("BarrierConcurrent", DISPATCH_QUEUE_CONCURRENT);
  // 2.1 添加任务123
  __block int fullfilled = 0;
  XCTestExpectation* expectation1 = [[XCTestExpectation alloc] initWithDescription:@"Task1"];
  dispatch_async(BCqueue, ^{
    fullfilled++;
    [expectation1 fulfill];
  });
  XCTestExpectation* expectation2 = [[XCTestExpectation alloc] initWithDescription:@"Task2"];
  dispatch_async(BCqueue, ^{
    sleep(3);
    fullfilled++;
    [expectation2 fulfill];
  });
  XCTestExpectation* expectation3 = [[XCTestExpectation alloc] initWithDescription:@"Task3"];
  dispatch_async(BCqueue, ^{
    sleep(1);
    fullfilled++;
    [expectation3 fulfill];
  });
  // 2.2 添加barrier
  dispatch_barrier_async(BCqueue, ^{
    NSLog(@"barrier");
    XCTAssertEqual(fullfilled, 3);
  });
  // 2.3 添加任务456
  XCTestExpectation* expectation4 = [[XCTestExpectation alloc] initWithDescription:@"Task4"];
  dispatch_async(BCqueue, ^{
    sleep(1);
    [expectation4 fulfill];
  });
  XCTestExpectation* expectation5 = [[XCTestExpectation alloc] initWithDescription:@"Task5"];
  dispatch_async(BCqueue, ^{
    [expectation5 fulfill];
  });
  XCTestExpectation* expectation6 = [[XCTestExpectation alloc] initWithDescription:@"Task6"];
  dispatch_async(BCqueue, ^{
    [expectation6 fulfill];
  });
  [self waitForExpectations:@[expectation1, expectation2, expectation3, expectation4, expectation5, expectation6] timeout:30];
}

- (void) testGDCGroup {
  // 创建一个组
  dispatch_group_t group = dispatch_group_create();
  NSLog(@"开始执行");
  XCTestExpectation* expectaion = [[XCTestExpectation alloc] initWithDescription:@"GDC Group Test"];
  __block int fullfilled = 0;
  dispatch_async(dispatch_get_global_queue(0, 0), ^{
    dispatch_group_async(group, dispatch_get_global_queue(0, 0), ^{
      // 关联任务1
      fullfilled++;
    });
    dispatch_group_async(group, dispatch_get_global_queue(0, 0), ^{
      // 关联任务2
      fullfilled++;
    });
    dispatch_group_async(group, dispatch_get_global_queue(0, 0), ^{
      // 关联任务3
      fullfilled++;
    });
    dispatch_group_async(group, dispatch_get_global_queue(0, 0), ^{
      // 关联任务4
      // 等待1秒
      fullfilled++;
      [NSThread sleepForTimeInterval:1];
      NSLog(@"task4 running in %@",[NSThread currentThread]);
    });
    dispatch_group_notify(group, dispatch_get_main_queue(), ^{
      // 回到主线程执行
      XCTAssertEqual(fullfilled, 4);
      [expectaion fulfill];
    });
  });
  [self waitForExpectations:@[expectaion] timeout:30];
}

typedef int (^blk_t)(id obj);
blk_t blk2;

- (void) testBlockMemoryLeak {
  __block int val = 0;
  void (^blk1)(void) = [^{++val;} copy];
  ++val;
  blk1();
  XCTAssertNotEqual(val, 1);
  // 强引用测试
  int value = 0;
  [self captureObject];
  value = blk2([[NSObject alloc] init]);
  value = blk2([[NSObject alloc] init]);
  value = blk2([[NSObject alloc] init]);
  XCTAssertEqual(value, 3);
  // 弱引用测试
  value = 0;
  [self weakCaptureObject];
  value = blk2([[NSObject alloc] init]);
  value = blk2([[NSObject alloc] init]);
  value = blk2([[NSObject alloc] init]);
  XCTAssertEqual(value, 0);
  blk2 = nil;
}

- (void) testNSHashTable {
  NSHashTable *hashTable = [NSHashTable hashTableWithOptions:NSPointerFunctionsCopyIn];
  [hashTable addObject:@"foo"];
  [hashTable addObject:@"bar"];
  [hashTable addObject:@42];
  [hashTable removeObject:@"bar"];
  NSLog(@"Members: %@", [hashTable allObjects]);
}

- (void) captureObject {
  NSMutableArray* array = [NSMutableArray array];
  blk2 = [^(id obj) {
    [array addObject:obj];
    return [array count];
  } copy]; // 由于Copy的原因，array并没有被释放，而是被拷贝进了Block
}

- (void)weakCaptureObject {
  NSMutableArray* array = [NSMutableArray array];
  __weak typeof(array) array2 = array;
  blk2 = [^(id obj) { // array2 是弱引用，当变量作用域结束，array 所指向的对象内存被释放，array2 指向 nil，向 nil 对象发送 count 消息就返回结果 0 了
    [array2 addObject:obj];
    return [array2 count];
  } copy];
}

@end
