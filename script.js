/**
 * WasteWise – Smart Waste Management Platform
 * Environmental Studies College Project
 * 
 * Features:
 * 1. Comprehensive Waste Classifier (36 Items, Synonyms, Categorization)
 * 2. Drag & Drop Segregation Challenge Game (With Web Audio synthesis)
 * 3. Personal Waste Tracker (LocalStorage persistence, Donut Chart, Ranking)
 * 4. Environmental Impact Calculator (Mathematical estimation model)
 * 5. Upcycling & DIY Creative Hub
 * 6. Environmental Studies Quiz (10 Questions with Scientific Explanations)
 * 7. Daily Eco-Challenges & Streak Tracking
 */

// ============================================================================
// 1. DATASET: 36 EVERYDAY HOUSEHOLD WASTE ITEMS
// ============================================================================

const WASTE_DATABASE = [
  {
    id: "banana-peel",
    name: "Banana Peel",
    icon: "🍌",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Wet Waste)",
    aliases: ["banana", "fruit peel", "plantain", "fruit skin"],
    material: "Organic Plant Matter",
    instructions: "Discard directly into your green wet-waste bin or backyard compost bin. Do not bag in plastic.",
    canReuseRecycle: "Yes – Excellent for home composting or natural garden fertilizer rich in potassium.",
    environmentalImpact: "If sent to landfills, rots anaerobically and produces methane gas (CH₄). Composting turns it into nutrient-dense humus.",
    practicalTip: "Soak peels in water for 48 hours to make potassium-rich liquid tea fertilizer for your houseplants!"
  },
  {
    id: "plastic-bottle",
    name: "Plastic Water / Soda Bottle (PET)",
    icon: "🧴",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["water bottle", "pet bottle", "coke bottle", "soda bottle", "mineral water"],
    material: "Polyethylene Terephthalate (PET / Resin Code 1)",
    instructions: "Empty all liquid, rinse lightly with water, crush to save space, and screw the cap back on before placing in the blue bin.",
    canReuseRecycle: "Yes – 100% recyclable into polyester clothing yarn, tote bags, or new bottles.",
    environmentalImpact: "Takes over 450 years to break down into harmful microplastics if discarded in nature.",
    practicalTip: "Cut the top third off and invert it to build a self-watering indoor herb planter!"
  },
  {
    id: "battery-alkaline",
    name: "Household AA / AAA Battery",
    icon: "🔋",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / E-Waste",
    aliases: ["battery", "pencil cell", "duracell", "alkaline battery", "torch cell", "rechargeable battery"],
    material: "Zinc-Manganese / Heavy Metal Electrolytes",
    instructions: "Tape both positive and negative terminals with transparent tape to prevent accidental electrical sparks. Keep in a dry jar for special hazardous/e-waste drives.",
    canReuseRecycle: "Specialized recycling only – Heavy metals (zinc, steel, manganese) are recovered by certified processors.",
    environmentalImpact: "Corrodes in municipal landfills, releasing caustic potassium hydroxide and heavy metals that leach into drinking water tables.",
    practicalTip: "Switch to rechargeable NiMH batteries to eliminate dozens of single-use batteries per year."
  },
  {
    id: "cardboard-box",
    name: "Corrugated Cardboard Box",
    icon: "📦",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["cardboard", "amazon box", "shipping box", "carton", "packing box"],
    material: "Unbleached Kraft Paper Fiber",
    instructions: "Remove shipping tape and plastic address labels, flatten completely to maximize storage volume, and keep dry.",
    canReuseRecycle: "Yes – Cardboard can be re-pulped and recycled up to 5 to 7 times.",
    environmentalImpact: "Recycling 1 tonne of cardboard saves 17 trees, 7,000 gallons of clean water, and 4,000 kWh of electricity.",
    practicalTip: "Use shredded clean cardboard as the carbon-rich 'brown' layer in your home compost pile to balance wet food scraps."
  },
  {
    id: "newspaper",
    name: "Newspaper & Magazines",
    icon: "📰",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["newspaper", "paper", "magazine", "gazette", "newsprint", "pamphlet"],
    material: "Cellulose Pulp & Soy/Petroleum Ink",
    instructions: "Bundle and tie with natural twine. Keep dry and protected from grease, moisture, and rain.",
    canReuseRecycle: "Yes – Recycled into egg cartons, tissue paper, cellulose insulation, and fresh newsprint.",
    environmentalImpact: "Manufacturing paper from recycled newsprint requires 40% less energy than producing it from virgin timber.",
    practicalTip: "Use old newspaper sheets for streak-free cleaning of window panes and mirrors, or as zero-plastic drawer liners."
  },
  {
    id: "broken-glass",
    name: "Glass Bottle / Broken Glass Jar",
    icon: "🥛",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["glass", "broken glass", "glass bottle", "jam jar", "beer bottle", "wine bottle"],
    material: "Silica Soda-Lime Glass",
    instructions: "Rinse glass jars clean. If broken into sharp shards, wrap securely in heavy newspaper or a cardboard carton and label 'SHARP GLASS' for sanitation worker safety.",
    canReuseRecycle: "Yes – Glass can be melted down and recycled an infinite number of times with zero loss in quality or purity.",
    environmentalImpact: "Cullet (crushed recycled glass) melts at lower temperatures than raw silica sand, slashing greenhouse emissions by 20%.",
    practicalTip: "Clean glass jars make charming pantry containers for lentils, spices, overnight oats, or table vases."
  },
  {
    id: "expired-medicine",
    name: "Expired Medicines & Syrups",
    icon: "💊",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / Biomedical Waste",
    aliases: ["medicine", "tablets", "pills", "syrup", "capsules", "pharma", "antibiotics"],
    material: "Active Pharmaceutical Ingredients (APIs)",
    instructions: "Never flush down the toilet or sink! Drop off at authorized pharmacy take-back dropboxes or municipal domestic hazardous waste points.",
    canReuseRecycle: "No – Requires high-temperature incineration at authorized biomedical incinerators.",
    environmentalImpact: "Flushed pharmaceuticals bypass wastewater treatment plants, accumulating in rivers, harming fish biology, and fostering antibiotic resistance.",
    practicalTip: "Keep unused medicine blisters organized and check expiration dates biannually before buying duplicates."
  },
  {
    id: "soiled-pizza-box",
    name: "Greasy Pizza Box",
    icon: "🍕",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Non-Recyclable",
    aliases: ["pizza box", "greasy box", "oily cardboard", "food carton"],
    material: "Oil-Contaminated Paperboard",
    instructions: "Tear the box in half: If the top lid is completely clean, place it in the Blue Recyclable Bin. Put the grease-soaked base in the Black Residual Bin (or tear into small bits for compost).",
    canReuseRecycle: "No (greasy portion) – Cooking oils and grease cannot be separated during the water-based paper pulping process.",
    environmentalImpact: "One oily box can contaminate an entire 500 kg batch of clean paper recycling at the processing plant.",
    practicalTip: "Ask pizza outlets to place parchment grease liners underneath the crust so the box itself stays clean and recyclable!"
  },
  {
    id: "tea-bags",
    name: "Tea Bags & Spent Tea Leaves",
    icon: "🫖",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Wet Waste)",
    aliases: ["tea bag", "tea leaves", "chai patti", "herbal tea"],
    material: "Organic Tea Leaves & Cellulose/Plastic Mesh",
    instructions: "Check if the bag contains plastic/nylon fibers. If unsure, cut the bag open, compost the internal wet tea leaves in the green bin, and discard the mesh bag.",
    canReuseRecycle: "Yes (the tea leaves) – Enriches soil with nitrogen and improves aeration.",
    environmentalImpact: "Loose tea leaves decompose completely within 2-4 weeks, turning into rich garden fertilizer.",
    practicalTip: "Sprinkle brewed tea leaves around acid-loving plants like roses, tomatoes, and ferns."
  },
  {
    id: "styrofoam-box",
    name: "Styrofoam Container (Polystyrene EPS)",
    icon: "🥡",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Non-Recyclable",
    aliases: ["styrofoam", "thermocol", "takeout container", "foam box", "polystyrene"],
    material: "Expanded Polystyrene (EPS / Resin Code 6)",
    instructions: "Wipe off food crumbs and discard in the Black Residual bin. Keep intact so it doesn't crumble into microscopic beads.",
    canReuseRecycle: "Extremely difficult – Most municipal recycling facilities cannot process EPS because it is 95% air and easily contaminated.",
    environmentalImpact: "Persists in nature for 500+ years and easily breaks apart into toxic beads consumed by marine animals.",
    practicalTip: "Refuse single-use foam containers when dining out; carry your own stainless steel tiffin container."
  },
  {
    id: "aluminum-can",
    name: "Aluminum Beverage Can",
    icon: "🥫",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["soda can", "tin can", "beer can", "coke can", "aluminum can"],
    material: "Pure Aluminum Metal",
    instructions: "Empty all drink residues, rinse quickly, and crush to save space before tossing in the blue bin.",
    canReuseRecycle: "Yes – Aluminum is the recycling superstar! It can be recycled infinitely with no degradation in strength.",
    environmentalImpact: "Recycling 1 aluminum can saves enough energy to run a television set for 3 hours compared to mining bauxite ore.",
    practicalTip: "A recycled beverage can can be back on the supermarket shelf as a brand new can in as little as 60 days."
  },
  {
    id: "milk-pouch",
    name: "Milk Pouch (LDPE Plastic)",
    icon: "🥛",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["milk pouch", "milk packet", "polythene milk bag", "milk sachet"],
    material: "Low-Density Polyethylene (LDPE / Resin Code 4)",
    instructions: "Cut only a small corner, don't detach the tiny tip completely (to prevent microplastic litter). Rinse thoroughly with water, let it air dry, and collect in a dry bag for recycling.",
    canReuseRecycle: "Yes – When clean and dry, LDPE is melted into plastic pellets for pipes, garbage bags, and park benches.",
    environmentalImpact: "Unwashed milk packets spoil and smell, causing entire plastic recycling bales to be rejected and sent to dumps.",
    practicalTip: "Never cut the corner completely off—keep the small triangular tip attached to the main body so it doesn't become micro-litter."
  },
  {
    id: "egg-shells",
    name: "Eggshells",
    icon: "🥚",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Wet Waste)",
    aliases: ["eggshell", "egg shells", "egg waste"],
    material: "Calcium Carbonate (CaCO₃) & Organic Membrane",
    instructions: "Crush lightly with your fingers and toss directly into your compost pile or green wet bin.",
    canReuseRecycle: "Yes – 100% natural organic soil booster.",
    environmentalImpact: "Adds bio-available calcium to soil, preventing blossom end rot in home-grown vegetables.",
    practicalTip: "Dry eggshells, grind them in a blender into fine powder, and mix into potting soil for healthy tomato plants."
  },
  {
    id: "cfl-bulb",
    name: "CFL & Fluorescent Tube Light",
    icon: "💡",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / E-Waste",
    aliases: ["cfl", "tube light", "fluorescent bulb", "bulb", "light bulb"],
    material: "Mercury Vapor & Phosphor-Coated Glass",
    instructions: "Handle gently without breaking. Wrap in bubble wrap or place in a cardboard sleeve. Submit to certified hazardous e-waste collection.",
    canReuseRecycle: "Specialized hazardous handling – Mercury is distilled under vacuum and glass is recycled.",
    environmentalImpact: "Contains approximately 4 mg of elemental mercury vapor, capable of contaminating 20,000 liters of potable water.",
    practicalTip: "Upgrade to energy-efficient LED bulbs which do not contain toxic mercury and last up to 5 times longer."
  },
  {
    id: "old-cotton-clothes",
    name: "Old Cotton Clothes / Rags",
    icon: "👕",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable / Textile Reuse",
    aliases: ["clothes", "t-shirt", "fabric", "textile", "rags", "jeans", "garment"],
    material: "Natural Cotton Fiber",
    instructions: "If wearable, donate to charity. If torn and frayed, clean, dry, and place with dry recyclables/textiles or repurpose at home.",
    canReuseRecycle: "Yes – Can be shredded into industrial cleaning rags, thermal insulation, or handmade paper.",
    environmentalImpact: "Making a single new cotton shirt requires 2,700 liters of freshwater—enough for one person to drink for 900 days.",
    practicalTip: "Cut worn-out cotton t-shirts into 30cm squares to replace disposable paper towels in the kitchen."
  },
  {
    id: "sanitary-pad",
    name: "Sanitary Pad & Diaper",
    icon: "🧻",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Sanitary Waste",
    aliases: ["sanitary pad", "diaper", "tampon", "sanitary napkin", "wet wipe"],
    material: "Super Absorbent Polymer (SAP), Polyethylene, Bleached Pulp",
    instructions: "Wrap securely in several layers of old newspaper or disposal pouch. Mark with a red dot if required locally, and place in the Black Residual bin.",
    canReuseRecycle: "No – Non-recyclable bio-medical municipal waste. Must be sent to controlled sanitary incineration.",
    environmentalImpact: "A single disposable pad takes 500 to 800 years to decompose due to plastic waterproof backings.",
    practicalTip: "Explore reusable silicone menstrual cups or biodegradable bamboo-fiber pads to dramatically eliminate monthly waste."
  },
  {
    id: "smartphone-charger",
    name: "Damaged Phone Charger & Cables",
    icon: "🔌",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / E-Waste",
    aliases: ["charger", "phone charger", "usb cable", "cord", "adapter", "wire"],
    material: "Copper Wiring, PVC Insulation, Silicon Semiconductors",
    instructions: "Bundle cable with a twist tie. Drop off at certified electronic waste (e-waste) collection bins at electronics retail stores.",
    canReuseRecycle: "Yes – Smelters extract copper, silver, and high-grade plastics.",
    environmentalImpact: "Open burning of PVC insulation by informal scavengers releases toxic carcinogenic dioxins and furans into air.",
    practicalTip: "Wrap spring from an old ballpoint pen around cable ends to prevent fraying and prolong cord lifespan."
  },
  {
    id: "tetra-pak",
    name: "Juice / Milk Tetra Pak Carton",
    icon: "🧃",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["tetra pak", "juice carton", "soymilk carton", "aseptic carton"],
    material: "75% Paperboard, 20% Polyethylene, 5% Aluminum Foil",
    instructions: "Flatten the carton, push the attached straw/cap inside, rinse out sticky syrup, and place in the blue recyclable bin.",
    canReuseRecycle: "Yes – Hydro-pulpers separate high-grade paper fiber for stationary; polymer-aluminum mix is pressed into roofing sheets.",
    environmentalImpact: "Recycling aseptic cartons prevents deforestation and diverts multi-material packaging from landfills.",
    practicalTip: "Cut the bottom half of a washed carton to make a sturdy waterproof desk organizer for pens and scissors."
  },
  {
    id: "coffee-grounds",
    name: "Brewed Coffee Grounds",
    icon: "☕",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Wet Waste)",
    aliases: ["coffee grounds", "coffee waste", "espresso puck"],
    material: "Organic Coffee Seed Matter",
    instructions: "Add straight to your wet waste bin, worm bin, or compost pile.",
    canReuseRecycle: "Yes – Ideal soil conditioner, natural insect repellent, and rich compost ingredient.",
    environmentalImpact: "Diverting coffee grounds keeps rich organic matter active in the carbon cycle.",
    practicalTip: "Place dried coffee grounds in an open bowl in your refrigerator to absorb and neutralize lingering food odors."
  },
  {
    id: "chip-packet",
    name: "Multi-Layered Chip / Snack Wrapper",
    icon: "🥨",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Non-Recyclable",
    aliases: ["chip packet", "lays packet", "biscuit wrapper", "snack wrapper", "metallized film"],
    material: "Multi-Layered Plastic (MLP) with Metallized Aluminum Film",
    instructions: "Ensure empty of food crumbs, fold tightly, and place in the Black Residual bin.",
    canReuseRecycle: "Very difficult – The thin bonded layers of plastic and metal cannot be separated economically.",
    environmentalImpact: "Lightweight and windborne; one of the most prevalent litter items choking city storm drains and water bodies.",
    practicalTip: "Pack homemade roasted snacks in reusable stainless containers to cut out single-use snack wrappers entirely."
  },
  {
    id: "aerosol-spray-can",
    name: "Deodorant / Insecticide Aerosol Can",
    icon: "🧴",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / Pressurized Waste",
    aliases: ["aerosol", "spray can", "deodorant spray", "hit spray", "spray paint"],
    material: "Steel / Aluminum & Liquefied Petroleum Propellant",
    instructions: "Ensure can is completely empty by spraying in a well-ventilated area until no sound is heard. Do NOT puncture or heat. Place in hazardous stream.",
    canReuseRecycle: "Metal can be recycled once thoroughly depressurized and certified safe.",
    environmentalImpact: "Can explode violently in waste compactor trucks or landfill fires if still pressurized with flammable propellant.",
    practicalTip: "Switch to roll-on deodorants or solid balms to avoid hydrocarbon propellant emissions."
  },
  {
    id: "wet-wipes",
    name: "Baby / Disinfectant Wet Wipes",
    icon: "🧻",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Non-Flushable",
    aliases: ["wet wipe", "baby wipe", "makeup wipe", "tissue wipe"],
    material: "Polyester / Polypropylene Plastic Non-Woven Fibers",
    instructions: "NEVER flush down toilets! Dispose of in the Black Residual Waste bin.",
    canReuseRecycle: "No – Non-recyclable and contains synthetic plastic polymers.",
    environmentalImpact: "Does not disintegrate like toilet paper. Clumps with cooking grease to form massive 'fatbergs' that clog city sewer pipes.",
    practicalTip: "Use washable cotton face washcloths with micellar water instead of single-use disposable wipes."
  },
  {
    id: "dry-leaves",
    name: "Fallen Garden Leaves & Twigs",
    icon: "🍂",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Garden Waste)",
    aliases: ["leaves", "garden waste", "twigs", "dry leaves", "grass clippings"],
    material: "Lignocellulosic Plant Biomass",
    instructions: "Collect in garden bags or compost directly. Never burn fallen leaves on streets!",
    canReuseRecycle: "Yes – The ultimate carbon ingredient ('browns') for rich garden compost and soil mulch.",
    environmentalImpact: "Open leaf burning releases dangerous PM2.5 particulates, carbon monoxide, and carcinogenic polycyclic aromatic hydrocarbons into residential air.",
    practicalTip: "Spread dry leaves around tree bases as natural organic mulch to suppress weeds and retain soil moisture."
  },
  {
    id: "printer-cartridge",
    name: "Empty Printer Ink / Toner Cartridge",
    icon: "🖨️",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / E-Waste",
    aliases: ["ink cartridge", "printer toner", "ink", "toner"],
    material: "Engineering Plastics, Fine Toner Powder (Carbon & Polymers), Microchips",
    instructions: "Place in original plastic bag so carbon powder doesn't spill. Return to manufacturer take-back kiosks or certified e-waste recyclers.",
    canReuseRecycle: "Yes – Professional refilling or complete industrial disassembling and plastic polymer recovery.",
    environmentalImpact: "Fine toner dust poses inhalation risks, and plastic casings take hundreds of years to decompose in dumps.",
    practicalTip: "Refill cartridges 2 to 3 times at reputable cartridge refill stations rather than buying brand new cartridges."
  },
  {
    id: "bubble-wrap",
    name: "Plastic Bubble Wrap Packaging",
    icon: "🫧",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["bubble wrap", "air pillows", "packaging plastic", "cushioning"],
    material: "Low-Density Polyethylene Film (LDPE)",
    instructions: "Pop bubbles or leave intact; keep clean and dry. Check if local centers accept plastic films with grocery bags.",
    canReuseRecycle: "Yes – Highly reusable at home for mailing fragile packages or moving house.",
    environmentalImpact: "Very lightweight plastic films can entangle recycling sorting machinery gears if not collected in dedicated film streams.",
    practicalTip: "Save bubble wrap in a closet bag to wrap delicate holiday decorations or reuse when mailing gifts to friends."
  },
  {
    id: "plastic-cutlery",
    name: "Disposable Plastic Spoon & Fork",
    icon: "🍴",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Single-Use Plastic",
    aliases: ["plastic spoon", "plastic fork", "disposable cutlery", "plastic knife"],
    material: "Polystyrene (PS) or Polypropylene (PP)",
    instructions: "Wipe clean and discard in the Black Residual bin.",
    canReuseRecycle: "Rarely recycled – Small size, low weight, and food residue make automated sorting machines drop them into reject chutes.",
    environmentalImpact: "Used for an average of 12 minutes, then remains on Earth for centuries.",
    practicalTip: "Keep a portable travel pouch containing a stainless steel spoon and fork in your backpack or purse."
  },
  {
    id: "expired-cosmetics",
    name: "Old Nail Polish & Perfume Bottle",
    icon: "💅",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / Chemical Waste",
    aliases: ["nail polish", "perfume", "cosmetics", "acetone", "nail paint"],
    material: "Volatile Organic Solvents (Ethyl Acetate, Toluene, Formaldehyde) & Glass",
    instructions: "Do not pour down the drain! Seal tightly and place in household hazardous drop-off.",
    canReuseRecycle: "No – Flammable chemical hazard prevents standard glass recycling.",
    environmentalImpact: "Toxic solvents evaporate into smog-forming VOCs or disrupt biological sewer treatment plants.",
    practicalTip: "Use leftover colored nail polish to color-code similar-looking house keys or seal frayed shoelace tips."
  },
  {
    id: "coconut-shell",
    name: "Coconut Shell & Coir Fiber",
    icon: "🥥",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Wet/Garden Waste)",
    aliases: ["coconut shell", "coir", "nariyal shell", "coconut husk"],
    material: "Dense Organic Lignin & Cellulose",
    instructions: "Toss into the green bin or dry for outdoor garden mulching. Can be broken into pieces to speed decomposition.",
    canReuseRecycle: "Yes – Naturally compostable or craftable into bowls, cups, and soap dishes.",
    environmentalImpact: "100% renewable plant material. Replaces petroleum-based plastic planters and charcoal.",
    practicalTip: "Sand down the edges of an empty coconut half, drill a drainage hole in the bottom, and use it as a rustic succulent bowl!"
  },
  {
    id: "thermal-receipt",
    name: "Thermal Cash Register Receipt",
    icon: "🧾",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Contaminated Paper",
    aliases: ["receipt", "bill", "thermal paper", "atm slip", "supermarket bill"],
    material: "Paper coated with Bisphenol A (BPA) or BPS chemical color developers",
    instructions: "Discard in the Black Residual bin. NEVER put with clean recyclable paper.",
    canReuseRecycle: "No – Chemical BPA coatings contaminate recycled paper batches and can be absorbed through the skin.",
    environmentalImpact: "Recycling thermal receipts spreads endocrine-disrupting BPA into recycled toilet paper and paper towels.",
    practicalTip: "Opt for digital SMS or email receipts whenever stores offer the option."
  },
  {
    id: "vegetable-scraps",
    name: "Kitchen Vegetable & Onion Peels",
    icon: "🥕",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Wet Waste)",
    aliases: ["vegetable scraps", "onion peel", "potato skin", "carrot peel", "kitchen scraps"],
    material: "Raw Organic Plant Waste",
    instructions: "Place in green wet bin or backyard composter. Keep free of rubber bands or plastic stickers.",
    canReuseRecycle: "Yes – The cornerstone of high-nitrogen compost production.",
    environmentalImpact: "Generates zero net fossil carbon when composted aerobically; returns vital nutrients back into topsoil.",
    practicalTip: "Freeze clean carrot, celery, and onion scraps in a bag. Boil them once full to create delicious, free homemade vegetable broth!"
  },
  {
    id: "broken-mirror",
    name: "Broken Mirror / Window Glass",
    icon: "🪞",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Non-Container Glass",
    aliases: ["mirror", "window glass", "broken mirror", "pane glass"],
    material: "Treated Plate Glass with Silver Nitrate / Chemical Backing",
    instructions: "Carefully wrap in thick cardboard, tape securely, and label 'SHARP GLASS' before placing in the Black bin.",
    canReuseRecycle: "No – Has a different melting point and chemical formulation than container glass bottles (soda-lime).",
    environmentalImpact: "Mixing window/mirror glass with bottle cullet ruins entire recycling glass furnace melting batches.",
    practicalTip: "Small mirror fragments can be repurposed into creative mosaic wall art or garden stepping stones with plaster of Paris."
  },
  {
    id: "paint-can",
    name: "Leftover Household Paint Can",
    icon: "🎨",
    category: "hazardous",
    binColor: "Red",
    binName: "Hazardous / Chemical Waste",
    aliases: ["paint", "paint can", "varnish", "primer", "enamel"],
    material: "Synthetic Resins, Solvents, Heavy Metal Pigments",
    instructions: "If small paint residue remains, let it dry open until rock solid, then check local rules. If liquid paint remains, take to hazardous disposal center.",
    canReuseRecycle: "Metal can is recyclable only after complete professional decontamination.",
    environmentalImpact: "Liquid paint dumped into stormwater sewers poisons aquatic organisms and contaminates municipal water.",
    practicalTip: "Donate half-full paint cans to local community centers, schools, or theater groups for stage backdrops."
  },
  {
    id: "blister-pack",
    name: "Empty Medicine Blister Pack",
    icon: "💊",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Multi-Material",
    aliases: ["blister pack", "medicine wrapper", "pill strip", "tablet foil"],
    material: "PVC / PVDC plastic tightly bonded with Aluminum Foil",
    instructions: "Place empty blister strips in the Black Residual bin unless specialized pharmacy recycling drops exist in your city.",
    canReuseRecycle: "Extremely difficult – The tight fusion of PVC plastic and aluminum foil cannot be separated by standard dry sorting.",
    environmentalImpact: "Accumulates in municipal landfills; burning produces chlorine and hazardous gases.",
    practicalTip: "Support pharmaceutical companies that are transitioning to mono-material recyclable blister packaging."
  },
  {
    id: "wooden-toothpick",
    name: "Wooden Toothpick / Ice Cream Stick",
    icon: "🪵",
    category: "biodegradable",
    binColor: "Green",
    binName: "Biodegradable (Wet Waste)",
    aliases: ["toothpick", "ice cream stick", "popsicle stick", "wooden skewer"],
    material: "Natural Untreated Birch Wood",
    instructions: "Toss into the green bin or backyard composter.",
    canReuseRecycle: "Yes – 100% natural organic wood fiber, biodegrades in a few months.",
    environmentalImpact: "Infinitely better than plastic skewers or plastic toothpicks which choke marine life.",
    practicalTip: "Clean popsicle sticks make great garden plant markers—write herb names on them with a pencil!"
  },
  {
    id: "leather-shoes",
    name: "Worn-Out Synthetic / Leather Shoes",
    icon: "👞",
    category: "residual",
    binColor: "Black",
    binName: "Residual / Mixed Footwear",
    aliases: ["shoes", "sneakers", "boots", "slippers", "chappal"],
    material: "Composite of EVA Foam, Vulcanized Rubber, Adhesives, and Leather/Polyurethane",
    instructions: "If still usable, donate to footwear drives. If torn beyond repair, place in Black Residual bin.",
    canReuseRecycle: "No – Glued multi-material construction makes disassembly nearly impossible without specialized shoe shredders.",
    environmentalImpact: "Takes 40 to 100 years to degrade in landfills; ethylene vinyl acetate soles outgas chemical plasticizers.",
    practicalTip: "Take worn shoes to brand-specific recycling drop boxes (e.g., Nike Grind) that grind soles into playground athletic turf."
  },
  {
    id: "tin-food-can",
    name: "Tin / Steel Canned Food Container",
    icon: "🥫",
    category: "recyclable",
    binColor: "Blue",
    binName: "Recyclable (Dry Waste)",
    aliases: ["tin can", "food can", "steel can", "soup can", "canned beans"],
    material: "Tin-Plated Steel",
    instructions: "Rinse away all sauce or food remnants, place lid inside the can, and drop in the Blue Recyclable bin.",
    canReuseRecycle: "Yes – Steel is 100% recyclable infinitely and easily sorted using powerful electromagnets at sorting facilities.",
    environmentalImpact: "Recycling steel saves 75% of the energy needed to make steel from iron ore.",
    practicalTip: "Drill small drainage holes in clean tin cans, paint them, and use them as adorable rustic window herb pots!"
  }
];

// ============================================================================
// 2. DATASET: PRACTICAL UPCYCLING & DIY IDEAS
// ============================================================================

const UPCYCLING_PROJECTS = [
  {
    id: "bottle-planter",
    title: "Self-Watering Bottle Planter",
    category: "plastic",
    icon: "🌱",
    difficulty: "easy",
    materials: "Plastic bottle, cotton string/yarn, soil, seedling, scissors.",
    steps: "1. Cut the plastic bottle in half horizontally. 2. Poke a hole in the cap and thread cotton string through it. 3. Screw the cap back on and invert the top half into the bottom half filled with water. 4. Fill the top with potting soil and plant your seedling—the string wicks water automatically!",
    environmentalBonus: "Prevents a plastic bottle from entering a landfill and creates fresh indoor air."
  },
  {
    id: "glass-jar-pantry",
    title: "Aesthetic Glass Pantry Organizers",
    category: "glass",
    icon: "🫙",
    difficulty: "easy",
    materials: "Empty jam or pasta sauce jars, warm soapy water, baking soda, chalkboard paint or paper labels.",
    steps: "1. Soak jars in warm water and scrub off adhesive labels using a baking soda paste. 2. Dry thoroughly. 3. Paint the metal lids a uniform color (matte black or gold) and add labels. 4. Store spices, lentils, grains, or tea bags airtight and plastic-free!",
    environmentalBonus: "Zero-cost pantry storage that saves you from purchasing plastic storage containers."
  },
  {
    id: "tshirt-tote-bag",
    title: "No-Sew T-Shirt Grocery Tote",
    category: "fabric",
    icon: "🛍️",
    difficulty: "medium",
    materials: "Old cotton t-shirt, scissors, ruler.",
    steps: "1. Cut off the sleeves of the t-shirt to create shoulder straps. 2. Cut around the neckline in a deeper curve. 3. Turn the shirt inside out and cut 5cm vertical fringe strips along the bottom hem. 4. Tie matching top and bottom strips tightly in double knots. 5. Flip right side out—you have a durable, washable market tote!",
    environmentalBonus: "Eliminates hundreds of single-use plastic grocery bags while repurposing discarded textiles."
  },
  {
    id: "cardboard-desk-organizer",
    title: "Multi-Tier Cardboard Desk Caddy",
    category: "cardboard",
    icon: "✂️",
    difficulty: "medium",
    materials: "Shipping carton, paper tubes, glue, scissors, craft paper or paint.",
    steps: "1. Cut cardboard boxes into tiered back and front dividers. 2. Glue toilet paper or paper towel tubes vertically as pen holders. 3. Assemble and glue the structure into a compact desktop caddy. 4. Cover with wrapping paper or paint with leftover house paint.",
    environmentalBonus: "Reuses high-grade Kraft corrugated cardboard before recycling."
  },
  {
    id: "citrus-cleaner",
    title: "Citrus Peel Natural Surface Cleaner",
    category: "organic",
    icon: "🍋",
    difficulty: "easy",
    materials: "Orange/lemon peels, white vinegar, glass jar, spray bottle.",
    steps: "1. Pack leftover orange, lemon, or sweet lime peels tightly into a glass jar. 2. Pour white vinegar until all peels are completely submerged. 3. Seal and store in a dark cabinet for 2 weeks. 4. Strain the citrus-infused liquid into a spray bottle and dilute 1:1 with water for a fragrant, non-toxic grease-cutting cleaner!",
    environmentalBonus: "Replaces chemical sprays packaged in single-use plastic bottles with organic waste."
  },
  {
    id: "egg-carton-seedlings",
    title: "Biodegradable Seed Starter Trays",
    category: "cardboard",
    icon: "🪴",
    difficulty: "easy",
    materials: "Cardboard egg carton, seed compost, seeds, water spray.",
    steps: "1. Cut the lid off a cardboard egg carton. 2. Fill each egg cup with seed-starting soil. 3. Plant 1-2 seeds per cup and mist gently. 4. Once seedlings sprout, cut the cups apart and plant the entire cardboard cup directly into garden soil—it biodegrades naturally into compost!",
    environmentalBonus: "Eliminates plastic nursery starter pots and enriches garden soil."
  }
];

// ============================================================================
// 3. DATASET: 10 ENVIRONMENTAL STUDIES QUIZ QUESTIONS
// ============================================================================

const QUIZ_QUESTIONS = [
  {
    topic: "Decomposition Physics",
    question: "How long does a conventional single-use plastic PET water bottle take to break down in nature?",
    options: [
      "About 5 to 10 years",
      "Around 50 years",
      "Over 450 to 500 years",
      "Plastic never degrades at all"
    ],
    correctIndex: 2,
    explanation: "Standard petroleum-derived PET plastics take approximately 450 to 500 years to fragment in landfills and oceans, breaking down into harmful microplastics rather than organic matter."
  },
  {
    topic: "Landfill Methane Emissions",
    question: "Why is throwing food scraps into mixed landfill garbage worse than composting them?",
    options: [
      "Food waste in landfills attracts birds that disrupt airplane flight paths",
      "Landfills lack oxygen (anaerobic), causing food waste to rot into potent methane gas (CH₄)",
      "Food scraps make garbage trucks too heavy to drive safely",
      "Landfill operators have to pay extra water bills"
    ],
    correctIndex: 1,
    explanation: "When organic waste is buried under layers of trash without oxygen, anaerobic bacteria generate methane (CH₄)—a greenhouse gas over 28 times more potent than carbon dioxide at trapping atmospheric heat."
  },
  {
    topic: "Recycling Contamination",
    question: "Why should you NEVER put a greasy pizza delivery box into the dry paper recycling bin?",
    options: [
      "The box is made of colored cardboard which is illegal to pulp",
      "The smell of pizza confuses the automated laser sorting machines",
      "Cooking oil and grease permanently bind to paper fibers, ruining the water-based pulping batch",
      "Delivery pizza boxes are classified as hazardous medical waste"
    ],
    correctIndex: 2,
    explanation: "Paper recycling is a water-based washing process. Oil and grease do not mix with water, meaning oily food grease binds to cellulose fibers and ruins entire 500 kg recycling batches."
  },
  {
    topic: "E-Waste & Groundwater",
    question: "What dangerous phenomenon occurs when discarded batteries and electronics decompose in unlined dumps?",
    options: [
      "Solar radiation reflection",
      "Toxic leachate seepage that poisons underlying groundwater tables",
      "Static electricity magnetic pulses",
      "Sudden flash ozone generation"
    ],
    correctIndex: 1,
    explanation: "Rainwater percolating through mixed electronic and battery waste creates toxic liquid runoff called 'leachate', loaded with heavy metals like lead, cadmium, and mercury that contaminate drinking water aquifers."
  },
  {
    topic: "Metal Circularity",
    question: "How much energy is saved when manufacturing an aluminum beverage can from recycled metal instead of raw bauxite ore?",
    options: [
      "About 10%",
      "About 35%",
      "About 60%",
      "Up to 95%"
    ],
    correctIndex: 3,
    explanation: "Recycling aluminum requires only 5% of the massive electricity needed to mine, refine, and smelt virgin bauxite ore into new metal, resulting in a staggering 95% energy savings."
  },
  {
    topic: "Standard Color Coding",
    question: "Under standard municipal waste management guidelines, which bin color is universally designated for wet biodegradable waste?",
    options: [
      "Blue Bin",
      "Green Bin",
      "Red Bin",
      "Black Bin"
    ],
    correctIndex: 1,
    explanation: "The Green Bin is globally recognized as the designated receptacle for organic wet waste, including kitchen peels, food scraps, and garden biomass destined for composting or biomethanation."
  },
  {
    topic: "Special Hazardous Waste",
    question: "How should expired medicines and antibiotic blister packs be handled at home?",
    options: [
      "Flushed down the kitchen sink or toilet bowl",
      "Buried deep in household plant pots",
      "Collected separately and turned in to pharmacy take-back kiosks or hazardous waste drives",
      "Burned in a backyard campfire"
    ],
    correctIndex: 2,
    explanation: "Flushing medicines contaminates city waterways and promotes antibiotic-resistant superbugs. They must be collected separately for controlled high-temperature biomedical incineration."
  },
  {
    topic: "The Waste Hierarchy",
    question: "According to the internationally accepted Waste Hierarchy pyramid, what is the MOST preferred environmental action?",
    options: [
      "Incineration with energy recovery",
      "Refusing and reducing waste generation at the source",
      "Sanitary landfilling",
      "Downcycling into industrial plastic bricks"
    ],
    correctIndex: 1,
    explanation: "Prevention and reduction at the source ('Refuse and Reduce') is the highest priority tier of the waste hierarchy, as the greenest waste is the item that was never produced in the first place."
  },
  {
    topic: "Plastic Pollution",
    question: "What are 'microplastics' and why do they pose a critical danger to global ecosystems?",
    options: [
      "Microscopic bacteria that eat synthetic plastics in oceans",
      "Plastic fragments smaller than 5mm that bioaccumulate up the food chain into marine life and human organs",
      "Tiny decorative plastic glitters used in cosmetics that dissolve in warm water",
      "Small plastic computer chips used in household appliances"
    ],
    correctIndex: 1,
    explanation: "Microplastics are tiny synthetic particles (< 5mm) resulting from commercial degradation. They absorb chemical pollutants and are ingested by zooplankton and fish, bioaccumulating straight into human diets."
  },
  {
    topic: "Sanitary Safety",
    question: "Why should broken glass and sharp needles be securely wrapped in heavy paper before disposal?",
    options: [
      "To prevent bad luck according to cultural beliefs",
      "To protect frontline sanitation workers and waste collectors from serious lacerations and infectious needle-sticks",
      "To keep the trash can smelling pleasant",
      "To make the garbage bags heavier"
    ],
    correctIndex: 1,
    explanation: "Sanitation workers and informal waste pickers handle millions of bags manually. Concealed sharp glass or syringe needles cause severe lacerations, tetanus, and bloodborne virus transmissions."
  }
];

// ============================================================================
// 4. DATASET: DAILY ECO CHALLENGES
// ============================================================================

const DAILY_CHALLENGES = [
  {
    id: "ch-1",
    title: "100% Source Segregation Today",
    desc: "Ensure every piece of waste generated in your home is sorted into wet, dry, or hazardous bins.",
    points: 25
  },
  {
    id: "ch-2",
    title: "Refuse All Single-Use Plastic Bags",
    desc: "Carry your own cloth or tote bag whenever you visit grocery stores or vegetable markets.",
    points: 20
  },
  {
    id: "ch-3",
    title: "Start a Kitchen Compost / Scrap Jar",
    desc: "Collect fruit peels and vegetable ends in a container for composting or garden mulch.",
    points: 30
  },
  {
    id: "ch-4",
    title: "Perform the 'Rinse & Dry' Rule",
    desc: "Rinse clean milk pouches, yogurt cups, or beverage cans before discarding in the recycling bin.",
    points: 15
  },
  {
    id: "ch-5",
    title: "Repurpose One Discarded Item",
    desc: "Give a glass jar, cardboard box, or plastic bottle a secondary practical life at home.",
    points: 25
  }
];

// ============================================================================
// 5. WEB AUDIO SYNTHESIZER (Pleasant Sound Effects with Zero External Files)
// ============================================================================

class SoundManager {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      // Audio autoplay restriction fallback
    }
  }

  playWrong() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      // Audio fallback
    }
  }

  playFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C, E, G, High C
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.2, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.25);
      });
    } catch (e) {
      // Audio fallback
    }
  }
}

const soundManager = new SoundManager();

// ============================================================================
// 6. APPLICATION STATE & LOCALSTORAGE CONTROLLER
// ============================================================================

const STORAGE_KEYS = {
  TRACKER_LOGS: "wastewise_tracker_entries_v2",
  HIGH_SCORE: "wastewise_game_highscore_v2",
  CHALLENGES: "wastewise_challenges_state_v2",
  STREAK: "wastewise_streak_data_v2",
  ECO_POINTS: "wastewise_eco_points_v2"
};

// Safe LocalStorage Helpers
function loadStorage(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (e) {
    console.warn("LocalStorage access failed:", e);
    return defaultValue;
  }
}

function saveStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("LocalStorage save failed:", e);
  }
}

// Helper to format date relative to today
function getRelativeDateStr(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

// Map waste category to standard Indian SWM color bin
function getRecommendedBinForCategory(category) {
  switch (category) {
    case "biodegradable": return "green";
    case "recyclable": return "blue";
    case "hazardous": return "red";
    case "residual": return "black";
    default: return "black";
  }
}

// Initial demo seed data with realistic household segregation audit entries
function getInitialTrackerData() {
  const existing = loadStorage(STORAGE_KEYS.TRACKER_LOGS, null);
  if (existing && Array.isArray(existing) && existing.length > 0 && existing[0].binUsed !== undefined) {
    return existing;
  }
  
  // Seed with realistic 14-day household audit history
  const initial = [
    // This week (Last 7 days)
    {
      id: "seed-1",
      name: "Banana Peels & Coffee Grounds",
      category: "biodegradable",
      quantity: 3,
      binUsed: "green",
      recommendedBin: "green",
      isCorrect: true,
      date: getRelativeDateStr(0)
    },
    {
      id: "seed-2",
      name: "Plastic Mineral Water Bottles (PET)",
      category: "recyclable",
      quantity: 2,
      binUsed: "blue",
      recommendedBin: "blue",
      isCorrect: true,
      date: getRelativeDateStr(0)
    },
    {
      id: "seed-3",
      name: "Corrugated Cardboard Box",
      category: "recyclable",
      quantity: 1,
      binUsed: "blue",
      recommendedBin: "blue",
      isCorrect: true,
      date: getRelativeDateStr(1)
    },
    {
      id: "seed-4",
      name: "Household AA Battery",
      category: "hazardous",
      quantity: 2,
      binUsed: "black", // MISTAKE: placed in black residual bin!
      recommendedBin: "red",
      isCorrect: false,
      date: getRelativeDateStr(2)
    },
    {
      id: "seed-5",
      name: "Greasy Pizza Box",
      category: "residual",
      quantity: 1,
      binUsed: "blue", // MISTAKE: oily cardboard in clean dry recyclables!
      recommendedBin: "black",
      isCorrect: false,
      date: getRelativeDateStr(2)
    },
    {
      id: "seed-6",
      name: "Kitchen Vegetable & Onion Peels",
      category: "biodegradable",
      quantity: 4,
      binUsed: "green",
      recommendedBin: "green",
      isCorrect: true,
      date: getRelativeDateStr(3)
    },
    {
      id: "seed-7",
      name: "Aluminum Beverage Can",
      category: "recyclable",
      quantity: 2,
      binUsed: "blue",
      recommendedBin: "blue",
      isCorrect: true,
      date: getRelativeDateStr(4)
    },
    {
      id: "seed-8",
      name: "Sanitary Pad & Diaper",
      category: "residual",
      quantity: 2,
      binUsed: "black",
      recommendedBin: "black",
      isCorrect: true,
      date: getRelativeDateStr(5)
    },
    // Prior week (8-14 days ago) for weekly progress comparison
    {
      id: "seed-9",
      name: "Household AA Battery",
      category: "hazardous",
      quantity: 1,
      binUsed: "black", // REPEATED MISTAKE: recurring pattern detection!
      recommendedBin: "red",
      isCorrect: false,
      date: getRelativeDateStr(9)
    },
    {
      id: "seed-10",
      name: "Newspaper & Magazines",
      category: "recyclable",
      quantity: 3,
      binUsed: "blue",
      recommendedBin: "blue",
      isCorrect: true,
      date: getRelativeDateStr(9)
    },
    {
      id: "seed-11",
      name: "Milk Pouch (LDPE)",
      category: "recyclable",
      quantity: 2,
      binUsed: "blue",
      recommendedBin: "blue",
      isCorrect: true,
      date: getRelativeDateStr(10)
    },
    {
      id: "seed-12",
      name: "Leftover Food Scraps",
      category: "biodegradable",
      quantity: 4,
      binUsed: "green",
      recommendedBin: "green",
      isCorrect: true,
      date: getRelativeDateStr(11)
    },
    {
      id: "seed-13",
      name: "Soiled Food Wrappers",
      category: "residual",
      quantity: 2,
      binUsed: "black",
      recommendedBin: "black",
      isCorrect: true,
      date: getRelativeDateStr(12)
    }
  ];
  saveStorage(STORAGE_KEYS.TRACKER_LOGS, initial);
  return initial;
}

let appState = {
  trackerEntries: getInitialTrackerData(),
  gameHighScore: loadStorage(STORAGE_KEYS.HIGH_SCORE, 0),
  dailyChallenges: loadStorage(STORAGE_KEYS.CHALLENGES, {}),
  ecoPoints: loadStorage(STORAGE_KEYS.ECO_POINTS, 65),
  streakData: loadStorage(STORAGE_KEYS.STREAK, { streak: 1, lastActiveDate: new Date().toISOString().split("T")[0] })
};

// Toast notification trigger
function showAppToast(message, type = "info") {
  const toast = document.getElementById("appToast");
  if (!toast) return;
  toast.textContent = message;
  toast.style.display = "flex";
  toast.style.backgroundColor = type === "success" ? "#1E5631" : (type === "warning" ? "#D97706" : "#111827");

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.display = "none";
  }, 3200);
}

// Update Eco Points display in navbar
function updateEcoPointsDisplay() {
  const el = document.getElementById("navEcoPoints");
  if (el) el.textContent = appState.ecoPoints;
  saveStorage(STORAGE_KEYS.ECO_POINTS, appState.ecoPoints);
}

function addEcoPoints(pts, reason) {
  appState.ecoPoints += pts;
  updateEcoPointsDisplay();
  showAppToast(`+${pts} Eco-Points earned! (${reason})`, "success");
}

// ============================================================================
// 7. SMART WASTE CLASSIFIER MODULE
// ============================================================================

let currentFilter = "all";
let currentSearchQuery = "";

function initClassifier() {
  const input = document.getElementById("classifierInput");
  const clearBtn = document.getElementById("clearSearchBtn");
  const filterPills = document.querySelectorAll("#categoryFilterPills .filter-pill");
  const suggestionChips = document.querySelectorAll("#suggestionChips .chip");
  const resetBtn = document.getElementById("resetClassifierBtn");

  // Update category counts
  updateCategoryCounts();

  // Search input with instant rendering
  if (input) {
    input.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      if (clearBtn) clearBtn.style.display = currentSearchQuery ? "block" : "none";
      renderClassifierResults();
    });
  }

  // Clear search button
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (input) input.value = "";
      currentSearchQuery = "";
      clearBtn.style.display = "none";
      renderClassifierResults();
      if (input) input.focus();
    });
  }

  // Suggestion chip quick clicks
  suggestionChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.query || chip.textContent.trim();
      if (input) input.value = q;
      currentSearchQuery = q.toLowerCase();
      if (clearBtn) clearBtn.style.display = "block";
      renderClassifierResults();
      // Smooth scroll slightly towards grid
      const grid = document.getElementById("itemsGrid");
      if (grid) grid.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  // Category filter tabs
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentFilter = pill.dataset.category || "all";
      renderClassifierResults();
    });
  });

  // Reset filter when empty
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (input) input.value = "";
      currentSearchQuery = "";
      if (clearBtn) clearBtn.style.display = "none";
      currentFilter = "all";
      filterPills.forEach(p => {
        if (p.dataset.category === "all") p.classList.add("active");
        else p.classList.remove("active");
      });
      renderClassifierResults();
    });
  }

  // Initial render
  renderClassifierResults();
}

function updateCategoryCounts() {
  const countAll = WASTE_DATABASE.length;
  const countBio = WASTE_DATABASE.filter(i => i.category === "biodegradable").length;
  const countRec = WASTE_DATABASE.filter(i => i.category === "recyclable").length;
  const countHaz = WASTE_DATABASE.filter(i => i.category === "hazardous").length;
  const countRes = WASTE_DATABASE.filter(i => i.category === "residual").length;

  const setT = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setT("countAll", countAll);
  setT("countBio", countBio);
  setT("countRec", countRec);
  setT("countHaz", countHaz);
  setT("countRes", countRes);
}

function renderClassifierResults() {
  const grid = document.getElementById("itemsGrid");
  const emptyState = document.getElementById("emptyState");
  const resultsCount = document.getElementById("resultsCount");
  if (!grid) return;

  // Filter items matching category and query (with aliases and synonyms!)
  const filtered = WASTE_DATABASE.filter(item => {
    const matchesCategory = (currentFilter === "all") || (item.category === currentFilter);
    if (!matchesCategory) return false;

    if (!currentSearchQuery) return true;

    // Check name, material, aliases, and category
    const inName = item.name.toLowerCase().includes(currentSearchQuery);
    const inMaterial = item.material.toLowerCase().includes(currentSearchQuery);
    const inCategory = item.category.toLowerCase().includes(currentSearchQuery);
    const inAliases = item.aliases && item.aliases.some(alias => alias.toLowerCase().includes(currentSearchQuery));

    return inName || inMaterial || inCategory || inAliases;
  });

  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} of ${WASTE_DATABASE.length} waste items`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  if (emptyState) emptyState.style.display = "none";

  // Build card elements
  grid.innerHTML = filtered.map(item => {
    return `
      <div class="waste-card" onclick="openItemModal('${item.id}')" tabindex="0" role="button" aria-label="View details for ${item.name}">
        <div class="waste-card-top">
          <span class="waste-card-icon">${item.icon}</span>
          <span class="stream-badge ${item.category}">${item.category}</span>
        </div>
        <h4 class="waste-card-title">${item.name}</h4>
        <span class="waste-card-category-sub">${item.material}</span>
        <p class="waste-card-desc">${item.instructions.substring(0, 95)}...</p>
        <div class="waste-card-footer">
          <span class="bin-hint-pill">
            <span>Dispose in:</span>
            <strong>${item.binColor} Bin</strong>
          </span>
          <span class="card-view-btn">View Details &rarr;</span>
        </div>
      </div>
    `;
  }).join("");
}

// Modal handling for item deep-dive
window.openItemModal = function(itemId) {
  const item = WASTE_DATABASE.find(i => i.id === itemId);
  if (!item) return;

  const backdrop = document.getElementById("itemModalBackdrop");
  const modalContent = document.getElementById("modalContent");
  if (!backdrop || !modalContent) return;

  const binBannerTheme = item.category === "biodegradable" ? "green" :
    (item.category === "recyclable" ? "blue" : (item.category === "hazardous" ? "red" : "black"));

  modalContent.innerHTML = `
    <div class="item-modal-header">
      <span class="modal-item-icon">${item.icon}</span>
      <div>
        <h3 class="modal-item-title">${item.name}</h3>
        <span class="stream-badge ${item.category}">${item.category.toUpperCase()} • ${item.material}</span>
      </div>
    </div>

    <div class="modal-bin-banner ${binBannerTheme}">
      <span style="font-size: 2rem;">🪣</span>
      <div class="bin-banner-text">
        <h4>Recommended Bin: ${item.binColor} Bin</h4>
        <p>Target Stream: ${item.binName}</p>
      </div>
    </div>

    <div class="modal-detail-sections">
      <div class="modal-detail-block">
        <h5><span>📋</span> Correct Disposal Instructions</h5>
        <p>${item.instructions}</p>
      </div>

      <div class="modal-detail-block">
        <h5><span>🔄</span> Can it be Reused or Recycled?</h5>
        <p>${item.canReuseRecycle}</p>
      </div>

      <div class="modal-detail-block">
        <h5><span>🌍</span> Environmental Impact</h5>
        <p>${item.environmentalImpact}</p>
      </div>

      <div class="modal-detail-block">
        <h5><span>💡</span> Practical Recycling / Upcycling Tip</h5>
        <p>${item.practicalTip}</p>
      </div>
    </div>

    <div class="modal-actions-bar">
      <button class="btn btn-primary" onclick="quickAddToTracker('${item.name.replace(/'/g, "\\'")}', '${item.category}')">
        + Add to My Waste Tracker
      </button>
      <button class="btn btn-secondary" onclick="closeItemModal()">Close</button>
    </div>
  `;

  backdrop.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.closeItemModal = function() {
  const backdrop = document.getElementById("itemModalBackdrop");
  if (backdrop) backdrop.style.display = "none";
  document.body.style.overflow = "";
};

// Quick-add from classifier modal to tracker
window.quickAddToTracker = function(name, category) {
  closeItemModal();
  const nameInput = document.getElementById("trackItemName");
  const catSelect = document.getElementById("trackCategory");
  const trackerSection = document.getElementById("tracker");

  if (nameInput) nameInput.value = name;
  if (catSelect) catSelect.value = category;

  if (trackerSection) {
    trackerSection.scrollIntoView({ behavior: "smooth" });
  }

  showAppToast(`"${name}" populated into Tracker form below!`, "success");
};

// ============================================================================
// 8. INTERACTIVE WASTE SEGREGATION CHALLENGE (GAME)
// ============================================================================

let gameState = {
  currentRoundItems: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  correctAnswers: 0,
  totalRounds: 10
};

function initGame() {
  const restartBtn = document.getElementById("gameRestartBtn");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const soundToggleBtn = document.getElementById("soundToggleBtn");
  const draggableItem = document.getElementById("currentDraggableItem");
  const targetBins = document.querySelectorAll(".target-bin");

  // Load high score
  const hsEl = document.getElementById("gameHighScore");
  if (hsEl) hsEl.textContent = appState.gameHighScore;

  if (restartBtn) restartBtn.addEventListener("click", startNewGameRound);
  if (playAgainBtn) playAgainBtn.addEventListener("click", () => {
    const modal = document.getElementById("gameResultBackdrop");
    if (modal) modal.style.display = "none";
    startNewGameRound();
  });

  // Sound toggle button
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      soundManager.enabled = !soundManager.enabled;
      const soundIcon = document.getElementById("soundIcon");
      if (soundIcon) soundIcon.textContent = soundManager.enabled ? "🔊" : "🔇";
      soundToggleBtn.innerHTML = `${soundManager.enabled ? "🔊" : "🔇"} Sound ${soundManager.enabled ? "On" : "Off"}`;
      showAppToast(`Game sound ${soundManager.enabled ? "enabled" : "muted"}`);
    });
  }

  // Setup Drag events on the waste item card
  if (draggableItem) {
    draggableItem.addEventListener("dragstart", (e) => {
      draggableItem.classList.add("dragging");
      e.dataTransfer.setData("text/plain", draggableItem.dataset.category || "");
      e.dataTransfer.effectAllowed = "move";
    });

    draggableItem.addEventListener("dragend", () => {
      draggableItem.classList.remove("dragging");
    });
  }

  // Setup Drop & Click events on bins
  targetBins.forEach(bin => {
    // Native HTML5 Drag Over / Leave
    bin.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      bin.classList.add("drag-over");
    });

    bin.addEventListener("dragleave", () => {
      bin.classList.remove("drag-over");
    });

    bin.addEventListener("drop", (e) => {
      e.preventDefault();
      bin.classList.remove("drag-over");
      const chosenBinCategory = bin.dataset.bin;
      handleAnswerSubmission(chosenBinCategory);
    });

    // Mobile / Click Fallback (Tapping the bin directly)
    bin.addEventListener("click", () => {
      const chosenBinCategory = bin.dataset.bin;
      handleAnswerSubmission(chosenBinCategory);
    });
  });

  startNewGameRound();
}

function startNewGameRound() {
  // Pick 10 randomized items from database
  const shuffled = [...WASTE_DATABASE].sort(() => 0.5 - Math.random());
  gameState.currentRoundItems = shuffled.slice(0, gameState.totalRounds);
  gameState.currentIndex = 0;
  gameState.score = 0;
  gameState.streak = 0;
  gameState.maxStreak = 0;
  gameState.correctAnswers = 0;

  updateGameScoreboard();
  renderCurrentGameItem();
}

function renderCurrentGameItem() {
  if (gameState.currentIndex >= gameState.currentRoundItems.length) {
    finishGameRound();
    return;
  }

  const item = gameState.currentRoundItems[gameState.currentIndex];
  const iconEl = document.getElementById("gameItemIcon");
  const nameEl = document.getElementById("gameItemName");
  const hintEl = document.getElementById("gameItemHint");
  const card = document.getElementById("currentDraggableItem");

  if (iconEl) iconEl.textContent = item.icon;
  if (nameEl) nameEl.textContent = item.name;
  if (hintEl) hintEl.textContent = `${item.material} • Hint: ${item.aliases ? item.aliases[0] : item.category}`;
  if (card) card.dataset.category = item.category;

  // Update progress bar
  const pct = ((gameState.currentIndex + 1) / gameState.totalRounds) * 100;
  const bar = document.getElementById("gameProgressBar");
  if (bar) bar.style.width = `${pct}%`;

  const curIdxEl = document.getElementById("gameCurrentIndex");
  if (curIdxEl) curIdxEl.textContent = gameState.currentIndex + 1;
}

function handleAnswerSubmission(chosenCategory) {
  if (gameState.currentIndex >= gameState.currentRoundItems.length) return;

  const currentItem = gameState.currentRoundItems[gameState.currentIndex];
  const isCorrect = (chosenCategory === currentItem.category);

  const toast = document.getElementById("gameFeedbackToast");

  if (isCorrect) {
    soundManager.playCorrect();
    gameState.streak += 1;
    if (gameState.streak > gameState.maxStreak) gameState.maxStreak = gameState.streak;
    const bonus = (gameState.streak > 1) ? (gameState.streak * 15) : 0;
    gameState.score += 100 + bonus;
    gameState.correctAnswers += 1;

    if (toast) {
      toast.className = "game-feedback-toast correct";
      toast.textContent = `✓ Correct! ${currentItem.name} belongs in the ${currentItem.binColor} Bin! (+${100 + bonus} pts)`;
      toast.style.display = "block";
    }
  } else {
    soundManager.playWrong();
    gameState.streak = 0;
    gameState.score = Math.max(0, gameState.score - 20);

    if (toast) {
      toast.className = "game-feedback-toast wrong";
      toast.textContent = `✗ Incorrect! ${currentItem.name} goes into ${currentItem.binColor} (${currentItem.binName}).`;
      toast.style.display = "block";
    }
  }

  setTimeout(() => {
    if (toast) toast.style.display = "none";
  }, 1800);

  updateGameScoreboard();
  gameState.currentIndex += 1;
  setTimeout(renderCurrentGameItem, 400);
}

function updateGameScoreboard() {
  const scoreEl = document.getElementById("gameScore");
  const streakEl = document.getElementById("gameStreak");
  if (scoreEl) scoreEl.textContent = gameState.score;
  if (streakEl) streakEl.textContent = `${gameState.streak} 🔥`;
}

function finishGameRound() {
  soundManager.playFanfare();

  // Check high score
  if (gameState.score > appState.gameHighScore) {
    appState.gameHighScore = gameState.score;
    saveStorage(STORAGE_KEYS.HIGH_SCORE, appState.gameHighScore);
    const hsEl = document.getElementById("gameHighScore");
    if (hsEl) hsEl.textContent = appState.gameHighScore;
  }

  // Award Eco-Points for playing
  addEcoPoints(Math.round(gameState.score / 20), "Segregation Challenge completion");

  const modal = document.getElementById("gameResultBackdrop");
  const finalScoreEl = document.getElementById("resultFinalScore");
  const accuracyEl = document.getElementById("resultAccuracy");
  const maxStreakEl = document.getElementById("resultMaxStreak");
  const feedbackEl = document.getElementById("resultFeedbackBox");
  const emojiEl = document.getElementById("gameResultEmoji");

  const accuracy = Math.round((gameState.correctAnswers / gameState.totalRounds) * 100);

  if (finalScoreEl) finalScoreEl.textContent = gameState.score;
  if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
  if (maxStreakEl) maxStreakEl.textContent = gameState.maxStreak;

  if (accuracy === 100) {
    if (emojiEl) emojiEl.textContent = "🌟";
    if (feedbackEl) feedbackEl.innerHTML = "<strong>Flawless 100% Score!</strong> You are an exceptional eco-steward with deep segregation mastery!";
  } else if (accuracy >= 70) {
    if (emojiEl) emojiEl.textContent = "🏆";
    if (feedbackEl) feedbackEl.innerHTML = "<strong>Great Job!</strong> You segregated most items accurately. A bit more practice on hazardous items will make you a pro!";
  } else {
    if (emojiEl) emojiEl.textContent = "🌱";
    if (feedbackEl) feedbackEl.innerHTML = "<strong>Good Effort!</strong> Review the Smart Disposal Guide below to master the difference between recyclables and residual packaging.";
  }

  if (modal) modal.style.display = "flex";
}

// ============================================================================
// 9. HOUSEHOLD SEGREGATION INTELLIGENCE & DASHBOARD ENGINE
// ============================================================================

// Bin colors and labels per standard Indian Solid Waste Management (SWM) framework
const BIN_DEFINITIONS = {
  green: { name: "Green Bin (Wet / Organic)", color: "#1E5631", badge: "🟢 Green Bin" },
  blue: { name: "Blue Bin (Dry / Recyclables)", color: "#1D4ED8", badge: "🔵 Blue Bin" },
  red: { name: "Red Bin (Domestic Hazardous)", color: "#DC2626", badge: "🔴 Red Bin" },
  black: { name: "Black Bin (Residual / Landfill)", color: "#374151", badge: "⚫ Black Bin" }
};

// Populate the HTML5 native datalist for instant autocomplete
function populateWasteDatalist() {
  const datalist = document.getElementById("wasteItemDatalist");
  if (!datalist) return;

  datalist.innerHTML = WASTE_DATABASE.map(item => {
    return `<option value="${item.name}">${item.category.toUpperCase()} • ${item.binColor} Bin</option>`;
  }).join("");
}

// Helper to look up an item in the 36-item catalog by name or aliases
function findItemInCatalog(rawName) {
  if (!rawName) return null;
  const q = rawName.trim().toLowerCase();
  return WASTE_DATABASE.find(item => {
    if (item.name.toLowerCase() === q) return true;
    if (item.name.toLowerCase().includes(q)) return true;
    if (item.aliases && item.aliases.some(a => a.toLowerCase() === q || q.includes(a.toLowerCase()))) return true;
    return false;
  }) || null;
}

function initTracker() {
  populateWasteDatalist();

  const form = document.getElementById("trackerForm");
  const nameInput = document.getElementById("trackItemName");
  const catSelect = document.getElementById("trackCategory");
  const binSelect = document.getElementById("trackBinUsed");
  const dateInput = document.getElementById("trackDate");
  const clearBtn = document.getElementById("clearAllLogsBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");

  // Pre-fill today's date
  if (dateInput) {
    dateInput.value = new Date().toISOString().split("T")[0];
  }

  // Live item name typing: auto-detect recommended category and bin stream
  if (nameInput) {
    nameInput.addEventListener("input", (e) => {
      const match = findItemInCatalog(e.target.value);
      if (match) {
        if (catSelect) catSelect.value = match.category;
        updateSmartValidationBanner(match, binSelect ? binSelect.value : "");
      } else {
        updateSmartValidationBanner(null, binSelect ? binSelect.value : "");
      }
    });
  }

  // Live bin used change: validate if bin matches recommended stream
  if (binSelect) {
    binSelect.addEventListener("change", () => {
      const itemName = nameInput ? nameInput.value : "";
      const match = findItemInCatalog(itemName);
      updateSmartValidationBanner(match, binSelect.value);
    });
  }

  if (catSelect) {
    catSelect.addEventListener("change", () => {
      const itemName = nameInput ? nameInput.value : "";
      const match = findItemInCatalog(itemName);
      updateSmartValidationBanner(match, binSelect ? binSelect.value : "");
    });
  }

  // Form submit (Handles both New Record and Update Existing Record)
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const editId = document.getElementById("editEntryId").value;
      const name = nameInput.value.trim();
      const cat = catSelect.value;
      const binUsed = binSelect.value;
      const qty = parseInt(document.getElementById("trackQuantity").value, 10) || 1;
      const date = dateInput.value || new Date().toISOString().split("T")[0];

      if (!name || !cat || !binUsed) {
        showAppToast("Please fill in item name, category, and bin used.", "warning");
        return;
      }

      // Check against catalog or standard mapping
      const catalogItem = findItemInCatalog(name);
      const recommendedCategory = catalogItem ? catalogItem.category : cat;
      const recommendedBin = getRecommendedBinForCategory(recommendedCategory);
      const isCorrect = (binUsed === recommendedBin);

      if (editId) {
        // Update existing entry
        const entryIdx = appState.trackerEntries.findIndex(e => e.id === editId);
        if (entryIdx !== -1) {
          appState.trackerEntries[entryIdx] = {
            id: editId,
            name,
            category: cat,
            quantity: qty,
            binUsed,
            recommendedBin,
            isCorrect,
            date
          };
          showAppToast(`Updated "${name}" successfully!`, "success");
        }
        cancelEditMode();
      } else {
        // Create new entry
        const newEntry = {
          id: "entry-" + Date.now(),
          name,
          category: cat,
          quantity: qty,
          binUsed,
          recommendedBin,
          isCorrect,
          date
        };

        appState.trackerEntries.unshift(newEntry);
        if (isCorrect) {
          addEcoPoints(qty * 5, `Correctly segregated ${qty} ${name}`);
        } else {
          showAppToast(`Disposal logged with missegregation alert. Check mistake analysis!`, "warning");
        }
      }

      saveStorage(STORAGE_KEYS.TRACKER_LOGS, appState.trackerEntries);

      // Reset form
      nameInput.value = "";
      document.getElementById("trackQuantity").value = 1;
      binSelect.value = "";
      updateSmartValidationBanner(null, "");

      updateHouseholdIntelligence();
      updateCalculatorMetrics();
    });
  }

  // Cancel edit button
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", cancelEditMode);
  }

  // Clear all logs
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear your household waste diary records?")) {
        appState.trackerEntries = [];
        saveStorage(STORAGE_KEYS.TRACKER_LOGS, []);
        cancelEditMode();
        updateHouseholdIntelligence();
        updateCalculatorMetrics();
        showAppToast("Household waste diary cleared.");
      }
    });
  }

  updateHouseholdIntelligence();
  initWeeklyReport();
}

// Live validation feedback banner inside logging form
function updateSmartValidationBanner(catalogItem, binUsed) {
  const banner = document.getElementById("smartValidationBanner");
  const valIcon = document.getElementById("valIcon");
  const valText = document.getElementById("valText");
  const catSelect = document.getElementById("trackCategory");

  if (!banner || !valIcon || !valText) return;

  if (!binUsed) {
    if (catalogItem) {
      const recBin = getRecommendedBinForCategory(catalogItem.category);
      const binDef = BIN_DEFINITIONS[recBin];
      banner.className = "smart-validation-banner status-correct";
      valIcon.textContent = "💡";
      valText.innerHTML = `Identified: <strong>${catalogItem.name}</strong> (${catalogItem.material}). Recommended Stream: <strong>${binDef.badge}</strong>.`;
      banner.style.display = "flex";
    } else {
      banner.style.display = "none";
    }
    return;
  }

  const effectiveCat = catalogItem ? catalogItem.category : (catSelect ? catSelect.value : "residual");
  const recommendedBin = getRecommendedBinForCategory(effectiveCat);
  const recBinDef = BIN_DEFINITIONS[recommendedBin];
  const usedBinDef = BIN_DEFINITIONS[binUsed] || { name: binUsed };

  if (binUsed === recommendedBin) {
    banner.className = "smart-validation-banner status-correct";
    valIcon.textContent = "✅";
    valText.innerHTML = `<strong>Correct Sorting!</strong> Depositing into ${usedBinDef.name} matches Indian SWM 2016 norms.`;
    banner.style.display = "flex";
  } else {
    banner.className = "smart-validation-banner status-misplaced";
    valIcon.textContent = "⚠️";
    valText.innerHTML = `<strong>Missegregation Detected:</strong> This item belongs in <strong>${recBinDef.name}</strong>! Depositing in ${usedBinDef.name} will be logged as a contamination mistake.`;
    banner.style.display = "flex";
  }
}

// Load entry into form for editing
window.editTrackerEntry = function(id) {
  const entry = appState.trackerEntries.find(e => e.id === id);
  if (!entry) return;

  const formWrap = document.getElementById("logFormWrapper");
  const formTitle = document.getElementById("formTitleText");
  const formBadge = document.getElementById("formModeBadge");
  const editIdInput = document.getElementById("editEntryId");
  const nameInput = document.getElementById("trackItemName");
  const catSelect = document.getElementById("trackCategory");
  const binSelect = document.getElementById("trackBinUsed");
  const qtyInput = document.getElementById("trackQuantity");
  const dateInput = document.getElementById("trackDate");
  const submitBtn = document.getElementById("addEntryBtn");
  const cancelBtn = document.getElementById("cancelEditBtn");

  if (editIdInput) editIdInput.value = entry.id;
  if (nameInput) nameInput.value = entry.name;
  if (catSelect) catSelect.value = entry.category;
  if (binSelect) binSelect.value = entry.binUsed || getRecommendedBinForCategory(entry.category);
  if (qtyInput) qtyInput.value = entry.quantity;
  if (dateInput) dateInput.value = entry.date;

  if (formTitle) formTitle.textContent = "Edit Waste Record";
  if (formBadge) {
    formBadge.textContent = "Editing Mode";
    formBadge.className = "badge-soft text-danger";
  }
  if (submitBtn) submitBtn.innerHTML = "<span>✓ Update Waste Record</span>";
  if (cancelBtn) cancelBtn.style.display = "block";

  const match = findItemInCatalog(entry.name);
  updateSmartValidationBanner(match, binSelect.value);

  if (formWrap) {
    formWrap.scrollIntoView({ behavior: "smooth", block: "center" });
    formWrap.style.boxShadow = "0 0 0 3px rgba(45, 106, 79, 0.4)";
    setTimeout(() => { formWrap.style.boxShadow = ""; }, 1800);
  }
};

function cancelEditMode() {
  const formTitle = document.getElementById("formTitleText");
  const formBadge = document.getElementById("formModeBadge");
  const editIdInput = document.getElementById("editEntryId");
  const nameInput = document.getElementById("trackItemName");
  const binSelect = document.getElementById("trackBinUsed");
  const submitBtn = document.getElementById("addEntryBtn");
  const cancelBtn = document.getElementById("cancelEditBtn");
  const banner = document.getElementById("smartValidationBanner");

  if (editIdInput) editIdInput.value = "";
  if (nameInput) nameInput.value = "";
  if (binSelect) binSelect.value = "";
  if (formTitle) formTitle.textContent = "Log Household Waste";
  if (formBadge) {
    formBadge.textContent = "New Record";
    formBadge.className = "badge-soft";
  }
  if (submitBtn) submitBtn.innerHTML = "<span>+ Record Household Disposal</span>";
  if (cancelBtn) cancelBtn.style.display = "none";
  if (banner) banner.style.display = "none";
}

window.deleteTrackerEntry = function(id) {
  appState.trackerEntries = appState.trackerEntries.filter(e => e.id !== id);
  saveStorage(STORAGE_KEYS.TRACKER_LOGS, appState.trackerEntries);
  cancelEditMode();
  updateHouseholdIntelligence();
  updateCalculatorMetrics();
  showAppToast("Entry removed from diary.");
};

// ============================================================================
// CORE INTELLIGENCE: KPIS, SCORE, MISTAKES, HABITS, RECOMMENDATIONS
// ============================================================================

function updateHouseholdIntelligence() {
  const entries = appState.trackerEntries;

  // 1. Calculate General Aggregations
  let totalQty = 0;
  let correctQty = 0;
  let incorrectQty = 0;
  const categoryCounts = { biodegradable: 0, recyclable: 0, hazardous: 0, residual: 0 };
  const mistakeItemsMap = {}; // item -> count of mistakes
  const categoryMistakesMap = { biodegradable: 0, recyclable: 0, hazardous: 0, residual: 0 };

  // 2. 7-Day Window Segmentation for Progress Comparison
  const now = new Date();
  const currentWeekCutoff = new Date(now);
  currentWeekCutoff.setDate(currentWeekCutoff.getDate() - 7);

  const priorWeekCutoff = new Date(now);
  priorWeekCutoff.setDate(priorWeekCutoff.getDate() - 14);

  let thisWeekTotalQty = 0;
  let thisWeekCorrectQty = 0;
  let priorWeekTotalQty = 0;
  let priorWeekCorrectQty = 0;

  entries.forEach(entry => {
    const q = entry.quantity || 1;
    totalQty += q;

    if (categoryCounts[entry.category] !== undefined) {
      categoryCounts[entry.category] += q;
    }

    const isEntryCorrect = (entry.isCorrect !== undefined) ? entry.isCorrect : (entry.binUsed === entry.recommendedBin);

    if (isEntryCorrect) {
      correctQty += q;
    } else {
      incorrectQty += q;
      // Track mistake frequencies
      mistakeItemsMap[entry.name] = (mistakeItemsMap[entry.name] || 0) + q;
      if (categoryMistakesMap[entry.category] !== undefined) {
        categoryMistakesMap[entry.category] += q;
      }
    }

    // Weekly date classification
    const entryDate = new Date(entry.date);
    if (entryDate >= currentWeekCutoff) {
      thisWeekTotalQty += q;
      if (isEntryCorrect) thisWeekCorrectQty += q;
    } else if (entryDate >= priorWeekCutoff) {
      priorWeekTotalQty += q;
      if (isEntryCorrect) priorWeekCorrectQty += q;
    }
  });

  const accuracyPct = totalQty > 0 ? Math.round((correctQty / totalQty) * 100) : 100;
  const thisWeekAccuracy = thisWeekTotalQty > 0 ? Math.round((thisWeekCorrectQty / thisWeekTotalQty) * 100) : 100;
  const priorWeekAccuracy = priorWeekTotalQty > 0 ? Math.round((priorWeekCorrectQty / priorWeekTotalQty) * 100) : null;

  // Update Top KPI Cards
  const kpiTotalQtyEl = document.getElementById("kpiTotalQty");
  const kpiTotalRecordsEl = document.getElementById("kpiTotalRecords");
  const kpiCorrectQtyEl = document.getElementById("kpiCorrectQty");
  const kpiCorrectPctEl = document.getElementById("kpiCorrectPct");
  const kpiIncorrectQtyEl = document.getElementById("kpiIncorrectQty");
  const kpiIncorrectPctEl = document.getElementById("kpiIncorrectPct");
  const kpiAccuracyPctEl = document.getElementById("kpiAccuracyPct");
  const kpiAccuracyBadgeEl = document.getElementById("kpiAccuracyBadge");
  const kpiWeeklyDeltaBadge = document.getElementById("kpiWeeklyDeltaBadge");
  const kpiWeeklyDeltaIcon = document.getElementById("kpiWeeklyDeltaIcon");
  const kpiWeeklyDeltaText = document.getElementById("kpiWeeklyDeltaText");
  const kpiWeekComparisonText = document.getElementById("kpiWeekComparisonText");

  if (kpiTotalQtyEl) kpiTotalQtyEl.textContent = totalQty;
  if (kpiTotalRecordsEl) kpiTotalRecordsEl.textContent = `${entries.length} total logged records`;

  if (kpiCorrectQtyEl) kpiCorrectQtyEl.textContent = correctQty;
  if (kpiCorrectPctEl) kpiCorrectPctEl.textContent = `${accuracyPct}% accurately segregated`;

  if (kpiIncorrectQtyEl) kpiIncorrectQtyEl.textContent = incorrectQty;
  const misRate = totalQty > 0 ? (100 - accuracyPct) : 0;
  if (kpiIncorrectPctEl) kpiIncorrectPctEl.textContent = `${misRate}% misplacement rate`;

  if (kpiAccuracyPctEl) kpiAccuracyPctEl.textContent = `${accuracyPct}%`;
  if (kpiAccuracyBadgeEl) kpiAccuracyBadgeEl.textContent = `${accuracyPct}%`;

  // Weekly Trend Comparison
  if (priorWeekAccuracy !== null && priorWeekTotalQty > 0) {
    const delta = thisWeekAccuracy - priorWeekAccuracy;
    if (delta >= 0) {
      if (kpiWeeklyDeltaIcon) kpiWeeklyDeltaIcon.textContent = "📈";
      if (kpiWeeklyDeltaText) kpiWeeklyDeltaText.textContent = `+${delta}% vs last week (${thisWeekAccuracy}% vs ${priorWeekAccuracy}%)`;
      if (kpiWeekComparisonText) kpiWeekComparisonText.textContent = `Improved by +${delta}% over prior 7 days!`;
      if (kpiWeeklyDeltaBadge) kpiWeeklyDeltaBadge.style.color = "#10B981";
    } else {
      if (kpiWeeklyDeltaIcon) kpiWeeklyDeltaIcon.textContent = "📉";
      if (kpiWeeklyDeltaText) kpiWeeklyDeltaText.textContent = `${delta}% vs last week (${thisWeekAccuracy}% vs ${priorWeekAccuracy}%)`;
      if (kpiWeekComparisonText) kpiWeekComparisonText.textContent = `Declined by ${Math.abs(delta)}% vs prior week`;
      if (kpiWeeklyDeltaBadge) kpiWeeklyDeltaBadge.style.color = "#DC2626";
    }
  } else {
    if (kpiWeeklyDeltaIcon) kpiWeeklyDeltaIcon.textContent = "📊";
    if (kpiWeeklyDeltaText) kpiWeeklyDeltaText.textContent = `Current 7-day accuracy: ${thisWeekAccuracy}%`;
    if (kpiWeekComparisonText) kpiWeekComparisonText.textContent = `Baseline established for initial 7-day period`;
  }

  // 3. Compute Household Segregation Score (0 - 100)
  computeHouseholdScore(accuracyPct, entries, categoryMistakesMap, priorWeekAccuracy);

  // 4. Run Segregation Mistake Detection Engine
  runMistakeDetectionEngine(mistakeItemsMap, categoryMistakesMap, entries);

  // 5. Generate Behavioural Habits ("Your Household's Waste Habits")
  generateBehaviouralHabits(categoryCounts, totalQty, mistakeItemsMap, accuracyPct, priorWeekAccuracy, categoryMistakesMap);

  // 6. Generate Rule-Based Personalized Recommendations
  generatePersonalizedRecommendations(categoryMistakesMap, mistakeItemsMap, accuracyPct, categoryCounts);

  // 7. Update Donut Chart & Category summary chips
  updateDonutChart(categoryCounts, totalQty);
  updateSummaryChips(categoryCounts, totalQty);

  // 8. Update Table Audit Trail
  renderAuditTable(entries);

  // 9. Update Sustainability Rank
  updateSustainabilityTier(totalQty);
}

// Compute Household Score out of 100 with Circular SVG Progress Ring
function computeHouseholdScore(accuracyPct, entries, catMistakes, priorWeekAccuracy) {
  const scoreValEl = document.getElementById("householdScoreVal");
  const gaugeFill = document.getElementById("scoreGaugeFill");
  const gradePill = document.getElementById("scoreGradePill");
  const tierTitle = document.getElementById("householdScoreTierTitle");
  const deltaText = document.getElementById("householdScoreDeltaText");
  const adviceEl = document.getElementById("householdScoreAdvice");

  if (!scoreValEl || !gaugeFill) return;

  if (entries.length === 0) {
    scoreValEl.textContent = "0";
    gaugeFill.style.strokeDashoffset = "314.15";
    if (gradePill) gradePill.textContent = "No Data";
    if (tierTitle) tierTitle.textContent = "Awaiting Disposal Records";
    if (deltaText) deltaText.textContent = "Log your daily waste items to compute household score.";
    if (adviceEl) adviceEl.textContent = "Start by recording items into your diary above.";
    return;
  }

  // FORMULA:
  // Base component: Accuracy% * 0.70 (up to 70 pts)
  // Consistency bonus: min(15, entries.length * 1.5) (up to 15 pts)
  // Hazardous Safety Penalty: - (Hazardous mistakes * 8) (capped at -15 pts penalty)
  const baseScore = accuracyPct * 0.70;
  const consistencyScore = Math.min(15, entries.length * 1.5);
  const hazPenalty = Math.min(15, (catMistakes.hazardous || 0) * 8);

  const rawScore = Math.round(baseScore + consistencyScore - hazPenalty);
  const finalScore = Math.max(5, Math.min(100, rawScore));

  scoreValEl.textContent = finalScore;

  // SVG Gauge Animation (Circumference of r=50 is ~314.15)
  const circumference = 314.15;
  const offset = circumference - (circumference * (finalScore / 100));
  gaugeFill.style.strokeDashoffset = offset;

  // Gauge color based on score
  let grade = "Grade A";
  let title = "Grade A: Exemplary Eco-Household";
  let advice = "Outstanding segregation accuracy! Maintain zero cross-contamination in dry recyclables.";
  let strokeColor = "#10B981";

  if (finalScore >= 85) {
    grade = "Grade A+";
    title = "Grade A+: Zero-Waste Model Home";
    strokeColor = "#10B981";
    advice = "Exceptional household sorting! You prevent recyclable paper contamination and avert toxic leachate.";
  } else if (finalScore >= 70) {
    grade = "Grade B";
    title = "Grade B: Responsible Household";
    strokeColor = "#3B82F6";
    advice = "Solid sorting performance. Eliminate battery and greasy food box mistakes to cross into Grade A.";
  } else if (finalScore >= 50) {
    grade = "Grade C";
    title = "Grade C: Developing Sorter";
    strokeColor = "#F59E0B";
    advice = "Moderate contamination detected. Inspect your wet kitchen bin vs dry bin setup to prevent mixing.";
  } else {
    grade = "Grade D";
    title = "Grade D: High Contamination Alert";
    strokeColor = "#DC2626";
    advice = "Frequent misplacements. Hazardous items or food waste are entering the wrong stream. Review the guide below.";
  }

  gaugeFill.style.stroke = strokeColor;
  if (gradePill) {
    gradePill.textContent = grade;
    gradePill.style.color = strokeColor;
  }
  if (tierTitle) tierTitle.textContent = title;

  // Comparison to prior week score
  if (priorWeekAccuracy !== null) {
    const priorScoreApprox = Math.round((priorWeekAccuracy * 0.70) + 12);
    const scoreDiff = finalScore - priorScoreApprox;
    if (deltaText) {
      if (scoreDiff >= 0) {
        deltaText.innerHTML = `<span style="color: #10B981; font-weight: 700;">+${scoreDiff} pts</span> improvement compared to last week's performance.`;
      } else {
        deltaText.innerHTML = `<span style="color: #DC2626; font-weight: 700;">${scoreDiff} pts</span> decline compared to prior week audit.`;
      }
    }
  } else {
    if (deltaText) deltaText.textContent = "Weekly baseline tracking active based on your entries.";
  }

  if (adviceEl) adviceEl.textContent = advice;
}

// 4. Segregation Mistake Detection Engine (Core Feature)
function runMistakeDetectionEngine(mistakeItemsMap, catMistakes, entries) {
  const container = document.getElementById("mistakeAlertsContainer");
  const countBadge = document.getElementById("mistakeCountBadge");
  if (!container) return;

  const mistakeItemKeys = Object.keys(mistakeItemsMap);
  const totalMistakesCount = Object.values(mistakeItemsMap).reduce((a, b) => a + b, 0);

  if (countBadge) countBadge.textContent = `${totalMistakesCount} Mistake${totalMistakesCount === 1 ? "" : "s"} Detected`;

  if (totalMistakesCount === 0) {
    container.innerHTML = `
      <div class="mistake-empty-state">
        <div class="mistake-empty-icon">🎉</div>
        <h4 style="font-size: 1.1rem; margin-bottom: 0.35rem;">Zero Segregation Mistakes Recorded!</h4>
        <p style="font-size: 0.85rem; opacity: 0.9;">Every waste item logged in your household has been placed into its scientifically correct color-coded bin stream. Excellent sorting discipline!</p>
      </div>
    `;
    return;
  }

  // Sort items by highest mistake count
  const sortedMistakes = mistakeItemKeys.sort((a, b) => mistakeItemsMap[b] - mistakeItemsMap[a]);

  const cardsHtml = sortedMistakes.map(itemName => {
    const freq = mistakeItemsMap[itemName];
    const catalogItem = findItemInCatalog(itemName);
    const recCategory = catalogItem ? catalogItem.category : "residual";
    const recBin = getRecommendedBinForCategory(recCategory);
    const recBinDef = BIN_DEFINITIONS[recBin];

    // Find actual bins user placed this item into incorrectly
    const misplacedEntries = entries.filter(e => !e.isCorrect && e.name === itemName);
    const usedBins = [...new Set(misplacedEntries.map(e => BIN_DEFINITIONS[e.binUsed] ? BIN_DEFINITIONS[e.binUsed].name : e.binUsed))].join(", ");

    // Custom scientific reasoning per item
    let scientificReason = catalogItem ? catalogItem.environmentalImpact : "Improper disposal prevents municipal recycling and contaminates clean waste streams.";
    let fixAdvice = catalogItem ? catalogItem.instructions : `Always separate into the ${recBinDef.name}.`;

    if (itemName.toLowerCase().includes("battery")) {
      scientificReason = "Batteries placed in regular trash corrode and release toxic heavy metals (lead, cadmium, mercury) into groundwater aquifers.";
      fixAdvice = "Tape battery terminals with transparent tape and drop off at designated municipal e-waste kiosks.";
    } else if (itemName.toLowerCase().includes("pizza")) {
      scientificReason = "Grease-soaked cardboard permanently binds to paper cellulose and ruins entire 500 kg recycling pulping batches.";
      fixAdvice = "Tear the box: put clean dry lids in the Blue Bin, and grease-stained bases into the Black Residual Bin.";
    }

    return `
      <div class="mistake-alert-card">
        <div class="mistake-icon-wrap">⚠️</div>
        <div class="mistake-body">
          <h5>${itemName} Incorrectly Disposed (${freq} Time${freq > 1 ? "s" : ""})</h5>
          <p><strong>Disposed into:</strong> ${usedBins}.<br>${scientificReason}</p>
          <div class="mistake-tag-row">
            <span class="mistake-freq-tag">Misplaced ${freq}x</span>
            <span class="mistake-fix-tag">✓ Correct Destination: ${recBinDef.badge}</span>
          </div>
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = cardsHtml;
}

// 5. Generate Behavioural Habits ("Your Household's Waste Habits")
function generateBehaviouralHabits(categoryCounts, totalQty, mistakeItemsMap, accuracyPct, priorWeekAccuracy, catMistakes) {
  const topCatEl = document.getElementById("habitTopCategory");
  const misItemsEl = document.getElementById("habitMisplacedItems");
  const trendEl = document.getElementById("habitAccuracyTrend");
  const nextFocusEl = document.getElementById("habitNextWeekFocus");

  if (!topCatEl) return;

  if (totalQty === 0) {
    topCatEl.textContent = "Awaiting disposal diary records to compute volume distribution.";
    misItemsEl.textContent = "No missegregations recorded.";
    trendEl.textContent = "Log records across days to monitor weekly trend.";
    nextFocusEl.textContent = "Start tracking daily household waste.";
    return;
  }

  // Habit 1: Top Category
  let maxCat = "biodegradable";
  let maxCount = -1;
  Object.keys(categoryCounts).forEach(c => {
    if (categoryCounts[c] > maxCount) {
      maxCount = categoryCounts[c];
      maxCat = c;
    }
  });
  const catShare = Math.round((maxCount / totalQty) * 100);
  const catNames = {
    biodegradable: "Biodegradable (Wet Waste)",
    recyclable: "Dry Recyclables",
    hazardous: "Domestic Hazardous / E-Waste",
    residual: "Residual Landfill Waste"
  };
  topCatEl.innerHTML = `<strong>${catNames[maxCat]}</strong> is your primary waste stream, representing <strong>${catShare}%</strong> (${maxCount} units) of your household's total recorded waste.`;

  // Habit 2: Misplaced items
  const mistakeKeys = Object.keys(mistakeItemsMap);
  if (mistakeKeys.length === 0) {
    misItemsEl.innerHTML = `<strong>Zero Misplaced Items!</strong> Your household is segregating all materials accurately into the correct color-coded bins.`;
  } else {
    const topMistake = mistakeKeys.sort((a, b) => mistakeItemsMap[b] - mistakeItemsMap[a])[0];
    const topFreq = mistakeItemsMap[topMistake];
    misItemsEl.innerHTML = `Your most recurring sorting challenge is <strong>${topMistake}</strong> (${topFreq} misplacement${topFreq > 1 ? "s" : ""}), followed by ${mistakeKeys.slice(1, 3).join(", ") || "no other major items"}.`;
  }

  // Habit 3: Trend
  if (priorWeekAccuracy !== null) {
    const diff = accuracyPct - priorWeekAccuracy;
    if (diff > 0) {
      trendEl.innerHTML = `<strong>Yes, improving!</strong> Your segregation accuracy is up by <strong>+${diff}%</strong> compared with the prior week (${accuracyPct}% vs ${priorWeekAccuracy}%).`;
    } else if (diff < 0) {
      trendEl.innerHTML = `<strong>Declined by ${Math.abs(diff)}%</strong> compared with the prior week (${accuracyPct}% vs ${priorWeekAccuracy}%). Pay special attention to packaging wrappers.`;
    } else {
      trendEl.innerHTML = `<strong>Stable Performance.</strong> Consistency remained steady at ${accuracyPct}% across both weekly observation cycles.`;
    }
  } else {
    trendEl.innerHTML = `Your current household segregation accuracy stands at <strong>${accuracyPct}%</strong> across ${totalQty} units. Continuing to log will plot your 7-day trend curve.`;
  }

  // Habit 4: Next week focus
  let focusMsg = "Maintain your current clean segregation discipline and explore home composting!";
  if (catMistakes.hazardous > 0) {
    focusMsg = "Establish a dedicated, dry cardboard box in your storage closet for batteries and e-waste so they never touch ordinary garbage.";
  } else if (catMistakes.residual > 0 || catMistakes.recyclable > 0) {
    focusMsg = "Enforce the 'Rinse & Dry' rule before placing takeout cartons or pouches into the blue dry recyclables bin.";
  } else if (categoryCounts.biodegradable > totalQty * 0.5) {
    focusMsg = "Since wet food scraps dominate your waste, set up a balcony terracotta composter to divert 50%+ of your trash from dumps!";
  }
  nextFocusEl.innerHTML = `<strong>Primary Action:</strong> ${focusMsg}`;
}

// 6. Generate Rule-Based Personalized Recommendations
function generatePersonalizedRecommendations(catMistakes, mistakeItemsMap, accuracyPct, categoryCounts) {
  const container = document.getElementById("recommendationsContainer");
  if (!container) return;

  const recommendations = [];

  // RULE 1: Hazardous Waste Misplacement
  if (catMistakes.hazardous > 0 || Object.keys(mistakeItemsMap).some(k => k.toLowerCase().includes("battery"))) {
    recommendations.push({
      priority: "high",
      icon: "🔋",
      title: "Set Up a Dedicated Battery / E-Waste Jar",
      body: "Our audit detected batteries or e-waste placed in regular household bins. Batteries contain toxic zinc, nickel, and mercury that contaminate groundwater when dumped. Keep an empty glass jar or box in your home specifically for dead cells and drop them off at local municipal hazardous collection drives.",
      reason: "Triggered by: Recorded domestic hazardous disposal errors in your diary."
    });
  }

  // RULE 2: Oily / Greasy Food Contamination in Recyclables
  if (Object.keys(mistakeItemsMap).some(k => k.toLowerCase().includes("pizza") || k.toLowerCase().includes("oily") || k.toLowerCase().includes("food wrapper"))) {
    recommendations.push({
      priority: "high",
      icon: "🍕",
      title: "Separate Clean Cardboard from Greasy Base Liners",
      body: "Paper recycling mills use water-based pulping. Oil and cheese grease repel water, permanently staining cellulose fibers and ruining entire batches. When ordering takeout, tear off clean cardboard lids for the Blue Bin, and send oil-stained paper to the Black Residual bin.",
      reason: "Triggered by: Contaminated paper packaging logged in your audit history."
    });
  }

  // RULE 3: Recyclables Placed in Residual Landfill
  if (catMistakes.recyclable > 0 || categoryCounts.residual > categoryCounts.recyclable) {
    recommendations.push({
      priority: "medium",
      icon: "♻️",
      title: "Adopt the 'Rinse, Flatten & Dry' Recycling Protocol",
      body: "Plastic milk pouches, juice cartons, and food cans are fully recyclable only when free of sticky food residues. Rinse them quickly, let them air dry, and flatten cartons to preserve collection space in your Blue dry recyclables bin.",
      reason: "Triggered by: High residual disposal proportion and misplaced dry recyclables."
    });
  }

  // RULE 4: High Wet Organic Waste Volume
  if (categoryCounts.biodegradable >= 8) {
    recommendations.push({
      priority: "medium",
      icon: "🌱",
      title: "Begin Dual-Bin Kitchen Separation & Composting",
      body: "Kitchen scraps make up the majority of your household waste volume. When buried in landfills without oxygen, organic peels rot into potent methane gas (CH₄). Keep a compact wet bin under the sink to convert peels into rich garden compost.",
      reason: "Triggered by: High volume of organic biodegradable waste recorded."
    });
  }

  // RULE 5: High Accuracy & Eco Mastery
  if (accuracyPct >= 85 && recommendations.length < 3) {
    recommendations.push({
      priority: "success",
      icon: "🌟",
      title: "Champion Zero-Waste Habits in Your Neighborhood",
      body: "Your household displays exemplary segregation discipline! Take the next leap along the Waste Hierarchy by refusing single-use plastics, shopping with cloth produce bags, and inspiring neighbors to adopt source segregation.",
      reason: "Triggered by: Verified 85%+ household segregation accuracy score."
    });
  }

  // Fallback generic best practice if recommendations count < 3
  if (recommendations.length < 3) {
    recommendations.push({
      priority: "medium",
      icon: "🧤",
      title: "Safely Wrap Sharps & Sanitary Waste for Worker Dignity",
      body: "Always wrap broken glass in thick newspaper or cartons, and wrap sanitary pads securely before placing them in the Black bin. This protects sanitation workers and waste collectors from lacerations and infections.",
      reason: "Triggered by: Standard Indian SWM safety guidelines."
    });
  }

  container.innerHTML = recommendations.slice(0, 3).map(rec => {
    return `
      <div class="rec-card">
        <div class="rec-card-top">
          <span class="rec-icon">${rec.icon}</span>
          <span class="rec-priority-tag ${rec.priority}">${rec.priority} Priority</span>
        </div>
        <h4>${rec.title}</h4>
        <p>${rec.body}</p>
        <div class="rec-reason">${rec.reason}</div>
      </div>
    `;
  }).join("");
}

// 7. Render Audit Table with Bin Used, Status, and Edit Actions
function renderAuditTable(entries) {
  const tableBody = document.getElementById("activityTableBody");
  if (!tableBody) return;

  if (entries.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2.5rem; color: #9CA3AF;">No waste items logged yet. Use the form above to record household disposal activity!</td></tr>`;
    return;
  }

  tableBody.innerHTML = entries.map(entry => {
    const isEntryCorrect = (entry.isCorrect !== undefined) ? entry.isCorrect : (entry.binUsed === entry.recommendedBin);
    const catTagClass = entry.category === "biodegradable" ? "bio" :
      (entry.category === "recyclable" ? "rec" : (entry.category === "hazardous" ? "haz" : "res"));

    const binDef = BIN_DEFINITIONS[entry.binUsed] || { name: entry.binUsed || "Standard", badge: entry.binUsed };
    const statusHtml = isEntryCorrect
      ? `<span class="status-badge correct">✅ Correct (${binDef.badge})</span>`
      : `<span class="status-badge misplaced">⚠️ Misplaced in ${binDef.badge}</span>`;

    return `
      <tr>
        <td>${entry.date}</td>
        <td><strong>${entry.name}</strong></td>
        <td><span class="table-tag ${catTagClass}">${entry.category}</span></td>
        <td>${binDef.name}</td>
        <td>${statusHtml}</td>
        <td>${entry.quantity}</td>
        <td>
          <div class="table-actions-cell">
            <button class="edit-row-btn" onclick="editTrackerEntry('${entry.id}')" title="Edit and correct this record">Edit</button>
            <button class="delete-row-btn" onclick="deleteTrackerEntry('${entry.id}')" title="Delete record">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function updateSummaryChips(counts, total) {
  const sumBioEl = document.getElementById("sumBio");
  const sumRecEl = document.getElementById("sumRec");
  const sumHazEl = document.getElementById("sumHaz");
  const sumResEl = document.getElementById("sumRes");
  const totalBadge = document.getElementById("totalItemsBadge");
  const donutCenter = document.getElementById("donutCenterCount");
  const heroLive = document.getElementById("heroLiveLoggedCount");

  if (sumBioEl) sumBioEl.textContent = counts.biodegradable;
  if (sumRecEl) sumRecEl.textContent = counts.recyclable;
  if (sumHazEl) sumHazEl.textContent = counts.hazardous;
  if (sumResEl) sumResEl.textContent = counts.residual;
  if (totalBadge) totalBadge.textContent = `Total: ${total} Items`;
  if (donutCenter) donutCenter.textContent = total;
  if (heroLive) heroLive.textContent = total;
}

// ============================================================================
// WEEKLY HOUSEHOLD WASTE REPORT & PRINT / PDF ENGINE
// ============================================================================

function initWeeklyReport() {
  const openBtn = document.getElementById("openWeeklyReportModalBtn");
  const closeBtn = document.getElementById("closeWeeklyReportModalBtn");
  const dismissBtn = document.getElementById("dismissReportBtn");
  const printBtn = document.getElementById("printReportBtn");
  const backdrop = document.getElementById("weeklyReportModalBackdrop");
  const navBtn = document.getElementById("openWeeklyReportNavBtn");

  const openReport = () => {
    generateWeeklyReportData();
    if (backdrop) backdrop.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  const closeReport = () => {
    if (backdrop) backdrop.style.display = "none";
    document.body.style.overflow = "";
  };

  if (openBtn) openBtn.addEventListener("click", openReport);
  if (navBtn) navBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openReport();
  });
  if (closeBtn) closeBtn.addEventListener("click", closeReport);
  if (dismissBtn) dismissBtn.addEventListener("click", closeReport);

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

function generateWeeklyReportData() {
  const entries = appState.trackerEntries;
  const now = new Date();
  const currentWeekCutoff = new Date(now);
  currentWeekCutoff.setDate(currentWeekCutoff.getDate() - 7);

  const priorWeekCutoff = new Date(now);
  priorWeekCutoff.setDate(priorWeekCutoff.getDate() - 14);

  // Filter items in the last 7 days
  const weekEntries = entries.filter(e => new Date(e.date) >= currentWeekCutoff);
  const priorWeekEntries = entries.filter(e => {
    const d = new Date(e.date);
    return d >= priorWeekCutoff && d < currentWeekCutoff;
  });

  const dateRangeEl = document.getElementById("reportDateRange");
  const totalQtyEl = document.getElementById("repTotalQty");
  const totalItemsEl = document.getElementById("repTotalItems");
  const accuracyEl = document.getElementById("repAccuracy");
  const accuracyDeltaEl = document.getElementById("repAccuracyDelta");
  const misplacedQtyEl = document.getElementById("repMisplacedQty");
  const scoreEl = document.getElementById("repScore");
  const gradeEl = document.getElementById("repGrade");
  const catTableBody = document.getElementById("repCategoryTableBody");
  const misplacedList = document.getElementById("repMisplacedItemsList");
  const recList = document.getElementById("repRecommendationsList");

  if (dateRangeEl) {
    const fromStr = currentWeekCutoff.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const toStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    dateRangeEl.textContent = `Audit Period: ${fromStr} – ${toStr} (Last 7 Days)`;
  }

  let weekTotalQty = 0;
  let weekCorrectQty = 0;
  let weekIncorrectQty = 0;
  const catCounts = { biodegradable: 0, recyclable: 0, hazardous: 0, residual: 0 };
  const weekMistakesMap = {};

  weekEntries.forEach(entry => {
    const q = entry.quantity || 1;
    weekTotalQty += q;
    if (catCounts[entry.category] !== undefined) {
      catCounts[entry.category] += q;
    }
    const isEntryCorrect = (entry.isCorrect !== undefined) ? entry.isCorrect : (entry.binUsed === entry.recommendedBin);
    if (isEntryCorrect) {
      weekCorrectQty += q;
    } else {
      weekIncorrectQty += q;
      weekMistakesMap[entry.name] = (weekMistakesMap[entry.name] || 0) + q;
    }
  });

  // Prior week accuracy
  let priorTotal = 0;
  let priorCorrect = 0;
  priorWeekEntries.forEach(e => {
    const q = e.quantity || 1;
    priorTotal += q;
    if (e.isCorrect) priorCorrect += q;
  });

  const weekAccuracy = weekTotalQty > 0 ? Math.round((weekCorrectQty / weekTotalQty) * 100) : 100;
  const priorAccuracy = priorTotal > 0 ? Math.round((priorCorrect / priorTotal) * 100) : null;

  if (totalQtyEl) totalQtyEl.textContent = `${weekTotalQty} Units`;
  if (totalItemsEl) totalItemsEl.textContent = `${weekEntries.length} logged entries`;
  if (accuracyEl) accuracyEl.textContent = `${weekAccuracy}%`;

  if (accuracyDeltaEl) {
    if (priorAccuracy !== null) {
      const delta = weekAccuracy - priorAccuracy;
      accuracyDeltaEl.textContent = `${delta >= 0 ? "+" : ""}${delta}% vs prior week (${priorAccuracy}%)`;
      accuracyDeltaEl.style.color = delta >= 0 ? "#10B981" : "#DC2626";
    } else {
      accuracyDeltaEl.textContent = "Initial observation cycle";
      accuracyDeltaEl.style.color = "#6B7280";
    }
  }

  if (misplacedQtyEl) misplacedQtyEl.textContent = weekIncorrectQty;

  // Household Score
  const weekScore = Math.min(100, Math.max(10, Math.round((weekAccuracy * 0.70) + 15 - Math.min(15, (weekMistakesMap['Household AA Battery'] || 0) * 8))));
  if (scoreEl) scoreEl.textContent = `${weekScore} / 100`;
  if (gradeEl) gradeEl.textContent = weekScore >= 85 ? "Grade A (Eco Champion)" : (weekScore >= 70 ? "Grade B (Responsible)" : "Grade C (Developing)");

  // Category Breakdown Table
  if (catTableBody) {
    const streamMeta = [
      { key: "biodegradable", name: "Biodegradable (Wet Waste)", bin: "🟢 Green Bin" },
      { key: "recyclable", name: "Dry Recyclable Materials", bin: "🔵 Blue Bin" },
      { key: "hazardous", name: "Domestic Hazardous / E-Waste", bin: "🔴 Red Bin" },
      { key: "residual", name: "Residual / Landfill Waste", bin: "⚫ Black Bin" }
    ];

    catTableBody.innerHTML = streamMeta.map(stream => {
      const q = catCounts[stream.key] || 0;
      const share = weekTotalQty > 0 ? Math.round((q / weekTotalQty) * 100) : 0;
      const statusText = q > 0 ? "Active Stream" : "No Activity";
      return `
        <tr>
          <td><strong>${stream.name}</strong></td>
          <td>${stream.bin}</td>
          <td>${q}</td>
          <td>${share}%</td>
          <td>${statusText}</td>
        </tr>
      `;
    }).join("");
  }

  // Misplaced items list
  if (misplacedList) {
    const mistakeNames = Object.keys(weekMistakesMap);
    if (mistakeNames.length === 0) {
      misplacedList.innerHTML = `<p style="font-size: 0.85rem; color: #10B981;">✓ <strong>Zero segregation mistakes recorded this week!</strong> All household waste adhered strictly to SWM source segregation standards.</p>`;
    } else {
      misplacedList.innerHTML = `
        <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: #7F1D1D; line-height: 1.5;">
          ${mistakeNames.map(name => {
            const freq = weekMistakesMap[name];
            return `<li><strong>${name}</strong>: Misplaced ${freq} time(s). Contaminates sorting batches or risks toxic chemical leakage.</li>`;
          }).join("")}
        </ul>
      `;
    }
  }

  // Recommendations
  if (recList) {
    recList.innerHTML = `
      <li><strong>Enforce Segregation at Source:</strong> Place distinct color-labeled bins in the kitchen and work area to prevent accidental mixing of dry packaging with wet food peels.</li>
      <li><strong>Check Domestic Hazardous Disposal:</strong> Never discard batteries, electronics, or broken CFL tubes into black household garbage bags. Store them in a dry container for authorized recyclers.</li>
      <li><strong>Wash and Dry Recyclable Plastics:</strong> Rinse food containers, milk sachets, and drink cans thoroughly to prevent mold contamination at municipal recycling processing facilities.</li>
    `;
  }
}

// ============================================================================
// 10. ENVIRONMENTAL IMPACT CALCULATOR (Scientific Estimation Model)
// ============================================================================

let scenarioMode = false;
let scenarioMultiplierWeeks = 4;

function initCalculator() {
  const toggleBtn = document.getElementById("toggleScenarioBtn");
  const drawer = document.getElementById("scenarioDrawer");
  const slider = document.getElementById("weeklyItemsSlider");
  const sliderDisplay = document.getElementById("sliderValueDisplay");
  const durationBtns = document.querySelectorAll("#durationPills .duration-btn");

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener("click", () => {
      scenarioMode = !scenarioMode;
      drawer.style.display = scenarioMode ? "block" : "none";
      toggleBtn.textContent = scenarioMode ? "Close Estimator" : "Open Scenario Estimator";
      updateCalculatorMetrics();
    });
  }

  if (slider && sliderDisplay) {
    slider.addEventListener("input", (e) => {
      sliderDisplay.textContent = `${e.target.value} items/week`;
      updateCalculatorMetrics();
    });
  }

  durationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      durationBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      scenarioMultiplierWeeks = parseInt(btn.dataset.weeks, 10) || 4;
      updateCalculatorMetrics();
    });
  });

  updateCalculatorMetrics();
}

function updateCalculatorMetrics() {
  const divertedEl = document.getElementById("impactDivertedKg");
  const co2El = document.getElementById("impactCo2Kg");
  const treesEl = document.getElementById("impactTrees");
  const energyEl = document.getElementById("impactEnergyKwh");
  const phoneEl = document.getElementById("impactSmartphoneCount");
  const syncedCountEl = document.getElementById("calcSyncedItemCount");

  // Sum tracker items
  let bioQty = 0;
  let recQty = 0;
  let totalTracked = 0;

  appState.trackerEntries.forEach(e => {
    const q = e.quantity || 1;
    totalTracked += q;
    if (e.category === "biodegradable") bioQty += q;
    if (e.category === "recyclable") recQty += q;
  });

  if (syncedCountEl) syncedCountEl.textContent = totalTracked;

  // If in scenario mode, calculate based on slider projections:
  if (scenarioMode) {
    const slider = document.getElementById("weeklyItemsSlider");
    const weeklyRate = slider ? parseInt(slider.value, 10) : 25;
    const projectedTotal = weeklyRate * scenarioMultiplierWeeks;
    // Assume 45% bio, 40% rec, 15% other
    bioQty = projectedTotal * 0.45;
    recQty = projectedTotal * 0.40;
  }

  // MATHEMATICAL LCA FORMULAS (EPA WARM & CPCB factors):
  // 1 item ~ 0.18 kg average weight
  // Bio diverted: bioQty * 0.22 kg
  // Rec diverted: recQty * 0.15 kg
  const divertedKg = (bioQty * 0.22) + (recQty * 0.15);

  // CO2 avoidance:
  // Bio composting prevents ~0.52 kg CO2e/kg wet waste (avoided landfill methane)
  // Dry recycling prevents ~0.85 kg CO2e/kg virgin material synthesis
  const co2AvoidedKg = (bioQty * 0.22 * 0.52) + (recQty * 0.15 * 0.85);

  // Trees preserved: Paper makes up ~35% of recyclables; 1 tonne paper = ~17 trees (0.017 trees/kg)
  const treesEquivalent = (recQty * 0.15 * 0.35) * 0.017;

  // Energy saved: 1 kg recycled material saves ~1.4 kWh embodied energy
  const energySavedKwh = (recQty * 0.15) * 1.4;

  // 1 smartphone full charge ~ 0.012 kWh (83 charges per kWh)
  const phoneCharges = Math.round(energySavedKwh * 83);

  if (divertedEl) divertedEl.textContent = divertedKg.toFixed(2);
  if (co2El) co2El.textContent = co2AvoidedKg.toFixed(2);
  if (treesEl) treesEl.textContent = treesEquivalent.toFixed(3);
  if (energyEl) energyEl.textContent = energySavedKwh.toFixed(2);
  if (phoneEl) phoneEl.textContent = phoneCharges;
}

// ============================================================================
// 11. REUSE & UPCYCLING HUB
// ============================================================================

let currentUpcycleFilter = "all";

function initUpcycling() {
  const pills = document.querySelectorAll("#upcycleFilterPills .upcycle-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentUpcycleFilter = pill.dataset.filter || "all";
      renderUpcyclingCards();
    });
  });

  renderUpcyclingCards();
}

function renderUpcyclingCards() {
  const container = document.getElementById("upcycleCardsGrid");
  if (!container) return;

  const filtered = UPCYCLING_PROJECTS.filter(p => {
    return (currentUpcycleFilter === "all") || (p.category === currentUpcycleFilter);
  });

  container.innerHTML = filtered.map(p => {
    return `
      <div class="upcycle-card glass-panel">
        <div class="upcycle-card-top">
          <span class="upcycle-icon">${p.icon}</span>
          <span class="difficulty-badge ${p.difficulty}">${p.difficulty.toUpperCase()}</span>
        </div>
        <h3>${p.title}</h3>
        <span class="upcycle-materials">📦 Materials: ${p.materials}</span>
        <p class="upcycle-steps">${p.steps}</p>
        <div class="upcycle-footer-tip">
          <strong>🌿 Eco Benefit:</strong> ${p.environmentalBonus}
        </div>
      </div>
    `;
  }).join("");
}

// ============================================================================
// 12. ENVIRONMENTAL STUDIES QUIZ MODULE
// ============================================================================

let quizState = {
  currentIndex: 0,
  score: 0,
  hasAnsweredCurrent: false
};

function initQuiz() {
  const nextBtn = document.getElementById("quizNextBtn");
  const restartBtn = document.getElementById("quizRestartBtn");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      quizState.currentIndex += 1;
      renderQuizQuestion();
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      quizState.currentIndex = 0;
      quizState.score = 0;
      quizState.hasAnsweredCurrent = false;

      const activeScreen = document.getElementById("quizActiveScreen");
      const finishedScreen = document.getElementById("quizFinishedScreen");
      if (activeScreen) activeScreen.style.display = "block";
      if (finishedScreen) finishedScreen.style.display = "none";

      renderQuizQuestion();
    });
  }

  renderQuizQuestion();
}

function renderQuizQuestion() {
  const activeScreen = document.getElementById("quizActiveScreen");
  const finishedScreen = document.getElementById("quizFinishedScreen");
  const total = QUIZ_QUESTIONS.length;

  if (quizState.currentIndex >= total) {
    if (activeScreen) activeScreen.style.display = "none";
    if (finishedScreen) finishedScreen.style.display = "block";
    finishQuiz();
    return;
  }

  quizState.hasAnsweredCurrent = false;

  const q = QUIZ_QUESTIONS[quizState.currentIndex];
  const qIndexEl = document.getElementById("quizQIndex");
  const qTotalEl = document.getElementById("quizQTotal");
  const scoreText = document.getElementById("quizScoreText");
  const progressBar = document.getElementById("quizProgressBar");
  const topicTag = document.getElementById("quizTopicTag");
  const questionText = document.getElementById("quizQuestionText");
  const optionsList = document.getElementById("quizOptionsList");
  const explBox = document.getElementById("quizExplanationBox");

  if (qIndexEl) qIndexEl.textContent = quizState.currentIndex + 1;
  if (qTotalEl) qTotalEl.textContent = total;
  if (scoreText) scoreText.textContent = `${quizState.score} / ${total}`;
  if (progressBar) progressBar.style.width = `${((quizState.currentIndex + 1) / total) * 100}%`;
  if (topicTag) topicTag.textContent = q.topic;
  if (questionText) questionText.textContent = q.question;
  if (explBox) explBox.style.display = "none";

  const letters = ["A", "B", "C", "D"];

  if (optionsList) {
    optionsList.innerHTML = q.options.map((opt, idx) => {
      return `
        <button class="quiz-opt-btn" onclick="handleQuizAnswer(${idx})" data-idx="${idx}">
          <span class="quiz-opt-letter">${letters[idx]}</span>
          <span>${opt}</span>
        </button>
      `;
    }).join("");
  }
}

window.handleQuizAnswer = function(chosenIdx) {
  if (quizState.hasAnsweredCurrent) return;
  quizState.hasAnsweredCurrent = true;

  const q = QUIZ_QUESTIONS[quizState.currentIndex];
  const isCorrect = (chosenIdx === q.correctIndex);

  const optButtons = document.querySelectorAll(".quiz-opt-btn");
  optButtons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) {
      btn.classList.add("correct");
    } else if (idx === chosenIdx) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    soundManager.playCorrect();
    quizState.score += 1;
    const scoreText = document.getElementById("quizScoreText");
    if (scoreText) scoreText.textContent = `${quizState.score} / ${QUIZ_QUESTIONS.length}`;
  } else {
    soundManager.playWrong();
  }

  // Show educational explanation
  const explBox = document.getElementById("quizExplanationBox");
  const explIcon = document.getElementById("explIcon");
  const explTitle = document.getElementById("explTitle");
  const explBody = document.getElementById("explBody");

  if (explIcon) explIcon.textContent = isCorrect ? "✅ Correct!" : "❌ Note for learning:";
  if (explTitle) explTitle.textContent = isCorrect ? "Scientifically Sound Choice" : "Correct Fact:";
  if (explBody) explBody.textContent = q.explanation;
  if (explBox) explBox.style.display = "block";
};

function finishQuiz() {
  soundManager.playFanfare();

  const finalScoreEl = document.getElementById("quizFinalScoreDisplay");
  const gradeCard = document.getElementById("quizGradeCard");
  const badgeIcon = document.getElementById("quizFinalBadge");

  const score = quizState.score;
  const total = QUIZ_QUESTIONS.length;
  if (finalScoreEl) finalScoreEl.textContent = `${score} / ${total}`;

  // Award Eco Points
  addEcoPoints(score * 10, `Quiz completion (${score}/${total})`);

  let title = "Environmental Novice";
  let desc = "You've taken your first steps toward eco-literacy. Re-read the Smart Disposal Guide to elevate your knowledge!";
  let badge = "🌱";

  if (score === 10) {
    title = "Distinguished Environmental Scholar 🎓";
    desc = "Incredible mastery! You demonstrated a complete 100% scientific understanding of lifecycle analysis, hazardous safety, and waste hierarchy.";
    badge = "🌟";
  } else if (score >= 7) {
    title = "Sustainability Advocate 🌍";
    desc = "Strong performance! You have a practical grasp of modern household waste segregation and environmental preservation principles.";
    badge = "🏆";
  } else if (score >= 5) {
    title = "Conscious Citizen 🌿";
    desc = "Decent effort. With a few adjustments to how you treat multi-material packaging and batteries, you will be an expert.";
    badge = "🌿";
  }

  if (badgeIcon) badgeIcon.textContent = badge;
  if (gradeCard) {
    gradeCard.innerHTML = `
      <h3 style="color: var(--color-primary-dark); margin-bottom: 0.5rem;">${title}</h3>
      <p style="font-size: 0.95rem; color: var(--text-body);">${desc}</p>
    `;
  }
}

// ============================================================================
// 13. DAILY ECO CHALLENGES MODULE
// ============================================================================

function initDailyChallenges() {
  const container = document.getElementById("challengeItemsList");
  const resetBtn = document.getElementById("resetChallengesBtn");
  const streakCount = document.getElementById("dailyStreakCount");

  // Streak verification
  const today = new Date().toISOString().split("T")[0];
  if (appState.streakData.lastActiveDate !== today) {
    const lastDate = new Date(appState.streakData.lastActiveDate);
    const currentDate = new Date(today);
    const diffDays = Math.round((currentDate - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      appState.streakData.streak += 1;
    } else if (diffDays > 1) {
      appState.streakData.streak = 1; // reset streak if missed a day
    }
    appState.streakData.lastActiveDate = today;
    saveStorage(STORAGE_KEYS.STREAK, appState.streakData);
  }

  if (streakCount) streakCount.textContent = `${appState.streakData.streak} Day${appState.streakData.streak > 1 ? "s" : ""}`;

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      appState.dailyChallenges = {};
      saveStorage(STORAGE_KEYS.CHALLENGES, {});
      renderDailyChallenges();
      showAppToast("Daily challenges reset for today.");
    });
  }

  renderDailyChallenges();
}

function renderDailyChallenges() {
  const container = document.getElementById("challengeItemsList");
  const compEl = document.getElementById("completedTodayCount");
  if (!container) return;

  let completedCount = 0;

  container.innerHTML = DAILY_CHALLENGES.map(ch => {
    const isDone = !!appState.dailyChallenges[ch.id];
    if (isDone) completedCount += 1;

    return `
      <div class="challenge-item-card ${isDone ? 'completed' : ''}" onclick="toggleChallenge('${ch.id}', ${ch.points})">
        <input 
          type="checkbox" 
          class="ch-checkbox" 
          ${isDone ? 'checked' : ''} 
          onclick="event.stopPropagation(); toggleChallenge('${ch.id}', ${ch.points})"
          aria-label="${ch.title}"
        >
        <div class="ch-content">
          <h4 class="ch-title">${ch.title}</h4>
          <p class="ch-desc">${ch.desc}</p>
        </div>
        <span class="ch-pts-badge">+${ch.points} Pts</span>
      </div>
    `;
  }).join("");

  if (compEl) compEl.textContent = completedCount;
}

window.toggleChallenge = function(id, pts) {
  const currentState = !!appState.dailyChallenges[id];
  appState.dailyChallenges[id] = !currentState;
  saveStorage(STORAGE_KEYS.CHALLENGES, appState.dailyChallenges);

  if (!currentState) {
    soundManager.playCorrect();
    addEcoPoints(pts, "Daily Eco Challenge");
  }

  renderDailyChallenges();
};

// ============================================================================
// 14. NAVIGATION & MOBILE HAMBURGER
// ============================================================================

function initNavbar() {
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });

    // Close menu when clicking a link
    navItems.forEach(item => {
      item.addEventListener("click", () => {
        links.classList.remove("open");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Update active nav link on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("main section");
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        const id = section.getAttribute("id");
        navItems.forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  });
}

// ============================================================================
// 15. INITIALIZATION ON DOM READY
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all subsystems
  initNavbar();
  updateEcoPointsDisplay();
  initClassifier();
  initGame();
  initTracker();
  initCalculator();
  initUpcycling();
  initQuiz();
  initDailyChallenges();

  console.log("WasteWise Platform initialized successfully with 36 items and local persistence.");
});
