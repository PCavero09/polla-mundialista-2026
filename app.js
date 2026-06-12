/* ==========================================================================
   Lógica JavaScript: Polla Mundialista FIFA 2026
   ========================================================================== */

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
    knockoutScores: {}   // { matchId: { home: int, away: int, penaltyWinner: string } }
};

// 5. Inicialización de la Aplicación
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    initTabs();
    renderGroupStage();
    calculateAndRenderAll();
    setupGlobalControls();
    initMobileBracketNav();
    setupMobileMenu();
});

// Guardar y Cargar Estado de LocalStorage
function saveState() {
    localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
    showToast("💾 Predicciones guardadas en el navegador");
    updateProgressBar();
}

function loadState() {
    const saved = localStorage.getItem("polla_mundial_2026_state");
    if (saved) {
        try {
            state = JSON.parse(saved);
            if (!state.groupScores) state.groupScores = {};
            if (!state.knockoutScores) state.knockoutScores = {};
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
function renderGroupStage() {
    const container = document.getElementById("groups-container");
    container.innerHTML = "";

    Object.keys(GROUPS).forEach(groupKey => {
        const group = GROUPS[groupKey];
        
        // Crear Tarjeta del Grupo
        const card = document.createElement("div");
        card.className = "group-card glass-panel";
        card.id = `group-card-${groupKey}`;

        // Título del Grupo
        const titleDiv = document.createElement("div");
        titleDiv.className = "group-title";
        titleDiv.innerHTML = `
            <span>${group.name}</span>
            <span class="group-subtitle">${group.sub}</span>
        `;
        card.appendChild(titleDiv);

        // Tabla de Posiciones Interna
        const table = document.createElement("table");
        table.className = "group-table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th class="col-team">Equipo</th>
                    <th title="Puntos">PTS</th>
                    <th title="Partidos Jugados">PJ</th>
                    <th title="Ganados">PG</th>
                    <th title="Empatados">PE</th>
                    <th title="Perdidos">PP</th>
                    <th title="Diferencia de Goles">DG</th>
                </tr>
            </thead>
            <tbody id="group-table-body-${groupKey}">
                <!-- Se poblará en los cálculos -->
            </tbody>
        `;
        card.appendChild(table);

        // Contenedor de Partidos
        const matchesDiv = document.createElement("div");
        matchesDiv.className = "group-matches";

        // Obtener partidos de este grupo
        const matches = GROUP_MATCHES.filter(m => m.group === groupKey);
        matches.forEach(m => {
            const matchItem = document.createElement("div");
            matchItem.className = "match-item";
            
            const teamHome = TEAMS[m.home];
            const teamAway = TEAMS[m.away];

            // Obtener predicciones guardadas si existen
            const pred = state.groupScores[m.id] || { home: "", away: "" };

            matchItem.innerHTML = `
                <div class="match-header-row">
                    <span class="match-date-time">📅 ${m.date} - ${m.time} PE</span>
                    <span class="match-stadium">🏟️ ${m.stadium}</span>
                </div>
                <div class="match-teams-row">
                    <div class="match-team team-home">
                        <span>${teamHome.abbrev}</span>
                        <img class="flag-icon" src="https://flagcdn.com/w40/${teamHome.iso}.png" alt="${teamHome.name}">
                    </div>
                    <div class="match-score-inputs">
                        <input type="number" min="0" class="score-input" data-match-id="${m.id}" data-team="home" value="${pred.home}">
                        <span class="score-divider">-</span>
                        <input type="number" min="0" class="score-input" data-match-id="${m.id}" data-team="away" value="${pred.away}">
                    </div>
                    <div class="match-team team-away">
                        <img class="flag-icon" src="https://flagcdn.com/w40/${teamAway.iso}.png" alt="${teamAway.name}">
                        <span>${teamAway.abbrev}</span>
                    </div>
                </div>
            `;
            matchesDiv.appendChild(matchItem);
        });

        card.appendChild(matchesDiv);
        container.appendChild(card);
    });

    // Escuchar cambios en los marcadores de fase de grupos
    container.addEventListener("input", (e) => {
        if (e.target.classList.contains("score-input")) {
            const matchId = parseInt(e.target.getAttribute("data-match-id"));
            const teamType = e.target.getAttribute("data-team");
            const val = e.target.value;

            if (!state.groupScores[matchId]) {
                state.groupScores[matchId] = { home: "", away: "" };
            }
            
            state.groupScores[matchId][teamType] = val !== "" ? parseInt(val) : "";

            // Guardado automático silencioso y recálculo
            calculateAndRenderAll();
            localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
            updateProgressBar();
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

        // Header de la Tarjeta del Partido
        let headerLabel = `Partido ${matchId}`;
        if (m.round === "third") headerLabel = "Tercer Puesto";
        if (m.round === "final") headerLabel = "Gran Final";

        card.innerHTML = `
            <div class="match-card-header">
                <span>${headerLabel}</span>
                <span>${m.date} - ${m.time} PE - ${m.stadium}</span>
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
            localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
        }
    }
});

// 11. Controles Globales (Guardar, Reiniciar, Exportar, Importar)
function setupGlobalControls() {
    // Botón Guardar
    document.getElementById("btn-save").addEventListener("click", () => {
        saveState();
    });

    // Botón Reiniciar
    document.getElementById("btn-reset").addEventListener("click", () => {
        if (confirm("⚠️ ¿Estás seguro de que deseas reiniciar toda tu polla? Se perderán todos tus marcadores.")) {
            state = { groupScores: {}, knockoutScores: {} };
            localStorage.removeItem("polla_mundial_2026_state");
            
            // Recargar interfaz
            renderGroupStage();
            calculateAndRenderAll();
            showToast("🔄 Polla reiniciada con éxito");
        }
    });

    // Botón Exportar (Descargar JSON)
    document.getElementById("btn-share").addEventListener("click", () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "polla_mundial_2026_predicciones.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        showToast("📤 Archivo de predicciones exportado");
    });

    // Botón Importar (Cargar archivo JSON)
    const fileInput = document.getElementById("import-file");
    document.getElementById("btn-import").addEventListener("click", () => {
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
                        knockoutScores: importedState.knockoutScores || {}
                    };
                    localStorage.setItem("polla_mundial_2026_state", JSON.stringify(state));
                    
                    // Recargar e informar
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
        // Reset del input para poder volver a cargar el mismo archivo
        fileInput.value = "";
    });
}

// Navegador de Rondas para Móviles (Bracket Nav Bar)
function initMobileBracketNav() {
    const navBar = document.querySelector(".bracket-nav-bar");
    const btns = document.querySelectorAll(".bracket-nav-btn");
    const scroller = document.getElementById("bracket-scroller");

    if (!navBar || !scroller) return;

    // Sincronizar clicks de botones para scrollear horizontalmente
    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            btns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const roundClass = btn.getAttribute("data-round");
            const targetCol = scroller.querySelector(`.bracket-column.${roundClass}`);
            if (targetCol) {
                // Hacer scroll suave en móviles
                scroller.scrollTo({
                    left: targetCol.offsetLeft - 16,
                    behavior: "smooth"
                });
            }
        });
    });

    // Detectar scroll horizontal del bracket para activar el botón correspondiente
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
            // Encontrar la clase que corresponde al data-round
            let roundClass = "";
            if (activeCol.classList.contains("round-32")) roundClass = "round-32";
            else if (activeCol.classList.contains("round-16")) roundClass = "round-16";
            else if (activeCol.classList.contains("quarterfinals")) roundClass = "quarterfinals";
            else if (activeCol.classList.contains("semifinals")) roundClass = "semifinals";
            else if (activeCol.classList.contains("finals")) roundClass = "finals";
            else if (activeCol.classList.contains("champion-column")) roundClass = "finals"; // Agrupar con final si se desea

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

    // Abrir/Cerrar al hacer clic en el botón de acciones
    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener("click", () => {
        dropdown.classList.remove("show");
    });

    // Evitar que el clic en el dropdown se propague y lo cierre antes de tiempo
    dropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Vincular botones móviles con los botones principales correspondientes
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
