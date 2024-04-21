// let names = ["BAE Systems Information and Electronic Systems",
// "Golden Sands General Contractors Inc.",
// "General Dynamics NASSCO-Bremerton",
// "Lockheed Martin Rotary and Mission Systems",
// "SupplyCore Inc.",
// "Lockheed Martin Corp.",
// "BAE Systems Norfolk Ship Repair Inc.",
// "Dawson Enterprises LLC",
// "General Dynamics Land Systems",
// "Raytheon Missiles & Defense",
// "Capco Inc",
// "Physical Optics Corp.",
// "Tetra Tech Inc.",
// "Rockwell Collins Inc.",
// "McMurdo Group",
// "Northrop Grumman Aerospace Systems",
// "Insitu Inc.",
// "Tecan US Inc.",
// "DRS Advanced ISR LLC",
// "Pratt & Whitney Military Engines",
// "Northrop Grumman Systems Corp.",
// "MW Builders Inc.",
// "Communication & Power Industries (Econco division)",
// "Baron Communications",
// "Orbital Research Inc.",
// "Oregon Department of Fish and Wildlife",
// "PC Mechanical Inc.",
// "B. L. Harbert International",
// "Stratascor LLC",
// "Offshore Service Vessels LLC",
// "The Boeing Co.",
// "Raytheon Integrated Defense Systems",
// "ENGlobal Government Services Inc.",
// "Lockheed Martin Corp., Lockheed Martin Aeronautics Co.",
// "Fluor Federal Solutions LLC"]



let stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']

const removeStopWords = (str: string) => {
    for (let stop of stopwords) {
        str = str.replace(stop, "");
    }
    return str;
}

export const stringSimilarity = (
    str1: string,
    str2: string,
    substringLength= 2,
    caseSensitive = false
): number => {
    if (!caseSensitive) {
        str1 = str1.toLowerCase();

        str2 = str2.toLowerCase();
    }

    str1 = removeStopWords(str1);
    str2 = removeStopWords(str2);

    if (str1.length < substringLength || str2.length < substringLength) return 0;

    const map = new Map();

    for (let i = 0; i < str1.length - (substringLength - 1); i++) {
        const substr1 = str1.substr(i, substringLength);

        map.set(substr1, map.has(substr1) ? map.get(substr1) + 1 : 1);
    }

    let match = 0;

    for (let j = 0; j < str2.length - (substringLength - 1); j++) {
        const substr2 = str2.substr(j, substringLength);

        const count = map.has(substr2) ? map.get(substr2) : 0;

        if (count > 0) {
            map.set(substr2, count - 1);

            match++;
        }
    }

    return (match * 2) / (str1.length + str2.length - (substringLength - 1) * 2);
};

// export const groupBySimilarity = (names: string[], seed: string[]) => {
//     // const common_contractors = ['BAE Systems', 'Lockheed Martin', 'Raytheon', 'General Dynamics', 'Northrop Grumman']

//     const category : {[key: string]: string} = {};

//     for (let n of names) {
//         let grouped = false;
//         for (let c of seed) {
//             if (n.includes(c)) {
//                 category[c] = n;
//                 grouped = true
//             }
//         }
        
//         if (!grouped) {
//             for (let k in category) {
//                 let sim = stringSimilarity(n, k);
//                 if (sim > 0.5) {
//                     category[k];
//                     grouped = true;
//                     break;
//                 }
//             }
//             if (!grouped) category[n] = [];
//         }
//     }

//     return category;
// }
