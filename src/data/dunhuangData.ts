import { CaveNode, QuizQuestion, FragmentItem, HotspotPin } from '../types';

// Image references
import heroMuralImg from '../assets/images/dunhuang_hero_mural_1786262244001.jpg';
import nineColoredDeerImg from '../assets/images/nine_colored_deer_mural_1786262265182.jpg';
import tangMusicDanceImg from '../assets/images/tang_music_dance_mural_1786262306859.jpg';
import apsarasAvatarImg from '../assets/images/apsaras_npc_avatar_1786262284071.jpg';

export { heroMuralImg, nineColoredDeerImg, tangMusicDanceImg, apsarasAvatarImg };

export const CAVES_DATA: CaveNode[] = [
  {
    id: 'cave_257',
    number: '第257窟',
    name: '九色鹿本生图',
    era: '北魏 (386-534年)',
    title: '鹿王本生·舍己善救',
    description: '莫高窟最著名的横卷式叙事连环画，讲述九色鹿救起溺水者却遭忘恩负义举报的佛教寓言故事。色彩沉稳，石青与朱砂交相辉映。',
    image: nineColoredDeerImg,
    restoredImage: nineColoredDeerImg,
    locked: false,
    restored: false,
    totalFragments: 3,
    collectedFragments: 0,
    coordinates: { x: 22, y: 55 },
  },
  {
    id: 'cave_220',
    number: '第220窟',
    name: '初唐乐舞与反弹琵琶',
    era: '初唐 (642年)',
    title: '药师经变·丝路管弦',
    description: '盛唐时期敦煌艺术的代表作，画面中二十八人庞大乐队手持琵琶、箜篌、排箫，舞者在灯火辉煌中翩翩起舞，天衣飞扬。',
    image: tangMusicDanceImg,
    restoredImage: tangMusicDanceImg,
    locked: true,
    restored: false,
    totalFragments: 3,
    collectedFragments: 0,
    coordinates: { x: 45, y: 38 },
  },
  {
    id: 'cave_45',
    number: '第45窟',
    name: '盛唐彩塑与菩萨神韵',
    era: '盛唐 (705-781年)',
    title: '慈悲庄严·千古神品',
    description: '被誉为莫高窟塑像最高成就的七尊彩塑群像，菩萨面容丰盈温润，侧身微拧，衣纹如出水流利，充分展现了盛唐艺术的写实与唯美。',
    image: heroMuralImg,
    restoredImage: heroMuralImg,
    locked: true,
    restored: false,
    totalFragments: 3,
    collectedFragments: 0,
    coordinates: { x: 68, y: 62 },
  },
  {
    id: 'cave_158',
    number: '第158窟',
    name: '涅槃巨佛与飞天凌空',
    era: '中唐/吐蕃期 (781-848年)',
    title: '万千气象·万国同瞻',
    description: '莫高窟最大的彩塑卧佛窟（全长15.8米），壁画绘制万国王子举哀与天人散花献乐，线条流畅，寓意寂静与永恒。',
    image: heroMuralImg,
    restoredImage: heroMuralImg,
    locked: true,
    restored: false,
    totalFragments: 3,
    collectedFragments: 0,
    coordinates: { x: 86, y: 45 },
  },
];

export const QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  cave_257: [
    {
      id: 'q_257_1',
      caveId: 'cave_257',
      question: '《九色鹿本生图》在壁画上的构图叙事方式与现代漫画有异曲同工之妙，请问它的叙事阅读顺序是怎样的？',
      options: [
        '从左至右依次推演',
        '从中间向两侧推演，最后汇聚于中央',
        '从右至左单向阅读',
        '自上而下顺时针循环'
      ],
      correctIndex: 1,
      explanation: '《九色鹿本生图》采用了独特的“从两端向中间汇聚”的高超连环画构图。故事开头在两端（九色鹿救人与王后做梦），高潮发生在中间高台之上（九色鹿申诉与调达发誓自毙）。',
      hint: '留意故事高潮“九色鹿在国王面前揭露溺水者”所在的位置。',
      pigmentName: '石青 (Lapis Lazuli)'
    },
    {
      id: 'q_257_2',
      caveId: 'cave_257',
      question: '敦煌壁画历经千年色泽鲜艳，主要是因为古代画工使用了天然矿物颜料。请问九色鹿身上青蓝色的主要成分是什么？',
      options: [
        '植物蓝靛',
        '石青（青金石/蓝铜矿）',
        '煤烟灰',
        '孔雀石粉末'
      ],
      correctIndex: 1,
      explanation: '敦煌壁画中浓郁清丽的蓝色来自天然矿物“石青”（主要成分为蓝铜矿/青金石），因其化学性质极为稳定，千百年依然鲜艳如初。',
      hint: '这是一种产自阿富汗及西域沿线贵重深蓝色矿石。',
      pigmentName: '石青 (Lapis Lazuli)'
    },
    {
      id: 'q_257_3',
      caveId: 'cave_257',
      question: '莫高窟第257窟属于北魏时期，当时壁画人物面部有一种被称为“凹凸法”的晕染方式，因年代久远氧化变黑，形成了怎样的视觉特征？',
      options: [
        '“小白圈”或“小白鼻”特征',
        '全黑影剪影',
        '金箔立体贴金',
        '水彩渐变透明'
      ],
      correctIndex: 0,
      explanation: '西域传入的“凹凸晕染法”原本以红白涂抹表现立体感。但其中含铅的颜料受氧化变黑，仅留高光处未变色，形成了北魏早期人物独特的“小白圈”与“小白鼻”奇观。',
      hint: '观察高光未受氧化的鼻梁与眼睛部位。',
      pigmentName: '朱砂 (Cinnabar)'
    }
  ],

  cave_220: [
    {
      id: 'q_220_1',
      caveId: 'cave_220',
      question: '第220窟壁画《药师经变》中展示了盛大的丝绸之路宫廷乐舞。请问被誉为“敦煌乐器之王”且有“反弹”名场面的是哪种乐器？',
      options: [
        '排箫',
        '五弦琵琶',
        '箜篌',
        '羯鼓'
      ],
      correctIndex: 1,
      explanation: '曲项琵琶与五弦琵琶是敦煌壁画中最核心的乐器。壁画中舞者将琵琶置于颈后反手弹奏，尽显唐代舞乐高超技艺与浪漫情怀。',
      hint: '唐代诗人白居易曾写下“大珠小珠落玉盘”形容其声音。',
      pigmentName: '石绿 (Malachite)'
    },
    {
      id: 'q_220_2',
      caveId: 'cave_220',
      question: '第220窟壁画在清代曾被覆盖上新的壁画，直到20世纪40年代才被敦煌守护者剥复揭开，这种“窟中窟、壁中壁”现象称为什么？',
      options: [
        '重层壁画',
        '拓印壁画',
        '双生画卷',
        '高浮雕覆层'
      ],
      correctIndex: 0,
      explanation: '后世僧人因风沙或重修需求，在老壁画上抹泥重绘，形成了“重层壁画”。敦煌研究院专家通过精细修缮剥离表层，才让沉睡数百年的初唐艺术重见天日。',
      hint: '像书页叠加一样，不同朝代壁画重叠在同一个墙面上。',
      pigmentName: '赭石 (Ochre)'
    },
    {
      id: 'q_220_3',
      caveId: 'cave_220',
      question: '第220窟壁画中二十八人乐队演奏的乐舞是唐代极富特色的西域舞蹈，这种节奏飞快、旋转连绵的舞蹈是？',
      options: [
        '霓裳羽衣舞',
        '胡旋舞',
        '剑器舞',
        '踏歌'
      ],
      correctIndex: 1,
      explanation: '胡旋舞自西域康国传入唐朝，“旋转如风”，极受唐太宗与唐玄宗喜爱。壁画中舞者站在小圆毯上腾跃旋转，天衣飞扬。',
      hint: '白居易诗云：“胡旋女，胡旋女，心应弦，手应鼓，弦鼓一声双袖举”。',
      pigmentName: '朱砂 (Cinnabar)'
    }
  ],

  cave_45: [
    {
      id: 'q_45_1',
      caveId: 'cave_45',
      question: '莫高窟第45窟被称为“盛唐彩塑的巅峰时刻”，其中哪尊塑像以侧身S型婀娜立姿、丰盈面容与慈悲目光闻名于世？',
      options: [
        '阿难尊者',
        '胁侍菩萨像',
        '天王金刚',
        '迦叶尊者'
      ],
      correctIndex: 1,
      explanation: '第45窟的胁侍菩萨姿态自然流动，身体呈优美的S形曲折，衣褶如出水顺滑，完美展现了盛唐“菩萨如宫娃”的审美理想。',
      hint: '世人常将其与欧洲古希腊雕塑断臂维纳斯相媲美。',
      pigmentName: '金箔 (Gold Leaf)'
    },
    {
      id: 'q_45_2',
      caveId: 'cave_45',
      question: '第45窟壁画《观音经变》中描绘了丝绸之路商队遭遇强盗求救的生动场景，商队骑乘的交通工具主要是？',
      options: [
        '大象',
        '双峰骆驼与马匹',
        '牦牛',
        '鹿车'
      ],
      correctIndex: 1,
      explanation: '壁画真实还原了千年前西域胡商押运货物的场景：胡商头戴高帽，牵着驮满丝绸与宝物的双峰骆驼在沙漠中艰难跋涉。',
      hint: '被誉为“沙漠之舟”的动物。',
      pigmentName: '赭石 (Ochre)'
    },
    {
      id: 'q_45_3',
      caveId: 'cave_45',
      question: '古代壁画塑像冠饰上的辉煌金光，是采用了哪种特殊的工艺制作？',
      options: [
        '沥粉贴金',
        '水墨渐变',
        '铜粉烫印',
        '漆树汁涂刷'
      ],
      correctIndex: 0,
      explanation: '“沥粉贴金”是古代匠人将胶粉挤出凸起线条，再将极薄的金箔贴于其上，使冠饰和衣纹展现出华丽立体的金色金属光泽。',
      hint: '利用胶质挤出线条，贴上纯金薄片。',
      pigmentName: '金箔 (Gold Leaf)'
    }
  ],

  cave_158: [
    {
      id: 'q_158_1',
      caveId: 'cave_158',
      question: '莫高窟第158窟是吐蕃统治时期的代表洞窟，其中最为震撼的彩塑卧佛全长达到了多少米？',
      options: [
        '5.2米',
        '10.5米',
        '15.8米',
        '25.0米'
      ],
      correctIndex: 2,
      explanation: '第158窟巨型涅槃卧佛长达15.8米，右胁而卧，右面宁静安详，展示了超越生死界限的至高涅槃境界。',
      hint: '与洞窟编号“158”有奇妙的数字巧合。',
      pigmentName: '石青 (Lapis Lazuli)'
    },
    {
      id: 'q_158_2',
      caveId: 'cave_158',
      question: '第158窟卧佛身后的壁画《万国王子举哀图》中，各国王子以割耳、割鼻、刺胸等剧烈方式表达悲痛，这反映了？',
      options: [
        '古代西域各族独特的悼念俗风与多民族融合',
        '战争搏斗场景',
        '古代医术演练',
        '刑罚刑具展示'
      ],
      correctIndex: 0,
      explanation: '《万国王子举哀图》真实记录了吐蕃、突厥、粟特、汉族及西域各国的服饰容貌与悼念俗风，是研究丝路多民族交融的重要历史文献。',
      hint: '这是西域草原游牧民族表达深切哀悼的古老礼俗。',
      pigmentName: '朱砂 (Cinnabar)'
    },
    {
      id: 'q_158_3',
      caveId: 'cave_158',
      question: '数字敦煌（Digital Dunhuang）项目通过什么现代科技手段，将莫高窟壁画进行毫米级永久保存与全球展示？',
      options: [
        '超高精度的三维激光扫描与亿级像素数字化摄影',
        '人工复印画稿',
        '简单拍照上传',
        '全息光盘烧录'
      ],
      correctIndex: 0,
      explanation: '敦煌研究院利用高精度3D扫描、亿像素级轨道摄影与多光谱技术，实现莫高窟物理文物的“数字化永生”，让全球大众在线尽览千年华彩。',
      hint: '结合了3D激光与亿级超高清微距成像技术。',
      pigmentName: '石绿 (Malachite)'
    }
  ]
};

export const CAVE_FRAGMENTS: Record<string, FragmentItem[]> = {
  cave_257: [
    {
      id: 'frag_257_1',
      caveId: 'cave_257',
      name: '九色鹿首·神鹿灵韵',
      description: '九色鹿首头部与祥云光环，九色斑点熠熠生辉。',
      imagePiece: '🦌',
      targetX: 35,
      targetY: 40,
      isPlaced: false,
    },
    {
      id: 'frag_257_2',
      caveId: 'cave_257',
      name: '溺水者·溺水呼救',
      description: '调达在江水中呼救，九色鹿跃入波涛将其救起。',
      imagePiece: '🌊',
      targetX: 68,
      targetY: 65,
      isPlaced: false,
    },
    {
      id: 'frag_257_3',
      caveId: 'cave_257',
      name: '国王车驾·誓约之证',
      description: '国王率军入山，听闻九色鹿申诉后痛斥调达。',
      imagePiece: '👑',
      targetX: 50,
      targetY: 30,
      isPlaced: false,
    },
  ],
  cave_220: [
    {
      id: 'frag_220_1',
      caveId: 'cave_220',
      name: '反弹琵琶·天衣飞舞',
      description: '舞者反手怀抱五弦琵琶，飘带在空中划出优美弧线。',
      imagePiece: '🪕',
      targetX: 42,
      targetY: 48,
      isPlaced: false,
    },
    {
      id: 'frag_220_2',
      caveId: 'cave_220',
      name: '二十八人乐队·箜篌管弦',
      description: '宫廷乐队奏响箜篌与排箫，声音如珠玉流淌。',
      imagePiece: '🎵',
      targetX: 25,
      targetY: 60,
      isPlaced: false,
    },
    {
      id: 'frag_220_3',
      caveId: 'cave_220',
      name: '药师经变·琉璃宝灯',
      description: '华丽灯轮高悬，七层宝灯照亮了整个乐舞大厅。',
      imagePiece: '🪔',
      targetX: 75,
      targetY: 30,
      isPlaced: false,
    },
  ],
  cave_45: [
    {
      id: 'frag_45_1',
      caveId: 'cave_45',
      name: '胁侍菩萨·宝冠金辉',
      description: '沥粉贴金的华丽宝冠与胸前璎珞，展现盛唐工艺。',
      imagePiece: '✨',
      targetX: 48,
      targetY: 28,
      isPlaced: false,
    },
    {
      id: 'frag_45_2',
      caveId: 'cave_45',
      name: '阿难尊者·清净法相',
      description: '年轻弟子的聪慧面容，衣纹流畅有力。',
      imagePiece: '📿',
      targetX: 30,
      targetY: 52,
      isPlaced: false,
    },
    {
      id: 'frag_45_3',
      caveId: 'cave_45',
      name: '丝路商队·骆驼宝货',
      description: '沙漠中商队胡商与骆驼押送珍贵锦绸与香料。',
      imagePiece: '🐪',
      targetX: 72,
      targetY: 68,
      isPlaced: false,
    },
  ],
  cave_158: [
    {
      id: 'frag_158_1',
      caveId: 'cave_158',
      name: '涅槃卧佛·寂静微笑',
      description: '巨型彩塑卧佛面容沉静，展现无上禅定与安宁。',
      imagePiece: '🪷',
      targetX: 45,
      targetY: 50,
      isPlaced: false,
    },
    {
      id: 'frag_158_2',
      caveId: 'cave_158',
      name: '万国王子·悼念古风',
      description: '丝路各国使节王子衣冠各异，瞻仰悼念。',
      imagePiece: '🤝',
      targetX: 28,
      targetY: 65,
      isPlaced: false,
    },
    {
      id: 'frag_158_3',
      caveId: 'cave_158',
      name: '散花飞天·天乐缭绕',
      description: '飞天在佛上方散落莲花，璎珞环佩铿锵有声。',
      imagePiece: '🌸',
      targetX: 65,
      targetY: 25,
      isPlaced: false,
    },
  ]
};

export const CAVE_HOTSPOTS: Record<string, HotspotPin[]> = {
  cave_257: [
    {
      id: 'h1',
      x: 35,
      y: 42,
      title: '九色鹿灵韵',
      content: '鹿王全身白如雪，身上有九种鲜艳的斑点，角白如雪。画面中九色鹿傲然高耸，象征正义、睿智与舍己救人的至善理想。'
    },
    {
      id: 'h2',
      x: 65,
      y: 60,
      title: '溺水者调达',
      content: '调达落水大呼“救救我”，九色鹿救其一命，调达发誓永不泄露秘密。然而为了悬赏重金，他却引国王军队前来抓捕，最终因背信弃义全身生恶疮。'
    },
    {
      id: 'h3',
      x: 50,
      y: 25,
      title: '国王与车驾',
      content: '国王听闻九色鹿申诉后感佩不已，下令全国任何人不得伤害神鹿，否则诛三族。显示出古人对守信与保护自然的崇高追求。'
    }
  ],
  cave_220: [
    {
      id: 'h1',
      x: 42,
      y: 48,
      title: '反弹琵琶经典造型',
      content: '舞者将琵琶背于身后，左手按弦，右手划弹。这种高难度动作将人体形体美与乐器韵律巧妙融合，是唐代乐舞浪漫主义的高峰。'
    },
    {
      id: 'h2',
      x: 25,
      y: 58,
      title: '西域箜篌与排箫',
      content: '箜篌是从西域传入古代中国的一种弹拨乐器，音色清澈如水。伴随五弦琵琶与方响，构成了丝绸之路上最宏大的交响编制。'
    },
    {
      id: 'h3',
      x: 75,
      y: 35,
      title: '琉璃大灯轮',
      content: '唐代上元节与佛教法会常点燃高达数丈的宝灯。壁画中高耸的灯轮华丽绚烂，反射出天然青金石颜料的迷人光辉。'
    }
  ],
  cave_45: [
    {
      id: 'h1',
      x: 48,
      y: 30,
      title: '胁侍菩萨之美',
      content: '塑像面庞圆润，眉目修长，嘴角微含笑意。衣褶紧贴身体，随体形曲折宛转，体现了盛唐雕塑“吴带当风”的技术艺术巅峰。'
    },
    {
      id: 'h2',
      x: 70,
      y: 65,
      title: '沙漠丝路商队',
      content: '壁画真实还原了盛唐丝绸之路上的贸易盛况。商人身着粟特式长袍，牵骆驼穿行于戈壁，受观音菩萨庇佑逢凶化吉。'
    }
  ],
  cave_158: [
    {
      id: 'h1',
      x: 45,
      y: 50,
      title: '15.8米彩塑卧佛',
      content: '佛像枕右手而卧，面容平静安详。古代匠人巧妙利用了洞窟建筑空间，使观众一步入窟内便被圣洁宁静的氛围所震撼。'
    },
    {
      id: 'h2',
      x: 65,
      y: 25,
      title: '天人散花飞天',
      content: '壁画上方的飞天凌空翱翔，天衣彩带如云霞飘洒，散下五彩莲花，将悲伤的悼念转变为神圣祥和的升华。'
    }
  ]
};
