/**
 * VANLIFE CONNECT - MOCK DATA
 * Sample data for the prototype
 */

// Sample Posts
const postsData = [
    {
        id: 1,
        author: "WanderVan_89",
        avatar: "🚐",
        channel: "spots",
        channelTag: "📍 Spots",
        distance: "200m",
        distanceClass: "near",
        content: "Gerade am Landwehrkanal angekommen! Mega schöner Spot zum Arbeiten, WLAN vom Café gegenüber reicht für Zoom-Calls. Jemand Lust auf einen Kaffee? ☕️",
        translated: "",
        likes: 12,
        isLiked: false,
        comments: 4,
        time: "vor 2h",
        commentTeaser: {
            author: "NomadNina",
            text: "Welches Café genau? Bin gleich da! ☕️"
        }
    },
    {
        id: 2,
        author: "CamperLife_Sarah",
        avatar: "🏕️",
        channel: "hilfe",
        channelTag: "🆘 Hilfe",
        distance: "500m",
        distanceClass: "near",
        content: "Does anyone have experience with the parking spot at Tempelhofer Feld? Is it safe overnight? I have my bike with me and I'm a bit cautious 😅",
        translated: "Hat jemand Erfahrung mit dem Stellplatz am Tempelhofer Feld? Ist es sicher über Nacht? Ich habe mein Fahrrad dabei und bin etwas vorsichtig 😅",
        likes: 28,
        isLiked: true,
        comments: 8,
        time: "vor 4h",
        commentTeaser: {
            author: "BerlinVan_Dave",
            text: "Ja, super safe! Polizei fährt regelmäßig..."
        }
    },
    {
        id: 3,
        author: "ForestVan_Tom",
        avatar: "🌲",
        channel: "tipps",
        channelTag: "💡 Tipps",
        distance: "1.2 km",
        distanceClass: "",
        content: "Tipp für alle die Richtung Grunewald wollen: Die Tankstelle an der Avus hat einen kostenlosen Wasseranschluss hinten am Gebäude. Super nette Mitarbeiter! 💧",
        translated: "",
        likes: 45,
        isLiked: false,
        comments: 12,
        time: "vor 6h",
        commentTeaser: null
    }
];

// Sample Comments
const commentsData = [
    { id: 1, postId: 1, author: "NomadNina", avatar: "🌊", text: "Welches Café genau? Bin gleich da! ☕️", time: "12:15", own: false },
    { id: 2, postId: 1, author: "Du", avatar: "😎", text: "Das kleine Blaue direkt am Kanal! Kannst nicht verfehlen 👍", time: "12:18", own: true },
    { id: 3, postId: 1, author: "NomadNina", avatar: "🌊", text: "Perfekt, danke! Bis gleich 😊", time: "12:19", own: false },
    { id: 4, postId: 1, author: "AlpineVan_Max", avatar: "🏔️", text: "Ich komm auch vorbei, hab noch 10 Minuten Fahrt!", time: "12:21", own: false },
    { id: 5, postId: 2, author: "BerlinVan_Dave", avatar: "🚐", text: "Ja, super safe! Polizei fährt regelmäßig vorbei und es sind immer andere Vanlifer da.", time: "11:45", own: false },
    { id: 6, postId: 2, author: "Du", avatar: "😎", text: "Danke für die Info! Dann probiere ich es heute Nacht aus", time: "11:52", own: true },
    { id: 7, postId: 2, author: "BerlinVan_Dave", avatar: "🚐", text: "Ich bin grad auch da, können uns gerne kennenlernen!", time: "12:05", own: false },
    { id: 8, postId: 2, author: "ForestVan_Tom", avatar: "🌲", text: "Fahrrad lieber im Van lassen oder anschließen 👍", time: "12:08", own: false }
];

// Channel Data
const channelsData = [
    { id: "spots", name: "Spots", icon: "📍", desc: "Teile und entdecke neue Stellplätze", posts: 128 },
    { id: "treffen", name: "Treffen", icon: "👥", desc: "Organisiere spontane Vanlife-Treffen", posts: 45 },
    { id: "hilfe", name: "Hilfe", icon: "🆘", desc: "Fragen zu Reparatur, Recht & Co.", posts: 67 },
    { id: "tipps", name: "Tipps", icon: "💡", desc: "Lifehacks für das Vanlife", posts: 234 },
    { id: "wohnmobile", name: "Wohnmobile", icon: "🏠", desc: "Austausch über Fahrzeuge & Ausbau", posts: 189 },
    { id: "reisen", name: "Reisen", icon: "🌍", desc: "Routen, Länder & Erlebnisse", posts: 312 }
];

// Direct Messages
const directMessagesData = [
    { id: 1, name: "WanderVan_89", avatar: "🚐", preview: "Bin in 5 Minuten am Café! 👋", time: "12:30", unread: true },
    { id: 2, name: "CamperLife_Sarah", avatar: "🏕️", preview: "Danke für die Info! Hat super geklappt 😊", time: "Gestern", unread: false },
    { id: 3, name: "ForestVan_Tom", avatar: "🌲", preview: "Kennst du einen guten Spot in München?", time: "Gestern", unread: true },
    { id: 4, name: "NomadNina", avatar: "🌊", preview: "Super Treffen gestern! 👍", time: "Vor 2 Tagen", unread: false }
];

// Group Messages
const groupMessagesData = [
    { id: 1, name: "Berlin Vanlife", avatar: "👥", avatarBg: "#ff6b6b", preview: "NomadNina: Wer kommt zum Meetup am Samstag?", time: "10:45" },
    { id: 2, name: "Vanlife DE", avatar: "🇩🇪", avatarBg: "#4ecdc4", preview: "Admin: Neue Regeln für den Feed 📋", time: "Gestern" },
    { id: 3, name: "Vanlife Köln", avatar: "🏛️", avatarBg: "#95e1d3", preview: "Mike: Neuer Spot am Rhein entdeckt!", time: "Vor 3 Tagen" }
];

// Notifications
const notificationsData = [
    { id: 1, type: "like", icon: "❤️", iconClass: "like", text: "<strong>WanderVan_89</strong> gefällt dein Post", time: "vor 5 Minuten", unread: true },
    { id: 2, type: "comment", icon: "💬", iconClass: "comment", text: "<strong>CamperLife_Sarah</strong> hat kommentiert: \"Super Tipp!\"", time: "vor 15 Minuten", unread: true },
    { id: 3, type: "mention", icon: "@", iconClass: "mention", text: "<strong>ForestVan_Tom</strong> hat dich erwähnt", time: "vor 1 Stunde", unread: true },
    { id: 4, type: "like", icon: "❤️", iconClass: "like", text: "<strong>NomadNina</strong> und 5 weitere gefällt dein Post", time: "vor 3 Stunden", unread: false },
    { id: 5, type: "system", icon: "✅", iconClass: "system", text: "Dein Account wurde erfolgreich verifiziert!", time: "vor 2 Tagen", unread: false }
];

// Saved Spots
const savedSpotsData = [
    {
        id: 1,
        name: "Waldparkplatz Grunewald",
        icon: "🏕️",
        location: "Berlin, Deutschland",
        rating: "4.8",
        reviews: 127,
        categories: ["overnight", "water"],
        tags: ["🌙 Übernachtung", "💧 Wasser", "📶 WLAN"],
        note: "Super ruhig ab 22 Uhr. Café gegenüber hat WLAN-Passwort: Vanlife2024"
    },
    {
        id: 2,
        name: "Schluchsee Strandparkplatz",
        icon: "🏖️",
        location: "Schluchsee, Deutschland",
        rating: "4.9",
        reviews: 89,
        categories: ["swimming", "view"],
        tags: ["🏊 Schwimmen", "🌄 Aussicht", "🌙 Übernachtung"],
        note: "Morgens um 6 perfekt für Fotos vom See! Wasserqualität top."
    },
    {
        id: 3,
        name: "Aral Tankstelle Avus",
        icon: "⛽",
        location: "Berlin, Deutschland",
        rating: "4.2",
        reviews: 45,
        categories: ["water"],
        tags: ["💧 Frischwasser", "⚡ Strom", "🚿 Dusche"],
        note: "Kostenloser Wasseranschluss hinten am Gebäude. Personal super nett!"
    },
    {
        id: 4,
        name: "Säntis Aussichtspunkt",
        icon: "🌅",
        location: "Appenzell, Schweiz",
        rating: "5.0",
        reviews: 203,
        categories: ["view", "overnight"],
        tags: ["🌄 Aussicht", "🏔️ Berge", "📸 Instagram"],
        note: "Sonnenaufgang hier ist unbezahlbar! Kalt im Winter aber wert."
    }
];

// My Posts
const myPostsData = [
    {
        id: 1,
        channel: "spots",
        channelTag: "📍 Spots",
        date: "Vor 2 Tagen",
        content: "Entdeckt: Ruhiger Parkplatz am Tegeler See mit schönem Blick aufs Wasser. Am Wochenende etwas voll aber unter der Woche perfekt für Home Office! 🚐💻",
        views: 234,
        likes: 18,
        comments: 5
    },
    {
        id: 2,
        channel: "tipps",
        channelTag: "💡 Tipps",
        date: "Vor 5 Tagen",
        content: "Pro-Tipp für kalte Nächte: Eine Wärmflasche im Fußbereich des Schlafsacks verändert alles! Kostet fast nichts und hält die ganze Nacht warm. 🔥",
        views: 567,
        likes: 89,
        comments: 23
    },
    {
        id: 3,
        channel: "hilfe",
        channelTag: "🆘 Hilfe",
        date: "Vor 1 Woche",
        content: "Hat jemand Erfahrung mit der Gas-Heizung im VW California? Meine piept seit heute Morgen alle 30 Sekunden und ich finde die Anleitung nicht... Hilfe! 😅",
        views: 189,
        likes: 12,
        comments: 8
    },
    {
        id: 4,
        channel: "spots",
        channelTag: "📍 Spots",
        date: "Vor 2 Wochen",
        content: "Wochenend-Trip an die Ostsee! Dieser Parkplatz in Warnemünde ist Gold wert - direkt am Strand, Toiletten in 2 Minuten zu Fuß. Nur am Samstag sehr voll.",
        views: 445,
        likes: 56,
        comments: 14
    }
];

// Spot Detail Data
const spotDetailData = {
    1: {
        name: "Waldparkplatz Grunewald",
        emoji: "🏕️",
        rating: "4.8",
        reviews: 127,
        description: "Ruhiger Waldparkplatz am Rande des Grunewalds. Perfekt für eine Übernachtung oder als Basis für Wanderungen. Das Café gegenüber bietet kostenloses WLAN.",
        price: "Kostenlos",
        maxHeight: "3.2m",
        spaces: "~20",
        surface: "Asphalt",
        amenities: ["💧 Wasser", "⚡ Strom", "📶 WLAN", "🚻 WC", "🗑️ Müll"],
        checkins: 3,
        comments: [
            { author: "WanderVan_89", text: "Super Spot! WLAN funktioniert echt gut für Zoom-Calls.", time: "vor 2 Tagen" },
            { author: "NomadNina", text: "Wochenende ist leider voll, aber unter der Woche perfekt!", time: "vor 1 Woche" }
        ]
    },
    2: {
        name: "Schluchsee Strandparkplatz",
        emoji: "🏖️",
        rating: "4.9",
        reviews: 89,
        description: "Wunderschöner Strandparkplatz direkt am Schluchsee. Kristallklares Wasser zum Schwimmen und SUP. Abends perfekt für Sonnenuntergänge.",
        price: "5€/Tag",
        maxHeight: "2.8m",
        spaces: "~30",
        surface: "Kies",
        amenities: ["🏊 See", "🚻 WC", "🍴 Restaurant", "🏄 SUP-Verleih", "🌅 Aussicht"],
        checkins: 8,
        comments: [
            { author: "LakeLover", text: "Wasserqualität ist phänomenal!", time: "vor 1 Tag" },
            { author: "SwimVan", text: "Morgens um 6 Uhr ganz allein hier gewesen 😍", time: "vor 3 Tagen" }
        ]
    },
    3: {
        name: "Aral Tankstelle Avus",
        emoji: "⛽",
        rating: "4.2",
        reviews: 45,
        description: "Praktische Tankstelle mit kostenlosem Wasseranschluss hinten am Gebäude. Das Personal ist vanlife-freundlich und hilfsbereit.",
        price: "Kostenlos (Wasser)",
        maxHeight: "4.0m",
        spaces: "~5",
        surface: "Asphalt",
        amenities: ["⛽ Tanken", "💧 Wasser", "⚡ Strom", "🚿 Dusche", "🛒 Shop"],
        checkins: 2,
        comments: [
            { author: "WaterVan", text: "Einfach nach hinten fahren und fragen, super nett!", time: "vor 5 Tagen" }
        ]
    },
    4: {
        name: "Säntis Aussichtspunkt",
        emoji: "🌅",
        rating: "5.0",
        reviews: 203,
        description: "Atemberaubender Aussichtspunkt auf 2502m Höhe. Panoramablick über 6 Länder. Kalt im Winter, aber die Sterne sind unglaublich.",
        price: "Kostenlos",
        maxHeight: "Unbegrenzt",
        spaces: "~10",
        surface: "Schotter",
        amenities: ["🌄 Aussicht", "📸 Foto-Spot", "🏔️ Berge", "❄️ Winterfest", "🌌 Sterne"],
        checkins: 5,
        comments: [
            { author: "MountainVan", text: "Sonnenaufgang um 5:30 - unbezahlbar!", time: "vor 2 Tagen" },
            { author: "SnowCamper", text: "Im Winter mit Winterausrüstung kein Problem", time: "vor 1 Woche" }
        ]
    }
};

// Map Hotspot Data (for Heatmap)
const mapHotspotsData = [
    // Portugal
    { lat: 38.7223, lng: -9.1393, intensity: 0.9, posts: 45, city: "Lissabon", samplePosts: [
        { author: "VanLife_PT", text: "Cascais Strand - perfekter Spot! 🏖️", time: "vor 2h" },
        { author: "NomadNina", text: "Belém Tower bei Sonnenuntergang 😍", time: "vor 5h" }
    ]},
    { lat: 37.0179, lng: -7.9308, intensity: 0.8, posts: 32, city: "Faro/Algarve", samplePosts: [
        { author: "SunChaser", text: "Lagos ist unglaublich! 🌅", time: "vor 1h" },
        { author: "BeachVan", text: "Geheimer Strand bei Salema 🏝️", time: "vor 3h" }
    ]},
    // Spain
    { lat: 41.3851, lng: 2.1734, intensity: 0.85, posts: 38, city: "Barcelona", samplePosts: [
        { author: "Mediterrano", text: "Park Güell morgens ist magisch ✨", time: "vor 4h" },
        { author: "CoastalVan", text: "Costa Brava hidden spots 🏕️", time: "vor 6h" }
    ]},
    { lat: 39.4699, lng: -0.3763, intensity: 0.7, posts: 22, city: "Valencia", samplePosts: [
        { author: "OrangeVan", text: "Albufera See bei Sonnenuntergang 🌊", time: "vor 2h" }
    ]},
    { lat: 36.7213, lng: -4.4214, intensity: 0.75, posts: 28, city: "Málaga", samplePosts: [
        { author: "AndaluzVan", text: "Nerja Höhlen - wow! 🤯", time: "vor 3h" }
    ]},
    // France
    { lat: 43.2965, lng: 5.3698, intensity: 0.8, posts: 35, city: "Marseille", samplePosts: [
        { author: "ProvenceVan", text: "Calanques sind atemberaubend! 🏔️", time: "vor 1h" }
    ]},
    { lat: 48.8566, lng: 2.3522, intensity: 0.9, posts: 52, city: "Paris", samplePosts: [
        { author: "CityNomad", text: "Versailles Gärten zum picknicken 🌳", time: "vor 30min" },
        { author: "ArtVan", text: "Montmartre am frühen Morgen 🎨", time: "vor 2h" }
    ]},
    // Germany
    { lat: 52.5200, lng: 13.4050, intensity: 0.85, posts: 41, city: "Berlin", samplePosts: [
        { author: "BerlinVan_Dave", text: "Grunewald See ist top! 🌲", time: "vor 1h" },
        { author: "SpreeNomad", text: "Tempelhofer Feld - freier Platz 🛩️", time: "vor 3h" }
    ]},
    { lat: 48.1351, lng: 11.5820, intensity: 0.75, posts: 29, city: "München", samplePosts: [
        { author: "AlpenVan", text: "Starnberger See perfekt! 🏔️", time: "vor 2h" }
    ]},
    // Austria
    { lat: 48.2082, lng: 16.3738, intensity: 0.65, posts: 19, city: "Wien", samplePosts: [
        { author: "DanubeVan", text: "Donauinsel bei Nacht 🌙", time: "vor 3h" }
    ]},
    { lat: 47.2692, lng: 11.4041, intensity: 0.7, posts: 24, city: "Innsbruck", samplePosts: [
        { author: "TyrolVan", text: "Nordkette Sonnenaufgang 🌄", time: "vor 1h" }
    ]},
    // Italy
    { lat: 41.9028, lng: 12.4964, intensity: 0.9, posts: 48, city: "Rom", samplePosts: [
        { author: "AncientVan", text: "Ostia Antica Parkplatz frei 🏛️", time: "vor 1h" },
        { author: "VaticanVan", text: "Tiber Ufer über Nacht ⛺", time: "vor 6h" }
    ]},
    { lat: 45.4408, lng: 12.3155, intensity: 0.8, posts: 36, city: "Venedig", samplePosts: [
        { author: "LagunaVan", text: "Lido di Jesolo preiswert 🏖️", time: "vor 2h" }
    ]},
    { lat: 40.8518, lng: 14.2681, intensity: 0.75, posts: 31, city: "Neapel", samplePosts: [
        { author: "VolcanoVan", text: "Vesuv Sonnenaufgang 🔥", time: "vor 3h" }
    ]},
    // Croatia
    { lat: 43.5081, lng: 16.4402, intensity: 0.85, posts: 38, city: "Split", samplePosts: [
        { author: "AdriaVan", text: "Hvar Fähre easy! ⛴️", time: "vor 2h" },
        { author: "CroatiaNomad", text: "Krka Wasserfälle 🌊", time: "vor 4h" }
    ]},
    { lat: 42.6507, lng: 18.0944, intensity: 0.8, posts: 34, city: "Dubrovnik", samplePosts: [
        { author: "KingVan", text: "Game of Thrones tour 🏰", time: "vor 2h" }
    ]},
    // Greece
    { lat: 37.9838, lng: 23.7275, intensity: 0.85, posts: 39, city: "Athen", samplePosts: [
        { author: "AcroVan", text: "Akropolis bei Nacht beleuchtet 🏛️", time: "vor 1h" }
    ]},
    { lat: 36.3932, lng: 25.4615, intensity: 0.9, posts: 51, city: "Santorin", samplePosts: [
        { author: "AegeanVan", text: "Oia Sonnenuntergang - unreal! 🌅", time: "vor 30min" },
        { author: "WhiteBlue", text: "Red Beach sehr heiß 🏖️", time: "vor 2h" }
    ]},
    // Turkey
    { lat: 41.0082, lng: 28.9784, intensity: 0.8, posts: 35, city: "Istanbul", samplePosts: [
        { author: "BosphorusVan", text: "Kadiköf Street Food Tour 🥙", time: "vor 2h" }
    ]},
    // Switzerland
    { lat: 46.9480, lng: 7.4474, intensity: 0.7, posts: 22, city: "Bern", samplePosts: [
        { author: "AlpsVan", text: "Interlaken Basecamp 🏕️", time: "vor 4h" }
    ]},
    // Netherlands
    { lat: 52.3676, lng: 4.9041, intensity: 0.65, posts: 18, city: "Amsterdam", samplePosts: [
        { author: "CanalVan", text: "Zandvoort Strand Parkplatz 🏖️", time: "vor 5h" }
    ]}
];

// Followers Data
const followersData = [
    { id: 1, name: "WanderVan_89", handle: "@wanderlust_van", avatar: "🚐", following: true },
    { id: 2, name: "CamperLife_Sarah", handle: "@sarah_camps", avatar: "🏕️", following: true },
    { id: 3, name: "ForestVan_Tom", handle: "@tom_inthewoods", avatar: "🌲", following: false },
    { id: 4, name: "NomadNina", handle: "@nina_travels", avatar: "🌊", following: true },
    { id: 5, name: "AlpineVan_Max", handle: "@max_alps", avatar: "🏔️", following: false },
    { id: 6, name: "BeachVan_Lisa", handle: "@lisa_beachlife", avatar: "🏖️", following: true }
];

// Chat History for Direct Messages
const chatHistoryData = {
    "WanderVan_89": [
        { text: "Hey! Bist du immer noch am Landwehrkanal? 🚐", time: "12:15", own: false },
        { text: "Ja, sitze hier gerade im Café! Komm vorbei ☕️", time: "12:18", own: true },
        { text: "Super, bin in 5 Minuten da! Hast du WLAN? Muss noch was für Arbeit erledigen.", time: "12:19", own: false },
        { text: "Ja, das Passwort ist \"Vanlife2024\" - ist echt stabil hier! 📶", time: "12:20", own: true },
        { text: "Perfekt, danke! Bis gleich 👋", time: "12:21", own: false }
    ]
};

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        postsData,
        commentsData,
        channelsData,
        directMessagesData,
        groupMessagesData,
        notificationsData,
        savedSpotsData,
        myPostsData,
        spotDetailData,
        mapHotspotsData,
        followersData,
        chatHistoryData
    };
}
