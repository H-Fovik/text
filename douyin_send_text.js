/**
 * 抖音发送固定文本内容脚本
 * 平台：青龙面板
 * 功能：向指定抖音用户发送固定文本内容
 * 使用说明：
 * 1. 将脚本添加到青龙面板
 * 2. 在下方配置中设置目标用户和发送内容
 * 3. 设置青龙面板定时任务按需运行
 */

// 引入需要的模块
const axios = require('axios');
const fs = require('fs');

// 配置信息
const CONFIG = {
  // 抖音账号 Cookie，需要手动获取并填入
  cookie: '请替换为您的抖音Cookiettwid=1%7CPXadrtZtHDQFftvoC1AD0fgpYcksvQDQmfZEAIgjqJQ%7C1738226881%7C5257b10e67b319a2939f61a2b2f7d34381707c340255be142bb760dcb612ec85; UIFID_TEMP=3af258ad659545d9553f15cf32bb8a88df248991ebb865c20b5fa6f7dab6eb540937e2e83cee47ff167c1ae94bc1aec83401a0900950cf1545ae29fd92636b88356ef86893b4ae75425049596fac22b3; douyin.com; device_web_cpu_core=16; device_web_memory_size=8; architecture=amd64; hevc_supported=true; s_v_web_id=verify_m7zqrdot_xvbHHiWQ_KuIA_4fWO_AS7d_uQfMx8fj23KX; upgrade_tag=1; dy_swidth=1280; dy_sheight=800; csrf_session_id=1366df12bd281d283b85613e01ba10c6; strategyABtestKey=%221741410350.96%22; is_dash_user=1; xgplayer_user_id=411217329355; passport_csrf_token=0d20afa299d8382e8e65c1678664f9b6; passport_csrf_token_default=0d20afa299d8382e8e65c1678664f9b6; FORCE_LOGIN=%7B%22videoConsumedRemainSeconds%22%3A180%7D; fpk1=U2FsdGVkX19FJF/hy3ta0i8ioza6u3RdVrtrHDKxhmh5o00nTkRLGl6oKsxzr+JG3u3Ko10Wt9PAjqW5bieDDg==; fpk2=9258db5fffd4f17a8703a19e760af505; __security_mc_1_s_sdk_crypt_sdk=81821b38-45c6-83a3; bd_ticket_guard_client_web_domain=2; passport_mfa_token=Cjd2pus4e11NVVuzfin3mEglEeMhi373PIUQlTlBfqjnG2dYbz50JG%2F23GNS847Hlv5rUED0kM5mGkoKPJr1yQIKhAHI7u4GtRZiIognAWItCOLCBVyfmiRhCiXNibImAvXLJ9Pib87CdxGulAlXeqEZ8Z506vA6WBCLuesNGPax0WwgAiIBA%2BG7hjI%3D; d_ticket=090d7a7b3663d1ab88206d66a6582bb22637e; passport_assist_user=CkFOl9_XGyt8AzFf-jcNc-_GZ9Pjb3ZWpGjzbyHUuwwG_1SWvhjhRLNV2A2JDV4rPy1FsCzsfXY55fGGvreKNZXBGhpKCjy1qIVmHylY442SFFiPfqXWrwTtJ9IFEWfKWVlU5fSkv_4Sse0vmOktiFHfka2Q8PI7ppwTcTWFssjTz68Q2rfrDRiJr9ZUIAEiAQNfy6_W; n_mh=li5DsIvu3J26Fl2g_On4TRMXjmdPPHW0ZWvIwgBtHU0; sid_guard=cb3a4f164550f41fdfeb96a55bf4049c%7C1741410448%7C5184000%7CWed%2C+07-May-2025+05%3A07%3A28+GMT; uid_tt=0e5faaf0afcba1f43e72b6ed34488e53; uid_tt_ss=0e5faaf0afcba1f43e72b6ed34488e53; sid_tt=cb3a4f164550f41fdfeb96a55bf4049c; sessionid=cb3a4f164550f41fdfeb96a55bf4049c; sessionid_ss=cb3a4f164550f41fdfeb96a55bf4049c; is_staff_user=false; sid_ucp_v1=1.0.0-KDdhYzc2MjkzNjEwOWM3ZThjNDNiNjA3ZTE5MTM0MWI4YTAyMTA0ZDAKIQie4JCAjfWTBBCQoa--BhjvMSAMMOCBtPwFOAdA9AdIBBoCaGwiIGNiM2E0ZjE2NDU1MGY0MWZkZmViOTZhNTViZjQwNDlj; ssid_ucp_v1=1.0.0-KDdhYzc2MjkzNjEwOWM3ZThjNDNiNjA3ZTE5MTM0MWI4YTAyMTA0ZDAKIQie4JCAjfWTBBCQoa--BhjvMSAMMOCBtPwFOAdA9AdIBBoCaGwiIGNiM2E0ZjE2NDU1MGY0MWZkZmViOTZhNTViZjQwNDlj; store-region=cn-he; store-region-src=uid; login_time=1741410449204; __ac_nonce=067cbd090006bb6418dc5; __ac_signature=_02B4Z6wo00f01jsWHzQAAIDCDDLba662QTY7NhuAAOkcf8GxBizCqTh-k.HrmzpbhhrR5lCbfvHu3AWC5Ieay5CuU0BpRFVKS6YgWhrXZH3Fko4TXAru8HYNVfDc2RFKiY3SRk2TTiOaTztkf0; UIFID=3af258ad659545d9553f15cf32bb8a88df248991ebb865c20b5fa6f7dab6eb548068c0139345bc5727fb5258c4213a489ca77ee09cdc8484b2d0897e52a85be35b226988759f60c6c2bfa8771db55b136419eb98a40838a4269757f8995a358e684c72db993d3e5ee38f2be11cd55a6611691f043c410f46eee8319d93b938a2297fabfd765cea7fc7630d1da2cc2ca1e84963e4edcce597a77228c095f4bd95; stream_recommend_feed_params=%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1280%2C%5C%22screen_height%5C%22%3A800%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A16%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A0.4%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A0%7D%22; SelfTabRedDotControl=%5B%5D; _bd_ticket_crypt_cookie=37c935724db7ca689947b70e577708d7; __security_mc_1_s_sdk_sign_data_key_web_protect=77e2cd5f-4828-9ee5; __security_mc_1_s_sdk_cert_key=96c5c88f-47e2-beda; __security_server_data_status=1; publish_badge_show_info=%220%2C0%2C0%2C1741410453342%22; odin_tt=0aefdae84051b4a33257bfc19fba74f6b5e30177d0ad10c39e079941549cf04af67e59db776325132aca8d7a388423979fd25142e0b91375c24831e73001153b; biz_trace_id=1a778d81; xg_device_score=16.319014950270734; download_guide=%222%2F20250308%2F0%22; FOLLOW_LIVE_POINT_INFO=%22MS4wLjABAAAAnh1TlIQGhHjtsrOIH6xIeZKxS7gRtdvaLm8fjaNSEDIEEsueRQz6xiqyFLhcBbl1%2F1741449600000%2F0%2F1741410488112%2F0%22; FOLLOW_NUMBER_YELLOW_POINT_INFO=%22MS4wLjABAAAAnh1TlIQGhHjtsrOIH6xIeZKxS7gRtdvaLm8fjaNSEDIEEsueRQz6xiqyFLhcBbl1%2F1741449600000%2F1741410488316%2F1741410451093%2F0%22; FRIEND_NUMBER_RED_POINT_INFO=%22MS4wLjABAAAAnh1TlIQGhHjtsrOIH6xIeZKxS7gRtdvaLm8fjaNSEDIEEsueRQz6xiqyFLhcBbl1%2F1741449600000%2F1741410501443%2F0%2F0%22; passport_fe_beating_status=false; stream_player_status_params=%22%7B%5C%22is_auto_play%5C%22%3A0%2C%5C%22is_full_screen%5C%22%3A0%2C%5C%22is_full_webscreen%5C%22%3A0%2C%5C%22is_mute%5C%22%3A0%2C%5C%22is_speed%5C%22%3A1%2C%5C%22is_visible%5C%22%3A0%7D%22; IsDouyinActive=true; home_can_add_dy_2_desktop=%220%22; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtcmVlLXB1YmxpYy1rZXkiOiJCTDF4V3pFVGRSVWVUdnVUam5sU3ZLK0JnaDMrWGpXYU9sZXIrU3YraWZlbkpqYzQ2MWFrb29mc1VuY1Vram1uMG01am83RlhGYUZTMGh4bGFiY2l3MDQ9IiwiYmQtdGlja2V0LWd1YXJkLXdlYi12ZXJzaW9uIjoyfQ%3D%3D; volume_info=%7B%22isUserMute%22%3Afalse%2C%22isMute%22%3Atrue%2C%22volume%22%3A0.6%7Cookie',
  
  // 发送目标 - 用户ID数组
  targets: [
    { name: '双子座♊唯一深情', uid: '1027106998' },
    { name: '蕊', uid: '5757577_F' },
    // 可以添加更多用户
  ],
  
  // 固定发送的文本内容
  messageText: '[吐舌]',  // 替换为您要发送的文本内容
  
  // 日志路径
  logPath: './douyin_message_logs.txt'
};

// 创建日志函数
function log(message) {
  const now = new Date();
  const logMessage = `[${now.toLocaleString()}] ${message}`;
  console.log(logMessage);
  
  // 将日志写入文件
  fs.appendFileSync(CONFIG.logPath, logMessage + '\n');
}

// 发送抖音文本消息
async function sendDouyinTextMessage(targetUid, textContent) {
  try {
    // 抖音API请求头
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Referer': 'https://www.douyin.com/',
      'Cookie': CONFIG.cookie,
      'Content-Type': 'application/json'
    };
    
    // 构建请求数据
    const data = {
      to_user_id: targetUid,
      content: textContent,
      message_type: 'text',  // 指定为文本消息
      // 可能需要添加其他参数
    };
    
    // 注意：这里的URL和参数需要根据实际抖音API调整
    const response = await axios.post('https://api.douyin.com/message/send', data, { headers });
    
    if (response.data && response.data.status_code === 0) {
      return true;
    } else {
      log(`发送失败，错误信息: ${JSON.stringify(response.data || '无响应数据')}`);
      return false;
    }
  } catch (error) {
    log(`发送消息异常: ${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  // 遍历所有目标用户发送消息
  for (const target of CONFIG.targets) {
    log(`开始向 ${target.name}(${target.uid}) 发送文本消息: "${CONFIG.messageText}"`);
    
    const result = await sendDouyinTextMessage(target.uid, CONFIG.messageText);
    
    if (result) {
      log(`成功向 ${target.name} 发送文本消息`);
    } else {
      log(`向 ${target.name} 发送文本消息失败`);
    }
    
    // 添加随机延迟，避免被识别为机器人
    const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5秒随机延迟
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

// 脚本执行入口
(async () => {
  try {
    log('开始执行抖音发送文本消息脚本');
    await main();
    log('脚本执行完毕');
  } catch (error) {
    log(`脚本执行出错: ${error.message}`);
  }
})();