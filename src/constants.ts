/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const PRAYER_NAMES: Record<string, string> = {
  Fajr: "İmsak",
  Sunrise: "Güneş",
  Dhuhr: "Öğle",
  Asr: "İkindi",
  Maghrib: "Akşam",
  Isha: "Yatsı"
};

export const ADHAN_OPTIONS: Record<string, string> = {
  'Mekke': 'https://www.islamcan.com/audio/adhan/azan1.mp3',
  'Medine': 'https://www.islamcan.com/audio/adhan/azan2.mp3',
  'İstanbul': 'https://www.islamcan.com/audio/adhan/azan3.mp3'
};

export const DUALAR = [
  {
    ad: "Sübhaneke (Namaza Başlama Duası)",
    okunus: "Sübhânekellâhümme ve bi hamdik ve tebârekesmük ve teâlâ ceddük ve lâ ilâhe ğayrük.",
    anlam: "Allah'ım! Sen eksik sıfatlardan pak ve uzaksın. Seni daima böyle tenzih eder ve överim. Senin adın mübarektir. Varlığın her şeyden üstündür. Senden başka ilah yoktur."
  },
  {
    ad: "Ettehiyyâtü (Oturuş Duası)",
    okunus: "Et-tahiyyâtü lillâhi ves-salevâtü vet-tayyibât. Es-selâmü aleyke eyyühen-nebiyyü ve rahmetullâhi ve berakâtüh. Es-selâmü aleynâ ve alâ ibâdillâhis-sâlihîn. Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve resûlüh.",
    anlam: "Dil ile, beden ile ve mal ile yapılan bütün ibadetler Allah'adır. Ey Peygamber! Allah'ın selamı, rahmet ve bereketleri senin üzerine olsun. Selam bizim ve Allah'ın salih kullarının üzerine olsun. Allah'tan başka ilah olmadığına ve Muhammed'in O'nun kulu ve elçisi olduğuna şehadet ederim."
  },
  {
    ad: "Salli Duası",
    okunus: "Allâhümme salli alâ Muhammedin ve alâ âli Muhammed. Kemâ salleyte alâ İbrâhîme ve alâ âli İbrâhîm. İnneke hamîdün mecîd.",
    anlam: "Allah'ım! İbrahim'e ve İbrahim'in âline salât ettiğin gibi Muhammed'e ve Muhammed'in âline de salât et. Şüphesiz sen Hamîd'sin, Mecîd'sin."
  },
  {
    ad: "Barik Duası",
    okunus: "Allâhümme bârik alâ Muhammedin ve alâ âli Muhammed. Kemâ bârekte alâ İbrâhîme ve alâ âli İbrâhîm. İnneke hamîdün mecîd.",
    anlam: "Allah'ım! İbrahim'e ve İbrahim'in âline bereketler verdiğin gibi Muhammed'e ve Muhammed'in âline de bereketler ver. Şüphesiz sen Hamîd'sin, Mecîd'sin."
  },
  {
    ad: "Rabbena Duası",
    okunus: "Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhirati haseneten ve kınâ azâben-nâr.",
    anlam: "Rabbimiz! Bize dünyada iyilik ver, ahirette de iyilik ver ve bizi cehennem azabından koru."
  },
  {
    ad: "Kunut Duası (1)",
    okunus: "Allâhümme innâ neste'înüke ve nestağfiruk. Ve nü'minü bike ve netevekkelü aleyke. Ve nüsnî aleykel-hayr. Ve neşkürukel-velâ nekfüruk. Ve nahleu ve netrükü men yefcüruk.",
    anlam: "Allah'ım! Senden yardım dileriz, senden bağışlanma dileriz, sana iman ederiz, sana tevekkül ederiz. Seni hayırla anarız, sana şükrederiz, seni inkâr etmeyiz. Sana isyan edeni terk ederiz."
  },
  {
    ad: "Kunut Duası (2)",
    okunus: "Allâhümme iyyâke na'büdü ve leke nusallî ve nescüdü ve ileyke nes'â ve nahfidü. Nercû rahmeteke ve nahşâ azâbeke inne azâbeke bil-küffâri mülhak.",
    anlam: "Allah'ım! Yalnızca sana ibadet ederiz, senin için namaz kılarız, sana secde ederiz. Sana koşarız. Rahmetini umarız, azabından korkarız. Şüphesiz senin azabın kâfirlere ulaşır."
  },
  {
    ad: "Namaz Sonrası Tesbih",
    okunus: "Sübhânallah (33 kez) — Elhamdülillah (33 kez) — Allâhü Ekber (33 kez) — Lâ ilâhe illallâhü vahdehû lâ şerîke leh.",
    anlam: "Allah'ı tenzih ederim (33) — Hamd Allah'a mahsustur (33) — Allah en büyüktür (33) — Allah'tan başka ilah yoktur, O'nun ortağı yoktur."
  },
  {
    ad: "Ayetel Kürsi",
    okunus: "Allâhü lâ ilâhe illâ hüvel hayyül kayyûm. Lâ te'huzühû sinetün ve lâ nevm. Lehû mâ fis-semâvâti ve mâ fil-ard...",
    anlam: "Allah, kendisinden başka hiçbir ilah olmayandır. O, daima diridir, her şeyi kendi başına idare edendir. O'nu ne bir uyuklama ne de uyku tutar. Göklerde ve yerde ne varsa O'nundur..."
  }
];

export const SURELER = [
  {
    ad: "Fatiha Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nElhamdü lillâhi rabbil'âlemin.\nErrahmânirrahîm.\nMâliki yevmiddîn.\nİyyâke na'büdü ve iyyâke neste'în.\nİhdinessırâtel müstakîm.\nSırâtallezîne en'amte aleyhim. Ğayril mağdûbi aleyhim ve leddâllîn.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nHamd, âlemlerin Rabbi Allah'a mahsustur.\nO, Rahman'dır, Rahim'dir.\nDin gününün (hesap gününün) sahibidir.\nYalnız sana ibadet eder, yalnız senden yardım dileriz.\nBizi doğru yola ilet.\nNimet verdiğin kimselerin yoluna; gazaba uğrayanların ve sapkınların yoluna değil."
  },
  {
    ad: "İhlas Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nKul hüvellâhü ehad.\nAllâhüssamed.\nLem yelid ve lem yûled.\nVe lem yekün lehû küfüven ehad.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nDe ki: O, Allah'tır, bir tektir.\nAllah Samed'dir (her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir).\nO doğurmamış ve doğurulmamıştır.\nHiçbir şey O'na denk ve benzer değildir."
  },
  {
    ad: "Felak Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nKul eûzü birabbil felak.\nMin şerri mâ halak.\nVe min şerri ğâsikın izâ vekab.\nVe min şerrin neffâsâti fil'ukad.\nVe min şerri hâsidin izâ hased.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nDe ki: Sığınırım sabahın Rabbine.\nYarattığı şeylerin kötülüğünden.\nKaranlığı çöktüğü zaman gecenin kötülüğünden.\nDüğümlere üfürenlerin kötülüğünden.\nHaset ettiği zaman hasetçinin kötülüğünden."
  },
  {
    ad: "Nas Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nKul eûzü birabbin-nâs.\nMelikin-nâs.\nİlâhin-nâs.\nMin scherril vesvâsil hannâs.\nEllezî yüvesvisü fî sudûrin-nâs.\nMinel cinneti ven-nâs.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nDe ki: Sığınırım insanların Rabbine.\nİnsanların hükümdarına.\nİnsanların ilahına.\nSinsi vesvesecinin kötülüğünden.\nO ki, insanların göğüslerine vesvese sokar.\nGerek cinlerden gerek insanlardan."
  },
  {
    ad: "Kevser Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nİnnâ a'taynâkel kevser.\nFesalli lirabbike venhar.\nİnne şânieke hüvel ebter.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nŞüphesiz biz sana Kevser'i verdik.\nO hâlde Rabbin için namaz kıl ve kurban kes.\nAsıl sonu kesik olan, şüphesiz sana hınç besleyendir."
  },
  {
    ad: "Kâfirûn Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nKul yâ eyyühel kâfirûn.\nLâ a'büdü mâ ta'büdûn.\nVe lâ entüm âbidûne mâ a'büd.\nVe lâ ene âbidün mâ abedtüm.\nVe lâ entüm âbidûne mâ a'büd.\nLeküm dînüküm ve liye dîn.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nDe ki: Ey kâfirler!\nBen sizin taptıklarınıza tapmam.\nSiz de benim taptığıma tapmazsınız.\nBen sizin taptıklarınıza tapacak değilim.\nSiz de benim taptığıma tapmıyorsunuz.\nSizin dininiz size, benim dinim bana."
  },
  {
    ad: "Asr Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nVel asr.\nİnnel insâne lefî husr.\nİllellezîne âmenû ve amilüssâlihâti ve tevâsav bil-hakkı ve tevâsav bissabr.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nAsra yemin olsun ki,\nİnsan gerçekten ziyan içindedir.\nBunun dışında: iman edip salih amel işleyenler, birbirlerine hakkı ve sabrı tavsiye edenler müstesna."
  },
  {
    ad: "Fil Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nElem tera keyfe feale rabbüke biashâbil fîl.\nElem yec'al keydehüm fî tadlîl.\nVe ersele aleyhim tayran ebâbîl.\nTermîhim bihicâretin min siccîl.\nFece'alehüm ke'asfin me'kûl.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nRabbinin fil sahiplerine ne yaptığını görmedin mi?\nOnların tuzaklarını boşa çıkarmadı mı?\nÜzerlerine sürü sürü kuşlar gönderdi.\nOnları pişmiş çamurdan taşlarla taşladı.\nDerken onları yenilmiş ekin yaprakları gibi kıldı."
  },
  {
    ad: "Kureyş Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nLi'îlâfi kureyş.\nÎlâfihim rihletaş-şitâi ves-sayf.\nFel ya'büdû rabbe hâzel beyt.\nEllezî at'amehüm min cû'ın ve âmenehüm min havf.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nKureyş'in yolculuğu alışkanlığı için;\nKışın ve yazın yolculukları alışkanlığı için.\nO hâlde onlar bu Beyt'in Rabbine kulluk etsinler.\nO ki onları açlıktan doyurmuş ve korkudan güvenliğe kavuşturmuştur."
  },
  {
    ad: "Mâûn Suresi",
    okunus: "Bismillâhirrahmânirrahîm.\nEre eytellezî yükezzibü biddîn.\nFezâlikel lezî yedü'ul yetîm.\nVe lâ yehuddu alâ ta'âmil miskîn.\nFe veylün lil musallîn.\nEllezîne hüm an salâtihim sâhûn.\nEllezîne hüm yürâûn.\nVe yemne'ûnel mâ'ûn.",
    anlam: "Rahman ve Rahim olan Allah'ın adıyla.\nDini yalan sayanı gördün mi?\nİşte o, yetimi iter kakar.\nVe yoksulu doyurmaya teşvik etmez.\nO namaz kılanlara yazıklar olsun!\nOnlar ki namazlarından gafildirler.\nOnlar ki gösteriş yaparlar.\nVe hayra engel olurlar."
  }
];

export const NAMAZ_REHBERI = [
  { 
    ad: "Sabah Namazı", 
    rekat: "2 Sünnet, 2 Farz", 
    detay: [
      "Niyet edilir: 'Niyet ettim Allah rızası için bugünkü sabah namazının iki rekat sünnetini kılmaya.'", 
      "İftitah Tekbiri: 'Allahu Ekber' diyerek eller kulak memesi hizasına kaldırılır.", 
      "Kıyam: Ayakta durulur, Sübhaneke okunur, Euzü-Besmele çekilir, Fatiha ve bir sure okunur.", 
      "Rüku: 'Allahu Ekber' diyerek eğilinir, 3 kez 'Sübhâne Rabbiyel-Azîm' denir.", 
      "Secde: 'Allahu Ekber' diyerek yere kapanılır, 3 kez 'Sübhâne Rabbiyel-A'lâ' denir.", 
      "İkinci rekatta da aynı işlemler yapılır, sonunda oturulur.", 
      "Ettehiyyatü, Salli-Barik ve Rabbena duaları okunur, selam verilir."
    ] 
  },
  { 
    ad: "Öğle Namazı", 
    rekat: "4 Sünnet, 4 Farz, 2 Son Sünnet", 
    detay: [
      "Öğle namazı toplam 10 rekattır.", 
      "Önce 4 rekat ilk sünnet kılınır.", 
      "Sonra 4 rekat farz kılınır.", 
      "En son 2 rekat son sünnet kılınır."
    ] 
  },
  { 
    ad: "İkindi Namazı", 
    rekat: "4 Sünnet, 4 Farz", 
    detay: [
      "İkindi namazı toplam 8 rekattır.", 
      "Önce 4 rekat sünnet kılınır.", 
      "Sonra 4 rekat farz kılınır."
    ] 
  },
  { 
    ad: "Akşam Namazı", 
    rekat: "3 Farz, 2 Sünnet", 
    detay: [
      "Akşam namazı toplam 5 rekattır.", 
      "Önce 3 rekat farz kılınır.", 
      "Sonra 2 rekat sünnet kılınır."
    ] 
  },
  { 
    ad: "Yatsı Namazı", 
    rekat: "4 Sünnet, 4 Farz, 2 Son Sünnet, 3 Vitir", 
    detay: [
      "Yatsı namazı toplam 13 rekattır.", 
      "Vitir namazının 3. rekatında Fatiha ve sureden sonra tekbir alınır ve Kunut duaları okunur."
    ] 
  }
];
