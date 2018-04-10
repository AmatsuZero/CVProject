//
//  NSObject+MultiArgs.h
//  CVProjectTests
//
//  Created by modao on 2018/4/10.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface NSObject (MultiArgs)

-(id)performSelector:(SEL)selector withObjects:(NSArray *)objects;

@end
