// Constants
export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

export const COUNTRIES = [
    "India", "United States", "United Kingdom", "Canada", "Australia",
    "United Arab Emirates", "Saudi Arabia", "Singapore", "Malaysia", "Germany",
    "France", "Japan", "Sri Lanka", "Nepal", "Bangladesh", "Pakistan",
    "China", "South Africa", "Brazil", "Italy", "Spain", "Netherlands",
    "Switzerland", "Qatar", "Oman", "Kuwait", "Bahrain", "New Zealand",
    "Thailand", "Indonesia", "Vietnam", "Philippines", "Egypt", "Nigeria",
    "Kenya", "Russia", "South Korea", "Turkey", "Mexico", "Argentina"
];

export const LOCATION_DATA = {
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
export const STATES = Object.keys(LOCATION_DATA["India"].states);
export const DISTRICTS = Object.keys(LOCATION_DATA["India"].states["Tamil Nadu"].districts);

export function getStatesForCountry(countryName) {
    if (LOCATION_DATA[countryName] && LOCATION_DATA[countryName].states) {
        return Object.keys(LOCATION_DATA[countryName].states);
    }
    return [`${countryName} Capital Territory`, `${countryName} Main Region`];
}

export function getDistrictsForState(countryName, stateName) {
    if (LOCATION_DATA[countryName] && LOCATION_DATA[countryName].states[stateName]) {
        return Object.keys(LOCATION_DATA[countryName].states[stateName].districts);
    }
    return [`${countryName} Central District`, `${countryName} East District`];
}

export function getCitiesForDistrict(countryName, stateName, districtName) {
    if (LOCATION_DATA[countryName] && LOCATION_DATA[countryName].states[stateName] && LOCATION_DATA[countryName].states[stateName].districts[districtName]) {
        return LOCATION_DATA[countryName].states[stateName].districts[districtName];
    }
    return [`${countryName} Capital City`, `${countryName} Main Area`, "Central City"];
}

export const ADJACENT_DISTRICTS = {
    "Chennai": ["Tiruvallur", "Kanchipuram", "Chengalpattu"],
    "Chengalpattu": ["Chennai", "Kanchipuram", "Villupuram"],
    "Coimbatore": ["Tiruppur", "Nilgiris", "Erode"],
    "Madurai": ["Dindigul", "Sivagangai", "Virudhunagar", "Theni"],
    "Tiruchirappalli": ["Karur", "Namakkal", "Salem", "Perambalur", "Pudukkottai"],
    "Salem": ["Dharmapuri", "Erode", "Namakkal", "Kallakurichi"],
    "Tirunelveli": ["Tenkasi", "Thoothukudi", "Kanyakumari", "Virudhunagar"],
    "Vellore": ["Ranipet", "Tirupattur", "Kanchipuram", "Tiruvannamalai"]
};

export const DEFAULT_DONORS = [
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

export const TRANSLATIONS = {
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
        hero_badge: "Real-time donor search across Tamil Nadu",
        hero_title_1: "Be the Reason",
        hero_title_2: "Someone Lives.",
        hero_description: "Connecting people who need blood with donors who are ready to help. Fast, simple, and built to make every donation count.",
        hero_btn_find: "Find a Donor",
        hero_btn_become: "Become a Donor",
        hero_feat_fast_title: "Fast",
        hero_feat_fast_sub: "Search",
        hero_feat_safe_title: "Safe &",
        hero_feat_safe_sub: "Trusted",
        hero_feat_community_title: "Stronger",
        hero_feat_community_sub: "Community",
        quick_search_title: "Find a Blood Donor",
        quick_search_sub: "Search by blood group and location to find available donors near you.",
        lbl_blood_group: "Blood Group",
        lbl_location: "Location",
        lbl_country: "Country",
        lbl_state: "State",
        lbl_district: "District",
        lbl_city: "City / Area",
        ph_blood_group: "Select blood group",
        ph_select_country: "Select country",
        ph_select_state: "Select state",
        ph_select_district: "Select location",
        ph_select_city: "Select city / area",
        btn_search: "Search Donors",
        compat_matrix_title: "Interactive Blood Compatibility Matrix",
        compat_matrix_sub: "Select a blood group to see who can donate or receive blood in emergency moments:",
        compat_can_donate_to: "🎁 Can Donate Blood To:",
        compat_can_receive_from: "📥 Can Receive Blood From:",
        compat_everyone: "Everyone (Universal Donor)",
        compat_everyone_receiver: "Everyone (Universal Receiver)",
        compat_o_only: "O- Only",
        leaderboard_title: "Life Savers Hall of Fame",
        leaderboard_sub: "Top Voluntary Community Donors",
        th_rank: "Rank",
        th_donor_name: "Donor Name",
        th_district: "Location",
        th_blood_group: "Blood Group",
        th_lives_saved: "Lives Saved",
        th_badge: "Honor Badge",
        badge_legend: "👑 Legend",
        badge_gold_hero: "🌟 Gold Hero",
        badge_guardian: "⚡ Guardian",
        about_hero_title: "Connecting Hearts, Saving Lives",
        about_hero_sub: "SEVAGAN is a smart and secure Blood Donation Management System created to connect voluntary blood donors with patients and hospitals in critical moments.",
        our_mission_title: "Our Mission",
        our_mission_desc: "To create a reliable, fast digital network connecting voluntary blood donors with those in need, saving lives through technology.",
        our_vision_title: "Our Vision",
        our_vision_desc: "To build a scalable, secure, and nationwide platform supporting healthcare systems and voluntary donation awareness.",
        our_commitment_title: "Our Commitment",
        our_commitment_desc: "A social initiative aimed at reducing emergency response time and supporting the healthcare community with a reliable digital solution.",
        why_choose_title: "🔐 Why Choose SEVAGAN?",
        why_item_1: "OTP-based secure mobile verification",
        why_item_2: "Centralized cloud database",
        why_item_3: "Quick blood group & location search",
        why_item_4: "User-friendly multi-lingual web interface",
        why_item_5: "Designed for real-time medical emergencies",
        find_donors_title: "Find Blood Donors",
        chip_quick_filters: "⚡ Quick Location Filters:",
        chip_all_districts: "All Locations",
        chip_rare_radar: "🩸 Rare Blood Radar:",
        btn_show_all_donors: "Show All Donors",
        no_donors_found: "No Matching Donors Found",
        ready_to_donate: "Ready to Donate",
        btn_call: "Call",
        btn_share: "Share",
        become_donor_title: "Become a Blood Donor",
        become_donor_sub: "Verify your details to appear in search results and save lives in your area.",
        donor_for_label: "Who is this registration for?",
        chip_myself: "👤 Myself",
        chip_myfriend: "🤝 For a Friend",
        lbl_full_name: "Full Name",
        lbl_phone_number: "Phone Number",
        lbl_dob: "Date of Birth *",
        lbl_age: "Age (Auto-calculated)",
        ph_full_name: "e.g. Ramesh Kumar",
        ph_phone_number: "10-digit Mobile Number",
        btn_register_donor: "Register as Donor",
        request_blood_title: "Emergency Blood Request",
        request_blood_sub: "Broadcast an urgent notification to voluntary donors near your hospital.",
        lbl_patient_name: "Patient / Hospital Name",
        lbl_units_needed: "Blood Units Needed",
        lbl_hospital_address: "Hospital Address / Landmark",
        ph_patient_name: "e.g. Anitha / Apollo Hospital",
        ph_hospital_address: "e.g. Greams Road, Chennai",
        btn_submit_request: "Broadcast Emergency Alert",
        login_title: "Welcome Back",
        login_sub: "Login to manage your donor profile or request blood.",
        signup_title: "Create Account",
        signup_sub: "Join the community and start saving lives today.",
        sos_live_tag: "🚨 LIVE SOS",
        sos_default_text: "🔴 URGENT: 2 Units O- Negative needed at Apollo Hospital, Chennai | 🔴 CRITICAL: B+ Needed at GH Madurai | 🔴 3 Units A- Needed at KMCH Coimbatore — Click \"Request Blood\" to issue an alert!",
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
        hero_badge: "தமிழ்நாடு முழுவதும் நேரலை இரத்தக் கொடையாளர்கள் தேடல்",
        hero_title_1: "யாரோ ஒருவரின் உயிரைக்",
        hero_title_2: "காப்பாற்றும் காரணமாவீர்.",
        hero_description: "அவசர காலத்தில் குருதி தேவைப்படுவோரையும் கொடையாளர்களையும் உடனுக்குடன் இணைக்கும் பாதுகாப்பான தளம்.",
        hero_btn_find: "கொடையாளரைத் தேடு",
        hero_btn_become: "கொடையாளராக இணை",
        hero_feat_fast_title: "விரைவான",
        hero_feat_fast_sub: "தேடல்",
        hero_feat_safe_title: "பாதுகாப்பானது &",
        hero_feat_safe_sub: "நம்பகமானது",
        hero_feat_community_title: "வலுவான",
        hero_feat_community_sub: "சமூகம்",
        quick_search_title: "விரைவு இரத்தக் கொடையாளர் தேடல்",
        quick_search_sub: "உங்கள் பகுதியில் உள்ள கொடையாளர்களைத் தேட இரத்த வகை மற்றும் இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்.",
        lbl_blood_group: "இரத்த வகை",
        lbl_location: "இருப்பிடம்",
        lbl_country: "நாடு",
        lbl_state: "மாநிலம்",
        lbl_district: "மாவட்டம்",
        lbl_city: "நகரம் / பகுதி",
        ph_blood_group: "இரத்த வகையைத் தேர்ந்தெடுக்கவும்",
        ph_select_country: "நாட்டைத் தேர்ந்தெடுக்கவும்",
        ph_select_state: "மாநிலத்தைத் தேர்ந்தெடுக்கவும்",
        ph_select_district: "இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்",
        ph_select_city: "நகரத்தைத் தேர்ந்தெடுக்கவும்",
        btn_search: "கொடையாளர்களைத் தேடு",
        compat_matrix_title: "இரத்தப் பொருத்தம் பார்க்கும் ஊடாடும் அட்டவணை",
        compat_matrix_sub: "அவசர காலத்தில் யாருக்கு யார் ரத்தம் கொடுக்கலாம் என்பதை அறிய இரத்த வகையைத் தேர்ந்தெடுக்கவும்:",
        compat_can_donate_to: "🎁 யாருக்கு இரத்தம் கொடுக்கலாம்:",
        compat_can_receive_from: "📥 யாரிடமிருந்து இரத்தம் பெறலாம்:",
        compat_everyone: "அனைவருக்கும் (பொதுக் கொடையாளர்)",
        compat_everyone_receiver: "அனைவரிடமிருந்தும் (பொதுப் பெறுநர்)",
        compat_o_only: "O- மட்டும்",
        leaderboard_title: "தமிழ்நாடு உயிர்காப்பாளர் புகழாரம்",
        leaderboard_sub: "முன்னணி சமுதாயக் கொடையாளர்கள்",
        th_rank: "தரவரிசை",
        th_donor_name: "கொடையாளர் பெயர்",
        th_district: "இருப்பிடம்",
        th_blood_group: "இரத்த வகை",
        th_lives_saved: "காப்பாற்றப்பட்ட உயிர்கள்",
        th_badge: "விருது",
        badge_legend: "👑 சகாப்தம்",
        badge_gold_hero: "🌟 தங்க நாயகன்",
        badge_guardian: "⚡ காவலன்",
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
        find_donors_title: "இரத்தக் கொடையாளர்களைத் தேடுங்கள்",
        chip_quick_filters: "⚡ விரைவு இருப்பிட வடிகட்டிகள்:",
        chip_all_districts: "அனைத்து இருப்பிடங்களும்",
        chip_rare_radar: "🩸 அரிய இரத்த வகை ரேடார்:",
        btn_show_all_donors: "அனைத்து கொடையாளர்களையும் காட்டு",
        no_donors_found: "கொடையாளர்கள் கண்டறியப்படவில்லை",
        ready_to_donate: "தானத்திற்குத் தயார்",
        btn_call: "அழை",
        btn_share: "பகிர்",
        become_donor_title: "கொடையாளராக இணையுங்கள்",
        become_donor_sub: "தேடல் முடிவுகளில் தோன்ற உங்கள் விவரங்களை உறுதிப்படுத்தவும்.",
        donor_for_label: "இந்த பதிவு யாருக்கானது?",
        chip_myself: "👤 எனக்கு",
        chip_myfriend: "🤝 என் நண்பருக்கு",
        lbl_full_name: "முழு பெயர்",
        lbl_phone_number: "தொலைபேசி எண்",
        lbl_dob: "பிறந்த தேதி *",
        lbl_age: "வயது (தானாக கணக்கிடப்பட்டது)",
        ph_full_name: "எ.கா. ரமேஷ் குமார்",
        ph_phone_number: "10-இலக்க மொபைல் எண்",
        btn_register_donor: "கொடையாளராகப் பதிவு செய்க",
        request_blood_title: "அவசர இரத்தக் கோரிக்கை",
        request_blood_sub: "அருகிலுள்ள தன்னார்வக் கொடையாளர்களுக்கு அவசர அறிவிப்பை அனுப்பவும்.",
        lbl_patient_name: "நோயாளி / மருத்துவமனை பெயர்",
        lbl_units_needed: "தேவைப்படும் இரத்த அலகுகள்",
        lbl_hospital_address: "மருத்துவமனை முகவரி / அடையாளம்",
        ph_patient_name: "எ.கா. அனிதா / அப்பல்லோ மருத்துவமனை",
        ph_hospital_address: "எ.கா. கிரீம்ஸ் ரோடு, சென்னை",
        btn_submit_request: "அவசர கோரிக்கையை அனுப்பு",
        login_title: "மீண்டும் வருக",
        login_sub: "உங்கள் சுயவிவரத்தை நிர்வகிக்க அல்லது இரத்தம் கோர உள்நுழைக.",
        signup_title: "கணக்கை உருவாக்குங்கள்",
        signup_sub: "இன்றே சமூகத்தில் இணைந்து உயிர்களைக் காப்பாற்றத் தொடங்குங்கள்.",
        sos_live_tag: "🚨 நேரலை கோரிக்கைகள்",
        sos_default_text: "🔴 அவசரம்: அப்பல்லோ மருத்துவமனை சென்னையில் 2 யூனிட் O- தேவை | 🔴 மதுரையில் B+ தேவை — \"ரத்தம் கோரிக்கை\" கிளிக் செய்யவும்!",
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
        hero_badge: "तमिलनाडु भर में रीयल-टाइम रक्त दाता खोज",
        hero_title_1: "किसी के जीवन जीने",
        hero_title_2: "की वजह बनें।",
        hero_description: "आपातकालीन समय में रक्तदान करने वालों को मरीजों और अस्पतालों से जोड़ने वाला सुरक्षित मंच। तेज़, सरल और जीवन बचाने के लिए निर्मित।",
        hero_btn_find: "दाता खोजें",
        hero_btn_become: "दाता बनें",
        hero_feat_fast_title: "तेज़",
        hero_feat_fast_sub: "खोज",
        hero_feat_safe_title: "सुरक्षित और",
        hero_feat_safe_sub: "विश्वसनीय",
        hero_feat_community_title: "मजबूत",
        hero_feat_community_sub: "समुदाय",
        quick_search_title: "त्वरित रक्त दाता खोज",
        quick_search_sub: "अपने पास उपलब्ध दाताओं को खोजने के लिए रक्त समूह और स्थान चुनें।",
        lbl_blood_group: "रक्त समूह",
        lbl_location: "स्थान",
        lbl_country: "देश",
        lbl_state: "राज्य",
        lbl_district: "जिला",
        lbl_city: "शहर / क्षेत्र",
        ph_blood_group: "रक्त समूह चुनें",
        ph_select_country: "देश चुनें",
        ph_select_state: "राज्य चुनें",
        ph_select_district: "स्थान चुनें",
        ph_select_city: "शहर चुनें",
        btn_search: "दाता खोजें",

        compat_matrix_title: "इंटरएक्टिव रक्त अनुकूलता मैट्रिक्स",
        compat_matrix_sub: "आपतकाल में कौन किसे रक्तदान कर सकता है यह देखने के लिए रक्त समूह चुनें:",
        compat_can_donate_to: "🎁 रक्तदान कर सकते हैं:",
        compat_can_receive_from: "📥 रक्त प्राप्त कर सकते हैं:",
        compat_everyone: "सभी को (सार्वभौमिक दाता)",
        compat_everyone_receiver: "सभी से (सार्वभौमिक प्राप्तकर्ता)",
        compat_o_only: "केवल O- से",

        leaderboard_title: "लाइफसेवर हॉल ऑफ फेम",
        leaderboard_sub: "शीर्ष समुदाय स्वैच्छिक दाता",
        th_rank: "रैंक",
        th_donor_name: "दाता का नाम",
        th_district: "स्थान",
        th_blood_group: "रक्त समूह",
        th_lives_saved: "बचाए गए जीवन",
        th_badge: "सम्मान बैज",
        badge_legend: "👑 लेजेंड",
        badge_gold_hero: "🌟 गोल्ड हीरो",
        badge_guardian: "⚡ गार्जियन",

        about_hero_title: "दिलों को जोड़ना, जीवन बचाना",
        about_hero_sub: "सेवक एक स्मार्ट और सुरक्षित रक्त दान प्रबंधन प्रणाली है जो महत्वपूर्ण क्षणों में मरीजों और अस्पतालों के साथ स्वैच्छिक रक्त दाताओं को जोड़ने के लिए बनाई गई है।",
        our_mission_title: "हमारा मिशन",
        our_mission_desc: "तकनीक के माध्यम से जीवन बचाते हुए जरूरतमंदों के साथ स्वैच्छिक रक्त दाताओं को जोड़ने वाला एक विश्वसनीय, तेज़ डिजिटल नेटवर्क बनाना।",
        our_vision_title: "हमारा विजन",
        our_vision_desc: "स्वास्थ्य प्रणालियों और स्वैच्छिक रक्तदान जागरूकता का समर्थन करने वाला एक स्केलेबल, सुरक्षित और राष्ट्रव्यापी मंच बनाना।",
        our_commitment_title: "हमारी प्रतिबद्धता",
        our_commitment_desc: "आपातकालीन प्रतिक्रिया समय को कम करने और एक विश्वसनीय डिजिटल समाधान के साथ स्वास्थ्य समुदाय का समर्थन करने का सामाजिक प्रयास।",
        why_choose_title: "🔐 सेवक को क्यों चुनें?",
        why_item_1: "OTP-आधारित सुरक्षित मोबाइल सत्यापन",
        why_item_2: "केन्द्रीकृत क्लाउड डेटाबेस",
        why_item_3: "त्वरित रक्त समूह और स्थान खोज",
        why_item_4: "उपयोगकर्ता के अनुकूल बहुभाषी वेब इंटरफ़ेस",
        why_item_5: "रीयल-टाइम आपात स्थितियों के लिए निर्मित",

        find_donors_title: "रक्त दाता खोजें",
        chip_quick_filters: "⚡ त्वरित स्थान फ़िल्टर:",
        chip_all_districts: "सभी स्थान",
        chip_rare_radar: "🩸 दुर्लभ रक्त समूह रडार:",
        btn_show_all_donors: "सभी दाता दिखाएं",
        no_donors_found: "कोई दाता नहीं मिला",
        ready_to_donate: "दान के लिए तैयार",
        btn_call: "कॉल करें",
        btn_share: "शेयर करें",

        become_donor_title: "रक्त दाता बनें",
        become_donor_sub: "खोज परिणामों में दिखाई देने के लिए अपना विवरण सत्यापित करें।",
        donor_for_label: "यह पंजीकरण किसके लिए है?",
        chip_myself: "👤 स्वयं",
        chip_myfriend: "🤝 मेरा मित्र",
        lbl_full_name: "पूरा नाम",
        lbl_phone_number: "फोन नंबर",
        lbl_dob: "जन्म तिथि *",
        lbl_age: "आयु (स्वचालित परिकलित)",
        ph_full_name: "उदा. रमेश कुमार",
        ph_phone_number: "10-अंकों का मोबाइल नंबर",
        btn_register_donor: "दाता के रूप में पंजीकृत हों",

        request_blood_title: "आपातकालीन रक्त अनुरोध",
        request_blood_sub: "अपने अस्पताल के पास स्वैच्छिक रक्त दाताओं को एक आपातकालीन अधिसूचना प्रसारित करें।",
        lbl_patient_name: "मरीज / अस्पताल का नाम",
        lbl_units_needed: "आवश्यक रक्त इकाइयां",
        lbl_hospital_address: "अस्पताल का पता / लैंडमार्क",
        ph_patient_name: "उदा. अनीता / अपोलो अस्पताल",
        ph_hospital_address: "उदा. ग्रीम्स रोड, चेन्नई",
        btn_submit_request: "आपातकालीन अनुरोध प्रसारित करें",

        login_title: "पुनः स्वागत है",
        login_sub: "अपने दाता प्रोफ़ाइल को प्रबंधित करने या रक्त अनुरोध के लिए लॉगिन करें।",
        signup_title: "खाता बनाएं",
        signup_sub: "आज ही समुदाय में शामिल हों और जीवन बचाना शुरू करें।",

        sos_live_tag: "🚨 लाइव आपातकाल",
        sos_default_text: "🔴 आपातकालीन: अपोलो अस्पताल चेन्नई में 2 यूनिट O- आवश्यक | 🔴 मदुरै में B+ आवश्यक — \"रक्त अनुरोध\" पर क्लिक करें!",

        footer_sub: "आपातकालीन क्षणों में स्वैच्छिक रक्त दाताओं को मरीजों और अस्पतालों से जोड़ना।",
        footer_links_title: "त्वरित नेविगेशन",
        footer_copyright: "© 2026 सेवक ब्लड नेटवर्क। जीवन बचाने के लिए निर्मित।"
    }
};

export const i18n = TRANSLATIONS;

export const COMPATIBILITY_MAP = {
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
