// Constants
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const COUNTRIES = [
    "India", "United States", "United Kingdom", "Canada", "Australia",
    "United Arab Emirates", "Saudi Arabia", "Singapore", "Malaysia", "Germany",
    "France", "Japan", "Sri Lanka", "Nepal", "Bangladesh", "Pakistan",
    "China", "South Africa", "Brazil", "Italy", "Spain", "Netherlands",
    "Switzerland", "Qatar", "Oman", "Kuwait", "Bahrain", "New Zealand",
    "Thailand", "Indonesia", "Vietnam", "Philippines", "Egypt", "Nigeria",
    "Kenya", "Russia", "South Korea", "Turkey", "Mexico", "Argentina"
];

// Hierarchical Country -> State/Province -> District/Capital -> City/Area data structure
const LOCATION_DATA = {
    "India": {
        states: {
            "Tamil Nadu": {
                districts: {
                    "Chennai": ["T. Nagar", "Velachery", "Anna Nagar", "Adyar", "Mylapore", "Tambaram", "Guindy", "Chromepet"],
                    "Coimbatore": ["Gandhipuram", "Peelamedu", "RS Puram", "Singanallur", "Saravanampatti", "Kovaipudur"],
                    "Madurai": ["Simmakkal", "Goripalayam", "Anna Nagar", "Mattuthavani", "KK Nagar", "Tiruparankundram"],
                    "Tiruchirappalli": ["Thillai Nagar", "Cantonment", "Srirangam", "KK Nagar"],
                    "Salem": ["Fairlands", "Hasthampatti", "Suramangalam", "Four Roads", "Ammapet"],
                    "Tirunelveli": ["Palayamkottai", "Town Area", "High Ground", "Vannarpettai"],
                    "Vellore": ["Katpadi", "Sathuvachari", "Gandhinagar", "Vellore Fort Area"],
                    "Erode": ["Perundurai", "Bhavani", "Solar", "Collectorate Area"],
                    "Thoothukudi": ["Kovilpatti", "Beach Road", "Spic Nagar", "New Colony"],
                    "Kanchipuram": ["Kanchipuram Town", "Sriperumbudur"],
                    "Kanyakumari": ["Nagercoil (Capital)", "Marthandam", "Kanyakumari Beach"],
                    "Dindigul": ["Dindigul Town", "Palani", "Kodaikanal"],
                    "Thanjavur": ["Thanjavur Town", "Kumbakonam"]
                }
            },
            "Kerala": {
                districts: {
                    "Thiruvananthapuram": ["Trivandrum City (Capital)", "Kovalam", "Kazhakkoottam"],
                    "Ernakulam (Kochi)": ["MG Road", "Edapally", "Fort Kochi", "Aluva"],
                    "Kozhikode": ["Kozhikode Town", "Mananchira"],
                    "Thrissur": ["Thrissur Town", "Guruvayur"],
                    "Palakkad": ["Palakkad Town", "Ottapalam"]
                }
            },
            "Karnataka": {
                districts: {
                    "Bengaluru": ["Bengaluru (Capital)", "Indiranagar", "Koramangala", "Whitefield", "HSR Layout"],
                    "Mysuru": ["Mysuru Town", "Gokulam"],
                    "Dakshina Kannada": ["Mangaluru", "Udupi Border"],
                    "Hubballi-Dharwad": ["Hubballi Town", "Dharwad Town"]
                }
            },
            "Andhra Pradesh": {
                districts: {
                    "Visakhapatnam": ["Vizag Beach Road", "Gajuwaka"],
                    "NTR (Vijayawada)": ["Vijayawada City", "Benz Circle"],
                    "Guntur": ["Amaravati (Capital)", "Guntur City"],
                    "Tirupati": ["Tirupati Town", "Renigunta"]
                }
            },
            "Telangana": {
                districts: {
                    "Hyderabad": ["Hyderabad (Capital)", "Banjara Hills", "Hitech City", "Secunderabad"],
                    "Warangal": ["Warangal Town", "Kazipet"]
                }
            },
            "Maharashtra": {
                districts: {
                    "Mumbai Suburban": ["Mumbai (Capital)", "Andheri", "Bandra", "Juhu"],
                    "Pune": ["Pune City", "Kothrud", "Hinjawadi"],
                    "Nagpur": ["Nagpur City", "Sitabuldi"]
                }
            },
            "Delhi": {
                districts: {
                    "New Delhi": ["New Delhi (Capital)", "Connaught Place", "Chanakyapuri"],
                    "South Delhi": ["Saket", "Hauz Khas", "Greater Kailash"]
                }
            }
        }
    },
    "Singapore": {
        states: {
            "Central Region": {
                districts: {
                    "Singapore Capital District": ["Singapore City (Capital)", "Downtown Core", "Orchard Road", "Marina Bay", "Raffles Place"]
                }
            },
            "East Region": {
                districts: {
                    "Changi & Tampines": ["Changi Airport Area", "Tampines Central", "Bedok", "Pasir Ris"]
                }
            },
            "West Region": {
                districts: {
                    "Jurong & Clementi": ["Jurong East", "Jurong West", "Clementi", "Boon Lay"]
                }
            },
            "North Region": {
                districts: {
                    "Woodlands & Yishun": ["Woodlands Central", "Yishun", "Sembawang"]
                }
            }
        }
    },
    "Malaysia": {
        states: {
            "Federal Territory": {
                districts: {
                    "Kuala Lumpur": ["Kuala Lumpur (Capital)", "Bukit Bintang", "KLCC", "Cheras", "Mont Kiara"]
                }
            },
            "Selangor": {
                districts: {
                    "Petaling": ["Shah Alam (State Capital)", "Petaling Jaya", "Subang Jaya", "Puchong"],
                    "Klang": ["Klang Town", "Port Klang"]
                }
            },
            "Penang": {
                districts: {
                    "Northeast Penang": ["George Town (Capital)", "Bayan Lepas", "Batu Ferringhi"]
                }
            },
            "Johor": {
                districts: {
                    "Johor Bahru": ["Johor Bahru (Capital)", "Skudai", "Iskandar Puteri"]
                }
            }
        }
    },
    "United Arab Emirates": {
        states: {
            "Abu Dhabi Emirate": {
                districts: {
                    "Abu Dhabi Capital Region": ["Abu Dhabi (UAE Capital)", "Yas Island", "Corniche", "Al Ain"]
                }
            },
            "Dubai Emirate": {
                districts: {
                    "Dubai City": ["Dubai City", "Downtown Dubai", "Dubai Marina", "Deira", "Bur Dubai", "Jumeirah"]
                }
            },
            "Sharjah Emirate": {
                districts: {
                    "Sharjah City": ["Sharjah City Center", "Al Majaz", "Al Nahda"]
                }
            }
        }
    },
    "Saudi Arabia": {
        states: {
            "Riyadh Province": {
                districts: {
                    "Riyadh District": ["Riyadh (Capital)", "Olaya", "Al Malaz", "Diriyah"]
                }
            },
            "Makkah Province": {
                districts: {
                    "Jeddah": ["Jeddah City", "Al Balad", "Corniche"],
                    "Mecca": ["Mecca City (Holy Capital)", "Al Aziziyah"]
                }
            },
            "Eastern Province": {
                districts: {
                    "Dammam & Khobar": ["Dammam (Capital)", "Al Khobar", "Dhahran"]
                }
            }
        }
    },
    "Sri Lanka": {
        states: {
            "Western Province": {
                districts: {
                    "Colombo": ["Sri Jayawardenepura Kotte (Capital)", "Colombo Fort", "Kollupitiya", "Bambalapitiya"],
                    "Gampaha": ["Negombo", "Gampaha Town"]
                }
            },
            "Central Province": {
                districts: {
                    "Kandy": ["Kandy (Capital)", "Peradeniya"]
                }
            },
            "Southern Province": {
                districts: {
                    "Galle": ["Galle (Capital)", "Hikkaduwa"]
                }
            }
        }
    },
    "Nepal": {
        states: {
            "Bagmati Province": {
                districts: {
                    "Kathmandu Valley": ["Kathmandu (Capital)", "Thamel", "New Road"],
                    "Lalitpur": ["Patan", "Jawalakhel"],
                    "Bhaktapur": ["Bhaktapur Town", "Nagarkot"]
                }
            },
            "Gandaki Province": {
                districts: {
                    "Kaski": ["Pokhara (Capital)", "Lakeside"]
                }
            }
        }
    },
    "Bangladesh": {
        states: {
            "Dhaka Division": {
                districts: {
                    "Dhaka Metropolitan": ["Dhaka (Capital)", "Gulshan", "Uttara", "Banani", "Dhanmondi"]
                }
            },
            "Chittagong Division": {
                districts: {
                    "Chittagong": ["Chittagong City", "Agrabad"]
                }
            }
        }
    },
    "Japan": {
        states: {
            "Kanto Region": {
                districts: {
                    "Tokyo Metropolis": ["Tokyo (Capital)", "Shinjuku", "Shibuya", "Ginza", "Roppongi"],
                    "Kanagawa": ["Yokohama (Capital)", "Kawasaki"]
                }
            },
            "Kansai Region": {
                districts: {
                    "Osaka": ["Osaka (Capital)", "Umeda", "Namba"],
                    "Kyoto": ["Kyoto (Capital)", "Gion"]
                }
            }
        }
    },
    "China": {
        states: {
            "Beijing Municipality": {
                districts: {
                    "Beijing Capital": ["Beijing (Capital)", "Chaoyang", "Haidian", "Dongcheng"]
                }
            },
            "Shanghai Municipality": {
                districts: {
                    "Shanghai": ["Shanghai City", "Pudong", "Huangpu", "Lujiazui"]
                }
            },
            "Guangdong Province": {
                districts: {
                    "Guangzhou": ["Guangzhou (Capital)", "Tianhe"],
                    "Shenzhen": ["Nanshan", "Futian"]
                }
            }
        }
    },
    "South Korea": {
        states: {
            "Seoul Capital Area": {
                districts: {
                    "Seoul Special City": ["Seoul (Capital)", "Gangnam", "Myeongdong", "Hongdae", "Itaewon"]
                }
            },
            "Gyeongsang Region": {
                districts: {
                    "Busan": ["Busan (Port Capital)", "Haeundae", "Seomyeon"]
                }
            }
        }
    },
    "Thailand": {
        states: {
            "Central Thailand": {
                districts: {
                    "Bangkok Metropolis": ["Bangkok (Capital)", "Sukhumvit", "Siam", "Silom"]
                }
            },
            "Southern Thailand": {
                districts: {
                    "Phuket": ["Phuket Town (Capital)", "Patong"]
                }
            }
        }
    },
    "Indonesia": {
        states: {
            "Special Capital Region": {
                districts: {
                    "Jakarta": ["Jakarta (Capital)", "Central Jakarta", "South Jakarta"]
                }
            },
            "Bali Province": {
                districts: {
                    "Badung & Denpasar": ["Denpasar (Capital)", "Kuta", "Seminyak", "Ubud"]
                }
            }
        }
    },
    "Vietnam": {
        states: {
            "Red River Delta": {
                districts: {
                    "Hanoi": ["Hanoi (Capital)", "Old Quarter", "Ba Dinh"]
                }
            },
            "Southeast Region": {
                districts: {
                    "Ho Chi Minh City": ["Ho Chi Minh City (Saigon)", "District 1", "District 3"]
                }
            }
        }
    },
    "Philippines": {
        states: {
            "National Capital Region": {
                districts: {
                    "Metro Manila": ["Manila (Capital)", "Makati", "Taguig (BGC)", "Quezon City"]
                }
            }
        }
    },
    "Pakistan": {
        states: {
            "Islamabad Capital Territory": {
                districts: {
                    "Islamabad": ["Islamabad (Capital)", "F-6", "F-7", "Blue Area"]
                }
            },
            "Punjab": {
                districts: {
                    "Lahore": ["Lahore (Capital)", "Gulberg", "DHA"]
                }
            },
            "Sindh": {
                districts: {
                    "Karachi": ["Karachi (Commercial Capital)", "Clifton", "DEFENCE"]
                }
            }
        }
    },
    "Qatar": {
        states: {
            "Doha Municipality": {
                districts: {
                    "Doha": ["Doha (Capital)", "West Bay", "The Pearl", "Souq Waqif"]
                }
            }
        }
    },
    "Oman": {
        states: {
            "Muscat Governorate": {
                districts: {
                    "Muscat": ["Muscat (Capital)", "Muttrah", "Ruwi", "Al Khuwair"]
                }
            }
        }
    },
    "Kuwait": {
        states: {
            "Capital Governorate": {
                districts: {
                    "Kuwait City": ["Kuwait City (Capital)", "Sharq", "Salmiya"]
                }
            }
        }
    },
    "Bahrain": {
        states: {
            "Capital Governorate": {
                districts: {
                    "Manama": ["Manama (Capital)", "Seef", "Juffair"]
                }
            }
        }
    },
    "United States": {
        states: {
            "California": {
                districts: {
                    "Los Angeles": ["Los Angeles", "Hollywood", "Beverly Hills"],
                    "San Francisco": ["San Francisco", "Downtown SF"],
                    "Santa Clara": ["San Jose", "Palo Alto"]
                }
            },
            "New York": {
                districts: {
                    "New York City": ["New York City", "Manhattan", "Brooklyn"],
                    "Albany": ["Albany (Capital)"]
                }
            },
            "Texas": {
                districts: {
                    "Harris County": ["Houston"],
                    "Travis County": ["Austin (Capital)"]
                }
            }
        }
    },
    "United Kingdom": {
        states: {
            "England": {
                districts: {
                    "Greater London": ["London (Capital)", "Westminster", "Camden"],
                    "West Midlands": ["Birmingham"]
                }
            },
            "Scotland": {
                districts: {
                    "City of Edinburgh": ["Edinburgh (Capital)"]
                }
            }
        }
    },
    "Canada": {
        states: {
            "Ontario": {
                districts: {
                    "Ottawa": ["Ottawa (Capital)"],
                    "Toronto": ["Toronto (Capital)", "North York"]
                }
            },
            "British Columbia": {
                districts: {
                    "Vancouver": ["Vancouver", "Richmond"]
                }
            }
        }
    },
    "Australia": {
        states: {
            "New South Wales": {
                districts: {
                    "Sydney": ["Sydney (Capital)", "Parramatta"]
                }
            },
            "Australian Capital Territory": {
                districts: {
                    "Canberra": ["Canberra (Capital)"]
                }
            }
        }
    },
    "Germany": {
        states: {
            "Berlin": {
                districts: {
                    "Berlin": ["Berlin (Capital)", "Mitte"]
                }
            },
            "Bavaria": {
                districts: {
                    "Munich": ["Munich (Capital)"]
                }
            }
        }
    },
    "France": {
        states: {
            "Île-de-France": {
                districts: {
                    "Paris": ["Paris (Capital)", "Le Marais"]
                }
            }
        }
    }
};

// Flattened fallbacks for legacy references
const STATES = Object.keys(LOCATION_DATA["India"].states);
const DISTRICTS = Object.keys(LOCATION_DATA["India"].states["Tamil Nadu"].districts);

const ADJACENT_DISTRICTS = {
    "Chennai": ["Tiruvallur", "Kanchipuram", "Chengalpattu"],
    "Chengalpattu": ["Chennai", "Kanchipuram", "Villupuram"],
    "Coimbatore": ["Tiruppur", "Nilgiris", "Erode"],
    "Madurai": ["Dindigul", "Sivagangai", "Virudhunagar", "Theni"],
    "Tiruchirappalli": ["Karur", "Namakkal", "Salem", "Perambalur", "Pudukkottai"],
    "Salem": ["Dharmapuri", "Erode", "Namakkal", "Kallakurichi"],
    "Tirunelveli": ["Tenkasi", "Thoothukudi", "Kanyakumari", "Virudhunagar"],
    "Vellore": ["Ranipet", "Tirupattur", "Kanchipuram", "Tiruvannamalai"]
};

// Dynamic location getters
function getStatesForCountry(countryName) {
    if (LOCATION_DATA[countryName] && LOCATION_DATA[countryName].states) {
        return Object.keys(LOCATION_DATA[countryName].states);
    }
    return [`${countryName} Capital Territory`, `${countryName} Main Region`];
}

function getDistrictsForState(countryName, stateName) {
    if (LOCATION_DATA[countryName] && LOCATION_DATA[countryName].states[stateName]) {
        return Object.keys(LOCATION_DATA[countryName].states[stateName].districts);
    }
    return [`${countryName} Central District`, `${countryName} East District`];
}

function getCitiesForDistrict(countryName, stateName, districtName) {
    if (LOCATION_DATA[countryName] && LOCATION_DATA[countryName].states[stateName] && LOCATION_DATA[countryName].states[stateName].districts[districtName]) {
        return LOCATION_DATA[countryName].states[stateName].districts[districtName];
    }
    return [`${countryName} Capital City`, `${countryName} Main Area`, "Central City"];
}

// Sample Donor Data
const DEFAULT_DONORS = [
    { name: "JAYA", country: "India", state: "Tamil Nadu", district: "Thoothukudi", city: "Kovilpatti", mobile: "9001112223", group: "O+", available: true },
    { name: "INDIRA", country: "India", state: "Tamil Nadu", district: "Vellore", city: "Katpadi", mobile: "9110009999", group: "A+", available: true },
    { name: "HARI", country: "India", state: "Tamil Nadu", district: "Erode", city: "Perundurai", mobile: "9220008888", group: "B-", available: true },
    { name: "GOPI", country: "India", state: "Tamil Nadu", district: "Tiruppur", city: "Palladam", mobile: "9330007777", group: "AB-", available: true },
    { name: "FARHAN", country: "India", state: "Tamil Nadu", district: "Tirunelveli", city: "Palayamkottai", mobile: "9440006666", group: "A-", available: true },
    { name: "EVELYN", country: "India", state: "Tamil Nadu", district: "Salem", city: "Fairlands", mobile: "9550005555", group: "O-", available: true },
    { name: "CHEN WEI", country: "Singapore", state: "Central Region", district: "Singapore Capital District", city: "Singapore City (Capital)", mobile: "+65 91234567", group: "O+", available: true },
    { name: "AMIRAH", country: "Malaysia", state: "Federal Territory", district: "Kuala Lumpur", city: "Kuala Lumpur (Capital)", mobile: "+60 123456789", group: "A+", available: true },
    { name: "RASHID", country: "United Arab Emirates", state: "Abu Dhabi Emirate", district: "Abu Dhabi Capital Region", city: "Abu Dhabi (UAE Capital)", mobile: "+971 501234567", group: "B+", available: true }
];

// Backend Logic: Check if real donor has been added
const isRealDonorActive = localStorage.getItem('sevagan_real_donor_active') === 'true';
let donors = JSON.parse(localStorage.getItem('sevagan_donors')) || (isRealDonorActive ? [] : DEFAULT_DONORS);

if (!localStorage.getItem('sevagan_donors') && !isRealDonorActive) {
    localStorage.setItem('sevagan_donors', JSON.stringify(donors));
}

// App State
const state = {
    isLoggedIn: localStorage.getItem('sevagan_logged_in') === 'true',
    user: JSON.parse(localStorage.getItem('sevagan_user')) || null,
    theme: localStorage.getItem('sevagan_theme') || 'dark',
    language: localStorage.getItem('sevagan_language') || 'en'
};

// Internationalization (i18n) Translations: English (default), Tamil, Hindi
const i18n = {
    en: {
        nav_home: "Home",
        nav_find_donors: "Find Donors",
        nav_become_donor: "Become a Donor",
        nav_request_blood: "Request Blood",
        nav_about: "About",
        nav_profile: "Profile",
        nav_requests: "🩸 Requests",
        btn_signup: "Sign Up",
        btn_signup_now: "Sign Up Now",
        btn_login: "Login",
        btn_logout: "Logout",
        btn_update_profile: "Update Profile",
        hero_tag: '<span class="heart-icon">❤️</span> Real-time donor search across Tamil Nadu',
        hero_quote: '"Save lives like Sevagan. Be a hero."',
        hero_title: 'Find blood donors fast.<br>Save lives faster.',
        hero_sub: 'SEVAGAN connects voluntary donors with patients and hospitals instantly.<br>Free, secure, and built for the community.',
        quick_search_title: "Quick Donor Search",
        btn_search: "Search",
        ph_blood_group: "Blood Group",
        ph_select_country: "Select Country",
        ph_select_state: "Select State",
        ph_select_district: "Select District",
        ph_select_city: "Select City / Area",
        
        // Compatibility Matrix
        compat_matrix_title: "Interactive Blood Compatibility Matrix",
        compat_matrix_sub: "Select a blood group to see who can donate to whom during emergencies:",
        compat_can_donate_to: "🎁 CAN DONATE BLOOD TO:",
        compat_can_receive_from: "📥 CAN RECEIVE BLOOD FROM:",
        compat_everyone: "EVERYONE (Universal Donor)",
        compat_everyone_receiver: "EVERYONE (Universal Receiver)",
        compat_o_only: "O- Only",

        // Leaderboard / Hall of Fame
        leaderboard_title: "Tamil Nadu Lifesaver Hall of Fame",
        leaderboard_sub: "Top Community Donors",
        th_rank: "Rank",
        th_donor_name: "Donor Name",
        th_district: "District",
        th_blood_group: "Blood Group",
        th_lives_saved: "Lives Saved",
        th_badge: "Badge",
        badge_legend: "👑 LEGEND",
        badge_gold_hero: "🌟 GOLD HERO",
        badge_guardian: "⚡ GUARDIAN",

        // About Us Section
        about_hero_title: "Connecting Hearts, Saving Lives",
        about_hero_sub: "SEVAGAN is a smart and secure Blood Donation Management System created to connect voluntary blood donors with patients and hospitals in critical moments.",
        our_mission_title: "Our Mission",
        our_mission_desc: "To create a reliable, fast digital network connecting voluntary blood donors with those in need, saving lives through technology.",
        our_vision_title: "Our Vision",
        our_vision_desc: "To build a scalable, secure, and nationwide platform supporting healthcare systems and voluntary donation awareness.",
        our_commitment_title: "Our Commitment",
        our_commitment_desc: "A social initiative aimed at reducing emergency response time and supporting the healthcare community with a reliable digital solution.",
        why_choose_title: "🔐 Why Choose SEVAGAN?",
        why_item_1: "OTP-based secure verification",
        why_item_2: "Centralized cloud database",
        why_item_3: "Quick blood group & location search",
        why_item_4: "User-friendly web interface",
        why_item_5: "Designed for real-time emergencies",

        // Find Donors Section
        find_donors_title: "Find Blood Donors",
        chip_quick_filters: "⚡ Quick District Filters:",
        chip_all_districts: "All Districts",
        chip_rare_radar: "🩸 Rare Blood Group Radar:",
        btn_show_all_donors: "Show All Donors",

        // Become a Donor Section
        become_donor_title: "Become a Donor",
        become_donor_sub: "Confirm your details to appear in the search results.",
        donor_for_label: "Who is this registration for?",
        chip_myself: "👤 MY SELF",
        chip_myfriend: "🤝 MY FRIEND",
        lbl_full_name: "Full Name",
        lbl_phone_number: "Phone Number",
        lbl_blood_group: "Blood Group",
        lbl_dob: "Date of Birth *",
        lbl_age: "Age (auto-calculated)",
        btn_register_donor: "Register as Donor",

        // Request Blood Section
        request_blood_title: "Emergency Blood Request",
        request_blood_sub: "Submit a request to broadcast to nearby voluntary blood donors.",
        lbl_patient_name: "Patient / Hospital Name",
        lbl_units_needed: "Blood Units Needed",
        lbl_hospital_address: "Hospital Address / Landmark",
        btn_submit_request: "Broadcast Emergency Request",

        // Auth Titles & Forms
        login_title: "Welcome Back",
        login_sub: "Login to manage your donor profile or request blood.",
        signup_title: "Create Account",
        signup_sub: "Join the community and start saving lives today.",

        // Footer
        footer_sub: "Connecting voluntary blood donors with patients & hospitals in emergency moments.",
        footer_links_title: "Quick Navigation",
        footer_copyright: "© 2026 SEVAGAN Blood Network. Built for Saving Lives."
    },
    ta: {
        nav_home: "முகப்பு",
        nav_find_donors: "கொடையாளர்களைத் தேடு",
        nav_become_donor: "கொடையாளராக இணை",
        nav_request_blood: "ரத்தம் கோரிக்கை",
        nav_about: "எங்களைப் பற்றி",
        nav_profile: "சுயவிவரம்",
        nav_requests: "🩸 கோரிக்கைகள்",
        btn_signup: "பதிவு செய்க",
        btn_signup_now: "இப்போதே பதிவு பெறுக",
        btn_login: "உள்நுழைக",
        btn_logout: "வெளியேறுக",
        btn_update_profile: "சுயவிவரத்தைப் புதுப்பி",
        hero_tag: '<span class="heart-icon">❤️</span> தமிழ்நாடு முழுவதும் நேரலை இரத்தக் கொடையாளர்கள் தேடல்',
        hero_quote: '"சேவகன் போல் உயிர்களைக் காப்பாற்றுங்கள். கதாநாயகனாக இருங்கள்."',
        hero_title: 'இரத்தக் கொடையாளர்களை விரைவாகக் கண்டறியவும்.<br>உயிர்களை விரைவாகக் காப்பாற்றவும்.',
        hero_sub: 'சேவகன் தன்னார்வ கொடையாளர்களை நோயாளிகளுடனும் மருத்துவமனைகளுடனும் உடனுக்குடன் இணைக்கிறது.<br>இலவசம், பாதுகாப்பானது மற்றும் சமுதாயத்திற்காக உருவாக்கப்பட்டது.',
        quick_search_title: "விரைவு கொடையாளர் தேடல்",
        btn_search: "தேடுக",
        ph_blood_group: "இரத்த வகை",
        ph_select_country: "நாட்டைத் தேர்ந்தெடுக்கவும்",
        ph_select_state: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
        ph_select_district: "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்",
        ph_select_city: "நகரம் / பகுதியைத் தேர்ந்தெடுக்கவும்",

        // Compatibility Matrix
        compat_matrix_title: "இரத்தப் பொருத்தம் பார்க்கும் ஊடாடும் அட்டவணை",
        compat_matrix_sub: "அவசர காலத்தில் யாருக்கு யார் ரத்தம் கொடுக்கலாம் என்பதை அறிய இரத்த வகையைத் தேர்ந்தெடுக்கவும்:",
        compat_can_donate_to: "🎁 யாருக்கு இரத்தம் கொடுக்கலாம்:",
        compat_can_receive_from: "📥 யாரிடமிருந்து இரத்தம் பெறலாம்:",
        compat_everyone: "அனைவருக்கும் (பொதுக் கொடையாளர்)",
        compat_everyone_receiver: "அனைவரிடமிருந்தும் (பொதுப் பெறுநர்)",
        compat_o_only: "O- மட்டும்",

        // Leaderboard / Hall of Fame
        leaderboard_title: "தமிழ்நாடு உயிர்காப்பாளர் புகழாரம்",
        leaderboard_sub: "முன்னணி சமுதாயக் கொடையாளர்கள்",
        th_rank: "தரவரிசை",
        th_donor_name: "கொடையாளர் பெயர்",
        th_district: "மாவட்டம்",
        th_blood_group: "இரத்த வகை",
        th_lives_saved: "காப்பாற்றப்பட்ட உயிர்கள்",
        th_badge: "விருது",
        badge_legend: "👑 சகாப்தம்",
        badge_gold_hero: "🌟 தங்க நாயகன்",
        badge_guardian: "⚡ காவலன்",

        // About Us Section
        about_hero_title: "இதயங்களை இணைப்போம், உயிர்களைக் காப்போம்",
        about_hero_sub: "சேவகன் என்பது தன்னார்வ இரத்தக் கொடையாளர்களை நோயாளிகளுடனும் மருத்துவமனைகளுடனும் அவசர தருணங்களில் இணைக்கும் திறமையான மற்றும் பாதுகாப்பான இரத்த தான மேலாண்மை அமைப்பாகும்.",
        our_mission_title: "எங்கள் லட்சியம்",
        our_mission_desc: "தன்னார்வ இரத்தக் கொடையாளர்களைத் தேவையில் உள்ளவர்களுடன் இணைக்கும் வேகமான, நம்பகமான டிஜிட்டல் அமைப்பை உருவாக்கி தொழில்நுட்பத்தின் மூலம் உயிர்களைக் காப்பாற்றுதல்.",
        our_vision_title: "எங்கள் தொலைநோக்கு",
        our_vision_desc: "சுகாதார அமைப்புகளுக்கும் தன்னார்வ இரத்த தான விழிப்புணர்வுக்கும் உறுதுணையாக நாடு தழுவிய பாதுகாப்பான தளத்தை உருவாக்குதல்.",
        our_commitment_title: "எங்கள் உறுதிமொழி",
        our_commitment_desc: "அவசரகால உதவி நேரத்தைக் குறைத்து சுகாதார சமூகத்திற்கு நம்பகமான டிஜிட்டல் தீர்வை வழங்குவதற்கான சமூக முயற்சி.",
        why_choose_title: "🔐 ஏன் சேவகனைத் தேர்ந்தெடுக்க வேண்டும்?",
        why_item_1: "OTP அடிப்படையிலான பாதுகாப்பான சரிபார்ப்பு",
        why_item_2: "மத்திய மேகக்கணி தரவுத்தளம்",
        why_item_3: "விரைவான இரத்த வகை மற்றும் இருப்பிடத் தேடல்",
        why_item_4: "எளிதான பயனர் இணைய இடைமுகம்",
        why_item_5: "நிகழ்நேர அவசரநிலைகளுக்காக உருவாக்கப்பட்டது",

        // Find Donors Section
        find_donors_title: "இரத்தக் கொடையாளர்களைத் தேடுங்கள்",
        chip_quick_filters: "⚡ விரைவு மாவட்ட வடிகட்டிகள்:",
        chip_all_districts: "அனைத்து மாவட்டங்களும்",
        chip_rare_radar: "🩸 அரிய இரத்த வகை ரேடார்:",
        btn_show_all_donors: "அனைத்து கொடையாளர்களையும் காட்டு",

        // Become a Donor Section
        become_donor_title: "கொடையாளராக இணையுங்கள்",
        become_donor_sub: "தேடல் முடிவுகளில் தோன்ற உங்கள் விவரங்களை உறுதிப்படுத்தவும்.",
        donor_for_label: "இந்த பதிவு யாருக்கானது?",
        chip_myself: "👤 எனக்கு",
        chip_myfriend: "🤝 என் நண்பருக்கு",
        lbl_full_name: "முழு பெயர்",
        lbl_phone_number: "தொலைபேசி எண்",
        lbl_blood_group: "இரத்த வகை",
        lbl_dob: "பிறந்த தேதி *",
        lbl_age: "வயது (தானாக கணக்கிடப்பட்டது)",
        btn_register_donor: "கொடையாளராகப் பதிவு செய்க",

        // Request Blood Section
        request_blood_title: "அவசர இரத்தக் கோரிக்கை",
        request_blood_sub: "அருகிலுள்ள தன்னார்வக் கொடையாளர்களுக்கு அவசர அறிவிப்பை அனுப்பவும்.",
        lbl_patient_name: "நோயாளி / மருத்துவமனை பெயர்",
        lbl_units_needed: "தேவைப்படும் இரத்த அலகுகள்",
        lbl_hospital_address: "மருத்துவமனை முகவரி / அடையாளம்",
        btn_submit_request: "அவசர கோரிக்கையை அனுப்பு",

        // Auth Titles & Forms
        login_title: "மீண்டும் வருக",
        login_sub: "உங்கள் சுயவிவரத்தை நிர்வகிக்க அல்லது இரத்தம் கோர உள்நுழைக.",
        signup_title: "கணக்கை உருவாக்குங்கள்",
        signup_sub: "இன்றே சமூகத்தில் இணைந்து உயிர்களைக் காப்பாற்றத் தொடங்குங்கள்.",

        // Footer
        footer_sub: "அவசர தருணங்களில் தன்னார்வ இரத்தக் கொடையாளர்களை நோயாளிகளுடனும் மருத்துவமனைகளுடனும் இணைக்கிறது.",
        footer_links_title: "விரைவு வழிசெலுத்தல்",
        footer_copyright: "© 2026 சேவகன் இரத்த பிணையம். உயிர்களைக் காப்பதற்காக உருவாக்கப்பட்டது."
    },
    hi: {
        nav_home: "मुख्यपृष्ठ",
        nav_find_donors: "दाता खोजें",
        nav_become_donor: "दाता बनें",
        nav_request_blood: "रक्त अनुरोध",
        nav_about: "हमारे बारे में",
        nav_profile: "प्रोफ़ाइल",
        nav_requests: "🩸 अनुरोध",
        btn_signup: "साइन अप",
        btn_signup_now: "अभी साइन अप करें",
        btn_login: "लॉगिन",
        btn_logout: "लॉग आउट",
        btn_update_profile: "प्रोफ़ाइल अपडेट करें",
        hero_tag: '<span class="heart-icon">❤️</span> तमिलनाडु भर में रीयल-टाइम रक्त दाता खोज',
        hero_quote: '"सेवक की तरह जीवन बचाएं। हीरो बनें।"',
        hero_title: 'रक्त दाताओं को तेजी से खोजें।<br>जीवन जल्दी बचाएं।',
        hero_sub: 'सेवक स्वेच्छा से रक्तदान करने वालों को मरीजों और अस्पतालों से तुरंत जोड़ता है।<br>मुफ़्त, सुरक्षित और समुदाय के लिए निर्मित।',
        quick_search_title: "त्वरित दाता खोज",
        btn_search: "खोजें",
        ph_blood_group: "रक्त समूह",
        ph_select_country: "देश चुनें",
        ph_select_state: "राज्य चुनें",
        ph_select_district: "जिला चुनें",
        ph_select_city: "शहर / क्षेत्र चुनें",

        // Compatibility Matrix
        compat_matrix_title: "इंटरएक्टिव रक्त अनुकूलता मैट्रिक्स",
        compat_matrix_sub: "आपतकाल में कौन किसे रक्तदान कर सकता है यह देखने के लिए रक्त समूह चुनें:",
        compat_can_donate_to: "🎁 रक्तदान कर सकते हैं:",
        compat_can_receive_from: "📥 रक्त प्राप्त कर सकते हैं:",
        compat_everyone: "सभी को (सार्वभौमिक दाता)",
        compat_everyone_receiver: "सभी से (सार्वभौमिक प्राप्तकर्ता)",
        compat_o_only: "केवल O- से",

        // Leaderboard / Hall of Fame
        leaderboard_title: "तमिलनाडु लाइफसेवर हॉल ऑफ फेम",
        leaderboard_sub: "शीर्ष समुदाय दाता",
        th_rank: "रैंक",
        th_donor_name: "दाता का नाम",
        th_district: "जिला",
        th_blood_group: "रक्त समूह",
        th_lives_saved: "बचाए गए जीवन",
        th_badge: "बैज",
        badge_legend: "👑 लेजेंड",
        badge_gold_hero: "🌟 गोल्ड हीरो",
        badge_guardian: "⚡ गार्जियन",

        // About Us Section
        about_hero_title: "दिलों को जोड़ना, जीवन बचाना",
        about_hero_sub: "सेवक एक स्मार्ट और सुरक्षित रक्त दान प्रबंधन प्रणाली है जो महत्वपूर्ण क्षणों में मरीजों और अस्पतालों के साथ स्वैच्छिक रक्त दाताओं को जोड़ने के लिए बनाई गई है।",
        our_mission_title: "हमारा मिशन",
        our_mission_desc: "तकनीक के माध्यम से जीवन बचाते हुए जरूरतमंदों के साथ स्वैच्छिक रक्त दाताओं को जोड़ने वाला एक विश्वसनीय, तेज़ डिजिटल नेटवर्क बनाना।",
        our_vision_title: "हमारा विजन",
        our_vision_desc: "स्वास्थ्य प्रणालियों और स्वैच्छिक रक्तदान जागरूकता का समर्थन करने वाला एक स्केलेबल, सुरक्षित और राष्ट्रव्यापी मंच बनाना।",
        our_commitment_title: "हमारी प्रतिबद्धता",
        our_commitment_desc: "आपातकालीन प्रतिक्रिया समय को कम करने और एक विश्वसनीय डिजिटल समाधान के साथ स्वास्थ्य समुदाय का समर्थन करने का सामाजिक प्रयास।",
        why_choose_title: "🔐 सेवक को क्यों चुनें?",
        why_item_1: "OTP-आधारित सुरक्षित सत्यापन",
        why_item_2: "केन्द्रीकृत क्लाउड डेटाबेस",
        why_item_3: "त्वरित रक्त समूह और स्थान खोज",
        why_item_4: "उपयोगकर्ता के अनुकूल वेब इंटरफ़ेस",
        why_item_5: "रीयल-टाइम आपात स्थितियों के लिए निर्मित",

        // Find Donors Section
        find_donors_title: "रक्त दाता खोजें",
        chip_quick_filters: "⚡ त्वरित जिला फ़िल्टर:",
        chip_all_districts: "सभी जिले",
        chip_rare_radar: "🩸 दुर्लभ रक्त समूह रडार:",
        btn_show_all_donors: "सभी दाता दिखाएं",

        // Become a Donor Section
        become_donor_title: "दाता बनें",
        become_donor_sub: "खोज परिणामों में दिखाई देने के लिए अपना विवरण सत्यापित करें।",
        donor_for_label: "यह पंजीकरण किसके लिए है?",
        chip_myself: "👤 स्वयं",
        chip_myfriend: "🤝 मेरा मित्र",
        lbl_full_name: "पूरा नाम",
        lbl_phone_number: "फोन नंबर",
        lbl_blood_group: "रक्त समूह",
        lbl_dob: "जन्म तिथि *",
        lbl_age: "आयु (स्वचालित परिकलित)",
        btn_register_donor: "दाता के रूप में पंजीकृत हों",

        // Request Blood Section
        request_blood_title: "आपातकालीन रक्त अनुरोध",
        request_blood_sub: "पास के स्वैच्छिक रक्त दाताओं को प्रसारित करने के लिए अनुरोध प्रस्तुत करें।",
        lbl_patient_name: "मरीज / अस्पताल का नाम",
        lbl_units_needed: "आवश्यक रक्त इकाइयां",
        lbl_hospital_address: "अस्पताल का पता / लैंडमार्क",
        btn_submit_request: "आपातकालीन अनुरोध प्रसारित करें",

        // Auth Titles & Forms
        login_title: "पुनः स्वागत है",
        login_sub: "अपने दाता प्रोफ़ाइल को प्रबंधित करने या रक्त अनुरोध के लिए लॉगिन करें।",
        signup_title: "खाता बनाएं",
        signup_sub: "आज ही समुदाय में शामिल हों और जीवन बचाना शुरू करें।",

        // Footer
        footer_sub: "आपातकालीन क्षणों में स्वैच्छिक रक्त दाताओं को मरीजों और अस्पतालों से जोड़ना।",
        footer_links_title: "त्वरित नेविगेशन",
        footer_copyright: "© 2026 सेवक ब्लड नेटवर्क। जीवन बचाने के लिए निर्मित।"
    }
};

window.changeLanguage = function(lang) {
    if (!i18n[lang]) lang = 'en';
    localStorage.setItem('sevagan_language', lang);
    state.language = lang;

    const langSelect = document.getElementById('language-select');
    if (langSelect && langSelect.value !== lang) {
        langSelect.value = lang;
    }

    const dict = i18n[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = dict[key];
            } else {
                el.innerHTML = dict[key];
            }
        }
    });

    // Re-populate dropdown placeholders with translated texts
    populateSelects();

    // Re-render compatibility matrix if active button exists
    const activeCompatBtn = document.querySelector('.compat-btn.active');
    if (activeCompatBtn) {
        const group = activeCompatBtn.textContent.trim();
        selectCompatGroup(group, activeCompatBtn);
    }
};

function bindLocationCascade(prefix) {
    const countryEl = document.getElementById(`${prefix}-country`);
    const stateEl = document.getElementById(`${prefix}-state`);
    const districtEl = document.getElementById(`${prefix}-district`);
    const cityEl = document.getElementById(`${prefix}-city`);

    if (!countryEl) return;

    const langDict = i18n[state.language] || i18n['en'];

    const updateCities = (selectedDist) => {
        if (!cityEl) return;
        const cVal = countryEl.value || "India";
        const sVal = stateEl ? stateEl.value : "";
        const dVal = selectedDist !== undefined ? selectedDist : (districtEl ? districtEl.value : "");
        const cities = getCitiesForDistrict(cVal, sVal, dVal);
        const cityPlaceholder = langDict["ph_select_city"] || "Select City / Area";
        
        cityEl.innerHTML = `<option value="" disabled>${cityPlaceholder}</option>` +
            cities.map(c => `<option value="${c}">${c}</option>`).join('');
        if (cities.length > 0) {
            cityEl.value = cities[0];
        }
    };

    const updateDistricts = (selectedState) => {
        if (!districtEl) return;
        const cVal = countryEl.value || "India";
        const sVal = selectedState !== undefined ? selectedState : (stateEl ? stateEl.value : "");
        const districts = getDistrictsForState(cVal, sVal);
        const distPlaceholder = langDict["ph_select_district"] || "Select District";
        let placeholderHTML = (prefix === 'admin-filter') ? `<option value="">All Districts</option>` : `<option value="" disabled>${distPlaceholder}</option>`;
        
        districtEl.innerHTML = placeholderHTML + districts.map(d => `<option value="${d}">${d}</option>`).join('');
        if (districts.length > 0) {
            districtEl.value = districts[0];
        }
        updateCities(districts[0]);
    };

    const updateStates = () => {
        if (!stateEl) return;
        const cVal = countryEl.value || "India";
        const states = getStatesForCountry(cVal);
        const statePlaceholder = langDict["ph_select_state"] || "Select State";
        
        stateEl.innerHTML = `<option value="" disabled>${statePlaceholder}</option>` +
            states.map(s => `<option value="${s}">${s}</option>`).join('');
        if (states.length > 0) {
            stateEl.value = states[0];
        }
        updateDistricts(states[0]);
    };

    countryEl.onchange = () => {
        updateStates();
    };

    if (stateEl) {
        stateEl.onchange = (e) => {
            updateDistricts(e.target.value);
        };
    }

    if (districtEl) {
        districtEl.onchange = (e) => {
            updateCities(e.target.value);
        };
    }

    updateStates();
}

// Populate dropdowns dynamically
function populateSelects() {
    const langDict = i18n[state.language] || i18n['en'];

    // Blood Group selectors
    const bloodSelects = ['search-blood', 'find-blood', 'donor-blood', 'req-blood', 'edit-blood', 'signup-blood'];
    bloodSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            const currentVal = select.value;
            const placeholder = langDict["ph_blood_group"] || "Blood Group";
            select.innerHTML = `<option value="" disabled ${!currentVal ? 'selected' : ''}>${placeholder}</option>` +
                BLOOD_GROUPS.map(bg => `<option value="${bg}">${bg}</option>`).join('');
            if (currentVal) select.value = currentVal;
        }
    });

    // Country selectors & cascading location binders
    const prefixes = ['search', 'find', 'donor', 'req', 'edit', 'signup'];
    prefixes.forEach(prefix => {
        const select = document.getElementById(`${prefix}-country`);
        if (select) {
            const currentVal = select.value || "India";
            const placeholder = langDict["ph_select_country"] || "Select Country";
            select.innerHTML = `<option value="" disabled>${placeholder}</option>` +
                COUNTRIES.map(c => `<option value="${c}" ${c === currentVal ? 'selected' : ''}>${c}</option>`).join('');
            select.value = currentVal;
        }
        bindLocationCascade(prefix);
    });
}

// Navigation Logic
function showSection(sectionId) {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section with Framer Motion style ultra-fast spring transition & stagger reveal
    const targetSection = document.getElementById(`${sectionId}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf(targetSection);
            gsap.fromTo(targetSection, 
                { opacity: 0, y: 10, scale: 0.99 },
                { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: 'power4.out', overwrite: 'auto' }
            );
            const animateChildren = targetSection.querySelectorAll('.card, .hero-content > *, .glass-search-container, .compatibility-widget, .leaderboard-section, .search-bar, .donor-card, .btn');
            if (animateChildren.length > 0) {
                gsap.killTweensOf(animateChildren);
                gsap.from(animateChildren, {
                    opacity: 0,
                    y: 8,
                    duration: 0.15,
                    stagger: 0.015,
                    ease: 'power3.out',
                    clearProps: 'all',
                    overwrite: 'auto'
                });
            }
        }
    }

    // Update nav links active state
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.classList.remove('active');
        if (link.id === `nav-${sectionId}`) {
            link.classList.add('active');
        }
    });

    // Special logic for Profile
    if (sectionId === 'profile' && typeof updateProfileUI === 'function') {
        updateProfileUI();
    }

    // Requests board
    if (sectionId === 'requests-board') {
        renderRequestsBoard();
    }

    // Find Donors visibility fix
    if (sectionId === 'find-donors') {
        renderDonors(null, 'find-donors-grid');
        renderDonors(null, 'find-recent-grid');
    }

    // Shared content visibility (Stats, Recent Donors) - Only on home
    const sharedContent = document.getElementById('shared-content');
    if (sharedContent) {
        sharedContent.style.display = (sectionId === 'home') ? 'block' : 'none';
    }

    // Close mobile menu if active
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }
}

// Auth UI Management
function updateAuthStateUI() {
    if (state.isLoggedIn) {
        document.body.classList.add('logged-in');
    } else {
        document.body.classList.remove('logged-in');
    }
}

// ----------------------------------------------------
// REAL API INTEGRATION CONFIGURATION
// Replace 'YOUR_API_KEY' with your actual SMS/Email provider keys
// ----------------------------------------------------
const SMS_API_URL = "https://www.fast2sms.com/dev/bulkV2";
const SMS_API_KEY = "YOUR_FAST2SMS_API_KEY"; // Drop API key here

const EMAILJS_USER_ID = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";

// Real OTP Integration
async function sendOTP(mobile, email = null) {
    // Open Modal
    const modal = document.getElementById('otp-modal');
    const display = document.getElementById('otp-mobile-display');
    const otpInput = document.getElementById('otp-input');

    if (modal && display) {
        if (email) {
            display.innerHTML = `${mobile} <br>and <strong style="color: var(--text-main); font-size: 0.95rem;">${email}</strong>`;
        } else {
            display.textContent = mobile;
        }
        if (otpInput) otpInput.value = '';
        modal.classList.add('active');
    }

    // Generate random 4-digit OTP
    globalOTP = Math.floor(1000 + Math.random() * 9000).toString();

    const messageContent = `Your SEVAGAN Verification Code is ${globalOTP}. Please DO NOT share this with anyone.`;

    // 1. Dispatch Real SMS Request
    if (SMS_API_KEY !== "YOUR_FAST2SMS_API_KEY") {
        try {
            const smsResponse = await fetch(`${SMS_API_URL}?authorization=${SMS_API_KEY}&route=q&message=${encodeURIComponent(messageContent)}&flash=0&numbers=${mobile}`, {
                method: "GET"
            });
            const smsData = await smsResponse.json();
            console.log("SMS API Response:", smsData);
        } catch (error) {
            console.error("SMS API Error:", error);
        }
    } else {
        console.warn('SMS Integration: Using MOCK mode because SMS_API_KEY is not set.');
        // Fallback for demo so it still works if key isn't provided
        setTimeout(() => alert(`[MOCK SMS -> ${mobile}]\n${messageContent}`), 500);
    }

    // 2. Dispatch Real Email Request (If Applicable)
    if (email) {
        if (EMAILJS_USER_ID !== "YOUR_EMAILJS_PUBLIC_KEY") {
            try {
                // EmailJS API structure
                const emailPayload = {
                    service_id: EMAILJS_SERVICE_ID,
                    template_id: EMAILJS_TEMPLATE_ID,
                    user_id: EMAILJS_USER_ID,
                    template_params: {
                        'to_email': email,
                        'message': messageContent
                    }
                };
                const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(emailPayload)
                });
                console.log("Email API Response:", emailResponse.status);
            } catch (error) {
                console.error("Email API Error:", error);
            }
        } else {
            console.warn('Email Integration: Using MOCK mode because EMAILJS_USER_ID is not set.');
            setTimeout(() => alert(`[MOCK EMAIL -> ${email}]\n${messageContent}`), 1000);
        }
    }

    return { success: true };
}

window.closeOTPModal = () => {
    const modal = document.getElementById('otp-modal');
    if (modal) modal.classList.remove('active');
};

// Global variables for OTP flow
let pendingUserData = null;
let otpPurpose = 'login'; // 'login' or 'signup'
let globalOTP = '';

// Theme Management
function initTheme() {
    if (state.theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Success Modal Logic
window.showSuccessModal = (title, message, nextAction) => {
    const modal = document.getElementById('success-modal');
    if (modal) {
        document.getElementById('success-modal-title').textContent = title;
        document.getElementById('success-modal-message').textContent = message;
        const btn = document.getElementById('success-modal-btn');
        btn.onclick = () => {
            modal.classList.remove('active');
            if (nextAction) nextAction();
        };
        modal.classList.add('active');
    } else {
        alert(title + "\n" + message);
        if (nextAction) nextAction();
    }
};

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('sevagan_theme', state.theme);
    initTheme();
}

// Render Donor Cards
function renderDonors(filterData = null, targetGridId = 'donors-grid') {
    const grid = document.getElementById(targetGridId);
    if (!grid) return;

    let usingConnected = false;
    let displayDonors = filterData ? donors.filter(d => {
        let match = true;
        const donorBlood = d.group || d.blood;
        if (filterData.blood && donorBlood !== filterData.blood) match = false;
        if (filterData.country && (d.country || "").toLowerCase() !== filterData.country.toLowerCase()) match = false;
        if (filterData.state && (d.state || "").toLowerCase() !== filterData.state.toLowerCase()) match = false;
        if (filterData.district && (d.district || "").toLowerCase() !== filterData.district.toLowerCase()) match = false;
        if (filterData.city && (d.city || "").toLowerCase() !== filterData.city.toLowerCase()) match = false;
        if (d.available === false) match = false;
        return match;
    }) : donors.filter(d => d.available !== false);

    // Connected Districts Fallback
    if (filterData && filterData.district && displayDonors.length === 0) {
        const reqDist = DISTRICTS.find(d => d.toLowerCase() === filterData.district.toLowerCase()) || "";
        let nearby = ADJACENT_DISTRICTS[reqDist] || [];
        if (nearby.length === 0) nearby = [...DISTRICTS].sort(() => 0.5 - Math.random()).slice(0, 3);
        
        displayDonors = donors.filter(d => {
            const donorBlood = d.group || d.blood;
            if (filterData.blood && donorBlood !== filterData.blood) return false;
            if (d.available === false) return false;
            return nearby.map(n => n.toLowerCase()).includes((d.district || "").toLowerCase());
        });
        if (displayDonors.length > 0) usingConnected = true;
    }

    if (filterData && filterData.pincode && !usingConnected) {
        displayDonors.sort((a, b) => {
            if (a.pincode === filterData.pincode && b.pincode !== filterData.pincode) return -1;
            if (a.pincode !== filterData.pincode && b.pincode === filterData.pincode) return 1;
            return 0;
        });
    }

    if (displayDonors.length === 0) {
        const message = filterData ?
            `No matching donors found for <strong>${filterData.blood || 'any group'}</strong> in <strong>${filterData.district || 'any district'}</strong> or connected regions.` :
            `No registered donors available at this moment.`;

        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; background: var(--card-bg); border: 1px dashed var(--border-color); border-radius: 12px; color: var(--text-sec);" class="no-donors-msg">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.5;">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <p style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.5rem;"><strong>No Donors Found</strong></p>
            <p style="font-size: 0.95rem;">${message}</p>
        </div>`;
        return;
    }

    grid.innerHTML = (usingConnected ? `<div style="grid-column: 1/-1; padding: 1rem; margin-bottom: 1rem; background: rgba(226, 55, 55, 0.1); border-left: 4px solid var(--primary-red); border-radius: 8px; color: var(--text-main); font-size: 0.95rem;"><strong>Note:</strong> No exact matches in ${filterData.district}. Showing donors from connected nearby districts.</div>` : '') + 
    displayDonors.map(donor => {
        let statusHtml = `<div class="status-ready"><i class="fas fa-check-circle"></i> Ready to Donate</div>`;
        let actionStyle = "";
        
        if (donor.lastDonated) {
            const lastDate = new Date(donor.lastDonated);
            const today = new Date();
            const diffDays = Math.ceil(Math.abs(today - lastDate) / (1000 * 60 * 60 * 24));
            const reqDays = donor.gender === 'Female' ? 120 : 90;
            if (today > lastDate && diffDays < reqDays) {
                const msLeft = reqDays - diffDays;
                statusHtml = `<div class="status-cooldown"><i class="fas fa-clock"></i> Unavailable: ${msLeft} Days Remaining</div>`;
                actionStyle = "opacity: 0.5; pointer-events: none;";
            }
        }

        return `
        <div class="donor-card ${actionStyle ? 'status-cooldown-card' : ''}">
            <div class="blood-badge">${donor.group || donor.blood}</div>
            <div class="donor-name">${donor.name}</div>
            <div class="donor-loc">
                <i class="fas fa-map-marker-alt"></i> ${donor.district} ${donor.pincode ? '• ' + donor.pincode : ''}
            </div>
            <div style="margin-top: 0.75rem;">${statusHtml}</div>
            <div class="donor-mobile" style="${actionStyle}">
                <i class="fas fa-phone-alt" style="color: var(--primary-red); margin-right: 0.5rem;"></i>
                <strong>${donor.mobile}</strong>
            </div>
            <div class="donor-actions" style="display: flex; gap: 0.5rem; margin-top: 1rem; ${actionStyle}">
                <a href="tel:${donor.mobile}" class="btn btn-secondary btn-sm" style="flex: 1; border-radius: 8px;">
                    <i class="fas fa-phone"></i> Call
                </a>
                <a href="sms:${donor.mobile}?body=Hi ${donor.name}, urgent need for ${donor.group || donor.blood} blood from SEVAGAN. Are you available?" class="btn btn-primary btn-sm" style="flex: 1; border-radius: 8px;">
                    <i class="fas fa-comment"></i> SMS
                </a>
            </div>
        </div>`;
    }).join('');
}

// Proximity matching for Broadcast
async function broadcastRequest(requestData) {
    // 1. Exact match (Pincode) - Highest Priority
    const exactMatches = donors.filter(d => (d.group || d.blood) === requestData.blood && d.pincode === requestData.pincode);

    // 2. District match - Medium Priority
    const districtMatches = donors.filter(d => (d.group || d.blood) === requestData.blood && d.pincode !== requestData.pincode && (d.district || "").toLowerCase() === requestData.district.toLowerCase());

    // 3. Nearby Districts/State - Low Priority
    // Simulating nearby districts by taking a limited radius queue
    const nearbyDistricts = donors.filter(d => (d.group || d.blood) === requestData.blood && (d.district || "").toLowerCase() !== requestData.district.toLowerCase()).slice(0, 5);

    console.log("Priority Broadcast Queues:", { exactMatches, districtMatches, nearbyDistricts });

    const messageContent = `URGENT SEVAGAN BROADCAST: ${requestData.blood} needed for ${requestData.patient} at ${requestData.hospital}. Contact: ${requestData.mobile}`;

    // Combine users into a prioritized queue
    const prioritizedQueue = [...exactMatches, ...districtMatches, ...nearbyDistricts];

    let messageStatus = `EMERGENCY BROADCAST:\n\n`;

    if (exactMatches.length > 0) {
        messageStatus += `🚀 High Priority: Sent to ${exactMatches.length} Donors in PINCODE ${requestData.pincode}!\n`;
    }
    if (districtMatches.length > 0) {
        messageStatus += `📍 Medium Priority: Sent to ${districtMatches.length} Donors in ${requestData.district}.\n`;
    }
    if (nearbyDistricts.length > 0) {
        messageStatus += `🌍 Low Priority: Sent to ${nearbyDistricts.length} Donors in Nearby Districts.\n`;
    }

    if (prioritizedQueue.length === 0) {
        messageStatus += `⚠️ No donors found matching ${requestData.blood}.`;
        alert(messageStatus);
        return;
    }

    // Fire API requests in the background
    prioritizedQueue.forEach(async (donor) => {
        if (SMS_API_KEY !== "YOUR_FAST2SMS_API_KEY") {
            try {
                // Background fetch, don't block
                fetch(`${SMS_API_URL}?authorization=${SMS_API_KEY}&route=q&message=${encodeURIComponent(messageContent)}&flash=0&numbers=${donor.mobile}`, {
                    method: "GET"
                }).then(r => r.json()).then(data => console.log(`Broadcast to ${donor.mobile} success.`));
            } catch (e) {
                console.error("Broadcast failed for", donor.mobile);
            }
        } else {
            console.log(`[MOCK BROADCAST API -> ${donor.mobile}] ${messageContent}`);
        }
    });

    if (SMS_API_KEY === "YOUR_FAST2SMS_API_KEY") {
        messageStatus += `\n(Running in MOCK API mode. Check console for simulated dispatches).`;
    }

    alert(messageStatus);
}

// Initialization and Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    populateSelects();
    initTheme();
    updateAuthStateUI();
    renderDonors();
    updateHomeStats();
    updateNotifBadge();

    // DOB → auto-calculate age for Become Donor form
    window.calcDonorAge = function(dob) {
        if (!dob) return;
        const birth = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
        const ageInput = document.getElementById('donor-age');
        if (ageInput) {
            ageInput.value = age >= 18 && age <= 70 ? age : '';
            if (age < 18) {
                ageInput.placeholder = 'Must be 18+';
                ageInput.style.borderColor = 'var(--primary-red)';
            } else if (age > 70) {
                ageInput.placeholder = 'Max age 70';
                ageInput.style.borderColor = 'var(--primary-red)';
            } else {
                ageInput.style.borderColor = '#4CAF50';
            }
        }
    };

    if (state.isLoggedIn) {
        showSection('profile');
    }

    // Verify OTP Listener
    const verifyBtn = document.getElementById('verify-otp-btn');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', () => {
            const otp = document.getElementById('otp-input').value;
            if (otp === globalOTP) {
                if (pendingUserData) {
                    if (otpPurpose === 'donor_registration') {
                        // Clear sample data if first real donor
                        if (localStorage.getItem('sevagan_real_donor_active') !== 'true') {
                            localStorage.setItem('sevagan_real_donor_active', 'true');
                            // Replace defaults with empty or just keep empty
                            donors.length = 0;
                        }

                        donors.unshift(pendingUserData);
                        localStorage.setItem('sevagan_donors', JSON.stringify(donors));

                        // Critical: Re-render all grids immediately
                        renderDonors(null, 'donors-grid');
                        renderDonors(null, 'find-donors-grid');

                        showSuccessModal('Profile Published!',
                            'Congratulations! You are now a registered SEVAGAN blood donor. Thank you for your commitment to saving lives.',
                            () => { showSection('profile'); } // Better UX to show profile after publish
                        );
                    } else if (otpPurpose === 'blood_request') {
                        const requests = JSON.parse(localStorage.getItem('sevagan_requests')) || [];
                        // Add timestamp so we can show "time ago" on the board
                        pendingUserData.timestamp = Date.now();
                        requests.unshift(pendingUserData);
                        localStorage.setItem('sevagan_requests', JSON.stringify(requests));
                        broadcastRequest(pendingUserData);
                        updateNotifBadge();
                        updateHomeStats();
                        alert('🚨 Urgent blood request verified and broadcasted securely to donors!');
                        showSection('home');
                    } else {
                        state.user = pendingUserData;
                        state.isLoggedIn = true;
                        localStorage.setItem('sevagan_logged_in', 'true');
                        localStorage.setItem('sevagan_user', JSON.stringify(state.user));
                        updateAuthStateUI();
                        showSuccessModal('Account Verified!', 'Your account verification is complete. Welcome to SEVAGAN!', () => {
                            showSection('home');
                        });
                    }
                }
                closeOTPModal();
            } else {
                alert('Please enter a valid 4-digit OTP.');
            }
        });
    }

    // Theme Toggle Click
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Mobile Menu Toggle
    const mobileLinkToggle = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');

    if (mobileLinkToggle && mobileMenu && mobileOverlay) {
        const toggleMenu = () => {
            mobileMenu.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
        };

        mobileLinkToggle.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileOverlay.classList.remove('active');
            });
        });
    }

    // Global Access for handleDonorTypeChange
    window.handleDonorTypeChange = (type) => {
        const donorName = document.getElementById('donor-name');
        const donorAge = document.getElementById('donor-age');
        const donorDistrict = document.getElementById('donor-district');
        const donorBlood = document.getElementById('donor-blood');
        const donorPincode = document.getElementById('donor-pincode');
        const donorMobile = document.getElementById('donor-mobile');

        if (type === 'me' && state.user) {
            donorName.value = state.user.name || "";
            donorAge.value = state.user.age || "";
            if (donorDistrict) donorDistrict.value = state.user.district || "";
            if (donorBlood) donorBlood.value = state.user.blood || "";
            donorPincode.value = state.user.pincode || "";
            if (donorMobile) donorMobile.value = state.user.mobile || "";
        } else {
            donorName.value = "";
            donorAge.value = "";
            if (donorDistrict) donorDistrict.selectedIndex = 0;
            if (donorBlood) donorBlood.selectedIndex = 0;
            donorPincode.value = "";
            if (donorMobile) donorMobile.value = "";
        }
    };

    // Toggle Signup Fields (Email & Passwords) based on Account Type
    window.toggleSignupEmail = (show) => {
        // Toggle Email
        const emailGroup = document.getElementById('signup-email-group');
        if (emailGroup) {
            emailGroup.style.display = show ? 'block' : 'none';
            const emailInput = document.getElementById('signup-email');
            if (emailInput) emailInput.required = show;
        }

        // Toggle Passwords
        const passContainers = document.querySelectorAll('.signup-pass-container');
        passContainers.forEach(container => {
            container.style.display = show ? 'block' : 'none';
        });

        const passInput = document.getElementById('signup-pass');
        const confirmPassInput = document.getElementById('signup-confirm-pass');

        if (passInput) passInput.required = show;
        if (confirmPassInput) confirmPassInput.required = show;
    };

    // Auto-calculate Age on Signup
    const signupDob = document.getElementById('signup-dob');
    const signupAge = document.getElementById('signup-age');
    if (signupDob && signupAge) {
        signupDob.addEventListener('change', (e) => {
            const age = calculateAge(e.target.value);
            if (age !== " - ") {
                signupAge.value = age;
            }
        });
    }

    // Signup Submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('signup-name').value;
            const mobile = document.getElementById('signup-mobile').value;
            const age = document.getElementById('signup-age').value;
            const dob = document.getElementById('signup-dob').value;
            const gender = document.getElementById('signup-gender').value;
            const blood = document.getElementById('signup-blood').value;
            const district = document.getElementById('signup-district').value;
            const pincode = document.getElementById('signup-pincode').value;
            const pass = document.getElementById('signup-pass').value;
            const confirmPass = document.getElementById('signup-confirm-pass').value;
            const accountType = document.querySelector('input[name="account-type"]:checked').value;
            const email = document.getElementById('signup-email').value;

            // Validations
            if (accountType !== 'individual') {
                if (!email) {
                    alert('Official Email is required for NGO/Hospital verification.');
                    return;
                }
                if (pass !== confirmPass) {
                    alert('Passwords do not match. Please try again.');
                    return;
                }
            }

            if (!/^[A-Z0-9 ]+$/.test(name)) {
                alert('Name must be in CAPS and can only contain letters and numbers.');
                return;
            }
            if (!/^\d{10}$/.test(mobile)) {
                alert('Mobile number must be exactly 10 digits.');
                return;
            }
            if (!/^\d{6}$/.test(pincode)) {
                alert('Pincode must be exactly 6 digits.');
                return;
            }

            const userData = {
                name, mobile, age, dob, gender, blood, district, pincode, pass, accountType, email,
                donations: 0,
                requests: 0
            };

            pendingUserData = userData;
            otpPurpose = 'signup';
            sendOTP(userData.mobile, accountType !== 'individual' ? email : null);
        });
    }

    // Mock Login Logic
    const loginForm = document.getElementById('login-form');
    const loginMobile = document.getElementById('login-mobile');
    const loginPasswordGroup = document.getElementById('login-password-group');
    const loginPassword = document.getElementById('login-password');

    if (loginMobile && loginPasswordGroup) {
        loginMobile.addEventListener('input', (e) => {
            if (e.target.value.includes('@')) {
                loginPasswordGroup.style.display = 'block';
                loginPassword.required = true;
            } else {
                loginPasswordGroup.style.display = 'none';
                loginPassword.required = false;
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const mobile = loginMobile ? loginMobile.value.trim() : '';
            const pass = loginPassword ? loginPassword.value.trim() : '';

            if (mobile === "9999999999") {
                state.user = { name: "Central Admin", mobile: mobile, role: "admin" };
                state.isLoggedIn = true;
                localStorage.setItem('admin_logged_in', 'true');
                updateAuthStateUI();
                renderAdminPortal();
                showSuccessModal('Admin Access Granted', 'Welcome to Central Command Dashboard.', () => {
                    showSection('admin');
                });
                return;
            }

            if (mobile.length >= 10) {
                let foundDonor = donors.find(d => d.mobile === mobile);
                if (!foundDonor) {
                    const savedUser = JSON.parse(localStorage.getItem('sevagan_user'));
                    if (savedUser && savedUser.mobile === mobile) foundDonor = savedUser;
                }

                if (!foundDonor) {
                    alert('No account found with this mobile number. Please sign up first.');
                    return;
                }

                if (loginPasswordGroup && loginPasswordGroup.style.display !== 'none') {
                    if (foundDonor.pass && foundDonor.pass !== pass) {
                        alert('Error: Incorrect password. Please check your credentials.');
                        return;
                    }
                }

                pendingUserData = foundDonor;
                otpPurpose = 'login';
                sendOTP(mobile);
            } else {
                alert('Please enter a valid 10-digit mobile number.');
            }
        });
    }

    // Mock Logout Logic
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem('sevagan_logged_in');
            localStorage.removeItem('sevagan_user');
            localStorage.removeItem('admin_logged_in'); // ensure clean state
            updateAuthStateUI();
            showSection('home');
        });
    }


    // Profile Section Logic
    const photoInput = document.getElementById('profile-photo-input');
    const photoDisplay = document.getElementById('profile-photo-display');

    if (photoInput && photoDisplay) {
        photoInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    photoDisplay.innerHTML = `<img src="${event.target.result}" alt="Profile">`;
                    // Persist photo
                    if (state.user) {
                        state.user.photo = event.target.result;
                        localStorage.setItem('sevagan_user', JSON.stringify(state.user));
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Function to calculate age from DOB
    const calculateAge = (dob) => {
        if (!dob) return " - ";
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    window.updateProfileUI = () => {
        if (!state.user) return;

        const user = state.user;

        // Populate Photo if exists
        if (user.photo && photoDisplay) {
            photoDisplay.innerHTML = `<img src="${user.photo}" alt="Profile">`;
        }

        // Populate Identifiers
        const displayName = document.getElementById('profile-display-name');
        if (displayName) displayName.textContent = user.name || "MEMBER";

        const rankBadge = document.getElementById('profile-rank-badge');
        if (rankBadge) {
            const dons = parseInt(user.donations || 0);
            let rankClass = "novice";
            let rankName = "NOVICE SEVAGAN";
            
            if (dons >= 10) { rankClass = "hero"; rankName = "HERO SEVAGAN"; }
            else if (dons >= 5) { rankClass = "gold"; rankName = "GOLD SEVAGAN"; }
            else if (dons >= 3) { rankClass = "silver"; rankName = "SILVER SEVAGAN"; }
            else if (dons >= 1) { rankClass = "bronze"; rankName = "BRONZE SEVAGAN"; }
            
            rankBadge.className = "rank-badge " + rankClass;
            rankBadge.textContent = rankName;
        }

        // Detailed Fields
        const formatDateObj = (dateStr) => {
            if (!dateStr) return " - ";
            const d = new Date(dateStr);
            if (isNaN(d)) return dateStr;
            return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        };

        const profMap = {
            'prof-name': user.name,
            'prof-blood': user.blood,
            'prof-dob': formatDateObj(user.dob),
            'prof-district': user.district,
            'prof-pincode': user.pincode,
            'prof-gender': user.gender,
            'prof-mobile': user.mobile,
            'prof-stat-donations': user.donations || 0,
            'prof-stat-requests': user.requests || 0
        };

        for (const [id, value] of Object.entries(profMap)) {
            const el = document.getElementById(id);
            if (el) el.textContent = value || " - ";
        }

        const ageEl = document.getElementById('prof-age');
        if (ageEl) ageEl.textContent = calculateAge(user.dob);

        // Inject Mock Urgent Blood Request for Donors
        const pendingSection = document.getElementById('profile-pending-requests');
        const reqList = document.getElementById('prof-requests-list');
        if (pendingSection && reqList && user.name !== "MEMBER") { // Show if logged in as a real donor
            if (localStorage.getItem('fake_request_handled') !== 'true') {
                pendingSection.style.display = 'block';
                reqList.innerHTML = `
                    <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-color);">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                            <div>
                                <h5 style="margin: 0; font-size: 1rem;">Patient: Suresh Kumar</h5>
                                <p style="margin: 0; font-size: 0.85rem; color: var(--text-sec);"><i class="fas fa-hospital"></i> Apollo Hospital, ${user.district || 'City'}</p>
                            </div>
                            <div style="background: rgba(229, 57, 53, 0.1); color: var(--primary-red); padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold; font-size: 1rem;">
                                ${user.blood || 'O+'}
                            </div>
                        </div>
                        <p style="font-size: 0.85rem; margin-bottom: 1rem; color: var(--text-sec);">Critical operation scheduled for tomorrow. Blood bank is out of stock.</p>
                        <div style="display: flex; gap: 0.5rem;">
                            <button class="btn btn-primary btn-sm" onclick="handleMockRequest(true)" style="flex: 1; padding: 0.5rem;">Accept Request</button>
                            <button class="btn btn-secondary btn-sm" onclick="handleMockRequest(false)" style="flex: 1; padding: 0.5rem;">Reject</button>
                        </div>
                    </div>
                `;
            } else {
                pendingSection.style.display = 'none';
            }
        }
    };

    window.handleMockRequest = (accepted) => {
        localStorage.setItem('fake_request_handled', 'true');
        updateProfileUI(); // Refresh UI to hide the request
        if (accepted) {
            showSuccessModal('Request Accepted!', 'Thank you! Your contact details have been shared with the hospital. They will reach out to you shortly.');
        } else {
            alert('Request Declined. We will notify other nearby donors instantly.');
        }
    };

    // Profile Edit Logic
    window.toggleProfileEdit = (isEditing) => {
        const container = document.getElementById('profile-details-container');
        if (!container) return;

        if (isEditing) {
            container.classList.add('editing');
            // Prep the form
            if (state.user) {
                document.getElementById('edit-name').value = state.user.name || "";
                document.getElementById('edit-blood').value = state.user.blood || "O+";
                document.getElementById('edit-dob').value = state.user.dob || "";
                document.getElementById('edit-district').value = state.user.district || "";
                document.getElementById('edit-pincode').value = state.user.pincode || "";

                // Gender chips
                const gender = state.user.gender || "Male";
                const genderRadio = document.querySelector(`input[name="edit-gender"][value="${gender}"]`);
                if (genderRadio) genderRadio.checked = true;
            }
        } else {
            container.classList.remove('editing');
        }
    };

    const editForm = document.getElementById('profile-edit-form');
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!state.user) return;

            const updatedData = {
                ...state.user,
                name: document.getElementById('edit-name').value,
                blood: document.getElementById('edit-blood').value,
                dob: document.getElementById('edit-dob').value,
                district: document.getElementById('edit-district').value,
                pincode: document.getElementById('edit-pincode').value,
                gender: document.querySelector('input[name="edit-gender"]:checked').value
            };

            // Validations
            if (!/^[A-Z0-9 ]+$/.test(updatedData.name)) {
                alert('Name must be in CAPS and can only contain letters and numbers.');
                return;
            }
            if (!/^\d{6}$/.test(updatedData.pincode)) {
                alert('Pincode must be exactly 6 digits.');
                return;
            }

            state.user = updatedData;
            localStorage.setItem('sevagan_user', JSON.stringify(state.user));

            updateProfileUI();
            toggleProfileEdit(false);
            showSuccessModal('Profile Updated', 'Your profile details have been saved successfully.');
        });
    }

    // Donor Form Logic
    const donorForm = document.querySelector('.donor-form');
    if (donorForm) {
        donorForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('donor-name').value;
            const ageInput = parseInt(document.getElementById('donor-age').value);
            const district = document.getElementById('donor-district').value;
            const blood = document.getElementById('donor-blood').value;
            const pincode = document.getElementById('donor-pincode').value;
            const gender = donorForm.querySelector('input[name="gender"]:checked')?.value || 'Male';
            const lastDonated = document.getElementById('donor-last-date')?.value;

            if (ageInput < 18) {
                alert('Backend Requirement: Minimum age for donation is 18.');
                return;
            }

            if (lastDonated) {
                const lastDate = new Date(lastDonated);
                const today = new Date();
                const diffTime = Math.abs(today - lastDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                const requiredDays = gender === 'Female' ? 120 : 90;

                if (today > lastDate && diffDays < requiredDays) {
                    const balance = requiredDays - diffDays;
                    alert(`🚨 Not Eligible Yet:\n\nYou recently donated blood. Based on your gender (${gender}), you must wait ${requiredDays} days between donations.\n\nPlease wait ${balance} more days before registering available again.`);
                    return;
                }
            }

            const mobile = document.getElementById('donor-mobile').value || state.user?.mobile || "";
            const email = state.user?.email || JSON.parse(localStorage.getItem('sevagan_user'))?.email || "verified@member.com";

            if (!mobile || !/^\d{10}$/.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number.');
                return;
            }

            // Backend Prompt: Check if mobile number already exists
            const existingDonor = donors.find(d => d.mobile === mobile);
            if (existingDonor && donorType !== 'me') {
                alert('Mobile number already registered as a donor.');
                return;
            }

            const donorData = {
                name: name,
                group: blood, // Changed from 'blood' to 'group' for consistency
                district: district,
                pincode: pincode,
                gender: gender,
                mobile: mobile,
                email: email,
                available: true,
                donations: 0
            };

            const donorType = donorForm.querySelector('input[name="donor-type"]:checked')?.value;

            if (donorType === 'me') {
                // Skip OTP for authenticated users
                if (localStorage.getItem('sevagan_real_donor_active') !== 'true') {
                    localStorage.setItem('sevagan_real_donor_active', 'true');
                    donors.length = 0;
                }

                donors.unshift(donorData);
                localStorage.setItem('sevagan_donors', JSON.stringify(donors));

                renderDonors(null, 'donors-grid');
                renderDonors(null, 'find-donors-grid');

                showSuccessModal('Profile Published!',
                    'Congratulations! You are now a registered SEVAGAN blood donor. Thank you for your commitment to saving lives.',
                    () => { showSection('profile'); } // Send them to profile instead of just home
                );
            } else {
                // Trigger Verification Flow for friends/manual entries
                pendingUserData = donorData;
                otpPurpose = 'donor_registration';
                sendOTP(donorData.mobile);
            }
        });
    }

    // Request Form Logic
    const requestForm = document.getElementById('request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const patient = document.getElementById('req-patient').value;
            const blood = document.getElementById('req-blood').value;
            const district = document.getElementById('req-district').value;
            const hospital = document.getElementById('req-hospital').value;
            const pincode = document.getElementById('req-pincode').value;
            const mobile = document.getElementById('req-contact').value;

            const requestData = { patient, blood, district, hospital, pincode, mobile };

            pendingUserData = requestData;
            otpPurpose = 'blood_request';
            sendOTP(mobile);
        });
    }

    // Quick Search Mock
    document.querySelectorAll('.search-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const container = btn.closest('.search-bar');
            if (container) {
                const bloodSelect = container.querySelector('#search-blood, #find-blood');
                const countrySelect = container.querySelector('#search-country, #find-country');
                const stateSelect = container.querySelector('#search-state, #find-state');
                const districtSelect = container.querySelector('#search-district, #find-district');
                const citySelect = container.querySelector('#search-city, #find-city');

                const blood = bloodSelect ? bloodSelect.value : "";
                const country = countrySelect ? countrySelect.value : "";
                const state = stateSelect ? stateSelect.value : "";
                const district = districtSelect ? districtSelect.value : "";
                const city = citySelect ? citySelect.value : "";

                // Switch to find donors and optionally filter
                showSection('find-donors');
                const showAllBtn = document.querySelector('.show-all-btn');

                if (blood || country || state || district || city) {
                    renderDonors({ blood, country, state, district, city }, 'find-donors-grid');
                    if (showAllBtn) showAllBtn.style.display = 'none';
                } else {
                    if (showAllBtn) showAllBtn.style.display = 'inline-block';
                }
            } else {
                showSection('find-donors');
            }
        });
    });

    // Show All Donors Button
    const showAllBtn = document.querySelector('.show-all-btn');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            // Reset search inputs
            document.getElementById('find-blood').selectedIndex = 0;
            document.getElementById('find-district').selectedIndex = 0;
            document.getElementById('find-pincode').value = '';

            renderDonors(null, 'find-donors-grid');
            showAllBtn.style.display = 'none'; // hide it after clicking
            alert('Showing all registered donors in Tamil Nadu.');
        });
    }

    // Global toggle
    window.showSection = showSection;
});

// Update notification bell badge count
function updateNotifBadge() {
    const requests = JSON.parse(localStorage.getItem('sevagan_requests') || '[]');
    const badge = document.getElementById('notif-badge');
    if (!badge) return;
    if (requests.length > 0) {
        badge.textContent = requests.length > 9 ? '9+' : requests.length;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Render Requests Board
function renderRequestsBoard() {
    const grid = document.getElementById('requests-board-grid');
    const empty = document.getElementById('requests-board-empty');
    if (!grid) return;

    const requests = JSON.parse(localStorage.getItem('sevagan_requests') || '[]');

    if (requests.length === 0) {
        grid.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    if (empty) empty.style.display = 'none';

    grid.innerHTML = requests.map((req, i) => {
        const timeAgo = req.timestamp
            ? (() => {
                const diff = Math.floor((Date.now() - req.timestamp) / 60000);
                if (diff < 1) return 'Just now';
                if (diff < 60) return `${diff}m ago`;
                if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
                return `${Math.floor(diff / 1440)}d ago`;
              })()
            : 'Recently posted';

        return `
        <div class="request-card">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem;">
                <div style="background:var(--primary-red); color:white; padding:0.4rem 0.9rem; border-radius:8px; font-weight:800; font-size:1.1rem; box-shadow:0 4px 10px rgba(234,63,63,0.3);">
                    ${req.blood}
                </div>
                <span style="font-size:0.8rem; color:var(--text-sec);"><i class="fas fa-clock" style="margin-right:0.3rem;"></i>${timeAgo}</span>
            </div>
            <h4 style="margin-bottom:0.25rem; font-size:1.1rem;">${req.patient || 'Patient'}</h4>
            <p style="color:var(--text-sec); font-size:0.85rem; margin-bottom:0.75rem;">
                <i class="fas fa-hospital" style="color:var(--primary-red); margin-right:0.35rem;"></i>${req.hospital || 'Hospital'}
            </p>
            <p style="color:var(--text-sec); font-size:0.85rem; margin-bottom:1rem;">
                <i class="fas fa-map-marker-alt" style="color:var(--primary-red); margin-right:0.35rem;"></i>${req.district || ''} ${req.pincode ? '• ' + req.pincode : ''}
            </p>
            <div style="display:flex; gap:0.75rem;">
                <a href="tel:${req.mobile}" class="btn btn-primary btn-sm" style="flex:1; border-radius:8px;">
                    <i class="fas fa-phone"></i> Call Now
                </a>
                <a href="sms:${req.mobile}?body=Hi, I saw your ${req.blood} blood request on SEVAGAN. I can help!" class="btn btn-secondary btn-sm" style="flex:1; border-radius:8px;">
                    <i class="fas fa-comment"></i> SMS
                </a>
            </div>
        </div>`;
    }).join('');
}

// Update home page stats to match real data
function updateHomeStats() {
    const totalRequests = JSON.parse(localStorage.getItem('sevagan_requests') || '[]').length;
    const activeDonors = donors.filter(d => d.available !== false).length;
    const uniqueDistricts = new Set(donors.map(d => (d.district || '').toUpperCase()).filter(Boolean)).size;
    const districtsCovered = uniqueDistricts > 0 ? uniqueDistricts : DISTRICTS.length;

    const homeDonors = document.getElementById('home-stat-donors');
    const homeRequests = document.getElementById('home-stat-requests');
    const homeDistricts = document.getElementById('home-stat-districts');
    const heroDonorCount = document.getElementById('hero-donor-count');

    if (homeDonors) homeDonors.textContent = activeDonors || donors.length;
    if (homeRequests) homeRequests.textContent = totalRequests;
    if (homeDistricts) homeDistricts.textContent = districtsCovered;
    if (heroDonorCount) heroDonorCount.textContent = activeDonors || donors.length;
}

// Admin Logic rendering
function renderAdminPortal() {
    const filterDist = document.getElementById('admin-filter-district');
    const filterVal = filterDist ? filterDist.value.toLowerCase() : "";

    const statReq = document.getElementById('admin-stat-requests');
    const statUsers = document.getElementById('admin-stat-users');
    const statDonorsElement = document.getElementById('admin-stat-donors');
    const statDonations = document.getElementById('admin-stat-donations');
    const tbody = document.getElementById('admin-donors-tbody');

    const totalReqs = JSON.parse(localStorage.getItem('sevagan_requests') || "[]").length;
    let totalDons = 0;
    donors.forEach(d => totalDons += (d.donations || 0));
    
    if(statReq) statReq.textContent = totalReqs; 
    if(statUsers) statUsers.textContent = donors.length; 
    if(statDonorsElement) statDonorsElement.textContent = donors.filter(d => d.available !== false).length;
    if(statDonations) statDonations.textContent = totalDons;

    // Populate admin identity card
    const adminNameEl = document.getElementById('admin-display-name');
    const adminMobileEl = document.getElementById('admin-display-mobile');
    if (adminNameEl && state.user) {
        adminNameEl.textContent = state.user.name || 'Central Admin';
    }
    if (adminMobileEl && state.user) {
        adminMobileEl.innerHTML = `<i class="fas fa-phone" style="color: var(--primary-red); margin-right: 0.4rem;"></i><span>+91 ${state.user.mobile || '9999999999'}</span>`;
    }

    // Also keep home stats in sync
    updateHomeStats();

    // Attach Event Listener for filter
    if (filterDist && !filterDist.dataset.bound) {
        filterDist.addEventListener('change', renderAdminPortal);
        filterDist.dataset.bound = "true";
    }

    if(tbody) {
        let displayList = donors;
        if (filterVal) displayList = donors.filter(d => (d.district || "").toLowerCase() === filterVal);

        if (displayList.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; padding: 2rem;">No users found in this district.</td></tr>`;
        } else {
            tbody.innerHTML = displayList.map(d => {
                let statusColor = d.available !== false ? "rgba(76, 175, 80, 0.1)" : "rgba(255, 152, 0, 0.1)";
                let statusTextCol = d.available !== false ? "#4CAF50" : "#ff9800";
                let statusText = d.available !== false ? "Can Donate" : "Inactive";
                
                // Add Cooldown check if applicable
                if (d.lastDonated) {
                    const lastDate = new Date(d.lastDonated);
                    const today = new Date();
                    const diffDays = Math.ceil(Math.abs(today - lastDate) / (1000 * 60 * 60 * 24));
                    const reqDays = d.gender === 'Female' ? 120 : 90;
                    if (today > lastDate && diffDays < reqDays) {
                        statusColor = "rgba(226, 55, 55, 0.1)";
                        statusTextCol = "var(--primary-red)";
                        const msLeft = reqDays - diffDays;
                        const monthsLeft = Math.max(1, Math.round(msLeft / 30));
                        statusText = `Recently Donated (Needs ${monthsLeft} months)`;
                    }
                }

                return `
                <tr style="border-bottom: 1px solid var(--border-color);">
                    <td style="padding: 1rem;"><strong style="color: var(--text-main);">${d.name}</strong></td>
                    <td style="padding: 1rem;"><span class="highlight-red" style="font-weight: 700;">${d.group || d.blood || 'Unknown'}</span></td>
                    <td style="padding: 1rem; color: var(--text-main);">${d.district || 'Unknown'}</td>
                    <td style="padding: 1rem; color: var(--text-main);">${d.mobile}</td>
                    <td style="padding: 1rem;">
                        <span style="background: ${statusColor}; color: ${statusTextCol}; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85rem;">${statusText}</span>
                    </td>
                </tr>
                `;
            }).join('');
        }
    }
}

/* ==========================================================================
   NEW INTERACTIVE LOGIC: BLOOD COMPATIBILITY & CHIP FILTERS
   ========================================================================== */

const COMPATIBILITY_MAP = {
    "O-": {
        give: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+ (Universal Donor)"],
        receive: ["O-"]
    },
    "O+": {
        give: ["O+", "A+", "B+", "AB+"],
        receive: ["O-", "O+"]
    },
    "A-": {
        give: ["A-", "A+", "AB-", "AB+"],
        receive: ["O-", "A-"]
    },
    "A+": {
        give: ["A+", "AB+"],
        receive: ["O-", "O+", "A-", "A+"]
    },
    "B-": {
        give: ["B-", "B+", "AB-", "AB+"],
        receive: ["O-", "B-"]
    },
    "B+": {
        give: ["B+", "AB+"],
        receive: ["O-", "O+", "B-", "B+"]
    },
    "AB-": {
        give: ["AB-", "AB+"],
        receive: ["O-", "A-", "B-", "AB-"]
    },
    "AB+": {
        give: ["AB+"],
        receive: ["EVERYONE (Universal Receiver)"]
    }
};

function selectCompatGroup(group, btnElement) {
    // Toggle active state on buttons
    document.querySelectorAll('.compat-btn').forEach(btn => btn.classList.remove('active'));
    if (btnElement) {
        btnElement.classList.add('active');
    } else {
        const btns = Array.from(document.querySelectorAll('.compat-btn'));
        const found = btns.find(b => b.textContent.trim() === group);
        if (found) found.classList.add('active');
    }

    const dict = i18n[state.language] || i18n['en'];
    const data = COMPATIBILITY_MAP[group] || COMPATIBILITY_MAP["O-"];
    const giveContainer = document.getElementById('compat-can-give');
    const receiveContainer = document.getElementById('compat-can-receive');

    const translateItem = (item) => {
        if (item.includes("Universal Donor")) return `${dict["compat_everyone"] || "EVERYONE"} (${dict["badge_legend"] || "Universal Donor"})`;
        if (item.includes("Universal Receiver")) return dict["compat_everyone_receiver"] || "EVERYONE (Universal Receiver)";
        if (item === "EVERYONE") return dict["compat_everyone"] || "EVERYONE";
        if (item === "O- Only") return dict["compat_o_only"] || "O- Only";
        return item;
    };

    if (giveContainer) {
        giveContainer.innerHTML = data.give.map(g => `<span class="compat-tag">${translateItem(g)}</span>`).join('');
    }
    if (receiveContainer) {
        receiveContainer.innerHTML = data.receive.map(r => `<span class="compat-tag">${translateItem(r)}</span>`).join('');
    }
}

function filterByChip(type, value, chipElement) {
    const parentContainer = chipElement.parentElement;
    if (parentContainer) {
        parentContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    }
    chipElement.classList.add('active');

    if (type === 'district') {
        const distSelect = document.getElementById('find-district');
        if (distSelect) distSelect.value = value;
        renderDonors(value ? { district: value } : null, 'find-donors-grid');
    } else if (type === 'blood') {
        const bloodSelect = document.getElementById('find-blood');
        if (bloodSelect) bloodSelect.value = value;
        renderDonors(value ? { blood: value } : null, 'find-donors-grid');
    }
}

function shareOnWhatsApp(patientName, hospital, bloodGroup, mobile) {
    const text = `🚨 *URGENT BLOOD REQUEST - SEVAGAN*%0A%0A*Patient:* ${patientName}%0A*Blood Group Needed:* ${bloodGroup}%0A*Hospital:* ${hospital}%0A*Contact:* ${mobile}%0A%0APlease share or contact immediately if available!`;
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

/* ==========================================================================
   GSAP DYNAMIC BLOOD WAVES BACKGROUND ANIMATION ENGINE
   ========================================================================== */

function initBloodWavesCanvas() {
    const canvas = document.getElementById('blood-waves-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    // Wave parameters animated via GSAP
    const wave1 = { y: height * 0.72, length: 0.005, amplitude: 35, frequency: 0.02, phase: 0 };
    const wave2 = { y: height * 0.80, length: 0.007, amplitude: 45, frequency: 0.015, phase: 1.5 };
    const wave3 = { y: height * 0.87, length: 0.004, amplitude: 30, frequency: 0.025, phase: 3.0 };

    // GSAP Timeline to continuously evolve wave properties
    if (typeof gsap !== 'undefined') {
        gsap.to(wave1, { phase: Math.PI * 4, duration: 8, repeat: -1, ease: 'none' });
        gsap.to(wave2, { phase: Math.PI * 4, duration: 6, repeat: -1, ease: 'none' });
        gsap.to(wave3, { phase: Math.PI * 4, duration: 10, repeat: -1, ease: 'none' });
    }

    let lastRenderTime = 0;
    function render(time) {
        // Frame throttle to ~35fps for ultra-smooth fluid canvas performance without CPU lag
        if (time && time - lastRenderTime < 28) return;
        lastRenderTime = time || performance.now();

        ctx.clearRect(0, 0, width, height);

        // Draw Wave 1 (Deep Crimson Blood)
        drawWave(ctx, wave1, width, height, 'rgba(136, 14, 79, 0.35)');
        // Draw Wave 2 (Vibrant Blood Red)
        drawWave(ctx, wave2, width, height, 'rgba(183, 28, 28, 0.45)');
        // Draw Wave 3 (Bright Red Fluid Wave)
        drawWave(ctx, wave3, width, height, 'rgba(234, 63, 63, 0.55)');
    }

    function drawWave(context, wave, w, h, color) {
        context.beginPath();
        context.moveTo(0, h);
        for (let i = 0; i < w; i += 6) {
            const y = wave.y + Math.sin(i * wave.length + wave.phase) * wave.amplitude;
            context.lineTo(i, y);
        }
        context.lineTo(w, h);
        context.closePath();
        context.fillStyle = color;
        context.fill();
    }

    if (typeof gsap !== 'undefined') {
        gsap.ticker.add(render);
    } else {
        function loop(time) {
            wave1.phase += 0.02;
            wave2.phase += 0.015;
            wave3.phase += 0.025;
            render(time);
            requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
    }
}

// Initialize GSAP Blood Waves, Fast Micro-interactions, and Language Preference on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initBloodWavesCanvas();
    initFastFramerMotionMicroInteractions();
    populateSelects();
    changeLanguage(state.language || 'en');

    // Bind search buttons
    document.querySelectorAll('.search-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const container = btn.closest('.search-bar');
            if (!container) return;
            const blood = container.querySelector('[id$="-blood"]')?.value || "";
            const country = container.querySelector('[id$="-country"]')?.value || "";
            const stateVal = container.querySelector('[id$="-state"]')?.value || "";
            const district = container.querySelector('[id$="-district"]')?.value || "";
            const city = container.querySelector('[id$="-city"]')?.value || "";

            const filterData = { blood, country, state: stateVal, district, city };
            showSection('find-donors');
            renderDonors(filterData, 'find-donors-grid');
        });
    });
});

/* Framer Motion Style Ultra-Fast Spring Micro-Interactions */
function initFastFramerMotionMicroInteractions() {
    if (typeof gsap === 'undefined') return;
    
    document.querySelectorAll('.btn, .chip, .compat-btn, .nav-list a, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, { scale: 1.02, duration: 0.1, ease: 'power2.out', overwrite: 'auto' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { scale: 1.0, duration: 0.1, ease: 'power2.out', overwrite: 'auto' });
        });
        el.addEventListener('mousedown', () => {
            gsap.to(el, { scale: 0.97, duration: 0.06, ease: 'power4.out', overwrite: 'auto' });
        });
        el.addEventListener('mouseup', () => {
            gsap.to(el, { scale: 1.02, duration: 0.08, ease: 'power2.out', overwrite: 'auto' });
        });
    });
}



