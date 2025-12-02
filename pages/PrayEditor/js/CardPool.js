const CardPool_default = {
    "活动卡池1": {         //奖池唯一识别名, 不可以重复
        "name": "§l活动卡池-五号唱片",            // 奖池名, 可以重复
        "icon": "textures/items/nether_star",    // 奖池图标
        "enabled": true,                         // 奖池是否启用
        "discription": "  §e五号唱片UP！  §6更有古代遗迹宝箱等4星物品!",  // 奖池介绍
        "diedLine": "2099-12-26-0-0-0",          // 奖池截止日期
        "maxPrayCountPerday": 60,                // 每日最大祈愿次数
        "timeOfResetPerday": [                   // 每日最大祈愿次数重置时间
            4,
            0
        ],
        "prayMode": {                    // 祈愿方式
            "§l单抽": 1, 
            "§l十连": 10
        },
        "prayItem": {      // 祈愿消耗物品
            "icon": "textures/items/nether_star", // 单抽和十抽的图标
            "name": "钻石", //其余配置可参考奖品配置填入（支持特殊值、计分板、snbt、llmoney）。
            "mode": "itemAux",
            "type": "minecraft:diamond",
            "count": 1,
            "aux": 0
        },
        "regulars": [
            {
                "name": "保底",   // 保底规则名
                "combos": 60,     // 保底抽数
                "level": "5",     // 保底等级
                "threshold": 45,  // 概率递增阈值抽数。玩家连抽数达到此值（45），则该等级掉率逐抽提高，直至达到保底抽数（60），该等级掉率100%。
				"maxOrbitScore": 1,  // 最大定轨数，0表示不会歪，1表示可能歪一次（如原神角色池），2表示可能歪两次（如原神武器池）
                "customAimRewards": false, // 是否允许自定义定轨奖品
                "aimRewardsNum": 1,    // 自定义定轨物品的数量（1表示玩家要选择1个物品定轨, 2表示要定轨2个物品...）仅在"customAimRewards"为true的情况下有效。
                "aimRewards": ["五号唱片"] // 满定轨奖品池，填写"rewards"项中 奖励的索引index。空表示随机掉落该等级奖励。"customAimRewards"为true情况下, 由玩家在其中挑选"aimRewardsNum"件物品定轨。
            },
            {
                "name": "十连",
                "combos": 10,
                "level": "4",
				"threshold": 10,
				"maxOrbitScore": 0,
                "customAimRewards": false,
                "aimRewardsNum": 0, 
                "aimRewards": []
            }
        ],
        "rewards": {  // 奖池奖励清单
            "1": [    // 奖励等级，填写Config.json 中的等级index, 须为数字字符串
                {
                    "index": "骨头",     // 唯一识别名，不能重复
                    "name": "骨头",      // 奖励名称
                    "discription": "普通的骨头", 
                    "probability": 100,  // 在本奖励等级中的概率比例
                    "cmds": [],
					"rewardItems": [     // 奖励封装中的物品
                        {
                            "mode": "itemAux",
                            "name": "骨头 * 5",
                            "type": "minecraft:bone",
                            "count": 5,
                            "aux": 0     //特殊值
                        }
                    ]
                },
                {
                    "index": "夜视药水(8:00)",
                    "name": "夜视药水(8:00)",
                    "discription": "夜视药水8分钟",
                    "probability": 100,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemSnbt",
                            "name": "夜视药水(8:00) * 1",
                            "snbt": "夜视药水8"   //snbt唯一识别名
                        }
                    ]
                }
            ],
            "2": [
                {
                    "index": "经验修补",
                    "name": "经验修补",
                    "discription": "冒险必备宝藏附魔",
                    "probability": 35,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemSnbt",
                            "name": "经验修补 * 1",
                            "snbt": "经验修补"
                        }
                    ]
                }
            ],
            "3": [
                {
                    "index": "石英块",
                    "name": "石英块",
                    "discription": "石英块 * 48",
                    "probability": 25,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "石英块 * 48",
                            "type": "minecraft:quartz_block",
                            "count": 48,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "荧光墨囊",
                    "name": "荧光墨囊",
                    "discription": "荧光墨囊 * 15",
                    "probability": 25,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "荧光墨囊 * 15",
                            "type": "minecraft:glow_ink_sac",
                            "count": 15,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "浮冰",
                    "name": "浮冰",
                    "discription": "浮冰 * 48",
                    "probability": 25,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "浮冰 * 48",
                            "type": "minecraft:packed_ice",
                            "count": 48,
                            "aux": 0
                        }
                    ]
                }
            ],
            "4": [
                {
                    "index": "末地城的宝藏",
                    "name": "末地城的宝藏",
                    "discription": "珍贵的宝藏",
                    "probability": 70,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "lootTable",
                            "name": "末地城箱 * 1",
                            "lootTable": "chests/end_city_treasure" // 战利品路径, LuckyPray.js中列出了可能的战利品路径，自行查阅
                        }
                    ]
                },
                {
                    "index": "古代遗迹的宝藏",
                    "name": "古代遗迹的宝藏",
                    "discription": "珍贵的宝藏",
                    "probability": 30,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "lootTable",
                            "name": "古代遗迹箱 * 1",
                            "lootTable": "chests/ancient_city"
                        },
                        {
                            "mode": "itemSnbt",
                            "name": "原石 * 1",
                            "snbt": "原石"
                        }
                    ]
                }
            ],
            "5": [
                {
                    "index": "附魔金苹果",
                    "name": "附魔金苹果",
                    "discription": "五彩斑斓的金",
                    "probability": 40,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "附魔金苹果 * 1",
                            "type": "minecraft:enchanted_golden_apple",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "五号唱片",
                    "name": "五号唱片",
                    "discription": "古代遗迹摇滚乐",
                    "probability": 60,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "五号唱片 * 1",
                            "type": "minecraft:music_disc_5",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                }
            ]
        }
    },
    "角色活动祈愿-2": {         
        "name": "§l§c「焰色天河」 §3活动祈愿",           
        "icon": "textures/items/nether_star",    
        "enabled": true,                        
        "discription": " §7「§6焰色§7天河」 活动祈愿已开启。\n活动期间内, 限定5星角色 §c「琉焰华舞·宵宫(火)」§7 以及4星角色 §c「明律决罚·夏沃蕾(火)」§7 、 §9「黑羽鸣镝·九条裟罗(雷)」§7 、 §c「命运试金石·班尼特(火)」§7 的祈愿获取概率将大幅提升！",
        "diedLine": "2099-12-26-0-0-0",         
        "maxPrayCountPerday": 9999,                
        "timeOfResetPerday": [                   
            4,
            0
        ],
        "prayMode": {                   
            "§l单抽": 1, 
            "§l十连": 10
        },
        "prayItem": {
            "icon": "textures/items/nether_star",      
            "mode": "itemAux",
            "name": "石头",
            "type": "minecraft:stone",
            "count": 1,
            "aux": 0
        },
        "regulars": [
            {
                "name": "保底",   
                "combos": 90,     
                "level": "5",     
                "threshold": 73,  
				"maxOrbitScore": 1,
                "customAimRewards": false,
                "aimRewardsNum": 1,  
                "aimRewards": ["宵宫"] 
            },
            {
                "name": "十连",
                "combos": 10,
                "level": "4",
				"threshold": 10,
				"maxOrbitScore": 1,
                "customAimRewards": false,
                "aimRewardsNum": 3, 
                "aimRewards": ["夏沃蕾", "班尼特", "九条裟罗"]
            }
        ],
        "rewards": {
            "3": [
                {
                    "index": "弹弓",
                    "name": "弹弓",
                    "discription": "弹弓 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "弹弓",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "神射手之誓",
                    "name": "神射手之誓",
                    "discription": "神射手之誓 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "神射手之誓",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "鸦羽弓",
                    "name": "鸦羽弓",
                    "discription": "鸦羽弓 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "鸦羽弓",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "翡玉法球",
                    "name": "翡玉法球",
                    "discription": "翡玉法球 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "翡玉法球",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "讨龙英杰谭",
                    "name": "讨龙英杰谭",
                    "discription": "讨龙英杰谭 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "讨龙英杰谭",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "魔导绪论",
                    "name": "魔导绪论",
                    "discription": "魔导绪论 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "魔导绪论",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "黑缨枪",
                    "name": "黑缨枪",
                    "discription": "黑缨枪 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "黑缨枪",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "以理服人",
                    "name": "以理服人",
                    "discription": "以理服人 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "以理服人",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "沐浴龙血的剑",
                    "name": "沐浴龙血的剑",
                    "discription": "沐浴龙血的剑 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "沐浴龙血的剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "铁影阔剑",
                    "name": "铁影阔剑",
                    "discription": "铁影阔剑 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "铁影阔剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "飞天御剑",
                    "name": "飞天御剑",
                    "discription": "飞天御剑 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "飞天御剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "黎明神剑",
                    "name": "黎明神剑",
                    "discription": "黎明神剑 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "黎明神剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "冷刃",
                    "name": "冷刃",
                    "discription": "冷刃 * 1",
                    "probability": 7,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "冷刃",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                }
            ],
            "4": [
                {
                    "index": "夏沃蕾",
                    "name": "夏沃蕾",
                    "discription": "夏沃蕾 * 1",
                    "probability": 33,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "夏沃蕾",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "九条裟罗",
                    "name": "九条裟罗",
                    "discription": "九条裟罗 * 1",
                    "probability": 33,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "九条裟罗",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "班尼特",
                    "name": "班尼特",
                    "discription": "班尼特 * 1",
                    "probability": 33,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "班尼特",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "夏洛蒂",
                    "name": "夏洛蒂",
                    "discription": "夏洛蒂 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "夏洛蒂",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "菲米尼",
                    "name": "菲米尼",
                    "discription": "菲米尼 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "菲米尼",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "琳妮特",
                    "name": "琳妮特",
                    "discription": "琳妮特 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "琳妮特",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "卡维",
                    "name": "卡维",
                    "discription": "卡维 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "卡维",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "米卡",
                    "name": "米卡",
                    "discription": "米卡 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "米卡",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "瑶瑶",
                    "name": "瑶瑶",
                    "discription": "瑶瑶 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "瑶瑶",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "珐露珊",
                    "name": "珐露珊",
                    "discription": "珐露珊 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "珐露珊",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "莱依拉",
                    "name": "莱依拉",
                    "discription": "莱依拉 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "莱依拉",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "坎蒂丝",
                    "name": "坎蒂丝",
                    "discription": "坎蒂丝 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "坎蒂丝",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "多莉",
                    "name": "多莉",
                    "discription": "多莉 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "多莉",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "柯莱",
                    "name": "柯莱",
                    "discription": "柯莱 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "柯莱",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "久岐忍",
                    "name": "久岐忍",
                    "discription": "久岐忍 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "久岐忍",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "云堇",
                    "name": "云堇",
                    "discription": "云堇 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "云堇",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "绮良良",
                    "name": "绮良良",
                    "discription": "绮良良 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "绮良良",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "鹿野院平藏",
                    "name": "鹿野院平藏",
                    "discription": "鹿野院平藏 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "鹿野院平藏",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "五郎",
                    "name": "五郎",
                    "discription": "五郎 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "五郎",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "早柚",
                    "name": "早柚",
                    "discription": "早柚 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "早柚",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "托马",
                    "name": "托马",
                    "discription": "托马 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "托马",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "烟绯",
                    "name": "烟绯",
                    "discription": "烟绯 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "烟绯",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "罗莎莉亚",
                    "name": "罗莎莉亚",
                    "discription": "罗莎莉亚 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "罗莎莉亚",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "辛焱",
                    "name": "辛焱",
                    "discription": "辛焱 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "辛焱",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "砂糖",
                    "name": "砂糖",
                    "discription": "砂糖 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "砂糖",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "迪奥娜",
                    "name": "迪奥娜",
                    "discription": "迪奥娜 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "迪奥娜",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "重云",
                    "name": "重云",
                    "discription": "重云 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "重云",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "诺艾尔",
                    "name": "诺艾尔",
                    "discription": "诺艾尔 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "诺艾尔",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "菲谢尔",
                    "name": "菲谢尔",
                    "discription": "菲谢尔 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "菲谢尔",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "凝光",
                    "name": "凝光",
                    "discription": "凝光 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "凝光",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "行秋",
                    "name": "行秋",
                    "discription": "行秋 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "行秋",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "北斗",
                    "name": "北斗",
                    "discription": "北斗 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "北斗",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "香菱",
                    "name": "香菱",
                    "discription": "香菱 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "香菱",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "雷泽",
                    "name": "雷泽",
                    "discription": "雷泽 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "雷泽",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "芭芭拉",
                    "name": "芭芭拉",
                    "discription": "芭芭拉 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "芭芭拉",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "弓藏",
                    "name": "弓藏",
                    "discription": "弓藏 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "弓藏",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼弓",
                    "name": "祭礼弓",
                    "discription": "祭礼弓 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼弓",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "绝弦",
                    "name": "绝弦",
                    "discription": "绝弦 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "绝弦",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "西风猎弓",
                    "name": "西风猎弓",
                    "discription": "西风猎弓 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风猎弓",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "昭心",
                    "name": "昭心",
                    "discription": "昭心 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "昭心",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼残章",
                    "name": "祭礼残章",
                    "discription": "祭礼残章 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼残章",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "流浪乐章",
                    "name": "流浪乐章",
                    "discription": "流浪乐章 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "流浪乐章",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "西风秘典",
                    "name": "西风秘典",
                    "discription": "西风秘典 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风秘典",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "西风长枪",
                    "name": "西风长枪",
                    "discription": "西风长枪 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风长枪",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "匣里灭辰",
                    "name": "匣里灭辰",
                    "discription": "匣里灭辰 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "匣里灭辰",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "雨裁",
                    "name": "雨裁",
                    "discription": "雨裁 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "雨裁",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼大剑",
                    "name": "祭礼大剑",
                    "discription": "祭礼大剑 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼大剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "钟剑",
                    "name": "钟剑",
                    "discription": "钟剑 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "钟剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼剑",
                    "name": "祭礼剑",
                    "discription": "祭礼剑 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "笛剑",
                    "name": "笛剑",
                    "discription": "笛剑 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "笛剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "西风剑",
                    "name": "西风剑",
                    "discription": "西风剑 * 1",
                    "probability": 2,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                }
            ],
            "5": [
                {
                    "index": "宵宫",
                    "name": "宵宫",
                    "discription": "宵宫 * 1",
                    "probability": 100,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "宵宫",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "迪希雅",
                    "name": "迪希雅",
                    "discription": "迪希雅 * 1",
                    "probability": 14,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "迪希雅",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "提纳里",
                    "name": "提纳里",
                    "discription": "提纳里 * 1",
                    "probability": 14,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "提纳里",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "刻晴",
                    "name": "刻晴",
                    "discription": "刻晴 * 1",
                    "probability": 14,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "刻晴",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "莫娜",
                    "name": "莫娜",
                    "discription": "莫娜 * 1",
                    "probability": 14,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "莫娜",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "七七",
                    "name": "七七",
                    "discription": "七七 * 1",
                    "probability": 14,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "七七",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "迪卢克",
                    "name": "迪卢克",
                    "discription": "迪卢克 * 1",
                    "probability": 14,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "迪卢克",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "琴",
                    "name": "琴",
                    "discription": "琴 * 1",
                    "probability": 14,
                    "cmds": [],
					"rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "琴",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                }
            ]
        }
    },
    "武器活动祈愿": {
        "name": "§l§6「神铸赋形」 §3活动祈愿",
        "icon": "textures/items/nether_star",
        "enabled": true,
        "diedLine": "2099-12-26-0-0-0",
        "discription": "  §7「§6神铸§7赋形」 活动祈愿现已开启。\n活动期间内, 限定5星武器 §c「长柄武器·薙草之稻光」§7 、 §c「弓·飞雷之弦振」§7 以及限定4星武器 §d「长柄武器·断浪长鳍」§7 、§d4星武器「单手剑·西风剑」§7 、 §d「双手剑·雨裁」§7 、§d「法器·昭心」§7 、 §d「弓·弓藏」§7 的祈愿获取概率将大幅提升！",
        "maxPrayCountPerday": 9999,
        "timeOfResetPerday": [
            4,
            0
        ],
        "prayMode": {
            "§l单抽": 1,
            "§l十连": 10
        },
        "prayItem": {
            "icon": "textures/items/nether_star",
            "name": "石头",
            "mode": "itemAux",
            "type": "minecraft:stone",
            "count": 1,
            "aux": 0
        },
        "regulars": [
            {
                "name": "保底",
                "combos": 80,
                "level": "5",
                "threshold": 62,
                "maxOrbitScore": 2,
                "customAimRewards": true,
                "aimRewardsNum": 1,
                "aimRewards": [
                    "飞雷之弦振",
                    "薙草之稻光"
                ]
            },  
            {
                "name": "十连",
                "combos": 10,
                "level": "4",
                "threshold": 10,
                "maxOrbitScore": 0,
                "customAimRewards": false,
                "aimRewardsNum": 5,
                "aimRewards": [
                    "弓藏",
                    "断浪长鳍",
                    "西风剑",
                    "雨裁",
                    "昭心"
                ]
            }
        ],
        "rewards": {
            "3": [
                {
                    "index": "弹弓",
                    "name": "弹弓",
                    "discription": "弹弓 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "弹弓",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "神射手之誓",
                    "name": "神射手之誓",
                    "discription": "神射手之誓 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "神射手之誓",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "鸦羽弓",
                    "name": "鸦羽弓",
                    "discription": "鸦羽弓 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "鸦羽弓",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "翡玉法球",
                    "name": "翡玉法球",
                    "discription": "翡玉法球 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "翡玉法球",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "讨龙英杰谭",
                    "name": "讨龙英杰谭",
                    "discription": "讨龙英杰谭 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "讨龙英杰谭",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "魔导绪论",
                    "name": "魔导绪论",
                    "discription": "魔导绪论 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "魔导绪论",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "黑缨枪",
                    "name": "黑缨枪",
                    "discription": "黑缨枪 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "黑缨枪",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "以理服人",
                    "name": "以理服人",
                    "discription": "以理服人 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "以理服人",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "沐浴龙血的剑",
                    "name": "沐浴龙血的剑",
                    "discription": "沐浴龙血的剑 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "沐浴龙血的剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "铁影阔剑",
                    "name": "铁影阔剑",
                    "discription": "铁影阔剑 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "铁影阔剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "飞天御剑",
                    "name": "飞天御剑",
                    "discription": "飞天御剑 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "飞天御剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "黎明神剑",
                    "name": "黎明神剑",
                    "discription": "黎明神剑 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "黎明神剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "冷刃",
                    "name": "冷刃",
                    "discription": "冷刃 * 1",
                    "probability": 7,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "冷刃",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                }
            ],
            "4": [
                {
                    "index": "弓藏",
                    "name": "弓藏",
                    "discription": "弓藏 * 1",
                    "probability": 18.4,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "弓藏",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "昭心",
                    "name": "昭心",
                    "discription": "昭心 * 1",
                    "probability": 18.4,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "昭心",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "断浪长鳍",
                    "name": "断浪长鳍",
                    "discription": "断浪长鳍 * 1",
                    "probability": 18.4,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "断浪长鳍",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "雨裁",
                    "name": "雨裁",
                    "discription": "雨裁 * 1",
                    "probability": 18.4,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "雨裁",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "西风剑",
                    "name": "西风剑",
                    "discription": "西风剑 * 1",
                    "probability": 18.4,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "九条裟罗",
                    "name": "九条裟罗",
                    "discription": "九条裟罗 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "九条裟罗",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "班尼特",
                    "name": "班尼特",
                    "discription": "班尼特 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "班尼特",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "夏洛蒂",
                    "name": "夏洛蒂",
                    "discription": "夏洛蒂 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "夏洛蒂",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "菲米尼",
                    "name": "菲米尼",
                    "discription": "菲米尼 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "菲米尼",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "琳妮特",
                    "name": "琳妮特",
                    "discription": "琳妮特 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "琳妮特",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "卡维",
                    "name": "卡维",
                    "discription": "卡维 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "卡维",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "米卡",
                    "name": "米卡",
                    "discription": "米卡 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "米卡",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "瑶瑶",
                    "name": "瑶瑶",
                    "discription": "瑶瑶 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "瑶瑶",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "珐露珊",
                    "name": "珐露珊",
                    "discription": "珐露珊 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "珐露珊",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "莱依拉",
                    "name": "莱依拉",
                    "discription": "莱依拉 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "莱依拉",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "坎蒂丝",
                    "name": "坎蒂丝",
                    "discription": "坎蒂丝 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "坎蒂丝",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "多莉",
                    "name": "多莉",
                    "discription": "多莉 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "多莉",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "柯莱",
                    "name": "柯莱",
                    "discription": "柯莱 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "柯莱",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "久岐忍",
                    "name": "久岐忍",
                    "discription": "久岐忍 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "久岐忍",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "云堇",
                    "name": "云堇",
                    "discription": "云堇 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "云堇",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "绮良良",
                    "name": "绮良良",
                    "discription": "绮良良 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "绮良良",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "鹿野院平藏",
                    "name": "鹿野院平藏",
                    "discription": "鹿野院平藏 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "鹿野院平藏",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "五郎",
                    "name": "五郎",
                    "discription": "五郎 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "五郎",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "早柚",
                    "name": "早柚",
                    "discription": "早柚 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "早柚",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "托马",
                    "name": "托马",
                    "discription": "托马 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "托马",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "烟绯",
                    "name": "烟绯",
                    "discription": "烟绯 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "烟绯",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "罗莎莉亚",
                    "name": "罗莎莉亚",
                    "discription": "罗莎莉亚 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "罗莎莉亚",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "辛焱",
                    "name": "辛焱",
                    "discription": "辛焱 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "辛焱",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "砂糖",
                    "name": "砂糖",
                    "discription": "砂糖 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "砂糖",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "迪奥娜",
                    "name": "迪奥娜",
                    "discription": "迪奥娜 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "迪奥娜",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "重云",
                    "name": "重云",
                    "discription": "重云 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "重云",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "诺艾尔",
                    "name": "诺艾尔",
                    "discription": "诺艾尔 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "诺艾尔",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "菲谢尔",
                    "name": "菲谢尔",
                    "discription": "菲谢尔 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "菲谢尔",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "凝光",
                    "name": "凝光",
                    "discription": "凝光 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "凝光",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "行秋",
                    "name": "行秋",
                    "discription": "行秋 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "行秋",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "北斗",
                    "name": "北斗",
                    "discription": "北斗 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "北斗",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "香菱",
                    "name": "香菱",
                    "discription": "香菱 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "香菱",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "雷泽",
                    "name": "雷泽",
                    "discription": "雷泽 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "雷泽",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "芭芭拉",
                    "name": "芭芭拉",
                    "discription": "芭芭拉 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "芭芭拉",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼弓",
                    "name": "祭礼弓",
                    "discription": "祭礼弓 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼弓",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "绝弦",
                    "name": "绝弦",
                    "discription": "绝弦 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "绝弦",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "西风猎弓",
                    "name": "西风猎弓",
                    "discription": "西风猎弓 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风猎弓",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼残章",
                    "name": "祭礼残章",
                    "discription": "祭礼残章 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼残章",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "流浪乐章",
                    "name": "流浪乐章",
                    "discription": "流浪乐章 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "流浪乐章",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "西风秘典",
                    "name": "西风秘典",
                    "discription": "西风秘典 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风秘典",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "西风长枪",
                    "name": "西风长枪",
                    "discription": "西风长枪 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "西风长枪",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "匣里灭辰",
                    "name": "匣里灭辰",
                    "discription": "匣里灭辰 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "匣里灭辰",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼大剑",
                    "name": "祭礼大剑",
                    "discription": "祭礼大剑 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼大剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "钟剑",
                    "name": "钟剑",
                    "discription": "钟剑 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "钟剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "祭礼剑",
                    "name": "祭礼剑",
                    "discription": "祭礼剑 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "祭礼剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                },
                {
                    "index": "笛剑",
                    "name": "笛剑",
                    "discription": "笛剑 * 1",
                    "probability": 2,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "笛剑",
                            "count": 1,
                            "aux": 0,
                            "type": "minecraft:stone"
                        }
                    ]
                }
            ],
            "5": [
                {
                    "index": "飞雷之弦振",
                    "name": "飞雷之弦振",
                    "discription": "飞雷之弦振 * 1",
                    "probability": 150,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "飞雷之弦振",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "薙草之稻光",
                    "name": "薙草之稻光",
                    "discription": "薙草之稻光 * 1",
                    "probability": 150,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "薙草之稻光",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "阿莫斯之弓",
                    "name": "阿莫斯之弓",
                    "discription": "阿莫斯之弓 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "阿莫斯之弓",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "天空之翼",
                    "name": "天空之翼",
                    "discription": "天空之翼 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "天空之翼",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "四风原典",
                    "name": "四风原典",
                    "discription": "四风原典 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "四风原典",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "天空之卷",
                    "name": "天空之卷",
                    "discription": "天空之卷 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "天空之卷",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "和璞鸢",
                    "name": "和璞鸢",
                    "discription": "和璞鸢 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "和璞鸢",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "天空之脊",
                    "name": "天空之脊",
                    "discription": "天空之脊 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "天空之脊",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "狼的末路",
                    "name": "狼的末路",
                    "discription": "狼的末路 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "狼的末路",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "天空之傲",
                    "name": "天空之傲",
                    "discription": "天空之傲 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "天空之傲",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "天空之刃",
                    "name": "天空之刃",
                    "discription": "天空之刃 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "天空之刃",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                },
                {
                    "index": "风鹰剑",
                    "name": "风鹰剑",
                    "discription": "风鹰剑 * 1",
                    "probability": 10,
                    "cmds": [],
                    "rewardItems": [
                        {
                            "mode": "itemAux",
                            "name": "风鹰剑",
                            "type": "minecraft:stone",
                            "count": 1,
                            "aux": 0
                        }
                    ]
                }
            ]
        }
    }
};