// Seed script to populate Sanity with mock content
// Run with: npx tsx seed.ts

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'bo49wn0o',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN, // Need a write token from sanity.io/manage
  useCdn: false,
})

async function seed() {
  console.log('🌱 Starting seed...')

  // 1. Site Settings
  console.log('📝 Creating site settings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Tomáš Menšík - Reality',
    siteDescription: 'Profesionální realitní služby v Jihlavě a okolí. Prodej, nákup a pronájem nemovitostí.',
    phone: '+420 123 456 789',
    email: 'tomas@mensik-reality.cz',
    instagram: 'https://instagram.com/tomasmensik',
    address: 'Masarykovo náměstí 10, 586 01 Jihlava',
    openingHours: [
      { _key: 'weekdays', days: 'Pondělí – Pátek', hours: '9:00 – 18:00' },
      { _key: 'saturday', days: 'Sobota', hours: 'Po domluvě' },
      { _key: 'sunday', days: 'Neděle', hours: 'Zavřeno' },
    ],
    heroTitle: 'Tomáš Menšík',
    heroSubtitle: 'Pomohu vám najít vysněný domov nebo prodat vaši nemovitost za nejlepší cenu. Profesionální přístup a osobní péče v Jihlavě a okolí.',
  })

  // 2. About
  console.log('👤 Creating about page...')
  await client.createOrReplace({
    _id: 'about',
    _type: 'about',
    name: 'Tomáš Menšík',
    subtitle: 'Váš realitní partner v Jihlavě',
    bio: `Jsem realitní makléř s více než 5 lety zkušeností v oboru. Specializuji se na prodej bytů, rodinných domů a komerčních nemovitostí v Jihlavě a okolí.

Moje práce mě baví, protože mi dává možnost pomáhat lidem najít jejich vysněný domov nebo úspěšně prodat nemovitost za nejlepší cenu. Věřím, že každá transakce by měla být založena na důvěře, profesionalitě a osobním přístupu.

Ve volném čase se věnuji sportu, zejména cyklistice a běhu. Rád poznávám nová místa a trávím čas s rodinou a přáteli.`,
    interests: ['Cyklistika', 'Běh', 'Cestování', 'Rodina'],
    stats: [
      { _key: 'sold', number: '100+', label: 'Prodaných nemovitostí' },
      { _key: 'years', number: '5+', label: 'Let zkušeností' },
      { _key: 'satisfaction', number: '98%', label: 'Spokojených klientů' },
    ],
  })

  // 3. Services
  console.log('🛠️ Creating services...')
  const services = [
    {
      _id: 'service-prodej',
      title: 'Prodej nemovitostí',
      description: 'Komplexní služby při prodeji vaší nemovitosti. Od profesionálního nafocení, přes marketingovou prezentaci až po úspěšné uzavření obchodu.',
      icon: 'home',
      features: [
        'Profesionální fotografie a video',
        'Prezentace na všech realitních portálech',
        'Právní servis a dokumentace',
        'Prohlídky s potenciálními kupci',
        'Vyjednávání nejlepší ceny',
      ],
      order: 1,
    },
    {
      _id: 'service-pronajem',
      title: 'Pronájem nemovitostí',
      description: 'Pomohu vám najít spolehlivého nájemníka nebo pronajmout byt. Zajistím kompletní servis od inzerce po podpis smlouvy.',
      icon: 'key',
      features: [
        'Vyhledání vhodných nájemníků',
        'Prověření solventnosti',
        'Příprava nájemní smlouvy',
        'Předávací protokoly',
        'Správa nemovitosti',
      ],
      order: 2,
    },
    {
      _id: 'service-odhad',
      title: 'Odhad ceny nemovitosti',
      description: 'Přesné ocenění vaší nemovitosti na základě aktuálních tržních dat a znalosti lokálního trhu.',
      icon: 'chart',
      features: [
        'Detailní analýza trhu',
        'Porovnání s obdobnými nemovitostmi',
        'Písemný odhad ceny',
        'Doporučení pro zvýšení hodnoty',
        'Konzultace zdarma',
      ],
      order: 3,
    },
    {
      _id: 'service-poradenstvi',
      title: 'Poradenství',
      description: 'Profesionální poradenství v oblasti nemovitostí. Pomohu vám s rozhodnutím, zda prodat, koupit nebo investovat.',
      icon: 'chat',
      features: [
        'Investiční poradenství',
        'Analýza rentability',
        'Právní konzultace',
        'Hypoteční poradenství',
        'Daňové aspekty prodeje',
      ],
      order: 4,
    },
    {
      _id: 'service-nakup',
      title: 'Nákup nemovitosti',
      description: 'Zastupuji vaše zájmy při nákupu nemovitosti. Pomohu vám najít ideální bydlení a provedu vás celým procesem.',
      icon: 'search',
      features: [
        'Vyhledání dle vašich kritérií',
        'Prohlídky nemovitostí',
        'Due diligence a prověrka',
        'Vyjednávání ceny',
        'Asistence při financování',
      ],
      order: 5,
    },
    {
      _id: 'service-pravni',
      title: 'Právní servis',
      description: 'Spolupracuji s ověřenými právníky, kteří vám zajistí bezpečný průběh celé transakce.',
      icon: 'document',
      features: [
        'Kupní smlouvy',
        'Zástavní smlouvy',
        'Advokátní úschova',
        'Zápis do katastru',
        'Daňové přiznání',
      ],
      order: 6,
    },
  ]

  for (const service of services) {
    await client.createOrReplace({
      ...service,
      _type: 'service',
      features: service.features.map((f, i) => ({ _key: `feature-${i}`, _type: 'string', ...( typeof f === 'string' ? {} : f ) })),
    })
  }

  // 4. Properties for sale
  console.log('🏠 Creating properties for sale...')
  const propertiesForSale = [
    {
      _id: 'property-1',
      title: 'Byt 3+kk v centru Jihlavy',
      slug: { current: 'byt-3kk-jihlava-centrum' },
      status: 'forSale',
      type: 'prodej',
      propertyType: 'byt',
      location: 'Jihlava',
      address: 'Masarykovo náměstí 15, Jihlava',
      price: 4500000,
      area: 78,
      disposition: '3+kk',
      description: `Nabízíme k prodeji prostorný byt 3+kk v samém centru Jihlavy. Byt se nachází v cihlové budově ve 2. patře s výtahem. Celková plocha bytu je 78 m².

Dispozice: vstupní chodba, obývací pokoj s kuchyňským koutem, dva samostatné pokoje, koupelna s vanou a WC. K bytu náleží sklep.

Byt prošel kompletní rekonstrukcí v roce 2020 - nová elektřina, rozvody vody, podlahové vytápění v koupelně, plastová okna. Vytápění zajištěno dálkovým teplem.

Výborná lokalita s veškerou občanskou vybaveností v docházkové vzdálenosti - obchody, restaurace, školy, MHD.`,
      parameters: [
        { _key: 'p1', label: 'Celková plocha', value: '78 m²' },
        { _key: 'p2', label: 'Dispozice', value: '3+kk' },
        { _key: 'p3', label: 'Podlaží', value: '2. patro' },
        { _key: 'p4', label: 'Stav', value: 'Po rekonstrukci' },
        { _key: 'p5', label: 'Typ budovy', value: 'Cihlová' },
        { _key: 'p6', label: 'Výtah', value: 'Ano' },
        { _key: 'p7', label: 'Sklep', value: 'Ano' },
        { _key: 'p8', label: 'Energetická třída', value: 'C' },
      ],
      featured: true,
      order: 1,
    },
    {
      _id: 'property-2',
      title: 'Rodinný dům s garáží',
      slug: { current: 'rodinny-dum-garazi-trest' },
      status: 'forSale',
      type: 'prodej',
      propertyType: 'dum',
      location: 'Třešť',
      address: 'Třešť, okres Jihlava',
      price: 6900000,
      area: 180,
      description: 'Prostorný rodinný dům s garáží a zahradou v klidné lokalitě města Třešť. Dům je po částečné rekonstrukci.',
      parameters: [
        { _key: 'p1', label: 'Celková plocha', value: '180 m²' },
        { _key: 'p2', label: 'Pozemek', value: '650 m²' },
        { _key: 'p3', label: 'Garáž', value: 'Ano' },
        { _key: 'p4', label: 'Stav', value: 'Dobrý' },
      ],
      featured: true,
      order: 2,
    },
    {
      _id: 'property-3',
      title: 'Moderní apartmán',
      slug: { current: 'moderni-apartman-jihlava' },
      status: 'forSale',
      type: 'prodej',
      propertyType: 'byt',
      location: 'Jihlava',
      price: 3200000,
      area: 55,
      disposition: '2+kk',
      description: 'Moderní apartmán v novostavbě s balkonem a parkováním.',
      parameters: [
        { _key: 'p1', label: 'Celková plocha', value: '55 m²' },
        { _key: 'p2', label: 'Dispozice', value: '2+kk' },
        { _key: 'p3', label: 'Balkon', value: 'Ano' },
        { _key: 'p4', label: 'Parkování', value: 'Ano' },
      ],
      featured: true,
      order: 3,
    },
    {
      _id: 'property-4',
      title: 'Byt 2+1 s balkonem',
      slug: { current: 'byt-2-1-balkon' },
      status: 'forSale',
      type: 'prodej',
      propertyType: 'byt',
      location: 'Jihlava',
      price: 2800000,
      area: 62,
      disposition: '2+1',
      description: 'Světlý byt 2+1 s balkonem v klidné lokalitě.',
      parameters: [
        { _key: 'p1', label: 'Celková plocha', value: '62 m²' },
        { _key: 'p2', label: 'Dispozice', value: '2+1' },
        { _key: 'p3', label: 'Balkon', value: 'Ano' },
      ],
      featured: false,
      order: 4,
    },
    {
      _id: 'property-5',
      title: 'Novostavba rodinného domu',
      slug: { current: 'novostavba-rd-polna' },
      status: 'forSale',
      type: 'prodej',
      propertyType: 'dum',
      location: 'Polná',
      price: 8500000,
      area: 210,
      description: 'Luxusní novostavba rodinného domu s dvojgaráží a velkou zahradou.',
      parameters: [
        { _key: 'p1', label: 'Celková plocha', value: '210 m²' },
        { _key: 'p2', label: 'Pozemek', value: '900 m²' },
        { _key: 'p3', label: 'Garáž', value: 'Dvojgaráž' },
        { _key: 'p4', label: 'Stav', value: 'Novostavba' },
      ],
      featured: false,
      order: 5,
    },
    {
      _id: 'property-6',
      title: 'Stavební pozemek',
      slug: { current: 'stavebni-pozemek-jihlava' },
      status: 'forSale',
      type: 'prodej',
      propertyType: 'pozemek',
      location: 'Jihlava - okolí',
      price: 1950000,
      area: 850,
      description: 'Rovinatý stavební pozemek s inženýrskými sítěmi na hranici pozemku.',
      parameters: [
        { _key: 'p1', label: 'Plocha', value: '850 m²' },
        { _key: 'p2', label: 'Inženýrské sítě', value: 'Na hranici' },
        { _key: 'p3', label: 'Příjezd', value: 'Asfaltová cesta' },
      ],
      featured: false,
      order: 6,
    },
  ]

  for (const property of propertiesForSale) {
    await client.createOrReplace({
      ...property,
      _type: 'property',
    })
  }

  // 5. Sold properties
  console.log('✅ Creating sold properties...')
  const soldProperties = [
    {
      _id: 'property-sold-1',
      title: 'Byt 2+1 v klidné lokalitě',
      slug: { current: 'byt-2-1-klidna-lokalita' },
      status: 'sold',
      type: 'prodej',
      propertyType: 'byt',
      location: 'Jihlava',
      price: 2350000,
      area: 58,
      disposition: '2+1',
      order: 1,
    },
    {
      _id: 'property-sold-2',
      title: 'Rodinný dům se zahradou',
      slug: { current: 'rodinny-dum-zahrada-telc' },
      status: 'sold',
      type: 'prodej',
      propertyType: 'dum',
      location: 'Telč',
      price: 5800000,
      area: 145,
      order: 2,
    },
    {
      _id: 'property-sold-3',
      title: 'Byt 4+1 s terasou',
      slug: { current: 'byt-4-1-terasa' },
      status: 'sold',
      type: 'prodej',
      propertyType: 'byt',
      location: 'Jihlava',
      price: 5200000,
      area: 105,
      disposition: '4+1',
      order: 3,
    },
    {
      _id: 'property-sold-4',
      title: 'Komerční prostor',
      slug: { current: 'komercni-prostor-jihlava' },
      status: 'sold',
      type: 'prodej',
      propertyType: 'komercni',
      location: 'Jihlava',
      price: 3900000,
      area: 120,
      order: 4,
    },
    {
      _id: 'property-sold-5',
      title: 'Garsonka po rekonstrukci',
      slug: { current: 'garsonka-rekonstrukce-hb' },
      status: 'sold',
      type: 'prodej',
      propertyType: 'byt',
      location: 'Havlíčkův Brod',
      price: 1650000,
      area: 32,
      order: 5,
    },
    {
      _id: 'property-sold-6',
      title: 'Chalupa v horách',
      slug: { current: 'chalupa-vysocina' },
      status: 'sold',
      type: 'prodej',
      propertyType: 'chata',
      location: 'Vysočina',
      price: 4200000,
      area: 95,
      order: 6,
    },
  ]

  for (const property of soldProperties) {
    await client.createOrReplace({
      ...property,
      _type: 'property',
    })
  }

  // 6. Testimonials
  console.log('💬 Creating testimonials...')
  const testimonials = [
    {
      _id: 'testimonial-1',
      clientName: 'Jana Nováková',
      location: 'Jihlava',
      text: 'S Tomášem jsme prodali náš byt během pouhých 3 týdnů. Jeho profesionální přístup a osobní nasazení předčily naše očekávání. Velmi doporučuji!',
      serviceType: 'prodejBytu',
      date: '2024',
      featured: true,
      order: 1,
    },
    {
      _id: 'testimonial-2',
      clientName: 'Petr a Marie Svobodovi',
      location: 'Třešť',
      text: 'Hledali jsme rodinný dům už přes rok bez úspěchu. Tomáš nám pomohl najít přesně to, co jsme hledali, a celý proces byl díky němu naprosto bezproblémový.',
      serviceType: 'nakupDomu',
      date: '2024',
      featured: true,
      order: 2,
    },
    {
      _id: 'testimonial-3',
      clientName: 'Ing. Martin Horák',
      location: 'Jihlava',
      text: 'Oceňuji především Tomášovu znalost trhu a schopnost správně ocenit nemovitost. Díky tomu jsme dosáhli ceny, kterou jsme původně ani neočekávali.',
      serviceType: 'prodejBytu',
      date: '2023',
      featured: true,
      order: 3,
    },
    {
      _id: 'testimonial-4',
      clientName: 'Lucie Veselá',
      location: 'Polná',
      text: 'Tomáš mi pomohl s prodejem zděděné nemovitosti. Vše vyřídil rychle, profesionálně a vždy byl k dispozici pro mé dotazy. Děkuji!',
      serviceType: 'prodejDomu',
      date: '2023',
      featured: false,
      order: 4,
    },
    {
      _id: 'testimonial-5',
      clientName: 'Rodina Dvořákových',
      location: 'Havlíčkův Brod',
      text: 'Výborná komunikace, transparentní jednání a skvělý výsledek. S Tomášem jsme prodali i koupili nemovitost a vždy to byla příjemná spolupráce.',
      serviceType: 'prodejNakup',
      date: '2023',
      featured: false,
      order: 5,
    },
    {
      _id: 'testimonial-6',
      clientName: 'MUDr. Eva Procházková',
      location: 'Jihlava',
      text: 'Jako lékařka nemám čas řešit realitní záležitosti. Tomáš se o vše postaral a já jsem pouze podepsala smlouvy. Perfektní servis!',
      serviceType: 'prodejBytu',
      date: '2024',
      featured: false,
      order: 6,
    },
  ]

  for (const testimonial of testimonials) {
    await client.createOrReplace({
      ...testimonial,
      _type: 'testimonial',
    })
  }

  console.log('✅ Seed completed successfully!')
  console.log('')
  console.log('Created:')
  console.log('  - 1 Site Settings')
  console.log('  - 1 About page')
  console.log('  - 6 Services')
  console.log('  - 6 Properties for sale')
  console.log('  - 6 Sold properties')
  console.log('  - 6 Testimonials')
}

seed().catch(console.error)
