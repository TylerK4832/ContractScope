import { Contract } from "../../types";

// const rows: Contract[] = [
//   {
//     id: "1",
//     context:
//       "BAE Systems Information and Electronic Systems, Fort Wayne, Indiana, was awarded a $459,802,408 order-dependent contract for AN/ARC-231/A Multi-mode Aviation Radio Suite hardware components, repair services and technical/engineering/logistic support. Bids were solicited via the internet with one received. Work locations and funding will be determined with each order, with an estimated completion date of April 9, 2034. Army Contracting Command, Aberdeen Proving Ground, Maryland, is the contracting activity (W56JSR-24-D-0002).",
//     date: new Date("April 10, 2024"),
//     awardedCompany: "BAE Systems Information and Electronic Systems",
//     awardedCompanyLocation: "Fort Wayne, Indiana",
//     amountAwarded: 459802408,
//     awardedFor:
//       "AN/ARC-231/A Multi-mode Aviation Radio Suite hardware components, repair services and technical/engineering/logistic support",
//     workLocation: "",
//     expectedCompletionDate: new Date("April 9, 2034"),
//     contractingActivityGroup: "Army Contracting Command",
//     activityGroupLocation: "Aberdeen Proving Ground, Maryland",
//     activityCode: "W56JSR-24-D-0002",
//     contractType: "order-dependent",
//     isModification: false,
//   },
//   {
//     id: "2",
//     context:
//       "Change Healthcare Technologies LLC, Alpharetta, Georgia, has been awarded a maximum $328,279,472 modification (P00033) exercising the five-year option period of a five-year base contract (SPE2D1-18-D-0006) with one five-year option period for digital imaging network-picture archive communication systems, components, training, maintenance service and incidental services. This is a fixed-price with economic-price-adjustment, indefinite-delivery/indefinite-quantity contract. The ordering period end date is Dec. 14, 2027. Using customers are Army, Navy, Air Force, Marine Corps and federal civilian agencies. Type of appropriation is fiscal 2023 through 2028 defense working capital funds. The contracting activity is the Defense Logistics Agency Troop Support, Philadelphia, Pennsylvania.",
//     date: new Date("Nov. 22, 2022"),
//     awardedCompany: "Change Healthcare Technologies LLC",
//     awardedCompanyLocation: "Alpharetta, Georgia",
//     amountAwarded: 328279472,
//     awardedFor:
//       "digital imaging network-picture archive communication systems, components, training, maintenance service and incidental services",
//     workLocation: "",
//     expectedCompletionDate: new Date("Dec. 14, 2027"),
//     contractingActivityGroup: "Defense Logistics Agency Troop Support",
//     activityGroupLocation: "Philadelphia, Pennsylvania",
//     activityCode: "SPE2D1-18-D-0006",
//     contractType:
//       "fixed-price with economic-price-adjustment, indefinite-delivery/indefinite-quantity",
//     isModification: true,
//   },
//   {
//     id: "3",
//     context:
//       "Golden Sands General Contractors Inc., Richmond, Virginia, is being awarded an $11,757,000 firm-fixed-price contract for construction of the Vertical Electro-Magnetic Pulse Simulator (VEMPS) at Patuxent River Naval Air Station.  The work to be performed provides for the construction of a new VEMPS facility which is a small shelter to house the VEMP generator.  Work will be performed in Patuxent River, Maryland, and is expected to be completed by June 2017.  Fiscal 2016 research, development, test and evaluation, (Navy) contract funds in the amount of $11,757,000 are obligated on this award and will not expire at the end of the current fiscal year.  This contract was competitively procured via the Navy Electronic Commerce Online website with two proposals received.  The Naval Facilities Engineering Command, Washington, Washington, District of Columbia, is the contracting activity (N40080-16-C-3015).",
//     date: new Date("April 21, 2016"),
//     awardedCompany: "Golden Sands General Contractors Inc.",
//     awardedCompanyLocation: "Richmond, Virginia",
//     amountAwarded: 11757000,
//     awardedFor:
//       "construction of the Vertical Electro-Magnetic Pulse Simulator (VEMPS) at Patuxent River Naval Air Station",
//     workLocation: "Patuxent River, Maryland",
//     expectedCompletionDate: new Date("June 1, 2017"),
//     contractingActivityGroup: "Naval Facilities Engineering Command",
//     activityGroupLocation: "Washington, District of Columbia",
//     activityCode: "N40080-16-C-3015",
//     contractType: "firm-fixed-price",
//     isModification: false,
//   },
//   {
//     id: "4",
//     context:
//       "General Dynamics NASSCO-Bremerton, Bremerton, Washington, is awarded a $34,305,282 modification to previously awarded contract N00024-14-C-4321 to exercise an option for repair and alteration requirements for USS Carl Vinson (CVN 70) fiscal 2019 dry-docking planned incremental availability (DPIA). The DPIA is the opportunity in the ship’s life cycle to conduct repairs and alterations.  The option will authorize the fourth major availability of the contract, and entails modification and repair of ship equipment, hull and systems. Work will be performed in Bremerton, Washington, and is expected to be completed by July 2020. Fiscal 2019 operations and maintenance (Navy) funding in the amount of $34,305,282 will be obligated at time of award and will expire at the end of the current fiscal year.  Puget Sound Naval Shipyard and Intermediate Maintenance Facility, Bremerton, Washington, is the contracting activity.",
//     date: new Date("Feb. 8, 2019"),
//     awardedCompany: "General Dynamics NASSCO-Bremerton",
//     awardedCompanyLocation: "Bremerton, Washington",
//     amountAwarded: 34305282,
//     awardedFor:
//       "repair and alteration requirements for USS Carl Vinson (CVN 70) fiscal 2019 dry-docking planned incremental availability (DPIA)",
//     workLocation: "Bremerton, Washington",
//     expectedCompletionDate: new Date("July 1, 2020"),
//     contractingActivityGroup:
//       "Puget Sound Naval Shipyard and Intermediate Maintenance Facility",
//     activityGroupLocation: "Bremerton, Washington",
//     activityCode: "N00024-14-C-4321",
//     contractType: "modification",
//     isModification: false,
//   },
// ];

// export default rows;
