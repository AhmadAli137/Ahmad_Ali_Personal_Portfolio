export interface Comp {
  years: string;
  title: string;
  result?: string;
  detail?: string;
  location?: string;
}

export const comps: Comp[] = [
  { years: "2014–2019", title: "Windsor Regional Science Fair", result: "6× Gold + sponsor awards", detail: "Six years of projects, six gold medals — where it all started.", location: "Windsor" },
  { years: "2015", title: "Let's Talk Science Windsor Competition", result: "1st Place", location: "Windsor" },
  { years: "2015–2019", title: "Canada-Wide Science Fair", result: "2× Bronze · Silver · $10k UOttawa Scholarship", detail: "Four national finals appearances (2015, 2016, 2018, 2019).", location: "National" },
  { years: "2017", title: "Bordercity Hackathon", result: "1st Place", detail: "WeatherPy — first hackathon, first win.", location: "Windsor" },
  { years: "2018", title: "Bordercity Hackathon", detail: "Virtual Connect 4 app.", location: "Windsor" },
  { years: "2018", title: "MasseyHacks", detail: "Hand-motion-controlled FPS zombie game.", location: "Windsor" },
  { years: "2018", title: "STEM Entrepreneurship Bootcamp", result: "People's Choice Winner", location: "Windsor" },
  { years: "2019", title: "Windsor Engineering Competition", detail: "Junior engineering challenge — wind turbine build.", location: "Windsor" },
  { years: "2020", title: "Hack the Northeast", detail: "Covid-19 Global — worldwide statistics desktop app.", location: "Virtual" },
  { years: "2020", title: "BorderHacks", detail: "Exponent Base e Calculator (the Sarker Game that almost was).", location: "Virtual" },
  { years: "2020–2023", title: "WEC Programming Challenge", result: "4× 1st Place", detail: "Four consecutive years at the top of the programming category.", location: "Windsor" },
  { years: "2020–2024", title: "Ontario Engineering Competition", detail: "Four appearances representing Windsor.", location: "Ontario" },
  { years: "2021", title: "BorderHacks", result: "People's Choice + Open Data Challenge Winner", detail: "WinParks — exploring Windsor's parks and trails.", location: "Virtual" },
  { years: "2022", title: "WinHacks", detail: "WinGrid — keeping EVs on the grid.", location: "Windsor" },
  { years: "2023", title: "NASA Space Apps Challenge", result: "3rd Place", detail: "Comfire.", location: "Windsor" },
  { years: "2023", title: "IEEE PIMRC International Conference", result: "Best Demo Award", detail: "Indoor autonomous drone navigation — capstone project.", location: "Toronto" },
  { years: "2023", title: "EPICentre Entrepreneurship Excellence Awards", result: "Innovation Mastery Award + $1,000", location: "Windsor" },
  { years: "2024", title: "UWillDiscover Conference", result: "3rd Place — Oral Presentation", location: "Windsor" },
  { years: "2024", title: "Formula SAE", detail: "Accumulator (battery pack) team.", location: "Michigan" },
  { years: "2024", title: "WinHacks", result: "2nd Place Overall", detail: "Second Life — EV battery reuse platform.", location: "Windsor" },
  { years: "2025", title: "WinHacks", result: "2nd Overall + 1st in Category", detail: "PresentPro — AI presentation coach with haptic wearable.", location: "Windsor" },
  { years: "2025", title: "IEEE EPEC Conference", result: "Poster Presenter", detail: "Dual-chemistry load distribution for EV battery systems.", location: "Waterloo" },
  { years: "2025", title: "NASA Space Apps Challenge", result: "1st Place + Global Nomination", detail: "Meteor Madness.", location: "Windsor" },
  { years: "2025", title: "UWindsor × Jaguar Land Rover Automotive AI Competition", result: "$600 + 1-week JLR internship", detail: "Automotive AI memory optimization.", location: "Windsor" },
  { years: "2026", title: "WinHacks", result: "Finalist", detail: "SketchBot V1 — the drawing robot.", location: "Windsor" },
  { years: "2026", title: "UWindsor Automotive UI/UX Challenge", result: "1st Place", detail: "RV interface challenge.", location: "Windsor" },
  { years: "2026", title: "ClubHacks", detail: "SketchBot V2 — AprilTag camera-vision tracking.", location: "Windsor" },
  { years: "2026", title: "CS Games", detail: "Team mentor for the UWindsor delegation.", location: "Montreal" },
  { years: "2026", title: "Take Your Shot Pitch Competition", result: "4th Place — $2,500", location: "Leamington" },
  { years: "2026", title: "Hack the 6ix", detail: "Edge Pong — spatial-haptics smart paddle.", location: "Toronto" },
];

export const locations = [
  "Windsor", "Toronto", "Ottawa", "New Brunswick", "Kingston", "London",
  "Leamington", "Quebec", "Michigan", "Waterloo",
];
