

let config = {
    group: [],//监听群
    adminList: [],//管理员
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
};

