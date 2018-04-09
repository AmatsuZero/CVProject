//
//  NSObject+MockKVO.m
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "NSObject+MockKVO.h"
#import <objc/runtime.h>
#import <objc/message.h>

NSString *const kMockKVOClassPrefix = @"MockKVOClassPrefix_";
NSString *const kMockKVOAssociatedObservers = @"MockKVOAssociatedObservers";

/**
 中间插入类
 */
@interface MockObservationInfo: NSObject

@property (nonatomic, weak) NSObject* observer;
@property (nonatomic, copy) NSString* key;
@property (nonatomic, copy) MockObservingBlock block;

-(instancetype)initWithObserver:(NSObject*)observer key:(NSString*)key block:(MockObservingBlock)block;

@end

@implementation MockObservationInfo

-(instancetype)initWithObserver:(NSObject*)observer key:(NSString*)key block:(MockObservingBlock)block {
  if (self = [super init]) {
    _observer = observer;
    _key = key;
    _block = block;
  }
  return self;
}

@end

NSArray *ClassMethodNames(Class c) {
  unsigned int methodCount = 0;
  Method* methodList = class_copyMethodList(c, &methodCount);
  NSMutableArray<NSString*>* array = [[NSMutableArray alloc] initWithCapacity:methodCount];
  for (unsigned int i = 0; i < methodCount; i++) {
    [array addObject:NSStringFromSelector(method_getName(methodList[i]))];
  }
  return [array copy];
}

void PrintDescription(NSString *name, id obj) {
  NSString *str = [NSString stringWithFormat:
                   @"%@: %@\n\tNSObject class %s\n\tRuntime class %s\n\timplements methods <%@>\n\n",
                   name,
                   obj,
                   class_getName([obj class]),
                   class_getName(object_getClass(obj)),
                   [ClassMethodNames(object_getClass(obj)) componentsJoinedByString:@", "]];
  printf("%s\n", [str UTF8String]);
}

NSString* _Nullable  getterForSetter(NSString* _Nonnull setter) {
  if (setter.length <=0 || ![setter hasPrefix:@"set"] || ![setter hasSuffix:@":"]) {
    return nil;
  }
  // remove 'set' at the begining and ':' at the end
  NSRange range = NSMakeRange(3, setter.length - 4);
  NSString *key = [setter substringWithRange:range];
  // lower case the first letter
  NSString *firstLetter = [[key substringToIndex:1] lowercaseString];
  key = [key stringByReplacingCharactersInRange:NSMakeRange(0, 1)
                                     withString:firstLetter];
  return key;
}

NSString * _Nullable setterForGetter(NSString * _Nonnull getter) {
  if (getter.length <= 0) {
    return nil;
  }
  // upper case the first letter
  NSString *firstLetter = [[getter substringToIndex:1] uppercaseString];
  NSString *remainingLetters = [getter substringFromIndex:1];
  // add 'set' at the begining and ':' at the end
  NSString *setter = [NSString stringWithFormat:@"set%@%@:", firstLetter, remainingLetters];
  return setter;
}

#pragma mark - Overridden Methods
void kvo_setter(id self, SEL _cmd, id newValue) {
  NSString *setterName = NSStringFromSelector(_cmd);
  NSString *getterName = getterForSetter(setterName);

  if (!getterName) {
    NSString *reason = [NSString stringWithFormat:@"Object %@ does not have setter %@", self, setterName];
    @throw [NSException exceptionWithName:NSInvalidArgumentException
                                   reason:reason
                                 userInfo:nil];
    return;
  }

  id oldValue = [self valueForKey:getterName];

  struct objc_super superclazz = {
    .receiver = self,
    .super_class = class_getSuperclass(object_getClass(self))
  };

  // cast our pointer so the compiler won't complain
  void (*objc_msgSendSuperCasted)(void *, SEL, id) = (void *)objc_msgSendSuper;

  // call super's setter, which is original class's setter method
  objc_msgSendSuperCasted(&superclazz, _cmd, newValue);

  // look up observers and call the blocks
  NSMutableArray *observers = objc_getAssociatedObject(self, (__bridge const void *)(kMockKVOAssociatedObservers));
  for (MockObservationInfo *each in observers) {
    if ([each.key isEqualToString:getterName]) {
      dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        each.block(self, getterName, oldValue, newValue);
      });
    }
  }
}

Class kvo_class(id self, SEL _cmd) {
  return class_getSuperclass(object_getClass(self));
}

@implementation NSObject (MockKVO)

-(void)mock_addObserver:(NSObject *)observer
                 forKey:(NSString *)key
              withBlock:(MockObservingBlock)block {

  SEL setterSelector = NSSelectorFromString(setterForGetter(key));
  Method setterMethod = class_getInstanceMethod([self class], setterSelector);
  if (!setterMethod) {
    NSString *reason = [NSString stringWithFormat:@"Object %@ does not have a setter for key %@", self, key];
    @throw [NSException exceptionWithName:NSInvalidArgumentException
                                   reason:reason
                                 userInfo:nil];

    return;
  }

  Class clazz = object_getClass(self);
  NSString *clazzName = NSStringFromClass(clazz);

  // if not an KVO class yet
  if (![clazzName hasPrefix:kMockKVOClassPrefix]) {
    clazz = [self makeKVOClassWithOriginalClassName:clazzName];
    object_setClass(self, clazz);
  }

  // add our kvo setter if this class (not superclasses) doesn't implement the setter?
  if (![self hasSelector:setterSelector]) {
    const char *types = method_getTypeEncoding(setterMethod);
    class_addMethod(clazz, setterSelector, (IMP)kvo_setter, types);
  }

  MockObservationInfo *info = [[MockObservationInfo alloc] initWithObserver:observer key:key block:block];
  NSMutableArray *observers = objc_getAssociatedObject(self, (__bridge const void *)(kMockKVOAssociatedObservers));
  if (!observers) {
    observers = [NSMutableArray array];
    objc_setAssociatedObject(self, (__bridge const void *)(kMockKVOAssociatedObservers), observers, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
  }
  [observers addObject:info];
}

-(void)mock_removeObserver:(NSObject *)observer forKey:(NSString *)key {
  NSMutableArray* observers = objc_getAssociatedObject(self, (__bridge const void *)(kMockKVOAssociatedObservers));

  MockObservationInfo *infoToRemove;
  for (MockObservationInfo* info in observers) {
    if (info.observer == observer && [info.key isEqualToString:key]) {
      infoToRemove = info;
      break;
    }
  }
  [observers removeObject:infoToRemove];
}

-(Class)makeKVOClassWithOriginalClassName: (NSString* _Nonnull) originalClassName {
  NSString* kvoClazzName = [kMockKVOClassPrefix stringByAppendingString:originalClassName];
  Class clazz = NSClassFromString(kvoClazzName);
  if (clazz)
    return clazz;
  // class doesn't exist yet, make it
  Class originalClazz = object_getClass(self);
  Class kvoClazz = objc_allocateClassPair(originalClazz, kvoClazzName.UTF8String, 0);

  // grab class method's signature so we can borrow it
  Method clazzMethod = class_getInstanceMethod(originalClazz, @selector(class));
  const char *types = method_getTypeEncoding(clazzMethod);
  class_addMethod(kvoClazz, @selector(class), (IMP)kvo_class, types);

  objc_registerClassPair(kvoClazz);
  return kvoClazz;
}

-(BOOL)hasSelector: (SEL)selector {
  Class clazz = object_getClass(self);
  unsigned int methodCount = 0;
  Method* methodList = class_copyMethodList(clazz, &methodCount);
  for (unsigned int i = 0; i < methodCount; i++) {
    SEL thisSelector = method_getName(methodList[i]);
    if (thisSelector == selector) {
      free(methodList);
      return YES;
    }
  }
  free(methodList);
  return NO;
}

@end
