export interface CompanyStyle {
  id: string;
  name: string;
  emoji: string;
  description: string;
  promptHint: string;
  gradient: string;
}

export const COMPANY_STYLES: CompanyStyle[] = [
  {
    id: 'silicon-valley',
    name: '矽谷新創風',
    emoji: '🚀',
    description: '快速迭代・扁平文化・改變世界',
    promptHint:
      '使用充滿野心和激情的語言。強調「改變世界」、「快速迭代」、「扁平組織」、「10x 影響力」。文風直接且充滿能量，像 Y Combinator 或早期 Stripe 的招募風格。避免官僚語言，追求真實感。',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'traditional-finance',
    name: '傳統金融風',
    emoji: '🏦',
    description: '穩健嚴謹・百年信賴・精英薈萃',
    promptHint:
      '使用莊重、嚴謹且充滿威望的語言。強調「卓越標準」、「精英培訓」、「百年基業」、「業界標竿」。文風正式有格調，展現金融圈的高度專業性，讓人聯想到高盛或摩根士丹利的招募文化。',
    gradient: 'from-slate-500 to-slate-700',
  },
  {
    id: 'gaming-esports',
    name: '熱血電競風',
    emoji: '🎮',
    description: '激情競技・熱血文化・打副本上分',
    promptHint:
      '使用充滿熱情和電競術語的語言。融入「頂尖玩家」、「打副本」、「carry 全隊」、「攻略」、「上分」等概念。文風熱血且有個性，讓電競圈的人一看就有共鳴，感覺找到了歸屬。',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 'esg-sustainability',
    name: 'ESG 永續感',
    emoji: '🌱',
    description: '永續發展・社會責任・為下一代而戰',
    promptHint:
      '使用充滿使命感和責任感的語言。強調「淨零」、「永續轉型」、「世代傳承」、「地球公民」、「ESG 先鋒」。文風真誠且有溫度，讓候選人感受到加入就是在為下一代做出具體貢獻。',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'tech-unicorn',
    name: '科技獨角獸風',
    emoji: '🦄',
    description: '估值破億・高速增長・精英雲集',
    promptHint:
      '使用自信、充滿排他感的語言。強調「獨角獸」、「爆炸性增長」、「顛覆產業」、「億級用戶」。文風讓候選人感覺能加入是一種榮耀，帶有一定程度的精英篩選感，類似 Canva 或 Grab 的招募風格。',
    gradient: 'from-violet-600 to-purple-600',
  },
  {
    id: 'japanese-craftsman',
    name: '日系精工風',
    emoji: '⛩️',
    description: '匠人精神・極致工藝・一絲不苟',
    promptHint:
      '使用精緻、注重細節且帶有東方美學的語言。強調「匠人精神」、「精益求精」、「職人道」、「細節即一切」。文風含蓄而有深度，讓人感受到對品質的極致追求，類似豐田或任天堂的企業文化。',
    gradient: 'from-red-500 to-rose-600',
  },
  {
    id: 'european-luxury',
    name: '歐系精品風',
    emoji: '👔',
    description: '優雅傳承・品味非凡・無懈可擊',
    promptHint:
      '使用優雅、高格調且充滿品味的語言。強調「傳承」、「卓越品味」、「無可挑剔的標準」、「精英文化」。文風貴氣且有歷史感，讓人聯想到 LVMH、Hermès 或頂尖歐系顧問公司的氣質。',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'healthcare',
    name: '醫療專業風',
    emoji: '🏥',
    description: '救死扶傷・臨床卓越・人文關懷',
    promptHint:
      '使用充滿使命感且嚴謹的語言。強調「以病患為中心」、「臨床卓越」、「改善生命品質」、「專業倫理」。文風溫暖而深具專業感，讓人感受到醫療工作的神聖使命和真實的人文關懷。',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    id: 'education',
    name: '教育啟發風',
    emoji: '📚',
    description: '啟發心智・點燃熱情・改變下一代',
    promptHint:
      '使用充滿理想主義和教育情懷的語言。強調「啟發學習」、「改變下一代」、「教育創新」、「點亮未來」。文風充滿熱忱，讓候選人感受到工作不只是工作，而是在做一件有意義、有影響力的事。',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    id: 'government',
    name: '政府公務風',
    emoji: '🏛️',
    description: '服務公眾・正直廉潔・政策影響力',
    promptHint:
      '使用正式、嚴謹但帶出公共價值的語言。強調「服務市民」、「公共利益」、「政策影響力」、「穩定保障」。文風莊重且充滿公職的使命感，突顯公務工作能對社會帶來的深遠影響。',
    gradient: 'from-blue-700 to-indigo-700',
  },
  {
    id: 'media-creative',
    name: '媒體創意風',
    emoji: '🎬',
    description: '說故事・引爆話題・打動百萬人心',
    promptHint:
      '使用充滿創意和想像力的語言。強調「說故事的力量」、「創意無界」、「引爆話題」、「文化製造者」。文風活潑有個性，充滿創意圈的獨特魅力，讓人感受到無限的創作空間和影響力。',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'legal',
    name: '法律嚴謹風',
    emoji: '⚖️',
    description: '邏輯清晰・捍衛公義・無懈可擊',
    promptHint:
      '使用極度精確且充滿邏輯感的語言。強調「邏輯思辨」、「捍衛正義」、「嚴謹分析」、「無懈可擊的論證」。文風莊重嚴謹，展現法律專業的高度，讓人聯想到頂級律師事務所的精英文化。',
    gradient: 'from-gray-600 to-gray-800',
  },
  {
    id: 'aerospace',
    name: '航太工程風',
    emoji: '🛸',
    description: '突破極限・探索未知・工程奇蹟',
    promptHint:
      '使用充滿野心和技術崇拜的語言。強調「突破物理極限」、「探索未知疆域」、「精密工程」、「人類潛能的邊界」。文風充滿使命感和對技術的崇拜，讓人聯想到 SpaceX 或 NASA 的企業精神。',
    gradient: 'from-sky-600 to-blue-700',
  },
  {
    id: 'retail-service',
    name: '零售服務風',
    emoji: '🛍️',
    description: '以客為尊・熱情服務・創造驚喜',
    promptHint:
      '使用溫暖、親切且以人為本的語言。強調「客戶體驗」、「打造驚喜時刻」、「建立真實連結」、「服務的藝術」。文風親切有溫度，讓候選人感受到服務工作的深刻價值和人與人之間的真實互動。',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    id: 'military',
    name: '軍事紀律風',
    emoji: '🎖️',
    description: '紀律嚴明・精英挑選・使命必達',
    promptHint:
      '使用充滿榮耀感和紀律感的語言。強調「精英篩選」、「使命必達」、「袍澤情誼」、「榮耀傳承」。文風鏗鏘有力，帶有精英感和強烈的歸屬感，讓人感受到加入就是加入一個菁英組織的榮耀。',
    gradient: 'from-green-700 to-emerald-800',
  },
  {
    id: 'art-design',
    name: '藝術設計風',
    emoji: '🎨',
    description: '美學驅動・創意無限・設計改變世界',
    promptHint:
      '使用充滿美感、詩意和藝術氣息的語言。強調「美學思維」、「設計即語言」、「視覺革命」、「美的追求」。文風有藝術感和詩意，讓設計師感受到這裡是真正懂美、追求美的地方。',
    gradient: 'from-fuchsia-500 to-pink-600',
  },
  {
    id: 'social-enterprise',
    name: '社會企業風',
    emoji: '💚',
    description: '社會影響力・良善資本・共好經濟',
    promptHint:
      '使用充滿社會使命感的語言。強調「社會影響力」、「弱勢賦權」、「B Corp 精神」、「做好事也賺好錢」。文風真誠有溫度，讓候選人感受到工作能同時創造商業價值和社會正向改變。',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 'biotech',
    name: '生物科技風',
    emoji: '🧬',
    description: '攻克頑疾・科學突破・造福人類',
    promptHint:
      '使用充滿科學熱忱和人道主義精神的語言。強調「突破科學邊界」、「攻克頑疾」、「造福億萬人」、「精準醫療」。文風結合高度技術感和深厚人文關懷，類似 BioNTech 或 Genentech 的企業文化。',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'consulting',
    name: '顧問管理風',
    emoji: '📊',
    description: '策略思維・影響決策・高速成長軌道',
    promptHint:
      '使用充滿智識挑戰和精英感的語言。強調「解決複雜問題」、「影響 CEO 決策」、「快速成長軌道」、「全球視野」。文風充滿智識挑戰感，帶有適度的精英篩選感，類似 McKinsey、BCG 或 Bain 的招募風格。',
    gradient: 'from-blue-600 to-violet-600',
  },
  {
    id: 'ecommerce',
    name: '電商平台風',
    emoji: '📦',
    description: '數據驅動・GMV 破億・用戶爆增',
    promptHint:
      '使用充滿增長驅動和數據思維的語言。強調「億級 GMV」、「用戶爆增」、「數據驅動決策」、「A/B 測試文化」、「超高速成長」。文風充滿業務感，讓人感受到電商世界的節奏和成就感，類似 Shopee 或 PChome 的文化。',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 'web3-blockchain',
    name: '區塊鏈 Web3 風',
    emoji: '⛓️',
    description: '去中心化・加密革命・Token Economy',
    promptHint:
      '使用充滿去中心化精神和革命性語言。強調「去信任化」、「社群治理」、「Token Economy」、「Web3 原住民」、「打破舊秩序」。文風充滿顛覆傳統的激情，讓 Web3 圈的人感受到強烈的文化認同。',
    gradient: 'from-violet-600 to-purple-800',
  },
  {
    id: 'ai-company',
    name: '人工智慧風',
    emoji: '🤖',
    description: 'AI Native・重塑產業・站在科技前沿',
    promptHint:
      '使用充滿前沿科技感的語言。強調「AGI 時代」、「AI Native」、「LLM 應用」、「重塑產業格局」、「站在歷史轉折點」。文風充滿對 AI 未來的熱忱和技術崇拜，讓人感受到正在參與一場改變人類歷史的革命。',
    gradient: 'from-indigo-500 to-purple-600',
  },
];
