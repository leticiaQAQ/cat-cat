(function(){
  'use strict';
  const dictionary={
"名稱可能為 U1–SN，請對照原圖確認":{"zh-Hant": "名稱可能為 U1–SN，請對照原圖確認", "zh-Hans": "名称可能为 U1–SN，请对照原图确认", "en": "The label may be U1–SN. Check the original image."},
"兩次數值讀取不一致，請核對原圖並手動輸入":{"zh-Hant": "兩次數值讀取不一致，請核對原圖並手動輸入", "zh-Hans": "两次数值读取不一致，请核对原图并手动输入", "en": "Two readings disagree. Check the original image and enter the value manually."},
  "計分版本":{"zh-Hant":"計分版本","zh-Hans":"计分版本","en":"Scoring version"},
  "待補齊必填項目後計算總分":{"zh-Hant":"待補齊必填項目後計算總分","zh-Hans":"补齐必填项目后计算总分","en":"Complete required items to calculate the total"},
  "來源測量截圖":{"zh-Hant":"來源測量截圖","zh-Hans":"原始测量截图","en":"Original measurement crop"},
  "病例評估": {
    "zh-Hant": "病例評估",
    "zh-Hans": "病例评估",
    "en": "Case assessment"
  },
  "情境比較": {
    "zh-Hant": "情境比較",
    "zh-Hans": "情境比较",
    "en": "Scenario comparison"
  },
  "計算方法": {
    "zh-Hant": "計算方法",
    "zh-Hans": "计算方法",
    "en": "Scoring methods"
  },
  "從評分，到可解釋的探索": {
    "zh-Hant": "從評分，到可解釋的探索",
    "zh-Hans": "从评分，到可解释的探索",
    "en": "From scores to clear explanations"
  },
  "私密 Sites 工作區": {
    "zh-Hant": "私密 Sites 工作區",
    "zh-Hans": "私密 Sites 工作区",
    "en": "Private Sites workspace"
  },
  "瀏覽器本機保留草稿": {
    "zh-Hant": "瀏覽器本機保留草稿",
    "zh-Hans": "草稿保存在当前浏览器",
    "en": "Draft saved in this browser"
  },
  "語言": {
    "zh-Hant": "語言",
    "zh-Hans": "语言",
    "en": "Language"
  },
  "介面語言": {
    "zh-Hant": "介面語言",
    "zh-Hans": "界面语言",
    "en": "Interface language"
  },
  "匯出評估 JSON": {
    "zh-Hant": "匯出評估 JSON",
    "zh-Hans": "导出评估 JSON",
    "en": "Export assessment JSON"
  },
  "查看方法": {
    "zh-Hant": "查看方法",
    "zh-Hans": "查看方法",
    "en": "View methods"
  },
  "互動評估": {
    "zh-Hant": "互動評估",
    "zh-Hans": "交互评估",
    "en": "Interactive assessment"
  },
  "已載入示例病例": {
    "zh-Hant": "已載入示例病例",
    "zh-Hans": "已载入示例病例",
    "en": "Example case loaded"
  },
  "載入示例": {
    "zh-Hant": "載入示例",
    "zh-Hans": "载入示例",
    "en": "Load example"
  },
  "選擇病例…": {
    "zh-Hant": "選擇病例…",
    "zh-Hans": "选择病例…",
    "en": "Select a case…"
  },
  "01 · 輕度排列": {
    "zh-Hant": "01 · 輕度排列",
    "zh-Hans": "01 · 轻度牙列不齐",
    "en": "01 · Mild irregularity"
  },
  "02 · 擁擠與遠中移動": {
    "zh-Hant": "02 · 擁擠與遠心移動",
    "zh-Hans": "02 · 拥挤与远中移动",
    "en": "02 · Crowding and distalization"
  },
  "CAT-CAT 項目": {
    "zh-Hant": "CAT-CAT 項目",
    "zh-Hans": "CAT-CAT 项目",
    "en": "CAT-CAT items"
  },
  "原始文獻 ↗": {
    "zh-Hant": "原始文獻 ↗",
    "zh-Hans": "原始文献 ↗",
    "en": "Original article ↗"
  },
  "依模型、影像與臨床三大領域累加。修改任一數值，結果即時更新。": {
    "zh-Hant": "依模型、影像與臨床三大領域累加。修改任一數值，結果即時更新。",
    "zh-Hans": "模型分析、影像检查与临床检查三大领域的分数累加。修改任一数值，结果实时更新。",
    "en": "Scores are summed across dental models, radiographic examinations and clinical examinations. Results update as you edit."
  },
  "原表交界值重疊時，原型採相鄰較低分。未檢查項目請勿視為 0；本原型需完整輸入。": {
    "zh-Hant": "原表交界值重疊時，原型採相鄰較低分。未檢查項目請勿視為 0；本原型需完整輸入。",
    "zh-Hans": "原表区间端点重叠时，原型采用相邻较低分。未检查项目不应视为 0；本原型要求完整输入。",
    "en": "Where source intervals overlap, the lower adjacent score is used. Unassessed items must not be treated as zero. Complete inputs are required."
  },
  "請修正標示的輸入後查看結果。": {
    "zh-Hant": "請修正標示的輸入後查看結果。",
    "zh-Hans": "请修正标记的输入后查看结果。",
    "en": "Correct the highlighted inputs to view results."
  },
  "示例": {
    "zh-Hant": "示例",
    "zh-Hans": "示例",
    "en": "Demo"
  },
  "較低": {
    "zh-Hant": "較低",
    "zh-Hans": "较低",
    "en": "Lower"
  },
  "文獻項目加總 · 無固定滿分": {
    "zh-Hant": "文獻項目加總 · 無固定滿分",
    "zh-Hans": "文献项目加总 · 无固定满分",
    "en": "Source item sum · No fixed maximum"
  },
  "分": {
    "zh-Hant": "分",
    "zh-Hans": "分",
    "en": "points"
  },
  "查看逐項評分": {
    "zh-Hant": "查看逐項評分",
    "zh-Hans": "查看逐项评分",
    "en": "View item scores"
  },
  "收合逐項評分": {
    "zh-Hant": "收合逐項評分",
    "zh-Hans": "收起逐项评分",
    "en": "Hide item scores"
  },
  "主要影響因素": {
    "zh-Hant": "主要影響因素",
    "zh-Hans": "主要影响因素",
    "en": "Main contributing factors"
  },
  "可追溯貢獻": {
    "zh-Hant": "可追溯貢獻",
    "zh-Hans": "可追溯贡献",
    "en": "Traceable contributions"
  },
  "展開全部影響因素": {
    "zh-Hant": "展開全部影響因素",
    "zh-Hans": "展开全部影响因素",
    "en": "Show all contributing factors"
  },
  "收合影響因素": {
    "zh-Hant": "收合影響因素",
    "zh-Hans": "收起影响因素",
    "en": "Show fewer factors"
  },
  "如果病例條件改變呢？": {
    "zh-Hant": "如果病例條件改變呢？",
    "zh-Hans": "如果病例条件改变呢？",
    "en": "What if the case changes?"
  },
  "儲存目前為參考，調整輸入後比較差異。": {
    "zh-Hant": "儲存目前為參考，調整輸入後比較差異。",
    "zh-Hans": "保存当前病例作为参考，调整输入后比较差异。",
    "en": "Save the current case as a reference, then edit inputs to compare results."
  },
  "儲存為參考": {
    "zh-Hant": "儲存為參考",
    "zh-Hans": "保存为参考",
    "en": "Save as reference"
  },
  "儲存目前為參考": {
    "zh-Hant": "儲存目前為參考",
    "zh-Hans": "保存当前病例为参考",
    "en": "Save current as reference"
  },
  "一次調整，看見差異": {
    "zh-Hant": "一次調整，看見差異",
    "zh-Hans": "一次调整，看见差异",
    "en": "See the effect of each change"
  },
  "先建立一個比較起點": {
    "zh-Hant": "先建立一個比較起點",
    "zh-Hans": "先建立一个比较起点",
    "en": "Set a comparison baseline"
  },
  "在病例評估頁輸入條件，再將目前病例儲存為參考。": {
    "zh-Hant": "在病例評估頁輸入條件，再將目前病例儲存為參考。",
    "zh-Hans": "在病例评估页输入条件，再将当前病例保存为参考。",
    "en": "Enter features on the assessment page, then save the current case as a reference."
  },
  "使用目前病例作為參考": {
    "zh-Hant": "使用目前病例作為參考",
    "zh-Hans": "使用当前病例作为参考",
    "en": "Use current case as reference"
  },
  "參考病例": {
    "zh-Hant": "參考病例",
    "zh-Hans": "参考病例",
    "en": "Reference case"
  },
  "恢復參考值到輸入": {
    "zh-Hant": "恢復參考值到輸入",
    "zh-Hans": "将参考值恢复到输入",
    "en": "Restore reference inputs"
  },
  "目前病例": {
    "zh-Hant": "目前病例",
    "zh-Hans": "当前病例",
    "en": "Current case"
  },
  "前往病例評估修改特徵，結果即時同步。": {
    "zh-Hant": "前往病例評估修改特徵，結果即時同步。",
    "zh-Hans": "前往病例评估修改特征，结果实时同步。",
    "en": "Edit features on the assessment page. Results update immediately."
  },
  "調整病例輸入 →": {
    "zh-Hant": "調整病例輸入 →",
    "zh-Hans": "调整病例输入 →",
    "en": "Edit case inputs →"
  },
  "變化幅度": {
    "zh-Hant": "變化幅度",
    "zh-Hans": "变化幅度",
    "en": "Change in scores"
  },
  "CAT-CAT 分數變化": {
    "zh-Hant": "CAT-CAT 分數變化",
    "zh-Hans": "CAT-CAT 分数变化",
    "en": "CAT-CAT score change"
  },
  "輸入變動明細": {
    "zh-Hant": "輸入變動明細",
    "zh-Hans": "输入变动明细",
    "en": "Input changes"
  },
  "特徵": {
    "zh-Hant": "特徵",
    "zh-Hans": "特征",
    "en": "Feature"
  },
  "參考值僅儲存在這個瀏覽器。相同分數可能來自不同輸入。": {
    "zh-Hant": "參考值僅儲存在這個瀏覽器。相同分數可能來自不同輸入。",
    "zh-Hans": "参考值仅保存在当前浏览器。不同输入可能得到相同分数。",
    "en": "The reference is saved only in this browser. Different inputs can produce the same score."
  },
  "清除參考病例": {
    "zh-Hant": "清除參考病例",
    "zh-Hans": "清除参考病例",
    "en": "Clear reference case"
  },
  "繼續探索 →": {
    "zh-Hant": "繼續探索 →",
    "zh-Hans": "继续探索 →",
    "en": "Continue exploring →"
  },
  "每一個結果，都有可查的來源。": {
    "zh-Hant": "每一個結果，都有可查的來源。",
    "zh-Hans": "每个结果，都有可查的来源。",
    "en": "Every result has a traceable source."
  },
  "CAT-CAT 文獻基準": {
    "zh-Hant": "CAT-CAT 文獻基準",
    "zh-Hans": "CAT-CAT 文献基准",
    "en": "Published CAT-CAT baseline"
  },
  "依 Long 等人（2020）Table 1，將模型分析、影像檢查與臨床檢查項目相加。基準是未標準化的加總分，不是百分比，也沒有固定 100 分滿分。": {
    "zh-Hant": "依 Long 等人（2020）Table 1，將模型分析、影像檢查與臨床檢查項目相加。基準是未標準化的加總分，不是百分比，也沒有固定 100 分滿分。",
    "zh-Hans": "依据 Long 等人（2020）Table 1，将模型分析、影像检查与临床检查项目相加。基准是未标准化的加总分，不是百分比，也没有固定的 100 分满分。",
    "en": "Items in Long et al. (2020), Table 1, are summed across dental model analysis, radiographic examinations and clinical examinations. The baseline is an unstandardized sum, not a percentage or a score out of 100."
  },
  "CAT-CAT = 模型 + 影像 + 臨床": {
    "zh-Hant": "CAT-CAT = 模型 + 影像 + 臨床",
    "zh-Hans": "CAT-CAT = 模型 + 影像 + 临床",
    "en": "CAT-CAT = Dental + Radiographic + Clinical"
  },
  "原表採 CC BY 4.0。本原型為翻譯與互動化改編；": {
    "zh-Hant": "原表採 CC BY 4.0。本原型為翻譯與互動化改編；",
    "zh-Hans": "原表采用 CC BY 4.0。本原型为翻译与交互化改编；",
    "en": "The source table is licensed under CC BY 4.0. This prototype translates and adapts it for interactive use; "
  },
  "授權條款": {
    "zh-Hant": "授權條款",
    "zh-Hans": "许可条款",
    "en": "license terms"
  },
  "。": {
    "zh-Hant": "。",
    "zh-Hans": "。",
    "en": "."
  },
  "原型計算約定": {
    "zh-Hant": "原型計算約定",
    "zh-Hans": "原型计算约定",
    "en": "Prototype scoring conventions"
  },
  "交界值與連續比例": {
    "zh-Hant": "交界值與連續比例",
    "zh-Hans": "区间端点与连续比例",
    "en": "Interval endpoints and proportional scoring"
  },
  "原表部分區間端點重疊，交界值採相鄰較低分，例如 overjet 1 與 3 mm 均為 0 分、U1–SN 110° 為 0 分。旋轉角度與間隙依原表單位採連續比例，允許小數分，不自行向上取整。": {
    "zh-Hant": "原表部分區間端點重疊，交界值採相鄰較低分，例如 overjet 1 與 3 mm 均為 0 分、U1–SN 110° 為 0 分。旋轉角度與間隙依原表單位採連續比例，允許小數分，不自行向上取整。",
    "zh-Hans": "原表部分区间端点重叠，交界值采用相邻较低分。例如覆盖 1 与 3 mm 均为 0 分、U1–SN 110° 为 0 分。旋转角度与间隙按原表单位采用连续比例，允许小数分，不自动向上取整。",
    "en": "At overlapping endpoints, the lower adjacent score is used. For example, overjet of 1 or 3 mm and U1–SN of 110° score zero. Rotation and spacing use continuous proportions in the source units, without rounding up."
  },
  "開咬與移動量": {
    "zh-Hant": "開咬與移動量",
    "zh-Hans": "开（牙合）与移动量",
    "en": "Open bite and movement amount"
  },
  "前牙開咬以負覆咬 mm × 涉及牙數 × 3。若各牙開咬量不同，輸入平均 mm 與牙數；後牙開咬欄直接輸入各牙 mm 總和。磨牙按輸入的病例移動量級計分，不額外乘以牙數。": {
    "zh-Hant": "前牙開咬以負覆咬 mm × 涉及牙數 × 3。若各牙開咬量不同，輸入平均 mm 與牙數；後牙開咬欄直接輸入各牙 mm 總和。磨牙按輸入的病例移動量級計分，不額外乘以牙數。",
    "zh-Hans": "前牙开（牙合）按负覆（牙合）的绝对值 mm × 涉及牙数 × 3 计分。若各牙开（牙合）量不同，输入平均 mm 与牙数；后牙开（牙合）直接输入各牙 mm 的总和。磨牙按病例移动量级计分，不额外乘以牙数。",
    "en": "Anterior open bite scores 3 × the absolute negative overbite in mm × the number of affected teeth. Use the mean mm if depths differ. For posterior open bite, enter the sum of depths across teeth. Molar movement is scored by the case-level amount, without an additional tooth-count multiplier."
  },
  "完整性與資料": {
    "zh-Hant": "完整性與資料",
    "zh-Hans": "完整性与数据",
    "en": "Completeness and data"
  },
  "病例與計畫": {
    "zh-Hant": "病例與計畫",
    "zh-Hans": "病例与方案",
    "en": "Case and treatment plan"
  },
  "病例識別": {
    "zh-Hant": "病例識別",
    "zh-Hans": "病例标识",
    "en": "Study ID"
  },
  "病例識別資料": {
    "zh-Hant": "病例識別資料",
    "zh-Hans": "病例识别信息",
    "en": "Case identifier"
  },
  "年齡": {
    "zh-Hant": "年齡",
    "zh-Hans": "年龄",
    "en": "Age"
  },
  "歲": {
    "zh-Hant": "歲",
    "zh-Hans": "岁",
    "en": "years"
  },
  "步": {
    "zh-Hant": "步",
    "zh-Hans": "步",
    "en": "stages"
  },
  "顆": {
    "zh-Hant": "顆",
    "zh-Hans": "颗",
    "en": "teeth"
  },
  "模型分析": {
    "zh-Hant": "模型分析",
    "zh-Hans": "模型分析",
    "en": "Dental model analysis"
  },
  "前牙覆蓋 Overjet": {
    "zh-Hant": "水平覆咬（Overjet）",
    "zh-Hans": "前牙覆盖（Overjet）",
    "en": "Overjet"
  },
  "前牙覆咬 Overbite": {
    "zh-Hant": "垂直覆咬（Overbite）",
    "zh-Hans": "前牙覆（牙合）（Overbite）",
    "en": "Overbite"
  },
  "反覆蓋輸入負值；反覆蓋每 mm 加 2 分": {
    "zh-Hant": "反向水平覆咬輸入負值；每 mm 加 2 分",
    "zh-Hans": "反覆盖输入负值；每 mm 加 2 分",
    "en": "Enter a negative value for reverse overjet; 2 points per mm."
  },
  "開咬輸入負值；按涉及牙齒累計": {
    "zh-Hant": "開咬輸入負值；按涉及牙齒累計",
    "zh-Hans": "开（牙合）输入负值；按涉及牙齿累计",
    "en": "Enter a negative value for open bite; score across affected teeth."
  },
  "前牙開咬涉及牙數": {
    "zh-Hant": "前牙開咬涉及牙數",
    "zh-Hans": "前牙开（牙合）涉及牙数",
    "en": "Teeth with anterior open bite"
  },
  "最大單顎擁擠量": {
    "zh-Hant": "最大單顎擁擠量",
    "zh-Hans": "单颌最大拥挤量",
    "en": "Maximum crowding in either arch"
  },
  "磨牙關係計畫": {
    "zh-Hant": "磨牙關係計畫",
    "zh-Hans": "磨牙关系方案",
    "en": "Planned molar relationship"
  },
  "維持原關係": {
    "zh-Hant": "維持原關係",
    "zh-Hans": "维持原关系",
    "en": "Maintain relationship"
  },
  "向遠中移動": {
    "zh-Hant": "向遠心移動",
    "zh-Hans": "向远中移动",
    "en": "Distalization"
  },
  "向近中移動": {
    "zh-Hant": "向近心移動",
    "zh-Hans": "向近中移动",
    "en": "Mesialization"
  },
  "依治療計畫評分，不直接用 Angle 分類": {
    "zh-Hant": "依治療計畫評分，不直接用安格氏分類",
    "zh-Hans": "根据治疗方案评分，不直接采用安氏分类",
    "en": "Score the planned movement, not Angle classification."
  },
  "磨牙計畫移動量": {
    "zh-Hant": "磨牙計畫移動量",
    "zh-Hans": "磨牙计划移动量",
    "en": "Planned molar movement"
  },
  "病例量級，不自動按顆數倍乘": {
    "zh-Hant": "病例量級，不自動按顆數倍乘",
    "zh-Hans": "病例移动量级，不自动乘以牙数",
    "en": "Case-level amount; not multiplied by tooth count."
  },
  "最大單一間隙": {
    "zh-Hant": "最大單一間隙",
    "zh-Hans": "最大单一间隙",
    "en": "Largest individual space"
  },
  "間隙是否正畸關閉": {
    "zh-Hant": "是否矯正關閉間隙",
    "zh-Hans": "是否正畸关闭间隙",
    "en": "Orthodontic space closure"
  },
  "需要關閉": {
    "zh-Hant": "需要關閉",
    "zh-Hans": "需要关闭",
    "en": "Close orthodontically"
  },
  "不正畸關閉": {
    "zh-Hant": "不以矯正關閉",
    "zh-Hans": "不正畸关闭",
    "en": "No orthodontic closure"
  },
  "後牙開咬總量": {
    "zh-Hant": "後牙開咬總量",
    "zh-Hans": "后牙开（牙合）总量",
    "en": "Total posterior open bite"
  },
  "牙·mm": {
    "zh-Hant": "牙·mm",
    "zh-Hans": "牙·mm",
    "en": "tooth·mm"
  },
  "各牙開咬 mm 相加，例如 2 顆 × 1 mm = 2": {
    "zh-Hant": "各牙開咬 mm 相加，例如 2 顆 × 1 mm = 2",
    "zh-Hans": "各牙开（牙合）的 mm 相加，例如 2 颗 × 1 mm = 2",
    "en": "Sum open-bite depths: e.g. 2 teeth × 1 mm = 2 tooth·mm."
  },
  "後牙反咬": {
    "zh-Hant": "後牙錯咬（交叉咬合）",
    "zh-Hans": "后牙反（牙合）",
    "en": "Posterior crossbite"
  },
  "後牙鎖咬": {
    "zh-Hant": "後牙剪刀咬（鎖咬）",
    "zh-Hans": "后牙锁（牙合）",
    "en": "Posterior scissor bite"
  },
  "牙形態異常": {
    "zh-Hant": "牙形態異常",
    "zh-Hans": "牙形态异常",
    "en": "Abnormal tooth morphology"
  },
  "中線偏差": {
    "zh-Hant": "中線偏移",
    "zh-Hans": "中线偏移",
    "en": "Midline deviation"
  },
  "前磨牙旋轉總角度": {
    "zh-Hant": "前磨牙旋轉總角度",
    "zh-Hans": "前磨牙扭转总角度",
    "en": "Total premolar rotation"
  },
  "側切牙旋轉總角度": {
    "zh-Hant": "側切牙旋轉總角度",
    "zh-Hans": "侧切牙扭转总角度",
    "en": "Total lateral incisor rotation"
  },
  "累加需矯正牙齒的絕對旋轉量": {
    "zh-Hant": "累加需矯正牙齒的絕對旋轉量",
    "zh-Hans": "累加需要矫治牙齿的绝对扭转量",
    "en": "Sum the absolute rotation to be corrected across affected teeth."
  },
  "以每 10° 加 2 分，原型採連續比例": {
    "zh-Hant": "以每 10° 加 2 分，原型採連續比例",
    "zh-Hans": "每 10° 加 2 分，原型采用连续比例",
    "en": "2 points per 10°; continuous proportional scoring."
  },
  "影像檢查": {
    "zh-Hant": "影像檢查",
    "zh-Hans": "影像检查",
    "en": "Radiographic examinations"
  },
  "上切牙傾斜是否矯正": {
    "zh-Hant": "上切牙傾斜是否矯正",
    "zh-Hans": "是否矫治上切牙倾斜",
    "en": "Correct upper incisor inclination"
  },
  "需要矯正": {
    "zh-Hant": "需要矯正",
    "zh-Hans": "需要矫治",
    "en": "Correction planned"
  },
  "不矯正（該項 0 分）": {
    "zh-Hant": "不矯正（該項 0 分）",
    "zh-Hans": "不矫治（该项 0 分）",
    "en": "No correction (0 points)"
  },
  "阻生牙": {
    "zh-Hant": "阻生牙",
    "zh-Hans": "阻生牙",
    "en": "Impacted teeth"
  },
  "多生牙": {
    "zh-Hant": "多生牙",
    "zh-Hans": "多生牙",
    "en": "Supernumerary teeth"
  },
  "缺失牙": {
    "zh-Hant": "缺失牙",
    "zh-Hans": "缺失牙",
    "en": "Missing teeth"
  },
  "牙易位": {
    "zh-Hant": "牙易位",
    "zh-Hans": "牙齿易位",
    "en": "Tooth transposition"
  },
  "牙根吸收": {
    "zh-Hant": "牙根吸收",
    "zh-Hans": "牙根吸收",
    "en": "Root resorption"
  },
  "無": {
    "zh-Hant": "無",
    "zh-Hans": "无",
    "en": "Absent"
  },
  "有": {
    "zh-Hant": "有",
    "zh-Hans": "有",
    "en": "Present"
  },
  "C:R < 1（10 分）": {
    "zh-Hant": "C:R < 1（10 分）",
    "zh-Hans": "C:R < 1（10 分）",
    "en": "C:R < 1 (10 points)"
  },
  "C:R ≥ 1（20 分）": {
    "zh-Hant": "C:R ≥ 1（20 分）",
    "zh-Hans": "C:R ≥ 1（20 分）",
    "en": "C:R ≥ 1 (20 points)"
  },
  "C:R 為原表冠根比；照表錄入，不推論嚴重度": {
    "zh-Hant": "C:R 為原表冠根比；照表錄入，不推論嚴重度",
    "zh-Hans": "C:R 为原表冠根比；按表录入，不推断严重程度",
    "en": "C:R is the source crown-to-root ratio; record the table category without inferring severity."
  },
  "需要正顎手術": {
    "zh-Hant": "需要正顎手術",
    "zh-Hans": "需要正颌手术",
    "en": "Orthognathic surgery required"
  },
  "臨床檢查": {
    "zh-Hant": "臨床檢查",
    "zh-Hans": "临床检查",
    "en": "Clinical examinations"
  },
  "唇相對 E-line": {
    "zh-Hant": "唇相對 E-line",
    "zh-Hans": "唇相对 E 线的位置",
    "en": "Lip position relative to E-line"
  },
  "位於線前為正，線後為負": {
    "zh-Hant": "位於線前為正，線後為負",
    "zh-Hans": "位于线前为正，线后为负",
    "en": "Positive anterior to the line; negative posterior to it."
  },
  "軟組織突度是否矯正": {
    "zh-Hant": "軟組織突度是否矯正",
    "zh-Hans": "是否矫治软组织突度",
    "en": "Correct soft-tissue prominence"
  },
  "露齦量": {
    "zh-Hant": "露齦量",
    "zh-Hans": "露龈量",
    "en": "Gingival display"
  },
  "露齦是否矯正": {
    "zh-Hant": "露齦是否矯正",
    "zh-Hans": "是否矫治露龈",
    "en": "Correct gingival display"
  },
  "頦偏斜（需手術）": {
    "zh-Hant": "頦偏斜（需手術）",
    "zh-Hans": "颏偏斜（需手术）",
    "en": "Chin deviation requiring surgery"
  },
  "咬合平面傾斜": {
    "zh-Hant": "咬合平面傾斜",
    "zh-Hans": "（牙合）平面倾斜",
    "en": "Occlusal cant"
  },
  "牙周炎": {
    "zh-Hant": "牙周炎",
    "zh-Hans": "牙周炎",
    "en": "Periodontitis"
  },
  "顳顎關節疾病": {
    "zh-Hant": "顳顎障礙症（TMD）",
    "zh-Hans": "颞下颌关节紊乱病（TMD）",
    "en": "Temporomandibular disorders (TMD)"
  },
  "廣泛齲齒": {
    "zh-Hant": "廣泛齲齒",
    "zh-Hans": "广泛龋病",
    "en": "Generalized caries"
  },
  "前牙覆蓋": {
    "zh-Hant": "水平覆咬",
    "zh-Hans": "前牙覆盖",
    "en": "Overjet"
  },
  "前牙覆咬／開咬": {
    "zh-Hant": "垂直覆咬／開咬",
    "zh-Hans": "前牙覆（牙合）／开（牙合）",
    "en": "Overbite / anterior open bite"
  },
  "最大單顎擁擠": {
    "zh-Hant": "最大單顎擁擠",
    "zh-Hans": "单颌最大拥挤",
    "en": "Maximum crowding in either arch"
  },
  "後牙開咬": {
    "zh-Hant": "後牙開咬",
    "zh-Hans": "后牙开（牙合）",
    "en": "Posterior open bite"
  },
  "前磨牙旋轉": {
    "zh-Hant": "前磨牙旋轉",
    "zh-Hans": "前磨牙扭转",
    "en": "Premolar rotation"
  },
  "側切牙旋轉": {
    "zh-Hant": "側切牙旋轉",
    "zh-Hans": "侧切牙扭转",
    "en": "Lateral incisor rotation"
  },
  "E-line": {
    "zh-Hant": "E-line",
    "zh-Hans": "E 线",
    "en": "E-line"
  },
  "露齦": {
    "zh-Hant": "露齦",
    "zh-Hans": "露龈",
    "en": "Gingival display"
  },
  "請輸入 1–40 字的病例識別資料": {
    "zh-Hant": "請輸入 1–40 字的病例識別資料",
    "zh-Hans": "请输入 1–40 字的病例识别信息",
    "en": "Enter a case identifier of 1–40 characters."
  },
  "請選擇有效選項": {
    "zh-Hant": "請選擇有效選項",
    "zh-Hans": "请选择有效选项",
    "en": "Select a valid option."
  },
  "請選擇有或無": {
    "zh-Hant": "請選擇有或無",
    "zh-Hans": "请选择有或无",
    "en": "Select present or absent."
  },
  "請輸入數值": {
    "zh-Hant": "請輸入數值",
    "zh-Hans": "请输入数值",
    "en": "Enter a number."
  },
  "請輸入整數": {
    "zh-Hant": "請輸入整數",
    "zh-Hans": "请输入整数",
    "en": "Enter a whole number."
  },
  "待確認": {
    "zh-Hant": "待確認",
    "zh-Hans": "待确认",
    "en": "Pending"
  },
  "請修正 {count} 項輸入後查看結果。": {
    "zh-Hant": "請修正 {count} 項輸入後查看結果。",
    "zh-Hans": "请修正 {count} 项输入后查看结果。",
    "en": "Correct {count} input(s) to view results."
  },
  "{label}滑桿": {
    "zh-Hant": "{label}滑桿",
    "zh-Hans": "{label}滑块",
    "en": "{label} slider"
  },
  "固定參考 · ": {
    "zh-Hant": "固定參考 · ",
    "zh-Hans": "固定参考 · ",
    "en": "Fixed reference · "
  },
  "已儲存": {
    "zh-Hant": "已儲存",
    "zh-Hans": "已保存",
    "en": "Saved"
  },
  "目前輸入尚未完整，請修正後再比較。": {
    "zh-Hant": "目前輸入尚未完整，請修正後再比較。",
    "zh-Hans": "当前输入尚未完整，请修正后再比较。",
    "en": "Current inputs are incomplete. Correct them to compare results."
  },
  "增加": {
    "zh-Hant": "增加",
    "zh-Hans": "增加",
    "en": "increased"
  },
  "降低": {
    "zh-Hant": "降低",
    "zh-Hans": "降低",
    "en": "decreased"
  },
  "{count} 項變動": {
    "zh-Hant": "{count} 項變動",
    "zh-Hans": "{count} 项变动",
    "en": "{count} changed input(s)"
  },
  "輸入待修正": {
    "zh-Hant": "輸入待修正",
    "zh-Hans": "输入待修正",
    "en": "Inputs need correction"
  },
  "請先修正目前輸入。": {
    "zh-Hant": "請先修正目前輸入。",
    "zh-Hans": "请先修正当前输入。",
    "en": "Correct the current inputs first."
  },
  "尚無輸入變動，前往病例評估調整條件。": {
    "zh-Hant": "尚無輸入變動，前往病例評估調整條件。",
    "zh-Hans": "输入尚无变化，请前往病例评估调整条件。",
    "en": "No inputs have changed. Edit features on the assessment page."
  },
  "本機草稿已更新": {
    "zh-Hant": "本機草稿已更新",
    "zh-Hans": "本地草稿已更新",
    "en": "Local draft updated"
  },
  "目前瀏覽器無法保留草稿": {
    "zh-Hant": "目前瀏覽器無法保留草稿",
    "zh-Hans": "当前浏览器无法保存草稿",
    "en": "This browser cannot save drafts"
  },
  "已載入合成示例病例": {
    "zh-Hant": "已載入合成示例病例",
    "zh-Hans": "已载入合成示例病例",
    "en": "Synthetic example loaded"
  },
  "示例病例已載入；固定參考病例維持原值。": {
    "zh-Hant": "示例病例已載入；固定參考病例維持原值。",
    "zh-Hans": "示例病例已载入；固定参考病例保持原值。",
    "en": "Example loaded. The fixed reference is unchanged."
  },
  "已重設為示例 02": {
    "zh-Hant": "已重設為示例 02",
    "zh-Hans": "已重置为示例 02",
    "en": "Reset to example 02"
  },
  "目前輸入已重設；參考病例仍保留。": {
    "zh-Hant": "目前輸入已重設；參考病例仍保留。",
    "zh-Hans": "当前输入已重置；参考病例仍保留。",
    "en": "Current inputs reset. The reference is retained."
  },
  "請先修正輸入。": {
    "zh-Hant": "請先修正輸入。",
    "zh-Hans": "请先修正输入。",
    "en": "Correct the inputs first."
  },
  "已將目前病例固定為本機參考。": {
    "zh-Hant": "已將目前病例固定為本機參考。",
    "zh-Hans": "已将当前病例保存为本地固定参考。",
    "en": "Current case saved as a fixed local reference."
  },
  "已固定參考；此瀏覽器無法持久儲存。": {
    "zh-Hant": "已固定參考；此瀏覽器無法持久儲存。",
    "zh-Hans": "已固定参考；当前浏览器无法持久保存。",
    "en": "Reference fixed for this session. Persistent storage is unavailable."
  },
  "已恢復參考病例的輸入值。": {
    "zh-Hant": "已恢復參考病例的輸入值。",
    "zh-Hans": "已恢复参考病例的输入值。",
    "en": "Reference inputs restored."
  },
  "參考病例已清除。": {
    "zh-Hant": "參考病例已清除。",
    "zh-Hans": "参考病例已清除。",
    "en": "Reference cleared."
  },
  "本機草稿自動保留": {
    "zh-Hant": "本機草稿自動保留",
    "zh-Hans": "本地草稿自动保存",
    "en": "Local draft saved automatically"
  },
  "草稿僅限目前開啟期間": {
    "zh-Hant": "草稿僅限目前開啟期間",
    "zh-Hans": "草稿仅保留至当前会话结束",
    "en": "Draft retained for this session only"
  },
  "語言已切換，病例輸入與參考值已保留。": {
    "zh-Hant": "語言已切換，病例輸入與參考值已保留。",
    "zh-Hans": "语言已切换，病例输入与参考值已保留。",
    "en": "Language changed. Inputs and the reference are preserved."
  },
  "三語臨床術語與查核來源": {
    "zh-Hant": "三語臨床術語與查核來源",
    "zh-Hans": "三语临床术语与核查来源",
    "en": "Clinical terminology and sources"
  },
  "依地區臨床用語調整，並非只做繁簡字形轉換。簡體介面使用「（牙合）」表示專業合字，避免罕用字缺字。": {
    "zh-Hant": "依地區臨床用語調整，並非只做繁簡字形轉換。簡體介面使用「（牙合）」表示專業合字，避免罕用字缺字。",
    "zh-Hans": "按地区临床用语调整，并非仅作繁简转换。简体界面使用“（牙合）”表示专业合字，避免生僻字显示缺失。",
    "en": "Terminology follows regional clinical usage, rather than character conversion alone. Simplified Chinese uses “（牙合）” for the combined dental character to avoid missing glyphs."
  },
  "三軍總醫院：覆咬與錯咬用語 ↗": {
    "zh-Hant": "三軍總醫院：覆咬與錯咬用語 ↗",
    "zh-Hans": "三军总医院：覆咬与错咬用语 ↗",
    "en": "Tri-Service General Hospital: overjet, overbite and crossbite ↗"
  },
  "衛福部台灣 e 院：遠心移動 ↗": {
    "zh-Hant": "衛福部台灣 e 院：遠心移動 ↗",
    "zh-Hans": "台湾卫生部门：远心移动用语 ↗",
    "en": "Taiwan Ministry of Health and Welfare: distal movement terminology ↗"
  },
  "清華大學出版社：口腔正畸術語 ↗": {
    "zh-Hant": "清華大學出版社：口腔正畸術語 ↗",
    "zh-Hans": "清华大学出版社：口腔正畸术语 ↗",
    "en": "Tsinghua University Press: orthodontic terminology ↗"
  },
  "北京大學口腔：隱形矯治與遠中移動 ↗": {
    "zh-Hant": "北京大學口腔：隱形矯治與遠中移動 ↗",
    "zh-Hans": "北京大学口腔：隐形矫治与远中移动 ↗",
    "en": "Peking University Stomatology: clear aligners and distalization ↗"
  },
  "矯正醫師臨床用語：剪刀咬 ↗": {
    "zh-Hant": "矯正醫師臨床用語：剪刀咬 ↗",
    "zh-Hans": "矫正医师临床用语：剪刀咬 ↗",
    "en": "Orthodontist-authored terminology: scissor bite ↗"
  },
  "International Journal of Oral Science：英文臨床術語 ↗": {
    "zh-Hant": "International Journal of Oral Science：英文臨床術語 ↗",
    "zh-Hans": "International Journal of Oral Science：英文临床术语 ↗",
    "en": "International Journal of Oral Science: English clinical terminology ↗"
  },
  "臺北榮總：顳顎障礙症 ↗": {
    "zh-Hant": "臺北榮總：顳顎障礙症 ↗",
    "zh-Hans": "台北荣总：颞下颌关节紊乱病 ↗",
    "en": "Taipei Veterans General Hospital: temporomandibular disorders ↗"
  },
  "北京大學口腔醫院：顳顎關節紊亂病 ↗": {
    "zh-Hant": "北京大學口腔醫院：顳顎關節紊亂病 ↗",
    "zh-Hans": "北京大学口腔医院：颞下颌关节紊乱病 ↗",
    "en": "Peking University Hospital of Stomatology: temporomandibular disorders ↗"
  },
  "主要導覽": {
    "zh-Hant": "主要導覽",
    "zh-Hans": "主要导航",
    "en": "Main navigation"
  },
  "CAT-CAT 計算機": {
    "zh-Hant": "CAT-CAT 計算機",
    "zh-Hans": "CAT-CAT计算机",
    "en": "CAT-CAT Calculator"
  },
  "CAT-CAT 計算機首頁": {
    "zh-Hant": "CAT-CAT 計算機首頁",
    "zh-Hans": "CAT-CAT计算机首页",
    "en": "CAT-CAT Calculator home"
  },
  "CAT-CAT 計算機。依文獻計算項目分數，匯入頭影測量資料並比較病例輸入。": {
    "zh-Hant": "CAT-CAT 計算機。依文獻計算項目分數，匯入頭影測量資料並比較病例輸入。",
    "zh-Hans": "CAT-CAT计算机。按文献计算项目分数，导入头影测量数据并比较病例输入。",
    "en": "CAT-CAT Calculator. Calculate published item scores, import cephalometric measurements and compare case inputs."
  },
  "計算工作區": {
    "zh-Hant": "計算工作區",
    "zh-Hans": "计算工作区",
    "en": "Calculator workspace"
  },
  "逐項計分，核對資料，清楚比較輸入改變後的分數。": {
    "zh-Hant": "逐項計分，核對資料，清楚比較輸入改變後的分數。",
    "zh-Hans": "逐项计分，核对数据，清楚比较输入改变后的分数。",
    "en": "Score each item, verify measurements and compare scores as inputs change."
  },
  "計算機 v1.0": {
    "zh-Hant": "計算機 v1.0",
    "zh-Hans": "计算机 v1.0",
    "en": "Calculator v1.0"
  },
  "文獻計分": {
    "zh-Hant": "文獻計分",
    "zh-Hans": "文献计分",
    "en": "Published scoring"
  },
  "匯入測量資料，查看隱形矯治難度評分": {
    "zh-Hant": "匯入測量資料，查看隱形矯治難度評分",
    "zh-Hans": "导入测量数据，查看隐形矫治难度评分",
    "en": "Import measurements to view the clear aligner difficulty score"
  },
  "依 CAT-CAT 文獻逐項計分": {
    "zh-Hant": "依 CAT-CAT 文獻逐項計分",
    "zh-Hans": "按 CAT-CAT 文献逐项计分",
    "en": "Item scoring from the CAT-CAT publication"
  },
  "預設為合成示例。新增患者時請建立空白病例；未知資料不當作 0，補齊必填項目後才顯示總分。": {
    "zh-Hant": "預設為合成示例。新增患者時請建立空白病例；未知資料不當作 0，補齊必填項目後才顯示總分。",
    "zh-Hans": "默认值为合成示例。新增患者时请建立空白病例；未知数据不视为 0，补齐必填项目后才显示总分。",
    "en": "Defaults are synthetic examples. Start a blank case for a new patient. Unknown values are not zero; a total is shown only after required items are complete."
  },
  "新增空白病例": {
    "zh-Hant": "新增空白病例",
    "zh-Hans": "新增空白病例",
    "en": "New blank case"
  },
  "重設示例": {
    "zh-Hant": "重設示例",
    "zh-Hans": "重置示例",
    "en": "Reset example"
  },
  "03 · 複合移動": {
    "zh-Hant": "03 · 複合移動",
    "zh-Hans": "03 · 复合移动",
    "en": "03 · Complex movement"
  },
  "病例紀錄": {
    "zh-Hant": "病例紀錄",
    "zh-Hans": "病例记录",
    "en": "Case record"
  },
  "合成示例": {
    "zh-Hant": "合成示例",
    "zh-Hans": "合成示例",
    "en": "Synthetic example"
  },
  "患者病例": {
    "zh-Hant": "患者病例",
    "zh-Hans": "患者病例",
    "en": "Patient case"
  },
  "選填背景紀錄，不參與 CAT-CAT 計分": {
    "zh-Hant": "選填背景紀錄，不參與 CAT-CAT 計分",
    "zh-Hans": "选填背景记录，不参与 CAT-CAT 计分",
    "en": "Optional context; not included in CAT-CAT scoring."
  },
  "CAT-CAT 總分": {
    "zh-Hant": "CAT-CAT 總分",
    "zh-Hans": "CAT-CAT 总分",
    "en": "CAT-CAT total score"
  },
  "依 CAT-CAT 加分由高到低排列；數值為該項對總分的貢獻。": {
    "zh-Hant": "依 CAT-CAT 加分由高到低排列；數值為該項對總分的貢獻。",
    "zh-Hans": "按 CAT-CAT 加分从高到低排列；数值为该项对总分的贡献。",
    "en": "Items are ranked by CAT-CAT points. Each value is its contribution to the total score."
  },
  "參考病例保持固定；目前病例隨輸入更新。分數差異反映項目計分，不代表治療效果。": {
    "zh-Hant": "參考病例保持固定；目前病例隨輸入更新。分數差異反映項目計分，不代表治療效果。",
    "zh-Hans": "参考病例保持固定；当前病例随输入更新。分数差异反映项目计分，不代表治疗效果。",
    "en": "The reference stays fixed while the current case updates. Differences reflect item scoring and do not indicate treatment effects."
  },
  "了解文獻計分、數值匯入與計算約定，讓每項結果可追溯。": {
    "zh-Hant": "了解文獻計分、數值匯入與計算約定，讓每項結果可追溯。",
    "zh-Hans": "了解文献计分、数值导入与计算约定，让每项结果可追溯。",
    "en": "Understand published scoring, measurement imports and calculation conventions behind each result."
  },
  "原表條件已轉為繁體中文數值欄位。有無項目按「有／無」計分；僅原表明列每牙計分的項目按牙數累加。": {
    "zh-Hant": "原表條件已轉為三語數值欄位。有無項目按「有／無」計分；僅原表明列每牙計分的項目按牙數累加。",
    "zh-Hans": "原表条件已转为三语数值字段。有无项目按“有／无”计分；仅原表明确按每颗牙计分的项目按牙数累加。",
    "en": "The source criteria are adapted into multilingual fields. Presence items use present/absent choices; tooth counts are multiplied only where specified by the source."
  },
  "頭影測量資料匯入": {
    "zh-Hant": "頭影測量資料匯入",
    "zh-Hans": "头影测量数据导入",
    "en": "Cephalometric data import"
  },
  "資料在瀏覽器本機讀取。系統以明確的測量名稱、患者數值欄與單位做對應，不由影像推算測量值，也不把不同參考平面的角度視為相同項目。": {
    "zh-Hant": "資料在瀏覽器本機讀取。系統以明確的測量名稱、患者數值欄與單位做對應，不由影像推算測量值，也不把不同參考平面的角度視為相同項目。",
    "zh-Hans": "数据在浏览器本地读取。系统按明确的测量名称、患者数值列与单位进行匹配，不从影像推算测量值，也不把不同参考平面的角度视为相同项目。",
    "en": "Files are read in your browser. Matching uses explicit measurement names, patient-value columns and units. Values are not measured from images, and angles using different reference planes are not substituted."
  },
  "上傳 → 核對對應 → 填入 → 手動補齊": {
    "zh-Hant": "上傳 → 核對對應 → 填入 → 手動補齊",
    "zh-Hans": "上传 → 核对匹配 → 填入 → 手动补齐",
    "en": "Upload → Review matches → Fill fields → Complete manually"
  },
  "預覽時可取消勾選任何項目。新病例只填入確認的數值；其餘留空，待手動補充。合併模式只替換勾選項目，並可撤銷最近一次填入。": {
    "zh-Hant": "預覽時可取消勾選任何項目。新病例只填入確認的數值；其餘留空，待手動補充。合併模式只替換勾選項目，並可撤銷最近一次填入。",
    "zh-Hans": "预览时可取消勾选任何项目。新病例只填入确认的数值；其余留空，待手动补充。合并模式只替换勾选项目，并可撤销最近一次填入。",
    "en": "Deselect any item in the preview. New cases receive only confirmed values; other fields stay blank for manual completion. Merge mode replaces selected fields only. The latest import can be undone."
  },
  "原始檔案與全文不保留；草稿只保存已填入的欄位值。匯出資料可包含已確認欄位的來源測量名稱。": {
    "zh-Hant": "原始檔案與全文不保留；草稿只保存已填入的欄位值。匯出資料可包含已確認欄位的來源測量名稱。",
    "zh-Hans": "原始文件与全文不保留；草稿只保存已填入的字段值。导出数据可包含已确认字段的来源测量名称。",
    "en": "Original files and full text are not retained. Drafts store filled field values. Exports may include source measurement names for confirmed fields."
  },
  "Edward H. Angle Society：頭影測量項目與時間點 ↗": {
    "zh-Hant": "Edward H. Angle Society：頭影測量項目與時間點 ↗",
    "zh-Hans": "Edward H. Angle Society：头影测量项目与时间点 ↗",
    "en": "Edward H. Angle Society: cephalometric measurements and time points ↗"
  },
  "分數的意義": {
    "zh-Hant": "分數的意義",
    "zh-Hans": "分数的意义",
    "en": "Meaning of the score"
  },
  "總分為 CAT-CAT 文獻項目的加總。本計算機不另設難度分級、固定滿分或治療成功率；請結合完整病例資料判讀。": {
    "zh-Hant": "總分為 CAT-CAT 文獻項目的加總。本計算機不另設難度分級、固定滿分或治療成功率；請結合完整病例資料判讀。",
    "zh-Hans": "总分为 CAT-CAT 文献项目的加总。本计算机不另设难度分级、固定满分或治疗成功率；请结合完整病例资料解读。",
    "en": "The total is the sum of published CAT-CAT item scores. This calculator adds no difficulty grades, fixed maximum or treatment success rate. Interpret the score with complete case records."
  },
  "預設數值均為合成示例；新病例的未知項目留空，「無」須手動確認。空白、超範圍或錯誤輸入會暫停總分。匯入與新病例皆保留固定參考；最近一次填入可撤銷。": {
    "zh-Hant": "預設數值均為合成示例；新病例的未知項目留空，「無」須手動確認。空白、超範圍或錯誤輸入會暫停總分。匯入與新病例皆保留固定參考；最近一次填入可撤銷。",
    "zh-Hans": "默认值均为合成示例；新病例的未知项目留空，“无”须手动确认。空白、超范围或错误输入会暂停总分。导入与新病例均保留固定参考；最近一次填入可撤销。",
    "en": "Defaults are synthetic examples. Unknown items in new cases stay blank; absence requires confirmation. Missing, out-of-range or invalid inputs pause the total. Imports and new cases retain the fixed reference; the latest import can be undone."
  },
  "文獻評分原型 · 請核對病例資料": {
    "zh-Hant": "文獻評分原型 · 請核對病例資料",
    "zh-Hans": "文献评分原型 · 请核对病例资料",
    "en": "Published-score prototype · Verify case inputs"
  },
  "匯入頭影測量資料": {
    "zh-Hant": "匯入頭影測量資料",
    "zh-Hans": "导入头影测量数据",
    "en": "Import cephalometric data"
  },
  "本機處理": {
    "zh-Hant": "本機處理",
    "zh-Hans": "本地处理",
    "en": "Processed locally"
  },
  "上傳單一患者的資料，先核對辨識結果，再填入對應欄位。支援 Excel（.xlsx）、CSV、TSV、TXT、JSON 與文字型 PDF。": {
    "zh-Hant": "上傳單一患者的資料，先核對辨識結果，再填入對應欄位。支援 Excel（.xlsx）、CSV、TSV、TXT、JSON 與文字型 PDF。",
    "zh-Hans": "上传单一患者的数据，先核对识别结果，再填入对应字段。支持 Excel（.xlsx）、CSV、TSV、TXT、JSON 与文字型 PDF。",
    "en": "Upload one patient's data, review the matches and fill corresponding fields. Supports Excel (.xlsx), CSV, TSV, TXT, JSON and text-based PDF."
  },
  "選擇資料檔案": {
    "zh-Hant": "選擇資料檔案",
    "zh-Hans": "选择数据文件",
    "en": "Choose data file"
  },
  "檔案上限 10 MB；PDF 最多 30 頁。掃描 PDF、影像與 X 光片請先轉成測量表。原始檔案不會傳送至伺服器。": {
    "zh-Hant": "檔案上限 10 MB；PDF 最多 30 頁。掃描 PDF、影像與 X 光片請先轉成測量表。原始檔案不會傳送至伺服器。",
    "zh-Hans": "文件上限 10 MB；PDF 最多 30 页。扫描 PDF、图像与 X 光片请先转为测量表。原始文件不会发送到服务器。",
    "en": "Maximum 10 MB and 30 PDF pages. Convert scanned PDFs, images and radiographs to a measurement table first. Original files are not sent to a server."
  },
  "下載 CSV 範本": {
    "zh-Hant": "下載 CSV 範本",
    "zh-Hans": "下载 CSV 模板",
    "en": "Download CSV template"
  },
  "試用示例資料": {
    "zh-Hant": "試用示例資料",
    "zh-Hans": "试用示例数据",
    "en": "Try sample data"
  },
  "或貼上測量文字": {
    "zh-Hant": "或貼上測量文字",
    "zh-Hans": "或粘贴测量文字",
    "en": "Or paste measurements"
  },
  "每行一個測量項目，例如 ANB: 5°": {
    "zh-Hant": "每行一個測量項目，例如 ANB: 5°",
    "zh-Hans": "每行一个测量项目，例如 ANB: 5°",
    "en": "One measurement per line, e.g. ANB: 5°"
  },
  "辨識貼上資料": {
    "zh-Hant": "辨識貼上資料",
    "zh-Hans": "识别粘贴数据",
    "en": "Read pasted data"
  },
  "選擇工作表": {
    "zh-Hant": "選擇工作表",
    "zh-Hans": "选择工作表",
    "en": "Choose worksheet"
  },
  "填入": {
    "zh-Hant": "填入",
    "zh-Hans": "填入",
    "en": "Fill"
  },
  "來源測量": {
    "zh-Hant": "來源測量",
    "zh-Hans": "来源测量",
    "en": "Source measurement"
  },
  "數值": {
    "zh-Hant": "數值",
    "zh-Hans": "数值",
    "en": "Value"
  },
  "對應項目與狀態": {
    "zh-Hant": "對應項目與狀態",
    "zh-Hans": "对应项目与状态",
    "en": "Matched field and status"
  },
  "填入方式": {
    "zh-Hant": "填入方式",
    "zh-Hans": "填入方式",
    "en": "Import mode"
  },
  "建立空白患者病例（缺失項目留空）": {
    "zh-Hant": "建立空白患者病例（缺失項目留空）",
    "zh-Hans": "建立空白患者病例（缺失项目留空）",
    "en": "New blank patient case (leave missing fields blank)"
  },
  "合併至目前病例（保留未對應欄位）": {
    "zh-Hant": "合併至目前病例（保留未對應欄位）",
    "zh-Hans": "合并到当前病例（保留未匹配字段）",
    "en": "Merge into current case (keep unmatched fields)"
  },
  "建立新病例會清除目前輸入中的示例值；參考病例仍保留。": {
    "zh-Hant": "建立新病例會清除目前輸入中的示例值；參考病例仍保留。",
    "zh-Hans": "建立新病例会清除当前输入中的示例值；参考病例仍保留。",
    "en": "A new case clears current example values. The fixed reference is retained."
  },
  "只替換勾選項目，其餘輸入與參考病例保留。請確認目前病例是同一位患者。": {
    "zh-Hant": "只替換勾選項目，其餘輸入與參考病例保留。請確認目前病例是同一位患者。",
    "zh-Hans": "仅替换勾选项目，其余输入与参考病例保留。请确认当前病例是同一位患者。",
    "en": "Only selected fields are replaced; other inputs and the reference are retained. Confirm the current case belongs to the same patient."
  },
  "填入勾選項目": {
    "zh-Hant": "填入勾選項目",
    "zh-Hans": "填入勾选项目",
    "en": "Fill selected fields"
  },
  "取消匯入": {
    "zh-Hant": "取消匯入",
    "zh-Hans": "取消导入",
    "en": "Cancel import"
  },
  "可自動對應 ANB、U1–SN、SN–MP、Overjet、Overbite，以及名稱與單位完全對應的其他數值項目。百分比覆咬不換算為 mm；FMA、SN–GoGn 與上下唇 E-line 不直接替代本計算機欄位。一般 E-line 數值需確認唇參考與正負方向後再勾選。": {
    "zh-Hant": "可自動對應 ANB、U1–SN、SN–MP、Overjet、Overbite，以及名稱與單位完全對應的其他數值項目。百分比覆咬不換算為 mm；FMA、SN–GoGn 與上下唇 E-line 不直接替代本計算機欄位。一般 E-line 數值需確認唇參考與正負方向後再勾選。",
    "zh-Hans": "可自动匹配 ANB、U1–SN、SN–MP、Overjet、Overbite，以及名称与单位完全对应的其他数值项目。百分比覆（牙合）不换算为 mm；FMA、SN–GoGn 与上下唇 E-line 不直接替代本计算机字段。一般 E-line 数值需确认唇参考与正负方向后再勾选。",
    "en": "ANB, U1–SN, SN–MP, overjet, overbite and other exactly named numeric fields can be matched. Percentage overbite is not converted to mm. FMA, SN–GoGn and upper/lower lip E-line values are not substituted. Confirm the lip reference and sign convention before selecting a generic E-line value."
  },
  "只使用患者實測值，不使用正常值、平均值或標準差。重複而不同的數值、未知單位與多個時間點不自動填入；治療選擇和臨床有無項目仍由使用者確認。": {
    "zh-Hant": "只使用患者實測值，不使用正常值、平均值或標準差。重複而不同的數值、未知單位與多個時間點不自動填入；治療選擇和臨床有無項目仍由使用者確認。",
    "zh-Hans": "仅使用患者实测值，不使用正常值、平均值或标准差。重复且不同的数值、未知单位与多个时间点不自动填入；治疗选择和临床有无项目仍由用户确认。",
    "en": "Only patient measurements are used, not normal values, means or standard deviations. Conflicting values, unknown units and multiple time points are not filled automatically. Treatment choices and clinical presence/absence require user confirmation."
  },
  "撤銷最近一次填入": {
    "zh-Hant": "撤銷最近一次填入",
    "zh-Hans": "撤销最近一次填入",
    "en": "Undo latest import"
  },
  "CAT-CAT 完整度 {done} / {total}": {
    "zh-Hant": "CAT-CAT 完整度 {done} / {total}",
    "zh-Hans": "CAT-CAT 完整度 {done} / {total}",
    "en": "CAT-CAT completeness {done} / {total}"
  },
  "尚有 {count} 項待補齊或確認，總分顯示 —。": {
    "zh-Hant": "尚有 {count} 項待補齊或確認，總分顯示 —。",
    "zh-Hans": "还有 {count} 项待补齐或确认，总分显示 —。",
    "en": "{count} item(s) need completion or confirmation. The total shows —."
  },
  "必填項目已齊全，可核對總分與逐項分數。": {
    "zh-Hant": "必填項目已齊全，可核對總分與逐項分數。",
    "zh-Hans": "必填项目已齐全，可核对总分与逐项分数。",
    "en": "Required items are complete. Review the total and item scores."
  },
  "另有 {count} 項": {
    "zh-Hant": "另有 {count} 項",
    "zh-Hans": "另有 {count} 项",
    "en": "{count} more items"
  },
  "目前所有 CAT-CAT 項目均為 0 分。": {
    "zh-Hant": "目前所有 CAT-CAT 項目均為 0 分。",
    "zh-Hans": "当前所有 CAT-CAT 项目均为 0 分。",
    "en": "All CAT-CAT items currently score zero."
  },
  "逐項分數加總 = {total} 分。": {
    "zh-Hant": "逐項分數加總 = {total} 分。",
    "zh-Hans": "逐项分数加总 = {total} 分。",
    "en": "Sum of item scores = {total} points."
  },
  "CAT-CAT 總分相同，請查看輸入與逐項分數差異。": {
    "zh-Hant": "CAT-CAT 總分相同，請查看輸入與逐項分數差異。",
    "zh-Hans": "CAT-CAT 总分相同，请查看输入与逐项分数差异。",
    "en": "CAT-CAT totals are equal. Review the inputs and item-score differences."
  },
  "目前病例 CAT-CAT 總分{direction} {amount} 分；分數差異不代表治療效果。": {
    "zh-Hant": "目前病例 CAT-CAT 總分{direction} {amount} 分；分數差異不代表治療效果。",
    "zh-Hans": "当前病例 CAT-CAT 总分{direction} {amount} 分；分数差异不代表治疗效果。",
    "en": "The current CAT-CAT total has {direction} by {amount} points. Score differences do not indicate treatment effects."
  },
  "CAT-CAT 總分 · 同一刻度 0–{max} 分": {
    "zh-Hant": "CAT-CAT 總分 · 同一刻度 0–{max} 分",
    "zh-Hans": "CAT-CAT 总分 · 同一刻度 0–{max} 分",
    "en": "CAT-CAT total · Shared scale 0–{max} points"
  },
  "已匯出病例輸入、逐項評分、資料來源與比較結果。": {
    "zh-Hant": "已匯出病例輸入、逐項評分、資料來源與比較結果。",
    "zh-Hans": "已导出病例输入、逐项评分、数据来源与比较结果。",
    "en": "Exported inputs, item scores, data sources and comparisons."
  },
  "檔案或資料表過大，請縮減至單一患者的測量資料。": {
    "zh-Hant": "檔案或資料表過大，請縮減至單一患者的測量資料。",
    "zh-Hans": "文件或数据表过大，请缩减为单一患者的测量数据。",
    "en": "The file or table is too large. Keep only one patient's measurements."
  },
  "此格式尚不支援，請使用 XLSX、CSV、TSV、TXT、JSON 或文字型 PDF。": {
    "zh-Hant": "此格式尚不支援，請使用 XLSX、CSV、TSV、TXT、JSON 或文字型 PDF。",
    "zh-Hans": "暂不支持此格式，请使用 XLSX、CSV、TSV、TXT、JSON 或文字型 PDF。",
    "en": "Unsupported format. Use XLSX, CSV, TSV, TXT, JSON or text-based PDF."
  },
  "資料包含多位患者或多個時間點，請先保留要匯入的一位患者與一個時間點。": {
    "zh-Hant": "資料包含多位患者或多個時間點，請先保留要匯入的一位患者與一個時間點。",
    "zh-Hans": "数据包含多位患者或多个时间点，请先保留要导入的一位患者与一个时间点。",
    "en": "Multiple patients or time points were found. Keep one patient and one time point before importing."
  },
  "患者數值欄不明確，請以「測量項目、測量值、單位」整理資料。": {
    "zh-Hant": "患者數值欄不明確，請以「測量項目、測量值、單位」整理資料。",
    "zh-Hans": "患者数值列不明确，请按“测量项目、测量值、单位”整理数据。",
    "en": "The patient-value column is unclear. Use Measurement, Value and Unit columns."
  },
  "資料只有正常值或未明確標示患者值，請新增「測量值」欄。": {
    "zh-Hant": "資料只有正常值或未明確標示患者值，請新增「測量值」欄。",
    "zh-Hans": "数据仅有正常值或未明确标注患者值，请新增“测量值”列。",
    "en": "Only normal values or unlabeled values were found. Add a patient Value column."
  },
  "PDF 未找到可讀文字，請改用測量表或可選取文字的 PDF。": {
    "zh-Hant": "PDF 未找到可讀文字，請改用測量表或可選取文字的 PDF。",
    "zh-Hans": "PDF 未找到可读文字，请改用测量表或可选取文字的 PDF。",
    "en": "No readable PDF text was found. Use a measurement table or a PDF with selectable text."
  },
  "PDF 超過 30 頁，請只保留頭影測量資料頁。": {
    "zh-Hant": "PDF 超過 30 頁，請只保留頭影測量資料頁。",
    "zh-Hans": "PDF 超过 30 页，请只保留头影测量数据页。",
    "en": "The PDF exceeds 30 pages. Keep only the cephalometric measurement pages."
  },
  "無法讀取資料，請核對檔案內容或改用 CSV 範本。": {
    "zh-Hant": "無法讀取資料，請核對檔案內容或改用 CSV 範本。",
    "zh-Hans": "无法读取数据，请核对文件内容或改用 CSV 模板。",
    "en": "Could not read the data. Check the file or use the CSV template."
  },
  "讀取元件未載入，請重新整理後再試。": {
    "zh-Hant": "讀取元件未載入，請重新整理後再試。",
    "zh-Hans": "读取组件未加载，请刷新后重试。",
    "en": "The reader did not load. Refresh and try again."
  },
  "名稱與數值已對應": {
    "zh-Hant": "名稱與數值已對應",
    "zh-Hans": "名称与数值已匹配",
    "en": "Name and value matched"
  },
  "請確認唇參考與正負方向，再勾選": {
    "zh-Hant": "請確認唇參考與正負方向，再勾選",
    "zh-Hans": "请确认唇参考与正负方向，再勾选",
    "en": "Confirm the lip reference and sign convention before selecting"
  },
  "參考平面或唇位置不同，請手動核對": {
    "zh-Hant": "參考平面或唇位置不同，請手動核對",
    "zh-Hans": "参考平面或唇位置不同，请手动核对",
    "en": "Different plane or lip reference; review manually"
  },
  "缺少有效數值": {
    "zh-Hant": "缺少有效數值",
    "zh-Hans": "缺少有效数值",
    "en": "No valid numeric value"
  },
  "單位不符，不填入": {
    "zh-Hant": "單位不符，不填入",
    "zh-Hans": "单位不符，不填入",
    "en": "Unit mismatch; not filled"
  },
  "超出欄位範圍，不填入": {
    "zh-Hant": "超出欄位範圍，不填入",
    "zh-Hans": "超出字段范围，不填入",
    "en": "Out of range; not filled"
  },
  "數值欄不明確，不填入": {
    "zh-Hant": "數值欄不明確，不填入",
    "zh-Hans": "数值列不明确，不填入",
    "en": "Value column unclear; not filled"
  },
  "同一項目數值衝突，不填入": {
    "zh-Hant": "同一項目數值衝突，不填入",
    "zh-Hans": "同一项目数值冲突，不填入",
    "en": "Conflicting values; not filled"
  },
  "已辨識 {count} 項，可填入 {selected} 項。請核對下列對應。": {
    "zh-Hant": "已辨識 {count} 項，可填入 {selected} 項。請核對下列對應。",
    "zh-Hans": "已识别 {count} 项，可填入 {selected} 项。请核对以下匹配。",
    "en": "Recognized {count} item(s); {selected} selected to fill. Review the matches below."
  },
  "填入 {label}": {
    "zh-Hant": "填入 {label}",
    "zh-Hans": "填入 {label}",
    "en": "Fill {label}"
  },
  "沒有找到可對應項目，請手動填寫或使用範本整理資料。": {
    "zh-Hant": "沒有找到可對應項目，請手動填寫或使用範本整理資料。",
    "zh-Hans": "未找到可匹配项目，请手动填写或按模板整理数据。",
    "en": "No matching items found. Fill manually or organize the data using the template."
  },
  "貼上文字": {
    "zh-Hant": "貼上文字",
    "zh-Hans": "粘贴文字",
    "en": "Pasted text"
  },
  "正在本機讀取資料…": {
    "zh-Hant": "正在本機讀取資料…",
    "zh-Hans": "正在本地读取数据…",
    "en": "Reading data locally…"
  },
  "已填入 {count} 項；請手動補齊其餘資料。": {
    "zh-Hant": "已填入 {count} 項；請手動補齊其餘資料。",
    "zh-Hans": "已填入 {count} 项；请手动补齐其余数据。",
    "en": "Filled {count} item(s). Complete the remaining fields manually."
  },
  "已匯入測量資料": {
    "zh-Hant": "已匯入測量資料",
    "zh-Hans": "已导入测量数据",
    "en": "Measurements imported"
  },
  "已撤銷最近一次填入，恢復先前輸入。": {
    "zh-Hant": "已撤銷最近一次填入，恢復先前輸入。",
    "zh-Hans": "已撤销最近一次填入，恢复之前的输入。",
    "en": "Latest import undone. Previous inputs restored."
  },
  "已建立空白患者病例": {
    "zh-Hant": "已建立空白患者病例",
    "zh-Hans": "已建立空白患者病例",
    "en": "Blank patient case created"
  },
  "請填入患者資料；未知項目留空，不當作 0。": {
    "zh-Hant": "請填入患者資料；未知項目留空，不當作 0。",
    "zh-Hans": "请填入患者数据；未知项目留空，不视为 0。",
    "en": "Enter patient data. Leave unknown fields blank; they are not zero."
  },
  "已下載空白範本；請填入患者實測值，勿填正常值。": {
    "zh-Hant": "已下載空白範本；請填入患者實測值，勿填正常值。",
    "zh-Hans": "已下载空白模板；请填入患者实测值，请勿填正常值。",
    "en": "Blank template downloaded. Enter patient measurements, not normal values."
  },
  "範圍 {min}–{max} {unit}": {
    "zh-Hant": "範圍 {min}–{max} {unit}",
    "zh-Hans": "范围 {min}–{max} {unit}",
    "en": "Range: {min}–{max} {unit}"
  },
  "v1.0": {
    "zh-Hant": "v1.0",
    "zh-Hans": "v1.0",
    "en": "v1.0"
  },
  "計算機 v1.1": {
    "zh-Hant": "計算機 v1.1",
    "zh-Hans": "计算机 v1.1",
    "en": "Calculator v1.1"
  },
  "v1.1": {
    "zh-Hant": "v1.1",
    "zh-Hans": "v1.1",
    "en": "v1.1"
  },
  "病例管理": {
    "zh-Hant": "病例管理",
    "zh-Hans": "病例管理",
    "en": "Case management"
  },
  "病例名稱": {
    "zh-Hant": "病例名稱",
    "zh-Hans": "病例名称",
    "en": "Case name"
  },
  "保存病例": {
    "zh-Hant": "保存病例",
    "zh-Hans": "保存病例",
    "en": "Save case"
  },
  "另存新病例": {
    "zh-Hant": "另存新病例",
    "zh-Hans": "另存新病例",
    "en": "Save as new case"
  },
  "已保存病例": {
    "zh-Hant": "已保存病例",
    "zh-Hans": "已保存病例",
    "en": "Saved cases"
  },
  "開啟病例": {
    "zh-Hant": "開啟病例",
    "zh-Hans": "打开病例",
    "en": "Open case"
  },
  "匯出病例備份": {
    "zh-Hant": "匯出病例備份",
    "zh-Hans": "导出病例备份",
    "en": "Export case backup"
  },
  "還原病例備份": {
    "zh-Hant": "還原病例備份",
    "zh-Hans": "还原病例备份",
    "en": "Restore case backup"
  },
  "可保存尚未填完的病例。病例保存在此瀏覽器；可匯出備份，供還原或移至其他裝置。新建或開啟前，請保存目前更改。": {
    "zh-Hant": "可保存尚未填完的病例。病例保存在此瀏覽器；可匯出備份，供還原或移至其他裝置。新建或開啟前，請保存目前更改。",
    "zh-Hans": "可保存尚未填完的病例。病例保存在此浏览器；可导出备份，用于还原或迁移至其他设备。新建或打开前，请保存当前更改。",
    "en": "You can save incomplete cases. Cases are stored in this browser. Export a backup to restore them or move them to another device. Save current changes before creating or opening a case."
  },
  "上傳單一患者的測量表或報告；也可直接貼上段落。辨識常見別名、敘述與不同表格布局，先核對來源與數值，再填入。支援 PDF、Word（.docx）、Excel（.xlsx）及文字資料。": {
    "zh-Hant": "上傳單一患者的測量表或報告；也可直接貼上段落。辨識常見別名、敘述與不同表格布局，先核對來源與數值，再填入。支援 PDF、Word（.docx）、Excel（.xlsx）及文字資料。",
    "zh-Hans": "上传单一患者的测量表或报告；也可直接粘贴段落。识别常见别名、描述与不同表格布局，先核对来源与数值，再填入。支持 PDF、Word（.docx）、Excel（.xlsx）及文本资料。",
    "en": "Upload a measurement sheet or report for one patient, or paste a paragraph. Common aliases, prose and varied tables are recognized. Review sources and values before applying. Supports PDF, Word (.docx), Excel (.xlsx) and text files."
  },
  "貼上表格或報告段落，不需固定格式": {
    "zh-Hant": "貼上表格或報告段落，不需固定格式",
    "zh-Hans": "粘贴表格或报告段落，无需固定格式",
    "en": "Paste a table or report paragraph; no fixed layout is required"
  },
  "顯示其他數值，手動選擇對應": {
    "zh-Hant": "顯示其他數值，手動選擇對應",
    "zh-Hans": "显示其他数值，手动选择对应",
    "en": "Show other values for manual mapping"
  },
  "勾選表示已核對。衝突值與上、下唇數值需自行選擇，並確認正負方向；同一欄位只會填入一個值。": {
    "zh-Hant": "勾選表示已核對。衝突值與上、下唇數值需自行選擇，並確認正負方向；同一欄位只會填入一個值。",
    "zh-Hans": "勾选表示已核对。冲突值与上、下唇数值需自行选择，并确认正负方向；同一字段只会填入一个值。",
    "en": "Checking a value confirms your review. Select between conflicting values or upper and lower lip measurements, and verify the sign convention. Each field receives only one value."
  },
  "原始檔案與全文不保留；病例保存已確認的欄位值及測量名稱、頁碼等來源。病例及草稿保存在此瀏覽器，可匯出 JSON 備份並還原。": {
    "zh-Hant": "原始檔案與全文不保留；病例保存已確認的欄位值及測量名稱、頁碼等來源。病例及草稿保存在此瀏覽器，可匯出 JSON 備份並還原。",
    "zh-Hans": "原始文件与全文不保留；病例保存已确认的字段值及测量名称、页码等来源。病例及草稿保存在此浏览器，可导出 JSON 备份并还原。",
    "en": "Original files and full text are not retained. Cases store confirmed field values and measurement names, page numbers and other source references. Cases and drafts are stored in this browser and can be backed up and restored as JSON."
  },
  "此格式尚不支援，請使用 PDF、DOCX、XLSX、CSV、TSV、TXT、JSON、HTML 或 Markdown。": {
    "zh-Hant": "此格式尚不支援，請使用 PDF、DOCX、XLSX、CSV、TSV、TXT、JSON、HTML 或 Markdown。",
    "zh-Hans": "此格式尚不支持，请使用 PDF、DOCX、XLSX、CSV、TSV、TXT、JSON、HTML 或 Markdown。",
    "en": "This format is not supported. Use PDF, DOCX, XLSX, CSV, TSV, TXT, JSON, HTML or Markdown."
  },
  "同一項目數值衝突，請選擇確認一個值": {
    "zh-Hant": "同一項目數值衝突，請選擇確認一個值",
    "zh-Hans": "同一项目数值冲突，请选择确认一个值",
    "en": "Conflicting values: choose and confirm one"
  },
  "請確認採用上唇或下唇及正負方向": {
    "zh-Hant": "請確認採用上唇或下唇及正負方向",
    "zh-Hans": "请确认采用上唇或下唇及正负方向",
    "en": "Confirm the chosen lip and the sign"
  },
  "尚未對應，可手動選擇欄位": {
    "zh-Hant": "尚未對應，可手動選擇欄位",
    "zh-Hans": "尚未对应，可手动选择字段",
    "en": "Unmapped: choose a field manually"
  },
  "手動對應，請勾選確認": {
    "zh-Hant": "手動對應，請勾選確認",
    "zh-Hans": "手动对应，请勾选确认",
    "en": "Manually mapped: check to confirm"
  },
  "已由使用者確認": {
    "zh-Hant": "已由使用者確認",
    "zh-Hans": "已由用户确认",
    "en": "Confirmed by user"
  },
  "頁碼 {pages}": {
    "zh-Hant": "頁碼 {pages}",
    "zh-Hans": "页码 {pages}",
    "en": "Page(s) {pages}"
  },
  "來源行 {line}": {
    "zh-Hant": "來源行 {line}",
    "zh-Hans": "来源行 {line}",
    "en": "Source line {line}"
  },
  "{count} 次出現": {
    "zh-Hant": "{count} 次出現",
    "zh-Hans": "出现 {count} 次",
    "en": "{count} occurrences"
  },
  "選擇 {label} 的對應欄位": {
    "zh-Hant": "選擇 {label} 的對應欄位",
    "zh-Hans": "选择 {label} 的对应字段",
    "en": "Choose a field for {label}"
  },
  "不填入": {
    "zh-Hant": "不填入",
    "zh-Hans": "不填入",
    "en": "Do not apply"
  },
  "沒有找到可對應項目；可顯示其他數值並手動對應，或直接補填。": {
    "zh-Hant": "沒有找到可對應項目；可顯示其他數值並手動對應，或直接補填。",
    "zh-Hans": "没有找到可对应项目；可显示其他数值并手动对应，或直接补填。",
    "en": "No matched items. Show other values for manual mapping, or complete fields directly."
  },
  "已對應 {count} 項，已勾選 {selected} 項；另有 {other} 個數值可手動對應。": {
    "zh-Hant": "已對應 {count} 項，已勾選 {selected} 項；另有 {other} 個數值可手動對應。",
    "zh-Hans": "已对应 {count} 项，已勾选 {selected} 项；另有 {other} 个数值可手动对应。",
    "en": "{count} matched, {selected} selected; {other} other values available for manual mapping."
  },
  "有未保存更改": {
    "zh-Hant": "有未保存更改",
    "zh-Hans": "有未保存更改",
    "en": "Unsaved changes"
  },
  "尚未保存病例": {
    "zh-Hant": "尚未保存病例",
    "zh-Hans": "尚未保存病例",
    "en": "Case not yet saved"
  },
  "待補齊": {
    "zh-Hant": "待補齊",
    "zh-Hans": "待补齐",
    "en": "Incomplete"
  },
  "尚無已保存病例": {
    "zh-Hant": "尚無已保存病例",
    "zh-Hans": "尚无已保存病例",
    "en": "No saved cases"
  },
  "已保存「{name}」，可從已保存病例重新開啟。": {
    "zh-Hant": "已保存「{name}」，可從已保存病例重新開啟。",
    "zh-Hans": "已保存“{name}”，可从已保存病例重新打开。",
    "en": "Saved “{name}”. Reopen it from saved cases."
  },
  "病例已保存（此瀏覽器）。": {
    "zh-Hant": "病例已保存（此瀏覽器）。",
    "zh-Hans": "病例已保存（此浏览器）。",
    "en": "Case saved in this browser."
  },
  "此瀏覽器無法保存病例，請先匯出備份。": {
    "zh-Hant": "此瀏覽器無法保存病例，請先匯出備份。",
    "zh-Hans": "此浏览器无法保存病例，请先导出备份。",
    "en": "This browser could not save the case. Export a backup first."
  },
  "已開啟「{name}」。": {
    "zh-Hant": "已開啟「{name}」。",
    "zh-Hans": "已打开“{name}”。",
    "en": "Opened “{name}”."
  },
  "已還原 {count} 個病例；以新增副本保留目前病例。": {
    "zh-Hant": "已還原 {count} 個病例；以新增副本保留目前病例。",
    "zh-Hans": "已还原 {count} 个病例；以新增副本保留当前病例。",
    "en": "Restored {count} case(s) as new copies. Existing cases are retained."
  },
  "無法還原備份，請使用本計算機匯出的病例備份 JSON。": {
    "zh-Hant": "無法還原備份，請使用本計算機匯出的病例備份 JSON。",
    "zh-Hans": "无法还原备份，请使用本计算机导出的病例备份 JSON。",
    "en": "Could not restore the backup. Use a case backup JSON exported by this calculator."
  },
  "檔案上限 10 MB；文字 PDF 最多 30 頁，掃描辨識最多 10 頁。支援測量報告截圖與掃描 PDF。原始檔案不會傳送至伺服器。": {
    "zh-Hant": "檔案上限 10 MB；文字 PDF 最多 30 頁，掃描辨識最多 10 頁。支援測量報告截圖與掃描 PDF。原始檔案不會傳送至伺服器。",
    "zh-Hans": "文件上限 10 MB；文本 PDF 最多 30 页，扫描识别最多 10 页。支持测量报告截图与扫描 PDF。原始文件不会发送至服务器。",
    "en": "File limit: 10 MB; up to 30 text PDF pages or 10 OCR pages. Measurement screenshots and scanned PDFs are supported. Original files are not sent to the server."
  },
  "正在本機辨識影像文字，第 {page} 頁…": {
    "zh-Hant": "正在本機辨識影像文字，第 {page} 頁…",
    "zh-Hans": "正在本地识别图像文字，第 {page} 页…",
    "en": "Recognizing image text locally, page {page}…"
  },
  "影像文字辨識值，請逐項核對後勾選": {
    "zh-Hant": "影像文字辨識值，請逐項核對後勾選",
    "zh-Hans": "图像文字识别值，请逐项核对后勾选",
    "en": "OCR value: review and check each item"
  },
  "影像文字辨識無法啟動，請改用文字報告或手動填入。": {
    "zh-Hant": "影像文字辨識無法啟動，請改用文字報告或手動填入。",
    "zh-Hans": "图像文字识别无法启动，请改用文本报告或手动填入。",
    "en": "Image text recognition could not start. Use a text report or enter values manually."
  },
  "掃描 PDF 最多辨識 10 頁，請保留測量資料頁。": {
    "zh-Hant": "掃描 PDF 最多辨識 10 頁，請保留測量資料頁。",
    "zh-Hans": "扫描 PDF 最多识别 10 页，请保留测量资料页。",
    "en": "OCR supports up to 10 scanned PDF pages. Keep only the measurement pages."
  },
  "影像超過 2,000 萬像素，請先裁切測量資料區。": {
    "zh-Hant": "影像超過 2,000 萬像素，請先裁切測量資料區。",
    "zh-Hans": "图像超过 2,000 万像素，请先裁剪测量资料区域。",
    "en": "Image exceeds 20 megapixels. Crop to the measurement area first."
  },
  "未找到可讀文字，請使用清晰的測量報告截圖。": {
    "zh-Hant": "未找到可讀文字，請使用清晰的測量報告截圖。",
    "zh-Hans": "未找到可读文字，请使用清晰的测量报告截图。",
    "en": "No readable text was found. Use a clear screenshot of the measurement report."
  },
  "正在讀取 PDF 內的測量文字…": {"zh-Hant":"正在讀取 PDF 內的測量文字…","zh-Hans":"正在读取 PDF 内的测量文字…","en":"Reading measurement text from the PDF…"},
  "重新讀取所選報告": {"zh-Hant":"重新讀取所選報告","zh-Hans":"重新读取所选报告","en":"Read selected report again"},
  "計算機 v1.11": {
    "zh-Hant": "計算機 v1.11",
    "zh-Hans": "计算机 v1.11",
    "en": "Calculator v1.11"
  },
  "v1.11": {
    "zh-Hant": "v1.11",
    "zh-Hans": "v1.11",
    "en": "v1.11"
  },
  "總分為 CAT-CAT 文獻項目的加總，沒有固定滿分。原文未提供低、中、高總分分界值，本計算機僅顯示總分與逐項貢獻。": {
    "zh-Hant": "總分為 CAT-CAT 文獻項目的加總，沒有固定滿分。原文未提供低、中、高總分分界值，本計算機僅顯示總分與逐項貢獻。",
    "zh-Hans": "总分为 CAT-CAT 文献项目的加总，没有固定满分。原文未提供低、中、高总分分界值，本计算机仅显示总分与逐项贡献。",
    "en": "The total is the sum of published CAT-CAT item scores, with no fixed maximum. The paper does not specify low, moderate or high total cutoffs. This calculator displays totals and item contributions."
  },
  "報告讀取進度": {
    "zh-Hant": "報告讀取進度",
    "zh-Hans": "报告读取进度",
    "en": "Report reading progress"
  },
  "讀取檔案": {
    "zh-Hant": "讀取檔案",
    "zh-Hans": "读取文件",
    "en": "Read file"
  },
  "解析報告": {
    "zh-Hant": "解析報告",
    "zh-Hans": "解析报告",
    "en": "Read report"
  },
  "對應數值": {
    "zh-Hant": "對應數值",
    "zh-Hans": "对应数值",
    "en": "Match values"
  },
  "核對後填入": {
    "zh-Hant": "核對後填入",
    "zh-Hans": "核对后填入",
    "en": "Review and apply"
  },
  "來源測量與實測資料": {
    "zh-Hant": "來源測量與實測資料",
    "zh-Hans": "来源测量与实测资料",
    "en": "Measurement and source values"
  },
  "或貼上測量文字（上傳無法讀取時可用）": {
    "zh-Hant": "或貼上測量文字（上傳無法讀取時可用）",
    "zh-Hans": "或粘贴测量文字（上传无法读取时可用）",
    "en": "Or paste measurement text (if upload cannot be read)"
  },
  "已讀取 {pages} 頁、{rows} 行資料；請核對實測值，勿採用正常值。": {
    "zh-Hant": "已讀取 {pages} 頁、{rows} 行資料；請核對實測值，勿採用正常值。",
    "zh-Hans": "已读取 {pages} 页、{rows} 行资料；请核对实测值，请勿采用正常值。",
    "en": "Read {pages} pages and {rows} rows. Review patient measurements, not normal values."
  },
  "請核對來源數值與單位；缺失項目留空。": {
    "zh-Hant": "請核對來源數值與單位；缺失項目留空。",
    "zh-Hans": "请核对来源数值与单位；缺失项目留空。",
    "en": "Review source values and units. Leave missing items blank."
  },
  "報告已讀取，但尚未找到自動對應項目。可顯示其他數值並手動對應，或貼上測量文字。": {
    "zh-Hant": "報告已讀取，但尚未找到自動對應項目。可顯示其他數值並手動對應，或貼上測量文字。",
    "zh-Hans": "报告已读取，但尚未找到自动对应项目。可显示其他数值并手动对应，或粘贴测量文字。",
    "en": "The report was read, but no fields matched automatically. Show other values for manual mapping, or paste the measurement text."
  },
  "正在讀取報告，第 {page}／{total} 頁…": {
    "zh-Hant": "正在讀取報告，第 {page}／{total} 頁…",
    "zh-Hans": "正在读取报告，第 {page}／{total} 页…",
    "en": "Reading report, page {page}/{total}…"
  },
  "正在對應測量名稱與實測值…": {
    "zh-Hant": "正在對應測量名稱與實測值…",
    "zh-Hans": "正在对应测量名称与实测值…",
    "en": "Matching measurement names and patient values…"
  },
  "正在載入報告讀取元件…": {
    "zh-Hant": "正在載入報告讀取元件…",
    "zh-Hans": "正在加载报告读取组件…",
    "en": "Loading the report reader…"
  },
  "載入讀取元件": {
    "zh-Hant": "載入讀取元件",
    "zh-Hans": "加载读取组件",
    "en": "Load report reader"
  },
  "讀取失敗，請重新整理後再上傳，或複製報告文字至下方辨識。": {
    "zh-Hant": "讀取失敗，請重新整理後再上傳，或複製報告文字至下方辨識。",
    "zh-Hans": "读取失败，请刷新后重新上传，或复制报告文字至下方识别。",
    "en": "Reading failed. Refresh and upload again, or paste the report text below."
  },
  "在「{stage}」步驟未完成：{message}": {
    "zh-Hant": "在「{stage}」步驟未完成：{message}",
    "zh-Hans": "在“{stage}”步骤未完成：{message}",
    "en": "Could not complete “{stage}”: {message}"
  },
  "報告讀取元件未能載入，請重新整理後重試，或貼上報告文字。": {
    "zh-Hant": "報告讀取元件未能載入，請重新整理後重試，或貼上報告文字。",
    "zh-Hans": "报告读取组件未能加载，请刷新后重试，或粘贴报告文字。",
    "en": "The report reader did not load. Refresh and retry, or paste the report text."
  },
  "PDF 需要密碼，請先另存為無密碼的報告再匯入。": {
    "zh-Hant": "PDF 需要密碼，請先另存為無密碼的報告再匯入。",
    "zh-Hans": "PDF 需要密码，请先另存为无密码的报告再导入。",
    "en": "The PDF needs a password. Save an unlocked report before importing."
  },
  "PDF 格式損壞或無效，請重新匯出測量報告。": {
    "zh-Hant": "PDF 格式損壞或無效，請重新匯出測量報告。",
    "zh-Hans": "PDF 格式损坏或无效，请重新导出测量报告。",
    "en": "The PDF is damaged or invalid. Export the measurement report again."
  },
  "檔案未能讀取，請重新選擇檔案。": {
    "zh-Hant": "檔案未能讀取，請重新選擇檔案。",
    "zh-Hans": "文件未能读取，请重新选择文件。",
    "en": "The file could not be read. Select it again."
  }
};
  let lang='zh-Hant';
  try{const saved=localStorage.getItem('catcat-demo-language-v1');if(['zh-Hant','zh-Hans','en'].includes(saved))lang=saved;}catch{}
  const records=[];
  function t(key,params={}){let value=dictionary[key]?.[lang]??key;return value.replace(/\{(\w+)\}/g,(_,k)=>params[k]??`{${k}}`);}
  function capture(root){
    const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    while(walk.nextNode()){
      const node=walk.currentNode;
      if(node.parentElement?.closest('script,style,#language,#terminology table'))continue;
      const key=node.textContent.trim();
      if(dictionary[key])records.push({node,key,prefix:node.textContent.match(/^\s*/)[0],suffix:node.textContent.match(/\s*$/)[0]});
    }
    for(const node of root.querySelectorAll('[aria-label],meta[name="description"]')){
      const attr=node.tagName==='META'?'content':'aria-label',key=node.getAttribute(attr);
      if(dictionary[key])records.push({node,key,attr});
    }
  }
  function apply(){
    for(const rec of records){if(!rec.node.isConnected)continue;if(rec.attr)rec.node.setAttribute(rec.attr,t(rec.key));else rec.node.textContent=rec.prefix+t(rec.key)+rec.suffix;}
    document.documentElement.lang=lang;
    document.title=t('CAT-CAT 計算機');
    document.querySelector('meta[name="description"]').content=t('CAT-CAT 計算機。依文獻計算項目分數，匯入頭影測量資料並比較病例輸入。');
  }
  function set(next){if(!['zh-Hant','zh-Hans','en'].includes(next))return;lang=next;try{localStorage.setItem('catcat-demo-language-v1',lang);}catch{}apply();}
  function error(message,f){if(message?.startsWith('範圍 '))return t('範圍 {min}–{max} {unit}',{min:f.min,max:f.max,unit:t(f.unit)});return t(message||'');}
  window.CatI18n={t,capture,apply,set,error,get lang(){return lang;},get locale(){return {'zh-Hant':'zh-TW','zh-Hans':'zh-CN',en:'en-US'}[lang];},dictionary};
})();
