
// content_script.js：

var style = document.createElement('style');
style.innerHTML = `
@keyframes colorChange_scheduled {
    0% {
        stroke: #805374;
    }
    100% {
        stroke: #dac185;
    }
}


@keyframes colorChange_running {
    0% {
        stroke: lime;
        stroke-width: 6px !important
    }
    100% {
        stroke: #00ffff;
        stroke-width: 1px !important
    }
}

g.node.scheduled rect {
    animation: colorChange_scheduled 1s infinite alternate;
    stroke-dasharray: 5, 5; /* 创建虚线效果 */
}

g.node.queued rect {
    animation: colorChange_scheduled 1s infinite alternate;
    stroke-dasharray: 5, 5; /* 创建虚线效果 */
}

g.node.running rect {
    animation: colorChange_running 1s infinite alternate;
}

g.node rect {
    stroke-width: 5px !important;
    cursor: pointer !important;
}
`;
document.head.appendChild(style);

//動態地根據當前頁面的 URL 在指定元素後添加不同的環境代號
// 定位元素的 XPath
var xpath = "/html/body/header/div/div/div[2]/ul[1]/li[1]/a";
var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

// 判断当前环境
var envCode;
var currentUrl = window.location.href;
if (currentUrl.includes('38088')) {
    envCode = 'DEV';
} else if (currentUrl.includes('38094')) {
    envCode = 'PRE-SIT';
} else if (currentUrl.includes('38092')) {
    envCode = 'SIT';
} else if (currentUrl.includes('38089')) {
    envCode = 'UAT';
} else if (currentUrl.includes('38091')) {
    envCode = 'DEMO';
} else if (currentUrl.includes('38090')) {
    envCode = 'LHWA(PROD)';
} else if (currentUrl.includes('38095')) {
    envCode = 'MNTR_PROD (PROJ_MNTR)';
} else if (currentUrl.includes('38080')) {
    envCode = 'ELIFE-DEV';
} else if (currentUrl.includes('38081')) {
    envCode = 'ELIFE-UAT';
} else {
    envCode = ''; // 没有匹配的环境代码
}

// 如果找到元素，且环境代码不为空，则添加到元素内容
if (element && envCode) {
    element.textContent += " (" + envCode + ")";
}


//---------------------------------------
// 定位元素的 XPath
// 定位元素的 XPath
var xpath = "/html/body/header/div/div/div[2]/ul[1]";
var ulElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

// 环境及其对应的链接
var environments = {
    "dev": "http://10.146.0.18:38088/login",
    "pre-sit": "http://10.146.0.18:38094/login",
    "sit": "http://10.146.0.18:38092/login",
    "uat": "http://10.146.0.18:38089/login",
    "demo": "http://10.146.0.18:38091/login",
    "lhwa(prod)": "http://10.146.0.18:38090/login",
    "mntr_prod (proj_mntr)": "http://10.146.0.18:38095/login",
    "Cyberbiz-dev": "http://10.146.0.18:38088/login",
    "Elife-dev": "http://10.146.0.18:38080/login",
    "Elife-uat": "http://10.146.0.18:38081/login"
};

// 创建包含 "All Af" 标题的外部 li 元素和内部 ul 元素
if (ulElement) {
    var outerLiElement = document.createElement("li");
    outerLiElement.className = "dropdown";  // 添加 class="dropdown"
    var dropdown = document.createElement("a");
    dropdown.className = "dropdown-toggle";
    dropdown.href = "javascript:void(0)";
    dropdown.setAttribute('data-original-title', '');
    dropdown.setAttribute('title', '');
    dropdown.innerHTML = 'All Af<b class="caret"></b>';

    var innerUlElement = document.createElement("ul");
    innerUlElement.className = "dropdown-menu";

    // 为每个环境创建 li 元素并添加到内部 ul 元素中
    for (var env in environments) {
        var liElement = document.createElement("li");
        var aElement = document.createElement("a");
        aElement.href = environments[env];
        aElement.textContent = env;
        aElement.setAttribute('data-original-title', '');
        aElement.setAttribute('title', '');
        liElement.appendChild(aElement);
        innerUlElement.appendChild(liElement);
    }

    outerLiElement.appendChild(dropdown);
    outerLiElement.appendChild(innerUlElement);
    ulElement.appendChild(outerLiElement);
}


// --------------------------------------------
// 將 Graph 圖中的 Run 下拉單中的選項，改為台灣日期
// function convertAndRemoveScheduled() {
//     // 使用XPath獲取select元素
//     var xpath = "/html/body/div[3]/div/div[6]/div[1]/form/div[3]/div/select";
//     var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

//     if (result && result.singleNodeValue) {
//       var selectElement = result.singleNodeValue;
//       // 獲取所有的option元素
//       var options = selectElement.getElementsByTagName("option");

//       // 迭代所有option元素
//       for (var i = 0; i < options.length; i++) {
//         var option = options[i];
//         // 獲取原始日期值，例如："scheduled__2023-12-14T21:00:00+00:00"
//         var originalDateValue = option.value;

//         // 刪除"scheduled__"，只保留日期部分
//         var datePart = originalDateValue.replace("scheduled__", "");

//         // 將日期字符串轉換為Date對象
//         var date = new Date(datePart);

//         // 轉換為台北時間 (UTC+8)
//         date.setHours(date.getHours() + 8);

//         // 格式化為想要的日期字符串格式，例如："2023-12-15 05:00:00"
//         var taipeiTime = date.toISOString().replace("T", " ").slice(0, -5);

//         // 更新option的value和文字內容
//         option.value = taipeiTime;
//         option.textContent = taipeiTime;
//       }
//     }
//   }

// // 調用函數執行轉換
// convertAndRemoveScheduled();


//-------------------------------
function translateRun() {
    // 使用XPath獲取指定元素
    var xpath = "/html/body/div[3]/div/div[6]/div[1]/form/button";
    var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (result && result.singleNodeValue) {
      var buttonElement = result.singleNodeValue;
      // 更改元素的文字內容
      buttonElement.textContent = "重繪圖型";
    }
  }

  translateRun();


  //------------------------------
  function translateNextRun() {
    // 使用XPath獲取指定元素的HTML
    var xpath = "/html/body/div[3]/div/div[1]/h4/p[2]";
    var result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

    if (result && result.singleNodeValue) {
      var element = result.singleNodeValue;
      var htmlContent = element.innerHTML;

      // 中文化HTML內容
      htmlContent = htmlContent.replace("Next Run:", "下次運行:");
      htmlContent = htmlContent.replace("Run After:", "運行在:");
      htmlContent = htmlContent.replace("Next Run:", "下次運行:");
      htmlContent = htmlContent.replace("Data Interval", "數據間隔");
      htmlContent = htmlContent.replace("Start:", "開始:");
      htmlContent = htmlContent.replace("End:", "結束:");

      // 更新元素的HTML內容
      element.innerHTML = htmlContent;
    }
  }

  // 調用translateHTML方法
  translateNextRun();
