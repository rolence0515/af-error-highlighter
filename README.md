# af-error-highlighter

#### 彈出視窗
![](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_7079c3a831546fa30f3c2bcd11cccd16.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1691295363&Signature=dAAIpF5xupU6o8cC1lhH5FnrcVQ%3D)

#### Log 頁
![](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_19c48067aeeb46af5e288a27ee895574.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1691295397&Signature=aZbN0on6iX%2B5%2Fq89D18LtQUvSeY%3D)

## 插件介紹

af-error-highlighter 是一個 Chrome 擴展插件，用於在指定元素的內部 HTML 中高亮顯示關鍵字。它特別適用於 Airflow 中 Task 的 Log 頁面，可以幫助用戶快速查找並分析 Log 中的錯誤信息。

## 安裝方式

1. 下載本倉庫的 ZIP 檔案，並解壓縮到您的電腦中。

2. 打開 Chrome 瀏覽器，進入擴展管理頁面（輸入 `chrome://extensions/` 到瀏覽器地址欄中）。

3. 在擴展管理頁面的右上角，啟用 "開發者模式"。

4. 點擊 "載入未封裝項目"，選擇剛才解壓縮的插件文件夾，並點擊 "選擇文件夾"。

5. af-error-highlighter 插件將成功安裝並顯示在擴展管理頁面中。

## 使用方法

1. 瀏覽到 Airflow 中特定 Task 的 Log 頁面。

2. 點擊 Chrome 瀏覽器工具欄中的 "af-error-highlighter" 圖標，彈出插件的彈出式窗口。

3. 在彈出式窗口中，輸入要更新的 Log 頁簽號，然後點擊 "Highlight" 按鈕。

4. 插件將自動在頁面中找到特定 Task 的 Log，並將其中的時間戳記、檔案路徑等內容進行高亮顯示，方便用戶查找關鍵信息。

5. 如果在 Log 中發現了 "ERROR" 或 "DB::Exception" 字符串，插件會將其以紅色高亮並帶有圓角邊框的形式標記出來。

6. 使用者也可以切換 "DEBUG" 和 "INFO" 字符串的顯示樣式，它們會以灰色底、白色前景字和圓角邊框的形式進行顯示。

## 範例

假設您正在使用 Airflow，並且想要查找特定 Task 的 Log。以下是一個使用 af-error-highlighter 插件的範例：

1. 在 Airflow 中，找到並點擊特定 Task 的 Log 鏈接，進入 Log 頁面。

2. 點擊 Chrome 瀏覽器工具欄中的 "af-error-highlighter" 圖標，彈出插件的彈出式窗口。

3. 在彈出式窗口的輸入框中，輸入 Task 的頁簽號，例如 "2023-08-02"，然後點擊 "Highlight" 按鈕。

4. 插件會自動尋找 Log 頁面中標簽號為 "2023-08-02" 的 Log，並將其中的時間戳記、檔案路徑等內容進行高亮顯示。

5. 如果在 Log 中發現了 "ERROR" 或 "DB::Exception" 字符串，插件會將它們以紅色高亮並帶有圓角邊框的形式標記出來，這樣您可以快速查找錯誤信息。

6. 您還可以切換 "DEBUG" 和 "INFO" 字符串的顯示樣式，以便更好地理解 Log 的內容。

通過 af-error-highlighter 插件，您可以更輕鬆地查找和分析 Airflow 中 Task 的 Log，提高工作效率並快速排

除問題。
