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
let praying = {};
let INFO = {
    name: "LuckyPray",
    intro: "幸运祈愿",
    version: [1, 3, 0],
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
let Statistic = {
    '玩家统计': {},
    '奖品统计': {}
};

// 单抽
var PlayerTemp = {
    "12345": {
        "realName":"Wn1027", 
        "statistic":{
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

        
        // 检查奖池连抽规则配置
        let combos = Infinity;
        for (let regular of pool.regulars){
            if (regular.combos <= combos){
                combos = regular.combos;
            }else{
                logger.error(`[CardPool.json] "regulars"项错误, ${regular.name} 顺序排列有误, 多个保底规则应按"combos"项(连抽数)由大到小排序 | "${key}"/"${regular.name}"`);
                result = false;
            }
            if (regular.threshold > regular.combos){
                logger.error(`[CardPool.json] "regulars"项错误, ${regular.name} 规则的阈值抽数("threhold")应小于保底抽数("combos") | "${key}"/"${regular.name}"`);
                result = false;
            }
            if (regular.level == undefined){
                logger.error(`[CardPool.json] "regulars"项错误, ${regular.name} 规则触发的奖品等级("level"项)不能为空 | "${key}"/"${regular.name}"`);
                result = false;
            }else {
                if (!levelList.includes(regular.level)){
                    logger.error(`[CardPool.json] "regulars"项错误, ${regular.name}规则的"level"项, 在Config.json中找不到该奖品等级 ${regular.level} | "${key}"/"${regular.name}"`);
                    result = false;
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
    
    // 卡池记录信息初始化
    // if (PlayerTemp[pl.xuid].combos[pool] == null){
    //     PlayerTemp[pl.xuid].combos[pool] = 0; //本卡池总抽数
    // }
    

    // 组建等级概率池
    let objList = [];
    for (let l in CardPool[pool].rewards){
        for (let level of Config.level){
            if (l == String(level.index)){
                objList.push(level);
            }
        }
    }

    // 按概率掉落等级
    let rewardLevel = drawOfProbability(JSON.parse(JSON.stringify(objList))).index;
    DrawInfo.level = rewardLevel;

    // 触发等级保底规则
    for (let regular of CardPool[pool].regulars){
        let player_regular_temp = PlayerTemp[pl.xuid].statistic[pool].regulars[regular.name]; // 玩家在该卡池该保底规则统计数据

        //触发概率递增
        let plus = 0; 
        if ((player_regular_temp.combos+1) >= regular.threshold){
            if ((player_regular_temp.combos+1) >= regular.combos){
                plus = 1;
            }else{
                plus = ((player_regular_temp.combos+1) - regular.threshold + 1) * (1/(regular.combos - regular.threshold));
            }
            //概率重分配并重掉落
            let newObjList = resetProbability(objList, regular.level, plus); 
            rewardLevel = drawOfProbability(JSON.parse(JSON.stringify(newObjList))).index;
            DrawInfo.level = rewardLevel;
        }

        // 命中保底等级, 触发保底掉落。
        if (rewardLevel == regular.level){
            // 触发满定轨掉落
            if (player_regular_temp.orbitScore >= regular.maxOrbitScore){
                if (player_regular_temp.aimRewards.length != 0){ // 规则指定了满定轨奖励，触发指定掉落
                    let objList = [];
                    for (let rewardIndex of player_regular_temp.aimRewards){
                        objList.push(index2Reward(pool, rewardLevel, rewardIndex));
                    }
                    DrawInfo.reward = drawOfProbability(objList); 
                    endDraw(pl, DrawInfo);
                    return DrawInfo;
                }else{  // 规则未指定满定轨奖励，触发保底等级随机掉落
                    let levelPool = CardPool[pool].rewards[rewardLevel];
                    DrawInfo.reward = drawOfProbability(levelPool); 
                    endDraw(pl, DrawInfo);
                    return DrawInfo;
                }
            }
            // 触发该等级随机掉落
            else{
                let levelPool = CardPool[pool].rewards[rewardLevel];
                DrawInfo.reward = drawOfProbability(levelPool); 
                endDraw(pl, DrawInfo);
                return DrawInfo;
            }
        }
    }

    //普通概率掉落
    let levelPool = CardPool[pool].rewards[rewardLevel];
    DrawInfo.reward = drawOfProbability(levelPool); 
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
    //PlayerTemp[pl.xuid].combos[DrawInfo.pool]++; //
    //PlayerTemp[pl.xuid].PrayCount++;
    PlayerTemp[pl.xuid].PrayCountPool[DrawInfo.pool]++;
    PlayerTemp[pl.xuid].statistic[DrawInfo.pool].combos++;

    // 保底数据统计与重置
    for (let regular of CardPool[DrawInfo.pool].regulars){
        // 连抽+1
        PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].combos++;
        // 等级命中
        if (DrawInfo.level == regular.level){ 
            DrawInfo.regular = regular.name; // 等级规则命中
            PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].combos = 0;   // 连抽次数重置
            PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].count++;  //【统计】等级命中计数+1
            // 奖品命中
            if (PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].aimRewards.includes(DrawInfo.reward.index)){ 
                PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].orbitScore = 0; // 重置定轨值
                PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].upCount++; //【统计】命中up数+1
            }
            // 奖品不命中
            else{ 
                if (PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].aimRewards.length!=0){
                    PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].orbitScore++; // 定轨值+1
                    PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].orbitCount++; //【统计】定轨数+1
                    if (PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].orbitScore == regular.maxOrbitScore){
                        PlayerTemp[pl.xuid].statistic[DrawInfo.pool].regulars[regular.name].allOrbitCount++; //【统计】满定轨数+1
                    }
                }
            }
            break;
        }
    }
    log(`[${PlayerTemp[pl.xuid].statistic[DrawInfo.pool].combos}] ${rewardLevel2name(DrawInfo.level)} ${DrawInfo.reward.name} | ${DrawInfo.regular ?? ""}`);
    
    // 测试统计
    Statistic['玩家统计'] = PlayerTemp[pl.xuid].statistic;
    if (Statistic['奖品统计'][DrawInfo.pool] == undefined){Statistic['奖品统计'][DrawInfo.pool] = {};}
    if (Statistic['奖品统计'][DrawInfo.pool][DrawInfo.reward.index] == null){Statistic['奖品统计'][DrawInfo.pool][DrawInfo.reward.index] = 0;}
    Statistic['奖品统计'][DrawInfo.pool][DrawInfo.reward.index] ++;
}

//====================================
// 小功能函数
// 初始化玩家数据
function initPlayerTempUnsave(pl, pool){
    let result = true;
    if (!(pl.xuid in PlayerTemp)){
        PlayerTemp[pl.xuid] = {
            "realName": pl.realName,
            "combos": {
                [pool]:0
            },
            // "PrayCount": 0,
            "statistic":{
                [pool]:{
                    "combos": 0,
                    "regulars": {}
                }
            },
            "PrayCountPool": {
                [pool]:0
            },
            "DrawInfoTemp":[],
        };
    }
    
    if (PlayerTemp[pl.xuid].PrayCountPool[pool] == null){
        PlayerTemp[pl.xuid].PrayCountPool[pool] = 0; //本卡池今日抽数
    }
    if (PlayerTemp[pl.xuid].statistic[pool] == null){
        PlayerTemp[pl.xuid].statistic[pool] = {
            "combos": 0, //总抽数
            "regulars": {}
        };
    }

    for (let regular of CardPool[pool].regulars){
        if (PlayerTemp[pl.xuid].statistic[pool].regulars[regular.name] == null){
            PlayerTemp[pl.xuid].statistic[pool].regulars[regular.name] = {
                "combos": 0, //保底连抽累计
                "orbitScore": 0, //当前定轨值
                "count": 0, // 【统计】等级奖品获得数
                "upCount": 0, // 【统计】命中保底奖品数
                "orbitCount":0, // 【统计】累计定轨数（歪保底数）
                "allOrbitCount":0,  // 【统计】满定轨数
                "aimRewards": regular.customAimRewards ? [] : [...regular.aimRewards] // 自定义满定轨奖励
            };
        }else{
            if (regular.customAimRewards){
                // 检查玩家自定义定轨是否有效
                if (PlayerTemp[pl.xuid].statistic[pool].regulars[regular.name].aimRewards.length != 0){
                    for (let rewardIndex of PlayerTemp[pl.xuid].statistic[pool].regulars[regular.name].aimRewards){
                        if (!regular.aimRewards.includes(rewardIndex)){
                            result = false;
                        }
                    }
                }
            }else{
                // 非自定义定轨，抽奖前保证玩家定轨与卡池规则一致
                PlayerTemp[pl.xuid].statistic[pool].regulars[regular.name].aimRewards = [...regular.aimRewards];
            }
            
        }
    }

    return result;
}

// 概率重分配（概率表，目标名称，概率递增）
function resetProbability(objList, levelIndex, plus){
    let probabilitys = [];
    let reward = {};
    let newObjList = [];
    let newAimProbability = 0;
    let NormalMagnification = 0;

    // 第一轮循环：计算总和
    for (let obj of objList){
        probabilitys.push(obj.probability);
    }
    let sum = probabilitys.reduce((total, value)=>{return total + value;}, 0);

    // 第二轮循环：计算调整数值
    for (let obj of objList){
        if (obj.index == levelIndex){
            let newObj = JSON.parse(JSON.stringify(obj));
            let probability = obj.probability/sum; //指定奖品的旧概率
            if (probability + plus < 1){
                newAimProbability = newObj.probability =  sum * (probability + plus); // 新的目标比例
                NormalMagnification = ((sum - obj.probability) - (newObj.probability - obj.probability))/(sum - obj.probability); // 其余比例的调整倍数
            }else{
                newAimProbability = sum;
                NormalMagnification = 0;
            }
        }
        
    }
    // 第三轮循环：调整重算
    for (let obj of objList){
        let newObj = JSON.parse(JSON.stringify(obj));
        if (obj.index == levelIndex){
            newObj.probability = newAimProbability;
        }else{
            newObj.probability = newObj.probability * NormalMagnification;
        }
        newObjList.push(newObj);
    }
    return newObjList;
}

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
    init(poolkey){
        initPlayerTempUnsave(pl, poolkey);
    },
    drawTest(poolkey, count){
        initPlayerTempUnsave(pl, poolkey);
        if (count > 10000){
            alert('单次测试须小于10000次');
            return Statistic;
        }
        log('=====================================');
        if (!Pray.checkConfig()){return Statistic;}
        log('开始祈愿测试...');

        if (Statistic == null){
            Statistic = {
                '玩家统计': {},
                '奖品统计': {}
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
        delete PlayerTemp[pl.xuid].statistic[poolkey];
        delete Statistic['玩家统计'][poolkey];
        delete Statistic['奖品统计'][poolkey];
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