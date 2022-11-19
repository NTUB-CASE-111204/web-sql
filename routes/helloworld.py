#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import time


# 定義接收到的不同環節碼，執行不同邏輯
def foo(var):
    if var == '100':
        # 與伺服器互動 虛擬請求資料時間1秒
        time.sleep(1)
        print('100#'+'{"sign":"1", "msg":"登入成功"}')
    elif var == '200':
        # 與伺服器互動 虛擬請求資料時間1秒
        time.sleep(1)
        print('200#'+'{"sign":"1", "msg":"進入大廳成功"}')
    elif var == '300':
        # 與伺服器互動 虛擬請求資料時間1秒
        time.sleep(1)
        print('300#'+'{"sign":"1", "msg":"匹配成功"}')
    else:
        a = "true"
        print(var+'#'+'{"sign":"'+a+'"}')


# 引數為從命令列傳過來的引數 sys.argv ['py_test.py', arg1, arg2...]
# 所以取引數要從1開始，就是第二位置開始取
foo(sys.argv[1])