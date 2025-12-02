const Config_default = {
    "guiItem": {         // 打开祈愿GUI的物品
        "type": "minecraft:nether_star",
        "snbt": "原石"   // 可以为空: ""
    },
    "praySound": "place.small_amethyst_bud", // 祈愿中的音效
    "broadcastLevel": "5",  // 祈愿出金全服播报等级
    "level": [
        {
            "index": "1",         // 索引, 用于唯一识别此祈愿等级, 需为数字字符串
            "name": "§e✿",       // 祈愿等级图标
            "color": "§r",        // 祈愿等级颜色
            "sound": "chime.amethyst_block",     // 暂时无用
            "probability": 30                 // 祈愿等级基础概率, 按比例计算, 但建议总和为100
        },
        {
            "index": "2",
            "name": "§e✿✿",
            "color": "§a",
            "sound": "chime.amethyst_block",
            "probability": 94.3
        },
        {
            "index": "3",
            "name": "§e✿✿✿",
            "color": "§b",
            "sound": "chime.amethyst_block",
            "probability": 94.3
        },
        {
            "index": "4",
            "name": "§e✿✿✿✿",
            "color": "§d",
            "sound": "chime.amethyst_block",
            "probability": 5.1
        },
        {
            "index": "5",
            "name": "§e✿✿✿✿✿",
            "color": "§c",
            "sound": "chime.amethyst_block",
            "probability": 0.6
        }
    ],
    "today": nowDateStr(),
    "ver": [1, 3, 0]
};

function nowDateStr(){
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}