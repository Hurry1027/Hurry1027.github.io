/* jshint esversion: 11 */
/*jshint -W069 */
/* 
这是一个基于 YoyoRobot 机器人插件的 扩展功能
包括正则,和群成员绑定和群互通聊天
v0.1.4 : 修复没有群名片时游戏内群消息无发言人名字的问题
v0.1.5 : 增加正则配置解析：机器人聊天回复
v0.1.6 : 修复 退群 和 加群功能
v0.1.7 : 调整监听控制台输出的正则逻辑，退群提示中的昵称改为群名片，@玩家换行
v0.1.8 : 增加服务器cpu和内容更加详细信息输出需要 YoyoRobot versions >= 0.1.17
v0.1.9 : 优化tps算法 服务器状态 瞬发
v0.1.10 : 
    新增 functionSwitch.OutGroupBlacklist 成员退群是否 添加到 blacklist 里面
    新增 functionSwitch.isMoney 是否默认给新绑定成员开启 QQ群聊经济系统
    新增 后台命令 /regload  - 重载正则配置
    新增 玩家命令 /qq omy  - 如果functionSwitch.isMoney 是 false 通过该命令打开
    新增 群正则 查 <玩家名> 得到玩家绑定qq等信息
    修复 绑定重复未提示信息的bug
    调整 bind.json 的文件格式
v0.1.11 : 修复 新成员进入服务器绑定未得到xuid(进入服务器自动绑定xuid 和 执行 qq omy时)
v0.1.12 : 修复 url自定义解析的bug

*/

const versions = "0.1.12 Minecraft BDServer 默认基础扩展";
/*
----------------------------------------------------------------
 == 配置说明 ==
1、请开服一次, 会自动生成配置文件, 
2、然后在./YoyoRobot/regular/config.json 中修改监听群聊、管理员及其他配置, 
3、再重启服务器。

**在本文件更改监听群聊、管理员将不会生效。
----------------------------------------------------------------
*/
let config = new JsonConfigFile("./YoyoRobot/regular/config.json", data.toJson({
    group: ["569211842", "363457102"],//监听群
    adminList: ["1294858802", "1536724751"],//管理员
    serverName: "",
    AddGroupAgreed: {//是否开启申请加群自动同意
        blacklist: [
        ]
    },
    functionSwitch: {
        InAndOutOfTip: true,//进入提示开关
        ChatForward: true,//聊天转发开关
        AddGroupAgreed: false,//加入同意开关
        OutGroupBlacklist: false,//成员退群是否 添加到 blacklist 里面
        isMoney: false,//是否默认给新绑定成员开启 QQ群聊经济系统
    },
    stray: [//成员离群自动解绑的 和 触发以下指令
        { type: "group", msg: "[{user.name}]已离开群聊! 要走了终究留不住!" },
        { type: "cmd", cmd: "allowlist remove \"{bind.name}\"" }
    ],
    regular: [
        { type: "group", se: "^/(.+)$", msg: "$1", cmd: "$1", op: true, result: "^(.+)$" }, //群消息MC命令
        //{ type: "group", se: "^/(.+)$", cmd: "$1", msg: "[命令] $1 已发送", op: 1 },//群消息MC命令（旧版）
        { type: "group", se: "^清理掉落物$", cmd: "kill @e[type=item]", op: 1 },//不带返回
        { type: "group", se: "^绑定\\s?([\\da-zA-Z ]+)$", msg: "$1", fun: "bind", op: 0 },//调用方法绑定游戏名
        { type: "group", se: "^解绑\\s?([\\da-zA-Z ]+)$", msg: "$1", fun: "unbind", op: 1 },//调用方法解除绑定游戏名
        { type: "group", se: "^服务器状态$", msg: "物理内存:{ram}/{tram}", fun: "serverInfo", op: 0 },//调用方法
        { type: "group", se: "^在线玩家$", msg: "在线玩家:$1$2", cmd: "list", result: "There are ([\\d/]+) players online:([\\s\\S]*)", op: 0 },//调用方法
        { type: "group", se: "(.+)", msg: "§l[§e{group.name}§r§l]<{user.name}>$1", fun: "tellAll", op: 0 },
        { type: "group", se: "^转账\\s?@(\\d{5,10})\\s(\\d{1,10})$", msg: "[钱]成功为 {bind.name} 转账 $2 大洋!", fun: "transfer", op: 0 },//转账
        { type: "group", se: "^扣钱\\s?@(\\d{5,10})\\s(\\d{1,10})$", msg: "[钱]成功为 {bind.name} 扣除 $2 大洋!", fun: "DeductMoney", op: 1 },//扣钱
        { type: "group", se: "^加钱\\s?@(\\d{5,10})\\s(\\d{1,10})$", msg: "[钱]成功为 {bind.name} 增加 $2 大洋!", fun: "AddMoney", op: 1 },//加钱
        { type: "group", se: "^余额$", msg: "[钱]{bind.name} 你当前 余额是 {llmoney} 大洋!", fun: "TheBalanceOf", op: 0 },//余额
        { type: "group", se: "^ping\\s?([\\.\\w]+)$", msg: "ping", fun: "url", op: 0 },// url请求解析
        { type: "group", se: "^查\\s?([\\da-zA-Z ]+)$", msg: "$1", fun: "check", op: 1 },//检查指定玩家名的qq号
        { type: "cmd", se: "Player added to allowlist", msg: "白名单添加完成" },//抓取控制台命令执行结果
        { type: "cmd", se: "Player already in allowlist", msg: "你已经在白名单里面了" },
        { type: "cmd", se: "Player removed from allowlist", msg: "成功移除白名单" },
        { type: "cmd", se: "Player not in allowlist", msg: "玩家未在白名单里面" }
    ]
}));

//===================
// TPS功能
let tps = { tps: '20.00' };
mc.listen("onTick", () => {
    if (tps['tps_Count'] == null) {
        tps['tps_Time_start'] = new Date().getTime();
        tps['tps_Time_end'] = 0;
        tps['tps_Count'] = 0;
    } else {
        tps['tps_Count']++;
    }
    if (tps['tps_Count'] != null && tps['tps_Count'] >= 20) {
        tps['tps_Time_end'] = new Date().getTime();
        let indirect = Math.floor((tps['tps_Time_end'] - tps['tps_Time_start']) / 1000 * 100) / 100;
        tps['tps'] = (20 / indirect).toFixed(2) > 20 ? '20.00' : (20 / indirect).toFixed(2);
        tps['tps_Count'] = null;
    }
});
//===================

let bindConfig = new JsonConfigFile("./YoyoRobot/regular/bind.json", JSON.stringify({
}));

// 适应旧版本配置的 0.1.10更新

let bindConfigAll = bindConfig.get('bind');
if (bindConfigAll) {
    // 旧版本配置需要更新
    let newList = {};
    for (let index in bindConfigAll) {
        newList[index] = {
            qq: bindConfigAll[index],//绑定的qq
            isMoney: false,//是否启用经济功能
            ban: 0,//被封禁的到期时间戳
            xuid: data.name2xuid(index) || '',//玩家的xuid(玩家对应绑定名称进入服务器当没有xuid自动更新)
        };
    }
    bindConfig.write(JSON.stringify(newList));//写入配置
    logger.warn('[正则扩展] 已经把旧版配置转成新版配置了!');
}


let urlConfig = new JsonConfigFile("./YoyoRobot/regular/url.json", data.toJson({
    ping: {
        url: "https://api.gmit.vip/Api/Ping",
        method: "post",
        data: "format=json&ip=$1&node=0",
        return: {
            data: [
                { msg: "平均延迟:", type: "text" },
                { path: "data.ping_avg", type: "text" }
            ]
        }
    }
}));

const cmd = mc.newCommand('regload', '重载正则配置', PermType.Console);
cmd.overload([]);
cmd.setCallback((_cmd, _ori, out, res) => {
    config.reload();
    urlConfig.reload();
    bindConfig.reload();
    return out.success(`[正则扩展] 配置文件重载成功了!`);
});
cmd.setup();

mc.regPlayerCmd('qq omy', '§e开启QQ群经济功能', (pl) => {
    let plName = data.xuid2name(pl.xuid);
    let bindinfo = bindConfig.get(plName);
    if (typeof bindinfo == "undefined") {
        pl.tell(`§e[QQ机器人] §4对不起未查询到你的绑定信息 请到群聊发生 绑定xxxx 进行账号绑定!`);
        return;
    }
    bindinfo.isMoney = true;
    if (!bindinfo.xuid) bindinfo.xuid = pl.xuid;
    bindConfig.set(plName, bindinfo);
    pl.tell(`§e[QQ机器人] §2恭喜您已经成功开启QQ群聊 经济功能!`);
});

let funs = {
    /**
     * 查询余额
     * @param {string} xuid 玩家xuid
     */
    TheBalanceOf(xuid, msg, group) {
        let MyMoney = money.get(xuid);
        msg = msg.replace(/{llmoney}/g, MyMoney);
        _sendGroupMsg(group, `${msg}`);
    },
    /**
     * 增加指定玩家的金额
     * @param {string} xuid 加钱玩家的xuid
     * @param {number} money 金额
     * @param {string} msg 预定信息
     * @returns 
     */
    AddMoney(xuid, money2, msg, group) {
        let result = money.add(xuid, money2);
        if (!result) {
            _sendGroupMsg(group, `添加金额失败!`);
            return false;
        }
        _sendGroupMsg(group, `${msg}`);
    },
    /**
     * 扣除指定玩家的金额
     * @param {string} xuid 扣款玩家的xuid
     * @param {number} money 金额
     * @param {string} msg 预定信息
     * @returns 
     */
    DeductMoney(xuid, money2, msg, group) {
        let result = money.reduce(xuid, money2);
        if (!result) {
            _sendGroupMsg(group, `扣除金额失败!`);
            return false;
        }
        _sendGroupMsg(group, `${msg}`);
    },
    /**
     * 向指定玩家转账
     * @param {string} xuid1 付款玩家xuid
     * @param {string} xuid2 收款玩家xuid
     * @param {number} money 转账的金额
     * @param {string} msg 预定的信息
     */
    transfer(xuid1, xuid2, money2, msg, group) {
        let result = money.trans(xuid1, xuid2, money2);
        if (!result) {
            _sendGroupMsg(group, `发起转账失败!`);
            return false;
        }
        _sendGroupMsg(group, `${msg}`);

    },
    /**
     * 向服务器所有在线玩家广播信息
     * @param {string} msg 消息
     */
    tellAll(msg) {
        mc.broadcast(msg);
    },
    /**
     * 查询服务器状态
     * @param {string} msg 头部预定信息
     * @param {number} group qq群号
     */
    serverInfo(msg, group) {
        let osInfos = yoyo.getosinfo;//获取系统信息
        if (!osInfos) {
            _sendGroupMsg(group, "查询失败!当前扩展需要配合YoyoRobot 0.1.17版本使用!请删除YoyoRobot重新安装既最新版本哦--");
            return;
        }
        let llv = ll.version();
        var serverInfo_result = "● 服务器状态";
        serverInfo_result += `\n# BDServer版本: ${mc.getBDSVersion()}`;
        serverInfo_result += `\n# BDServer协议: ${mc.getServerProtocolVersion()}`;
        serverInfo_result += `\n# LL加载器版本: ${llv.major}.${llv.minor}.${llv.revision}`;
        serverInfo_result += `\n# CPU核数: ${osInfos.cpuCount}核`;
        serverInfo_result += `\n# CPU占用: ${osInfos.cpuUsage}%`;
        serverInfo_result += `\n# 内存占用: ${osInfos.freememPercentage}%`;
        serverInfo_result += `\n# 总内存: ${osInfos.totalMem}MB`;
        serverInfo_result += `\n# BDS运行时间: ${(osInfos.processUptime / 60 / 60).toFixed(2)} 小时`;
        serverInfo_result += `\n# 系统运行时间: ${(osInfos.sysUptime / 60 / 60).toFixed(2)} 小时`;
        serverInfo_result += `\n# TPS(平均刻): ${tps['tps']}`;
        serverInfo_result += `\n# 在线人数: ${mc.getOnlinePlayers().length}人`;

        _sendGroupMsg(group, serverInfo_result);
    },
    /**
     * 绑定游戏名
     * @param {number} qq qq号
     * @param {string} gameName 游戏名
     * @param {number} group 群号
     */
    bind(qq, gameName, group) {
        if (!/^.{5,}$/.test(gameName)) {
            _sendGroupMsg(group, [yoyo.segment.at(qq), yoyo.segment.text(`\n请输入正确的游戏名ID!`)]);
            return false;
        }
        let bindinfo = bindConfig.get(gameName);
        if (typeof bindinfo != "undefined") {
            _sendGroupMsg(group, [yoyo.segment.at(qq), yoyo.segment.text(`\n这个游戏名已被绑定了!`)]);
            return false;
        }
        //清除该账号已经绑定的
        let bindObj = getBind(qq);
        if (bindObj) {
            mc.runcmdEx(`allowlist remove "${bindObj.bindName}"`);//删除旧的游戏白名单
            bindConfig.delete(bindObj.bindName);
        }
        let functionSwitch = config.get('functionSwitch');
        //绑定
        bindinfo = {
            qq,//绑定的qq
            isMoney: functionSwitch.isMoney || false,//是否启用经济功能
            ban: 0,//被封禁的到期时间戳
            xuid: data.name2xuid(gameName) || '',//玩家的xuid(玩家对应绑定名称进入服务器当没有xuid自动更新)
        };
        bindConfig.set(gameName, bindinfo);
        mc.runcmdEx(`allowlist add "${gameName}"`);
        _sendGroupMsg(group, [yoyo.segment.at(qq), yoyo.segment.text(`\n游戏ID [${gameName}] 绑定成功!`)]);
    },
    /**
     * 解除游戏名绑定
     * @param {string} gameName 游戏名
     * @param {number} group 群号
     */
    unbind(gameName, group) {
        let bindinfo = bindConfig.get(gameName);
        if (typeof bindinfo == "undefined") {
            _sendGroupMsg(group, `[${gameName}]还未被成员绑定!`);
            return false;
        }
        bindConfig.delete(gameName);
        mc.runcmd(`allowlist remove "${gameName}"`);
        _sendGroupMsg(group, `[${gameName}] 成功解除绑定!`);
    },
    /**
     * 解析url接口自定义配置
     * @param {Object} urlc 配置对象
     * @param {string} group 群号
     */
    url(urlc, group) {
        if (urlc.method != "post" && urlc.method != "get") {
            _sendGroupMsg(group, ` 接口method错误只能 post/get 其中之一!`);
            return;
        }

        // get 直接访问的 图片
        if (urlc.method == "get" && urlc.direct) {
            _sendGroupMsg(group, yoyo.segment.image(urlc.url + '?' + urlc.data));
            return;
        }

        request(urlc.url, urlc.data, urlc.method).then(result => {
            if (!isJson(result)) {
                _sendGroupMsg(group, result);
                return;
                //不是json数据 直接返回 
            }
            result = JSON.parse(result);//进行json转对象
            let arrgather = [];
            let ArrayS = urlc.return.data;
            for (let index in ArrayS) {
                if (ArrayS[index].type == "text") {
                    if (typeof ArrayS[index].msg != "undefined") {
                        arrgather.push(yoyo.segment.text(ArrayS[index].msg));
                        continue;
                    }
                    arrgather.push(yoyo.segment.text(strToobj(result, ArrayS[index].path)));
                } else if (ArrayS[index].type == "image") {
                    arrgather.push(yoyo.segment.image(strToobj(result, ArrayS[index].path)));
                }
            }
            _sendGroupMsg(group, arrgather);
        })
            .catch(error => {
                _sendGroupMsg(group, ` 接口请求失败/或者配置参数错误!请检查`);
                logger.error('[正则扩展] URL 解析错误:', error);
            });
    }
};

mc.listen("onJoin", (pl) => {//进入服务器
    let plName = data.xuid2name(pl.xuid);
    let bindinfo = bindConfig.get(plName);
    if (bindinfo && bindinfo.xuid == '') {
        bindinfo.xuid = pl.xuid;
        bindConfig.set(plName, bindinfo);
    }
    if (config.get("functionSwitch").InAndOutOfTip) {
        config.get("group").forEach(groupid => {
            _sendGroupMsg(groupid, ` <${pl.realName}> 进入服务器!`);
        });
    }
});




mc.listen("onLeft", (pl) => {//退出服务器
    if (config.get("functionSwitch").InAndOutOfTip) {
        config.get("group").forEach(groupid => {
            _sendGroupMsg(groupid, ` <${pl.realName}> 退出服务器!`);
        });
    }
});

mc.listen("onChat", (pl, msg) => {
    if (config.get("functionSwitch").ChatForward) {
        config.get("group").forEach(groupid => {
            _sendGroupMsg(groupid, `<${pl.realName}> ${msg}`);
        });
    }
});

yoyo.listen("messageGroup", (e, c) => {
    //群聊
    let msg = getMsgPlain(e.message);//自定义解析
    let Limtgroup = config.get("group");
    let adminList = config.get("adminList");
    let regularList = config.get("regular");
    let isGroup = Limtgroup.filter(groupid => groupid == e.group_id);
    if (isGroup.length >= 1) {//对指定群进行操作
        // console.log(e);
        regularList.forEach(strSe => {
            let RegularOject = new RegExp(strSe.se);
            if (strSe.type == "group" && RegularOject.test(msg.text)) {
                if (strSe.op && adminList.filter(va => e.sender.user_id == va).length <= 0) return false;//是否管理员

                /* 执行MC指令 */
                if (typeof strSe.cmd != "undefined") {
                    //根据匹配的内容重组cmd字符
                    let NewCmd = strSe.cmd;
                    msg.text.replace(RegularOject, (...agexs) => {
                        for (let i = 1; i < (agexs.length - 2); i++) {
                            NewCmd = NewCmd.replace(`$${i}`, agexs[i]);
                        }
                    });

                    // 直接执行指令, 无返回，无动作
                    if (typeof strSe.result == "undefined" && typeof strSe.msg == "undefined") {
                        mc.runcmd(NewCmd);
                        return;
                    }

                    // 命令返回无格式  直接返回命令结果
                    else if (typeof strSe.result == "undefined" && typeof strSe.msg != "undefined") {

                        let newMsg = strSe.msg;
                        mc.runcmd(NewCmd);
                        msg.text.replace(RegularOject, (...agexs) => {
                            for (let i = 1; i < (agexs.length - 2); i++) {
                                newMsg = newMsg.replace(`$${i}`, agexs[i]);
                            }
                        });
                        _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n${newMsg}`)]);
                    }

                    // 命令返回有格式
                    else {//e.sender.asMember().card
                        //带返回匹配格式
                        let cmds = mc.runcmdEx(NewCmd).output;//
                        let seObj = new RegExp(strSe.result, 'g');
                        let sendMsg = cmds.replace(seObj, (...ages) => {
                            let text = strSe.msg;
                            for (let i = 1; i < (ages.length - 2); i++) {
                                text = text.replace(`$${i}`, ages[i]);
                            }
                            return text;
                        });
                        _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n${sendMsg}`)]);
                    }
                }

                /* 调用自定义函数 */
                else if (typeof strSe.fun != "undefined") {
                    switch (strSe.fun) {
                        case "tellAll":
                            let msgText = msg.text.replace(new RegExp(strSe.se, 'g'), (...ages) => {
                                let text = strSe.msg;
                                for (let i = 1; i < (ages.length - 2); i++) {
                                    text = text.replace(`$${i}`, ages[i]);
                                }
                                return text;
                            });

                            msgText = msgText.replace(/{user.name}/g, e?.sender?.card != "" ? e?.sender?.card : e?.sender?.nickname);
                            msgText = msgText.replace(/{user.id}/g, e.sender.user_id);
                            msgText = msgText.replace(/{group.id}/g, e.group_id);
                            msgText = msgText.replace(/{group.name}/g, e.group_name);
                            funs.tellAll(msgText);
                            break;
                        case "serverInfo":
                            funs.serverInfo(strSe.msg, e.group_id);
                            break;
                        case "bind":
                            // result 为游戏昵称
                            var result = srString(strSe.msg, msg.text, strSe.se);//替换msg 的 $1 ~
                            funs.bind(String(e.sender.user_id), result, e.group_id);
                            break;
                        case "unbind":
                            var result = srString(strSe.msg, msg.text, strSe.se);
                            funs.unbind(result, e.group_id);
                            break;
                        case "transfer"://转账
                            var result = srString(strSe.msg, msg.text, strSe.se);
                            var pl = [];
                            pl[0] = selectGameName(e.sender.user_id);
                            if (pl[0] == null) {//当前玩家未绑定
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n你未绑定游戏名!无法使用该功能!`)]);
                                return;
                            }
                            if (!pl[0].isMoney) {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n你未启用QQ群聊经济系统,请在游戏内输入 /qq omy 来开启功能!`)]);
                                return;
                            }
                            //查询被艾特的玩家
                            var piText = msg.text.match(RegularOject);//获取正则的qq

                            pl[1] = selectGameName(piText[1]);
                            if (pl[1] == null) {//当前玩家未绑定
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n目标玩家未绑定游戏名!无法对TA使用该功能!`)]);
                                return;
                            }
                            result = result.replace(/{bind.name}/g, pl[1].bindName);//替换绑定的名称
                            if (pl[1].xuid == "") {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n目标玩家未进过服务器!无法对TA使用该功能!`)]);
                                return;
                            }
                            if (pl[0].xuid == "") {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n您还未进过服务器!无法使用该功能!`)]);
                                return;
                            }
                            if (pl[0].xuid == pl[1].xuid) {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n你不能对自己发起转账!`)]);
                                return;
                            }
                            funs.transfer(pl[0].xuid, pl[1].xuid, Number(piText[2]), result, e.group_id);
                            break;
                        case "DeductMoney"://扣钱
                            var pl = '';
                            var result = srString(strSe.msg, msg.text, strSe.se);
                            var piText = msg.text.match(RegularOject);//获取正则的qq

                            pl = selectGameName(piText[1]);
                            if (pl == null) {//当前玩家未绑定
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n目标玩家未绑定游戏名!无法对TA使用该功能!`)]);
                                return;
                            }
                            result = result.replace(/{bind.name}/g, pl.bindName);//替换绑定的名称
                            if (pl.xuid == "") {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n目标玩家未进过服务器!无法对TA使用该功能!`)]);
                                return;
                            }
                            funs.DeductMoney(pl.xuid, Number(piText[2]), result, e.group_id);
                            break;
                        case "AddMoney"://加钱
                            var pl = '';
                            var result = srString(strSe.msg, msg.text, strSe.se);
                            var piText = msg.text.match(RegularOject);//获取正则的qq

                            pl = selectGameName(piText[1]);
                            if (pl == null) {//当前玩家未绑定
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n目标玩家未绑定游戏名!无法对TA使用该功能!`)]);
                                return;
                            }
                            result = result.replace(/{bind.name}/g, pl.bindName);//替换绑定的名称
                            if (pl.xuid == "") {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n目标玩家未进过服务器!无法对TA使用该功能!`)]);
                                return;
                            }
                            funs.AddMoney(pl.xuid, Number(piText[2]), result, e.group_id);
                            break;
                        case "TheBalanceOf"://查看余额
                            var result = srString(strSe.msg, msg.text, strSe.se);
                            var pl = '';
                            pl = selectGameName(e.sender.user_id);
                            if (pl == null) {//当前玩家未绑定
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n你未绑定游戏名!无法使用该功能!`)]);
                                return;
                            }
                            if (!pl.isMoney) {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n你未启用QQ群聊经济系统,请在游戏内输入 /qq omy 来开启功能!`)]);
                                return;
                            }
                            if (pl.xuid == "") {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n你都未进过服务器!余额百分百是0!`)]);
                                return;
                            }
                            result = result.replace(/{bind.name}/g, pl.bindName);//替换绑定的名称

                            funs.TheBalanceOf(pl.xuid, result, e.group_id);
                            break;

                        case "url":
                            //解析url请求

                            let urlType = strSe.msg;//获取配置类型
                            let urlc = urlConfig.get(urlType);
                            if (typeof urlc == "undefined") {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n该接口解析未配置!`)]);
                                return;
                            }
                            urlc.data = srString(urlc.data, msg.text, strSe.se);//解析正则的信息
                            urlc.data = encodeURIComponent(urlc.data);

                            urlc.data = batchReplace({
                                '%3D': '=',
                                '%26': '&',
                                '%7B': '{',
                                '%7D': '}'
                            }, urlc.data);

                            // 图片
                            urlc.data = urlc.data.replace(/\{image\}/g, msg.image[0]);
                            funs.url(urlc, e.group_id);
                            break;
                        case "check":
                            // result 为游戏昵称
                            var result = srString(strSe.msg, msg.text, strSe.se);//替换msg 的 $1 ~
                            let bindinfo = bindConfig.get(result);
                            if (typeof bindinfo != "undefined") {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n查询玩家\n[${result}]\nQQ: ${bindinfo.qq}\nQQ群经济: ${bindinfo.isMoney ? '开启' : '关闭'}`)]);
                            } else {
                                _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text(`\n这个游戏名未绑定成员!`)]);
                            }
                            break;
                    }
                }

                /* 机器人聊天：返回群消息 */
                else if (typeof strSe.msg != "undefined") {
                    // 确定的消息
                    if (typeof strSe.msg == "string") {
                        let reply = srString(strSe.msg, msg.text, strSe.se);
                        _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text('\n' + reply)]);
                    }

                    // 随机内容
                    else if (Array.isArray(strSe.msg)) {
                        let reply = strSe.msg[Math.floor(Math.random() * strSe.msg.length)];
                        reply = srString(reply, msg.text, strSe.se);
                        _sendGroupMsg(e.group_id, [yoyo.segment.at(e.sender.user_id), yoyo.segment.text('\n' + reply)]);
                    }
                    else {
                        colorLog("red", "[YoyoRobot][正则配置] 错误的msg类型");
                    }
                    return;
                }

                else {
                    colorLog("red", "[YoyoRobot][正则配置] 错误的配置指令");
                }
            }
        });
    }
});

mc.listen("onConsoleOutput", (cmd) => {
    let regularList = config.get("regular");
    regularList.forEach(strSe => {
        if (strSe.type == "cmd") {//过滤只执行cmd类型的
            let regexS = new RegExp(strSe.se);
            if (regexS.test(cmd)) {

                let msgs = strSe.msg.replace(/\$(\d)/g, (...args) => {
                    return regexS.exec(cmd)[Number(args[1])];
                });

                // let msgs = cmd.replace(regexS, (...ages) => {
                //     let text = strSe.msg;
                //     for (let i = 1; i < (ages.length - 2); i++) {
                //         text = text.replace(`$${i}`, ages[i]);
                //     }
                //     return text;
                // });
                config.get("group").forEach(groupid => {
                    _sendGroupMsg(groupid, msgs);
                });
            }
        }
    });
});

/* 监听成员 离群 和 被踢 */
yoyo.listen("noticeGroupDecrease", MembersLeave);

function MembersLeave(e, c) {
    let Limtgroup = config.get("group");
    let stray = config.get("stray");//获取离开的操作
    let isGroup = Limtgroup.filter(groupid => groupid == e.group_id);
    if (isGroup.length >= 1) {//对指定群进行操作
        let memberName = e?.member?.card != "" ? e?.member?.card : e?.member?.nickname;
        log(`成员 [${memberName}] 离开了群聊!`); //测试
        let SwitchArr = config.get("functionSwitch");

        if (SwitchArr.OutGroupBlacklist) {
            //开启离群加入黑名单
            let AddGroupAgreed = config.get('AddGroupAgreed');
            AddGroupAgreed.blacklist.push(String(e.user_id));
            config.set('AddGroupAgreed', AddGroupAgreed);
        }
        stray.forEach(v => {
            if (v.type == "cmd") {
                let cmds = v.cmd;
                let playerInfo = getBind(e.user_id);
                if (playerInfo) {
                    cmds = cmds.replace(/{bind.name}/g, playerInfo.bindName);
                    bindConfig.delete(playerInfo.bindName);//解除绑定
                    _sendGroupMsg(e.group_id, `成员 [${memberName}] 已离群\n游戏名 <${playerInfo.bindName}> 自动解绑`);
                }
                mc.runcmd(cmds);
            } else if (v.type == "group") {
                let msg;
                msg = v.msg.replace(/{user.name}/g, memberName);
                msg = msg.replace(/[\s]/g, '');
                _sendGroupMsg(e.group_id, `${msg}`);
            }
        });
    }
}


yoyo.listen("requestGroupAdd", (e, c) => {
    let Limtgroup = config.get("group");
    let AddGroupAgreed = config.get("AddGroupAgreed");
    let isGroup = Limtgroup.filter(groupid => groupid == e.group_id);
    if (isGroup.length >= 1 && config.get("functionSwitch").AddGroupAgreed) {
        let black = AddGroupAgreed.blacklist.filter(v => v == e.user_id);
        if (black.length <= 0) {
            c.setGroupAddRequest(e.flag, true);
        } else {
            c.setGroupAddRequest(e.flag, false, "你已经被管理员加入黑名单, 拒绝入群!");
            log(`[YoyoRobot][正则插件] ${e.user_id} 已经在群申请黑名单 已自动拒绝入群!`);
        }
    }
});

/**
 * 
 * @param {string} msg 预定消息
 * @param {string} text 实际消息
 * @param {string} se 正则表达式
 * @returns {string} 替换好的信息
 */
// '你好 $1', '我叫 李华', '^我叫 (.*)$' -> '你好 李华'
function srString(msg, text, se) {
    let RegularOject = new RegExp(se);
    let gameName = msg;
    text.replace(RegularOject, (...ages) => {
        for (let i = 1; i < (ages.length - 2); i++) {
            gameName = gameName.replace(`$${i}`, ages[i]);
        }
    });
    return gameName;
}

/**
 * 
 * @param {number} qq 成员qq号
 * @returns {string|null} 成员绑定的玩家对象
 */
function selectGameName(qq) {
    return getBind(qq);
}


/**
 * 请求方法
 * @param {string} url 
 * @param {string} data 
 * @param {string} type   post | get
 */
function request(url, data, type = 'get') {
    return new Promise((resolve, reject) => {
        if (type == "post") {
            network.httpPost(url, data, 'application/x-www-form-urlencoded', (status, result) => {
                if (status != 200) {
                    reject();
                    return;
                }
                resolve(result);
            });
        } else {
            network.httpGet(url + '?' + data, (status, result) => {
                log(result);
                if (status != 200) {
                    reject();
                    return;
                }
                resolve(result);
            });
        }
    });
}

/**
 * 取值
 * @param {object} obj 对象
 * @param {string} str 数据连接
 * @returns 
 */
function strToobj(obj, str) {
    str.split(".").forEach(v => {
        obj = obj[v];
    });
    return obj;
}
/*  */


log('[YoyoRobot]正则插件v' + versions);
if (config.get("functionSwitch").ChatForward) {
    config.get("group").forEach(groupid => {
        // _sendGroupMsg(groupid, yoyo.segment.text(`服务器已启动!`));
    });
}

/**
 * 自定义解析消息适配的
 * @param {*} MsgArr 
 * @returns 
 */
function getMsgPlain(MsgArr) {
    // 解析msg信息!
    let msg = {
        id: null,
        time: null,
        image: [],
        text: ''
    };
    MsgArr.forEach(v => {
        if (v.type == "source") {
            msg.id = v.id;
            msg.time = v.time;
        }
        if (v.type == "text") {
            msg.text += v.text;
        }
        if (v.type == "face") {
            msg.text += `[${v.text}]`;
        }
        if (v.type == "image") {
            msg.image.push(v.url);
        }
        if (v.type == "at") {
            msg.text += `@${v.qq}`;
        }
    });
    return msg;
}

function _sendGroupMsg(...ages) {
    yoyo.client.sendGroupMsg(...ages).catch(err => {
        logger.error(err);
    });
}

/**
 * 通过qq查当前信息
 * @param {*} qq 
 */
function getBind(qq) {
    let bindConfigAll = bindConfig.read();
    try {
        let bindConfigAllObj = JSON.parse(bindConfigAll);
        for (let index in bindConfigAllObj) {
            if (bindConfigAllObj[index].qq == qq) {
                return { bindName: index, ...bindConfigAllObj[index] };
            }
        }
        return null;
    } catch (error) {
        logger.error('[正则扩展] bind.json 格式错误拉!');
        return null;
    }

}

function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 对象 对应批量替换
 * @param {Object} Objdata 
 * @param {String} str 
 * @returns {String}
 */
function batchReplace(Objdata, str) {
    str = String(str);
    if (typeof Objdata != 'object') {
        return '';
    }
    let keyArr = Object.keys(Objdata);
    keyArr.forEach(v => {
        str = str.replaceAll(v, Objdata[v]);
    });
    return str;
}