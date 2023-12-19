
// popup_script.js

/* -------------------------------- varialbes ------------------------------- */
// 宣告一個全域變數來保存secondSpanInnerHTML的值
let task_instance = '';

// 監控狀態的變數
let monitoringStatus = false;
let monitorInterval;


/* ----------------------------- helper function ---------------------------- */
function highlightKeywords(elementId, keyword) {
    const element = document.getElementById(elementId);
    if (element) {
        // 定義一個計數器來記錄找到的 ERROR 數量
        let errorCount = 0;

        // 選取 code 元素
        const codeElement = element.querySelector('code');
        if (codeElement) {
            // １．找出 [2023-08-02, 04:17:39 UTC] 這類時間字串，淺灰色，去掉 " UTC"
            const regex1 = /\[\d{4}-\d{2}-\d{2}, \d{2}:\d{2}:\d{2} UTC\]/g;
            const result1 = codeElement.innerText.replace(regex1, match => {
                const timestamp = match.replace(" UTC", "");
                return `<span style="color: #ca9b9b; font-size:0.8em">${timestamp}</span>`;
            });

            // ２．找出 {subprocess.py:74} 這類時間字串，淺灰色
            const regex2 = /\{\w+\.py:\d+\}/g;
            const result2 = result1.replace(regex2, match => {
                return `<span style="color: #46a7b9; font-size:0.8em">${match}</span>`;
            });

            // ３．找出 "DEBUG" 和 "INFO" 字串，灰色底、白色前景字和圓角邊框
            const regex3 = /DEBUG|INFO/g;
            const result3 = result2.replace(regex3, match => `<span style="background-color: grey; color: white; border-radius: 5px; padding: 2px; font-size:9px;">${match}</span>`);

             // ３．找出 "DEBUG" 和 "INFO" 字串，灰色底、白色前景字和圓角邊框
             const regex_waring = /WARNING/g;
             const result_waring = result3.replace(regex_waring, match => `<span style="background-color: #a6477f; color: white; border-radius: 5px; padding: 2px; font-size:9px;">${match}</span>`);

            // 將關鍵字 "ERROR" 轉換為帶有紅色高亮的 HTML
            const patternError = new RegExp(keyword, "g");
            const resultError = result_waring.replace(patternError, match => {
                // 增加計數器
                errorCount++;
                return `<span style="background-color: red; color: white; border-radius: 5px; padding: 2px;">${match}</span>`
            });

            // 將關鍵字 "DB::Exception" 轉換為帶有紅色高亮的 HTML
            const patternDBException = /DB::Exception/g;
            const finalResult = resultError.replace(patternDBException, match => `<span style="background-color: red; color: white; border-radius: 5px; padding: 2px;">${match}</span>`);

            // 更新 code 元素的內容
            codeElement.innerHTML = finalResult;

            // 彈出 alert 訊息顯示找到的 ERROR 數量
            if (errorCount > 0) {
                alert(`共找到 ${errorCount} 個 ERROR`);
            } else {
                alert(`目前記錄中沒有 ERROR`);
            }

        } else {
            alert(`Code element not found in element with ID "${elementId}"`);
        }
    } else {
        alert(`Element with ID "${elementId}" not found`);
    }
}

// 開始監控狀態
function startMonitoring() {
    monitoringStatus = true;
    monitorInterval = setInterval(checkStatus, 3000);
    document.getElementById('monitorBtn').style.display = 'none';
    document.getElementById('stopMonitorBtn').style.display = 'block';
}

// 停止監控狀態
function stopMonitoring() {
    monitoringStatus = false;
    clearInterval(monitorInterval);
    document.getElementById('stopMonitorBtn').style.display = 'none';
    document.getElementById('monitorBtn').style.display = 'block';
}

// 檢查狀態，如果狀態為 "failed"，則觸發系統提示音
function checkStatus() {
    // 在主頁面的上下文中執行 checkStatus 函式
    chrome.scripting.executeScript({
        target: { tabId: currentTabId }, // currentTabId 是當前活躍標籤的 ID
        func: () => {
            const statusElement = document.querySelector('body > div.container > div > div:nth-child(3) > h4 > span');
            const status = statusElement.innerHTML.trim();
            if (status === 'failed') {
                // 觸發系統提示音，例如beep持續三秒
                beep();
            }
        },
    });
}

// 觸發系統提示音
function beep() {
    // 這裡可以使用瀏覽器原生的 Web Audio API 或其他第三方的聲音播放庫來實現提示音效果
    // 以下示範簡單的提示音效果，可根據需求自行調整
    const audio = new Audio();
    audio.src = 'path/to/beep-sound.mp3';
    audio.play();
}


/* ----------------------------- event listener ----------------------------- */
document.addEventListener('DOMContentLoaded', function () {
    // 使用 chrome.scripting.executeScript 在當前網頁內容中執行 JavaScript 代碼
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            func: () => {

                /* ------------------------------- 此處是在原始網頁中執行 ------------------------------ */
                // 取得log
                const liElements = document.querySelectorAll('#ti_log_try_number_list li');

                if (liElements) {
                    const lastLiContent = liElements[liElements.length - 1]?.innerText.trim() || '';
                    chrome.runtime.sendMessage({ type: 'get_last_li_content', lastLiContent: lastLiContent });
                } else {
                    console.log('liElements not found');
                }

                // 取得主頁面的h4元素
                let instanceElement = document.querySelector('body > div.container > div > h4:nth-child(11) > span:nth-child(2)');
                if (!instanceElement) {
                    instanceElement = document.querySelector('body > div.container > div > h4:nth-child(10) > span:nth-child(2)');
                }

                // 取得h4元素內的第二個子span的innerHTML, task_instance
                // 判斷是否成功取得 instanceElement
                if (instanceElement) {
                    // 設定 popup.html 中相應的元素的值
                    task_instance = instanceElement.innerHTML.trim() || '';
                    chrome.runtime.sendMessage({ type: 'send_task_instance', task_instance: task_instance});
                } else {
                    console.log('instanceElement not found');
                    alert('Task Instance 找不到');
                }

            }
        });
    });

    // // 當開始監控狀態按鈕按下時
    // document.getElementById('monitorBtn').addEventListener('click', function () {
    //     startMonitoring();
    // });

    // // 當停止監控狀態按鈕按下時
    // document.getElementById('stopMonitorBtn').addEventListener('click', function () {
    //     stopMonitoring();
    // });
});


/* --------------------------------- content 的事件處理函數 --------------------------------- */

// 接收來自當前網頁內容的 lastLiContent
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'get_last_li_content') {
        // 設定 popup.html 中 input 元素的預設值
        const elementIdInput = document.getElementById('elementId');
        elementIdInput.value = message.lastLiContent;
    }else if  (message.type === 'send_task_instance') {
        task_instance = message.task_instance
        // alert(task_instance)
    }
});


/* --------------------------------- popup 事件處理函數 --------------------------------- */
// 按複製到剪貼簿鈕點擊事件，將內容複製到剪貼簿
document.getElementById('copyBtn').addEventListener('click', function () {
    // 將值複製到剪貼簿
    const tempInput = document.createElement('input');
    tempInput.value = task_instance;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // 顯示複製成功訊息
    alert('Task Instance 已複製到剪貼簿');
});


// 按highlightBtn
document.getElementById('highlightBtn').addEventListener('click', function () {
    const lastLiContent = document.getElementById('elementId').value.trim();
    const elementId = `log-group-${lastLiContent}`;
    const keyword = 'ERROR'; // 在這裡設定您要的關鍵字
    if (elementId !== '') {
        // 傳遞用戶輸入的元素ID和關鍵字給 content_script.js
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                func: highlightKeywords,
                args: [elementId, keyword]
            }, () => {
                // alert(`已修改你的Log記錄，請查看有無紅色的ERROR`);
                window.close();
            });
        });
    } else {
        alert(`Element ID cannot be empty`);
    }
});

