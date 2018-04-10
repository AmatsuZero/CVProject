//
//  NSObject+MultiArgs.m
//  CVProjectTests
//
//  Created by modao on 2018/4/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NSObject+MultiArgs.h"

@implementation NSObject (MultiArgs)

-(id)performSelector:(SEL)selector withObjects:(NSArray *)objects {
  //初始化方法签名
  NSMethodSignature *signature = [[self class] instanceMethodSignatureForSelector:selector];
  // 如果方法selector不存在
  if(signature == nil){
    // 抛出异常
    NSString *reason = [NSString stringWithFormat:@"%@方法不存在",NSStringFromSelector(selector)];
    @throw [NSException exceptionWithName:@"error" reason:reason userInfo:nil];
  }
  NSInvocation *invocation = [NSInvocation invocationWithMethodSignature:signature];
  invocation.target = self;
  invocation.selector = selector;
  //参数个数signature.numberOfArguments 默认有一个_cmd 一个target 所以要-2
  NSInteger paramsCount = signature.numberOfArguments - 2;
  // 当objects的个数多于函数的参数的时候,取前面的参数
  // 当objects的个数少于函数的参数的时候,不需要设置,默认为nil
  paramsCount = MIN(paramsCount, objects.count);
  for (NSInteger index = 0; index < paramsCount; index++) {
    id object = objects[index];
    // 对参数是nil的处理
    if([object isKindOfClass:[NSNull class]]) continue;
    [invocation setArgument:&object atIndex:index+2];
  }
  [invocation retainArguments];
  // 获取返回值
  void* returnValue = NULL;
  if (signature.methodReturnLength) [invocation setReturnValue:&returnValue];
  //调用方法
  [invocation invoke];
  //signature.methodReturnLength == 0 说明给方法没有返回值
  if (signature.methodReturnLength)
    [invocation getReturnValue:&returnValue];
  id result = (__bridge id)(returnValue);
  return result;
}

@end
