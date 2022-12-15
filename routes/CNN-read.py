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
        import numpy as np
        import os
        from sklearn.metrics import confusion_matrix
        import seaborn as sn; sn.set(font_scale=1.4)
        from sklearn.utils import shuffle           
        import matplotlib.pyplot as plt             
        import cv2                                 
        import tensorflow as tf                
        from tqdm import tqdm
        from keras.models import Sequential
        from keras.layers import Dense, Activation, Dropout, Flatten
        from keras.layers import Conv2D
        from keras.layers import MaxPooling2D
        from keras.optimizers import SGD, Adam
        '定義子資料夾名稱&對應的數字'
        class_names = ['LUSH','DEGUSTER 慢享','Kosmea','純粹森活','Aroma Bella','ARUBLU','Ethique','Ardell','LHAMI','DEEPURE淨森林','Burt’s Bees (Clorox)','Aesop']
        class_names_label = {class_name:i for i, class_name in enumerate(class_names)}

        nb_classes = len(class_names)

        IMAGE_SIZE = (64, 64)
        '讀模型'
        from keras.models import load_model
        modelpath = "C:/Users/Bircteam/web-sql/routes/12datas_model(300).h5"
        model = load_model(modelpath)

        from keras.preprocessing import image
        import matplotlib.pyplot as plt   
        import numpy as np
        import tensorflow as tf
        picPath = 'C:/Users/Bircteam/web-sql/public/selectPic/' + var
        IMAGE_PATH=picPath #輸入圖片
        img=tf.keras.preprocessing.image.load_img(IMAGE_PATH,target_size=(64,64))#跟建模時的input_shape需相同
        img=tf.keras.preprocessing.image.img_to_array(img)
        plt.imshow(img/255.)
        predictions=model.predict(np.array([img]))
        #predictions = np.argmax(predictions,axis=1)
        print(predictions)
        print(class_names[np.argmax(predictions)])
        ans = class_names[np.argmax(predictions)]
        print(ans)

        import psycopg2 
        from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
        conn = psycopg2.connect(host="db.zvkaicfdjrsrevzuzzxh.supabase.co", user="postgres", password ="TiBmTydtbNZ6YfiZ", dbname="postgres")
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        cursor2 = conn.cursor()
        print("資料庫連線成功！")
        cursor.execute("SELECT b_name FROM public.brand where b_name = '%s'" %(ans))
        db = list(cursor.fetchall())
        print(db)
        a = "true"
        print(var+'#'+'{"sign":"'+a+'", "msg":"'+ans+'"}')


# 引數為從命令列傳過來的引數 sys.argv ['py_test.py', arg1, arg2...]
# 所以取引數要從1開始，就是第二位置開始取
foo(sys.argv[1])
"""
import numpy as np
import os
from sklearn.metrics import confusion_matrix
import seaborn as sn; sn.set(font_scale=1.4)
from sklearn.utils import shuffle           
import matplotlib.pyplot as plt             
import cv2                                 
import tensorflow as tf                
from tqdm import tqdm
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout, Flatten
from keras.layers import Conv2D
from keras.layers import MaxPooling2D
from keras.optimizers import SGD, Adam
'定義子資料夾名稱&對應的數字'
class_names = ['LUSH','DEGUSTER 慢享','Kosmea','純粹森活','Aroma Bella','ARUBLU','Ethique','Ardell','LHAMI','DEEPURE淨森林']
class_names_label = {class_name:i for i, class_name in enumerate(class_names)}

nb_classes = len(class_names)

IMAGE_SIZE = (64, 64)
'讀模型'
from keras.models import load_model
modelpath = "C:/Users/Bircteam/web-sql/routes/10datas_model(fail5).h5"
model = load_model(modelpath)

from keras.preprocessing import image
import matplotlib.pyplot as plt   
import numpy as np
import tensorflow as tf
picPath = 'C:/Users/Bircteam/web-sql/public/selectPic/' + "1668844628973--20221020055257503914.jpg"
IMAGE_PATH=picPath #輸入圖片
img=tf.keras.preprocessing.image.load_img(IMAGE_PATH,target_size=(64,64))#跟建模時的input_shape需相同
img=tf.keras.preprocessing.image.img_to_array(img)
plt.imshow(img/255.)
predictions=model.predict(np.array([img]))
#predictions = np.argmax(predictions,axis=1)
print(predictions)
print(class_names[np.argmax(predictions)])
ans = class_names[np.argmax(predictions)]
print(ans)

import psycopg2 
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
conn = psycopg2.connect(host="db.zvkaicfdjrsrevzuzzxh.supabase.co", user="postgres", password ="TiBmTydtbNZ6YfiZ", dbname="postgres")
conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
cursor = conn.cursor()
cursor2 = conn.cursor()
print("資料庫連線成功！")
cursor.execute("SELECT b_name FROM public.brand where b_name = '%s'" %(ans))
db = list(cursor.fetchall())
print(db)"""