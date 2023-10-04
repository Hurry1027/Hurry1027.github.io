/*
    checkConfig() 更换config_cfg
    单抽开始初始化玩家连抽数:
    if (PlayerTemp[pl.xuid].combos[pool] == null){
        PlayerTemp[pl.xuid].combos[pool] = 0; 
    }
    取消配置文件检查完成提示
*/

/*
    传递变量
*/
var Config ={}, SNBTdata={}, CardPool={}, test_rewardList={};
let Pray;
let INFO = {
    name: "LuckyPray",
    intro: "幸运祈愿",
    version: [1, 2, 1],
    other: {
        auth: "Wn1027",
        group_QQ: "311860068",
    }
};


var log = (...args)=>{
    let prayConsole =  document.getElementById('prayConsole');
    if (prayConsole.childNodes.length >1000){
        prayConsole.childNodes[0].remove();
    }
    let p = document.createElement("p");
    // let span = document.createElement("span")
	p.innerText = String(...args)+'\n';
	prayConsole.appendChild(p);
    //console.log(...args);
};
var pl = {
    realName: "抽奖测试",
    xuid: "12345",
    tell(text){
        log(text);
    }
};
var LogEnabled = true;
let TotalCount = 0;
let GetItCount = 0;
let Statistic = {};

// 单抽
var PlayerTemp = {
    "12345": {
        "realName":"Wn1027", 
        "combos": {
        },
        "PrayCount": 0,
        "DrawInfoTemp":[],
        "PrayCountPool": {
            
        }
    }
};



// 检查配置是否正确
function checkConfig(){
    let result = true;

    // 检查祈愿GUI唤起物品
    if (Config['guiItem'].snbt != null && Config['guiItem'].snbt != ""){
        if (findSnbtData(Config['guiItem'].snbt) == undefined){
            log(`[Config.json] "guiItem"项 祈愿gui唤起物品配置错误, SNBT数据库中找不到: ${Config['guiItem'].snbt}`);
            result = false;
        }
    }

    //检查奖品等级基本配置
    let levelList = [];
    for (let level of Config.level){
        if (typeof(Number(level.index)) != 'number'){
            log(`[Config.json] 奖品等级index ${level.index} 配置错误, 须为数字字符串, 例如 "0"、"-3"、 "5"`);
            result = false;
        }
        if (!levelList.includes(level.index)){
            levelList.push(level.index);
        }else{
            log(`[Config.json] 重复的奖品等级index ${level.index}`);
            result = false;
        }
    }

    

    for (let key in CardPool){
        let pool = CardPool[key];
        // 检查祈愿消耗物品
        checkRewardItem(pool.prayItem);

        // 检查奖池奖品设置
        let rewardIndexList = [];
        for (let rewardLevel in pool.rewards){
            //检查奖池的奖品等级存在于Config中
            if (!levelList.includes(rewardLevel)){
                log(`[CardPool.json] 在Config.json中没有找到该奖品等级index: ${rewardLevel} | "${key}" 奖池`);
                result = false;
            }else{
                let levelPool = pool.rewards[rewardLevel];
                for (let reward of levelPool){
                    if (reward.index == undefined){
                        log(`[CardPool.json] ${rewardLevel} 等级的某奖品"index"项不能为空 | "${key}"/"${rewardLevel}"`);
                        result = false;
                        continue;
                    }
                    if (!rewardIndexList.includes(reward.index)){
                        rewardIndexList.push(reward.index);
                    }else{
                        log(`[CardPool.json] 奖品<${reward.index}>重复, 同一个奖池中奖品"index"项不能重复 | "${key}"/"${rewardLevel}"/"${reward.index}"`);
                        result = false;
                    }

                    //检查MC物品配置
                    for (let rewardItem of reward.rewardItems){
                        checkRewardItem(rewardItem);
                    }
                }
                
            }
        }

        // 检查奖池当期目标奖品
        if (pool.aimReward.length == 0){
            log(`[CardPool.json] 目标奖品池("aimReward"项)不能为空 | "${key}" 奖池`);
            result = false;
        }else{
            for (let aim of pool.aimReward){
                if (!rewardIndexList.includes(aim)){
                    log(`[CardPool.json] 目标奖品池("aimReward"项)中的奖项 需要在当期奖池中, 请填写奖品的index | "${key}" 奖池`);
                    result = false;
                }
            }
        }
        
        // 检查奖池连抽规则配置
        let combos = Infinity;
        for (let regular of pool.regulars){
            if (regular.combos <= combos){
                combos = regular.combos;
            }else{
                log(`[CardPool.json] "regular"项错误, ${regular.name} 位置有误, 多个抽奖规则应按"combos"项(连抽数)由大到小排序 | "${key}"/"${regular.name}"`);
                result = false;
            }
            if (regular.level == undefined){
                log(`[CardPool.json] "regular"项错误, ${regular.name} 规则触发的奖品等级("level"项)不能为空 | "${key}"/"${regular.name}"`);
                result = false;
            }else {
                for (let levelIndex of regular.level){
                    if (!levelList.includes(levelIndex)){
                        log(`[CardPool.json] "regular"项错误, ${regular.name}规则的"level"项, 在Config.json中找不到该奖品等级 ${levelIndex} | "${key}"/"${regular.name}"`);
                        result = false;
                    }
                }
            }
        }
    }
    
    //检查物品json配置
    function checkRewardItem(itemObj){
        if (!["itemAux", "itemSnbt", "money", "lootTable", "scoreboard"].includes(itemObj.mode)){
            log(`[CardPool.json] 物品JSON配置错误, "mode" 须为 "itemAux", "itemSnbt", "money", "lootTable" 中的一种`);
            log(itemObj);
            result = false;
        }
        switch(itemObj.mode){
            case "itemAux":
                if ([itemObj.name, itemObj.type, itemObj.aux, itemObj.count].includes(undefined)){
                    log(`[CardPool.json] 物品JSON配置错误, "mode" 为 "itemAux" 时，须有"name", "type", "aux", "count" 参数`);
                    log(itemObj);
                    result = false;
                }
                break;
            case "itemSnbt":
                if ([itemObj.name, itemObj.snbt].includes(undefined)){
                    log(`[CardPool.json] 物品JSON配置错误, "mode" 为 "itemSnbt" 时，须有"name", "snbt" 参数`);
                    log(itemObj);
                    result = false;
                    break;
                }
                if (findSnbtData(itemObj.snbt) == undefined){
                    log(`[CardPool.json] 没有在SNBT数据库中找到相应的snbt: "${itemObj.snbt}"`);
                    log(itemObj);
                    result = false;
                }
                break;

            case "money":
                if ([itemObj.name, itemObj.count].includes(undefined)){
                    log(`[CardPool.json] 物品JSON配置错误, "mode" 为 "money" 时，须有"name", "count" 参数`);
                    log(itemObj);
                    result = false;
                }
                break;

            case "scoreboard":
                if ([itemObj.name, itemObj.obName, itemObj.count].includes(undefined)){
                    log(`[CardPool.json] 物品JSON配置错误, "mode" 为 "scoreboard" 时，须有"name", "obName", "count" 参数`);
                    log(itemObj);
                    result = false;
                }else{
                    if (mc.getScoreObjective(itemObj.obName) == null){
                        log(`[CardPool.json] 物品JSON配置错误, 名为 "${itemObj.obName}" 的计分项没有创建`);
                        log(itemObj);
                    }
                }
                break;
        }
    }

    if (result){
        log(`-- 配置文件检查完成 --`);
    }
    return result;
}


// 单抽
function Singledraw(pl, pool){  
    let DrawInfo = { //抽奖信息
        pool: pool,
        reward: undefined, //奖品
        regular: undefined, //触发规则
        level: undefined,
        isHit: false //是否命中当期奖品
    }; 

    
    // 玩家信息初始化
    if (PlayerTemp[pl.xuid].combos[pool] == null){
        PlayerTemp[pl.xuid].combos[pool] = 0;
    }
    if (PlayerTemp[pl.xuid].PrayCountPool[pool] == null){
        PlayerTemp[pl.xuid].PrayCountPool[pool] = 0;
    }

    // 连抽判断
    let combos = PlayerTemp[pl.xuid].combos[pool];
    for (let regular of CardPool[pool].regulars){
        if(combos != 0 && (combos+1) % regular.combos == 0){            
            //抽取掉落等级
            let objList = [];
            for (let l of regular.level){
                for (let level of Config.level){
                    if (String(l) == String(level.index)){
                        objList.push(level);
                    }
                }
            }
            let rewardLevel = drawOfProbability(JSON.parse(JSON.stringify(objList))).index; 

            //对应的掉落物品
            if (regular.reward == null){
                let levelPool = CardPool[pool].rewards[rewardLevel];
                if (levelPool == undefined){
                    log(`error ${rewardLevel} 等级的奖品不存在`);
                }
                DrawInfo.reward = drawOfProbability(levelPool);
                DrawInfo.regular = regular.name;
                DrawInfo.level = rewardLevel;
            }else{
                DrawInfo.reward = index2Reward(pool, regular.level, regular.reward);
                DrawInfo.regular = regular.name;
                DrawInfo.level = rewardLevel;
            }

            endDraw(pl, DrawInfo);
            return DrawInfo;
        }
    }

    // 普通抽卡
    let objList = [];
    for (let l in CardPool[pool].rewards){
        for (let level of Config.level){
            if (l == String(level.index)){
                objList.push(level);
            }
        }
    }
    let rewardLevel = drawOfProbability(JSON.parse(JSON.stringify(objList))).index;  // 按概率掉落等级
    let levelPool = CardPool[pool].rewards[rewardLevel];
    DrawInfo.reward = drawOfProbability(levelPool); //按概率掉落等级内的奖品
    DrawInfo.level = rewardLevel;
    endDraw(pl, DrawInfo);
    return DrawInfo;
}

// 结束抽奖
function endDraw(pl, DrawInfo){
    /*
    let DrawInfo = { //抽奖信息
        pool: pool,
        reward: {}, //奖品
        regular: "", //触发规则
        level: "" // levelindex
    }; 
    */
    PlayerTemp[pl.xuid].combos[DrawInfo.pool]++; //
    //PlayerTemp[pl.xuid].PrayCount++;
    PlayerTemp[pl.xuid].PrayCountPool[DrawInfo.pool]++;
    Statistic[DrawInfo.pool]['总抽数'] ++;
    TotalCount = Statistic[DrawInfo.pool]['总抽数'];

    // 抽到当期目标奖品->重置连抽次数
    for (let aim of CardPool[DrawInfo.pool].aimReward){
        if (DrawInfo.reward.index == aim){
            Statistic[DrawInfo.pool]['命中UP'] ++;
            GetItCount = Statistic[DrawInfo.pool]['命中UP'];
            DrawInfo.isHit = true;
            PlayerTemp[pl.xuid].combos[DrawInfo.pool] = 0;
        }
    }

    if (DrawInfo.regular == undefined){
        log(`[${TotalCount}] ${rewardLevel2name(DrawInfo.level)} ${DrawInfo.reward.name} | 连抽: ${String(PlayerTemp[pl.xuid].combos[DrawInfo.pool]).padEnd(4)} | 命中UP: ${GetItCount} | UP率: ${(GetItCount/TotalCount*100).toFixed(3)} %`);
    }else{
        if (Statistic[DrawInfo.pool]['保底'][DrawInfo.regular] == null){Statistic[DrawInfo.pool]['保底'][DrawInfo.regular] = 0;}
        Statistic[DrawInfo.pool]['保底'][DrawInfo.regular] ++;
        log(`[${TotalCount}] ${rewardLevel2name(DrawInfo.level)} ${DrawInfo.reward.name} | 连抽: ${String(PlayerTemp[pl.xuid].combos[DrawInfo.pool]).padEnd(4)} | 命中UP: ${GetItCount} | UP率: ${(GetItCount/TotalCount*100).toFixed(3)} % | 触发规则: ${DrawInfo.regular}`);
    }

    // 指定奖品计数
    // if (test_rewardList[DrawInfo.pool] != null && test_rewardList[DrawInfo.pool].includes(DrawInfo.reward.index)){
        let index = DrawInfo.reward.index;
        if (Statistic[DrawInfo.pool]['奖品'][index] == null){Statistic[DrawInfo.pool]['奖品'][index] = 0;}
        Statistic[DrawInfo.pool]['奖品'][index] ++;
    // }

    return Statistic;
}

//====================================
// 小功能函数

// 依概率选择掉落对象 [{index:"1", probability:50}, {index:"2", probability:10}]
function drawOfProbability(objList){
    let roll = random(1, 10000);
    let probabilitys = [];
    for (let obj of objList){
        probabilitys.push(obj.probability);
    }
    let sum = probabilitys.reduce((total, value)=>{return total + value;}, 0);
    let probability = 0;

    for (let obj of objList){
        probability += Math.ceil(obj.probability/sum*10000);
        //log(`抽卡中.. | 概率堆: ${probability}`);
        if (roll <= probability){
            //log(`抽卡等级: ${level} | 概率堆: ${probability}`);
            return obj;
        }
    }
    return false;
}

// 给予玩家不同类型的奖励
function giveReward(pl, rewardItems){
    let result = false;
    for (let rewardItem of rewardItems){
        switch(rewardItem.mode){
            case "itemSnbt": 
                addNbtItem(pl, findSnbtData(rewardItem.snbt), rewardItem.count);
                result = true;
                break;
            case "itemAux": 
                result = mc.runcmdEx(`execute as "${pl.realName}" at @s run give @s ${rewardItem.type} ${rewardItem.count} ${rewardItem.aux}`).success;
                break;
            case "lootTable": 
                result = mc.runcmdEx(`execute as "${pl.realName}" at @s run loot spawn ${pl.blockPos.x} ${pl.blockPos.y} ${pl.blockPos.z} loot "${rewardItem.lootTable}"`).success;
                break;
            case "money":
                result = pl.addMoney(rewardItem.count);
                break;
            case "scoreboard":
                result = mc.addPlayerScore(pl.uuid, rewardItem.obName, rewardItem.count);
                break;
        }
    }
    return result;
}


// 单次祈愿物品数量
function singlePrayItemCount(pool){
    let prayItem = CardPool[pool].prayItem;
    let result;
    switch(prayItem.mode){
        case "itemSnbt": 
            let snbt = findSnbtData(prayItem.snbt);
            result = mc.newItem(NBT.parseSNBT(snbt)).count;
            break;
        case "itemAux":
            result = prayItem.count;
            break;
        case "money":
            result = prayItem.count;
            break;
        case "scoreboard":
            result = prayItem.count;
            break;
    }
    return result;
}

// 消耗祈愿物品
function expendPrayItem(pl, prayItem, prayCount){
    let result = false;
    switch(prayItem.mode){
        case "itemSnbt": 
            let snbt = findSnbtData(prayItem.snbt);
            let count = mc.newItem(NBT.parseSNBT(snbt)).count;
            if (CountOfSnbtItems(pl, snbt) >= count * prayCount){
                removeNbtItem(pl, snbt, count * prayCount);
                result = true;
            }
            break;
        case "itemAux":
            if (CountOfAuxItems(pl, prayItem.type, prayItem.aux) >= prayItem.count * prayCount){
                result = mc.runcmdEx(`clear "${pl.realName}" ${prayItem.type} ${prayItem.aux} ${prayItem.count * prayCount}`).success;
                if (result == false){
                    pl.tell(`§c消耗祈愿物品错误 命令/clear错误`);
                }
            }
            break;
        case "money":
            if (pl.getMoney() >= prayItem.count * prayCount){
                result = pl.reduceMoney(prayItem.count * prayCount);
                if (result == false){
                    pl.tell(`§c消耗祈愿物品错误 玩家金额错误`);
                }
            }
            break;
        case "scoreboard":
            let ob = mc.getScoreObjective(prayItem.obName);
            if (mc.getScoreObjective(prayItem.obName) != null){
                if (pl.getScore(prayItem.obName) >=  prayItem.count * prayCount){
                    result = pl.reduceScore(prayItem.obName, prayItem.count * prayCount);
                    if (result == false){
                        pl.tell(`§c消耗祈愿物品错误 玩家分数减少错误`);
                    }
                }
            }
            break;
    }
    return result;
}

// 在SNBT数据库中寻找对应名字的snbt
function findSnbtData(snbtName){
    for (let key in SNBTdata){
        if (snbtName in SNBTdata[key]){
            return SNBTdata[key][snbtName].snbt;
        }
    }
    return undefined;
}

// 根据奖品索引名 查找奖品
function index2Reward(pool, level, index){
    let levelPool = CardPool[pool].rewards[level];
    for (let reward of levelPool){
        if (reward.index == index){
            return reward;
        }
    }
}
// 根据奖励登记 返回 奖励等级字符串
function rewardLevel2name(rewardLevel){
    for (let l of Config.level){
        if (rewardLevel == l.index){
            return l.name;
        }
    }
}
// 根据奖励等级 返回 奖励等级颜色代码
function rewardLevel2color(rewardLevel){
    for (let l of Config.level){
        if (rewardLevel == l.index){
            return l.color;
        }
    }
}
// 根据奖励等级 返回 音效
function rewardLevel2sound(rewardLevel){
    for (let l of Config.level){
        if (rewardLevel == l.index){
            return l.sound;
        }
    }
}
// 根据奖励等级 返回 概率
function rewardLevel2probability(rewardLevel){
    for (let l of Config.level){
        if (rewardLevel == l.index){
            return l.probability;
        }
    }
}

//返回随机数
function random(m, n){
    if (m>n){return console.error(`random error, a must < b`);}
    return Math.floor(Math.random()*(n+1-m)+m);
}

// 获取当前时间字符串
function nowDateStr(){
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

// 解析时间字符串
function parseDateStr(DateStr){
    let list = DateStr.split('-');
    list[1] --;
    return new Date(...list);
}

// 获取当天日期字符串
function nowDayStr(){
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}




Pray = {
    drawTest(poolkey, count){
        if (count > 10000){
            alert('单次测试须小于10000次');
            return Statistic;
        }
        log('=====================================');
        if (!Pray.checkConfig()){return Statistic;}
        log('开始祈愿测试...');

        if (Statistic[poolkey] == null){
            Statistic[poolkey] = {
                '总抽数': 0,
                '命中UP': 0,
                '保底': {},
                '奖品':{}
            };
        }
        for (let i = 0; i< count; i++){
            Singledraw(pl, poolkey);
        }
        let prayConsole =  document.getElementById('prayConsole');
        prayConsole.scrollTop = prayConsole.scrollHeight;
        return Statistic;
    },

    checkConfig(){
        return checkConfig();
    },

    statisticClean(poolkey){
        delete PlayerTemp[pl.xuid].combos[poolkey];
        delete Statistic[poolkey];
        return Statistic;
    },

    test(){
        log(`${Object.keys(CardPool)[0]}`);
    }
};


// export default Pray;



/* 
consoleInput();
function consoleInput(){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (text) {
        var cmd = text.split(/\s+/)[0];
        var args = text.split(/\s+/).slice(1);

        switch (cmd){
            case 'stop':
                done();
                break;
            case 'pray':
                if (args[1] != undefined && args[0] in CardPool){
                    for (let i = 0; i< Number(args[1]); i++){
                        Singledraw(pl, args[0]);
                    }
                }else{
                    log(`参数错误, 奖池不存在或未指定次数`);
                }
                
                break;
            case 'pl':
                log(PlayerTemp[pl.xuid]);
                break;
            case 'check':
                checkConfig();
                break;
            case 'eval':
                try{
                    eval(args.join(" "));
                }catch(e){
                    log( e );
                }
                break;
            default:
                log(`"${cmd}" 不是一个有效的命令.`);
                break;

        }       
    });

    function done() {
      console.log('programing quit.');
      process.exit();
    }
} 
*/

setTimeout(() => {
    log(`==================================================`);
    log(`——-- 祈愿概率测试程序 | 适配祈愿插件v${INFO.version}--——`);
    log(`==================================================`);
},1000);


// log("将编辑好的Config.json、 SNBTdata.json、 CardPool.json 的内容复制到本js文件开头对应的变量中。");
// log("命令说明: ");
// log("pray 活动卡池1 100  :  在 活动卡池1 抽100次");
// log("pl  :  查看PlayerTemp.json");