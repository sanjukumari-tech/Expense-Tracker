export interface ItineraryStep {
  time: string;
  title: string;
  description: string;
}

export interface PricingItem {
  label: string;
  price: string;
  note?: string;
}

export interface Package {
  id: string;
  slug: string;
  name: string;
  category: "rafting" | "bungee";
  price: number;
  originalPrice: number;
  distance: string;
  difficulty: string;
  duration: string;
  description: string;
  image: string;
  features: string[];
  // Detail page fields
  about: string;
  highlights: string[];
  itinerary: ItineraryStep[];
  pricing: PricingItem[];
  inclusions: string[];
  exclusions: string[];
  status?: string;
}

export const PACKAGES: Package[] = [
  {
    id: "rafting-12km",
    slug: "rishikesh-river-rafting-12km",
    name: "RISHIKESH RIVER RAFTING 12KM",
    category: "rafting",
    price: 699,
    originalPrice: 799,
    distance: "12 KM",
    difficulty: "Easy to Moderate",
    duration: "2-3 Hours",
    description:
      "Perfect for beginners and families. Raft from Brahmpuri to Rishikesh through exciting rapids like Initiation, Double Trouble, and Hilton.",
    image: "/rafting_hero.png",
    features: [
      "Certified rafting guide",
      "High-quality safety gear (Life Jacket, Helmet)",
      "Brahmpuri to Rishikesh route",
      "Grade I & II rapids (perfect for first-timers)",
      "Detailed safety briefing & training",
    ],
    about:
      "The 12km river rafting stretch from Brahmpuri to Rishikesh is the most beginner-friendly rafting experience on the Ganges. Paddle through the serene Himalayan valley as your certified guide navigates you through thrilling Grade I & II rapids. The crystal-clear waters, towering cliffs, and lush green hills create a magical backdrop for your first white-water adventure. This stretch is perfect for families with kids (above 14 years) and anyone looking to experience the joy of rafting without extreme intensity. Between rapids you'll float through calm stretches ideal for body surfing and cliff jumping.",
    highlights: [
      "Paddle through 5+ exciting rapids",
      "Body surfing in calm stretches",
      "Stunning Himalayan gorge views",
      "Professional GoPro photography available",
      "No prior experience needed",
    ],
    itinerary: [
      {
        time: "08:00 AM",
        title: "Pickup & Transfer",
        description:
          "Meet at our Rishikesh basecamp. Board our vehicle for a scenic 20-minute drive to Brahmpuri starting point.",
      },
      {
        time: "08:30 AM",
        title: "Safety Briefing & Gear Up",
        description:
          "Receive your life jacket, helmet, and paddle. Our certified guide explains paddling commands, safety protocols, and what to expect.",
      },
      {
        time: "09:00 AM",
        title: "Launch into the Rapids",
        description:
          "Push off into the Ganges! Navigate through rapids like Initiation, Double Trouble, and Hilton while enjoying breathtaking valley views.",
      },
      {
        time: "10:00 AM",
        title: "Body Surfing & Cliff Jump",
        description:
          "Take a break in a calm stretch for body surfing and an optional cliff jump into the deep, clear river waters.",
      },
      {
        time: "11:00 AM",
        title: "Finish at Rishikesh",
        description:
          "Arrive at the Rishikesh endpoint. Change out of wet gear and transfer back to basecamp. Photos available for purchase.",
      },
    ],
    pricing: [
      { label: "Per Person (Weekday)", price: "₹699", note: "Mon–Fri" },
      { label: "Per Person (Weekend)", price: "₹849", note: "Sat & Sun (+₹150)" },
      { label: "Group of 5+", price: "₹649/person", note: "Special group rate" },
      { label: "GoPro Photo/Video", price: "₹300", note: "Optional add-on" },
    ],
    inclusions: [
      "Professional certified rafting guide",
      "High-quality life jacket & helmet",
      "Paddle & raft equipment",
      "Safety briefing & training",
      "Transport to starting point",
      "Changing room facility",
      "First-aid support on river",
    ],
    exclusions: [
      "Personal expenses & tips",
      "GoPro photos/videos (₹300 extra)",
      "Meals and refreshments",
      "Travel insurance",
      "Waterproof phone pouch",
    ],
  },
  {
    id: "rafting-14km",
    slug: "rishikesh-river-rafting-14km",
    name: "Rishikesh River Rafting (14km)",
    category: "rafting",
    price: 799,
    originalPrice: 1199,
    distance: "14 KM",
    difficulty: "Moderate",
    duration: "3-4 Hours",
    description:
      "The most popular rafting stretch. Experience the adrenaline of Grade III rapids from Shivpuri to Rishikesh with breathtaking gorge views.",
    image: "/rafting_gallery_1.png",
    features: [
      "Certified expert white-water guide",
      "Premium safety equipment",
      "Shivpuri to Rishikesh route",
      "Grade II & III rapids (Roller Coaster, Golf Course)",
      "Body surfing opportunity in calm stretches",
    ],
    about:
      "The 14km stretch from Shivpuri to Rishikesh is our most popular adventure and the gold standard of Rishikesh rafting. This route features the perfect blend of thrilling Grade II & III rapids — including the legendary Roller Coaster, Golf Course, and Club House rapids — and peaceful stretches where you can take in the awe-inspiring Himalayan gorge scenery. The river narrows through dramatic rock formations, creating powerful waves that will have you screaming with excitement. Ideal for those who've tried rafting before or want a more intense first-time experience.",
    highlights: [
      "Famous Roller Coaster & Golf Course rapids",
      "8+ exciting rapids in total",
      "Dramatic rock gorge formations",
      "Body surfing & cliff jumping included",
      "Most popular rafting stretch in Rishikesh",
    ],
    itinerary: [
      {
        time: "08:00 AM",
        title: "Pickup & Transfer to Shivpuri",
        description:
          "Meet at Rishikesh basecamp. Enjoy a scenic 30-minute drive upstream to Shivpuri through winding mountain roads.",
      },
      {
        time: "08:45 AM",
        title: "Safety Briefing & Gear Up",
        description:
          "Receive premium safety gear. Expert guide covers advanced paddling techniques, rapid navigation, and rescue protocols.",
      },
      {
        time: "09:15 AM",
        title: "Navigate Grade II & III Rapids",
        description:
          "Hit the water and crash through Shivpuri rapids! Experience Roller Coaster, Golf Course, Club House, and more as the Ganges roars.",
      },
      {
        time: "10:30 AM",
        title: "Body Surfing & Cliff Jumping",
        description:
          "Pause in calm waters for body surfing and a thrilling cliff jump. Swim in the crystal-clear Ganges under the open sky.",
      },
      {
        time: "11:30 AM",
        title: "Final Rapids & Finish",
        description:
          "Navigate the last set of rapids before arriving at Rishikesh. Dry off, change, and collect your adventure memories.",
      },
    ],
    pricing: [
      { label: "Per Person (Weekday)", price: "₹799", note: "Mon–Fri" },
      { label: "Per Person (Weekend)", price: "₹949", note: "Sat & Sun (+₹150)" },
      { label: "Group of 5+", price: "₹749/person", note: "Special group rate" },
      { label: "GoPro Photo/Video", price: "₹300", note: "Optional add-on" },
    ],
    inclusions: [
      "Expert certified white-water guide",
      "Premium life jacket & helmet",
      "Paddle & raft equipment",
      "Advanced safety briefing",
      "Transport to Shivpuri starting point",
      "Changing room facility",
      "First-aid & river rescue support",
      "Body surfing session",
    ],
    exclusions: [
      "Personal expenses & tips",
      "GoPro photos/videos (₹300 extra)",
      "Meals and refreshments",
      "Travel insurance",
      "Waterproof phone pouch",
    ],
  },
  {
    id: "rafting-16km",
    slug: "rishikesh-river-rafting-16km",
    name: "Rishikesh River Rafting (16km)",
    category: "rafting",
    price: 999,
    originalPrice: 1499,
    distance: "16 KM",
    difficulty: "Challenging",
    duration: "4 Hours",
    description:
      "For hardcore adventure lovers. Battle massive rapids from Marine Drive to Rishikesh for the ultimate adrenaline rush.",
    image: "/rafting_gallery_2.png",
    features: [
      "Elite white-water rescue guide",
      "Full premium safety setup",
      "Marine Drive to Rishikesh route",
      "Grade III & IV rapids (Three Blind Mice, The Wall)",
      "Cliff jumping and body surfing included",
    ],
    about:
      "The 16km stretch from Marine Drive to Rishikesh is the ultimate river rafting experience in Rishikesh — reserved for those who crave serious adrenaline. This is the longest commercially available rafting stretch, featuring intense Grade III & IV rapids including the notorious Three Blind Mice, The Wall, and Sweet Sixteen. You'll battle massive waves, navigate tight gorge sections, and experience the raw power of the Ganges at its most exciting. The stunning wilderness scenery, with zero road access along parts of the route, makes this feel like a true expedition. Recommended for experienced rafters or adventurous souls.",
    highlights: [
      "Longest rafting stretch — 16km of pure thrill",
      "Notorious Three Blind Mice & The Wall rapids",
      "12+ rapids including Grade IV intensity",
      "Wilderness gorge with no road access",
      "Cliff jumping from 20ft rocks",
    ],
    itinerary: [
      {
        time: "07:30 AM",
        title: "Early Pickup & Transfer to Marine Drive",
        description:
          "Meet at basecamp for an early start. Drive 45 minutes upstream through stunning mountain terrain to Marine Drive launch point.",
      },
      {
        time: "08:30 AM",
        title: "Intensive Safety Briefing",
        description:
          "Elite guide conducts an in-depth briefing covering Grade IV rapid protocols, advanced rescue techniques, and team coordination.",
      },
      {
        time: "09:00 AM",
        title: "Conquer Grade III & IV Rapids",
        description:
          "Launch into the most intense section of the Ganges. Battle Three Blind Mice, Cross Fire, and The Wall in quick succession.",
      },
      {
        time: "10:30 AM",
        title: "Cliff Jumping & Body Surfing",
        description:
          "Take a breather with 20ft cliff jumps and body surfing in deep pools surrounded by untouched wilderness.",
      },
      {
        time: "11:00 AM",
        title: "More Rapids & Scenic Float",
        description:
          "Continue through Roller Coaster and Golf Course rapids, then float through a breathtaking narrow gorge section.",
      },
      {
        time: "12:00 PM",
        title: "Finish at Rishikesh",
        description:
          "Navigate the final rapids and arrive at Rishikesh. Celebrate your accomplishment, change, and collect adventure footage.",
      },
    ],
    pricing: [
      { label: "Per Person (Weekday)", price: "₹999", note: "Mon–Fri" },
      { label: "Per Person (Weekend)", price: "₹1,149", note: "Sat & Sun (+₹150)" },
      { label: "Group of 5+", price: "₹899/person", note: "Special group rate" },
      { label: "GoPro Photo/Video", price: "₹300", note: "Optional add-on" },
    ],
    inclusions: [
      "Elite certified white-water rescue guide",
      "Full premium safety equipment",
      "Paddle & expedition-grade raft",
      "Intensive safety briefing & training",
      "Transport to Marine Drive starting point",
      "Changing room & locker facility",
      "River rescue team support",
      "Cliff jumping & body surfing sessions",
    ],
    exclusions: [
      "Personal expenses & tips",
      "GoPro photos/videos (₹300 extra)",
      "Meals and refreshments",
      "Travel insurance",
      "Waterproof phone pouch",
    ],
  },
  {
    id: "ganga-bungy-219m",
    slug: "ganga-bungy-219m",
    name: "Bungee- Ganga Bungy 219 MTR + DSLR Video",
    category: "bungee",
    price: 5999,
    originalPrice: 7499,
    distance: "219 Meters",
    difficulty: "Extreme Adventure",
    duration: "2 Hours",
    description:
      "India's highest bungee jumping experience. Leap a massive 219 meters over the Ganga river canyon with professional DSLR recording.",
    image: "/ganga_bungy_219m.png",
    status: "Top Rated",
    features: [
      "Highest bungee platform in India (219M)",
      "High-definition DSLR multi-angle video included",
      "World-class safety rig & harnesses",
      "Australia-certified bungee masters",
      "Special gold completion certificate",
    ],
    about:
      "Unleash the ultimate gravity defiance with the Ganga Bungy 219 MTR, currently the highest bungee jumping experience in all of India. Suspended from a spectacular, high-tension steel suspension structure crossing the sacred Ganga gorge, you will plunge a massive 219 meters into a gorgeous natural valley. The package includes professional DSLR video recordings from multiple angles to capture every heartbeat of your 5-second free fall. The jump is operated under strict international safety regulations and guided by certified safety officers.",
    highlights: [
      "India's highest jump at 219 meters",
      "DSLR video recording from multiple angles included",
      "Certified premium safety lines and backup harnesses",
      "Spectacular view of the winding Ganga river gorge",
      "Gold completion certificate",
    ],
    itinerary: [
      {
        time: "08:30 AM",
        title: "Registration & Medical Check",
        description:
          "Report at the Ganga Bungy base camp. Complete weight verify, pulse check, and medical fitness clearance.",
      },
      {
        time: "09:00 AM",
        title: "Safety Briefing & Gear Up",
        description:
          "Instructors demonstrate the jumping posture. Get equipped with professional chest and ankle harnesses.",
      },
      {
        time: "09:30 AM",
        title: "Walk to the Launch Deck",
        description:
          "Walk out along the steel truss bridge deck 219 meters above the rushing blue water.",
      },
      {
        time: "10:00 AM",
        title: "The 219M Plunge",
        description:
          "Jump! Enjoy 5 seconds of incredible free fall with rebound swings while DSLR cameras capture your journey.",
      },
      {
        time: "10:30 AM",
        title: "Recovery & DSLR Video Collection",
        description:
          "Retrieved by the bottom crew, trek back up. Collect your Dare to Jump certificate and multi-angle DSLR footage.",
      },
    ],
    pricing: [
      { label: "Bungee Jump + DSLR Video", price: "₹6,499", note: "Standard Package" },
      { label: "Photo Package", price: "₹400", note: "Optional digital photos" },
      { label: "Photo + Video Combo", price: "₹6,799", note: "Best value bundle" },
    ],
    inclusions: [
      "219m bungee jump entry slot",
      "DSLR multi-angle video recording",
      "Certified jump master guidance",
      "Double-redundancy safety harness",
      "Gold completion certificate",
      "Safety gear & briefing",
    ],
    exclusions: [
      "Snacks and meals",
      "Personal expenses",
      "Travel to the location",
    ],
  },
  {
    id: "splash-bungy-85m",
    slug: "splash-bungy-85m",
    name: "Bungee- Splash Bungy 85 MTR Bungy",
    category: "bungee",
    price: 2500,
    originalPrice: 3500,
    distance: "85 Meters",
    difficulty: "Extreme Adventure",
    duration: "1.5 Hours",
    description:
      "A thrilling 85-meter free fall diving close to a water pool with high safety ropes and Australia-certified jump masters.",
    image: "/bungee_jumping.png",
    features: [
      "85-meter tall leap platform",
      "Australia-trained jump masters",
      "Double-redundancy safety rope systems",
      "Completion certificate included",
    ],
    about:
      "Experience a spectacular adrenaline rush with the Splash Bungy 85 MTR. Plunge from an 85-meter cantilever platform suspended above a lush forest valley, diving down towards the recovery zone. The entire operation is managed under international guidelines with certified ropes, harnesses, and safety checkers.",
    highlights: [
      "85-meter free fall experience",
      "Australia-trained safety team",
      "Surrounded by beautiful green wilderness",
      "Completion certificate",
    ],
    itinerary: [
      {
        time: "09:00 AM",
        title: "Registration & Briefing",
        description:
          "Report at the facility, complete registration forms and weight measurement.",
      },
      {
        time: "09:30 AM",
        title: "Equipment & Harnessing",
        description:
          "Get secured with chest and ankle harnesses inspected by double safety checkers.",
      },
      {
        time: "10:00 AM",
        title: "The Jump",
        description:
          "Step to the edge, spread your arms, and dive headfirst into the open valley air.",
      },
      {
        time: "10:30 AM",
        title: "Retrieval & Certificate",
        description:
          "Lowered slowly to the drop deck, walk back to the base to receive your certificate.",
      },
    ],
    pricing: [
      { label: "Bungee Jump Slot", price: "₹2,500", note: "Per person per jump" },
      { label: "HD Video Recording", price: "₹500", note: "Optional add-on" },
      { label: "Photo Package", price: "₹300", note: "Optional add-on" },
    ],
    inclusions: [
      "85m bungee jump entry",
      "Certified jump master guidance",
      "Double safety harness setup",
      "Dare to Jump certificate",
      "Safety gear & training",
    ],
    exclusions: [
      "Video/photo packages (extra)",
      "Meals and refreshments",
      "Travel expenses",
    ],
  },
  {
    id: "jumping-heights-bungee",
    slug: "jumping-heights-bungee",
    name: "Bungee Jumping Heights ( Rishikesh Only River View Bungy )",
    category: "bungee",
    price: 3999,
    originalPrice: 4600,
    distance: "83 Meters",
    difficulty: "Extreme Adventure",
    duration: "1.5 Hours",
    description:
      "Leap off India's premier fixed platform. A thrilling, premium bungee jumping experience under absolute safety standards.",
    image: "/bungee_jumping.png",
    status: "Fast Filling",
    features: [
      "India's first fixed cantilever platform",
      "83 meters high leap over a tributary of Ganges",
      "Australia-trained jump masters",
      "Double-redundancy safety harness",
      "Official Dare to Jump completion certificate",
    ],
    about:
      "Jumping Heights is India's premier bungee jumping destination in Rishikesh. Leap from a spectacular cantilever platform suspended 83 meters over a rocky cliff and the river Hall, a tributary of the Ganges. Operated by retired army officers and Australia-trained jump masters, it offers the highest safety standards in India. Experience a heart-pounding 3-4 seconds of pure free fall followed by rebound swings before being lowered to a drop zone. Weight limit: 40–110 kg. Minimum age: 12 years.",
    highlights: [
      "83-meter free fall — India's famous fixed platform",
      "Australia-trained & certified safety crew",
      "Gorgeous valley and river bend views",
      "High-definition video and photo options",
      "Official completion certificate included",
    ],
    itinerary: [
      {
        time: "09:00 AM",
        title: "Arrival & Registration",
        description:
          "Report at Jumping Heights basecamp. Complete weight check, medical declarations, and registration forms.",
      },
      {
        time: "09:30 AM",
        title: "Safety Briefing & Equipment",
        description:
          "Receive a thorough briefing from certified instructors. Get fitted with ankle straps and body harness.",
      },
      {
        time: "10:00 AM",
        title: "The Cantilever Walk",
        description:
          "Walk out onto the steel cantilever bridge extending over the stunning mountain valley.",
      },
      {
        time: "10:15 AM",
        title: "The Jump!",
        description:
          "Stand at the edge, hear the count down: 3... 2... 1... Bungee! Feel the ultimate adrenaline rush of free fall.",
      },
      {
        time: "10:30 AM",
        title: "Lowering & Recovery",
        description:
          "Lowered slowly to the riverbed drop zone. Enjoy a short trek back up and collect your Dare to Jump certificate.",
      },
    ],
    pricing: [
      { label: "Bungee Jump Slot", price: "₹3,999", note: "Per person per jump" },
      { label: "HD Video Recording", price: "₹900", note: "Optional high-res footage" },
      { label: "Photo Package", price: "₹400", note: "Optional digital photos" },
      { label: "Combo (Video + Photo)", price: "₹1,100", note: "Best value add-on" },
    ],
    inclusions: [
      "83m bungee jump entry slot",
      "Australia-trained jump master guidance",
      "Double-redundancy safety harness",
      "Dare to Jump certificate",
      "Registration & safety gear",
      "Medical/weight check",
    ],
    exclusions: [
      "Video/photo packages (extra)",
      "Personal expenses & snacks",
      "Travel to the venue",
      "Travel insurance",
    ],
  },
  {
    id: "himalayan-bungee",
    slug: "himalayan-bungee-111m",
    name: "Bungee- Himalayan Bungee 111 Mtr",
    category: "bungee",
    price: 3599,
    originalPrice: 4000,
    distance: "111 Meters",
    difficulty: "Extreme Adventure",
    duration: "1.5 Hours",
    description:
      "Vast 111-meter giant free fall surrounded by scenic Himalayan forests and valleys under international safety protocols.",
    image: "/bungee_jumping.png",
    features: [
      "Vast 111-meter platform height",
      "Surrounded by scenic Himalayan forest",
      "State-of-the-art international safety gear",
      "Highly trained safety instructors",
      "Dare to Jump completion certificate",
    ],
    about:
      "Take a leap of faith from the Himalayan Bungee platform, dropping a massive 111 meters into a deep, lush green ravine. Nestled inside a private wilderness valley near Rishikesh, this bungee jumping experience combines adrenaline with spectacular natural beauty. Guided by international safety experts, you will jump using specialized elastic cords designed to absorb shocks. It's one of the highest jumps in the region and offers a thrilling sensation of flying.",
    highlights: [
      "Massive 111m height for an extended free fall",
      "Stunning scenic views of forest and valleys",
      "High-tech safety harnesses and ropes",
      "High-definition video and photo options",
      "Official completion certificate",
    ],
    itinerary: [
      {
        time: "09:00 AM",
        title: "Arrival & Registration",
        description:
          "Report at the Himalayan Bungee facility, complete weight checks and safety forms.",
      },
      {
        time: "09:30 AM",
        title: "Safety Briefing & Equipment",
        description:
          "Safety officers detail the jumping technique. You are secured with double-redundancy ankle and chest harnesses.",
      },
      {
        time: "10:00 AM",
        title: "The Platform Walk",
        description:
          "Walk out onto the high-rise platform and prepare yourself mentally for the ultimate dive.",
      },
      {
        time: "10:15 AM",
        title: "The Jump!",
        description:
          "Take the leap! Jump headfirst into 4 seconds of exhilarating free fall over the green canyon.",
      },
      {
        time: "10:30 AM",
        title: "Recovery & Certificate",
        description:
          "Recovered safely at the bottom, walk back to the base camp to receive your completion certificate.",
      },
    ],
    pricing: [
      { label: "Bungee Jump Slot", price: "₹3,599", note: "Per person per jump" },
      { label: "HD Video Recording", price: "₹800", note: "Optional high-res footage" },
      { label: "Photo Package", price: "₹350", note: "Optional digital photos" },
      { label: "Combo (Video + Photo)", price: "₹1,000", note: "Best value add-on" },
    ],
    inclusions: [
      "111m bungee jump entry slot",
      "Certified jump master guidance",
      "Premium safety harness",
      "Dare to Jump certificate",
      "Registration & safety gear",
    ],
    exclusions: [
      "Video/photo packages (extra)",
      "Personal expenses & snacks",
      "Travel to the venue",
    ],
  },
  {
    id: "splash-bungee-109m",
    slug: "splash-bungee-109m",
    name: "Bungee- Splash Bungee 109MTR",
    category: "bungee",
    price: 3399,
    originalPrice: 4000,
    distance: "109 Meters",
    difficulty: "Extreme Adventure",
    duration: "1.5 Hours",
    description:
      "A unique bungee jump from 109 meters where you get extremely close to a blue water channel for the ultimate thrill.",
    image: "/splash_bungee_109m.png",
    features: [
      "Thrilling dip near the water surface",
      "109-meter total platform height",
      "Double-redundancy safety setup",
      "Australia-certified jump masters",
      "Dare to Jump certificate included",
    ],
    about:
      "Splash Bungee 109MTR is a unique bungee jumping experience near Rishikesh where you jump from 109 meters high and enjoy a thrilling drop close to the water surface. The beautiful blue-green water below and the towering mountains create a stunning environment for this extreme sport. The setup complies with highest global safety regulations, featuring double-redundancy ropes and body harnesses for an absolute peace of mind.",
    highlights: [
      "109m jump height close to water surface",
      "Australia-certified jump master guides",
      "Breathtaking views of the water channel below",
      "High-definition video and photo options",
      "Official completion certificate",
    ],
    itinerary: [
      {
        time: "09:00 AM",
        title: "Arrival & Registration",
        description:
          "Report at the Splash Bungee base, complete weight measurements and health questionnaires.",
      },
      {
        time: "09:30 AM",
        title: "Safety Briefing & Equipment",
        description:
          "Briefing from jumping experts. Harness fitting with high-safety elastic cords.",
      },
      {
        time: "10:00 AM",
        title: "The Platform Walk",
        description:
          "Walk out along the custom ramp leading to the jump deck directly above the water channel.",
      },
      {
        time: "10:15 AM",
        title: "The Jump!",
        description:
          "Leap into the air, falling toward the water, experiencing the ultimate rush of gravity.",
      },
      {
        time: "10:30 AM",
        title: "Recovery & Certificate",
        description:
          "Gently retrieved at the bottom recovery deck. Head to base camp for your Dare to Jump certificate.",
      },
    ],
    pricing: [
      { label: "Bungee Jump Slot", price: "₹3,399", note: "Per person per jump" },
      { label: "HD Video & Photo Combo", price: "₹900", note: "Optional digital memories" },
    ],
    inclusions: [
      "109m bungee jump entry slot",
      "Certified jump master guidance",
      "Premium safety harness",
      "Dare to Jump certificate",
      "Registration & safety gear",
    ],
    exclusions: [
      "Video/photo packages (extra)",
      "Personal expenses & snacks",
      "Travel to the venue",
    ],
  },
];
