import { Seeder } from "typeorm-extension";
import { DataSource } from "typeorm";
import { CountryEntity } from "../../src/common/entities/country.entity";


export class CountrySeeder implements Seeder {
  async run(dataSource: DataSource): Promise<any> {
    const repository = dataSource.getRepository(CountryEntity);

    const regs = [
      {
        id: 1,
        name: "Afganistán",
        demonym: "AFGANA",
        alpha_code: "AFG"
      },
      {
        id: 2,
        name: "Albania",
        demonym: "ALBANESA",
        alpha_code: "ALB"
      },
      {
        id: 3,
        name: "Alemania",
        demonym: "ALEMANA",
        alpha_code: "DEU"
      },
      {
        id: 4,
        name: "Andorra",
        demonym: "ANDORRANA",
        alpha_code: "AND"
      },
      {
        id: 5,
        name: "Angola",
        demonym: "ANGOLEÑA",
        alpha_code: "AGO"
      },
      {
        id: 6,
        name: "AntiguayBarbuda",
        demonym: "ANTIGUANA",
        alpha_code: "ATG"
      },
      {
        id: 7,
        name: "ArabiaSaudita",
        demonym: "SAUDÍ",
        alpha_code: "SAU"
      },
      {
        id: 8,
        name: "Argelia",
        demonym: "ARGELINA",
        alpha_code: "DZA"
      },
      {
        id: 9,
        name: "Argentina",
        demonym: "ARGENTINA",
        alpha_code: "ARG"
      },
      {
        id: 10,
        name: "Armenia",
        demonym: "ARMENIA",
        alpha_code: "ARM"
      },
      {
        id: 11,
        name: "Aruba",
        demonym: "ARUBEÑA",
        alpha_code: "ABW"
      },
      {
        id: 12,
        name: "Australia",
        demonym: "AUSTRALIANA",
        alpha_code: "AUS"
      },
      {
        id: 13,
        name: "Austria",
        demonym: "AUSTRIACA",
        alpha_code: "AUT"
      },
      {
        id: 14,
        name: "Azerbaiyán",
        demonym: "AZERBAIYANA",
        alpha_code: "AZE"
      },
      {
        id: 15,
        name: "Bahamas",
        demonym: "BAHAMEÑA",
        alpha_code: "BHS"
      },
      {
        id: 16,
        name: "Bangladés",
        demonym: "BANGLADESÍ",
        alpha_code: "BGD"
      },
      {
        id: 17,
        name: "Barbados",
        demonym: "BARBADENSE",
        alpha_code: "BRB"
      },
      {
        id: 18,
        name: "Baréin",
        demonym: "BAREINÍ",
        alpha_code: "BHR"
      },
      {
        id: 19,
        name: "Bélgica",
        demonym: "BELGA",
        alpha_code: "BEL"
      },
      {
        id: 20,
        name: "Belice",
        demonym: "BELICEÑA",
        alpha_code: "BLZ"
      },
      {
        id: 21,
        name: "Benín",
        demonym: "BENINÉSA",
        alpha_code: "BEN"
      },
      {
        id: 22,
        name: "Bielorrusia",
        demonym: "BIELORRUSA",
        alpha_code: "BLR"
      },
      {
        id: 23,
        name: "Birmania",
        demonym: "BIRMANA",
        alpha_code: "MMR"
      },
      {
        id: 24,
        name: "Bolivia",
        demonym: "BOLIVIANA",
        alpha_code: "BOL"
      },
      {
        id: 25,
        name: "BosniayHerzegovina",
        demonym: "BOSNIA",
        alpha_code: "BIH"
      },
      {
        id: 26,
        name: "Botsuana",
        demonym: "BOTSUANA",
        alpha_code: "BWA"
      },
      {
        id: 27,
        name: "Brasil",
        demonym: "BRASILEÑA",
        alpha_code: "BRA"
      },
      {
        id: 28,
        name: "Brunéi",
        demonym: "BRUNEANA",
        alpha_code: "BRN"
      },
      {
        id: 29,
        name: "Bulgaria",
        demonym: "BÚLGARA",
        alpha_code: "BGR"
      },
      {
        id: 30,
        name: "BurkinaFaso",
        demonym: "BURKINÉS",
        alpha_code: "BFA"
      },
      {
        id: 31,
        name: "Burundi",
        demonym: "BURUNDÉSA",
        alpha_code: "BDI"
      },
      {
        id: 32,
        name: "Bután",
        demonym: "BUTANÉSA",
        alpha_code: "BTN"
      },
      {
        id: 33,
        name: "CaboVerde",
        demonym: "CABOVERDIANA",
        alpha_code: "CPV"
      },
      {
        id: 34,
        name: "Camboya",
        demonym: "CAMBOYANA",
        alpha_code: "KHM"
      },
      {
        id: 35,
        name: "Camerún",
        demonym: "CAMERUNESA",
        alpha_code: "CMR"
      },
      {
        id: 36,
        name: "Canadá",
        demonym: "CANADIENSE",
        alpha_code: "CAN"
      },
      {
        id: 37,
        name: "Catar",
        demonym: "CATARÍ",
        alpha_code: "QAT"
      },
      {
        id: 38,
        name: "Chad",
        demonym: "CHADIANA",
        alpha_code: "TCD"
      },
      {
        id: 39,
        name: "Chile",
        demonym: "CHILENA",
        alpha_code: "CHL"
      },
      {
        id: 40,
        name: "China",
        demonym: "CHINA",
        alpha_code: "CHN"
      },
      {
        id: 41,
        name: "Chipre",
        demonym: "CHIPRIOTA",
        alpha_code: "CYP"
      },
      {
        id: 42,
        name: "CiudaddelVaticano",
        demonym: "VATICANA",
        alpha_code: "VAT"
      },
      {
        id: 43,
        name: "Colombia",
        demonym: "COLOMBIANA",
        alpha_code: "COL"
      },
      {
        id: 44,
        name: "Comoras",
        demonym: "COMORENSE",
        alpha_code: "COM"
      },
      {
        id: 45,
        name: "CoreadelNorte",
        demonym: "NORCOREANA",
        alpha_code: "PRK"
      },
      {
        id: 46,
        name: "CoreadelSur",
        demonym: "SURCOREANA",
        alpha_code: "KOR"
      },
      {
        id: 47,
        name: "CostadeMarfil",
        demonym: "MARFILEÑA",
        alpha_code: "CIV"
      },
      {
        id: 48,
        name: "CostaRica",
        demonym: "COSTARRICENSE",
        alpha_code: "CRI"
      },
      {
        id: 49,
        name: "Croacia",
        demonym: "CROATA",
        alpha_code: "HRV"
      },
      {
        id: 50,
        name: "Cuba",
        demonym: "CUBANA",
        alpha_code: "CUB"
      },
      {
        id: 51,
        name: "Dinamarca",
        demonym: "DANÉSA",
        alpha_code: "DNK"
      },
      {
        id: 52,
        name: "Dominica",
        demonym: "DOMINIQUÉS",
        alpha_code: "DMA"
      },
      {
        id: 53,
        name: "Ecuador",
        demonym: "ECUATORIANA",
        alpha_code: "ECU"
      },
      {
        id: 54,
        name: "Egipto",
        demonym: "EGIPCIA",
        alpha_code: "EGY"
      },
      {
        id: 55,
        name: "ElSalvador",
        demonym: "SALVADOREÑA",
        alpha_code: "SLV"
      },
      {
        id: 56,
        name: "EmiratosÁrabesUnidos",
        demonym: "EMIRATÍ",
        alpha_code: "ARE"
      },
      {
        id: 57,
        name: "Eritrea",
        demonym: "ERITREA",
        alpha_code: "ERI"
      },
      {
        id: 58,
        name: "Eslovaquia",
        demonym: "ESLOVACA",
        alpha_code: "SVK"
      },
      {
        id: 59,
        name: "Eslovenia",
        demonym: "ESLOVENA",
        alpha_code: "SVN"
      },
      {
        id: 60,
        name: "España",
        demonym: "ESPAÑOLA",
        alpha_code: "ESP"
      },
      {
        id: 61,
        name: "EstadosUnidos",
        demonym: "ESTADOUNIDENSE",
        alpha_code: "USA"
      },
      {
        id: 62,
        name: "Estonia",
        demonym: "ESTONIA",
        alpha_code: "EST"
      },
      {
        id: 63,
        name: "Etiopía",
        demonym: "ETÍOPE",
        alpha_code: "ETH"
      },
      {
        id: 64,
        name: "Filipinas",
        demonym: "FILIPINA",
        alpha_code: "PHL"
      },
      {
        id: 65,
        name: "Finlandia",
        demonym: "FINLANDÉSA",
        alpha_code: "FIN"
      },
      {
        id: 66,
        name: "Fiyi",
        demonym: "FIYIANA",
        alpha_code: "FJI"
      },
      {
        id: 67,
        name: "Francia",
        demonym: "FRANCÉSA",
        alpha_code: "FRA"
      },
      {
        id: 68,
        name: "Gabón",
        demonym: "GABONÉSA",
        alpha_code: "GAB"
      },
      {
        id: 69,
        name: "Gambia",
        demonym: "GAMBIANA",
        alpha_code: "GMB"
      },
      {
        id: 70,
        name: "Georgia",
        demonym: "GEORGIANA",
        alpha_code: "GEO"
      },
      {
        id: 71,
        name: "Gibraltar",
        demonym: "GIBRALTAREÑA",
        alpha_code: "GIB"
      },
      {
        id: 72,
        name: "Ghana",
        demonym: "GHANÉSA",
        alpha_code: "GHA"
      },
      {
        id: 73,
        name: "Granada",
        demonym: "GRANADINA",
        alpha_code: "GRD"
      },
      {
        id: 74,
        name: "Grecia",
        demonym: "GRIEGA",
        alpha_code: "GRC"
      },
      {
        id: 75,
        name: "Groenlandia",
        demonym: "GROENLANDÉSA",
        alpha_code: "GRL"
      },
      {
        id: 76,
        name: "Guatemala",
        demonym: "GUATEMALTECA",
        alpha_code: "GTM"
      },
      {
        id: 77,
        name: "Guineaecuatorial",
        demonym: "ECUATOGUINEANA",
        alpha_code: "GNQ"
      },
      {
        id: 78,
        name: "Guinea",
        demonym: "GUINEANA",
        alpha_code: "GIN"
      },
      {
        id: 79,
        name: "Guinea-Bisáu",
        demonym: "GUINEANA",
        alpha_code: "GNB"
      },
      {
        id: 80,
        name: "Guyana",
        demonym: "GUYANESA",
        alpha_code: "GUY"
      },
      {
        id: 81,
        name: "Haití",
        demonym: "HAITIANA",
        alpha_code: "HTI"
      },
      {
        id: 82,
        name: "Honduras",
        demonym: "HONDUREÑA",
        alpha_code: "HND"
      },
      {
        id: 83,
        name: "Hungría",
        demonym: "HÚNGARA",
        alpha_code: "HUN"
      },
      {
        id: 84,
        name: "India",
        demonym: "HINDÚ",
        alpha_code: "IND"
      },
      {
        id: 85,
        name: "Indonesia",
        demonym: "INDONESIA",
        alpha_code: "IDN"
      },
      {
        id: 86,
        name: "Irak",
        demonym: "IRAQUÍ",
        alpha_code: "IRQ"
      },
      {
        id: 87,
        name: "Irán",
        demonym: "IRANÍ",
        alpha_code: "IRN"
      },
      {
        id: 88,
        name: "Irlanda",
        demonym: "IRLANDÉSA",
        alpha_code: "IRL"
      },
      {
        id: 89,
        name: "Islandia",
        demonym: "ISLANDÉSA",
        alpha_code: "ISL"
      },
      {
        id: 90,
        name: "IslasCook",
        demonym: "COOKIANA",
        alpha_code: "COK"
      },
      {
        id: 91,
        name: "IslasMarshall",
        demonym: "MARSHALÉSA",
        alpha_code: "MHL"
      },
      {
        id: 92,
        name: "IslasSalomón",
        demonym: "SALOMONENSE",
        alpha_code: "SLB"
      },
      {
        id: 93,
        name: "Israel",
        demonym: "ISRAELÍ",
        alpha_code: "ISR"
      },
      {
        id: 94,
        name: "Italia",
        demonym: "ITALIANA",
        alpha_code: "ITA"
      },
      {
        id: 95,
        name: "Jamaica",
        demonym: "JAMAIQUINA",
        alpha_code: "JAM"
      },
      {
        id: 96,
        name: "Japón",
        demonym: "JAPONÉSA",
        alpha_code: "JPN"
      },
      {
        id: 97,
        name: "Jordania",
        demonym: "JORDANA",
        alpha_code: "JOR"
      },
      {
        id: 98,
        name: "Kazajistán",
        demonym: "KAZAJA",
        alpha_code: "KAZ"
      },
      {
        id: 99,
        name: "Kenia",
        demonym: "KENIATA",
        alpha_code: "KEN"
      },
      {
        id: 100,
        name: "Kirguistán",
        demonym: "KIRGUISA",
        alpha_code: "KGZ"
      },
      {
        id: 101,
        name: "Kiribati",
        demonym: "KIRIBATIANA",
        alpha_code: "KIR"
      },
      {
        id: 102,
        name: "Kuwait",
        demonym: "KUWAITÍ",
        alpha_code: "KWT"
      },
      {
        id: 103,
        name: "Laos",
        demonym: "LAOSIANA",
        alpha_code: "LAO"
      },
      {
        id: 104,
        name: "Lesoto",
        demonym: "LESOTENSE",
        alpha_code: "LSO"
      },
      {
        id: 105,
        name: "Letonia",
        demonym: "LETÓNA",
        alpha_code: "LVA"
      },
      {
        id: 106,
        name: "Líbano",
        demonym: "LIBANÉSA",
        alpha_code: "LBN"
      },
      {
        id: 107,
        name: "Liberia",
        demonym: "LIBERIANA",
        alpha_code: "LBR"
      },
      {
        id: 108,
        name: "Libia",
        demonym: "LIBIA",
        alpha_code: "LBY"
      },
      {
        id: 109,
        name: "Liechtenstein",
        demonym: "LIECHTENSTEINIANA",
        alpha_code: "LIE"
      },
      {
        id: 110,
        name: "Lituania",
        demonym: "LITUANA",
        alpha_code: "LTU"
      },
      {
        id: 111,
        name: "Luxemburgo",
        demonym: "LUXEMBURGUÉSA",
        alpha_code: "LUX"
      },
      {
        id: 112,
        name: "Madagascar",
        demonym: "MALGACHE",
        alpha_code: "MDG"
      },
      {
        id: 113,
        name: "Malasia",
        demonym: "MALASIA",
        alpha_code: "MYS"
      },
      {
        id: 114,
        name: "Malaui",
        demonym: "MALAUÍ",
        alpha_code: "MWI"
      },
      {
        id: 115,
        name: "Maldivas",
        demonym: "MALDIVA",
        alpha_code: "MDV"
      },
      {
        id: 116,
        name: "Malí",
        demonym: "MALIENSE",
        alpha_code: "MLI"
      },
      {
        id: 117,
        name: "Malta",
        demonym: "MALTÉSA",
        alpha_code: "MLT"
      },
      {
        id: 118,
        name: "Marruecos",
        demonym: "MARROQUÍ",
        alpha_code: "MAR"
      },
      {
        id: 119,
        name: "Martinica",
        demonym: "MARTINIQUÉS",
        alpha_code: "MTQ"
      },
      {
        id: 120,
        name: "Mauricio",
        demonym: "MAURICIANA",
        alpha_code: "MUS"
      },
      {
        id: 121,
        name: "Mauritania",
        demonym: "MAURITANA",
        alpha_code: "MRT"
      },
      {
        id: 122,
        name: "México",
        demonym: "MEXICANA",
        alpha_code: "MEX"
      },
      {
        id: 123,
        name: "Micronesia",
        demonym: "MICRONESIA",
        alpha_code: "FSM"
      },
      {
        id: 124,
        name: "Moldavia",
        demonym: "MOLDAVA",
        alpha_code: "MDA"
      },
      {
        id: 125,
        name: "Mónaco",
        demonym: "MONEGASCA",
        alpha_code: "MCO"
      },
      {
        id: 126,
        name: "Mongolia",
        demonym: "MONGOLA",
        alpha_code: "MNG"
      },
      {
        id: 127,
        name: "Montenegro",
        demonym: "MONTENEGRINA",
        alpha_code: "MNE"
      },
      {
        id: 128,
        name: "Mozambique",
        demonym: "MOZAMBIQUEÑA",
        alpha_code: "MOZ"
      },
      {
        id: 129,
        name: "Namibia",
        demonym: "NAMIBIA",
        alpha_code: "NAM"
      },
      {
        id: 130,
        name: "Nauru",
        demonym: "NAURUANA",
        alpha_code: "NRU"
      },
      {
        id: 131,
        name: "Nepal",
        demonym: "NEPALÍ",
        alpha_code: "NPL"
      },
      {
        id: 132,
        name: "Nicaragua",
        demonym: "NICARAGÜENSE",
        alpha_code: "NIC"
      },
      {
        id: 133,
        name: "Níger",
        demonym: "NIGERINA",
        alpha_code: "NER"
      },
      {
        id: 134,
        name: "Nigeria",
        demonym: "NIGERIANA",
        alpha_code: "NGA"
      },
      {
        id: 135,
        name: "Noruega",
        demonym: "NORUEGA",
        alpha_code: "NOR"
      },
      {
        id: 136,
        name: "NuevaZelanda",
        demonym: "NEOZELANDÉSA",
        alpha_code: "NZL"
      },
      {
        id: 137,
        name: "Omán",
        demonym: "OMANÍ",
        alpha_code: "OMN"
      },
      {
        id: 138,
        name: "PaísesBajos",
        demonym: "NEERLANDÉSA",
        alpha_code: "NLD"
      },
      {
        id: 139,
        name: "Pakistán",
        demonym: "PAKISTANÍ",
        alpha_code: "PAK"
      },
      {
        id: 140,
        name: "Palaos",
        demonym: "PALAUANA",
        alpha_code: "PLW"
      },
      {
        id: 141,
        name: "Palestina",
        demonym: "PALESTINA",
        alpha_code: "PSE"
      },
      {
        id: 142,
        name: "Panamá",
        demonym: "PANAMEÑA",
        alpha_code: "PAN"
      },
      {
        id: 143,
        name: "PapúaNuevaGuinea",
        demonym: "PAPÚ",
        alpha_code: "PNG"
      },
      {
        id: 144,
        name: "Paraguay",
        demonym: "PARAGUAYA",
        alpha_code: "PRY"
      },
      {
        id: 145,
        name: "Perú",
        demonym: "PERUANA",
        alpha_code: "PER"
      },
      {
        id: 146,
        name: "Polonia",
        demonym: "POLACA",
        alpha_code: "POL"
      },
      {
        id: 147,
        name: "Portugal",
        demonym: "PORTUGUÉSA",
        alpha_code: "PRT"
      },
      {
        id: 148,
        name: "PuertoRico",
        demonym: "PUERTORRIQUEÑA",
        alpha_code: "PRI"
      },
      {
        id: 149,
        name: "ReinoUnido",
        demonym: "BRITÁNICA",
        alpha_code: "GBR"
      },
      {
        id: 150,
        name: "RepúblicaCentroafricana",
        demonym: "CENTROAFRICANA",
        alpha_code: "CAF"
      },
      {
        id: 151,
        name: "RepúblicaCheca",
        demonym: "CHECA",
        alpha_code: "CZE"
      },
      {
        id: 152,
        name: "RepúblicadeMacedonia",
        demonym: "MACEDONIA",
        alpha_code: "MKD"
      },
      {
        id: 153,
        name: "RepúblicadelCongo",
        demonym: "CONGOLEÑA",
        alpha_code: "COG"
      },
      {
        id: 154,
        name: "RepúblicaDemocráticadelCongo",
        demonym: "CONGOLEÑA",
        alpha_code: "COD"
      },
      {
        id: 155,
        name: "RepúblicaDominicana",
        demonym: "DOMINICANA",
        alpha_code: "DOM"
      },
      {
        id: 156,
        name: "RepúblicaSudafricana",
        demonym: "SUDAFRICANA",
        alpha_code: "ZAF"
      },
      {
        id: 157,
        name: "Ruanda",
        demonym: "RUANDÉSA",
        alpha_code: "RWA"
      },
      {
        id: 158,
        name: "Rumanía",
        demonym: "RUMANA",
        alpha_code: "ROU"
      },
      {
        id: 159,
        name: "Rusia",
        demonym: "RUSA",
        alpha_code: "RUS"
      },
      {
        id: 160,
        name: "Samoa",
        demonym: "SAMOANA",
        alpha_code: "WSM"
      },
      {
        id: 161,
        name: "SanCristóbalyNieves",
        demonym: "CRISTOBALEÑA",
        alpha_code: "KNA"
      },
      {
        id: 162,
        name: "SanMarino",
        demonym: "SANMARINENSE",
        alpha_code: "SMR"
      },
      {
        id: 163,
        name: "SanVicenteylasGranadinas",
        demonym: "SANVICENTINA",
        alpha_code: "VCT"
      },
      {
        id: 164,
        name: "SantaLucía",
        demonym: "SANTALUCENSE",
        alpha_code: "LCA"
      },
      {
        id: 165,
        name: "SantoToméyPríncipe",
        demonym: "SANTOTOMENSE",
        alpha_code: "STP"
      },
      {
        id: 166,
        name: "Senegal",
        demonym: "SENEGALÉSA",
        alpha_code: "SEN"
      },
      {
        id: 167,
        name: "Serbia",
        demonym: "SERBIA",
        alpha_code: "SRB"
      },
      {
        id: 168,
        name: "Seychelles",
        demonym: "SEYCHELLENSE",
        alpha_code: "SYC"
      },
      {
        id: 169,
        name: "SierraLeona",
        demonym: "SIERRALEONÉSA",
        alpha_code: "SLE"
      },
      {
        id: 170,
        name: "Singapur",
        demonym: "SINGAPURENSE",
        alpha_code: "SGP"
      },
      {
        id: 171,
        name: "Siria",
        demonym: "SIRIA",
        alpha_code: "SYR"
      },
      {
        id: 172,
        name: "Somalia",
        demonym: "SOMALÍ",
        alpha_code: "SOM"
      },
      {
        id: 173,
        name: "SriLanka",
        demonym: "CEILANÉSA",
        alpha_code: "LKA"
      },
      {
        id: 174,
        name: "Suazilandia",
        demonym: "SUAZI",
        alpha_code: "SWZ"
      },
      {
        id: 175,
        name: "SudándelSur",
        demonym: "SURSUDANÉSA",
        alpha_code: "SSD"
      },
      {
        id: 176,
        name: "Sudán",
        demonym: "SUDANÉSA",
        alpha_code: "SDN"
      },
      {
        id: 177,
        name: "Suecia",
        demonym: "SUECA",
        alpha_code: "SWE"
      },
      {
        id: 178,
        name: "Suiza",
        demonym: "SUIZA",
        alpha_code: "CHE"
      },
      {
        id: 179,
        name: "Surinam",
        demonym: "SURINAMESA",
        alpha_code: "SUR"
      },
      {
        id: 180,
        name: "Tailandia",
        demonym: "TAILANDÉSA",
        alpha_code: "THA"
      },
      {
        id: 181,
        name: "Tanzania",
        demonym: "TANZANA",
        alpha_code: "TZA"
      },
      {
        id: 182,
        name: "Tayikistán",
        demonym: "TAYIKA",
        alpha_code: "TJK"
      },
      {
        id: 183,
        name: "TimorOriental",
        demonym: "TIMORENSE",
        alpha_code: "TLS"
      },
      {
        id: 184,
        name: "Togo",
        demonym: "TOGOLÉSA",
        alpha_code: "TGO"
      },
      {
        id: 185,
        name: "Tonga",
        demonym: "TONGANA",
        alpha_code: "TON"
      },
      {
        id: 186,
        name: "TrinidadyTobago",
        demonym: "TRINITENSE",
        alpha_code: "TTO"
      },
      {
        id: 187,
        name: "Túnez",
        demonym: "TUNECINA",
        alpha_code: "TUN"
      },
      {
        id: 188,
        name: "Turkmenistán",
        demonym: "TURCOMANA",
        alpha_code: "TKM"
      },
      {
        id: 189,
        name: "Turquía",
        demonym: "TURCA",
        alpha_code: "TUR"
      },
      {
        id: 190,
        name: "Tuvalu",
        demonym: "TUVALUANA",
        alpha_code: "TUV"
      },
      {
        id: 191,
        name: "Ucrania",
        demonym: "UCRANIANA",
        alpha_code: "UKR"
      },
      {
        id: 192,
        name: "Uganda",
        demonym: "UGANDÉSA",
        alpha_code: "UGA"
      },
      {
        id: 193,
        name: "Uruguay",
        demonym: "URUGUAYA",
        alpha_code: "URY"
      },
      {
        id: 194,
        name: "Uzbekistán",
        demonym: "UZBEKA",
        alpha_code: "UZB"
      },
      {
        id: 195,
        name: "Vanuatu",
        demonym: "VANUATUENSE",
        alpha_code: "VUT"
      },
      {
        id: 196,
        name: "Venezuela",
        demonym: "VENEZOLANA",
        alpha_code: "VEN"
      },
      {
        id: 197,
        name: "Vietnam",
        demonym: "VIETNAMITA",
        alpha_code: "VNM"
      },
      {
        id: 198,
        name: "Yemen",
        demonym: "YEMENÍ",
        alpha_code: "YEM"
      },
      {
        id: 199,
        name: "Yibuti",
        demonym: "YIBUTIANA",
        alpha_code: "DJI"
      },
      {
        id: 200,
        name: "Zambia",
        demonym: "ZAMBIANA",
        alpha_code: "ZMB"
      },
      {
        id: 201,
        name: "Zimbabue",
        demonym: "ZIMBABUENSE",
        alpha_code: "ZWE"
      }
    ];

    for (const data of regs) {
      const country = await repository.findOneBy({ id: data.id });

      if (!country) {
        await repository.insert([data]);
      }
    }
  }
}
