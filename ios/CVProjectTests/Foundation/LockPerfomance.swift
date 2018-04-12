//
//  LockPerfomance.swift
//  CVProjectTests
//
//  Created by modao on 2018/4/12.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import XCTest

let count = 1000000

/// 各种锁性能比较
class LockPerfomance: XCTestCase {

  /// 自旋锁测试
  func testOSSPinLock() {
    // 就是靠do-while来block代码的执行，但是不再安全：https://blog.ibireme.com/2016/01/16/spinlock_is_unsafe_in_ios/
    var lock = OS_SPINLOCK_INIT
    measure {
      for _ in 0..<count {
        OSSpinLockLock(&lock)
        OSSpinLockUnlock(&lock)
      }
    }
  }

  /// 信号量
  func testDispatchSemaphore() {
    let lock = DispatchSemaphore(value: 1)
    measure {
      for _ in 0..<count {
        _ = lock.wait(timeout: .distantFuture)
        lock.signal()
      }
    }
  }

  func testPthreadMutex() {
    var lock =  pthread_mutex_t()
    defer {
      pthread_mutex_destroy(&lock)
    }
    pthread_mutex_init(&lock, nil)
    measure {
      for _ in 0..<count {
        pthread_mutex_lock(&lock)
        pthread_mutex_unlock(&lock)
      }
    }
  }

  func testNSCondition() {
    let lock = NSCondition()
    measure {
      for _ in 0..<count {
        lock.lock()
        lock.unlock()
      }
    }
  }

  func testNSLock() {
    let lock = NSLock()
    measure {
      for _ in 0..<count {
        lock.lock()
        lock.unlock()
      }
    }
  }

  func testPthreadRecursiveLock() {
    var lock =  pthread_mutex_t()
    var attr = pthread_mutexattr_t()
    pthread_mutexattr_settype(&attr, PTHREAD_MUTEX_RECURSIVE)
    pthread_mutex_init(&lock, &attr)
    defer {
      pthread_mutex_destroy(&lock)
      pthread_mutexattr_destroy(&attr)
    }
    measure {
      for _ in 0..<count {
        pthread_mutex_lock(&lock)
        pthread_mutex_unlock(&lock)
      }
    }
  }

  func testNSRecursiveLock() {
    let lock = NSRecursiveLock()
    measure {
      for _ in 0..<count {
        lock.lock()
        lock.unlock()
      }
    }
  }

  func testNSConditionLock() {
    let lock = NSConditionLock()
    measure {
      for _ in 0..<count {
        lock.lock()
        lock.unlock()
      }
    }
  }

  func testPthreadRwlock() {
    var rwlock = pthread_rwlock_t()
    pthread_rwlock_init(&rwlock, nil)
    defer {
      pthread_rwlock_destroy(&rwlock)
    }
    measure {
      for _ in 0..<count {
        pthread_rwlock_wrlock(&rwlock)
        pthread_rwlock_unlock(&rwlock)
      }
    }
  }

  func testUnfairLock() {
    if #available(iOS 10.0, *) {
      var lock = os_unfair_lock()
      measure {
        for _ in 0..<count {
          os_unfair_lock_lock(&lock)
          os_unfair_lock_unlock(&lock)
        }
      }
    }
  }

  /// 同步锁
  func testSynchronized() {
    let lock = NSObject()
    measure {
      for _ in 0..<count {
        objc_sync_enter(lock)
        objc_sync_exit(lock)
      }
    }
  }
}
