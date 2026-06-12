/* ==========================================================================
   Lógica JavaScript: Polla Mundialista FIFA 2026
   ========================================================================== */

// Configuración de Firebase (Opcional - Reemplazar con tus credenciales de Firestore/Auth)
// Si los valores siguen siendo los de marcador, el sistema funcionará localmente (localStorage)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let isFirebaseActive = false;
let db, auth;

// Inicializar Firebase si se configuraron credenciales reales
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        isFirebaseActive = true;
        console.log("🔥 Firebase inicializado correctamente");
    } catch (error) {
        console.error("Error al inicializar Firebase:", error);
    }
}

// 1. Base de Datos de Equipos (48 países)
const TEAMS = {
    "MEX": {
        "name": "México",
        "abbrev": "MEX",
        "iso": "mx"
    },
    "RSA": {
        "name": "Sudáfrica",
        "abbrev": "RSA",
        "iso": "za"
    },
    "KOR": {
        "name": "Corea del Sur",
        "abbrev": "KOR",
        "iso": "kr"
    },
    "CZE": {
        "name": "Chequia",
        "abbrev": "CZE",
        "iso": "cz"
    },
    "CAN": {
        "name": "Canadá",
        "abbrev": "CAN",
        "iso": "ca"
    },
    "QAT": {
        "name": "Qatar",
        "abbrev": "QAT",
        "iso": "qa"
    },
    "SUI": {
        "name": "Suiza",
        "abbrev": "SUI",
        "iso": "ch"
    },
    "BIH": {
        "name": "Bosnia y Her.",
        "abbrev": "BIH",
        "iso": "ba"
    },
    "BRA": {
        "name": "Brasil",
        "abbrev": "BRA",
        "iso": "br"
    },
    "HTI": {
        "name": "Haití",
        "abbrev": "HTI",
        "iso": "ht"
    },
    "MAR": {
        "name": "Marruecos",
        "abbrev": "MAR",
        "iso": "ma"
    },
    "SCO": {
        "name": "Escocia",
        "abbrev": "SCO",
        "iso": "gb-sct"
    },
    "USA": {
        "name": "EE. UU.",
        "abbrev": "USA",
        "iso": "us"
    },
    "PAR": {
        "name": "Paraguay",
        "abbrev": "PAR",
        "iso": "py"
    },
    "AUS": {
        "name": "Australia",
        "abbrev": "AUS",
        "iso": "au"
    },
    "TUR": {
        "name": "Turquía",
        "abbrev": "TUR",
        "iso": "tr"
    },
    "GER": {
        "name": "Alemania",
        "abbrev": "GER",
        "iso": "de"
    },
    "CIV": {
        "name": "Costa de Marfil",
        "abbrev": "CIV",
        "iso": "ci"
    },
    "ECU": {
        "name": "Ecuador",
        "abbrev": "ECU",
        "iso": "ec"
    },
    "CUR": {
        "name": "Curazao",
        "abbrev": "CUR",
        "iso": "cw"
    },
    "NED": {
        "name": "Países Bajos",
        "abbrev": "NED",
        "iso": "nl"
    },
    "SWE": {
        "name": "Suecia",
        "abbrev": "SWE",
        "iso": "se"
    },
    "JAP": {
        "name": "Japón",
        "abbrev": "JAP",
        "iso": "jp"
    },
    "TUN": {
        "name": "Túnez",
        "abbrev": "TUN",
        "iso": "tn"
    },
    "BEL": {
        "name": "Bélgica",
        "abbrev": "BEL",
        "iso": "be"
    },
    "IRN": {
        "name": "Irán",
        "abbrev": "IRN",
        "iso": "ir"
    },
    "EGY": {
        "name": "Egipto",
        "abbrev": "EGY",
        "iso": "eg"
    },
    "NZL": {
        "name": "Nueva Zelanda",
        "abbrev": "NZL",
        "iso": "nz"
    },
    "ESP": {
        "name": "España",
        "abbrev": "ESP",
        "iso": "es"
    },
    "KSA": {
        "name": "Arabia Saudita",
        "abbrev": "KSA",
        "iso": "sa"
    },
    "URU": {
        "name": "Uruguay",
        "abbrev": "URU",
        "iso": "uy"
    },
    "CPV": {
        "name": "Cabo Verde",
        "abbrev": "CPV",
        "iso": "cv"
    },
    "FRA": {
        "name": "Francia",
        "abbrev": "FRA",
        "iso": "fr"
    },
    "IRQ": {
        "name": "Irak",
        "abbrev": "IRQ",
        "iso": "iq"
    },
    "NOR": {
        "name": "Noruega",
        "abbrev": "NOR",
        "iso": "no"
    },
    "SEN": {
        "name": "Senegal",
        "abbrev": "SEN",
        "iso": "sn"
    },
    "ARG": {
        "name": "Argentina",
        "abbrev": "ARG",
        "iso": "ar"
    },
    "AUT": {
        "name": "Austria",
        "abbrev": "AUT",
        "iso": "at"
    },
    "JOR": {
        "name": "Jordania",
        "abbrev": "JOR",
        "iso": "jo"
    },
    "ALG": {
        "name": "Argelia",
        "abbrev": "ALG",
        "iso": "dz"
    },
    "POR": {
        "name": "Portugal",
        "abbrev": "POR",
        "iso": "pt"
    },
    "RDC": {
        "name": "RD del Congo",
        "abbrev": "RDC",
        "iso": "cd"
    },
    "UZB": {
        "name": "Uzbekistán",
        "abbrev": "UZB",
        "iso": "uz"
    },
    "COL": {
        "name": "Colombia",
        "abbrev": "COL",
        "iso": "co"
    },
    "ENG": {
        "name": "Inglaterra",
        "abbrev": "ENG",
        "iso": "gb-eng"
    },
    "GHA": {
        "name": "Ghana",
        "abbrev": "GHA",
        "iso": "gh"
    },
    "PAN": {
        "name": "Panamá",
        "abbrev": "PAN",
        "iso": "pa"
    },
    "CRO": {
        "name": "Croacia",
        "abbrev": "CRO",
        "iso": "hr"
    }
};

// 2. Definición de Grupos
const GROUPS = {
    "A": {
        "name": "Grupo A",
        "teams": [
            "MEX",
            "RSA",
            "KOR",
            "CZE"
        ],
        "sub": "MEX - RSA - KOR - CZE"
    },
    "B": {
        "name": "Grupo B",
        "teams": [
            "CAN",
            "QAT",
            "SUI",
            "BIH"
        ],
        "sub": "CAN - QAT - SUI - BIH"
    },
    "C": {
        "name": "Grupo C",
        "teams": [
            "BRA",
            "HTI",
            "MAR",
            "SCO"
        ],
        "sub": "BRA - HTI - MAR - SCO"
    },
    "D": {
        "name": "Grupo D",
        "teams": [
            "USA",
            "PAR",
            "AUS",
            "TUR"
        ],
        "sub": "USA - PAR - AUS - TUR"
    },
    "E": {
        "name": "Grupo E",
        "teams": [
            "GER",
            "CIV",
            "ECU",
            "CUR"
        ],
        "sub": "GER - CIV - ECU - CUR"
    },
    "F": {
        "name": "Grupo F",
        "teams": [
            "NED",
            "SWE",
            "JAP",
            "TUN"
        ],
        "sub": "NED - SWE - JAP - TUN"
    },
    "G": {
        "name": "Grupo G",
        "teams": [
            "BEL",
            "IRN",
            "EGY",
            "NZL"
        ],
        "sub": "BEL - IRN - EGY - NZL"
    },
    "H": {
        "name": "Grupo H",
        "teams": [
            "ESP",
            "KSA",
            "URU",
            "CPV"
        ],
        "sub": "ESP - KSA - URU - CPV"
    },
    "I": {
        "name": "Grupo I",
        "teams": [
            "FRA",
            "IRQ",
            "NOR",
            "SEN"
        ],
        "sub": "FRA - IRQ - NOR - SEN"
    },
    "J": {
        "name": "Grupo J",
        "teams": [
            "ARG",
            "AUT",
            "JOR",
            "ALG"
        ],
        "sub": "ARG - AUT - JOR - ALG"
    },
    "K": {
        "name": "Grupo K",
        "teams": [
            "POR",
            "RDC",
            "UZB",
            "COL"
        ],
        "sub": "POR - RDC - UZB - COL"
    },
    "L": {
        "name": "Grupo L",
        "teams": [
            "ENG",
            "GHA",
            "PAN",
            "CRO"
        ],
        "sub": "ENG - GHA - PAN - CRO"
    }
};

// Estadios y Ciudades de la Copa 2026
const STADIUMS = [
    "Azteca, CDMX", "Guadalajara", "Monterrey", "Sofi, Los Ángeles", "MetLife, NY/NJ",
    "AT&T, Dallas", "Mercedes-Benz, Atlanta", "Lumen, Seattle", "Levi's, SF",
    "Gillette, Boston", "Hard Rock, Miami", "Lincoln, Filadelfia", "NRG, Houston",
    "Arrowhead, KC", "BMO, Toronto", "BC Place, Vancouver"
];

const GROUP_MATCHES = [
    {
        "id": 1,
        "group": "A",
        "home": "MEX",
        "away": "RSA",
        "date": "Jueves 11 Jun",
        "time": "2:00 PM",
        "stadium": "Ciudad de México"
    },
    {
        "id": 2,
        "group": "A",
        "home": "KOR",
        "away": "CZE",
        "date": "Jueves 11 Jun",
        "time": "9:00 PM",
        "stadium": "Guadalajara"
    },
    {
        "id": 3,
        "group": "B",
        "home": "CAN",
        "away": "BIH",
        "date": "Viernes 12 Jun",
        "time": "2:00 PM",
        "stadium": "Toronto"
    },
    {
        "id": 4,
        "group": "D",
        "home": "USA",
        "away": "PAR",
        "date": "Viernes 12 Jun",
        "time": "8:00 PM",
        "stadium": "Los Ángeles"
    },
    {
        "id": 5,
        "group": "B",
        "home": "QAT",
        "away": "SUI",
        "date": "Sábado 13 Jun",
        "time": "2:00 PM",
        "stadium": "San Francisco"
    },
    {
        "id": 6,
        "group": "C",
        "home": "BRA",
        "away": "MAR",
        "date": "Sábado 13 Jun",
        "time": "5:00 PM",
        "stadium": "Nueva Jersey"
    },
    {
        "id": 7,
        "group": "C",
        "home": "HTI",
        "away": "SCO",
        "date": "Sábado 13 Jun",
        "time": "8:00 PM",
        "stadium": "Boston"
    },
    {
        "id": 8,
        "group": "D",
        "home": "AUS",
        "away": "TUR",
        "date": "Sábado 13 Jun",
        "time": "11:00 PM",
        "stadium": "Vancouver"
    },
    {
        "id": 9,
        "group": "E",
        "home": "GER",
        "away": "CUR",
        "date": "Domingo 14 Jun",
        "time": "12:00 PM",
        "stadium": "Houston"
    },
    {
        "id": 10,
        "group": "F",
        "home": "NED",
        "away": "JAP",
        "date": "Domingo 14 Jun",
        "time": "3:00 PM",
        "stadium": "Dallas"
    },
    {
        "id": 11,
        "group": "E",
        "home": "CIV",
        "away": "ECU",
        "date": "Domingo 14 Jun",
        "time": "6:00 PM",
        "stadium": "Philadelphia"
    },
    {
        "id": 12,
        "group": "F",
        "home": "SWE",
        "away": "TUN",
        "date": "Domingo 14 Jun",
        "time": "9:00 PM",
        "stadium": "Monterrey"
    },
    {
        "id": 13,
        "group": "H",
        "home": "ESP",
        "away": "CPV",
        "date": "Lunes 15 Jun",
        "time": "11:00 AM",
        "stadium": "Atlanta"
    },
    {
        "id": 14,
        "group": "G",
        "home": "BEL",
        "away": "EGY",
        "date": "Lunes 15 Jun",
        "time": "2:00 PM",
        "stadium": "Seattle"
    },
    {
        "id": 15,
        "group": "H",
        "home": "KSA",
        "away": "URU",
        "date": "Lunes 15 Jun",
        "time": "5:00 PM",
        "stadium": "Miami"
    },
    {
        "id": 16,
        "group": "G",
        "home": "IRN",
        "away": "NZL",
        "date": "Lunes 15 Jun",
        "time": "8:00 PM",
        "stadium": "Los Ángeles"
    },
    {
        "id": 17,
        "group": "I",
        "home": "FRA",
        "away": "SEN",
        "date": "Martes 16 Jun",
        "time": "2:00 PM",
        "stadium": "Nueva Jersey"
    },
    {
        "id": 18,
        "group": "I",
        "home": "IRQ",
        "away": "NOR",
        "date": "Martes 16 Jun",
        "time": "5:00 PM",
        "stadium": "Boston"
    },
    {
        "id": 19,
        "group": "J",
        "home": "ARG",
        "away": "ALG",
        "date": "Martes 16 Jun",
        "time": "8:00 PM",
        "stadium": "Kansas City"
    },
    {
        "id": 20,
        "group": "J",
        "home": "AUT",
        "away": "JOR",
        "date": "Martes 16 Jun",
        "time": "11:00 PM",
        "stadium": "San Francisco"
    },
    {
        "id": 21,
        "group": "K",
        "home": "POR",
        "away": "RDC",
        "date": "Miércoles 17 Jun",
        "time": "12:00 PM",
        "stadium": "Houston"
    },
    {
        "id": 22,
        "group": "L",
        "home": "ENG",
        "away": "CRO",
        "date": "Miércoles 17 Jun",
        "time": "3:00 PM",
        "stadium": "Dallas"
    },
    {
        "id": 23,
        "group": "L",
        "home": "GHA",
        "away": "PAN",
        "date": "Miércoles 17 Jun",
        "time": "6:00 PM",
        "stadium": "Toronto"
    },
    {
        "id": 24,
        "group": "K",
        "home": "UZB",
        "away": "COL",
        "date": "Miércoles 17 Jun",
        "time": "9:00 PM",
        "stadium": "Ciudad de México"
    },
    {
        "id": 25,
        "group": "A",
        "home": "CZE",
        "away": "RSA",
        "date": "Jueves 18 Jun",
        "time": "11:00 AM",
        "stadium": "Atlanta"
    },
    {
        "id": 26,
        "group": "B",
        "home": "SUI",
        "away": "BIH",
        "date": "Jueves 18 Jun",
        "time": "2:00 PM",
        "stadium": "Los Ángeles"
    },
    {
        "id": 27,
        "group": "B",
        "home": "CAN",
        "away": "QAT",
        "date": "Jueves 18 Jun",
        "time": "5:00 PM",
        "stadium": "Vancouver"
    },
    {
        "id": 28,
        "group": "A",
        "home": "MEX",
        "away": "KOR",
        "date": "Jueves 18 Jun",
        "time": "8:00 PM",
        "stadium": "Guadalajara"
    },
    {
        "id": 29,
        "group": "D",
        "home": "USA",
        "away": "AUS",
        "date": "Viernes 19 Jun",
        "time": "2:00 PM",
        "stadium": "Seattle"
    },
    {
        "id": 30,
        "group": "C",
        "home": "SCO",
        "away": "MAR",
        "date": "Viernes 19 Jun",
        "time": "5:00 PM",
        "stadium": "Boston"
    },
    {
        "id": 31,
        "group": "C",
        "home": "BRA",
        "away": "HTI",
        "date": "Viernes 19 Jun",
        "time": "7:30 PM",
        "stadium": "Philadelphia"
    },
    {
        "id": 32,
        "group": "D",
        "home": "TUR",
        "away": "PAR",
        "date": "Viernes 19 Jun",
        "time": "10:00 PM",
        "stadium": "San Francisco"
    },
    {
        "id": 33,
        "group": "F",
        "home": "NED",
        "away": "SWE",
        "date": "Sábado 20 Jun",
        "time": "12:00 PM",
        "stadium": "Houston"
    },
    {
        "id": 34,
        "group": "E",
        "home": "GER",
        "away": "CIV",
        "date": "Sábado 20 Jun",
        "time": "3:00 PM",
        "stadium": "Toronto"
    },
    {
        "id": 35,
        "group": "E",
        "home": "ECU",
        "away": "CUR",
        "date": "Sábado 20 Jun",
        "time": "7:00 PM",
        "stadium": "Kansas City"
    },
    {
        "id": 36,
        "group": "F",
        "home": "TUN",
        "away": "JAP",
        "date": "Sábado 20 Jun",
        "time": "10:00 PM",
        "stadium": "Monterrey"
    },
    {
        "id": 37,
        "group": "H",
        "home": "ESP",
        "away": "KSA",
        "date": "Domingo 21 Jun",
        "time": "11:00 AM",
        "stadium": "Atlanta"
    },
    {
        "id": 38,
        "group": "G",
        "home": "BEL",
        "away": "IRN",
        "date": "Domingo 21 Jun",
        "time": "2:00 PM",
        "stadium": "Los Ángeles"
    },
    {
        "id": 39,
        "group": "H",
        "home": "URU",
        "away": "CPV",
        "date": "Domingo 21 Jun",
        "time": "5:00 PM",
        "stadium": "Miami"
    },
    {
        "id": 40,
        "group": "G",
        "home": "NZL",
        "away": "EGY",
        "date": "Domingo 21 Jun",
        "time": "8:00 PM",
        "stadium": "Vancouver"
    },
    {
        "id": 41,
        "group": "J",
        "home": "ARG",
        "away": "AUT",
        "date": "Lunes 22 Jun",
        "time": "12:00 PM",
        "stadium": "Dallas"
    },
    {
        "id": 42,
        "group": "I",
        "home": "FRA",
        "away": "IRQ",
        "date": "Lunes 22 Jun",
        "time": "4:00 PM",
        "stadium": "Philadelphia"
    },
    {
        "id": 43,
        "group": "I",
        "home": "NOR",
        "away": "SEN",
        "date": "Lunes 22 Jun",
        "time": "7:00 PM",
        "stadium": "Nueva Jersey"
    },
    {
        "id": 44,
        "group": "J",
        "home": "JOR",
        "away": "ALG",
        "date": "Lunes 22 Jun",
        "time": "10:00 PM",
        "stadium": "San Francisco"
    },
    {
        "id": 45,
        "group": "K",
        "home": "POR",
        "away": "UZB",
        "date": "Martes 23 Jun",
        "time": "12:00 PM",
        "stadium": "Houston"
    },
    {
        "id": 46,
        "group": "L",
        "home": "ENG",
        "away": "GHA",
        "date": "Martes 23 Jun",
        "time": "3:00 PM",
        "stadium": "Boston"
    },
    {
        "id": 47,
        "group": "L",
        "home": "PAN",
        "away": "CRO",
        "date": "Martes 23 Jun",
        "time": "6:00 PM",
        "stadium": "Toronto"
    },
    {
        "id": 48,
        "group": "K",
        "home": "COL",
        "away": "RDC",
        "date": "Martes 23 Jun",
        "time": "9:00 PM",
        "stadium": "Guadalajara"
    },
    {
        "id": 49,
        "group": "B",
        "home": "SUI",
        "away": "CAN",
        "date": "Miércoles 24 Jun",
        "time": "2:00 PM",
        "stadium": "Vancouver"
    },
    {
        "id": 50,
        "group": "B",
        "home": "BIH",
        "away": "QAT",
        "date": "Miércoles 24 Jun",
        "time": "2:00 PM",
        "stadium": "Seattle"
    },
    {
        "id": 51,
        "group": "C",
        "home": "MAR",
        "away": "HTI",
        "date": "Miércoles 24 Jun",
        "time": "5:00 PM",
        "stadium": "Atlanta"
    },
    {
        "id": 52,
        "group": "C",
        "home": "BRA",
        "away": "SCO",
        "date": "Miércoles 24 Jun",
        "time": "5:00 PM",
        "stadium": "Miami"
    },
    {
        "id": 53,
        "group": "A",
        "home": "RSA",
        "away": "KOR",
        "date": "Miércoles 24 Jun",
        "time": "8:00 PM",
        "stadium": "Monterrey"
    },
    {
        "id": 54,
        "group": "A",
        "home": "CZE",
        "away": "MEX",
        "date": "Miércoles 24 Jun",
        "time": "8:00 PM",
        "stadium": "Ciudad de México"
    },
    {
        "id": 55,
        "group": "E",
        "home": "CUR",
        "away": "CIV",
        "date": "Jueves 25 Jun",
        "time": "3:00 PM",
        "stadium": "Philadelphia"
    },
    {
        "id": 56,
        "group": "E",
        "home": "ECU",
        "away": "GER",
        "date": "Jueves 25 Jun",
        "time": "3:00 PM",
        "stadium": "Nueva Jersey"
    },
    {
        "id": 57,
        "group": "F",
        "home": "JAP",
        "away": "SWE",
        "date": "Jueves 25 Jun",
        "time": "6:00 PM",
        "stadium": "Dallas"
    },
    {
        "id": 58,
        "group": "F",
        "home": "TUN",
        "away": "NED",
        "date": "Jueves 25 Jun",
        "time": "6:00 PM",
        "stadium": "Kansas City"
    },
    {
        "id": 59,
        "group": "D",
        "home": "PAR",
        "away": "AUS",
        "date": "Jueves 25 Jun",
        "time": "9:00 PM",
        "stadium": "San Francisco"
    },
    {
        "id": 60,
        "group": "D",
        "home": "TUR",
        "away": "USA",
        "date": "Jueves 25 Jun",
        "time": "9:00 PM",
        "stadium": "Los Ángeles"
    },
    {
        "id": 61,
        "group": "I",
        "home": "NOR",
        "away": "FRA",
        "date": "Viernes 26 Jun",
        "time": "2:00 PM",
        "stadium": "Boston"
    },
    {
        "id": 62,
        "group": "I",
        "home": "SEN",
        "away": "IRQ",
        "date": "Viernes 26 Jun",
        "time": "2:00 PM",
        "stadium": "Toronto"
    },
    {
        "id": 63,
        "group": "H",
        "home": "CPV",
        "away": "KSA",
        "date": "Viernes 26 Jun",
        "time": "7:00 PM",
        "stadium": "Houston"
    },
    {
        "id": 64,
        "group": "H",
        "home": "URU",
        "away": "ESP",
        "date": "Viernes 26 Jun",
        "time": "7:00 PM",
        "stadium": "Guadalajara"
    },
    {
        "id": 65,
        "group": "G",
        "home": "EGY",
        "away": "IRN",
        "date": "Viernes 26 Jun",
        "time": "10:00 PM",
        "stadium": "Seattle"
    },
    {
        "id": 66,
        "group": "G",
        "home": "NZL",
        "away": "BEL",
        "date": "Viernes 26 Jun",
        "time": "10:00 PM",
        "stadium": "Vancouver"
    },
    {
        "id": 67,
        "group": "L",
        "home": "CRO",
        "away": "GHA",
        "date": "Sábado 27 Jun",
        "time": "4:00 PM",
        "stadium": "Philadelphia"
    },
    {
        "id": 68,
        "group": "L",
        "home": "PAN",
        "away": "ENG",
        "date": "Sábado 27 Jun",
        "time": "4:00 PM",
        "stadium": "Nueva Jersey"
    },
    {
        "id": 69,
        "group": "K",
        "home": "COL",
        "away": "POR",
        "date": "Sábado 27 Jun",
        "time": "6:30 PM",
        "stadium": "Miami"
    },
    {
        "id": 70,
        "group": "K",
        "home": "RDC",
        "away": "UZB",
        "date": "Sábado 27 Jun",
        "time": "6:30 PM",
        "stadium": "Atlanta"
    },
    {
        "id": 71,
        "group": "J",
        "home": "ALG",
        "away": "AUT",
        "date": "Sábado 27 Jun",
        "time": "9:00 PM",
        "stadium": "Kansas City"
    },
    {
        "id": 72,
        "group": "J",
        "home": "JOR",
        "away": "ARG",
        "date": "Sábado 27 Jun",
        "time": "9:00 PM",
        "stadium": "Dallas"
    }
];

// 3. Estructura de Llaves Eliminatorias (Dieciseisavos a Final)
// Match ID oficiales de la FIFA 2026 (Partidos 73 al 104)
const KNOCKOUT_MATCHES = {
    // Dieciseisavos de Final (Round of 32)
    73: { round: "r32", homePlaceholder: "2A", awayPlaceholder: "2B", date: "Domingo 28 Jun", time: "2:00 PM", stadium: "Los Ángeles" },
    74: { round: "r32", homePlaceholder: "1E", awayPlaceholder: "3A/B/C/D/F", date: "Lunes 29 Jun", time: "3:30 PM", stadium: "Boston" },
    75: { round: "r32", homePlaceholder: "1F", awayPlaceholder: "2C", date: "Lunes 29 Jun", time: "8:00 PM", stadium: "Monterrey" },
    76: { round: "r32", homePlaceholder: "1E", awayPlaceholder: "2F", date: "Lunes 29 Jun", time: "12:00 PM", stadium: "Houston" },
    77: { round: "r32", homePlaceholder: "1I", awayPlaceholder: "3C/D/F/G/H", date: "Martes 30 Jun", time: "4:00 PM", stadium: "Nueva Jersey" },
    78: { round: "r32", homePlaceholder: "2E", awayPlaceholder: "2I", date: "Martes 30 Jun", time: "12:00 PM", stadium: "Dallas" },
    79: { round: "r32", homePlaceholder: "1A", awayPlaceholder: "3C/E/F/H/I", date: "Martes 30 Jun", time: "8:00 PM", stadium: "Ciudad de México" },
    80: { round: "r32", homePlaceholder: "1L", awayPlaceholder: "3E/H/I/J/K", date: "Miércoles 1 Jul", time: "11:00 AM", stadium: "Atlanta" },
    81: { round: "r32", homePlaceholder: "1D", awayPlaceholder: "3B/E/F/I/J", date: "Miércoles 1 Jul", time: "7:00 PM", stadium: "San Francisco" },
    82: { round: "r32", homePlaceholder: "1G", awayPlaceholder: "3A/E/H/I/J", date: "Miércoles 1 Jul", time: "3:00 PM", stadium: "Seattle" },
    83: { round: "r32", homePlaceholder: "2K", awayPlaceholder: "2L", date: "Jueves 2 Jul", time: "6:00 PM", stadium: "Toronto" },
    84: { round: "r32", homePlaceholder: "1H", awayPlaceholder: "2J", date: "Jueves 2 Jul", time: "2:00 PM", stadium: "Los Ángeles" },
    85: { round: "r32", homePlaceholder: "1B", awayPlaceholder: "3E/F/G/I/J", date: "Jueves 2 Jul", time: "9:00 PM", stadium: "Vancouver" },
    86: { round: "r32", homePlaceholder: "1J", awayPlaceholder: "2H", date: "Viernes 3 Jul", time: "4:00 PM", stadium: "Miami" },
    87: { round: "r32", homePlaceholder: "1K", awayPlaceholder: "3D/E/I/J/L", date: "Viernes 3 Jul", time: "7:30 PM", stadium: "Kansas City" },
    88: { round: "r32", homePlaceholder: "2D", awayPlaceholder: "2G", date: "Viernes 3 Jul", time: "12:00 PM", stadium: "Dallas" },

    // Octavos de Final (Round of 16)
    89: { round: "r16", homePlaceholder: "G74", awayPlaceholder: "G77", date: "Sábado 4 Jul", time: "6:00 PM", stadium: "Philadelphia", sourceHome: 74, sourceAway: 77 },
    90: { round: "r16", homePlaceholder: "G73", awayPlaceholder: "G75", date: "Sábado 4 Jul", time: "2:00 PM", stadium: "Houston", sourceHome: 73, sourceAway: 75 },
    91: { round: "r16", homePlaceholder: "G76", awayPlaceholder: "G78", date: "Domingo 5 Jul", time: "5:00 PM", stadium: "Nueva Jersey", sourceHome: 76, sourceAway: 78 },
    92: { round: "r16", homePlaceholder: "G79", awayPlaceholder: "G80", date: "Domingo 5 Jul", time: "9:00 PM", stadium: "Ciudad de México", sourceHome: 79, sourceAway: 80 },
    93: { round: "r16", homePlaceholder: "G83", awayPlaceholder: "G84", date: "Lunes 6 Jul", time: "3:00 PM", stadium: "Dallas", sourceHome: 83, sourceAway: 84 },
    94: { round: "r16", homePlaceholder: "G81", awayPlaceholder: "G82", date: "Lunes 6 Jul", time: "9:00 PM", stadium: "Seattle", sourceHome: 81, sourceAway: 82 },
    95: { round: "r16", homePlaceholder: "G86", awayPlaceholder: "G88", date: "Martes 7 Jul", time: "1:00 PM", stadium: "Atlanta", sourceHome: 86, sourceAway: 88 },
    96: { round: "r16", homePlaceholder: "G85", awayPlaceholder: "G87", date: "Martes 7 Jul", time: "5:00 PM", stadium: "Vancouver", sourceHome: 85, sourceAway: 87 },

    // Cuartos de Final (Quarterfinals)
    97: { round: "qf", homePlaceholder: "G89", awayPlaceholder: "G90", date: "Jueves 9 Jul", time: "5:00 PM", stadium: "Boston", sourceHome: 89, sourceAway: 90 },
    98: { round: "qf", homePlaceholder: "G93", awayPlaceholder: "G94", date: "Viernes 10 Jul", time: "4:00 PM", stadium: "Los Ángeles", sourceHome: 93, sourceAway: 94 },
    99: { round: "qf", homePlaceholder: "G91", awayPlaceholder: "G92", date: "Sábado 11 Jul", time: "6:00 PM", stadium: "Miami", sourceHome: 91, sourceAway: 92 },
    100: { round: "qf", homePlaceholder: "G95", awayPlaceholder: "G96", date: "Sábado 11 Jul", time: "10:00 PM", stadium: "Kansas City", sourceHome: 95, sourceAway: 96 },

    // Semifinales (Semifinals)
    101: { round: "sf", homePlaceholder: "G97", awayPlaceholder: "G98", date: "Martes 14 Jul", time: "4:00 PM", stadium: "Dallas", sourceHome: 97, sourceAway: 98 },
    102: { round: "sf", homePlaceholder: "G99", awayPlaceholder: "G100", date: "Miércoles 15 Jul", time: "4:00 PM", stadium: "Atlanta", sourceHome: 99, sourceAway: 100 },

    // Tercer Puesto y Final
    103: { round: "third", homePlaceholder: "P101", awayPlaceholder: "P102", date: "Sábado 18 Jul", time: "6:00 PM", stadium: "Miami", sourceHome: 101, sourceAway: 102, isLoserSource: true },
    104: { round: "final", homePlaceholder: "G101", awayPlaceholder: "G102", date: "Domingo 19 Jul", time: "4:00 PM", stadium: "Nueva Jersey", sourceHome: 101, sourceAway: 102 }
};

// 4. Estado de las Predicciones (State)
let state = {
    groupScores: {},     // { matchId: { home: int, away: int } }
    knockoutScores: {},  // { matchId: { home: int, away: int, penaltyWinner: string } }
    special: {
        champion: "",
        mvp: "",
        scorer: "",
        gk: ""
    }
};

// 5. Inicialización de la Aplicación
document.addEventListener("DOMContentLoaded", () => {
    computeAllKickoffs();
    loadState();
    initSPARouting();
    initCountdown();
    initAuthSystem();
    initTabs();
    renderGroupStage();
    initSpecialPredictions();
    calculateAndRenderAll();
    setupGlobalControls();
    initMobileBracketNav();
    initAdminPanel();
    initMatchCountdowns();
});

// Guardar y Cargar Estado de LocalStorage o Firebase
function saveState() {
    if (isFirebaseActive && currentUser) {
        // Guardar en Firestore
        db.collection("predictions").doc(currentUser.uid).set({
            uid: currentUser.uid,
            name: currentUser.name,
            email: currentUser.email,
            favorite: currentUser.favorite,
            groupScores: state.groupScores,
            knockoutScores: state.knockoutScores,
            special: state.special,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            showToast("☁️ Pronósticos guardados en la nube correctamente ✔");
            updateProgressBar();
            renderRankingTable();
        })
        .catch(err => {
            console.error("Error al guardar en Firestore:", err);
            showToast("❌ Error de red, guardado local temporal");
            saveStateLocally();
        });
    } else {
        saveStateLocally();
    }
}

function saveStateLocally() {
    if (currentUser) {
        localStorage.setItem(`polla_state_${currentUser.email}`, JSON.stringify(state));
    }
    localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
    showToast("💾 Pronósticos guardados en el navegador ✔");
    updateProgressBar();
    renderRankingTable();
}

function loadState() {
    const saved = localStorage.getItem("polla_mundial_2026_state");
    if (saved) {
        try {
            state = JSON.parse(saved);
            if (!state.groupScores) state.groupScores = {};
            if (!state.knockoutScores) state.knockoutScores = {};
            if (!state.special) {
                state.special = { champion: "", mvp: "", scorer: "", gk: "" };
            }
        } catch (e) {
            console.error("Error al cargar predicciones", e);
        }
    }
}

// Actualizar barra de progreso de partidos llenados
function updateProgressBar() {
    let completed = 0;
    
    // Contar grupos
    GROUP_MATCHES.forEach(m => {
        const pred = state.groupScores[m.id];
        if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) {
            completed++;
        }
    });

    // Contar eliminatorias
    Object.keys(KNOCKOUT_MATCHES).forEach(matchId => {
        const pred = state.knockoutScores[matchId];
        if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) {
            // Si hay empate, debe haber un ganador de penales declarado
            if (parseInt(pred.home) === parseInt(pred.away)) {
                if (pred.penaltyWinner) {
                    completed++;
                }
            } else {
                completed++;
            }
        }
    });

    // Contar especiales (cada una sumará al progreso o cuenta simple)
    let specialCompleted = 0;
    if (state.special.champion) specialCompleted++;
    if (state.special.mvp) specialCompleted++;
    if (state.special.scorer) specialCompleted++;
    if (state.special.gk) specialCompleted++;

    document.getElementById("completed-count").innerText = completed;
    const progressFill = document.getElementById("progress-bar-fill");
    const percent = Math.min(100, Math.round((completed / 104) * 100));
    progressFill.style.width = `${percent}%`;
}


// 6. Manejo de Pestañas (Tabs)
function initTabs() {
    const tabs = document.querySelectorAll(".nav-tab");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const panes = document.querySelectorAll(".tab-pane");
            panes.forEach(pane => pane.classList.remove("active"));

            const target = tab.getAttribute("data-target");
            document.getElementById(target).classList.add("active");
            
            // Si es bracket, hacer scroll suave al inicio
            if (target === "tab-knockout") {
                const scroller = document.getElementById("bracket-scroller");
                if (scroller) scroller.scrollLeft = 0;
            }
        });
    });
}

// Mostrar Toast
let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.classList.add("show");
    
    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }
    
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
        toastTimeout = null;
    }, 2500);
}

// 7. Renderizar la Fase de Grupos
// ==========================================================================
// Kickoff Parsing & Match Countdown System
// ==========================================================================

const STADIUM_TZ = {
    'Los Ángeles': -7, 'San Francisco': -7, 'Seattle': -7, 'Vancouver': -7,
    'Dallas': -5, 'Houston': -5, 'Kansas City': -5, 'Ciudad de México': -5,
    'Monterrey': -5, 'Guadalajara': -5,
    'Atlanta': -4, 'Miami': -4, 'Philadelphia': -4, 'Boston': -4,
    'Nueva Jersey': -4, 'Toronto': -4
};

const SPANISH_MONTHS_IDX = { 'Ene': 0, 'Feb': 1, 'Mar': 2, 'Abr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Ago': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dic': 11 };
const SPANISH_MONTHS_LONG = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function parseKickoff(match) {
    if (!match || !match.date || !match.time) return null;
    let day, month;
    const parts = match.date.trim().split(/\s+/);
    for (const p of parts) {
        if (/^\d+$/.test(p)) day = parseInt(p);
        if (SPANISH_MONTHS_IDX[p] !== undefined) month = SPANISH_MONTHS_IDX[p];
    }
    if (day === undefined || month === undefined) return null;
    const tm = match.time.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!tm) return null;
    let h = parseInt(tm[1]); const min = parseInt(tm[2]); const ap = tm[3].toUpperCase();
    if (ap === 'PM' && h !== 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    const tz = STADIUM_TZ[match.stadium] || -5;
    return new Date(Date.UTC(2026, month, day, h - tz, min, 0));
}

function computeAllKickoffs() {
    GROUP_MATCHES.forEach(m => { m.kickoff = parseKickoff(m); });
    Object.keys(KNOCKOUT_MATCHES).forEach(id => {
        KNOCKOUT_MATCHES[id].kickoff = parseKickoff(KNOCKOUT_MATCHES[id]);
    });
}

function getMatchStatusFromDiff(diff) {
    if (diff > 3600000) return 'upcoming';      // > 1 hour: normal upcoming
    if (diff > 0) return 'closing-soon';        // 0 < diff <= 1h: urgent
    if (diff > -6600000) return 'live';         // 0 to -110min: live
    return 'finished';                          // past 110min: done
}

function getMatchStatusFromKickoff(kickoff) {
    if (!kickoff) return 'no-date';
    return getMatchStatusFromDiff(kickoff.getTime() - Date.now());
}

function formatCountdownDiff(diff) {
    if (diff <= 0) return '00:00:00';
    const totalSecs = Math.floor(diff / 1000);
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    const pad = n => String(n).padStart(2, '0');
    if (h >= 24) {
        const days = Math.floor(h / 24); const rh = h % 24;
        return `${days}d ${pad(rh)}h ${pad(m)}m`;
    }
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function isMatchLocked(kickoff) {
    const s = getMatchStatusFromKickoff(kickoff);
    return s === 'live' || s === 'finished';
}

function buildCountdownBadge(kickoff, matchId) {
    if (!kickoff) return '';
    const diff = kickoff.getTime() - Date.now();
    const status = getMatchStatusFromDiff(diff);
    if (status === 'finished') {
        return `<span class="cd-badge cd-badge--closed" data-countdown-id="${matchId}">🔒 Cerrado</span>`;
    }
    if (status === 'live') {
        return `<span class="cd-badge cd-badge--live" data-countdown-id="${matchId}"><span class="live-pulse"></span>En Vivo</span>`;
    }
    if (status === 'closing-soon') {
        return `<span class="cd-badge cd-badge--urgent" data-countdown-id="${matchId}">⏱ Cierra en ${formatCountdownDiff(diff)}</span>`;
    }
    return `<span class="cd-badge cd-badge--upcoming" data-countdown-id="${matchId}">⏱ ${formatCountdownDiff(diff)}</span>`;
}

function formatNiceDate(dateStr) {
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 3) {
        const month = SPANISH_MONTHS_LONG[SPANISH_MONTHS_IDX[parts[2]]] || parts[2];
        return `${parts[0]}, ${parts[1]} de ${month} 2026`;
    }
    return dateStr;
}

// Global match view mode: 'date' or 'group'
let groupViewMode = 'date';
let groupInputListenerActive = false;

function renderGroupStage() {
    const container = document.getElementById("groups-container");
    container.innerHTML = "";

    // --- View Toggle Bar ---
    const toggleBar = document.createElement('div');
    toggleBar.className = 'match-view-toggle';
    toggleBar.innerHTML = `
        <button class="view-toggle-btn ${groupViewMode === 'date' ? 'active' : ''}" data-mode="date">
            <span>📅</span> Por Fecha
        </button>
        <button class="view-toggle-btn ${groupViewMode === 'group' ? 'active' : ''}" data-mode="group">
            <span>🏟️</span> Por Grupo
        </button>
    `;
    container.appendChild(toggleBar);
    toggleBar.addEventListener('click', e => {
        const btn = e.target.closest('[data-mode]');
        if (!btn) return;
        const mode = btn.getAttribute('data-mode');
        if (mode === groupViewMode) return;
        groupViewMode = mode;
        toggleBar.querySelectorAll('.view-toggle-btn').forEach(b => {
            b.classList.toggle('active', b.getAttribute('data-mode') === mode);
        });
        const mc = document.getElementById('matches-view-container');
        if (mc) mc.remove();
        renderMatchesContent(container);
    });

    renderMatchesContent(container);

    // Event delegation for group score inputs (attach only once)
    if (!groupInputListenerActive) {
        groupInputListenerActive = true;
        document.getElementById('groups-container').addEventListener("input", (e) => {
            if (e.target.classList.contains("score-input") && !e.target.disabled) {
                const matchId = parseInt(e.target.getAttribute("data-match-id"));
                const teamType = e.target.getAttribute("data-team");
                const val = e.target.value;
                if (!state.groupScores[matchId]) state.groupScores[matchId] = { home: "", away: "" };
                state.groupScores[matchId][teamType] = val !== "" ? parseInt(val) : "";
                calculateAndRenderAll();
                localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
                updateProgressBar();
            }
        });
    }
}

function renderMatchesContent(container) {
    let mc = document.getElementById('matches-view-container');
    if (mc) mc.remove();
    mc = document.createElement('div');
    mc.id = 'matches-view-container';
    
    if (groupViewMode === 'group') {
        mc.classList.add('grid-mode');
    }

    container.appendChild(mc);
    if (groupViewMode === 'date') {
        renderMatchesByDate(mc);
    } else {
        renderMatchesByGroup(mc);
    }
}

function renderMatchesByDate(container) {
    const sorted = [...GROUP_MATCHES].sort((a, b) => {
        const aT = a.kickoff ? a.kickoff.getTime() : Infinity;
        const bT = b.kickoff ? b.kickoff.getTime() : Infinity;
        return aT - bT;
    });

    const now = Date.now();
    const nextMatch = sorted.find(m => m.kickoff && m.kickoff.getTime() > now);
    let currentDate = null;

    sorted.forEach(m => {
        if (m.date !== currentDate) {
            currentDate = m.date;
            const header = document.createElement('div');
            header.className = 'date-section-header';
            const matchCount = sorted.filter(x => x.date === m.date).length;
            header.innerHTML = `
                <span class="date-header-label">${formatNiceDate(m.date)}</span>
                <span class="date-header-count">${matchCount} partido${matchCount !== 1 ? 's' : ''}</span>
            `;
            container.appendChild(header);
        }
        const isNext = !!(nextMatch && m.id === nextMatch.id);
        container.appendChild(buildGroupMatchCard(m, isNext));
    });

    if (sorted.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:2rem;">No hay partidos disponibles.</p>';
    }
}

function renderMatchesByGroup(container) {
    Object.keys(GROUPS).forEach(groupKey => {
        const group = GROUPS[groupKey];

        const groupSection = document.createElement('div');
        groupSection.className = 'group-card glass-panel';
        groupSection.id = `group-card-${groupKey}`;

        // Group title
        groupSection.innerHTML = `
            <div class="group-title">
                <span>${group.name}</span>
                <span class="group-subtitle">${group.sub}</span>
            </div>
        `;

        // Standings table
        const table = document.createElement('table');
        table.className = 'group-table';
        table.innerHTML = `
            <thead><tr>
                <th class="col-team">Equipo</th>
                <th title="Puntos">PTS</th>
                <th title="Partidos Jugados">PJ</th>
                <th title="Ganados">PG</th>
                <th title="Empatados">PE</th>
                <th title="Perdidos">PP</th>
                <th title="Diferencia de Goles">DG</th>
            </tr></thead>
            <tbody id="group-table-body-${groupKey}"></tbody>
        `;
        groupSection.appendChild(table);

        // Matches
        const matchesDiv = document.createElement('div');
        matchesDiv.className = 'group-matches';
        GROUP_MATCHES.filter(m => m.group === groupKey).forEach(m => {
            matchesDiv.appendChild(buildGroupMatchCard(m, false));
        });
        groupSection.appendChild(matchesDiv);
        container.appendChild(groupSection);
    });
}

function buildGroupMatchCard(m, isNext) {
    const teamHome = TEAMS[m.home];
    const teamAway = TEAMS[m.away];
    const pred = state.groupScores[m.id] || { home: "", away: "" };
    const locked = isMatchLocked(m.kickoff);
    const status = getMatchStatusFromKickoff(m.kickoff);

    const matchItem = document.createElement('div');
    matchItem.className = 'match-item' +
        (locked ? ' match-item--locked' : '') +
        (isNext ? ' match-item--next' : '');
    matchItem.setAttribute('data-match-id', m.id);
    if (m.kickoff) matchItem.setAttribute('data-kickoff', m.kickoff.getTime());
    matchItem.setAttribute('data-match-type', 'group');

    const countdownBadge = buildCountdownBadge(m.kickoff, m.id);
    const groupBadge = `<span class="match-group-badge">Grupo ${m.group} · #${m.id}</span>`;

    matchItem.innerHTML = `
        <div class="match-header-row">
            ${groupBadge}
            ${countdownBadge}
        </div>
        <div class="match-teams-row">
            <div class="match-team team-home">
                <img class="flag-icon" src="https://flagcdn.com/w40/${teamHome.iso}.png" alt="${teamHome.name}">
                <span class="team-name-label">${teamHome.name}</span>
            </div>
            <div class="match-score-inputs">
                <input type="number" min="0" max="30" class="score-input" data-match-id="${m.id}" data-team="home" value="${pred.home}"${locked ? ' disabled' : ''}>
                <span class="score-divider">VS</span>
                <input type="number" min="0" max="30" class="score-input" data-match-id="${m.id}" data-team="away" value="${pred.away}"${locked ? ' disabled' : ''}>
            </div>
            <div class="match-team team-away">
                <span class="team-name-label">${teamAway.name}</span>
                <img class="flag-icon" src="https://flagcdn.com/w40/${teamAway.iso}.png" alt="${teamAway.name}">
            </div>
        </div>
        <div class="match-footer-row">
            <span class="match-time-info">📅 ${m.date} · ${m.time}</span>
            <span class="match-stadium">🏟️ ${m.stadium}</span>
        </div>
    `;
    return matchItem;
}

// ==========================================================================
// Live Countdown Interval
// ==========================================================================

let countdownInterval = null;

function initMatchCountdowns() {
    if (countdownInterval) clearInterval(countdownInterval);
    updateAllCountdowns(); // immediate first run
    countdownInterval = setInterval(updateAllCountdowns, 1000);
}

function updateAllCountdowns() {
    const now = Date.now();
    document.querySelectorAll('[data-countdown-id]').forEach(badge => {
        const matchId = badge.getAttribute('data-countdown-id');
        // Find the match item (could be group or knockout)
        const matchItem = document.querySelector(
            `.match-item[data-match-id="${matchId}"], .knockout-match-card[id="ko-match-${matchId}"]`
        );
        if (!matchItem) return;
        const kickoffMs = parseInt(matchItem.getAttribute('data-kickoff'));
        if (!kickoffMs) return;

        const diff = kickoffMs - now;
        const status = getMatchStatusFromDiff(diff);

        // Update badge
        badge.className = 'cd-badge';
        if (status === 'finished') {
            badge.className += ' cd-badge--closed';
            badge.innerHTML = '🔒 Cerrado';
        } else if (status === 'live') {
            badge.className += ' cd-badge--live';
            badge.innerHTML = '<span class="live-pulse"></span>En Vivo';
        } else if (status === 'closing-soon') {
            badge.className += ' cd-badge--urgent';
            badge.textContent = '⏱ Cierra en ' + formatCountdownDiff(diff);
        } else {
            badge.className += ' cd-badge--upcoming';
            badge.textContent = '⏱ ' + formatCountdownDiff(diff);
        }

        // Lock inputs when match starts
        if (status === 'live' || status === 'finished') {
            const inputs = matchItem.querySelectorAll('.score-input:not([disabled])');
            if (inputs.length > 0) {
                inputs.forEach(inp => { inp.disabled = true; });
                matchItem.classList.add('match-item--locked');
                if (!matchItem.hasAttribute('data-lock-notified')) {
                    matchItem.setAttribute('data-lock-notified', 'true');
                    const h = matchItem.querySelector('.team-home .team-name-label, .team-home span:not(.cd-badge)');
                    const a = matchItem.querySelector('.team-away .team-name-label, .team-away span:not(.cd-badge)');
                    const hn = h ? h.textContent.trim() : '';
                    const an = a ? a.textContent.trim() : '';
                    if (hn && an) showToast(`⏱ Pronósticos cerrados: ${hn} vs ${an}`);
                }
            }
            // Also lock penalty buttons in knockout
            matchItem.querySelectorAll('.btn-penalty-winner').forEach(btn => { btn.disabled = true; });
        }
    });
}



// 8. Recalcular todo el Torneo y Actualizar Interfaz
let globalStandings = {}; // { groupLetter: [ sortedTeams ] }
let bestThirdsList = [];  // Array de los 8 mejores terceros clasificados

function calculateAndRenderAll() {
    calculateGroupStandings();
    calculateBestThirds();
    updateKnockoutBracket();
    updateProgressBar();
}

// Cálculo de Tablas de Posiciones de Grupos
function calculateGroupStandings() {
    Object.keys(GROUPS).forEach(groupKey => {
        const group = GROUPS[groupKey];
        
        // Inicializar estadísticas de los equipos
        const standings = group.teams.map(teamId => {
            const team = TEAMS[teamId];
            return {
                id: teamId,
                name: team.name,
                abbrev: team.abbrev,
                iso: team.iso,
                pts: 0, pj: 0, pg: 0, pe: 0, pp: 0, gf: 0, gc: 0, dg: 0
            };
        });

        // Aplicar resultados
        const groupMatches = GROUP_MATCHES.filter(m => m.group === groupKey);
        groupMatches.forEach(m => {
            const pred = state.groupScores[m.id];
            if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) {
                const homeTeam = standings.find(t => t.id === m.home);
                const awayTeam = standings.find(t => t.id === m.away);

                const gh = parseInt(pred.home);
                const ga = parseInt(pred.away);

                homeTeam.pj++;
                awayTeam.pj++;

                homeTeam.gf += gh;
                homeTeam.gc += ga;
                awayTeam.gf += ga;
                awayTeam.gc += gh;

                homeTeam.dg = homeTeam.gf - homeTeam.gc;
                awayTeam.dg = awayTeam.gf - awayTeam.gc;

                if (gh > ga) {
                    homeTeam.pts += 3;
                    homeTeam.pg++;
                    awayTeam.pp++;
                } else if (ga > gh) {
                    awayTeam.pts += 3;
                    awayTeam.pg++;
                    homeTeam.pp++;
                } else {
                    homeTeam.pts += 1;
                    awayTeam.pts += 1;
                    homeTeam.pe++;
                    awayTeam.pe++;
                }
            }
        });

        // Ordenar según criterios FIFA:
        // 1) PTS desc
        // 2) DG desc
        // 3) GF desc
        // 4) Alfabético (como fallback simple de sorteo)
        standings.sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.dg !== a.dg) return b.dg - a.dg;
            if (b.gf !== a.gf) return b.gf - a.gf;
            return a.name.localeCompare(b.name);
        });

        globalStandings[groupKey] = standings;

        // Renderizar la tabla de este grupo
        const tbody = document.getElementById(`group-table-body-${groupKey}`);
        if (tbody) {
            tbody.innerHTML = "";
            standings.forEach((t, index) => {
                const tr = document.createElement("tr");
                tr.className = "team-row";
                tr.innerHTML = `
                    <td>
                        <div class="team-cell-wrapper team-cell">
                            <img class="flag-icon" src="https://flagcdn.com/w40/${t.iso}.png" alt="${t.name}">
                            <span class="team-name-abbrev">${t.abbrev}</span>
                        </div>
                    </td>
                    <td class="team-pts">${t.pts}</td>
                    <td>${t.pj}</td>
                    <td>${t.pg}</td>
                    <td>${t.pe}</td>
                    <td>${t.pp}</td>
                    <td>${t.dg > 0 ? '+' + t.dg : t.dg}</td>
                `;
                tbody.appendChild(tr);
            });
        }
    });
}

// Cálculo de los Mejores Terceros
function calculateBestThirds() {
    const thirds = [];

    Object.keys(GROUPS).forEach(groupKey => {
        const standings = globalStandings[groupKey];
        if (standings && standings[2]) {
            // Copiar datos del equipo de 3era posición
            const team = standings[2];
            thirds.push({
                id: team.id,
                name: team.name,
                abbrev: team.abbrev,
                iso: team.iso,
                group: groupKey,
                pts: team.pts,
                pj: team.pj,
                pg: team.pg,
                pe: team.pe,
                pp: team.pp,
                gf: team.gf,
                gc: team.gc,
                dg: team.dg
            });
        }
    });

    // Ordenar los terceros puestos comparándolos entre sí
    thirds.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.dg !== a.dg) return b.dg - a.dg;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return a.group.localeCompare(b.group);
    });

    // Los 8 primeros son clasificados, los últimos 4 son eliminados
    bestThirdsList = thirds.slice(0, 8);

    // Renderizar la tabla de terceros
    const tbody = document.getElementById("thirds-table-body");
    if (tbody) {
        tbody.innerHTML = "";
        thirds.forEach((t, idx) => {
            const isQualified = idx < 8;
            const tr = document.createElement("tr");
            if (isQualified) tr.className = "qualified-third";
            
            tr.innerHTML = `
                <td><strong>${idx + 1}</strong></td>
                <td><strong>Grupo ${t.group}</strong></td>
                <td>
                    <div class="team-cell-wrapper">
                        <img class="flag-icon" src="https://flagcdn.com/w40/${t.iso}.png" alt="${t.name}">
                        <span>${t.name} (${t.abbrev})</span>
                    </div>
                </td>
                <td class="team-pts">${t.pts}</td>
                <td>${t.pj}</td>
                <td>${t.pg}</td>
                <td>${t.pe}</td>
                <td>${t.pp}</td>
                <td>${t.gf}</td>
                <td>${t.gc}</td>
                <td>${t.dg > 0 ? '+' + t.dg : t.dg}</td>
                <td>
                    <span class="status-badge ${isQualified ? 'qualified' : 'eliminated'}">
                        ${isQualified ? 'Clasificado' : 'Eliminado'}
                    </span>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }
}

// 9. Lógica de Distribución de los Mejores Terceros
// Emparejamiento por backtracking matemático para evitar mismo grupo y respetar restricciones
function matchThirds(advancingThirdsGroups) {
    // Lista de slots de terceros definidos oficialmente en Dieciseisavos:
    const slots = [
        { id: 74, opponent: '1E', allowed: ['A', 'B', 'C', 'D', 'F'] },
        { id: 77, opponent: '1I', allowed: ['C', 'D', 'F', 'G', 'H'] },
        { id: 79, opponent: '1A', allowed: ['C', 'E', 'F', 'H', 'I'] },
        { id: 80, opponent: '1L', allowed: ['E', 'H', 'I', 'J', 'K'] },
        { id: 81, opponent: '1D', allowed: ['B', 'E', 'F', 'I', 'J'] },
        { id: 82, opponent: '1G', allowed: ['A', 'E', 'H', 'I', 'J'] },
        { id: 85, opponent: '1B', allowed: ['E', 'F', 'G', 'I', 'J'] },
        { id: 87, opponent: '1K', allowed: ['D', 'E', 'I', 'J', 'L'] }
    ];
    
    let assignment = {};
    const used = new Set();
    
    function backtrack(slotIdx) {
        if (slotIdx === slots.length) return true;
        const slot = slots[slotIdx];
        
        for (let i = 0; i < advancingThirdsGroups.length; i++) {
            const group = advancingThirdsGroups[i];
            if (!used.has(group) && slot.allowed.includes(group)) {
                used.add(group);
                assignment[slot.id] = group;
                if (backtrack(slotIdx + 1)) return true;
                used.delete(group);
                delete assignment[slot.id];
            }
        }
        return false;
    }
    
    // 1) Intentar con las reglas estrictas de la FIFA
    let success = backtrack(0);
    
    // 2) Fallback Relajado: Si no se halla combinación exacta por empates de usuario,
    // simplemente se evita que un tercero juegue con el ganador de su mismo grupo.
    function relaxedBacktrack() {
        const slotsCopy = [...slots];
        const groupsCopy = [...advancingThirdsGroups];
        const assignment = {};
        
        slotsCopy.forEach(slot => {
            const matchWinnerGroup = slot.opponent.substring(1);
            const possible = groupsCopy.filter(g => g !== matchWinnerGroup);
            if (possible.length > 0) {
                const pick = possible[0];
                assignment[slot.id] = pick;
                groupsCopy.splice(groupsCopy.indexOf(pick), 1);
            } else {
                const pick = groupsCopy[0];
                assignment[slot.id] = pick;
                groupsCopy.splice(0, 1);
            }
        });
        return assignment;
    }
    
    if (!success) {
        assignment = relaxedBacktrack();
    }
    
    // 3) Fallback absoluto (en caso extremo de fallar el algoritmo anterior)
    if (!success && !Object.keys(assignment).length) {
        slots.forEach((s, idx) => {
            assignment[s.id] = advancingThirdsGroups[idx % advancingThirdsGroups.length];
        });
    }
    
    return assignment;
}

// 10. Actualizar y Renderizar Bracket Eliminatorio
function updateKnockoutBracket() {
    // Estructura de equipos clasificados para Dieciseisavos (Match 73 al 88)
    const qualifiedThirdsGroups = bestThirdsList.map(t => t.group);
    const thirdsAllocation = matchThirds(qualifiedThirdsGroups);

    const getQualifiedFromGroup = (groupKey, pos) => {
        const list = globalStandings[groupKey];
        return (list && list[pos]) ? list[pos] : null;
    };

    const getThirdByGroup = (groupKey) => {
        return bestThirdsList.find(t => t.group === groupKey) || null;
    };

    // Diccionario temporal para guardar quién está jugando cada partido eliminatorio
    const matchCompetitors = {};

    // Inicializar llaves de Dieciseisavos (R32)
    // Para cada partido de R32, determinar los equipos A y B
    const r32Defs = {
        73: { home: () => getQualifiedFromGroup('A', 1), away: () => getQualifiedFromGroup('B', 1) }, // 2A vs 2B
        74: { home: () => getQualifiedFromGroup('E', 0), away: () => getThirdByGroup(thirdsAllocation[74]) }, // 1E vs 3
        75: { home: () => getQualifiedFromGroup('F', 0), away: () => getQualifiedFromGroup('C', 1) }, // 1F vs 2C
        76: { home: () => getQualifiedFromGroup('C', 0), away: () => getQualifiedFromGroup('F', 1) }, // 1C vs 2F
        77: { home: () => getQualifiedFromGroup('I', 0), away: () => getThirdByGroup(thirdsAllocation[77]) }, // 1I vs 3
        78: { home: () => getQualifiedFromGroup('E', 1), away: () => getQualifiedFromGroup('I', 1) }, // 2E vs 2I
        79: { home: () => getQualifiedFromGroup('A', 0), away: () => getThirdByGroup(thirdsAllocation[79]) }, // 1A vs 3
        80: { home: () => getQualifiedFromGroup('L', 0), away: () => getThirdByGroup(thirdsAllocation[80]) }, // 1L vs 3
        81: { home: () => getQualifiedFromGroup('D', 0), away: () => getThirdByGroup(thirdsAllocation[81]) }, // 1D vs 3
        82: { home: () => getQualifiedFromGroup('G', 0), away: () => getThirdByGroup(thirdsAllocation[82]) }, // 1G vs 3
        83: { home: () => getQualifiedFromGroup('K', 1), away: () => getQualifiedFromGroup('L', 1) }, // 2K vs 2L
        84: { home: () => getQualifiedFromGroup('H', 0), away: () => getQualifiedFromGroup('J', 1) }, // 1H vs 2J
        85: { home: () => getQualifiedFromGroup('B', 0), away: () => getThirdByGroup(thirdsAllocation[85]) }, // 1B vs 3
        86: { home: () => getQualifiedFromGroup('J', 0), away: () => getQualifiedFromGroup('H', 1) }, // 1J vs 2H
        87: { home: () => getQualifiedFromGroup('K', 0), away: () => getThirdByGroup(thirdsAllocation[87]) }, // 1K vs 3
        88: { home: () => getQualifiedFromGroup('D', 1), away: () => getQualifiedFromGroup('G', 1) }  // 2D vs 2G
    };

    // Poblar R32 Competidores
    Object.keys(r32Defs).forEach(matchId => {
        const id = parseInt(matchId);
        matchCompetitors[id] = {
            home: r32Defs[id].home(),
            away: r32Defs[id].away()
        };
    });

    // Resolver progresivamente las rondas subsiguientes (R16, QF, SF, Finals)
    const resolveMatch = (matchId) => {
        const m = KNOCKOUT_MATCHES[matchId];
        const competitors = matchCompetitors[matchId];
        
        if (!competitors) return null;
        
        const pred = state.knockoutScores[matchId];
        if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) {
            const gh = parseInt(pred.home);
            const ga = parseInt(pred.away);
            
            if (gh > ga) {
                return competitors.home;
            } else if (ga > gh) {
                return competitors.away;
            } else {
                // Si hay empate, retornar el ganador por penales seleccionado
                if (pred.penaltyWinner === "home") return competitors.home;
                if (pred.penaltyWinner === "away") return competitors.away;
            }
        }
        return null; // Aún no hay ganador
    };

    const getLoserOfMatch = (matchId) => {
        const competitors = matchCompetitors[matchId];
        if (!competitors) return null;
        const winner = resolveMatch(matchId);
        if (!winner) return null;
        return (winner.id === competitors.home.id) ? competitors.away : competitors.home;
    };

    // Lista ordenada de fases para propagar los ganadores
    const orderToResolve = [
        // R16
        { target: 89, homeFrom: 74, awayFrom: 77 },
        { id: 90, target: 90, homeFrom: 73, awayFrom: 75 },
        { id: 91, target: 91, homeFrom: 76, awayFrom: 78 },
        { id: 92, target: 92, homeFrom: 79, awayFrom: 80 },
        { id: 93, target: 93, homeFrom: 83, awayFrom: 84 },
        { id: 94, target: 94, homeFrom: 81, awayFrom: 82 },
        { id: 95, target: 95, homeFrom: 86, awayFrom: 88 },
        { id: 96, target: 96, homeFrom: 85, awayFrom: 87 },
        // QF
        { target: 97, homeFrom: 89, awayFrom: 90 },
        { target: 98, homeFrom: 93, awayFrom: 94 },
        { target: 99, homeFrom: 91, awayFrom: 92 },
        { target: 100, homeFrom: 95, awayFrom: 96 },
        // SF
        { target: 101, homeFrom: 97, awayFrom: 98 },
        { target: 102, homeFrom: 99, awayFrom: 100 },
        // Tercer Puesto
        { target: 103, homeFrom: 101, awayFrom: 102, isLoser: true },
        // Final
        { target: 104, homeFrom: 101, awayFrom: 102 }
    ];

    orderToResolve.forEach(step => {
        const homeTeam = step.isLoser ? getLoserOfMatch(step.homeFrom) : resolveMatch(step.homeFrom);
        const awayTeam = step.isLoser ? getLoserOfMatch(step.awayFrom) : resolveMatch(step.awayFrom);
        
        matchCompetitors[step.target] = {
            home: homeTeam,
            away: awayTeam
        };
    });

    // Renderizar las llaves en el DOM
    renderRound("r32-matches-list", [73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88], matchCompetitors);
    renderRound("r16-matches-list", [89, 90, 91, 92, 93, 94, 95, 96], matchCompetitors);
    renderRound("qf-matches-list", [97, 98, 99, 100], matchCompetitors);
    renderRound("sf-matches-list", [101, 102], matchCompetitors);
    renderRound("third-place-match-list", [103], matchCompetitors);
    renderRound("final-match-list", [104], matchCompetitors);

    // Calcular Campeón Final
    const finalWinner = resolveMatch(104);
    const champCard = document.getElementById("champion-card");
    const champFlag = document.getElementById("champion-flag-box");
    const champName = document.getElementById("champion-name-box");
    const wrapper = champCard.parentElement;

    if (finalWinner) {
        champFlag.innerHTML = `<img src="https://flagcdn.com/w80/${finalWinner.iso}.png" alt="${finalWinner.name}">`;
        champName.innerText = finalWinner.name;
        wrapper.classList.add("has-champion");
    } else {
        champFlag.innerHTML = `<div class="empty-flag">?</div>`;
        champName.innerText = "¿Quién será el campeón?";
        wrapper.classList.remove("has-champion");
    }
}

// Renderizar una ronda particular de partidos
function renderRound(containerId, matchIds, competitorsData) {
    const listContainer = document.getElementById(containerId);
    if (!listContainer) return;
    
    listContainer.innerHTML = "";

    matchIds.forEach(matchId => {
        const m = KNOCKOUT_MATCHES[matchId];
        const comps = competitorsData[matchId] || { home: null, away: null };
        const pred = state.knockoutScores[matchId] || { home: "", away: "" };

        const home = comps.home;
        const away = comps.away;

        const isTied = (pred.home !== "" && pred.away !== "" && parseInt(pred.home) === parseInt(pred.away));

        // Determinar quién es el ganador predicho para destacar visualmente
        let homeClass = "";
        let awayClass = "";
        if (pred.home !== "" && pred.away !== "") {
            const h = parseInt(pred.home);
            const a = parseInt(pred.away);
            if (h > a) {
                homeClass = "winner-predicted";
                awayClass = "loser-predicted";
            } else if (a > h) {
                awayClass = "winner-predicted";
                homeClass = "loser-predicted";
            } else if (pred.penaltyWinner === "home") {
                homeClass = "winner-predicted";
                awayClass = "loser-predicted";
            } else if (pred.penaltyWinner === "away") {
                awayClass = "winner-predicted";
                homeClass = "loser-predicted";
            }
        }

        const card = document.createElement("div");
        card.className = "knockout-match-card glass-panel";
        card.id = `ko-match-${matchId}`;
        if (m.kickoff) card.setAttribute('data-kickoff', m.kickoff.getTime());

        // Header de la Tarjeta del Partido
        let headerLabel = `Partido ${matchId}`;
        if (m.round === "third") headerLabel = "Tercer Puesto";
        if (m.round === "final") headerLabel = "Gran Final";

        const koLocked = isMatchLocked(m.kickoff);
        if (koLocked) card.classList.add('match-item--locked');

        const koCountdown = buildCountdownBadge(m.kickoff, matchId);

        card.innerHTML = `
            <div class="match-card-header">
                <span>${headerLabel}</span>
                <span class="ko-match-info">${m.date} · ${m.time} · ${m.stadium}</span>
                ${koCountdown}
            </div>
            
            <!-- Equipo Local -->
            <div class="match-card-team-row ${homeClass}">
                <div class="match-card-team-info">
                    ${home ? `
                        <img class="flag-icon" src="https://flagcdn.com/w40/${home.iso}.png" alt="${home.name}">
                        <span>${home.abbrev}</span>
                    ` : `
                        <div class="empty-flag">?</div>
                        <span class="team-placeholder">${m.homePlaceholder}</span>
                    `}
                </div>
                <input type="number" min="0" class="score-input ko-score-input" 
                       data-match-id="${matchId}" data-team="home" 
                       value="${pred.home}" ${!home || !away ? 'disabled' : ''}>
            </div>

            <!-- Equipo Visitante -->
            <div class="match-card-team-row ${awayClass}">
                <div class="match-card-team-info">
                    ${away ? `
                        <img class="flag-icon" src="https://flagcdn.com/w40/${away.iso}.png" alt="${away.name}">
                        <span>${away.abbrev}</span>
                    ` : `
                        <div class="empty-flag">?</div>
                        <span class="team-placeholder">${m.awayPlaceholder}</span>
                    `}
                </div>
                <input type="number" min="0" class="score-input ko-score-input" 
                       data-match-id="${matchId}" data-team="away" 
                       value="${pred.away}" ${!home || !away ? 'disabled' : ''}>
            </div>
        `;

        // Renderizar selector de penales en caso de empate en goles
        if (isTied && home && away) {
            const penDiv = document.createElement("div");
            penDiv.className = "penalty-selector-container";
            
            const btnHomeClass = pred.penaltyWinner === "home" ? "selected" : "";
            const btnAwayClass = pred.penaltyWinner === "away" ? "selected" : "";

            penDiv.innerHTML = `
                <span class="penalty-label">Pasa (Penales):</span>
                <div class="penalty-buttons">
                    <button class="btn-penalty-winner ${btnHomeClass}" data-match-id="${matchId}" data-winner="home">${home.abbrev}</button>
                    <button class="btn-penalty-winner ${btnAwayClass}" data-match-id="${matchId}" data-winner="away">${away.abbrev}</button>
                </div>
            `;
            card.appendChild(penDiv);
        }

        listContainer.appendChild(card);
    });
}

// Escuchar cambios de Marcadores en Llaves Eliminatorias (Knockout)
document.addEventListener("input", (e) => {
    if (e.target.classList.contains("ko-score-input")) {
        const matchId = parseInt(e.target.getAttribute("data-match-id"));
        const teamType = e.target.getAttribute("data-team");
        const val = e.target.value;

        if (!state.knockoutScores[matchId]) {
            state.knockoutScores[matchId] = { home: "", away: "", penaltyWinner: "" };
        }

        const scoreObj = state.knockoutScores[matchId];
        scoreObj[teamType] = val !== "" ? parseInt(val) : "";

        // Reset del ganador de penales si el marcador deja de estar empatado
        if (scoreObj.home !== "" && scoreObj.away !== "" && parseInt(scoreObj.home) !== parseInt(scoreObj.away)) {
            scoreObj.penaltyWinner = "";
        }

        // Limpieza recursiva aguas abajo de las llaves si cambian los equipos participantes
        // Nota: Se maneja al recalcular las llaves en updateKnockoutBracket()
        calculateAndRenderAll();
        
        // Guardado automático en el LocalStorage
        localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
    }
});

// Escuchar clics en los botones de definición por penales
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-penalty-winner")) {
        const matchId = parseInt(e.target.getAttribute("data-match-id"));
        const winner = e.target.getAttribute("data-winner");

        if (state.knockoutScores[matchId]) {
            state.knockoutScores[matchId].penaltyWinner = winner;
            
            calculateAndRenderAll();
            saveState();
        }
    }
});

// 11. Controles Globales (Guardar)
function setupGlobalControls() {
    const btnSave = document.getElementById("btn-save");
    if (btnSave) {
        btnSave.addEventListener("click", () => {
            saveState();
        });
    }

    // Botón Reiniciar
    const btnReset = document.getElementById("btn-reset");
    if (btnReset) {
        btnReset.addEventListener("click", () => {
            if (confirm("⚠️ ¿Estás seguro de que deseas reiniciar toda tu polla? Se perderán todos tus marcadores.")) {
                state = { 
                    groupScores: {}, 
                    knockoutScores: {},
                    special: { champion: "", mvp: "", scorer: "", gk: "" }
                };
                
                if (currentUser) {
                    if (isFirebaseActive) {
                        db.collection("predictions").doc(currentUser.uid).set(state);
                    } else {
                        localStorage.removeItem(`polla_state_${currentUser.email}`);
                    }
                }
                localStorage.removeItem("polla_mundial_2026_state");
                
                // Recargar interfaz
                syncSpecialInputsFromState();
                renderGroupStage();
                calculateAndRenderAll();
                showToast("🔄 Polla reiniciada con éxito");
            }
        });
    }

    // Botón Exportar (Descargar JSON)
    const btnShare = document.getElementById("btn-share");
    if (btnShare) {
        btnShare.addEventListener("click", () => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
            const downloadAnchor = document.createElement("a");
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "polla_mundial_2026_predicciones.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
            showToast("📤 Archivo de predicciones exportado");
        });
    }

    // Botón Importar (Cargar archivo JSON)
    const fileInput = document.getElementById("import-file");
    const btnImport = document.getElementById("btn-import");
    if (btnImport && fileInput) {
        btnImport.addEventListener("click", () => {
            fileInput.click();
        });

        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const importedState = JSON.parse(event.target.result);
                    if (importedState.groupScores || importedState.knockoutScores) {
                        state = {
                            groupScores: importedState.groupScores || {},
                            knockoutScores: importedState.knockoutScores || {},
                            special: importedState.special || { champion: "", mvp: "", scorer: "", gk: "" }
                        };
                        
                        saveState();
                        
                        // Recargar e informar
                        syncSpecialInputsFromState();
                        renderGroupStage();
                        calculateAndRenderAll();
                        showToast("📥 Predicciones importadas con éxito ✔");
                    } else {
                        alert("El archivo no tiene el formato correcto.");
                    }
                } catch (err) {
                    alert("Error al leer el archivo JSON.");
                }
            };
            reader.readAsText(file);
            fileInput.value = "";
        });
    }
}

function saveState() {
    if (isFirebaseActive && currentUser) {
        db.collection("predictions").doc(currentUser.uid).set(state).catch(console.error);
    }
    if (currentUser) {
        localStorage.setItem(`polla_state_${currentUser.email}`, JSON.stringify(state));
    }
    localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
    updateProgressBar();
}

// Navegador de Rondas para Móviles (Bracket Nav Bar)
function initMobileBracketNav() {
    const navBar = document.querySelector(".bracket-nav-bar");
    const btns = document.querySelectorAll(".bracket-nav-btn");
    const scroller = document.getElementById("bracket-scroller");

    if (!navBar || !scroller) return;

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const roundClass = btn.getAttribute("data-round");
            const targetCol = scroller.querySelector(`.bracket-column.${roundClass}`);
            if (targetCol) {
                scroller.scrollTo({
                    left: targetCol.offsetLeft - 16,
                    behavior: "smooth"
                });
            }
        });
    });

    scroller.addEventListener("scroll", () => {
        const columns = scroller.querySelectorAll(".bracket-column");
        let activeCol = null;
        let minDiff = Infinity;
        const scrollCenter = scroller.scrollLeft + scroller.clientWidth / 2;

        columns.forEach(col => {
            const colCenter = col.offsetLeft + col.clientWidth / 2;
            const diff = Math.abs(colCenter - scrollCenter);
            if (diff < minDiff) {
                minDiff = diff;
                activeCol = col;
            }
        });

        if (activeCol) {
            let roundClass = "";
            if (activeCol.classList.contains("round-32")) roundClass = "round-32";
            else if (activeCol.classList.contains("round-16")) roundClass = "round-16";
            else if (activeCol.classList.contains("quarterfinals")) roundClass = "quarterfinals";
            else if (activeCol.classList.contains("semifinals")) roundClass = "semifinals";
            else if (activeCol.classList.contains("finals")) roundClass = "finals";
            else if (activeCol.classList.contains("champion-column")) roundClass = "finals";

            if (roundClass) {
                btns.forEach(btn => {
                    if (btn.getAttribute("data-round") === roundClass) {
                        btn.classList.add("active");
                    } else {
                        btn.classList.remove("active");
                    }
                });
            }
        }
    });
}

// Configurar el Menú Desplegable de Acciones en Móviles
function setupMobileMenu() {
    const trigger = document.getElementById("mobile-menu-trigger");
    const dropdown = document.getElementById("mobile-menu-dropdown");

    if (!trigger || !dropdown) return;

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

    document.addEventListener("click", () => {
        dropdown.classList.remove("show");
    });

    dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    const actionMap = {
        "btn-save-mobile": "btn-save",
        "btn-share-mobile": "btn-share",
        "btn-import-mobile": "btn-import",
        "btn-reset-mobile": "btn-reset"
    };

    Object.keys(actionMap).forEach(mobId => {
        const mobBtn = document.getElementById(mobId);
        const destBtn = document.getElementById(actionMap[mobId]);
        
        if (mobBtn && destBtn) {
            mobBtn.addEventListener("click", () => {
                dropdown.classList.remove("show");
                destBtn.click();
            });
        }
    });
}

// ==========================================================================
// Módulos SPA Adicionales: Enrutamiento, Cuenta Regresiva, Autenticación y Clasificación
// ==========================================================================

// SPA client-side view switching routing system
function initSPARouting() {
    const navButtons = document.querySelectorAll(".desktop-nav-link, .bottom-nav-item, [data-view]");
    
    navButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetView = btn.getAttribute("data-view");
            if (!targetView) return;
            navigateToView(targetView);
        });
    });
}

function navigateToView(viewName) {
    const panes = document.querySelectorAll(".view-pane");
    panes.forEach(pane => pane.classList.remove("active"));
    
    const targetPane = document.getElementById(`view-${viewName}`);
    if (targetPane) {
        targetPane.classList.add("active");
    }
    
    const desktopLinks = document.querySelectorAll(".desktop-nav-link");
    desktopLinks.forEach(link => {
        if (link.getAttribute("data-view") === viewName) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
    
    const mobileItems = document.querySelectorAll(".bottom-nav-item");
    mobileItems.forEach(item => {
        if (item.getAttribute("data-view") === viewName) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    window.scrollTo(0, 0);

    if (viewName === "ranking") {
        renderRankingTable();
    }
}

// Cuenta Regresiva al Mundial: 11 de Junio, 2026
function initCountdown() {
    const kickOffDate = new Date("2026-06-11T14:00:00-05:00").getTime(); // UTC-5 (CDMX/NY aprox)
    
    function updateTimer() {
        const now = new Date().getTime();
        const diff = kickOffDate - now;
        
        const countdownEl = document.getElementById("countdown");
        if (!countdownEl) return;

        if (diff <= 0) {
            countdownEl.innerHTML = "<h3 style='color: var(--accent-gold); font-size: 1.5rem; font-weight: 800; text-align:center;'>¡EL MUNDIAL HA COMENZADO! ⚽</h3>";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const pad = (num) => String(num).padStart(2, '0');
        
        const daysEl = document.getElementById("cd-days");
        const hoursEl = document.getElementById("cd-hours");
        const minsEl = document.getElementById("cd-minutes");
        const secsEl = document.getElementById("cd-seconds");

        if (daysEl) daysEl.innerText = pad(days);
        if (hoursEl) hoursEl.innerText = pad(hours);
        if (minsEl) minsEl.innerText = pad(minutes);
        if (secsEl) secsEl.innerText = pad(seconds);
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Sistema de Autenticación
let currentUser = null;

function initAuthSystem() {
    const tabLogin = document.getElementById("tab-login-trigger");
    const tabRegister = document.getElementById("tab-register-trigger");
    const formLoginContainer = document.getElementById("form-login-container");
    const formRegisterContainer = document.getElementById("form-register-container");
    
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    
    if (tabLogin) {
        tabLogin.addEventListener("click", () => {
            tabLogin.classList.add("active");
            tabRegister.classList.remove("active");
            formLoginContainer.style.display = "block";
            formRegisterContainer.style.display = "none";
        });
    }
    
    if (tabRegister) {
        tabRegister.addEventListener("click", () => {
            tabRegister.classList.add("active");
            tabLogin.classList.remove("active");
            formRegisterContainer.style.display = "block";
            formLoginContainer.style.display = "none";
        });
    }
    
    const linkReg = document.getElementById("link-to-register");
    if (linkReg) linkReg.addEventListener("click", () => tabRegister.click());
    
    const linkLog = document.getElementById("link-to-login");
    if (linkLog) linkLog.addEventListener("click", () => tabLogin.click());
    
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const pass = document.getElementById("login-password").value;
            
            if (isFirebaseActive) {
                auth.signInWithEmailAndPassword(email, pass)
                    .then((userCredential) => {
                        const fbUser = userCredential.user;
                        return db.collection("users").doc(fbUser.uid).get().then((doc) => {
                            if (doc.exists) {
                                loginUser(doc.data());
                                showToast("🔓 Sesión iniciada con éxito");
                                navigateToView("pronosticos");
                                formLogin.reset();
                            } else {
                                const userData = { uid: fbUser.uid, name: fbUser.displayName || fbUser.email.split("@")[0], email: fbUser.email, favorite: "ARG" };
                                loginUser(userData);
                                showToast("🔓 Sesión iniciada");
                                navigateToView("pronosticos");
                                formLogin.reset();
                            }
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        alert("❌ Error al iniciar sesión: " + translateAuthError(err.code));
                    });
            } else {
                const users = JSON.parse(localStorage.getItem("polla_registered_users") || "[]");
                const user = users.find(u => u.email === email && u.password === pass);
                
                if (user) {
                    loginUser(user);
                    showToast("🔓 Sesión iniciada con éxito");
                    navigateToView("pronosticos");
                    formLogin.reset();
                } else {
                    alert("❌ Correo o contraseña incorrectos.");
                }
            }
        });
    }
    
    if (formRegister) {
        formRegister.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("reg-name").value;
            const email = document.getElementById("reg-email").value;
            const phone = document.getElementById("reg-phone").value;
            const favorite = document.getElementById("reg-favorite").value;
            const pass = document.getElementById("reg-password").value;
            
            if (pass.length < 6) {
                alert("La contraseña debe tener al menos 6 caracteres.");
                return;
            }
            
            if (isFirebaseActive) {
                auth.createUserWithEmailAndPassword(email, pass)
                    .then((userCredential) => {
                        const fbUser = userCredential.user;
                        const userData = {
                            uid: fbUser.uid,
                            name: name,
                            email: email,
                            phone: phone,
                            favorite: favorite
                        };
                        return db.collection("users").doc(fbUser.uid).set(userData).then(() => {
                            fbUser.updateProfile({ displayName: name });
                            loginUser(userData);
                            showToast("✨ Cuenta creada con éxito");
                            navigateToView("pronosticos");
                            formRegister.reset();
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        alert("❌ Error al crear cuenta: " + translateAuthError(err.code));
                    });
            } else {
                const users = JSON.parse(localStorage.getItem("polla_registered_users") || "[]");
                if (users.find(u => u.email === email)) {
                    alert("❌ Este correo ya está registrado.");
                    return;
                }
                
                const newUser = { name, email, phone, favorite, password: pass };
                users.push(newUser);
                localStorage.setItem("polla_registered_users", JSON.stringify(users));
                
                loginUser(newUser);
                showToast("✨ Cuenta creada y sesión iniciada");
                navigateToView("pronosticos");
                formRegister.reset();
            }
        });
    }
    
    const logoutBtn = document.getElementById("btn-logout-header");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            if (isFirebaseActive) {
                auth.signOut().then(() => {
                    logoutUser();
                });
            } else {
                logoutUser();
            }
        });
    }
    
    checkSavedSession();
}

function translateAuthError(code) {
    switch(code) {
        case "auth/email-already-in-use": return "El correo ya está registrado.";
        case "auth/invalid-email": return "Correo electrónico inválido.";
        case "auth/weak-password": return "La contraseña debe tener al menos 6 caracteres.";
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential": return "Correo o contraseña incorrectos.";
        default: return "Verifica los datos e inténtalo de nuevo.";
    }
}

function loginUser(user) {
    currentUser = user;
    localStorage.setItem("polla_current_user", JSON.stringify(user));
    updateAuthUI();
    
    if (isFirebaseActive) {
        showToast("🔄 Cargando predicciones de la nube...");
        db.collection("predictions").doc(user.uid || user.email).get()
            .then((doc) => {
                if (doc.exists) {
                    state = doc.data();
                    if (!state.groupScores) state.groupScores = {};
                    if (!state.knockoutScores) state.knockoutScores = {};
                    if (!state.special) state.special = { champion: "", mvp: "", scorer: "", gk: "" };
                    renderGroupStage();
                    calculateAndRenderAll();
                    syncSpecialInputsFromState();
                } else {
                    loadLocalUserBackup(user);
                    // Crear documento inicial en Firestore para que figuren en la tabla de clasificación general
                    db.collection("predictions").doc(user.uid || user.email).set({
                        uid: user.uid || user.email,
                        name: user.name,
                        email: user.email,
                        favorite: user.favorite,
                        groupScores: state.groupScores || {},
                        knockoutScores: state.knockoutScores || {},
                        special: state.special || { champion: "", mvp: "", scorer: "", gk: "" },
                        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                    })
                    .then(() => {
                        renderGroupStage();
                        calculateAndRenderAll();
                        syncSpecialInputsFromState();
                    })
                    .catch((err) => {
                        console.error("Error al crear documento en Firestore:", err);
                        renderGroupStage();
                        calculateAndRenderAll();
                        syncSpecialInputsFromState();
                    });
                }
            })
            .catch((err) => {
                console.error("Error al cargar de Firestore:", err);
                loadLocalUserBackup(user);
                renderGroupStage();
                calculateAndRenderAll();
                syncSpecialInputsFromState();
            });
    } else {
        loadLocalUserBackup(user);
        renderGroupStage();
        calculateAndRenderAll();
        syncSpecialInputsFromState();
    }
}

function loadLocalUserBackup(user) {
    const userStateKey = `polla_state_${user.email}`;
    const savedState = localStorage.getItem(userStateKey);
    if (savedState) {
        state = JSON.parse(savedState);
    } else {
        state = JSON.parse(localStorage.getItem("polla_mundial_2026_state") || '{"groupScores":{},"knockoutScores":{},"special":{"champion":"","mvp":"","scorer":"","gk":""}}');
    }
}

function logoutUser() {
    if (currentUser && !isFirebaseActive) {
        localStorage.setItem(`polla_state_${currentUser.email}`, JSON.stringify(state));
    }
    
    currentUser = null;
    localStorage.removeItem("polla_current_user");
    
    loadState();
    updateAuthUI();
    renderGroupStage();
    calculateAndRenderAll();
    syncSpecialInputsFromState();
    showToast("🚪 Sesión cerrada");
    navigateToView("home");
}

function checkSavedSession() {
    const saved = localStorage.getItem("polla_current_user");
    if (saved) {
        try {
            const user = JSON.parse(saved);
            loginUser(user);
        } catch (e) {
            console.error("Error al cargar sesión de usuario", e);
        }
    }
}

function updateAuthUI() {
    const btnLoginHeader = document.getElementById("btn-login-header");
    const userProfileHeader = document.getElementById("user-profile-header");
    const usernameDisplay = document.getElementById("header-username");
    
    if (currentUser) {
        if (btnLoginHeader) btnLoginHeader.style.display = "none";
        if (userProfileHeader) userProfileHeader.style.display = "flex";
        if (usernameDisplay) usernameDisplay.innerText = currentUser.name.split(" ")[0];
    } else {
        if (btnLoginHeader) btnLoginHeader.style.display = "block";
        if (userProfileHeader) userProfileHeader.style.display = "none";
    }
}

// Cargar Predicciones Especiales
function initSpecialPredictions() {
    const championSelect = document.getElementById("special-champion");
    if (!championSelect) return;
    
    championSelect.innerHTML = '<option value="">-- Selecciona --</option>';
    const sortedTeams = Object.keys(TEAMS).map(k => TEAMS[k]).sort((a,b) => a.name.localeCompare(b.name));
    
    sortedTeams.forEach(team => {
        const option = document.createElement("option");
        option.value = team.abbrev;
        option.innerText = team.name;
        championSelect.appendChild(option);
    });
    
    syncSpecialInputsFromState();
    
    championSelect.addEventListener("change", (e) => {
        state.special.champion = e.target.value;
        saveSpecialState();
    });
    
    const mvpInp = document.getElementById("special-mvp");
    if (mvpInp) {
        mvpInp.addEventListener("input", (e) => {
            state.special.mvp = e.target.value;
            saveSpecialState();
        });
    }
    
    const scorerInp = document.getElementById("special-scorer");
    if (scorerInp) {
        scorerInp.addEventListener("input", (e) => {
            state.special.scorer = e.target.value;
            saveSpecialState();
        });
    }
    
    const gkInp = document.getElementById("special-gk");
    if (gkInp) {
        gkInp.addEventListener("input", (e) => {
            state.special.gk = e.target.value;
            saveSpecialState();
        });
    }
}

function syncSpecialInputsFromState() {
    const champSel = document.getElementById("special-champion");
    const mvpInp = document.getElementById("special-mvp");
    const scorerInp = document.getElementById("special-scorer");
    const gkInp = document.getElementById("special-gk");
    
    if (champSel) champSel.value = state.special.champion || "";
    if (mvpInp) mvpInp.value = state.special.mvp || "";
    if (scorerInp) scorerInp.value = state.special.scorer || "";
    if (gkInp) gkInp.value = state.special.gk || "";
}

function saveSpecialState() {
    if (isFirebaseActive && currentUser) {
        // Guardar especial en la nube mediante saveState
        // pero evitamos sobrecargar llamadas con un pequeño debounce o guardado local de respaldo
    }
    if (currentUser) {
        localStorage.setItem(`polla_state_${currentUser.email}`, JSON.stringify(state));
    }
    localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
    updateProgressBar();
}

// Cargar la Tabla del Ranking General
function renderRankingTable() {
    const tbody = document.getElementById("ranking-table-body");
    if (!tbody) return;

    // Update ranking header badge
    const rankingHeader = document.querySelector(".ranking-header p");
    if (rankingHeader) {
        const existingBadge = rankingHeader.parentElement.querySelector(".ranking-real-badge, .ranking-pending-badge");
        if (existingBadge) existingBadge.remove();
        const badge = document.createElement("div");
        badge.style.marginTop = "0.5rem";
        if (hasAnyOfficialResult()) {
            badge.innerHTML = '<span class="ranking-real-badge">✅ Puntajes reales basados en resultados oficiales</span>';
        } else {
            badge.innerHTML = '<span class="ranking-pending-badge">⏳ Puntajes reales disponibles cuando se ingresen resultados oficiales</span>';
        }
        rankingHeader.insertAdjacentElement("afterend", badge);
    }

    tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Cargando clasificación...</td></tr>";
    
    if (isFirebaseActive) {
        db.collection("predictions").get()
            .then((querySnapshot) => {
                const usersList = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();

                    let score;
                    if (hasAnyOfficialResult()) {
                        score = calculateRealScore(data);
                    } else {
                        // Fallback: count completed predictions but show 0 pts
                        let completed = 0;
                        GROUP_MATCHES.forEach(m => {
                            const pred = data.groupScores && data.groupScores[m.id];
                            if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) completed++;
                        });
                        Object.keys(KNOCKOUT_MATCHES).forEach(matchId => {
                            const pred = data.knockoutScores && data.knockoutScores[matchId];
                            if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) {
                                if (parseInt(pred.home) === parseInt(pred.away)) { if (pred.penaltyWinner) completed++; } else completed++;
                            }
                        });
                        score = { pts: 0, exacts: 0, winners: 0 };
                    }

                    usersList.push({
                        name: data.name,
                        favorite: data.favorite,
                        exacts: score.exacts,
                        winners: score.winners,
                        pts: score.pts,
                        isCurrentUser: (currentUser && doc.id === currentUser.uid)
                    });
                });

                if (currentUser && !usersList.find(u => u.isCurrentUser)) {
                    let score;
                    if (hasAnyOfficialResult()) {
                        score = calculateRealScore(state);
                    } else {
                        score = { pts: 0, exacts: 0, winners: 0 };
                    }
                    usersList.push({
                        name: `${currentUser.name} (Tú)`,
                        favorite: currentUser.favorite,
                        exacts: score.exacts,
                        winners: score.winners,
                        pts: score.pts,
                        isCurrentUser: true
                    });
                }

                if (usersList.length === 0) {
                    tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Ningún usuario ha registrado predicciones aún.</td></tr>";
                    return;
                }

                usersList.sort((a,b) => {
                    if (b.pts !== a.pts) return b.pts - a.pts;
                    return b.exacts - a.exacts;
                });

                displayRankingRows(usersList, tbody);
            })
            .catch((err) => {
                console.error("Error al obtener ranking:", err);
                tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Error de red al conectar. Cargando simulación local...</td></tr>";
                setTimeout(() => renderMockRanking(tbody), 1500);
            });
    } else {
        renderMockRanking(tbody);
    }
}

function countCompletedPredictionsLocal() {
    let completed = 0;
    GROUP_MATCHES.forEach(m => {
        const pred = state.groupScores[m.id];
        if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) {
            completed++;
        }
    });
    Object.keys(KNOCKOUT_MATCHES).forEach(matchId => {
        const pred = state.knockoutScores[matchId];
        if (pred && pred.home !== "" && pred.away !== "" && pred.home !== undefined && pred.away !== undefined) {
            if (parseInt(pred.home) === parseInt(pred.away)) {
                if (pred.penaltyWinner) completed++;
            } else {
                completed++;
            }
        }
    });
    return completed;
}

function renderMockRanking(tbody) {
    const registeredUsers = JSON.parse(localStorage.getItem("polla_registered_users") || "[]");
    const usersList = [];

    registeredUsers.forEach(user => {
        const userStateKey = `polla_state_${user.email}`;
        const savedState = localStorage.getItem(userStateKey);
        let userState = { groupScores: {}, knockoutScores: {}, special: { champion: "", mvp: "", scorer: "", gk: "" } };
        
        if (savedState) {
            try {
                userState = JSON.parse(savedState);
            } catch (e) {
                console.error("Error al parsear estado local de " + user.email, e);
            }
        }

        let score;
        if (hasAnyOfficialResult()) {
            score = calculateRealScore(userState);
        } else {
            score = { pts: 0, exacts: 0, winners: 0 };
        }

        usersList.push({
            name: user.name,
            favorite: user.favorite,
            exacts: score.exacts,
            winners: score.winners,
            pts: score.pts,
            isCurrentUser: (currentUser && user.email === currentUser.email)
        });
    });

    if (currentUser && !usersList.find(u => u.isCurrentUser)) {
        let score;
        if (hasAnyOfficialResult()) {
            score = calculateRealScore(state);
        } else {
            score = { pts: 0, exacts: 0, winners: 0 };
        }

        usersList.push({
            name: `${currentUser.name} (Tú)`,
            favorite: currentUser.favorite,
            exacts: score.exacts,
            winners: score.winners,
            pts: score.pts,
            isCurrentUser: true
        });
    }

    if (usersList.length === 0) {
        tbody.innerHTML = "<tr><td colspan='6' style='text-align:center;'>Ningún usuario ha registrado predicciones aún.</td></tr>";
        return;
    }

    usersList.sort((a,b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        return b.exacts - a.exacts;
    });

    displayRankingRows(usersList, tbody);
}

function displayRankingRows(list, tbody) {
    tbody.innerHTML = "";
    list.forEach((user, idx) => {
        const tr = document.createElement("tr");
        if (user.isCurrentUser) {
            tr.className = "current-user-row";
        } else if (idx < 3) {
            tr.className = "top-three";
        }
        
        let rankLabel = idx + 1;
        if (idx === 0) rankLabel = "🏆 " + rankLabel;
        else if (idx === 1) rankLabel = "🥈 " + rankLabel;
        else if (idx === 2) rankLabel = "🥉 " + rankLabel;
        else if (idx === list.length - 1) rankLabel = "💩 Last";
        
        const favTeam = TEAMS[user.favorite] || { name: user.favorite, iso: "" };
        const favFlag = favTeam.iso ? `<img class="flag-icon" src="https://flagcdn.com/w40/${favTeam.iso}.png" alt="${favTeam.name}" style="width:16px;height:12px;margin-right:4px;">` : "";
        
        tr.innerHTML = `
            <td><strong>${rankLabel}</strong></td>
            <td><strong>${user.name}</strong></td>
            <td>
                <div style="display:flex;align-items:center;justify-content:center;">
                    ${favFlag}
                    <span>${favTeam.name}</span>
                </div>
            </td>
            <td>${user.exacts}</td>
            <td>${user.winners}</td>
            <td class="team-pts">${user.pts}</td>
        `;
        
        tbody.appendChild(tr);
    });
}

// ==========================================================================
// Sistema de Resultados Oficiales + Scoring Real
// ==========================================================================

const ADMIN_PASSWORD = "polla2026admin";
const PHASE_MULTIPLIERS = { r32: 2, r16: 3, qf: 4, sf: 5, third: 6, final: 6 };

let officialResults = { group: {}, knockout: {}, special: { champion: "", mvp: "", scorer: "", gk: "" } };
let adminAuthenticated = false;

function loadOfficialResults() {
    try {
        const saved = localStorage.getItem("polla_official_results_2026");
        if (saved) {
            officialResults = JSON.parse(saved);
            if (!officialResults.group) officialResults.group = {};
            if (!officialResults.knockout) officialResults.knockout = {};
            if (!officialResults.special) officialResults.special = { champion: "", mvp: "", scorer: "", gk: "" };
        }
    } catch (e) {
        console.error("Error cargando resultados oficiales:", e);
    }
}

function saveOfficialResults() {
    localStorage.setItem("polla_official_results_2026", JSON.stringify(officialResults));
    // Si Firebase activo, guardar en Firestore también
    if (isFirebaseActive) {
        db.collection("official_results").doc("global").set(officialResults)
            .catch(err => console.error("Error guardando resultados en Firestore:", err));
    }
}

function hasAnyOfficialResult() {
    return Object.keys(officialResults.group).length > 0 ||
           Object.keys(officialResults.knockout).length > 0 ||
           officialResults.special.champion !== "";
}

// Normaliza texto para comparación tolerante (minúsculas, sin tildes)
function normalizeText(str) {
    if (!str) return "";
    return str.toLowerCase().trim()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ");
}

// Calcula puntos reales de un usuario comparando con resultados oficiales
function calculateRealScore(predictions) {
    let pts = 0;
    let exacts = 0;
    let winners = 0;

    if (!predictions) return { pts: 0, exacts: 0, winners: 0 };

    // --- FASE DE GRUPOS (x1) ---
    GROUP_MATCHES.forEach(m => {
        const official = officialResults.group[m.id];
        const pred = predictions.groupScores && predictions.groupScores[m.id];
        if (!official || pred === undefined || pred === null) return;
        if (official.home === "" || official.away === "" || official.home === undefined) return;
        if (pred.home === "" || pred.away === "" || pred.home === undefined) return;

        const oh = parseInt(official.home);
        const oa = parseInt(official.away);
        const ph = parseInt(pred.home);
        const pa = parseInt(pred.away);
        if (isNaN(oh) || isNaN(oa) || isNaN(ph) || isNaN(pa)) return;

        if (ph === oh && pa === oa) {
            pts += 5;
            exacts++;
        } else {
            const oResult = oh > oa ? "H" : oh < oa ? "A" : "D";
            const pResult = ph > pa ? "H" : ph < pa ? "A" : "D";
            if (oResult === pResult) {
                pts += 2;
                winners++;
            }
        }
    });

    // --- FASE ELIMINATORIA ---
    Object.keys(KNOCKOUT_MATCHES).forEach(matchId => {
        const m = KNOCKOUT_MATCHES[matchId];
        const mult = PHASE_MULTIPLIERS[m.round] || 1;
        const official = officialResults.knockout[matchId];
        const pred = predictions.knockoutScores && predictions.knockoutScores[matchId];
        if (!official || pred === undefined || pred === null) return;
        if (official.home === "" || official.away === "" || official.home === undefined) return;
        if (pred.home === "" || pred.away === "" || pred.home === undefined) return;

        const oh = parseInt(official.home);
        const oa = parseInt(official.away);
        const ph = parseInt(pred.home);
        const pa = parseInt(pred.away);
        if (isNaN(oh) || isNaN(oa) || isNaN(ph) || isNaN(pa)) return;

        if (ph === oh && pa === oa) {
            // Check exact + penalty winner if draw
            if (oh === oa) {
                if ((official.penaltyWinner || "") === (pred.penaltyWinner || "")) {
                    pts += 5 * mult;
                    exacts++;
                } else {
                    // Score exact but wrong penalty winner → only winner pts
                    pts += 2 * mult;
                    winners++;
                }
            } else {
                pts += 5 * mult;
                exacts++;
            }
        } else {
            // Check winner only
            let oWinner, pWinner;
            if (oh === oa) {
                oWinner = official.penaltyWinner || "";
            } else {
                oWinner = oh > oa ? "home" : "away";
            }
            if (ph === pa) {
                pWinner = pred.penaltyWinner || "";
            } else {
                pWinner = ph > pa ? "home" : "away";
            }
            if (oWinner !== "" && oWinner === pWinner) {
                pts += 2 * mult;
                winners++;
            }
        }
    });

    // --- PREDICCIONES ESPECIALES ---
    const sp = predictions.special || {};
    const osp = officialResults.special || {};
    if (osp.champion && sp.champion && osp.champion === sp.champion) pts += 25;
    if (osp.mvp && sp.mvp) {
        const onorm = normalizeText(osp.mvp);
        const pnorm = normalizeText(sp.mvp);
        if (onorm && pnorm && (onorm.includes(pnorm) || pnorm.includes(onorm))) pts += 15;
    }
    if (osp.scorer && sp.scorer) {
        const onorm = normalizeText(osp.scorer);
        const pnorm = normalizeText(sp.scorer);
        if (onorm && pnorm && (onorm.includes(pnorm) || pnorm.includes(onorm))) pts += 15;
    }
    if (osp.gk && sp.gk) {
        const onorm = normalizeText(osp.gk);
        const pnorm = normalizeText(sp.gk);
        if (onorm && pnorm && (onorm.includes(pnorm) || pnorm.includes(onorm))) pts += 15;
    }

    return { pts, exacts, winners };
}

// Inicialización del panel de administración
function initAdminPanel() {
    loadOfficialResults();

    // Trigger oculto en el footer (5 clics)
    const trigger = document.getElementById("admin-footer-trigger");
    if (trigger) {
        let clickCount = 0;
        trigger.addEventListener("click", () => {
            clickCount++;
            if (clickCount >= 5) {
                clickCount = 0;
                navigateToView("admin");
            }
        });
    }

    // Formulario de autenticación admin
    const adminForm = document.getElementById("admin-login-form");
    if (adminForm) {
        // Verificar si ya estaba autenticado en esta sesión
        if (sessionStorage.getItem("polla_admin_auth") === "true") {
            adminAuthenticated = true;
            showAdminDashboard();
        }

        adminForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const pwd = document.getElementById("admin-password").value;
            const errEl = document.getElementById("admin-login-error");
            if (pwd === ADMIN_PASSWORD) {
                adminAuthenticated = true;
                sessionStorage.setItem("polla_admin_auth", "true");
                // Mostrar botón admin en nav
                const adminBtn = document.getElementById("admin-nav-btn");
                if (adminBtn) adminBtn.style.display = "";
                errEl.style.display = "none";
                showAdminDashboard();
            } else {
                errEl.style.display = "block";
            }
        });
    }

    // Tabs del admin
    document.querySelectorAll(".admin-tab").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const phase = tab.getAttribute("data-admin-phase");
            document.getElementById("admin-phase-groups").style.display = phase === "groups" ? "" : "none";
            document.getElementById("admin-phase-knockout").style.display = phase === "knockout" ? "" : "none";
        });
    });

    // Guardar resultados oficiales
    const btnSaveOfficial = document.getElementById("btn-save-official");
    if (btnSaveOfficial) {
        btnSaveOfficial.addEventListener("click", () => {
            collectOfficialResultsFromUI();
            saveOfficialResults();
            const statusEl = document.getElementById("admin-save-status");
            if (statusEl) {
                statusEl.textContent = "✔ Resultados guardados correctamente";
                setTimeout(() => { statusEl.textContent = ""; }, 3000);
            }
            // Actualizar ranking si está visible
            renderRankingTable();
            showToast("✅ Resultados oficiales guardados");
        });
    }
}

function showAdminDashboard() {
    const gate = document.getElementById("admin-auth-gate");
    const dash = document.getElementById("admin-dashboard");
    if (gate) gate.style.display = "none";
    if (dash) dash.style.display = "";

    // Mostrar botón admin en nav
    const adminBtn = document.getElementById("admin-nav-btn");
    if (adminBtn) adminBtn.style.display = "";

    renderAdminGroupMatches();
    renderAdminKnockoutMatches();
    populateAdminSpecialSelects();
    loadOfficialResultsIntoUI();
}

function populateAdminSpecialSelects() {
    const sel = document.getElementById("official-champion");
    if (!sel) return;
    // Clear existing options except first
    while (sel.options.length > 1) sel.remove(1);
    // Use same TEAMS list from main app
    const sortedTeams = Object.keys(TEAMS).sort((a, b) =>
        TEAMS[a].name.localeCompare(TEAMS[b].name)
    );
    sortedTeams.forEach(code => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = TEAMS[code].name;
        sel.appendChild(opt);
    });
}

function renderAdminGroupMatches() {
    const container = document.getElementById("admin-groups-container");
    if (!container) return;
    container.innerHTML = "";

    GROUP_MATCHES.forEach(m => {
        const homeTeam = TEAMS[m.home] || { name: m.home };
        const awayTeam = TEAMS[m.away] || { name: m.away };
        const result = officialResults.group[m.id] || {};

        const card = document.createElement("div");
        card.className = "admin-match-card" + (result.home !== undefined && result.home !== "" ? " has-result" : "");
        card.dataset.matchId = m.id;
        card.dataset.phase = "group";

        card.innerHTML = `
            <div class="admin-match-meta">
                <span>Partido ${m.id} · Grupo ${m.group}</span>
                <span>${m.date}</span>
            </div>
            <div class="admin-match-teams">
                <span class="admin-match-team">${homeTeam.name}</span>
                <span class="admin-vs-badge">vs</span>
                <span class="admin-match-team">${awayTeam.name}</span>
            </div>
            <div class="admin-score-inputs">
                <input type="number" class="admin-score-input" data-role="home"
                    min="0" max="30" placeholder="-"
                    value="${result.home !== undefined && result.home !== "" ? result.home : ""}">
                <span class="admin-score-dash">—</span>
                <input type="number" class="admin-score-input" data-role="away"
                    min="0" max="30" placeholder="-"
                    value="${result.away !== undefined && result.away !== "" ? result.away : ""}">
            </div>
        `;

        // Auto-update has-result class on input
        card.querySelectorAll(".admin-score-input").forEach(inp => {
            inp.addEventListener("input", () => {
                const h = card.querySelector("[data-role='home']").value;
                const a = card.querySelector("[data-role='away']").value;
                if (h !== "" && a !== "") {
                    card.classList.add("has-result");
                } else {
                    card.classList.remove("has-result");
                }
            });
        });

        container.appendChild(card);
    });
}

function renderAdminKnockoutMatches() {
    const container = document.getElementById("admin-knockout-container");
    if (!container) return;
    container.innerHTML = "";

    const roundLabels = {
        r32: "Dieciseisavos", r16: "Octavos", qf: "Cuartos",
        sf: "Semifinal", third: "3er Puesto", final: "Gran Final"
    };

    Object.keys(KNOCKOUT_MATCHES).forEach(matchId => {
        const m = KNOCKOUT_MATCHES[matchId];
        const result = officialResults.knockout[matchId] || {};
        const homeLabel = m.homePlaceholder || `Equipo ${matchId}A`;
        const awayLabel = m.awayPlaceholder || `Equipo ${matchId}B`;
        const roundLabel = roundLabels[m.round] || m.round;

        const card = document.createElement("div");
        card.className = "admin-match-card" + (result.home !== undefined && result.home !== "" ? " has-result" : "");
        card.dataset.matchId = matchId;
        card.dataset.phase = "knockout";

        // Check if a draw is possible (there's already a result)
        const homeVal = result.home !== undefined && result.home !== "" ? result.home : "";
        const awayVal = result.away !== undefined && result.away !== "" ? result.away : "";
        const isDraw = homeVal !== "" && awayVal !== "" && parseInt(homeVal) === parseInt(awayVal);
        const penWinner = result.penaltyWinner || "";

        card.innerHTML = `
            <div class="admin-match-meta">
                <span>Partido ${matchId} · ${roundLabel}</span>
                <span>${m.date || ""}</span>
            </div>
            <div class="admin-match-teams">
                <span class="admin-match-team" title="${homeLabel}">${homeLabel}</span>
                <span class="admin-vs-badge">vs</span>
                <span class="admin-match-team" title="${awayLabel}">${awayLabel}</span>
            </div>
            <div class="admin-score-inputs">
                <input type="number" class="admin-score-input" data-role="home"
                    min="0" max="30" placeholder="-" value="${homeVal}">
                <span class="admin-score-dash">—</span>
                <input type="number" class="admin-score-input" data-role="away"
                    min="0" max="30" placeholder="-" value="${awayVal}">
            </div>
            <div class="admin-penalty-selector" style="display:${isDraw ? "" : "none"}">
                🎯 Gan. Penales:
                <select class="admin-penalty-select" data-role="penalty">
                    <option value="">-</option>
                    <option value="home" ${penWinner === "home" ? "selected" : ""}>Local</option>
                    <option value="away" ${penWinner === "away" ? "selected" : ""}>Visitante</option>
                </select>
            </div>
        `;

        // Show/hide penalty selector based on draw
        const homeInput = card.querySelector("[data-role='home']");
        const awayInput = card.querySelector("[data-role='away']");
        const penaltyDiv = card.querySelector(".admin-penalty-selector");

        function updatePenaltyVisibility() {
            const h = homeInput.value;
            const a = awayInput.value;
            if (h !== "" && a !== "" && parseInt(h) === parseInt(a)) {
                penaltyDiv.style.display = "";
            } else {
                penaltyDiv.style.display = "none";
            }
            if (h !== "" && a !== "") {
                card.classList.add("has-result");
            } else {
                card.classList.remove("has-result");
            }
        }

        homeInput.addEventListener("input", updatePenaltyVisibility);
        awayInput.addEventListener("input", updatePenaltyVisibility);

        container.appendChild(card);
    });
}

function collectOfficialResultsFromUI() {
    // Group matches
    document.querySelectorAll("#admin-groups-container .admin-match-card").forEach(card => {
        const matchId = parseInt(card.dataset.matchId);
        const homeVal = card.querySelector("[data-role='home']").value;
        const awayVal = card.querySelector("[data-role='away']").value;
        if (homeVal !== "" && awayVal !== "") {
            officialResults.group[matchId] = {
                home: parseInt(homeVal),
                away: parseInt(awayVal)
            };
        } else {
            delete officialResults.group[matchId];
        }
    });

    // Knockout matches
    document.querySelectorAll("#admin-knockout-container .admin-match-card").forEach(card => {
        const matchId = card.dataset.matchId;
        const homeVal = card.querySelector("[data-role='home']").value;
        const awayVal = card.querySelector("[data-role='away']").value;
        if (homeVal !== "" && awayVal !== "") {
            const entry = { home: parseInt(homeVal), away: parseInt(awayVal) };
            const penSel = card.querySelector("[data-role='penalty']");
            if (penSel && penSel.value) {
                entry.penaltyWinner = penSel.value;
            }
            officialResults.knockout[matchId] = entry;
        } else {
            delete officialResults.knockout[matchId];
        }
    });

    // Special results
    const officialChamp = document.getElementById("official-champion");
    const officialMvp = document.getElementById("official-mvp");
    const officialScorer = document.getElementById("official-scorer");
    const officialGk = document.getElementById("official-gk");
    if (officialChamp) officialResults.special.champion = officialChamp.value;
    if (officialMvp) officialResults.special.mvp = officialMvp.value.trim();
    if (officialScorer) officialResults.special.scorer = officialScorer.value.trim();
    if (officialGk) officialResults.special.gk = officialGk.value.trim();
}

function loadOfficialResultsIntoUI() {
    // Special fields
    const offChamp = document.getElementById("official-champion");
    const offMvp = document.getElementById("official-mvp");
    const offScorer = document.getElementById("official-scorer");
    const offGk = document.getElementById("official-gk");
    if (offChamp && officialResults.special.champion) offChamp.value = officialResults.special.champion;
    if (offMvp) offMvp.value = officialResults.special.mvp || "";
    if (offScorer) offScorer.value = officialResults.special.scorer || "";
    if (offGk) offGk.value = officialResults.special.gk || "";
}

