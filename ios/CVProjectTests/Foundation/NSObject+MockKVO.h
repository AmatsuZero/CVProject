//
//  NSObject+MockKVO.h
//  CVProjectTests
//
//  Created by modao on 2018/4/9.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

typedef void (^MockObservingBlock) (id observedValue, NSString * observedKey, id oldValue, id newValue);

@interface NSObject (MockKVO)

-(void) mock_addObserver: (NSObject*) observer forKey: (NSString*)key withBlock: (MockObservingBlock)block;
-(void) mock_removeObserver: (NSObject*) observer forKey: (NSString*)key;

@end
