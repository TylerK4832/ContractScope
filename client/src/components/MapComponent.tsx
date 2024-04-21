import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useMemo, useRef } from 'react';
import { Contract } from '../../types';
import { usdToNum } from '../utils/currencyConverter';
import { abbrevToState, hslToHex, stateAbbrevs, stateCenters, states } from '../utils/state';

// type Contract = {
//     company: string;
//     location: string;
//     amount: number; // Assume the amount is parsed as number
//     purpose: string;
//     completionDate: Date;
//     contractActivity: string;
//     activityLocation: string;
//     contractCode: string;
//     contractType: string;
//     workLocation: string;
// };

const companies = [
    'BAE Systems Information and Electronic Systems',
    'Change Healthcare Technologies LLC',
    'Golden Sands General Contractors Inc.',
    'General Dynamics NASSCO-Bremerton',
    'Lockheed Martin',
    'Raytheon Technologies',
    'Boeing Defense, Space & Security',
    'Northrop Grumman',
    'Intel Corp',
    'Micron Technology',
];

const locations = [
    'Fort Wayne, Indiana',
    'Alpharetta, Georgia',
    'Richmond, Virginia',
    'Bremerton, Washington',
    'Orlando, Florida',
    'San Diego, California',
    'Phoenix, Arizona',
    'Philadelphia, Pennsylvania',
    'Aberdeen, Maryland',
    'Palo Alto, California',
    'Austin, Texas',
    'Portland, Oregon',
    'Las Vegas, Nevada',
    'Miami, Florida',
    'Boston, Massachusetts',
    'Columbus, Ohio',
    'Denver, Colorado',
    'Nashville, Tennessee',
    'New Orleans, Louisiana',
    'Charlotte, North Carolina',
    'Detroit, Michigan',
    'Seattle, Washington',
    'Minneapolis, Minnesota',
    'Boise, Idaho',
    'Salt Lake City, Utah',
    'Omaha, Nebraska',
    'Tampa, Florida',
    'Atlanta, Georgia',
    'Madison, Wisconsin',
    'Raleigh, North Carolina',
    'Kansas City, Missouri',
    'Lexington, Kentucky',
    'Indianapolis, Indiana',
    'Jacksonville, Florida',
    'San Francisco, California',
];

const purposes = [
    'Aviation Radio Suite hardware components',
    'Digital imaging network-PACS',
    'Construction of VEMPS',
    'Ship repair and alteration',
    'Aerospace engineering services',
    'Missile defense systems',
    'Satellite communication systems',
    'Data center expansion',
    'Cybersecurity solutions',
    'Semiconductor manufacturing',
];

const contractActivities = [
    'Army Contracting Command',
    'Defense Logistics Agency Troop Support',
    'Naval Facilities Engineering Command',
    'Air Force Materiel Command',
    'Space and Naval Warfare Systems',
    'Defense Advanced Research Projects Agency',
    'National Security Agency',
    'U.S. Special Operations Command',
    'Office of Naval Research',
    'Defense Health Agency',
];

const contractTypes = [
    'Order-dependent',
    'Fixed-price with economic-price-adjustment',
    'Firm-fixed-price',
    'Cost-plus-fixed-fee',
    'Time-and-materials',
    'Cost-reimbursement',
    'Indefinite-delivery, indefinite-quantity',
    'Fixed-price-incentive',
    'Cost-plus-award-fee',
    'Fixed-price with award-fee',
];

const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Helper function to generate random number within range
const randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

// Function to generate random contracts
// Function to generate random contracts
const generateContracts = (numContracts: number): Contract[] => {
    const contracts: Contract[] = [];
    for (let i = 0; i < numContracts; i++) {
        const companyName = companies[randomNumber(0, companies.length - 1)];
        const workLocation = locations[randomNumber(0, locations.length - 1)];
        const amountAwarded = String(randomNumber(500000, 500000000));
        const awardedFor = purposes[randomNumber(0, purposes.length - 1)];
        const completionDate = randomDate(new Date(), new Date(2035, 11, 31))
            .toISOString()
            .split('T')[0];
        const contractingActivity =
            contractActivities[randomNumber(0, contractActivities.length - 1)];
        const contractNumber = `N${randomNumber(10000, 99999)}-${randomNumber(
            10,
            99
        )}-C-${randomNumber(1000, 9999)}`;
        const contractType = contractTypes[randomNumber(0, contractTypes.length - 1)];
        const id = Math.random().toFixed(10).toString();

        contracts.push({
            id,
            workLocation,
            amountAwarded,
            contractingActivity,
            awardedFor,
            contractType,
            companyName,
            contractNumber,
            completionDate,
        });
    }
    return contracts;
};

const sampleContracts = generateContracts(5);

function normalizeLocation(location: string): string {
    let firstLoc = location.split(';')[0];
    const parts = firstLoc.split(', ');

    let state: string = "";

    for (let i = 0; i <= parts.length; i++) {
        if (i === 1 && stateAbbrevs.includes(parts[i])){
            state = abbrevToState[parts[i]];
            break;
        }
        if (states.includes(parts[i])) {
            state = parts[i];
            break;
        }
    }
    
    // if(!state) console.log(location);

    return state;

    // const state = parts.length > 1 ? parts[1].trim() : null;
    // if (state && stateAbbreviationsMapping[state]) {
        // parts[1] = stateAbbreviationsMapping[state];
        // return parts.join(', ');
    // }
    // return location;
}

const useLocationStats = (contracts: Contract[]) => {
    return useMemo(() => {
        const stats: { [key: string]: any } = {};
        for (let contract of contracts) {
            try {
                const normalizedLocation = normalizeLocation(contract.workLocation);
                if (!normalizedLocation) {
                    // console.log('Could not normalize location:', contract.workLocation);
                    continue;
                }
                if (!stats[normalizedLocation]) {
                    stats[normalizedLocation] = {
                        totalAmount: 0,
                        count: 0,
                        activities: {},
                        types: {},
                        companies: {},
                        totalCompletionTime: 0,
                        maxActivity: { name: '', count: 0 },
                        maxType: { name: '', count: 0 },
                        maxCompany: { name: '', count: 0 },
                    };
                }
                const locStats = stats[normalizedLocation];
                locStats.totalAmount += usdToNum(contract.amountAwarded);
                locStats.count++;
                locStats.totalCompletionTime += new Date(contract.completionDate).getTime();

                const activityCount = (locStats.activities[contract.contractingActivity] =
                    (locStats.activities[contract.contractingActivity] || 0) + 1);
                if (activityCount > locStats.maxActivity.count) {
                    locStats.maxActivity = {
                        name: contract.contractingActivity,
                        count: activityCount,
                    };
                }

                const typeCount = (locStats.types[contract.contractType] =
                    (locStats.types[contract.contractType] || 0) + 1);
                if (typeCount > locStats.maxType.count) {
                    locStats.maxType = { name: contract.contractType, count: typeCount };
                }

                const companyCount = (locStats.companies[contract.companyName] =
                    (locStats.companies[contract.companyName] || 0) + 1);
                if (companyCount > locStats.maxCompany.count) {
                    locStats.maxCompany = { name: contract.companyName, count: companyCount };
                }
            } catch (err) {
                console.log(err);
                continue;
            }
        }
        Object.keys(stats).forEach((location) => {
            const locStats = stats[location];
            locStats.averageAmount = locStats.totalAmount / locStats.count;
            locStats.averageCompletionDate = new Date(
                locStats.totalCompletionTime / locStats.count
            );
        });

        return stats;
    }, [contracts]);
};

const fetchCoordinates = async (place: string): Promise<[number, number]> => {
    // const accessToken =
    //     '--redacted--';
    // const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    //     place
    // )}.json?country=US&access_token=${accessToken}`;

    // try {
    //     const response = await axios.get(url);
    //     const coordinates = response.data.features[0].center as [number, number];
    //     return coordinates;
    // } catch (error) {
    //     console.error('Failed to fetch coordinates', error);
    //     return [0, 0]; // Return a default value or handle appropriately
    // }

    if (!stateCenters[place]) {
        return [0,0];
    }

    return [stateCenters[place].lon, stateCenters[place].lat];
};

interface IProps {
    data: Contract[];
}

const MapComponent: React.FC<IProps> = (props) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const stats = useLocationStats(props.data);

    // console.log(sampleContracts);
    // console.log(stats);

    useEffect(() => {
        if (!mapContainer.current) return;
        mapboxgl.accessToken =
            'pk.eyJ1Ijoia3RhbmcxMjQiLCJhIjoiY2xnN2Jqbno5MGxtMjNncXJtMmp4OTVueiJ9.sehQpKCl_zg6M2z6lfojTg';
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-98.5795, 37], // Center of the USA
            zoom: 2.5,
        });

        map.on('styledata', function () {
            // Determine the maximum number of contracts to scale color intensity
            const maxCount = Math.max(...Object.values(stats).map((stat) => stat.count));

            Object.entries(stats).forEach(([location, locationStats]) => {
                fetchCoordinates(location).then((coordinates) => {
                    const intensity = Math.floor((1 - locationStats.count / maxCount) * 85);
                    const color = hslToHex(155, 100, intensity);
                    
                    const marker = new mapboxgl.Marker({ color: color })
                        .setLngLat(coordinates)
                        .addTo(map);

                    const popupContent = `
                    <strong>Location:</strong> ${location}<br>
                    <strong>Contracts:</strong> ${locationStats.count}<br>
                    <strong>Average Cost Of Contract:</strong> ${locationStats.averageAmount.toFixed(
                        2
                    )}<br>
                    <strong>Most Common Activity:</strong> ${
                        locationStats.maxActivity.name
                    } (Count: ${locationStats.maxActivity.count})<br>
                    <strong>Most Common Type:</strong> ${locationStats.maxType.name} (Count: ${
                        locationStats.maxType.count
                    })<br>
                    <strong>Company with Most Contracts:</strong> ${
                        locationStats.maxCompany.name
                    } (Count: ${locationStats.maxCompany.count})<br>
                    <strong>Average Completion Date:</strong> ${locationStats.averageCompletionDate.toDateString()}
                `;
                    const popup = new mapboxgl.Popup().setHTML(popupContent);
                    marker.setPopup(popup);
                });
            });
        });

        return () => map.remove();
    }, [stats, mapContainer]);

    return <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />;
};

export default MapComponent;
