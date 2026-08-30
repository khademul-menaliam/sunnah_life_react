-- ==============================================================================
-- Sunnah of Life - Supabase Initial Database Seed Script
-- Execute this script in your Supabase SQL Editor after running schema.sql
-- ==============================================================================

-- 1. SEED PRAYERS
INSERT INTO public.prayers (id, name, arabic_name, transliteration, order_number, rakat_fard, rakat_sunnah_before, rakat_sunnah_after, rakat_nafl, time_window_description, significance, special_notes)
VALUES
(1, 'Fajr', 'الفجر', 'Al-Fajr', 1, 2, 2, 0, 0, 'From the beginning of dawn (true dawn) until sunrise.', 'The dawn prayer holds immense spiritual blessing. Praying Fajr on time places a believer under the direct protection of Allah for the day.', 'Recitation is performed aloud (Jahri) in the Fard rakat.'),
(2, 'Dhuhr', 'الظهر', 'Ad-Dhuhr', 2, 4, 4, 2, 2, 'From the zenith (when the sun passes the meridian) until the shadow equals object length.', 'The midday prayer signifies turning back to Allah amidst daily chores and business. Consistently observing sunnah shields from hellfire.', 'On Friday, Jumuah prayer replaces Dhuhr for men in congregation. Recitation is silent (Sirri).'),
(3, 'Asr', 'العصر', 'Al-Asr', 3, 4, 4, 0, 0, 'From the end of Dhuhr time until the sun begins to turn yellow/sunset.', 'The middle prayer. Guarding Asr prayer is specifically commanded in the Quran.', 'There are no sunnah ba''diyah prayers for Asr. Recitation is silent (Sirri).'),
(4, 'Maghrib', 'المغرب', 'Al-Maghrib', 4, 3, 2, 2, 2, 'From immediately after sunset until the red twilight disappears from the sky.', 'Maghrib represents the transition from day to night and the time of breaking fast (Iftar).', 'Recitation is performed aloud (Jahri) in the first two Fard rakat.'),
(5, 'Isha', 'العشاء', 'Al-Isha', 5, 4, 4, 2, 2, 'From when the red twilight disappears until midnight.', 'Isha in congregation is equivalent to standing in prayer for half the night, followed by the Witr prayer.', 'Recitation is performed aloud in the first two Fard rakat.')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    arabic_name = EXCLUDED.arabic_name,
    significance = EXCLUDED.significance;

-- 2. SEED HADITHS
INSERT INTO public.hadiths (id, prayer_id, module, arabic_text, transliteration, translation, source, narrator, topic, verified)
VALUES
(1, 1, 'prayer', 'مَنْ صَلَّى الْبَرْدَيْنِ دَخَلَ الْجَنَّةَ', 'Man sallal-bardayni dakhalal-jannah.', 'He who prays the two cool prayers (i.e., Fajr and Asr) will enter Paradise.', 'Sahih Bukhari 574, Sahih Muslim 635', 'Abu Musa Al-Ash''ari', 'Virtue of Fajr and Asr', true),
(2, 1, 'prayer', 'رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا', 'Rak''atal-fajri khayrun minad-dunya wa ma fiha.', 'The two rakat (sunnah before) Fajr are better than this world and all that it contains.', 'Sahih Muslim 725', 'Aisha (ra)', 'Virtue of Fajr Sunnah', true),
(3, 2, 'prayer', 'مَنْ حَافَظَ عَلَى أَرْبَعِ رَكَعَاتٍ قَبْلَ الظُّهْرِ وَأَرْبَعٍ بَعْدَهَا حَرَّمَهُ اللَّهُ عَلَى النَّارِ', 'Man hafadha ala arba''i raka''atin qabladh-dhuhri wa arba''in ba''daha...', 'Whoever consistently observes four rakat before Dhuhr and four rakat after it, Allah will forbid him from the Fire.', 'Jami at-Tirmidhi 427', 'Umm Habibah', 'Virtue of Dhuhr prayers', true),
(4, 3, 'prayer', 'رَحِمَ اللَّهُ امْرَأً صَلَّى قَبْلَ الْعَصْرِ أَرْبَعًا', 'Rahimallahumra''an salla qablal-''asri arba''a.', 'May Allah have mercy on a person who prays four rakat before the Asr prayer.', 'Jami at-Tirmidhi 430', 'Abdullah ibn Umar', 'Virtue of four rakat before Asr', true),
(5, 4, 'prayer', 'صَلُّوا قَبْلَ صَلَاةِ الْمَغْرِبِ قَالَ فِي الثَّالِثَةِ لِمَنْ شَاءَ', 'Sallu qabla salatil-maghrib...', 'Pray before the Maghrib prayer. (He said it three times, adding: ''For whoever wishes'').', 'Sahih Bukhari 1183', 'Abdullah ibn Mughaffal', 'Sunnah before Maghrib', true),
(6, 5, 'prayer', 'مَنْ صَلَّى الْعِشَاءَ فِي جَمَاعَةٍ فَكَأَنَّمَا قَامَ نِصْفَ اللَّيْلِ', 'Man salla al-''isha''a fi jama''atin fa ka''annama qama nisfal-layl.', 'Whoever prays Isha in congregation, it is as if he has spent half the night in prayer.', 'Sahih Muslim 656', 'Uthman ibn Affan', 'Congregational Isha Prayer', true),
(11, NULL, 'eating', 'يَا غُلَامُ سَمِّ اللَّهَ، وَكُلْ بِيَمِينِكَ، وَكُلْ مِمَّا يَلِيكَ', 'Ya ghulamu sammillaha, wa kul biyamīnika, wa kul mimma yalīka.', 'O young boy, mention the name of Allah (say Bismillah), eat with your right hand, and eat from what is nearest to you.', 'Sahih Bukhari 5376, Sahih Muslim 2022', 'Umar ibn Abi Salama', 'Etiquettes of Eating', true),
(19, NULL, 'eating', 'مَنِ اصْطَبَحَ كُلَّ يَوْمٍ سَبْعَ تَمَرَاتٍ عَجْوَةً، لَمْ يَضُرَّهُ سُمٌّ وَلاَ سِحْرٌ', 'Man istabaha kulla yawmin sab''a tamaratin ''ajwah...', 'He who eats seven Ajwa dates every morning will not be harmed by poison or sorcery on that day.', 'Sahih Bukhari 5768', 'Sa''d ibn Abi Waqqas', 'Virtues of Ajwa Dates', true),
(26, NULL, 'sunnah', 'السِّوَاكُ مَطْهَرَةٌ لِلْفَمِ مَرْضَاةٌ لِلرَّبِّ', 'As-siwaku matharatun lil-fami mardatun lir-rabb.', 'The tooth-stick (Miswak) purifies the mouth and is pleasing to the Lord.', 'Sunan an-Nasa''i 5', 'Aisha (ra)', 'Importance of Miswak', true),
(32, NULL, 'sunnah', 'إِذَا أَتَيْتَ مَضْجَعَكَ فَتَوَضَّأْ وُضُوءَكَ لِلصَّلَاةِ ثُمَّ اضْطَجِعْ عَلَى شِقِّكَ الْأَيْمَنِ', 'Idha atayta madja''aka fa tawadda'' wudu''aka lis-salati...', 'Whenever you intend to go to bed, perform wudu like that for the prayer, then lie down on your right side.', 'Sahih Bukhari 247, Sahih Muslim 2710', 'Al-Bara ibn Azib', 'Sleep Sunnahs', true),
(49, NULL, 'income', 'لَعَنَ رَسُولُ اللَّهِ ﷺ آكِلَ الرِّبَا وَمُؤْكِلَهُ وَكَاتِبَهُ وَشَاهِدَيْهِ', 'La''ana rasulullahi ﷺ akilar-riba wa mu''kilahu wa katibahu wa shahidayhi...', 'The Messenger of Allah ﷺ cursed the one who consumes usury (Riba), the one who pays it, the one who records it, and the two witnesses.', 'Sahih Muslim 1598', 'Jabir ibn Abdullah', 'Prohibition of Usury (Riba)', true),
(50, NULL, 'income', 'التَّاجِرُ الصَّدُوقُ الأَمِينُ مَعَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ', 'At-tajirus-saduqul-aminu ma''an-nabiyyina was-siddiqina wash-shuhada''.', 'The truthful and trustworthy merchant will be in the company of the Prophets, the righteous, and the martyrs.', 'Jami at-Tirmidhi 1209', 'Abu Sa''id Al-Khudri', 'Virtues of an Honest Businessman', true)
ON CONFLICT (id) DO UPDATE SET
    arabic_text = EXCLUDED.arabic_text,
    translation = EXCLUDED.translation;

-- 3. SEED FOODS
INSERT INTO public.foods (id, name, arabic_name, status, category, reason, quran_reference, hadith_id)
VALUES
(1, 'Pork and Swine Flesh', 'لحم الخنزير', 'haram', 'meat', 'Explicitly forbidden in the Quran in multiple verses. Swine are considered impure (Rijs).', 'Surah Al-Baqarah 2:173', NULL),
(2, 'Alcoholic Beverages and Intoxicants', 'الخمر', 'haram', 'beverage', 'All intoxicants are haram. Intoxication impairs the intellect and negates prayers for forty days.', 'Surah Al-Ma''idah 5:90', NULL),
(3, 'Blood (Spilt/Liquid)', 'الدم المسفوح', 'haram', 'additive', 'Liquid blood that flows from an animal when slaughtered is strictly prohibited.', 'Surah Al-An''am 6:145', NULL),
(4, 'Meat of Carnivorous Animals', 'سباع البهائم', 'haram', 'meat', 'Forbidden by the Prophet ﷺ. Any wild beast with canine teeth/fangs is haram to consume.', NULL, NULL),
(5, 'Ajwa Dates', 'التمر العجوة', 'halal', 'fruit', 'A supreme Quranic food. Rich in natural sugars, fiber, and potassium.', 'Surah Maryam 19:25', 19),
(6, 'Pure Natural Honey', 'العسل', 'halal', 'additive', 'Described by Allah as containing a cure for mankind.', 'Surah An-Nahl 16:69', NULL),
(7, 'Extra Virgin Olive Oil', 'زيت الزيتون', 'halal', 'additive', 'Olives are mentioned as coming from a blessed tree. Excellent for cardiovascular health.', 'Surah An-Nur 24:35', NULL),
(8, 'Sweet Pomegranate', 'الرمان', 'halal', 'fruit', 'Described as a fruit of Paradise. Loaded with antioxidants and vitamin C.', 'Surah Ar-Rahman 55:68', NULL),
(9, 'Fresh Fish & Seafood', 'السمك وصيد البحر', 'halal', 'seafood', 'Permissible by default. The water of the sea is pure and its catch is halal.', 'Surah Al-Ma''idah 5:96', NULL),
(10, 'Food with Unknown Animal Gelatin', 'أطعمة مشبوهة المصدر', 'doubtful', 'additive', 'Commercial products containing animal-derived enzymes or gelatin without halal certification.', NULL, NULL)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    reason = EXCLUDED.reason;

-- 4. SEED EATING ETIQUETTES
INSERT INTO public.eating_etiquettes (id, title, description, type, arabic_text, hadith_id, order_number)
VALUES
(1, 'Washing both hands before eating', 'Washing hands thoroughly to remove dirt and bacteria before sitting down for a meal.', 'sunnah', NULL, NULL, 1),
(2, 'Saying Bismillah (In the Name of Allah)', 'Reciting Bismillah before taking the first bite to invite blessing and block Satan.', 'sunnah', 'بِسْمِ اللَّهِ', 11, 2),
(3, 'Eating with the right hand', 'Always using the right hand to handle, bite, and chew food.', 'sunnah', 'كُلْ بِيَمِينِكَ', 11, 3),
(4, 'Eating from what is nearest to you', 'Eating from the side of the plate or dish closest to you instead of reaching across.', 'sunnah', 'وَكُلْ مِمَّا يَلِيكَ', 11, 4),
(5, 'The 1/3 Food, 1/3 Water, 1/3 Air rule', 'Avoiding overeating by filling 1/3 with food, 1/3 with water, leaving 1/3 for air.', 'sunnah', 'ثُلُثٌ لِطَعَامِهِ وَثُلُثٌ لِشَرَابِهِ وَثُلُثٌ لِنَفَسِهِ', NULL, 5),
(6, 'Sitting down while drinking water', 'Drinking in small sips while seated rather than gulping standing up.', 'sunnah', NULL, NULL, 6),
(7, 'Praising Allah after finishing (Alhamdulillah)', 'Expressing gratitude to Allah after the meal has concluded.', 'sunnah', 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا', NULL, 7)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

-- 5. SEED DUAS FOR EATING
INSERT INTO public.dua_for_eatings (id, occasion, arabic_text, transliteration, translation, hadith_id)
VALUES
(1, 'before_eating', 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ', 'Bismillahi wa ''ala barakatillah.', 'In the name of Allah and upon the blessings of Allah.', 11),
(2, 'after_eating', 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ', 'Alhamdulillahilladhi at''amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.', 'All praise is due to Allah Who gave me this food and provided it for me without strength or power on my part.', NULL),
(3, 'forgot_bismillah', 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ', 'Bismillahi awwalahu wa akhirahu.', 'In the name of Allah at its beginning and at its end.', NULL),
(4, 'iftar', 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ', 'Dhahabadh-dhama''u wabtallatil-''uruqu wa thabatal-ajru in sha'' Allah.', 'The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.', NULL)
ON CONFLICT (id) DO UPDATE SET
    arabic_text = EXCLUDED.arabic_text,
    translation = EXCLUDED.translation;

-- 6. SEED SUNNAH PRACTICES
INSERT INTO public.sunnahs (id, title, arabic_title, description, category, difficulty, is_daily, time_of_day, hadith_id, order_number)
VALUES
(1, 'Sleeping in a State of Ablution (Wudu)', 'النوم على وضوء', 'Performing a complete wudu just like for prayer before going to bed.', 'sleep', 'easy', true, 'night', 32, 1),
(2, 'Dusting the Bed Three Times', 'نفض الفراش', 'Dusting the bed sheets or surface three times before lying down to sleep.', 'sleep', 'easy', true, 'night', NULL, 2),
(3, 'Sleeping on the Right Side', 'النوم على الجانب الأيمن', 'Lying down on your right side with the right hand placed under the right cheek.', 'sleep', 'easy', true, 'night', 32, 3),
(4, 'Using the Tooth-stick (Miswak)', 'السواك', 'Using the Miswak or brush to clean teeth when waking up and before each prayer.', 'hygiene', 'easy', true, 'morning', 26, 4),
(5, 'Greeting with Salam & Smiling', 'إفشاء السلام والتبسم', 'Smiling in the face of others and greeting with As-salamu alaykum.', 'social', 'easy', true, 'general', NULL, 5),
(6, 'Praying Duha (Forenoon Voluntary Prayer)', 'صلاة الضحى', 'Offering 2 to 8 voluntary rakat in the mid-morning after sunrise.', 'worship', 'medium', true, 'morning', NULL, 6),
(7, 'Reciting Ayat al-Kursi after Every Fard Prayer', 'آية الكرسي دبر كل صلاة', 'Reciting Surah Al-Baqarah (2:255) immediately following the obligatory prayer.', 'worship', 'easy', true, 'general', NULL, 7)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description;

-- 7. SEED ADHKAR
INSERT INTO public.adhkars (id, name, category, arabic_text, transliteration, translation, repetitions, source, time_of_day)
VALUES
(1, 'Al-Mu''awwidhat (Three Quls)', 'morning', 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ {قُلْ هُوَ اللَّهُ أَحَدٌ...} {قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ...} {قُلْ أَعُوذُ بِرَبِّ النَّاسِ...}', 'Recite Surah Al-Ikhlas, Surah Al-Falaq, and Surah An-Nas.', 'Recite the three protective chapters of the Quran. (Ikhlas, Falaq, Nas)', 3, 'Jami at-Tirmidhi 3575', 'morning'),
(2, 'Sayyidul Istighfar (Master Supplication for Forgiveness)', 'morning', 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ خَلَقْتَنِي وَأَنَا عَبْدُكَ وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', 'Allahumma anta rabbi la ilaha illa anta khalaqtani wa ana ''abduka...', 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your servant...', 1, 'Sahih Bukhari 6306', 'morning'),
(3, 'Protection from All Harm', 'morning', 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', 'Bismillahilladhi la yadurru ma''asmihi shay''un fil-ardi wa la fis-sama''i wa huwas-sami''ul-''alim.', 'In the name of Allah, by whose name nothing in the earth or heavens can cause harm.', 3, 'Sunan Abu Dawud 5088', 'morning'),
(4, 'Seeking Refuge in Allah''s Perfect Words', 'evening', 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', 'A''udhu bi kalimatillahit-tammati min sharri ma khalaq.', 'I seek refuge in the perfect words of Allah from the evil of what He has created.', 3, 'Sahih Muslim 2709', 'evening'),
(5, 'Tasbih, Tahmid, Takbir (Post-Salah)', 'after_prayer', 'سُبْحَانَ اللَّهِ (٣٣) الْحَمْدُ لِلَّهِ (٣٣) اللَّهُ أَكْبَرُ (٣٣)', 'SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (33x)', 'Glory be to Allah (33x), Praise be to Allah (33x), Allah is the Greatest (33x).', 33, 'Sahih Muslim 597', 'general'),
(6, 'Ayat al-Kursi (Before Sleep)', 'before_sleep', 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...', 'Allahu la ilaha illa huwal-hayyul-qayyum...', 'Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence...', 1, 'Sahih Bukhari 2311', 'night')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    arabic_text = EXCLUDED.arabic_text;

-- 8. SEED INCOME TYPES & ISLAMIC FINANCE
INSERT INTO public.income_types (id, title, category, industry, explanation, quran_reference, hadith_id)
VALUES
(1, 'Software Engineering, AI & Technology', 'halal', 'Information Technology', 'Building ethical software, tools, and digital solutions that benefit society.', 'Surah Al-Ma''idah 5:2', NULL),
(2, 'Ethical Healthcare & Medicine', 'halal', 'Healthcare', 'Providing life-saving medical care, pharmacy, physical therapy, and counseling.', 'Surah Al-Ma''idah 5:32', NULL),
(3, 'Interest-Based Banking & Usury (Riba)', 'haram', 'Conventional Finance', 'Earning interest on loans, issuing high-interest debt, or trading debt derivatives.', 'Surah Al-Baqarah 2:275-279', 49),
(4, 'Gambling, Casinos & Lottery', 'haram', 'Entertainment & Gaming', 'Games of chance (Maysir) where winnings come at the direct loss of others.', 'Surah Al-Ma''idah 5:90', NULL)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    explanation = EXCLUDED.explanation;

INSERT INTO public.islamic_finance_concepts (id, title, arabic_title, category, summary, detailed_explanation, key_principles, modern_examples, order_number)
VALUES
(1, 'Mudarabah (Profit-Sharing Partnership)', 'المضاربة', 'Partnership', 'One party provides capital and the other manages with expertise.', 'Profits are distributed by pre-agreed percentage ratios. Financial losses are borne by capital provider.', 'Capital from investor, effort from manager; Losses borne by investor.', 'Islamic mutual funds and venture funding.', 1),
(2, 'Musharakah (Joint Venture Equity)', 'المشاركة', 'Partnership', 'Joint equity partnership where parties contribute both capital and labor.', 'Profits are distributed according to mutual agreement, while losses must be strictly proportional to capital.', 'Shared capital and risk; Loss proportional to equity.', 'Diminishing Musharakah used in Islamic home financing.', 2),
(3, 'Murabaha (Cost-Plus Trade Financing)', 'المرابحة', 'Trade', 'Seller purchases an asset and sells it with an agreed-upon transparent markup.', 'The seller discloses purchase cost and profit margin. Buyer pays in installments.', 'Transparent cost declaration; Real asset ownership before sale.', 'Islamic car and equipment financing.', 3),
(4, 'Sukuk (Asset-Backed Islamic Certificates)', 'الصكوك', 'Capital Markets', 'Investment certificates representing undivided fractional ownership in tangible assets.', 'Sukuk holders receive a share of actual operational returns rather than interest coupons.', 'Asset-backed or asset-based; Shared operational returns.', 'Green Sukuk for solar farms and sovereign infrastructure.', 4)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary;

-- Reset table sequences
SELECT setval('prayers_id_seq', (SELECT MAX(id) FROM public.prayers));
SELECT setval('hadiths_id_seq', (SELECT MAX(id) FROM public.hadiths));
SELECT setval('foods_id_seq', (SELECT MAX(id) FROM public.foods));
SELECT setval('eating_etiquettes_id_seq', (SELECT MAX(id) FROM public.eating_etiquettes));
SELECT setval('dua_for_eatings_id_seq', (SELECT MAX(id) FROM public.dua_for_eatings));
SELECT setval('sunnahs_id_seq', (SELECT MAX(id) FROM public.sunnahs));
SELECT setval('adhkars_id_seq', (SELECT MAX(id) FROM public.adhkars));
SELECT setval('income_types_id_seq', (SELECT MAX(id) FROM public.income_types));
SELECT setval('islamic_finance_concepts_id_seq', (SELECT MAX(id) FROM public.islamic_finance_concepts));
