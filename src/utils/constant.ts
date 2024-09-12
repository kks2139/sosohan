export const isDev = process.env.NODE_ENV === "development";

export const apiOrigin = isDev
  ? "http://localhost:3000"
  : "https://sosohan.vercel.app";

export type ScrapTarget =
  | "HANA_TOUR"
  | "INTER_PARK"
  | "ONLINE_TOUR"
  | "MODE_TOUR";

export const targetToKorean: Record<ScrapTarget, string> = {
  HANA_TOUR: "하나투어",
  INTER_PARK: "인터파크",
  ONLINE_TOUR: "온라인투어",
  MODE_TOUR: "모드투어",
};

export type AreaCode =
  | "ICN"
  | "KOJ"
  | "NGO"
  | "TAK"
  | "MYJ"
  | "KMI"
  | "HSG"
  | "FSZ"
  | "KIX"
  | "OKA"
  | "UBJ"
  | "FUK"
  | "CTS"
  | "NRT"
  | "KLO"
  | "CXR"
  | "DAD"
  | "DLI"
  | "MNL"
  | "TAG"
  | "VTE"
  | "CEB"
  | "SIN"
  | "SAI"
  | "CNX"
  | "CRK"
  | "PQC"
  | "KLO"
  | "CXR"
  | "DAD"
  | "DLI"
  | "MNL"
  | "TAG"
  | "VTE"
  | "CEB"
  | "SIN"
  | "SAI"
  | "CNX"
  | "CRK"
  | "PQC"
  | "HKT"
  | "PNH"
  | "HAN"
  | "HPH"
  | "SGN"
  | "BKK"
  | "DMK"
  | "BKI"
  | "GUM"
  | "BNE"
  | "SPN"
  | "SYD"
  | "FCO"
  | "LIS"
  | "BCN"
  | "VCE"
  | "VNO"
  | "ESB"
  | "IST"
  | "ZAG"
  | "ZRH"
  | "CPH"
  | "CDG"
  | "PRG"
  | "DXB"
  | "AUH"
  | "CAI"
  | "TNA"
  | "KHH"
  | "MFM"
  | "PEK"
  | "TSA"
  | "YNJ"
  | "UBN"
  | "DYG"
  | "RMQ"
  | "TPE"
  | "HKG"
  | "TXN"
  | "JFK";

export type NationType =
  | "KOREA"
  | "JAPAN"
  | "SOUTH_EAST_ASIA"
  | "SOUTH_PACIFIC"
  | "EUROPE"
  | "CHINA"
  | "USA";

export const nations: NationType[] = [
  "KOREA",
  "JAPAN",
  "SOUTH_EAST_ASIA",
  "SOUTH_PACIFIC",
  "EUROPE",
  "CHINA",
  "USA",
];

export const nationToKorea: Record<NationType, string> = {
  KOREA: "대한민국",
  JAPAN: "일본",
  SOUTH_EAST_ASIA: "동남아시아",
  SOUTH_PACIFIC: "남태평양",
  EUROPE: "유럽",
  CHINA: "중국",
  USA: "미국",
};

export const nationAreaMap: Record<NationType, AreaCode[]> = {
  KOREA: ['ICN'],
  JAPAN: [
    "KOJ",
    "NGO",
    "TAK",
    "MYJ",
    "KMI",
    "HSG",
    "FSZ",
    "KIX",
    "OKA",
    "UBJ",
    "FUK",
    "CTS",
    "NRT",
  ],
  SOUTH_EAST_ASIA: [
    "KLO",
    "CXR",
    "DAD",
    "DLI",
    "MNL",
    "TAG",
    "VTE",
    "CEB",
    "SIN",
    "SAI",
    "CNX",
    "CRK",
    "PQC",
    "HKT",
    "PNH",
    "HAN",
    "HPH",
    "SGN",
    "BKK",
    "DMK",
    "BKI",
  ],
  SOUTH_PACIFIC: ["GUM", "BNE", "SPN", "SYD"],
  EUROPE: [
    "FCO",
    "LIS",
    "BCN",
    "VCE",
    "VNO",
    "ESB",
    "IST",
    "ZAG",
    "ZRH",
    "CPH",
    "CDG",
    "PRG",
    "DXB",
    "AUH",
    "CAI",
  ],
  CHINA: [
    "TNA",
    "KHH",
    "MFM",
    "PEK",
    "TSA",
    "YNJ",
    "UBN",
    "DYG",
    "RMQ",
    "TPE",
    "HKG",
    "TXN",
  ],
  USA: ["JFK"],
};

export const areaCodeToKorean: Record<AreaCode, string> = {
  // 대한민국
  ICN: '인천',
  // 일본
  KOJ: "가고시마",
  NGO: "나고야",
  TAK: "다카마츠",
  MYJ: "마츠야마",
  KMI: "미야자키",
  HSG: "사가",
  FSZ: "시즈오카",
  KIX: "오사카",
  OKA: "오키나와",
  UBJ: "우베",
  FUK: "후쿠오카",
  CTS: "삿포르(치토세)",
  NRT: "도쿄(나리타)",
  // 동남아
  KLO: "보라카이",
  CXR: "나트랑",
  DAD: "다낭",
  DLI: "달랏",
  MNL: "마닐라",
  TAG: "보홀팡라오",
  VTE: "비엔티엔",
  CEB: "세부",
  SIN: "싱가포르",
  SAI: "씨엠립",
  CNX: "치앙마이",
  CRK: "클락",
  PQC: "푸꾸옥",
  HKT: "푸켓",
  PNH: "프놈펜",
  HAN: "하노이",
  HPH: "하이퐁",
  SGN: "호치민",
  BKK: "방콕(수완나폼)",
  DMK: "방콕(돈므앙)",
  BKI: "코타키나발루",
  // 남태평양
  GUM: "괌",
  BNE: "브리즈번",
  SPN: "사이판",
  SYD: "시드니",
  // 유럽
  FCO: "로마",
  LIS: "리스본",
  BCN: "바르셀로나",
  VCE: "베니스",
  VNO: "빌니우스",
  ESB: "앙카라",
  IST: "이스탄불",
  ZAG: "자그레브",
  ZRH: "취리히",
  CPH: "코펜하겐",
  CDG: "파리",
  PRG: "프라하",
  DXB: "두바이",
  AUH: "아부다비",
  CAI: "카이로",
  // 중국
  TNA: "제남",
  KHH: "가오슝",
  MFM: "마카오",
  PEK: "베이징",
  TSA: "송산",
  YNJ: "연길",
  UBN: "울란바타르",
  DYG: "장가계",
  RMQ: "타이중",
  TPE: "타이페이",
  HKG: "홍콩",
  TXN: "황산",
  // 미국
  JFK: "뉴욕",
};
