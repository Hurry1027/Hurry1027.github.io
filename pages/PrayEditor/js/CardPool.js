const CardPool_default = {
    "活动卡池1": {         //奖池唯一识别名, 不可以重复
        "name": "§l活动卡池-五号唱片",            // 奖池名, 可以重复
        "icon": "textures/items/nether_star",    // 奖池图标
        "enabled": true,                         // 奖池是否启用
        "discription": "  §e五号唱片UP！  §6更有古代遗迹宝箱等4星物品!",  // 奖池介绍
        "diedLine": "2030-12-26-0-0-0",          // 奖池截止日期
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
            "name": "钻石",
            "mode": "itemAux",
            "type": "minecraft:diamond",
            "count": 1,
            "aux": 0
        },
        "aimReward": [    // 奖池目标奖品, 玩家命中该奖品后重置连抽次数, 不能为空
            "五号唱片"
        ],
        "regulars": [
            {
                "name": "大保底",   // 规则名
                "combos": 60,      // 连抽触发条件
                "level": [         // 奖励等级
                    "5" 
                ],
                "reward": "五号唱片"  // 指定奖励，填写"rewards"项中 奖励的索引index
            },
            {
                "name": "小保底",
                "combos": 30,
                "level": [
                    "5"
                ],
                "reward": null
            },
            {
                "name": "十连",
                "combos": 10,
                "level": [
                    "4",
                    "5"
                ],
                "reward": null
            }
        ],
        "rewards": {  // 奖池奖励清单
            "1": [    // 奖励等级，填写Config.json 中的等级index, 须为数字字符串
                {
                    "index": "骨头",     // 唯一识别名，不能重复
                    "name": "骨头",      // 奖励名称
                    "discription": "普通的骨头", 
                    "probability": 100,  // 在本奖励等级中的概率比例
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
    }
};