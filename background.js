// 接收來自content_script.js的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.type === 'get_id') {
      // 在這裡返回插件指定的id
      const id = 'your_target_id';
      sendResponse({ id: id });
    }
  });
