import json
import csv

import pandas as pd

contracts_data = [
    [{"M":{"workLocation":{"S":"Wichita, Kansas"},"amountAwarded":{"S":"$60,523,373"},"contractingActivity":{"S":"Air Force Life Cycle Management Center"},"awardedFor":{"S":"Joint Primary Aircraft Training System"},"contractType":{"S":"firm-fixed-price, cost-plus-fixed-fee"},"companyName":{"S":"Beechcraft Defense Co"},"contractNumber":{"S":"FA8617-17-C-6211"},"completionDate":{"S":"April 30, 2021"}}},{"M":{"workLocation":{"S":"Pascagoula, Mississippi"},"amountAwarded":{"S":"$29,464,211"},"contractingActivity":{"S":"The Naval Sea Systems Command"},"awardedFor":{"S":"300 BRU-55A/A aircraft bomb ejector racks"},"contractType":{"S":"firm-fixed-price"},"companyName":{"S":"EDO Corp. Defense Systems"},"contractNumber":{"S":"N00024-17-C-2473"},"completionDate":{"S":"August 2020"}}},{"M":{"workLocation":{"S":"Honolulu, Hawaii; Japan; and British Indian Ocean Territory"},"amountAwarded":{"S":"$9,634,613"},"contractingActivity":{"S":"U.S. Army Corps of Engineers"},"awardedFor":{"S":"recurring maintenance and minor repair"},"contractType":{"S":"$9,634,613 modification"},"companyName":{"S":"Pond Constructors"},"contractNumber":{"S":"W912DY-13-G-0004"},"completionDate":{"S":"April 13, 2022"}}},{"M":{"workLocation":{"S":"Huntington Beach, California"},"amountAwarded":{"S":"$7,576,425"},"contractingActivity":{"S":"The Defense Advanced Research Projects Agency"},"awardedFor":{"S":"research project under the Hydra Phase 2 program"},"contractType":{"S":"cost-plus-fixed-fee"},"companyName":{"S":"The Boeing Co"},"contractNumber":{"S":"P00003"},"completionDate":{"S":"January 2019"}}},{"M":{"workLocation":{"S":"Maryland and Utah"},"amountAwarded":{"S":"$74,999,999"},"contractingActivity":{"S":"Defense Logistics Agency Distribution"},"awardedFor":{"S":"warehousing and distribution support services"},"contractType":{"S":"five-year contract with no option periods"},"companyName":{"S":"URS Federal Services Inc"},"contractNumber":{"S":"SP3300-17-D-5001"},"completionDate":{"S":"April 30, 2022"}}},{"M":{"workLocation":{"S":"at the contractor’s facility"},"amountAwarded":{"S":"$13,680,000"},"contractingActivity":{"S":"Defense Information Technology Contracting Organization"},"awardedFor":{"S":"production of ground transceivers for the Blue Force Tracker 2 program"},"contractType":{"S":"sole-source"},"companyName":{"S":"VIASAT"},"contractNumber":{"S":"HC1028-17-C-0010"},"completionDate":{"S":"April 2018"}}}],
    [{"M":{"workLocation":{"S":"Kirtland Air Force Base, New Mexico"},"amountAwarded":{"S":"$8,062,880"},"contractingActivity":{"S":"Air Force Research Laboratory"},"awardedFor":{"S":"solid-state-based high-power electromagnetics weapon concepts"},"contractType":{"S":"cost-plus-fixed-fee"},"companyName":{"S":"Leidos"},"contractNumber":{"S":"FA9451-23-C-A003"},"completionDate":{"S":"Dec. 2026"}}},{"M":{"workLocation":{"S":"Fort Worth, Texas"},"amountAwarded":{"S":"$24,432,476"},"contractingActivity":{"S":"The Naval Air Systems Command"},"awardedFor":{"S":"indefinite delivery/indefinite quantity"},"contractType":{"S":"indefinite delivery/indefinite quantity"},"companyName":{"S":"Lockheed Martin Aeronautics Co"},"contractNumber":{"S":"N0001922D0024"},"completionDate":{"S":"December 2023"}}},{"M":{"workLocation":{"S":"Defense Logistics Agency Troop Support, Philadelphia, Pennsylvania"},"amountAwarded":{"S":"$76,701,761"},"contractingActivity":{"S":"Defense Logistics Agency Troop Support"},"awardedFor":{"S":"military standard tents and components"},"contractType":{"S":"indefinite-delivery/indefinite-quantity"},"companyName":{"S":"Outdoor Venture Corp"},"contractNumber":{"S":"SPE1C1-23-D-0002"},"completionDate":{"S":"Aug. 31, 2025"}}},{"M":{"workLocation":{"S":"New York, New York"},"amountAwarded":{"S":"$1,959,999,848"},"contractingActivity":{"S":"U.S. Army Contracting Command"},"awardedFor":{"S":"oral therapeutic Paxlovid"},"contractType":{"S":"P00005"},"companyName":{"S":"Pfizer"},"contractNumber":{"S":"W58P05-22-C-0001"},"completionDate":{"S":"Dec. 31, 2028"}}},{"M":{"workLocation":{"S":"primarily within the NAVFAC Southwest area of responsibility"},"amountAwarded":{"S":"$95,000,000"},"contractingActivity":{"S":"Naval Facilities Engineering Systems Command Southwest"},"awardedFor":{"S":"range sustainment and remediation services"},"contractType":{"S":"multiple-award"},"companyName":{"S":"Bering Sea Eccotech LLC"},"contractNumber":{"S":"$95,000,000"},"completionDate":{"S":"Fiscal 2023"}}},{"M":{"workLocation":{"S":"Vieques, Puerto Rico"},"amountAwarded":{"S":"$95,000,000"},"contractingActivity":{"S":"Naval Facilities Engineering Systems Command Atlantic"},"awardedFor":{"S":"munitions response services"},"contractType":{"S":"indefinite-delivery/indefinite-quantity"},"companyName":{"S":"USA Environmental Inc"},"contractNumber":{"S":"N62470-23-D-0002"},"completionDate":{"S":"December 2027"}}}],
    [{"M":{"workLocation":{"S":"Rocket Center, West Virginia"},"amountAwarded":{"S":"$67,000,000"},"contractingActivity":{"S":"The Robins Air Logistics Center"},"awardedFor":{"S":"production of SR-116 rocket motors for the AIM-9P rocket"},"contractType":{"S":"100 percent foreign military sales"},"companyName":{"S":"Alliant Techsystems Operations LLC"},"contractNumber":{"S":"FA8520-17-D-0002"},"completionDate":{"S":"Feb. 27, 2022"}}},{"M":{"workLocation":{"S":"Aberdeen, Maryland"},"amountAwarded":{"S":"$39,231,530"},"contractingActivity":{"S":"U.S. Army Contracting Command"},"awardedFor":{"S":"M28B2 percussion primer"},"contractType":{"S":"firm-fixed-price"},"companyName":{"S":"Day and Zimmermann Lone Star LLC"},"contractNumber":{"S":"W52P1J-17-D-0027"},"completionDate":{"S":"March 1, 2023"}}},{"M":{"workLocation":{"S":"Connecticut"},"amountAwarded":{"S":"$162,760,750"},"contractingActivity":{"S":"Defense Logistics Agency Troop Support"},"awardedFor":{"S":"radiology systems, accessories and training"},"contractType":{"S":"five-year base contract"},"companyName":{"S":"Hitachi Aloka Medical America Inc"},"contractNumber":{"S":"SPE2D1-17-D-0024"},"completionDate":{"S":"Feb. 28, 2022"}}}],
    ]

# Function to parse contracts data into CSV
def parse_to_csv(contracts_data, output_file):
    with open(output_file, 'w', newline='') as csvfile:
        fieldnames = ['company_location', 'awarded', 'activity_group', 'contract_reason', 'contract_type', 'company', 'activity_code', 'estimated_completion_date']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames, quoting=csv.QUOTE_NONE, delimiter='|')
        
        writer.writeheader()
        for contract_list in contracts_data:
            for contract in contract_list:
                contract_details = contract['M']
                writer.writerow({
                    'company_location': contract_details['workLocation']['S'],
                    'awarded': int(contract_details['amountAwarded']['S'].replace('$', '').replace(',', '')),
                    'activity_group': contract_details['contractingActivity']['S'],
                    'contract_reason': contract_details['awardedFor']['S'],
                    'contract_type': contract_details['contractType']['S'],
                    'company': contract_details['companyName']['S'],
                    'activity_code': contract_details['contractNumber']['S'],
                    'estimated_completion_date': contract_details['completionDate']['S']
                })

csv_name = "model.csv"
# Call the function to parse and write to CSV
parse_to_csv(contracts_data, csv_name)

model_df = pd.read_csv(csv_name, sep='|')

print(model_df.head())

