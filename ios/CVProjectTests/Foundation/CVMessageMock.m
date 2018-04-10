//
//  CVMessageMock.m
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "CVMessageMock.h"

void mockMethod(id self, SEL _cmd) {
  NSLog(@"Mocked Method");
}

@interface InteralMockClassA: NSObject

-(void)methodA;

@end

@implementation InteralMockClassA

-(void)methodA {
  NSLog(@"%s", __FUNCTION__);
}

@end

@interface InteralMockClassB: NSObject

-(void)methodB;

@end

@implementation InteralMockClassB

-(void)methodB {
  NSLog(@"%s", __FUNCTION__);
}

@end

@implementation CVMessageMock

+ (BOOL) resolveInstanceMethod:(SEL)sel {
  NSLog(@"%s: %@", __FUNCTION__, NSStringFromSelector(sel));
  if (sel == NSSelectorFromString(@"mockMethod")) {
    class_addMethod([self superclass], sel, (IMP)mockMethod, "V@:");
    return YES;
  }
  return [super resolveInstanceMethod:sel];
}

- (id) forwardingTargetForSelector:(SEL)aSelector {
  NSLog(@"%s: %@", __FUNCTION__, NSStringFromSelector(aSelector));
  InteralMockClassA* mock = [InteralMockClassA new];
  if ([mock respondsToSelector:aSelector])
    return mock;
  return [super forwardingTargetForSelector:aSelector];
}

- (void) forwardInvocation:(NSInvocation *)anInvocation {
  NSLog(@"%s: %@", __FUNCTION__, NSStringFromSelector(anInvocation.selector));
  InteralMockClassB* mock = [InteralMockClassB new];
  if ([mock respondsToSelector:anInvocation.selector])
    [anInvocation invokeWithTarget:mock];
}

- (NSMethodSignature *)methodSignatureForSelector:(SEL)aSelector {
  NSLog(@"%s: %@", __FUNCTION__, NSStringFromSelector(aSelector));
  if (aSelector == NSSelectorFromString(@"methodB"))
    return [NSMethodSignature signatureWithObjCTypes: "V@:@"];
   return [super methodSignatureForSelector:aSelector];
}

- (void) doesNotRecognizeSelector:(SEL)aSelector {
  NSLog(@"%s: %@", __FUNCTION__, NSStringFromSelector(aSelector));
  [super doesNotRecognizeSelector:aSelector];
}

@end
