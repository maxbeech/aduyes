// State-level ADU rules + regional construction-cost indices.
// Sources: statewide ADU statutes (cited per state) + regional construction cost
// indices (national average = 1.00). Numbers for states without an explicit
// statewide standard fall back to conservative generic defaults and are flagged.

export interface AduRules {
  // Whether the state has a statewide by-right ADU law that preempts local bans.
  statewideLaw: boolean;
  citation: string; // statute citation or "Local zoning governs"
  // Numeric standards (null = not set at state level → local rules apply).
  maxDetachedSqft: number | null; // max detached ADU size the state guarantees
  guaranteedMinSqft: number | null; // size a city must allow regardless of other rules
  setbackFt: number | null; // min side/rear setback
  parkingNote: string; // parking requirement summary
  ownerOccupancyRequired: boolean | null; // null = varies locally
  jaduAllowed: boolean; // junior ADU (≤500 sqft within home) permitted statewide
  approvalDays: number | null; // ministerial approval deadline
  feeWaiverSqft: number | null; // impact fees waived under this size
  maxHeightFt: number | null;
  summary: string;
}

export interface StateData {
  name: string;
  slug: string;
  abbr: string;
  costIndex: number; // regional construction-cost multiplier vs US average (1.00)
  rules: AduRules;
  cities: string[]; // major cities for programmatic city pages
}

const GENERIC = (extra?: Partial<AduRules>): AduRules => ({
  statewideLaw: false,
  citation: "Local zoning governs — rules vary by city/county",
  maxDetachedSqft: null,
  guaranteedMinSqft: null,
  setbackFt: null,
  parkingNote: "Set by local ordinance — commonly 1 space per ADU unless near transit.",
  ownerOccupancyRequired: null,
  jaduAllowed: false,
  approvalDays: null,
  feeWaiverSqft: null,
  maxHeightFt: null,
  summary:
    "This state has no statewide by-right ADU law, so accessory dwelling units are " +
    "governed entirely by your city or county zoning code. Many cities still allow ADUs — " +
    "check your local planning department for size, setback and parking rules.",
  ...extra,
});

export const STATES: StateData[] = [
  {
    name: "California", slug: "california", abbr: "CA", costIndex: 1.25,
    cities: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento", "Oakland", "Long Beach", "Fresno", "Anaheim", "Bakersfield", "Riverside", "Santa Ana", "Irvine", "Pasadena", "Berkeley"],
    rules: {
      statewideLaw: true,
      citation: "Cal. Gov. Code §66314 et seq. (former §65852.2)",
      maxDetachedSqft: 1200, guaranteedMinSqft: 800, setbackFt: 4,
      parkingNote: "No parking required if within 1/2 mile of public transit, in a historic district, or part of the existing/proposed primary residence.",
      ownerOccupancyRequired: false, jaduAllowed: true, approvalDays: 60,
      feeWaiverSqft: 750, maxHeightFt: 18,
      summary:
        "California has the strongest statewide ADU law in the country. Cities must approve a detached ADU up to 800 sq ft (and generally up to 1,200 sq ft) ministerially within 60 days, with only a 4 ft side/rear setback. Owner-occupancy cannot be required, and impact fees are waived for ADUs under 750 sq ft. A junior ADU (JADU, up to 500 sq ft inside the home) is also allowed.",
    },
  },
  {
    name: "Washington", slug: "washington", abbr: "WA", costIndex: 1.10,
    cities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Everett", "Kent", "Renton", "Olympia"],
    rules: {
      statewideLaw: true,
      citation: "RCW 36.70A.681 (HB 1337, 2023)",
      maxDetachedSqft: 1000, guaranteedMinSqft: 1000, setbackFt: 5,
      parkingNote: "No more than 1 space per ADU; no parking required within 1/2 mile of major transit.",
      ownerOccupancyRequired: false, jaduAllowed: true, approvalDays: null,
      feeWaiverSqft: null, maxHeightFt: 24,
      summary:
        "Washington's HB 1337 (2023) requires cities and counties in urban growth areas to allow two ADUs per lot, of at least 1,000 sq ft each, in single-family zones. Owner-occupancy cannot be required and parking minimums are sharply limited near transit.",
    },
  },
  {
    name: "Oregon", slug: "oregon", abbr: "OR", costIndex: 1.08,
    cities: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Bend", "Beaverton", "Medford"],
    rules: {
      statewideLaw: true,
      citation: "ORS 197.312(5) (HB 2001, 2019)",
      maxDetachedSqft: null, guaranteedMinSqft: null, setbackFt: null,
      parkingNote: "Cities cannot require additional off-street parking for an ADU under HB 2001.",
      ownerOccupancyRequired: false, jaduAllowed: false, approvalDays: null,
      feeWaiverSqft: null, maxHeightFt: null,
      summary:
        "Oregon's HB 2001 requires cities over 2,500 people to allow at least one ADU per detached single-family home, subject to reasonable siting/design standards, and bars added parking requirements and owner-occupancy mandates.",
    },
  },
  {
    name: "Maine", slug: "maine", abbr: "ME", costIndex: 1.02,
    cities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "30-A M.R.S. §4364-B (LD 2003, 2022)",
      ownerOccupancyRequired: false,
      summary:
        "Maine's LD 2003 (2022) requires municipalities to allow at least one ADU per single-family lot and prohibits owner-occupancy requirements. Size and setback standards are set locally within state limits.",
    }),
  },
  {
    name: "New Hampshire", slug: "new-hampshire", abbr: "NH", costIndex: 1.05,
    cities: ["Manchester", "Nashua", "Concord", "Dover", "Portsmouth"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "RSA 674:71–73",
      summary:
        "New Hampshire requires municipalities to allow one attached ADU by right in any zone that permits single-family homes. Detached ADUs and additional standards are set locally.",
    }),
  },
  {
    name: "Vermont", slug: "vermont", abbr: "VT", costIndex: 1.05,
    cities: ["Burlington", "South Burlington", "Rutland", "Montpelier"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "24 V.S.A. §4412(1)(E) (HOME Act, S.100, 2023)",
      summary:
        "Vermont's HOME Act (2023) requires one ADU to be allowed as a permitted use on any owner-occupied single-family lot, easing the path to backyard cottages statewide.",
    }),
  },
  {
    name: "Montana", slug: "montana", abbr: "MT", costIndex: 0.98,
    cities: ["Billings", "Missoula", "Bozeman", "Great Falls", "Helena"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "Montana SB 528 (2023)",
      summary:
        "Montana's SB 528 (2023) requires cities over 5,000 residents to allow at least one ADU per single-family lot by right, with limited parking and design standards.",
    }),
  },
  {
    name: "Colorado", slug: "colorado", abbr: "CO", costIndex: 1.05,
    cities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder", "Lakewood"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "Colorado HB24-1152 (2024)",
      summary:
        "Colorado's HB24-1152 (2024) requires larger municipalities in metropolitan areas to allow ADUs in single-family zones, phasing in by-right approval.",
    }),
  },
  {
    name: "Massachusetts", slug: "massachusetts", abbr: "MA", costIndex: 1.20,
    cities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell", "Somerville"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "Affordable Homes Act, M.G.L. c.40A §3 (2024)",
      maxDetachedSqft: 900, guaranteedMinSqft: 900, ownerOccupancyRequired: false, jaduAllowed: false,
      summary:
        "Massachusetts' 2024 Affordable Homes Act allows ADUs up to 900 sq ft (or half the size of the primary home) by right in single-family zones statewide, without an owner-occupancy requirement.",
    }),
  },
  {
    name: "Rhode Island", slug: "rhode-island", abbr: "RI", costIndex: 1.12,
    cities: ["Providence", "Warwick", "Cranston", "Pawtucket"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "R.I. Gen. Laws §45-24-37 (2024)",
      summary:
        "Rhode Island's 2024 zoning reforms require municipalities to permit one ADU on lots with an existing single-family home, subject to limited local standards.",
    }),
  },
  {
    name: "Utah", slug: "utah", abbr: "UT", costIndex: 0.98,
    cities: ["Salt Lake City", "West Valley City", "Provo", "Ogden", "Sandy"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "Utah Code §10-9a-530",
      summary:
        "Utah requires municipalities to allow internal (within the home) ADUs by right in most single-family zones, with limited local restrictions.",
    }),
  },
  {
    name: "Arizona", slug: "arizona", abbr: "AZ", costIndex: 0.98,
    cities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Gilbert", "Tempe"],
    rules: GENERIC({
      statewideLaw: true,
      citation: "Arizona HB 2720 (2024)",
      summary:
        "Arizona's HB 2720 (2024) requires municipalities over 75,000 residents to allow ADUs on single-family lots, with restrictions on owner-occupancy and HOA bans, phasing in from 2025.",
    }),
  },
  // States without a statewide by-right law (local zoning governs). Cost index set;
  // a curated set of major cities is included for programmatic city pages.
  { name: "Texas", slug: "texas", abbr: "TX", costIndex: 0.92, rules: GENERIC(), cities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Plano"] },
  { name: "Florida", slug: "florida", abbr: "FL", costIndex: 0.95, rules: GENERIC(), cities: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Fort Lauderdale"] },
  { name: "New York", slug: "new-york", abbr: "NY", costIndex: 1.20, rules: GENERIC(), cities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany"] },
  { name: "Georgia", slug: "georgia", abbr: "GA", costIndex: 0.90, rules: GENERIC(), cities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"] },
  { name: "North Carolina", slug: "north-carolina", abbr: "NC", costIndex: 0.88, rules: GENERIC(), cities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Asheville"] },
  { name: "Illinois", slug: "illinois", abbr: "IL", costIndex: 1.10, rules: GENERIC(), cities: ["Chicago", "Aurora", "Naperville", "Evanston", "Springfield"] },
  { name: "Pennsylvania", slug: "pennsylvania", abbr: "PA", costIndex: 1.02, rules: GENERIC(), cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie"] },
  { name: "Ohio", slug: "ohio", abbr: "OH", costIndex: 0.95, rules: GENERIC(), cities: ["Columbus", "Cleveland", "Cincinnati", "Dayton"] },
  { name: "Michigan", slug: "michigan", abbr: "MI", costIndex: 0.95, rules: GENERIC(), cities: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"] },
  { name: "Virginia", slug: "virginia", abbr: "VA", costIndex: 0.98, rules: GENERIC(), cities: ["Virginia Beach", "Richmond", "Arlington", "Alexandria", "Norfolk"] },
  { name: "Minnesota", slug: "minnesota", abbr: "MN", costIndex: 1.05, rules: GENERIC(), cities: ["Minneapolis", "Saint Paul", "Rochester", "Duluth"] },
  { name: "Nevada", slug: "nevada", abbr: "NV", costIndex: 1.02, rules: GENERIC(), cities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas"] },
  { name: "Tennessee", slug: "tennessee", abbr: "TN", costIndex: 0.88, rules: GENERIC(), cities: ["Nashville", "Memphis", "Knoxville", "Chattanooga"] },
  { name: "Maryland", slug: "maryland", abbr: "MD", costIndex: 1.05, rules: GENERIC(), cities: ["Baltimore", "Frederick", "Rockville", "Annapolis"] },
  { name: "Connecticut", slug: "connecticut", abbr: "CT", costIndex: 1.15, rules: GENERIC(), cities: ["Hartford", "New Haven", "Stamford", "Bridgeport"] },
  { name: "New Jersey", slug: "new-jersey", abbr: "NJ", costIndex: 1.15, rules: GENERIC(), cities: ["Newark", "Jersey City", "Trenton", "Princeton"] },
  { name: "Hawaii", slug: "hawaii", abbr: "HI", costIndex: 1.35, rules: GENERIC({ summary: "Hawaii ADU (‘ohana unit) rules are set by each county. Honolulu allows one ADU on qualifying lots; check your county planning department for size and parking standards." }), cities: ["Honolulu", "Hilo", "Kailua", "Kapolei"] },
  { name: "Washington DC", slug: "washington-dc", abbr: "DC", costIndex: 1.20, rules: GENERIC(), cities: ["Washington"] },
];

export function getState(slug: string): StateData | undefined {
  return STATES.find((s) => s.slug === slug);
}

export function citySlug(city: string): string {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function findCity(stateSlug: string, citySlugStr: string) {
  const state = getState(stateSlug);
  if (!state) return undefined;
  const city = state.cities.find((c) => citySlug(c) === citySlugStr);
  return city ? { state, city } : undefined;
}
