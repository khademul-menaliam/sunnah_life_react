// ==============================================================================
// Sunnah of Life - Master Reference Data (Prayers, Hadiths, Sunnahs, Foods, etc.)
// ==============================================================================

export const initialPrayers = [
  {
    id: 1,
    name: 'Fajr',
    arabic_name: 'الفجر',
    transliteration: 'Al-Fajr',
    order_number: 1,
    rakat_fard: 2,
    rakat_sunnah_before: 2,
    rakat_sunnah_after: 0,
    rakat_nafl: 0,
    time_window_description: 'From the beginning of dawn (true dawn) until sunrise.',
    significance: 'The dawn prayer holds immense spiritual blessing. Praying Fajr in congregation or on time places a believer under the direct protection of Allah for the entire day. The two sunnah rakat before Fajr are described as better than this world and everything in it.',
    special_notes: 'Recitation is performed aloud (Jahri) in the Fard rakat.'
  },
  {
    id: 2,
    name: 'Dhuhr',
    arabic_name: 'الظهر',
    transliteration: 'Ad-Dhuhr',
    order_number: 2,
    rakat_fard: 4,
    rakat_sunnah_before: 4,
    rakat_sunnah_after: 2,
    rakat_nafl: 2,
    time_window_description: 'From the zenith (when the sun passes the meridian) until the shadow of an object becomes equal to its length.',
    significance: 'The midday prayer signifies our turning back to Allah amidst our daily chores, business, and study. Consistently observing the sunnah before and after Dhuhr shields a person from hellfire.',
    special_notes: 'On Friday, Jumu\'ah prayer replaces Dhuhr for men in congregation, consisting of a Khutbah (sermon) and 2 Fard rakat. Recitation is silent (Sirri).'
  },
  {
    id: 3,
    name: 'Asr',
    arabic_name: 'العصر',
    transliteration: 'Al-Asr',
    order_number: 3,
    rakat_fard: 4,
    rakat_sunnah_before: 4,
    rakat_sunnah_after: 0,
    rakat_nafl: 0,
    time_window_description: 'From the end of Dhuhr time until the sun begins to turn yellow/sunset.',
    significance: 'The middle prayer (As-Salat Al-Wusta). Allah explicitly commands us to guard our prayers, especially the middle one. Missing Asr intentionally is described in hadiths as causing one\'s good deeds to be lost.',
    special_notes: 'There are no sunnah ba\'diyah (after) prayers for Asr. The 4 sunnah before are highly recommended voluntary prayers. Recitation is silent (Sirri).'
  },
  {
    id: 4,
    name: 'Maghrib',
    arabic_name: 'المغرب',
    transliteration: 'Al-Maghrib',
    order_number: 4,
    rakat_fard: 3,
    rakat_sunnah_before: 2,
    rakat_sunnah_after: 2,
    rakat_nafl: 2,
    time_window_description: 'From immediately after sunset until the red twilight disappears from the sky.',
    significance: 'Maghrib represents the transition from day to night. It is a time of swift transition, and breaking fast (Iftar) occurs at this time. It holds immense rewards for those who hasten to pray it.',
    special_notes: 'Recitation is performed aloud (Jahri) in the first two Fard rakat. The 2 sunnah after are highly emphasized sunnah mu\'akkadah.'
  },
  {
    id: 5,
    name: 'Isha',
    arabic_name: 'العشاء',
    transliteration: 'Al-Isha',
    order_number: 5,
    rakat_fard: 4,
    rakat_sunnah_before: 4,
    rakat_sunnah_after: 2,
    rakat_nafl: 2,
    time_window_description: 'From when the red twilight disappears until midnight (or before dawn, as a necessity).',
    significance: 'The night prayer. Isha in congregation is equivalent to standing in prayer for half the night. It is a beautiful conclusion to the believer\'s day, followed by the highly emphasized Witr prayer.',
    special_notes: 'Recitation is performed aloud (Jahri) in the first two Fard rakat. The Witr prayer (3 rakat in Hanafi or 1/3 in other schools) is performed after Isha or before sleeping.'
  }
];

export const initialHadiths = [
  {
    id: 1,
    prayer_id: 1,
    module: 'prayer',
    arabic_text: 'مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ',
    transliteration: 'Man sallal-bardayni dakhalal-jannah.',
    translation: 'He who prays the two cool prayers (i.e., Fajr and Asr) will enter Paradise.',
    source: 'Sahih Bukhari 574, Sahih Muslim 635',
    narrator: 'Abu Musa Al-Ash\'ari',
    topic: 'Virtue of Fajr and Asr',
    verified: true
  },
  {
    id: 2,
    prayer_id: 1,
    module: 'prayer',
    arabic_text: 'رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا',
    transliteration: 'Rak\'atal-fajri khayrun minad-dunya wa ma fiha.',
    translation: 'The two rakat (sunnah before) Fajr are better than this world and all that it contains.',
    source: 'Sahih Muslim 725',
    narrator: 'Aisha (ra)',
    topic: 'Virtue of Fajr Sunnah',
    verified: true
  },
  {
    id: 3,
    prayer_id: 2,
    module: 'prayer',
    arabic_text: 'مَنْ حَافَظَ عَلَى أَرْبَعِ رَكَعَاتٍ قَبْلَ الظُّهْرِ وَأَرْبَعٍ بَعْدَهَا حَرَّمَهُ اللَّهُ عَلَى النَّارِ',
    transliteration: 'Man hafadha ala arba\'i raka\'atin qabladh-dhuhri wa arba\'in ba\'daha harramahullahu \'alan-nar.',
    translation: 'Whoever consistently observes four rakat before Dhuhr and four rakat after it, Allah will forbid him from the Fire.',
    source: 'Jami at-Tirmidhi 427, Sunan Abu Dawud 1269',
    narrator: 'Umm Habibah',
    topic: 'Virtue of Dhuhr prayers',
    verified: true
  },
  {
    id: 4,
    prayer_id: 3,
    module: 'prayer',
    arabic_text: 'رَحِمَ اللَّهُ امْرَأً صَلَّى قَبْلَ الْعَصْرِ أَرْبَعًا',
    transliteration: 'Rahimallahumra\'an salla qablal-\'asri arba\'a.',
    translation: 'May Allah have mercy on a person who prays four rakat before the Asr prayer.',
    source: 'Jami at-Tirmidhi 430',
    narrator: 'Abdullah ibn Umar',
    topic: 'Virtue of four rakat before Asr',
    verified: true
  },
  {
    id: 5,
    prayer_id: 4,
    module: 'prayer',
    arabic_text: 'صَلُّوا قَبْلَ صَلَاةِ الْمَغْرِبِ قَالَ فِي الثَّالِثَةِ لِمَنْ شَاءَ',
    transliteration: 'Sallu qabla salatil-maghrib...',
    translation: 'Pray before the Maghrib prayer. (He said it three times, adding at the third time: \'For whoever wishes\').',
    source: 'Sahih Bukhari 1183',
    narrator: 'Abdullah ibn Mughaffal',
    topic: 'Sunnah before Maghrib',
    verified: true
  },
  {
    id: 6,
    prayer_id: 5,
    module: 'prayer',
    arabic_text: 'مَنْ صَلَّى الْعِشَاءَ فِي جَمَاعَةٍ فَكَأَنَّمَا قَامَ نِصْفَ اللَّيْلِ',
    transliteration: 'Man salla al-\'isha\'a fi jama\'atin fa ka\'annama qama nisfal-layl.',
    translation: 'Whoever prays Isha in congregation, it is as if he has spent half the night in prayer.',
    source: 'Sahih Muslim 656',
    narrator: 'Uthman ibn Affan',
    topic: 'Congregational Isha Prayer',
    verified: true
  },
  {
    id: 11,
    prayer_id: null,
    module: 'eating',
    arabic_text: 'يَا غُلَامُ سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ',
    transliteration: 'Ya ghulamu sammillaha, wa kul biyamīnika, wa kul mimma yalīka.',
    translation: 'O young boy, mention the name of Allah (say Bismillah), eat with your right hand, and eat from what is nearest to you.',
    source: 'Sahih Bukhari 5376, Sahih Muslim 2022',
    narrator: 'Umar ibn Abi Salama',
    topic: 'Etiquettes of Eating',
    verified: true
  },
  {
    id: 19,
    prayer_id: null,
    module: 'eating',
    arabic_text: 'مَنِ اصْطَبَحَ كُلَّ يَوْمٍ سَبْعَ تَمَرَاتٍ عَجْوَةً، لَمْ يَضُرَّهُ سُمٌّ وَلاَ سِحْرٌ ذَلِكَ الْيَوْمَ إِلَى اللَّيْلِ',
    transliteration: 'Man istabaha kulla yawmin sab\'a tamaratin \'ajwah...',
    translation: 'He who eats seven Ajwa dates every morning will not be harmed by poison or sorcery on that day until night.',
    source: 'Sahih Bukhari 5768',
    narrator: 'Sa\'d ibn Abi Waqqas',
    topic: 'Virtues of Ajwa Dates',
    verified: true
  },
  {
    id: 26,
    prayer_id: null,
    module: 'sunnah',
    arabic_text: 'السِّوَاكُ مَطْهَرَةٌ لِلْفَمِ مَرْضَاةٌ لِلرَّبِّ',
    transliteration: 'As-siwaku matharatun lil-fami mardatun lir-rabb.',
    translation: 'The tooth-stick (Miswak) purifies the mouth and is pleasing to the Lord.',
    source: 'Sunan an-Nasa\'i 5, Sahih Ibn Khuzaymah',
    narrator: 'Aisha (ra)',
    topic: 'Importance of Miswak',
    verified: true
  },
  {
    id: 32,
    prayer_id: null,
    module: 'sunnah',
    arabic_text: 'إِذَا أَتَيْتَ مَضْجَعَكَ فَتَوَضَّأْ وُضُوءَكَ لِلصَّلَاةِ ثُمَّ اضْطَجِعْ عَلَى شِقِّكَ الْأَيْمَنِ',
    transliteration: 'Idha atayta madja\'aka fa tawadda\' wudu\'aka lis-salati thummadtaji\' \'ala shiqqikal-ayman.',
    translation: 'Whenever you intend to go to bed, perform wudu like that for the prayer, then lie down on your right side.',
    source: 'Sahih Bukhari 247, Sahih Muslim 2710',
    narrator: 'Al-Bara ibn Azib',
    topic: 'Sleep Sunnahs',
    verified: true
  },
  {
    id: 49,
    prayer_id: null,
    module: 'income',
    arabic_text: 'لَعَنَ رَسُولُ اللَّهِ ﷺ آكِلَ الرِّبَا وَمُؤْكِلَهُ وَكَاتِبَهُ وَشَاهِدَيْهِ وَقَالَ هُمْ سَوَاءٌ',
    transliteration: 'La\'ana rasulullahi ﷺ akilar-riba wa mu\'kilahu wa katibahu wa shahidayhi wa qala hum sawa\'.',
    translation: 'The Messenger of Allah ﷺ cursed the one who consumes usury (Riba), the one who pays it, the one who records it, and the two witnesses; and he said: They are all equal in sin.',
    source: 'Sahih Muslim 1598',
    narrator: 'Jabir ibn Abdullah',
    topic: 'Prohibition of Usury (Riba)',
    verified: true
  },
  {
    id: 50,
    prayer_id: null,
    module: 'income',
    arabic_text: 'التَّاجِرُ الصَّدُوقُ الأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ',
    transliteration: 'At-tajirus-saduqul-aminu ma\'an-nabiyyina was-siddiqina wash-shuhada\'.',
    translation: 'The truthful and trustworthy merchant will be in the company of the Prophets, the righteous, and the martyrs.',
    source: 'Jami at-Tirmidhi 1209',
    narrator: 'Abu Sa\'id Al-Khudri',
    topic: 'Virtues of an Honest Businessman',
    verified: true
  }
];

export const initialFoods = [
  {
    id: 1,
    name: 'Pork and Swine Flesh',
    arabic_name: 'لحم الخنزير',
    status: 'haram',
    category: 'meat',
    reason: 'Explicitly forbidden in the Quran in multiple verses. Swine are considered impure (Rijs) and highly detrimental to physical and spiritual health.',
    quran_reference: 'Surah Al-Baqarah 2:173, Surah Al-Ma\'idah 5:3'
  },
  {
    id: 2,
    name: 'Alcoholic Beverages and Intoxicants',
    arabic_name: 'الخمر',
    status: 'haram',
    category: 'beverage',
    reason: 'All intoxicants are haram. Intoxication impairs the intellect, leads to sinful behavior, and negates prayers for forty days unless the person repents.',
    quran_reference: 'Surah Al-Ma\'idah 5:90'
  },
  {
    id: 3,
    name: 'Blood (Spilt/Liquid)',
    arabic_name: 'الدم المسفوح',
    status: 'haram',
    category: 'additive',
    reason: 'Liquid blood that flows from an animal when slaughtered is strictly prohibited. It carries toxins and metabolic wastes.',
    quran_reference: 'Surah Al-An\'am 6:145'
  },
  {
    id: 4,
    name: 'Meat of Carnivorous Animals',
    arabic_name: 'سباع البهائم',
    status: 'haram',
    category: 'meat',
    reason: 'Forbidden by the Prophet ﷺ. Any wild beast with canine teeth/fangs (lions, wolves, tigers) is haram to consume.',
    quran_reference: null
  },
  {
    id: 5,
    name: 'Ajwa Dates',
    arabic_name: 'التمر العجوة',
    status: 'halal',
    category: 'fruit',
    reason: 'A supreme Quranic food. Dates are highly nutritious, rich in natural sugars, fiber, and potassium. The Prophet ﷺ stated that eating seven Ajwa dates protects from poison and magic.',
    quran_reference: 'Surah Maryam 19:25'
  },
  {
    id: 6,
    name: 'Pure Natural Honey',
    arabic_name: 'العسل',
    status: 'halal',
    category: 'additive',
    reason: 'Described by Allah as containing a cure for mankind. It acts as a natural antibiotic, antioxidant, throat soother, and energy booster.',
    quran_reference: 'Surah An-Nahl 16:69'
  },
  {
    id: 7,
    name: 'Extra Virgin Olive Oil',
    arabic_name: 'زيت الزيتون',
    status: 'halal',
    category: 'additive',
    reason: 'Olives are mentioned as coming from a blessed tree. Olive oil is excellent for cardiovascular health, reduces bad cholesterol, and nourishes the skin and hair.',
    quran_reference: 'Surah An-Nur 24:35'
  },
  {
    id: 8,
    name: 'Sweet Pomegranate',
    arabic_name: 'الرمان',
    status: 'halal',
    category: 'fruit',
    reason: 'Described as a fruit of Paradise. Pomegranates are loaded with vitamin C, potassium, and powerful anti-inflammatory compounds.',
    quran_reference: 'Surah Ar-Rahman 55:68'
  },
  {
    id: 9,
    name: 'Black Seed (Nigella Sativa / Kalonji)',
    arabic_name: 'الحبة السوداء',
    status: 'halal',
    category: 'additive',
    reason: 'Prophetic medicine. The Prophet ﷺ said: \'Hold on to the black seed, for in it is healing for every disease except death.\'',
    quran_reference: null
  },
  {
    id: 10,
    name: 'Fresh Fish & Seafood',
    arabic_name: 'السمك وصيد البحر',
    status: 'halal',
    category: 'seafood',
    reason: 'Permissible by default. The Prophet ﷺ said regarding the sea: \'Its water is pure and its dead animals are lawful.\'',
    quran_reference: 'Surah Al-Ma\'idah 5:96'
  },
  {
    id: 11,
    name: 'Food with Unknown Gelatin / E-numbers',
    arabic_name: 'أطعمة مشبوهة المصدر',
    status: 'doubtful',
    category: 'additive',
    reason: 'Commercial products containing animal-derived gelatin or enzymes (like pork gelatin E441 or animal rennet) without halal certification should be avoided.',
    quran_reference: null
  },
  {
    id: 12,
    name: 'Raw Garlic & Onions before Congregation',
    arabic_name: 'الثوم والبصل النيء',
    status: 'makruh',
    category: 'additive',
    reason: 'While lawful, consuming pungent raw garlic/onions immediately before going to the mosque is disliked (makruh) due to bad breath that troubles fellow worshippers and angels.',
    quran_reference: null
  }
];

export const initialEtiquettes = [
  {
    id: 1,
    title: 'Washing both hands before eating',
    description: 'Washing the hands thoroughly to remove dirt and bacteria before sitting down for a meal.',
    type: 'sunnah',
    arabic_text: null,
    order_number: 1
  },
  {
    id: 2,
    title: 'Saying Bismillah (In the Name of Allah)',
    description: 'Reciting "Bismillah" before taking the first bite to invite divine blessing and prevent Satan from partaking.',
    type: 'sunnah',
    arabic_text: 'بِسْمِ اللَّهِ',
    order_number: 2
  },
  {
    id: 3,
    title: 'Eating with the right hand',
    description: 'Always using the right hand to handle, bite, and chew food, leaving the left hand for hygiene and other tasks.',
    type: 'sunnah',
    arabic_text: 'كُلْ بِيَمِينِكَ',
    order_number: 3
  },
  {
    id: 4,
    title: 'Eating from what is nearest to you',
    description: 'Eating from the side of the plate or serving dish closest to you instead of reaching across.',
    type: 'sunnah',
    arabic_text: 'وَكُلْ مِمَّا يَلِيكَ',
    order_number: 4
  },
  {
    id: 5,
    title: 'The 1/3 Food, 1/3 Water, 1/3 Air rule',
    description: 'Avoiding overeating by filling one third of the stomach with food, one third with water, and leaving one third empty for breathing.',
    type: 'sunnah',
    arabic_text: 'ثُلُثٌ لِطَعَامِهِ وَثُلُثٌ لِشَرَابِهِ وَثُلُثٌ لِنَفَسِهِ',
    order_number: 5
  },
  {
    id: 6,
    title: 'Sitting down while drinking water',
    description: 'Drinking in small sips while seated, paused across three breaths, rather than gulping standing up.',
    type: 'sunnah',
    arabic_text: null,
    order_number: 6
  },
  {
    id: 7,
    title: 'Praising Allah after finishing (Alhamdulillah)',
    description: 'Expressing gratitude to Allah after the meal has concluded for providing nourishment without one\'s own might.',
    type: 'sunnah',
    arabic_text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا',
    order_number: 7
  },
  {
    id: 8,
    title: 'Never criticizing food',
    description: 'The Prophet ﷺ never criticized food; if he liked it he ate it, and if he disliked it he simply left it politely.',
    type: 'adab',
    arabic_text: null,
    order_number: 8
  }
];

export const initialDuas = [
  {
    id: 1,
    occasion: 'before_eating',
    arabic_text: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
    transliteration: 'Bismillahi wa \'ala barakatillah.',
    translation: 'In the name of Allah and upon the blessings of Allah.'
  },
  {
    id: 2,
    occasion: 'after_eating',
    arabic_text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Alhamdulillahilladhi at\'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.',
    translation: 'All praise is due to Allah Who gave me this food and provided it for me without any strength or power on my part.'
  },
  {
    id: 3,
    occasion: 'forgot_bismillah',
    arabic_text: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
    transliteration: 'Bismillahi awwalahu wa akhirahu.',
    translation: 'In the name of Allah at its beginning and at its end.'
  },
  {
    id: 4,
    occasion: 'iftar',
    arabic_text: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabadh-dhama\'u wabtallatil-\'uruqu wa thabatal-ajru in sha\' Allah.',
    translation: 'The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.'
  },
  {
    id: 5,
    occasion: 'drinking_milk',
    arabic_text: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ',
    transliteration: 'Allahumma barik lana fihi wa zidna minhu.',
    translation: 'O Allah, bless it for us and increase it for us.'
  }
];

export const initialSunnahs = [
  {
    id: 1,
    title: 'Sleeping in a State of Ablution (Wudu)',
    arabic_title: 'النوم على وضوء',
    description: 'Performing a complete wudu just like the one for prayer before going to bed.',
    category: 'sleep',
    difficulty: 'easy',
    is_daily: true,
    time_of_day: 'night',
    order_number: 1
  },
  {
    id: 2,
    title: 'Dusting the Bed Three Times',
    arabic_title: 'نفض الفراش',
    description: 'Dusting the bed sheets or surface three times before lying down to sleep.',
    category: 'sleep',
    difficulty: 'easy',
    is_daily: true,
    time_of_day: 'night',
    order_number: 2
  },
  {
    id: 3,
    title: 'Sleeping on the Right Side',
    arabic_title: 'النوم على الجانب الأيمن',
    description: 'Lying down on your right side with the right hand placed under the right cheek.',
    category: 'sleep',
    difficulty: 'easy',
    is_daily: true,
    time_of_day: 'night',
    order_number: 3
  },
  {
    id: 4,
    title: 'Using the Tooth-stick (Miswak)',
    arabic_title: 'السواك',
    description: 'Using the Miswak or brush to clean teeth, especially when waking up and before each prayer.',
    category: 'hygiene',
    difficulty: 'easy',
    is_daily: true,
    time_of_day: 'morning',
    order_number: 4
  },
  {
    id: 5,
    title: 'Greeting with Salam & Smiling',
    arabic_title: 'إفشاء السلام والتبسم',
    description: 'Smiling in the face of your brother and initiating the greeting: As-salamu \'alaykum wa rahmatullah.',
    category: 'social',
    difficulty: 'easy',
    is_daily: true,
    time_of_day: 'general',
    order_number: 5
  },
  {
    id: 6,
    title: 'Praying Duha (Forenoon Voluntary Prayer)',
    arabic_title: 'صلاة الضحى',
    description: 'Offering 2 to 8 voluntary rakat in the mid-morning after sunrise. Acts as charity on behalf of every joint.',
    category: 'worship',
    difficulty: 'medium',
    is_daily: true,
    time_of_day: 'morning',
    order_number: 6
  },
  {
    id: 7,
    title: 'Reciting Ayat al-Kursi after Every Fard Prayer',
    arabic_title: 'آية الكرسي دبر كل صلاة',
    description: 'Reciting Surah Al-Baqarah (2:255) immediately following the obligatory prayer.',
    category: 'worship',
    difficulty: 'easy',
    is_daily: true,
    time_of_day: 'general',
    order_number: 7
  },
  {
    id: 8,
    title: 'Entering Home with Bismillah and Salam',
    arabic_title: 'دعاء دخول المنزل',
    description: 'Saying Bismillah and greeting the household when entering the home.',
    category: 'morning',
    difficulty: 'easy',
    is_daily: true,
    time_of_day: 'general',
    order_number: 8
  },
  {
    id: 9,
    title: 'Fasting on Mondays and Thursdays',
    arabic_title: 'صيام الإثنين والخميس',
    description: 'Voluntary fasting on the two days when deeds are presented to Allah.',
    category: 'worship',
    difficulty: 'advanced',
    is_daily: false,
    time_of_day: 'morning',
    order_number: 9
  }
];

export const initialAdhkars = [
  {
    id: 1,
    name: 'Al-Mu\'awwidhat (Three Quls)',
    category: 'morning',
    arabic_text: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ {قُلْ هُوَ اللَّهُ أَحَدٌ...} {قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...} {قُلْ أَعُوذُ بِرَبِّ النَّاسِ...}',
    transliteration: 'Recite Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas.',
    translation: 'Recite the three protective chapters of the Quran. (Ikhlas, Falaq, Nas)',
    repetitions: 3,
    source: 'Jami at-Tirmidhi 3575, Abu Dawud 5082',
    time_of_day: 'morning'
  },
  {
    id: 2,
    name: 'Sayyidul Istighfar (Master Supplication for Forgiveness)',
    category: 'morning',
    arabic_text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana \'abduka wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bini\'matika \'alayya wa abu\'u laka bidhanbi faghfir li fa innahu la yaghfirudh-dhunuba illa anta.',
    translation: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your grace upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    repetitions: 1,
    source: 'Sahih Bukhari 6306',
    time_of_day: 'morning'
  },
  {
    id: 3,
    name: 'Protection from All Harm',
    category: 'morning',
    arabic_text: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Bismillahilladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwas-sami\'ul-\'alim.',
    translation: 'In the name of Allah, by whose name nothing in the earth or in the heavens can cause harm, and He is the All-Hearing, the All-Knowing.',
    repetitions: 3,
    source: 'Sunan Abu Dawud 5088, Tirmidhi 3388',
    time_of_day: 'morning'
  },
  {
    id: 4,
    name: 'Seeking Refuge in Allah\'s Perfect Words',
    category: 'evening',
    arabic_text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    transliteration: 'A\'udhu bi kalimatillahit-tammati min sharri ma khalaq.',
    translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    repetitions: 3,
    source: 'Sahih Muslim 2709',
    time_of_day: 'evening'
  },
  {
    id: 5,
    name: 'Tasbih, Tahmid, Takbir (Post-Salah)',
    category: 'after_prayer',
    arabic_text: 'سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٣) لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    transliteration: 'SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x), followed once by La ilaha illallahu wahdahu la sharika lahu...',
    translation: 'Glory be to Allah (33x), Praise be to Allah (33x), Allah is the Greatest (33x), ending with the declaration of oneness. Sins are forgiven even if as vast as the foam of the sea.',
    repetitions: 33,
    source: 'Sahih Muslim 597',
    time_of_day: 'general'
  },
  {
    id: 6,
    name: 'Ayat al-Kursi (Before Sleep)',
    category: 'before_sleep',
    arabic_text: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ...',
    transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyum...',
    translation: 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...',
    repetitions: 1,
    source: 'Sahih Bukhari 2311',
    time_of_day: 'night'
  }
];

export const initialIncomeTypes = [
  {
    id: 1,
    title: 'Software Engineering, AI & Technology',
    category: 'halal',
    industry: 'Information Technology',
    explanation: 'Building ethical software, tools, and digital solutions that benefit people and do not facilitate gambling, adult content, usurious finance, or deception.',
    quran_reference: 'Surah Al-Ma\'idah 5:2'
  },
  {
    id: 2,
    title: 'Ethical Healthcare & Medicine',
    category: 'halal',
    industry: 'Healthcare',
    explanation: 'Providing life-saving medical care, pharmacy, physical therapy, and mental health counseling based on sound medical science.',
    quran_reference: 'Surah Al-Ma\'idah 5:32'
  },
  {
    id: 3,
    title: 'Halal Food Supply & Agriculture',
    category: 'halal',
    industry: 'Food & Agriculture',
    explanation: 'Farming wholesome crops and raising and slaughtering livestock strictly in compliance with Islamic Shariah law.',
    quran_reference: 'Surah Al-Baqarah 2:168'
  },
  {
    id: 4,
    title: 'Interest-Based Banking & Usury (Riba)',
    category: 'haram',
    industry: 'Conventional Finance',
    explanation: 'Earning interest on loans, issuing high-interest credit, or profiting from compound debt is strictly forbidden and constitutes a declaration of war from Allah and His Messenger.',
    quran_reference: 'Surah Al-Baqarah 2:275-279'
  },
  {
    id: 5,
    title: 'Gambling, Casinos & Lottery',
    category: 'haram',
    industry: 'Entertainment & Gaming',
    explanation: 'Games of chance (Maysir) and lotteries where one person wins at the direct financial loss of others are strictly prohibited.',
    quran_reference: 'Surah Al-Ma\'idah 5:90'
  },
  {
    id: 6,
    title: 'High Uncertainty (Gharar) & Speculative Trading',
    category: 'doubtful',
    industry: 'Financial Trading',
    explanation: 'Binary options, hyper-leveraged forex, and derivatives where the trader does not own the underlying asset and relies purely on short-term price gambling.',
    quran_reference: null
  }
];

export const initialFinanceConcepts = [
  {
    id: 1,
    title: 'Mudarabah (Profit-Sharing Partnership)',
    arabic_title: 'المضاربة',
    category: 'Partnership',
    summary: 'One party provides 100% of the capital (Rab-ul-Mal) and the other manages the enterprise with expertise (Mudarib).',
    detailed_explanation: 'Profits are distributed according to a predetermined percentage ratio. Financial losses are borne solely by the capital provider unless there is proven fraud or negligence by the manager.',
    key_principles: 'Capital from one party, effort from another; Profit shared as percentages; Loss borne by investor.',
    modern_examples: 'Islamic mutual funds and venture funding where investors pool funds and an investment manager invests them.'
  },
  {
    id: 2,
    title: 'Musharakah (Joint Venture Equity)',
    arabic_title: 'المشاركة',
    category: 'Partnership',
    summary: 'Joint equity partnership where two or more parties contribute both capital and labor/management.',
    detailed_explanation: 'Profits are distributed according to mutual agreement, while losses must be shared strictly in exact proportion to each partner\'s capital share.',
    key_principles: 'Shared capital and shared risk; Losses proportional to equity stake; Collaborative governance.',
    modern_examples: 'Diminishing Musharakah used in Islamic home financing where client and bank co-own the property.'
  },
  {
    id: 3,
    title: 'Murabaha (Cost-Plus Trade Financing)',
    arabic_title: 'المرابحة',
    category: 'Trade',
    summary: 'A sales contract where the seller purchases an asset requested by a buyer and sells it with an agreed-upon transparent markup.',
    detailed_explanation: 'The seller discloses the exact purchase cost and adds a clear profit margin. The buyer pays either upfront or in installments over time. It is a trade transaction, not an interest-bearing money loan.',
    key_principles: 'Transparent cost declaration; Real asset ownership before sale; Fixed pricing without compounding penalties.',
    modern_examples: 'Islamic car financing and commercial equipment purchasing.'
  },
  {
    id: 4,
    title: 'Sukuk (Asset-Backed Islamic Certificates)',
    arabic_title: 'الصكوك',
    category: 'Capital Markets',
    summary: 'Investment certificates representing undivided fractional ownership in tangible assets, rather than debt claims.',
    detailed_explanation: 'Sukuk holders receive a share of the actual revenues or rental streams generated by the underlying real asset (e.g. airport, highway, renewable energy plant) rather than interest coupons.',
    key_principles: 'Asset-backed or asset-based; Shariah compliant; Shared operational returns.',
    modern_examples: 'Green Sukuk for solar farms and sovereign infrastructure development.'
  },
  {
    id: 5,
    title: 'Qard Hasan (Benevolent Interest-Free Loan)',
    arabic_title: 'القرض الحسن',
    category: 'Welfare',
    summary: 'A zero-interest benevolent loan given purely to assist someone in hardship without demanding any extra return.',
    detailed_explanation: 'The borrower is only obligated to repay the exact principal amount. Allah promises immense multiplied spiritual reward for the lender.',
    key_principles: 'Zero interest; Acts of charity and community uplift; Forbearance if debtor struggles.',
    modern_examples: 'Islamic student assistance funds and community microfinance.'
  }
];

export const initialBusinessEthics = [
  {
    id: 1,
    principle: 'Strict Prohibition of Usury and Compounding Interest (Riba)',
    arabic_term: 'تحريم الربا',
    explanation: 'Money is a medium of exchange, not a commodity to be sold for more money without underlying real value or risk sharing.',
    practical_application: 'Avoid interest-bearing debt, late penalty compounding, and predatory loan schemes.'
  },
  {
    id: 2,
    principle: 'Transparency and Disclosing Product Defects (Ghash)',
    arabic_term: 'بيان العيب والصدق',
    explanation: 'It is impermissible to conceal flaws in goods or mislead buyers through deceptive marketing.',
    practical_application: 'Clearly highlight any blemishes, return terms, or warranty specifications to customers.'
  },
  {
    id: 3,
    principle: 'Fulfilling Contracts and Timely Payments',
    arabic_term: 'الوفاء بالعقود',
    explanation: 'Muslims are bound by their agreed contracts, invoices, and obligations without unjust delay.',
    practical_application: 'Pay employees and freelancers promptly (\'before their sweat dries\') and honor SLA agreements.'
  },
  {
    id: 4,
    principle: 'Fair Weights, Measures, and Accurate Invoicing',
    arabic_term: 'إيفاء الكيل والميزان',
    explanation: 'Cheating in volume, weight, time-billing, or product specifications is explicitly warned against in Surah Al-Mutaffifin.',
    practical_application: 'Ensure billing hours and product weights are accurate and auditable.'
  }
];

export const dailyQuranVerses = [
  {
    surah: 'Al-Baqarah',
    number: '2:152',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.'
  },
  {
    surah: 'Ash-Sharh',
    number: '94:5-6',
    arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'For indeed, with hardship [will be] ease. Indeed, with hardship [will be] ease.'
  },
  {
    surah: 'Al-Ankabut',
    number: '29:45',
    arabic: 'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ',
    translation: 'Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater.'
  },
  {
    surah: 'Al-Hadid',
    number: '57:4',
    arabic: 'وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ ۚ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ',
    translation: 'And He is with you wherever you are. And Allah, of what you do, is Seeing.'
  }
];
