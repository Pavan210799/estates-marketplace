export function photo(id, width = 1800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;
}

const p = photo;

export const galleries = {
  marine: [
    p("photo-1600607687939-ce8a6c25118c"),
    p("photo-1600210492486-724fe5c67fb0"),
    p("photo-1600566753086-00f18fb6b3ea"),
    p("photo-1600566752355-35792bedcfea"),
  ],
  pali: [
    p("photo-1512917774080-9991f1c4c750"),
    p("photo-1600566753190-17f0baa2a6c3"),
    p("photo-1600210492493-0946911123ea"),
    p("photo-1600121848594-d8644e57abab"),
  ],
  juhu: [
    p("photo-1613490493576-7fde63acd811"),
    p("photo-1600596542815-ffad4c1539a9"),
    p("photo-1582268611958-ebfd161ef9cf"),
    p("photo-1600585154340-be6161a56a0c"),
  ],
  office: [
    p("photo-1497366216548-37526070297c"),
    p("photo-1497366811353-6870744d04b2"),
    p("photo-1486406146926-c627a92ad1ab"),
    p("photo-1497215728101-856f4ea42174"),
  ],
  carter: [
    p("photo-1560448204-e02f11c3d0e2"),
    p("photo-1502672260266-1c1ef2d93688"),
    p("photo-1493809842364-78817add7ffb"),
    p("photo-1560185127-6ed189bf02f4"),
  ],
  vasant: [
    p("photo-1564013799919-ab600027ffc6"),
    p("photo-1570129477492-45c003edd2be"),
    p("photo-1600585154526-990dced4db0d"),
    p("photo-1560185007-cde436f6a4d0"),
  ],
  gk: [
    p("photo-1522708323590-d24dbb6b0267"),
    p("photo-1560448204-603b3fc33ddc"),
    p("photo-1502005229762-cf1b2da7c5d6"),
    p("photo-1556912173-46c336c7fd55"),
  ],
  golf: [
    p("photo-1512915922686-57c11dde9b6b"),
    p("photo-1600607687939-ce8a6c25118c"),
    p("photo-1600210492493-0946911123ea"),
    p("photo-1600566752355-35792bedcfea"),
  ],
  indira: [
    p("photo-1600596542815-ffad4c1539a9"),
    p("photo-1605276374104-dee2a0ed3cd6"),
    p("photo-1600489000022-c2086d79f9d4"),
    p("photo-1631679706909-1844bbd07221"),
  ],
  whitefield: [
    p("photo-1600585153490-76fb20a32601"),
    p("photo-1523217582562-09d0def993a6"),
    p("photo-1484154218962-a197022b5858"),
    p("photo-1554995207-c18c203602cb"),
  ],
  indiraRent: [
    p("photo-1502672260266-1c1ef2d93688"),
    p("photo-1560185127-6ed189bf02f4"),
    p("photo-1493809842364-78817add7ffb"),
    p("photo-1522708323590-d24dbb6b0267"),
  ],
  jubilee: [
    p("photo-1600047509358-9dc75507daeb"),
    p("photo-1600573472592-401b489a3cdc"),
    p("photo-1600607687920-4e2a09cf159d"),
    p("photo-1618221195710-dd6b41faaea6"),
  ],
  banjara: [
    p("photo-1616486338812-3dadae4b4ace"),
    p("photo-1600566753190-17f0baa2a6c3"),
    p("photo-1598928506311-c55ded91a20c"),
    p("photo-1560184897-ae75f418493e"),
  ],
  boat: [
    p("photo-1580587771525-78b9dba3b914"),
    p("photo-1600210491892-03d54c0aaf87"),
    p("photo-1572120360610-d971b9d7767c"),
    p("photo-1552321554-5fefe8c9ef14"),
  ],
  adyar: [
    p("photo-1493809842364-78817add7ffb"),
    p("photo-1560448204-e02f11c3d0e2"),
    p("photo-1556912173-46c336c7fd55"),
    p("photo-1502672260266-1c1ef2d93688"),
  ],
  koregaon: [
    p("photo-1600596542815-ffad4c1539a9"),
    p("photo-1600596542815-ffad4c1539a9"),
    p("photo-1600585154340-be6161a56a0c"),
    p("photo-1600566753086-00f18fb6b3ea"),
  ],
  baner: [
    p("photo-1560448204-603b3fc33ddc"),
    p("photo-1522708323590-d24dbb6b0267"),
    p("photo-1484154218962-a197022b5858"),
    p("photo-1560185127-6ed189bf02f4"),
  ],
  alipore: [
    p("photo-1600121848594-d8644e57abab"),
    p("photo-1616594039964-ae9021a400a0"),
    p("photo-1616137466211-f939a420be84"),
    p("photo-1599423300746-b62533397364"),
  ],
  jaipur: [
    p("photo-1618221195710-dd6b41faaea6"),
    p("photo-1600489000022-c2086d79f9d4"),
    p("photo-1552321554-5fefe8c9ef14"),
    p("photo-1600210492486-724fe5c67fb0"),
  ],
  goa: [
    p("photo-1613977257363-707ba9348227"),
    p("photo-1571896349842-33c89424de2d"),
    p("photo-1582268611958-ebfd161ef9cf"),
    p("photo-1540541338287-41700207dee6"),
  ],
  ahmedabad: [
    p("photo-1600585154526-990dced4db0d"),
    p("photo-1600566753190-17f0baa2a6c3"),
    p("photo-1554995207-c18c203602cb"),
    p("photo-1560185007-cde436f6a4d0"),
  ],
};

export const heroImage = photo("photo-1600210492486-724fe5c67fb0", 2200);

export const agentAvatars = {
  "ananya-sharma": photo("photo-1573496359142-b8d87734a5a2", 800),
  "rohan-mehta": photo("photo-1492562080023-ab3db95bfbce", 800),
  "priya-iyer": photo("photo-1544005313-94ddf0286df2", 800),
  "vikram-reddy": photo("photo-1519085360753-af0119f7cbe7", 800),
  "meera-krishnan": photo("photo-1567532939604-b6b5b0db2604", 800),
  "kabir-malhotra": photo("photo-1607990281513-2c110a25bd8c", 800),
  "estates-desk": photo("photo-1600880292203-757bb62b4baf", 800),
};

export const familyPhotos = {
  "Neelam Kulkarni": photo("photo-1484665754804-74b091211472", 1000),
  "Raghav Bansal": photo("photo-1609220136736-443140cffec6", 1000),
  "Aditi Menon": photo("photo-1511895426328-dc8714191300", 1000),
  "Farhan Qureshi": photo("photo-1475503572774-15a45e5d60b9", 1000),
};

export const landingStills = {
  collection: photo("photo-1600585154340-be6161a56a0c", 1600),
  steps: photo("photo-1600607687644-c7171b42498f", 1600),
  owners: photo("photo-1613977257363-707ba9348227", 1600),
  listingsBanner: photo("photo-1600566753190-17f0baa2a6c3", 2000),
};

export const imagePresets = [
  { id: "apartment", label: "Apartment interiors", images: galleries.carter },
  { id: "villa", label: "Villa and garden", images: galleries.juhu },
  { id: "house", label: "Independent house", images: galleries.vasant },
  { id: "commercial", label: "Commercial floor", images: galleries.office },
];
