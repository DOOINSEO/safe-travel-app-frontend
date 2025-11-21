import * as icons from '../assets/pictogram';

/**
 * 번역 언어 목록입니다.
 * `pictograms.translations` 객체의 키와 `code` 값이 일치해야 합니다.
 * @type {Array<{code: string, name: string}>}
 */
export const languages = [{code: 'km', name: '크메르어'}, {code: 'tr', name: '터키어'}, {code: 'ja', name: '일본어'}, {
    code: 'vi',
    name: '베트남어'
}, {code: 'th', name: '태국어'}, {code: 'fr', name: '프랑스어'}, {code: 'it', name: '이탈리아어'}, {
    code: 'es',
    name: '스페인어'
}, {code: 'de', name: '독일어'}, {code: 'zh', name: '중국어'}, {code: 'ru', name: '러시아어'},];

/**
 * '상황별 카테고리' 목록입니다.
 * @type {Array<{id: string, name: string}>}
 */
export const categories = [{id: 'emergency', name: '응급/안전'}, {id: 'tourism', name: '관광/여가'}, {
    id: 'food',
    name: '식당/음료'
}, {id: 'facilities', name: '기본 편의 시설'}, {id: 'accommodation', name: '숙소'}, {
    id: 'transport',
    name: '교통'
}, {id: 'shopping', name: '쇼핑'},];

export const pictograms = [// 1. 기본 편의 시설
    {
        id: 101, category: 'facilities', image: icons.restroom, translations: {
            ko: '화장실',
            en: 'Where is the restroom?',
            km: 'តើបន្ទប់ទឹកនៅឯណា?',
            tr: 'Tuvalet nerede?',
            ja: 'トイレはどこですか？',
            vi: 'Nhà vệ sinh ở đâu?',
            th: 'ห้องน้ำอยู่ที่ไหน?',
            fr: 'Où sont les toilettes ?',
            it: 'Dov\'è il bagno?',
            es: '¿Dónde está el baño?',
            de: 'Wo ist die Toilette?',
            zh: '洗手间在哪里？',
            ru: 'Где находится туалет?'
        }
    }, {
        id: 102, category: 'facilities', image: icons.wifi, translations: {
            ko: '와이파이',
            en: 'What is the Wi-Fi password?',
            km: 'តើលេខសម្ងាត់ Wi-Fi ជាអ្វី?',
            tr: 'Wi-Fi şifresi nedir?',
            ja: 'Wi-Fiのパスワードは何ですか？',
            vi: 'Mật khẩu Wi-Fi là gì?',
            th: 'รหัสผ่าน Wi-Fi คืออะไร?',
            fr: 'Quel est le mot de passe Wi-Fi ?',
            it: 'Qual è la password del Wi-Fi?',
            es: '¿Cuál es la contraseña del Wi-Fi?',
            de: 'Wie lautet das WLAN-Passwort?',
            zh: 'Wi-Fi密码是什么？',
            ru: 'Какой пароль от Wi-Fi?'
        }
    }, {
        id: 103, category: 'facilities', image: icons.charging, translations: {
            ko: '휴대폰 충전',
            en: 'Where can I charge my phone?',
            km: 'តើខ្ញុំអាចសាកទូរស័ព្ទនៅឯណា?',
            tr: 'Telefonumu nerede şarj edebilirim?',
            ja: 'どこで携帯を充電できますか？',
            vi: 'Tôi có thể sạc điện thoại ở đâu?',
            th: 'ฉันจะชาร์จโทรศัพท์ได้ที่ไหน?',
            fr: 'Où puis-je recharger mon téléphone ?',
            it: 'Dove posso caricare il telefono?',
            es: '¿Dónde puedo cargar mi teléfono?',
            de: 'Wo kann ich mein Handy aufladen?',
            zh: '哪里可以给手机充电？',
            ru: 'Где я могу зарядить телефон?'
        }
    }, {
        id: 104, category: 'facilities', image: icons.powerOutlet, translations: {
            ko: '콘센트',
            en: 'Is there a power outlet I can use?',
            km: 'តើមានព្រីភ្លើងដែលខ្ញុំអាចប្រើបានទេ?',
            tr: 'Kullanabileceğim bir priz var mı?',
            ja: '使えるコンセントはありますか？',
            vi: 'Có ổ cắm điện nào tôi có thể dùng không?',
            th: 'มีปลั๊กไฟที่ฉันใช้ได้ไหม?',
            fr: 'Y a-t-il une prise de courant que je peux utiliser ?',
            it: 'C\'è una presa di corrente che posso usare?',
            es: '¿Hay algún enchufe que pueda usar?',
            de: 'Gibt es eine Steckdose, die ich benutzen kann?',
            zh: '有我可以用的插座吗？',
            ru: 'Есть ли розетка, которой я могу воспользоваться?'
        }
    }, {
        id: 105, category: 'facilities', image: icons.locker, translations: {
            ko: '캐비닛',
            en: 'Are there any lockers available?',
            km: 'តើមានទូដាក់អីវ៉ាន់(ឡុកឃ័រ)ទេ?',
            tr: 'Kullanılabilir dolap var mı?',
            ja: 'ロッカーはありますか？',
            vi: 'Có tủ đồ nào không?',
            th: 'มีตู้ล็อกเกอร์ไหม?',
            fr: 'Y a-t-il des casiers disponibles ?',
            it: 'Ci sono armadietti disponibili?',
            es: '¿Hay taquillas disponibles?',
            de: 'Gibt es Schließfächer?',
            zh: '有储物柜吗？',
            ru: 'Есть ли свободные шкафчики?'
        }
    }, {
        id: 106, category: 'facilities', image: icons.elevator, translations: {
            ko: '엘리베이터',
            en: 'Where is the elevator?',
            km: 'តើជណ្តើរយន្តនៅឯណា?',
            tr: 'Asansör nerede?',
            ja: 'エレベーターはどこですか？',
            vi: 'Thang máy ở đâu?',
            th: 'ลิฟต์อยู่ที่ไหน?',
            fr: 'Où est l\'ascenseur ?',
            it: 'Dov\'è l\'ascensore?',
            es: '¿Dónde está el ascensor?',
            de: 'Wo ist der Aufzug?',
            zh: '电梯在哪里？',
            ru: 'Где находится лифт?'
        }
    }, {
        id: 107, category: 'facilities', image: icons.escalator, translations: {
            ko: '에스컬레이터',
            en: 'Where is the escalator?',
            km: 'តើជណ្តើរយន្តប្រអប់នៅឯណា?',
            tr: 'Yürüyen merdiven nerede?',
            ja: 'エスカレーターはどこですか？',
            vi: 'Thang cuốn ở đâu?',
            th: 'บันไดเลื่อนอยู่ที่ไหน?',
            fr: 'Où est l\'escalator ?',
            it: 'Dov\'è la scala mobile?',
            es: '¿Dónde está la escalera mecánica?',
            de: 'Wo ist die Rolltreppe?',
            zh: '自动扶梯在哪里？',
            ru: 'Где находится эскалатор?'
        }
    }, {
        id: 108, category: 'facilities', image: icons.drinkingFountain, translations: {
            ko: '음수대',
            en: 'Where can I get some drinking water?',
            km: 'តើខ្ញុំអាចរកទឹកផឹកនៅឯណា?',
            tr: 'Nereden içme suyu bulabilirim?',
            ja: '飲み水はどこにありますか？',
            vi: 'Tôi có thể lấy nước uống ở đâu?',
            th: 'ฉันจะหาน้ำดื่มได้ที่ไหน?',
            fr: 'Où puis-je trouver de l\'eau potable ?',
            it: 'Dove posso trovare acqua potabile?',
            es: '¿Dónde puedo conseguir agua potable?',
            de: 'Wo finde ich Trinkwasser?',
            zh: '哪里有饮用水？',
            ru: 'Где можно найти питьевую воду?'
        }
    }, {
        id: 109, category: 'facilities', image: icons.nursery, translations: {
            ko: '수유실',
            en: 'Is there a nursing room?',
            km: 'តើមានបន្ទប់បំបៅដោះកូនទេ?',
            tr: 'Bebek bakım odası var mı?',
            ja: '授乳室はありますか？',
            vi: 'Có phòng cho con bú không?',
            th: 'มีห้องให้นมบุตรไหม?',
            fr: 'Y a-t-il une salle d\'allaitement ?',
            it: 'C\'è una sala allattamento?',
            es: '¿Hay sala de lactancia?',
            de: 'Gibt es einen Stillraum?',
            zh: '有哺乳室吗？',
            ru: 'Есть ли комната матери и ребенка?'
        }
    }, {
        id: 110, category: 'facilities', image: icons.accessibility, translations: {
            ko: '휠체어',
            en: 'Is this place wheelchair accessible?',
            km: 'តើកន្លែងនេះអាចចូលប្រើដោយរទេះរុញបានទេ?',
            tr: 'Burası tekerlekli sandalye erişimine uygun mu?',
            ja: 'ここは車椅子で入れますか？',
            vi: 'Nơi này có lối đi cho xe lăn không?',
            th: 'ที่นี่รถเข็นเข้าได้ไหม?',
            fr: 'Cet endroit est-il accessible aux fauteuils roulants ?',
            it: 'Questo posto è accessibile in sedia a rotelle?',
            es: '¿Este lugar es accesible para sillas de ruedas?',
            de: 'Ist dieser Ort rollstuhlgerecht?',
            zh: '这里轮椅可以通行吗？',
            ru: 'Доступно ли это место для инвалидных колясок?'
        }
    }, {
        id: 111, category: 'facilities', image: icons.wheelchairRamp, translations: {
            ko: '휠체어 리프트',
            en: 'Is there a wheelchair lift?',
            km: 'តើមានជណ្តើរយន្តសម្រាប់រទេះរុញទេ?',
            tr: 'Tekerlekli sandalye asansörü var mı?',
            ja: '車椅子用リフトはありますか？',
            vi: 'Có thang nâng xe lăn không?',
            th: 'มีลิฟต์สำหรับรถเข็นไหม?',
            fr: 'Y a-t-il un élévateur pour fauteuil roulant ?',
            it: 'C\'è un montascale per disabili?',
            es: '¿Hay elevador para sillas de ruedas?',
            de: 'Gibt es einen Rollstuhllift?',
            zh: '有轮椅升降机吗？',
            ru: 'Есть ли подъемник для инвалидных колясок?'
        }
    }, {
        id: 112, category: 'facilities', image: icons.accessibleRestroom, translations: {
            ko: '장애인 화장실',
            en: 'Where is the accessible restroom?',
            km: 'តើបន្ទប់ទឹកសម្រាប់ជនពិការនៅឯណា?',
            tr: 'Engelli tuvaleti nerede?',
            ja: '多目的トイレはどこですか？',
            vi: 'Nhà vệ sinh cho người khuyết tật ở đâu?',
            th: 'ห้องน้ำคนพิการอยู่ที่ไหน?',
            fr: 'Où sont les toilettes accessibles ?',
            it: 'Dov\'è il bagno per disabili?',
            es: '¿Dónde está el baño accesible?',
            de: 'Wo ist die barrierefreie Toilette?',
            zh: '无障碍洗手间在哪里？',
            ru: 'Где находится туалет для инвалидов?'
        }
    },

    // 2. 식당/음료
    {
        id: 201, category: 'food', image: icons.restaurant, translations: {
            ko: '식당',
            en: 'I\'m looking for a restaurant.',
            km: 'ខ្ញុំកំពុងរកមើលភោជនីយដ្ឋាន។',
            tr: 'Bir restoran arıyorum.',
            ja: 'レストランを探しています。',
            vi: 'Tôi đang tìm nhà hàng.',
            th: 'ฉันกำลังมองหาร้านอาหาร',
            fr: 'Je cherche un restaurant.',
            it: 'Cerco un ristorante.',
            es: 'Busco un restaurante.',
            de: 'Ich suche ein Restaurant.',
            zh: '我在找餐馆。',
            ru: 'Я ищу ресторан.'
        }
    }, {
        id: 202, category: 'food', image: icons.cafe, translations: {
            ko: '커피, 차',
            en: 'Where can I get coffee or tea?',
            km: 'តើខ្ញុំអាចរកកាហ្វេ ឬតែនៅឯណា?',
            tr: 'Nereden kahve veya çay alabilirim?',
            ja: 'コーヒーや紅茶はどこにありますか？',
            vi: 'Tôi có thể mua cà phê hoặc trà ở đâu?',
            th: 'ฉันจะหากาแฟหรือชาได้ที่ไหน?',
            fr: 'Où puis-je prendre un café ou un thé ?',
            it: 'Dove posso prendere un caffè o un tè?',
            es: '¿Dónde puedo tomar café o té?',
            de: 'Wo bekomme ich Kaffee oder Tee?',
            zh: '哪里可以买到咖啡或茶？',
            ru: 'Где можно выпить кофе или чай?'
        }
    }, {
        id: 203, category: 'food', image: icons.bar, translations: {
            ko: '와인 바',
            en: 'Is there a wine bar nearby?',
            km: 'តើមានបារស្រានៅជិតនេះទេ?',
            tr: 'Yakınlarda şarap evi var mı?',
            ja: '近くにワインバーはありますか？',
            vi: 'Có quán rượu nào gần đây không?',
            th: 'มีไวน์บาร์แถวนี้ไหม?',
            fr: 'Y a-t-il un bar à vin à proximité ?',
            it: 'C\'è un\'enoteca qui vicino?',
            es: '¿Hay un bar de vinos cerca?',
            de: 'Gibt es eine Weinbar in der Nähe?',
            zh: '这附近有酒吧吗？',
            ru: 'Есть ли поблизости винный бар?'
        }
    }, {
        id: 204, category: 'food', image: icons.fastFood, translations: {
            ko: '패스트푸드',
            en: 'I would like to eat fast food.',
            km: 'ខ្ញុំចង់ញ៉ាំអាហាររហ័ស។',
            tr: 'Fast food yemek istiyorum.',
            ja: 'ファーストフードが食べたいです。',
            vi: 'Tôi muốn ăn đồ ăn nhanh.',
            th: 'ฉันอยากกินฟาสต์ฟู้ด',
            fr: 'Je voudrais manger au fast-food.',
            it: 'Vorrei mangiare fast food.',
            es: 'Quisiera comer comida rápida.',
            de: 'Ich möchte Fast Food essen.',
            zh: '我想吃快餐。',
            ru: 'Я хочу поесть фаст-фуд.'
        }
    }, {
        id: 205, category: 'food', image: icons.store, translations: {
            ko: '마트',
            en: 'Where is the nearest supermarket?',
            km: 'តើផ្សារទំនើបដែលនៅជិតបំផុតនៅឯណា?',
            tr: 'En yakın süpermarket nerede?',
            ja: '一番近いスーパーはどこですか？',
            vi: 'Siêu thị gần nhất ở đâu?',
            th: 'ซุปเปอร์มาร์เก็ตที่ใกล้ที่สุดอยู่ที่ไหน?',
            fr: 'Où est le supermarché le plus proche ?',
            it: 'Dov\'è il supermercato più vicino?',
            es: '¿Dónde está el supermercado más cercano?',
            de: 'Wo ist der nächste Supermarkt?',
            zh: '最近的超市在哪里？',
            ru: 'Где ближайший супермаркет?'
        }
    }, {
        id: 206, category: 'food', image: icons.takeout, translations: {
            ko: '테이크아웃',
            en: 'Can I get this to go?',
            km: 'តើខ្ញុំអាចយកកញ្ចប់បានទេ?',
            tr: 'Bunu paket yapabilir misiniz?',
            ja: '持ち帰りにできますか？',
            vi: 'Cho tôi mang về được không?',
            th: 'ห่อกลับบ้านได้ไหม?',
            fr: 'Puis-je l\'emporter ?',
            it: 'Posso prenderlo da asporto?',
            es: '¿Me lo puede poner para llevar?',
            de: 'Kann ich das zum Mitnehmen haben?',
            zh: '我可以打包吗？',
            ru: 'Можно мне это с собой?'
        }
    }, {
        id: 207, category: 'food', image: icons.vegan, translations: {
            ko: '채식 비건',
            en: 'Do you have vegan options?',
            km: 'តើអ្នកមានជម្រើសអាហារបួសទេ?',
            tr: 'Vegan seçeneğiniz var mı?',
            ja: 'ビーガンメニューはありますか？',
            vi: 'Bạn có món chay không?',
            th: 'มีอาหารมังสวิรัติไหม?',
            fr: 'Avez-vous des options végétaliennes ?',
            it: 'Avete opzioni vegane?',
            es: '¿Tienen opciones veganas?',
            de: 'Haben Sie vegane Optionen?',
            zh: '有素食吗？',
            ru: 'У вас есть веганские блюда?'
        }
    }, {
        id: 208, category: 'food', image: icons.bakery, translations: {
            ko: '빵집',
            en: 'Where is the nearest bakery?',
            km: 'តើហាងនំប៉័ងដែលនៅជិតបំផុតនៅឯណា?',
            tr: 'En yakın fırın nerede?',
            ja: '一番近いパン屋はどこですか？',
            vi: 'Tiệm bánh gần nhất ở đâu?',
            th: 'ร้านเบเกอรี่ที่ใกล้ที่สุดอยู่ที่ไหน?',
            fr: 'Où est la boulangerie la plus proche ?',
            it: 'Dov\'è la panetteria più vicina?',
            es: '¿Dónde está la panadería más cercana?',
            de: 'Wo ist die nächste Bäckerei?',
            zh: '最近的面包店在哪里？',
            ru: 'Где ближайшая пекарня?'
        }
    }, {
        id: 209, category: 'food', image: icons.water, translations: {
            ko: '물병',
            en: 'Can I have a bottle of water?',
            km: 'តើខ្ញុំអាចសុំទឹកដបបានទេ?',
            tr: 'Bir şişe su alabilir miyim?',
            ja: 'お水を一本いただけますか？',
            vi: 'Cho tôi một chai nước được không?',
            th: 'ขอน้ำขวดหนึ่งได้ไหม?',
            fr: 'Puis-je avoir une bouteille d\'eau ?',
            it: 'Posso avere una bottiglia d\'acqua?',
            es: '¿Me da una botella de agua?',
            de: 'Kann ich eine Flasche Wasser haben?',
            zh: '能给我一瓶水吗？',
            ru: 'Можно мне бутылку воды?'
        }
    },

    // 3. 교통
    {
        id: 301, category: 'transport', image: icons.airport, translations: {
            ko: '공항',
            en: 'How do I get to the airport?',
            km: 'តើខ្ញុំទៅព្រលានយន្តហោះដោយរបៀបណា?',
            tr: 'Havalimanına nasıl giderim?',
            ja: '空港へはどう行けばいいですか？',
            vi: 'Làm thế nào để tôi đến sân bay?',
            th: 'ฉันจะไปสนามบินได้อย่างไร?',
            fr: 'Comment aller à l\'aéroport ?',
            it: 'Come arrivo all\'aeroporto?',
            es: '¿Cómo llego al aeropuerto?',
            de: 'Wie komme ich zum Flughafen?',
            zh: '怎么去机场？',
            ru: 'Как мне добраться до аэропорта?'
        }
    }, {
        id: 302, category: 'transport', image: icons.train, translations: {
            ko: '기차',
            en: 'Where is the train station?',
            km: 'តើស្ថានីយ៍រថភ្លើងនៅឯណា?',
            tr: 'Tren istasyonu nerede?',
            ja: '駅はどこですか？',
            vi: 'Ga tàu ở đâu?',
            th: 'สถานีรถไฟอยู่ที่ไหน?',
            fr: 'Où est la gare ?',
            it: 'Dov\'è la stazione ferroviaria?',
            es: '¿Dónde está la estación de tren?',
            de: 'Wo ist der Bahnhof?',
            zh: '火车站在哪里？',
            ru: 'Где находится железнодорожный вокзал?'
        }
    }, {
        id: 303, category: 'transport', image: icons.subway, translations: {
            ko: '지하철',
            en: 'Where is the subway station?',
            km: 'តើស្ថានីយ៍រថភ្លើងក្រោមដីនៅឯណា?',
            tr: 'Metro istasyonu nerede?',
            ja: '地下鉄の駅はどこですか？',
            vi: 'Ga tàu điện ngầm ở đâu?',
            th: 'สถานีรถไฟใต้ดินอยู่ที่ไหน?',
            fr: 'Où est la station de métro ?',
            it: 'Dov\'è la stazione della metropolitana?',
            es: '¿Dónde está la estación de metro?',
            de: 'Wo ist die U-Bahn-Station?',
            zh: '地铁站在哪里？',
            ru: 'Где станция метро?'
        }
    }, {
        id: 304, category: 'transport', image: icons.busStop, translations: {
            ko: '버스',
            en: 'Where is the bus stop?',
            km: 'តើចំណតឡានក្រុងនៅឯណា?',
            tr: 'Otobüs durağı nerede?',
            ja: 'バス停はどこですか？',
            vi: 'Trạm xe buýt ở đâu?',
            th: 'ป้ายรถเมล์อยู่ที่ไหน?',
            fr: 'Où est l\'arrêt de bus ?',
            it: 'Dov\'è la fermata dell\'autobus?',
            es: '¿Dónde está la parada de autobús?',
            de: 'Wo ist die Bushaltestelle?',
            zh: '公交车站在哪里？',
            ru: 'Где автобусная остановка?'
        }
    }, {
        id: 305, category: 'transport', image: icons.taxi, translations: {
            ko: '택시',
            en: 'Could you call a taxi for me?',
            km: 'តើអ្នកអាចហៅតាក់ស៊ីឱ្យខ្ញុំបានទេ?',
            tr: 'Bana taksi çağırabilir misiniz?',
            ja: 'タクシーを呼んでもらえますか？',
            vi: 'Bạn có thể gọi taxi giúp tôi không?',
            th: 'ช่วยเรียกแท็กซี่ให้หน่อยได้ไหม?',
            fr: 'Pouvez-vous m\'appeler un taxi ?',
            it: 'Mi può chiamare un taxi?',
            es: '¿Podría llamarme un taxi?',
            de: 'Könnten Sie mir ein Taxi rufen?',
            zh: '能帮我叫辆出租车吗？',
            ru: 'Вы можете вызвать мне такси?'
        }
    }, {
        id: 306, category: 'transport', image: icons.carRental, translations: {
            ko: '렌터카',
            en: 'I would like to rent a car.',
            km: 'ខ្ញុំចង់ជួលឡាន។',
            tr: 'Araba kiralamak istiyorum.',
            ja: 'レンタカーを借りたいです。',
            vi: 'Tôi muốn thuê xe ô tô.',
            th: 'ฉันต้องการเช่ารถ',
            fr: 'Je voudrais louer une voiture.',
            it: 'Vorrei noleggiare un\'auto.',
            es: 'Quisiera alquilar un coche.',
            de: 'Ich möchte ein Auto mieten.',
            zh: '我想租车。',
            ru: 'Я хотел бы арендовать машину.'
        }
    }, {
        id: 307, category: 'transport', image: icons.parking, translations: {
            ko: '주차장',
            en: 'Where is the parking lot?',
            km: 'តើចំណតរថយន្តនៅឯណា?',
            tr: 'Otopark nerede?',
            ja: '駐車場はどこですか？',
            vi: 'Bãi đậu xe ở đâu?',
            th: 'ที่จอดรถอยู่ที่ไหน?',
            fr: 'Où est le parking ?',
            it: 'Dov\'è il parcheggio?',
            es: '¿Dónde está el aparcamiento?',
            de: 'Wo ist der Parkplatz?',
            zh: '停车场在哪里？',
            ru: 'Где парковка?'
        }
    }, {
        id: 308, category: 'transport', image: icons.gasStation, translations: {
            ko: '주유소',
            en: 'Where is the nearest gas station?',
            km: 'តើស្ថានីយ៍ប្រេងឥន្ធនៈដែលនៅជិតបំផុតនៅឯណា?',
            tr: 'En yakın benzin istasyonu nerede?',
            ja: '一番近いガソリンスタンドはどこですか？',
            vi: 'Trạm xăng gần nhất ở đâu?',
            th: 'ปั๊มน้ำมันที่ใกล้ที่สุดอยู่ที่ไหน?',
            fr: 'Où est la station-service la plus proche ?',
            it: 'Dov\'è il benzinaio più vicino?',
            es: '¿Dónde está la gasolinera más cercana?',
            de: 'Wo ist die nächste Tankstelle?',
            zh: '最近的加油站在哪里？',
            ru: 'Где ближайшая заправка?'
        }
    }, {
        id: 309, category: 'transport', image: icons.harbor, translations: {
            ko: '항구, 배',
            en: 'How do I get to the port?',
            km: 'តើខ្ញុំទៅកំពង់ផែដោយរបៀបណា?',
            tr: 'Limana nasıl giderim?',
            ja: '港へはどう行けばいいですか？',
            vi: 'Làm thế nào để tôi đến cảng?',
            th: 'ฉันจะไปท่าเรือได้อย่างไร?',
            fr: 'Comment aller au port ?',
            it: 'Come arrivo al porto?',
            es: '¿Cómo llego al puerto?',
            de: 'Wie komme ich zum Hafen?',
            zh: '怎么去港口？',
            ru: 'Как добраться до порта?'
        }
    }, {
        id: 310, category: 'transport', image: icons.bicycle, translations: {
            ko: '자전거',
            en: 'Where can I rent a bicycle?',
            km: 'តើខ្ញុំអាចជួលកង់នៅឯណា?',
            tr: 'Nereden bisiklet kiralayabilirim?',
            ja: 'どこで自転車を借りられますか？',
            vi: 'Tôi có thể thuê xe đạp ở đâu?',
            th: 'ฉันจะเช่าจักรยานได้ที่ไหน?',
            fr: 'Où puis-je louer un vélo ?',
            it: 'Dove posso noleggiare una bicicletta?',
            es: '¿Dónde puedo alquilar una bicicleta?',
            de: 'Wo kann ich ein Fahrrad mieten?',
            zh: '哪里可以租自行车？',
            ru: 'Где можно взять напрокат велосипед?'
        }
    },

    // 4. 응급/안전
    {
        id: 401, category: 'emergency', image: icons.hospital, translations: {
            ko: '병원',
            en: 'Where is the nearest hospital?',
            km: 'តើមន្ទីរពេទ្យដែលនៅជិតបំផុតនៅឯណា?',
            tr: 'En yakın hastane nerede?',
            ja: '一番近い病院はどこですか？',
            vi: 'Bệnh viện gần nhất ở đâu?',
            th: 'โรงพยาบาลที่ใกล้ที่สุดอยู่ที่ไหน?',
            fr: 'Où est l\'hôpital le plus proche ?',
            it: 'Dov\'è l\'ospedale più vicino?',
            es: '¿Dónde está el hospital más cercano?',
            de: 'Wo ist das nächste Krankenhaus?',
            zh: '最近的医院在哪里？',
            ru: 'Где ближайшая больница?'
        }
    }, {
        id: 402, category: 'emergency', image: icons.pharmacy, translations: {
            ko: '약국',
            en: 'Where is the nearest pharmacy?',
            km: 'តើឱសថស្ថានដែលនៅជិតបំផុតនៅឯណា?',
            tr: 'En yakın eczane nerede?',
            ja: '一番近い薬局はどこですか？',
            vi: 'Hiệu thuốc gần nhất ở đâu?',
            th: 'ร้านขายยาที่ใกล้ที่สุดอยู่ที่ไหน?',
            fr: 'Où est la pharmacie la plus proche ?',
            it: 'Dov\'è la farmacia più vicina?',
            es: '¿Dónde está la farmacia más cercana?',
            de: 'Wo ist die nächste Apotheke?',
            zh: '最近的药店在哪里？',
            ru: 'Где ближайшая аптека?'
        }
    }, {
        id: 403, category: 'emergency', image: icons.embassy, translations: {
            ko: '대사관',
            en: 'Where is my country\'s embassy?',
            km: 'តើស្ថានទូតប្រទេសរបស់ខ្ញុំនៅឯណា?',
            tr: 'Ülkemin büyükelçiliği nerede?',
            ja: '私の国の大使館はどこですか？',
            vi: 'Đại sứ quán nước tôi ở đâu?',
            th: 'สถานทูตของประเทศฉันอยู่ที่ไหน?',
            fr: 'Où est l\'ambassade de mon pays ?',
            it: 'Dov\'è l\'ambasciata del mio paese?',
            es: '¿Dónde está la embajada de mi país?',
            de: 'Wo ist die Botschaft meines Landes?',
            zh: '我国家的大使馆在哪里？',
            ru: 'Где находится посольство моей страны?'
        }
    }, {
        id: 404, category: 'emergency', image: icons.police, translations: {
            ko: '경찰서',
            en: 'Where is the police station?',
            km: 'តើស្ថានីយ៍ប៉ូលីសនៅឯណា?',
            tr: 'Polis karakolu nerede?',
            ja: '警察署はどこですか？',
            vi: 'Đồn cảnh sát ở đâu?',
            th: 'สถานีตำรวจอยู่ที่ไหน?',
            fr: 'Où est le poste de police ?',
            it: 'Dov\'è la stazione di polizia?',
            es: '¿Dónde está la comisaría?',
            de: 'Wo ist die Polizeiwache?',
            zh: '警察局在哪里？',
            ru: 'Где полицейский участок?'
        }
    }, {
        id: 405, category: 'emergency', image: icons.firstAid, translations: {
            ko: '구급상자',
            en: 'I need a first aid kit.',
            km: 'ខ្ញុំត្រូវការប្រអប់សង្គ្រោះបឋម។',
            tr: 'İlk yardım çantasına ihtiyacım var.',
            ja: '救急箱が必要です。',
            vi: 'Tôi cần bộ sơ cứu.',
            th: 'ฉันต้องการชุดปฐมพยาบาล',
            fr: 'J\'ai besoin d\'une trousse de premiers soins.',
            it: 'Ho bisogno di un kit di pronto soccorso.',
            es: 'Necesito un botiquín de primeros auxilios.',
            de: 'Ich brauche einen Erste-Hilfe-Kasten.',
            zh: '我需要急救箱。',
            ru: 'Мне нужна аптечка первой помощи.'
        }
    }, {
        id: 406, category: 'emergency', image: icons.aed, translations: {
            ko: '제세동기',
            en: 'Where is the AED?',
            km: 'តើម៉ាស៊ីន AED នៅឯណា?',
            tr: 'AED (Defibrilatör) nerede?',
            ja: 'AEDはどこにありますか？',
            vi: 'Máy AED ở đâu?',
            th: 'เครื่อง AED อยู่ที่ไหน?',
            fr: 'Où est le défibrillateur (DAE) ?',
            it: 'Dov\'è il DAE?',
            es: '¿Dónde está el desfibrilador (DEA)?',
            de: 'Wo ist der Defibrillator (AED)?',
            zh: 'AED（除颤器）在哪里？',
            ru: 'Где находится дефибриллятор (AED)?'
        }
    }, {
        id: 407, category: 'emergency', image: icons.emergencyExit, translations: {
            ko: '비상구',
            en: 'Where is the emergency exit?',
            km: 'តើច្រកចេញបន្ទាន់នៅឯណា?',
            tr: 'Acil çıkış nerede?',
            ja: '非常口はどこですか？',
            vi: 'Lối thoát hiểm ở đâu?',
            th: 'ทางออกฉุกเฉินอยู่ที่ไหน?',
            fr: 'Où est la sortie de secours ?',
            it: 'Dov\'è l\'uscita di emergenza?',
            es: '¿Dónde está la salida de emergencia?',
            de: 'Wo ist der Notausgang?',
            zh: '紧急出口在哪里？',
            ru: 'Где аварийный выход?'
        }
    }, {
        id: 408, category: 'emergency', image: icons.fireExtinguisher, translations: {
            ko: '소화기',
            en: 'Where is the fire extinguisher?',
            km: 'តើបំពង់ពន្លត់អគ្គីភ័យនៅឯណា?',
            tr: 'Yangın söndürücü nerede?',
            ja: '消火器はどこですか？',
            vi: 'Bình chữa cháy ở đâu?',
            th: 'ถังดับเพลิงอยู่ที่ไหน?',
            fr: 'Où est l\'extincteur ?',
            it: 'Dov\'è l\'estintore?',
            es: '¿Dónde está el extintor?',
            de: 'Wo ist der Feuerlöscher?',
            zh: '灭火器在哪里？',
            ru: 'Где огнетушитель?'
        }
    }, {
        id: 409, category: 'emergency', image: icons.lostAndFound, translations: {
            ko: '분실물 센터',
            en: 'Where is the lost and found?',
            km: 'តើកន្លែងបាត់ និងរកឃើញនៅឯណា?',
            tr: 'Kayıp eşya bürosu nerede?',
            ja: '遺失物取扱所はどこですか？',
            vi: 'Phòng thất lạc đồ ở đâu?',
            th: 'ศูนย์ของหายอยู่ที่ไหน?',
            fr: 'Où sont les objets trouvés ?',
            it: 'Dov\'è l\'ufficio oggetti smarriti?',
            es: '¿Dónde está la oficina de objetos perdidos?',
            de: 'Wo ist das Fundbüro?',
            zh: '失物招领处在哪里？',
            ru: 'Где бюро находок?'
        }
    },

    // 5. 쇼핑
    {
        id: 501, category: 'shopping', image: icons.information, translations: {
            ko: '안내소',
            en: 'Where is the information desk?',
            km: 'តើកន្លែងផ្តល់ព័ត៌មាននៅឯណា?',
            tr: 'Danışma nerede?',
            ja: '案内所はどこですか？',
            vi: 'Quầy thông tin ở đâu?',
            th: 'จุดประชาสัมพันธ์อยู่ที่ไหน?',
            fr: 'Où est le bureau d\'information ?',
            it: 'Dov\'è l\'ufficio informazioni?',
            es: '¿Dónde está el mostrador de información?',
            de: 'Wo ist der Informationsschalter?',
            zh: '咨询处在哪里？',
            ru: 'Где стойка информации?'
        }
    }, {
        id: 502, category: 'shopping', image: icons.ticket, translations: {
            ko: '티켓',
            en: 'Where can I buy a ticket?',
            km: 'តើខ្ញុំអាចទិញសំបុត្រនៅឯណា?',
            tr: 'Nereden bilet alabilirim?',
            ja: 'どこでチケットを買えますか？',
            vi: 'Tôi có thể mua vé ở đâu?',
            th: 'ฉันจะซื้อตั๋วได้ที่ไหน?',
            fr: 'Où puis-je acheter un billet ?',
            it: 'Dove posso comprare un biglietto?',
            es: '¿Dónde puedo comprar un billete?',
            de: 'Wo kann ich ein Ticket kaufen?',
            zh: '哪里可以买票？',
            ru: 'Где я могу купить билет?'
        }
    }, {
        id: 503, category: 'shopping', image: icons.atm, translations: {
            ko: 'ATM',
            en: 'Where is the nearest ATM?',
            km: 'តើម៉ាស៊ីន ATM ដែលនៅជិតបំផុតនៅឯណា?',
            tr: 'En yakın ATM nerede?',
            ja: '一番近いATMはどこですか？',
            vi: 'Máy ATM gần nhất ở đâu?',
            th: 'ตู้ ATM ที่ใกล้ที่สุดอยู่ที่ไหน?',
            fr: 'Où est le distributeur automatique le plus proche ?',
            it: 'Dov\'è il bancomat più vicino?',
            es: '¿Dónde está el cajero automático más cercano?',
            de: 'Wo ist der nächste Geldautomat?',
            zh: '最近的ATM在哪里？',
            ru: 'Где ближайший банкомат?'
        }
    }, {
        id: 504, category: 'shopping', image: icons.currencyExchange, translations: {
            ko: '환전',
            en: 'Where can I exchange currency?',
            km: 'តើខ្ញុំអាចប្តូរប្រាក់នៅឯណា?',
            tr: 'Nerede döviz bozdurabilirim?',
            ja: 'どこで両替できますか？',
            vi: 'Tôi có thể đổi tiền ở đâu?',
            th: 'ฉันจะแลกเงินได้ที่ไหน?',
            fr: 'Où puis-je changer de l\'argent ?',
            it: 'Dove posso cambiare valuta?',
            es: '¿Dónde puedo cambiar dinero?',
            de: 'Wo kann ich Geld wechseln?',
            zh: '哪里可以换钱？',
            ru: 'Где я могу обменять валюту?'
        }
    }, {
        id: 505, category: 'shopping', image: icons.postOffice, translations: {
            ko: '우체국',
            en: 'Where is the post office?',
            km: 'តើប៉ុស្តិ៍ប្រៃសណីយ៍នៅឯណា?',
            tr: 'Postane nerede?',
            ja: '郵便局はどこですか？',
            vi: 'Bưu điện ở đâu?',
            th: 'ที่ทำการไปรษณีย์อยู่ที่ไหน?',
            fr: 'Où est le bureau de poste ?',
            it: 'Dov\'è l\'ufficio postale?',
            es: '¿Dónde está la oficina de correos?',
            de: 'Wo ist das Postamt?',
            zh: '邮局在哪里？',
            ru: 'Где находится почтовое отделение?'
        }
    }, {
        id: 506, category: 'shopping', image: icons.laundromat, translations: {
            ko: '세탁',
            en: 'Where is a laundromat?',
            km: 'តើកន្លែងបោកអ៊ុតនៅឯណា?',
            tr: 'Çamaşırhane nerede?',
            ja: 'コインランドリーはどこですか？',
            vi: 'Tiệm giặt ủi ở đâu?',
            th: 'ร้านซักรีดอยู่ที่ไหน?',
            fr: 'Où est la laverie ?',
            it: 'Dov\'è una lavanderia?',
            es: '¿Dónde hay una lavandería?',
            de: 'Wo ist ein Waschsalon?',
            zh: '哪里有自助洗衣店？',
            ru: 'Где прачечная?'
        }
    }, {
        id: 507, category: 'shopping', image: icons.salon, translations: {
            ko: '미용실',
            en: 'Is there a hair salon nearby?',
            km: 'តើមានហាងធ្វើសក់នៅជិតនេះទេ?',
            tr: 'Yakınlarda kuaför var mı?',
            ja: '近くに美容院はありますか？',
            vi: 'Có tiệm làm tóc nào gần đây không?',
            th: 'มีร้านทำผมแถวนี้ไหม?',
            fr: 'Y a-t-il un salon de coiffure à proximité ?',
            it: 'C\'è un parrucchiere qui vicino?',
            es: '¿Hay una peluquería cerca?',
            de: 'Gibt es einen Friseur in der Nähe?',
            zh: '附近有理发店吗？',
            ru: 'Есть ли поблизости парикмахерская?'
        }
    }, {
        id: 508, category: 'shopping', image: icons.fittingRoom, translations: {
            ko: '탈의실',
            en: 'Where is the fitting room?',
            km: 'តើបន្ទប់សាកសម្លៀកបំពាក់នៅឯណា?',
            tr: 'Deneme kabini nerede?',
            ja: '試着室はどこですか？',
            vi: 'Phòng thử đồ ở đâu?',
            th: 'ห้องลองชุดอยู่ที่ไหน?',
            fr: 'Où est la cabine d\'essayage ?',
            it: 'Dov\'è il camerino?',
            es: '¿Dónde está el probador?',
            de: 'Wo ist die Umkleidekabine?',
            zh: '试衣间在哪里？',
            ru: 'Где примерочная?'
        }
    }, {
        id: 509, category: 'shopping', image: icons.shoppingBag, translations: {
            ko: '쇼핑백',
            en: 'I want to go shopping.',
            km: 'ខ្ញុំចង់ទៅទិញអីវ៉ាន់។',
            tr: 'Alışverişe gitmek istiyorum.',
            ja: '買い物に行きたいです。',
            vi: 'Tôi muốn đi mua sắm.',
            th: 'ฉันอยากไปช้อปปิ้ง',
            fr: 'Je veux faire du shopping.',
            it: 'Voglio fare shopping.',
            es: 'Quiero ir de compras.',
            de: 'Ich möchte shoppen gehen.',
            zh: '我想去购物。',
            ru: 'Я хочу пойти по магазинам.'
        }
    },

    // 6. 관광/여가
    {
        id: 601, category: 'tourism', image: icons.museum, translations: {
            ko: '박물관',
            en: 'Where is the museum?',
            km: 'តើសារមន្ទីរនៅឯណា?',
            tr: 'Müze nerede?',
            ja: '博物館はどこですか？',
            vi: 'Bảo tàng ở đâu?',
            th: 'พิพิธภัณฑ์อยู่ที่ไหน?',
            fr: 'Où est le musée ?',
            it: 'Dov\'è il museo?',
            es: '¿Dónde está el museo?',
            de: 'Wo ist das Museum?',
            zh: '博物馆在哪里？',
            ru: 'Где находится музей?'
        }
    }, {
        id: 602, category: 'tourism', image: icons.gallery, translations: {
            ko: '미술관',
            en: 'Where is the art gallery?',
            km: 'តើវិចិត្រសាលសិល្បៈនៅឯណា?',
            tr: 'Sanat galerisi nerede?',
            ja: '美術館はどこですか？',
            vi: 'Phòng trưng bày nghệ thuật ở đâu?',
            th: 'หอศิลป์อยู่ที่ไหน?',
            fr: 'Où est la galerie d\'art ?',
            it: 'Dov\'è la galleria d\'arte?',
            es: '¿Dónde está la galería de arte?',
            de: 'Wo ist die Kunstgalerie?',
            zh: '美术馆在哪里？',
            ru: 'Где картинная галерея?'
        }
    }, {
        id: 603, category: 'tourism', image: icons.cinema, translations: {
            ko: '극장',
            en: 'I want to go to the theater.',
            km: 'ខ្ញុំចង់ទៅរោងកុន។',
            tr: 'Sinemaya gitmek istiyorum.',
            ja: '映画館に行きたいです。',
            vi: 'Tôi muốn đi rạp chiếu phim.',
            th: 'ฉันอยากไปโรงหนัง',
            fr: 'Je veux aller au cinéma.',
            it: 'Voglio andare al cinema.',
            es: 'Quiero ir al cine.',
            de: 'Ich möchte ins Kino gehen.',
            zh: '我想去看电影。',
            ru: 'Я хочу пойти в кино.'
        }
    }, {
        id: 604, category: 'tourism', image: icons.observatory, translations: {
            ko: '전망대',
            en: 'How do I get to the observatory?',
            km: 'តើខ្ញុំទៅកន្លែងទស្សនាដោយរបៀបណា?',
            tr: 'Gözlem noktasına nasıl giderim?',
            ja: '展望台へはどう行けばいいですか？',
            vi: 'Làm thế nào để tôi đến đài quan sát?',
            th: 'ฉันจะไปหอชมวิวได้อย่างไร?',
            fr: 'Comment aller à l\'observatoire ?',
            it: 'Come arrivo all\'osservatorio?',
            es: '¿Cómo llego al observatorio?',
            de: 'Wie komme ich zur Aussichtsplattform?',
            zh: '怎么去展望台？',
            ru: 'Как добраться до обсерватории?'
        }
    }, {
        id: 605, category: 'tourism', image: icons.photography, translations: {
            ko: '사진',
            en: 'Can I take a picture here?',
            km: 'តើខ្ញុំអាចថតរូបនៅទីនេះបានទេ?',
            tr: 'Burada fotoğraf çekebilir miyim?',
            ja: 'ここで写真を撮ってもいいですか？',
            vi: 'Tôi có thể chụp ảnh ở đây không?',
            th: 'ฉันถ่ายรูปที่นี่ได้ไหม?',
            fr: 'Puis-je prendre une photo ici ?',
            it: 'Posso fare una foto qui?',
            es: '¿Puedo hacer una foto aquí?',
            de: 'Darf ich hier fotografieren?',
            zh: '我可以在这里拍照吗？',
            ru: 'Можно здесь фотографировать?'
        }
    }, {
        id: 606, category: 'tourism', image: icons.park, translations: {
            ko: '공원',
            en: 'Where is the nearest park?',
            km: 'តើ-សួន-ច្បារ-ដែល-នៅ-ជិត-បំផុត-នៅ-ឯ-ណា?',
            tr: 'En yakın park nerede?',
            ja: '一番近い公園はどこですか？',
            vi: 'Công viên gần nhất ở đâu?',
            th: 'สวนสาธารณะที่ใกล้ที่สุดอยู่ที่ไหน?',
            fr: 'Où est le parc le plus proche ?',
            it: 'Dov\'è il parco più vicino?',
            es: '¿Dónde está el parque más cercano?',
            de: 'Wo ist der nächste Park?',
            zh: '最近的公园在哪里？',
            ru: 'Где ближайший парк?'
        }
    }, {
        id: 607, category: 'tourism', image: icons.beach, translations: {
            ko: '해변',
            en: 'How do I get to the beach?',
            km: 'តើខ្ញុំទៅឆ្នេរដោយរបៀបណា?',
            tr: 'Plaja nasıl giderim?',
            ja: 'ビーチへはどう行けばいいですか？',
            vi: 'Làm thế nào để tôi ra biển?',
            th: 'ฉันจะไปชายหาดได้อย่างไร?',
            fr: 'Comment aller à la plage ?',
            it: 'Come arrivo alla spiaggia?',
            es: '¿Cómo llego a la playa?',
            de: 'Wie komme ich zum Strand?',
            zh: '怎么去海滩？',
            ru: 'Как добраться до пляжа?'
        }
    }, {
        id: 608, category: 'tourism', image: icons.hiking, translations: {
            ko: '등산로',
            en: 'I want to go hiking.',
            km: 'ខ្ញុំចង់ទៅដើរป่า។',
            tr: 'Doğa yürüyüşüne gitmek istiyorum.',
            ja: 'ハイキングに行きたいです。',
            vi: 'Tôi muốn đi leo núi.',
            th: 'ฉันอยากไปเดินป่า',
            fr: 'Je veux faire de la randonnée.',
            it: 'Voglio fare escursionismo.',
            es: 'Quiero hacer senderismo.',
            de: 'Ich möchte wandern gehen.',
            zh: '我想去徒步。',
            ru: 'Я хочу пойти в поход.'
        }
    }, {
        id: 609, category: 'tourism', image: icons.swimmingPool, translations: {
            ko: '수영장',
            en: 'Is there a swimming pool?',
            km: 'តើមានអាងហែលទឹកទេ?',
            tr: 'Yüzme havuzu var mı?',
            ja: 'プールはありますか？',
            vi: 'Có hồ bơi không?',
            th: 'มีสระว่ายน้ำไหม?',
            fr: 'Y a-t-il une piscine ?',
            it: 'C\'è una piscina?',
            es: '¿Hay piscina?',
            de: 'Gibt es ein Schwimmbad?',
            zh: '有游泳池吗？',
            ru: 'Есть ли бассейн?'
        }
    }, {
        id: 610, category: 'tourism', image: icons.temple, translations: {
            ko: '사원',
            en: 'Where is the temple?',
            km: 'តើប្រាសាទនៅឯណា?',
            tr: 'Tapınak nerede?',
            ja: 'お寺はどこですか？',
            vi: 'Ngôi đền ở đâu?',
            th: 'วัดอยู่ที่ไหน?',
            fr: 'Où est le temple ?',
            it: 'Dov\'è il tempio?',
            es: '¿Dónde está el templo?',
            de: 'Wo ist der Tempel?',
            zh: '寺庙在哪里？',
            ru: 'Где находится храм?'
        }
    },

    // 7. 숙소
    {
        id: 701, category: 'accommodation', image: icons.frontDesk, translations: {
            ko: '프런트 데스크',
            en: 'Where is the front desk?',
            km: 'តើកន្លែងទទួលភ្ញៀវនៅឯណា?',
            tr: 'Resepsiyon nerede?',
            ja: 'フロントはどこですか？',
            vi: 'Quầy lễ tân ở đâu?',
            th: 'แผนกต้อนรับอยู่ที่ไหน?',
            fr: 'Où est la réception ?',
            it: 'Dov\'è la reception?',
            es: '¿Dónde está la recepción?',
            de: 'Wo ist die Rezeption?',
            zh: '前台在哪里？',
            ru: 'Где стойка регистрации?'
        }
    }, {
        id: 702, category: 'accommodation', image: icons.keyCard, translations: {
            ko: '객실 열쇠',
            en: 'I lost my room key.',
            km: 'ខ្ញុំបាត់សោបន្ទប់។',
            tr: 'Oda anahtarımı kaybettim.',
            ja: '部屋の鍵をなくしました。',
            vi: 'Tôi làm mất chìa khóa phòng.',
            th: 'ฉันทำกุญแจห้องหาย',
            fr: 'J\'ai perdu ma clé de chambre.',
            it: 'Ho perso la chiave della camera.',
            es: 'He perdido la llave de mi habitación.',
            de: 'Ich habe meinen Zimmerschlüssel verloren.',
            zh: '我把房间钥匙弄丢了。',
            ru: 'Я потерял ключ от номера.'
        }
    }, {
        id: 703, category: 'accommodation', image: icons.roomService, translations: {
            ko: '룸서비스',
            en: 'I would like to order room service.',
            km: 'ខ្ញុំចង់កុម្ម៉ង់សេវាកម្មបន្ទប់។',
            tr: 'Oda servisi sipariş etmek istiyorum.',
            ja: 'ルームサービスをお願いしたいです。',
            vi: 'Tôi muốn gọi dịch vụ phòng.',
            th: 'ฉันอยากสั่งรูมเซอร์วิส',
            fr: 'Je voudrais commander le room service.',
            it: 'Vorrei ordinare il servizio in camera.',
            es: 'Quisiera pedir servicio de habitaciones.',
            de: 'Ich möchte den Zimmerservice bestellen.',
            zh: '我想叫客房服务。',
            ru: 'Я хотел бы заказать обслуживание в номере.'
        }
    }, {
        id: 704, category: 'accommodation', image: icons.housekeeping, translations: {
            ko: '청소 요청',
            en: 'Please clean my room.',
            km: 'សូមសម្អាតបន្ទប់របស់ខ្ញុំ។',
            tr: 'Lütfen odamı temizleyin.',
            ja: '部屋を掃除してください。',
            vi: 'Làm ơn dọn phòng giúp tôi.',
            th: 'ช่วยทำความสะอาดห้องให้หน่อย',
            fr: 'Merci de nettoyer ma chambre.',
            it: 'Per favore, pulite la mia camera.',
            es: 'Por favor, limpie mi habitación.',
            de: 'Bitte reinigen Sie mein Zimmer.',
            zh: '请打扫我的房间。',
            ru: 'Пожалуйста, уберите в моем номере.'
        }
    }, {
        id: 705, category: 'accommodation', image: icons.towel, translations: {
            ko: '수건',
            en: 'Can I have more towels?',
            km: 'តើខ្ញុំអាចសុំកន្សែងបន្ថែមបានទេ?',
            tr: 'Daha fazla havlu alabilir miyim?',
            ja: 'タオルを追加でもらえますか？',
            vi: 'Cho tôi thêm khăn tắm được không?',
            th: 'ขอผ้าเช็ดตัวเพิ่มได้ไหม?',
            fr: 'Puis-je avoir plus de serviettes ?',
            it: 'Posso avere altri asciugamani?',
            es: '¿Me puede dar más toallas?',
            de: 'Kann ich mehr Handtücher haben?',
            zh: '能多给我几条毛巾吗？',
            ru: 'Можно мне еще полотенец?'
        }
    }, {
        id: 706, category: 'accommodation', image: icons.airConditioner, translations: {
            ko: '에어컨',
            en: 'The air conditioner is not working.',
            km: 'ម៉ាស៊ីនត្រជាក់មិនដំណើរការទេ។',
            tr: 'Klima çalışmıyor.',
            ja: 'エアコンが動きません。',
            vi: 'Máy lạnh không hoạt động.',
            th: 'แอร์ไม่เย็น/ไม่ทำงาน',
            fr: 'La climatisation ne fonctionne pas.',
            it: 'L\'aria condizionata non funziona.',
            es: 'El aire acondicionado no funciona.',
            de: 'Die Klimaanlage funktioniert nicht.',
            zh: '空调坏了。',
            ru: 'Кондиционер не работает.'
        }
    }, {
        id: 707, category: 'accommodation', image: icons.heating, translations: {
            ko: '난방',
            en: 'The heating is not working.',
            km: 'ម៉ាស៊ីនកម្តៅមិនដំណើរការទេ។',
            tr: 'Isıtma çalışmıyor.',
            ja: '暖房が効きません。',
            vi: 'Máy sưởi không hoạt động.',
            th: 'เครื่องทำความร้อนไม่ทำงาน',
            fr: 'Le chauffage ne fonctionne pas.',
            it: 'Il riscaldamento non funziona.',
            es: 'La calefacción no funciona.',
            de: 'Die Heizung funktioniert nicht.',
            zh: '暖气坏了。',
            ru: 'Отопление не работает.'
        }
    }, {
        id: 708, category: 'accommodation', image: icons.luggageStorage, translations: {
            ko: '짐 보관',
            en: 'Can I store my luggage here?',
            km: 'តើខ្ញុំអាចទុកអីវ៉ាន់នៅទីនេះបានទេ?',
            tr: 'Bavulumu buraya bırakabilir miyim?',
            ja: '荷物を預かってもらえますか？',
            vi: 'Tôi có thể gửi hành lý ở đây không?',
            th: 'ฉันฝากกระเป๋าเดินทางไว้ที่นี่ได้ไหม?',
            fr: 'Puis-je laisser mes bagages ici ?',
            it: 'Posso lasciare qui i miei bagagli?',
            es: '¿Puedo dejar mi equipaje aquí?',
            de: 'Kann ich mein Gepäck hier lassen?',
            zh: '我可以把行李寄存在这儿吗？',
            ru: 'Могу я оставить здесь свой багаж?'
        }
    }, {
        id: 709, category: 'accommodation', image: icons.findRoom, translations: {
            ko: '객실 찾기',
            en: 'How do I get to my room?',
            km: 'តើខ្ញុំទៅបន្ទប់របស់ខ្ញុំដោយរបៀបណា?',
            tr: 'Odama nasıl giderim?',
            ja: '私の部屋へはどう行けばいいですか？',
            vi: 'Làm thế nào để tôi về phòng?',
            th: 'ฉันจะไปที่ห้องพักได้อย่างไร?',
            fr: 'Comment aller à ma chambre ?',
            it: 'Come arrivo alla mia camera?',
            es: '¿Cómo llego a mi habitación?',
            de: 'Wie komme ich zu meinem Zimmer?',
            zh: '怎么去我的房间？',
            ru: 'Как мне пройти в мой номер?'
        }
    }, {
        id: 710, category: 'accommodation', image: icons.checkout, translations: {
            ko: '체크아웃',
            en: 'I would like to check out.',
            km: 'ខ្ញុំចង់គិតលុយចេញ។',
            tr: 'Çıkış yapmak istiyorum.',
            ja: 'チェックアウトしたいです。',
            vi: 'Tôi muốn trả phòng.',
            th: 'ฉันอยากเช็คเอาท์',
            fr: 'Je voudrais régler la note (check-out).',
            it: 'Vorrei fare il check-out.',
            es: 'Quisiera hacer el check-out.',
            de: 'Ich möchte auschecken.',
            zh: '我想退房。',
            ru: 'Я хотел бы выписаться.'
        }
    },];