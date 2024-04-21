from dotenv import load_dotenv
from langchain_core.output_parsers import JsonOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain_openai import ChatOpenAI

from typing import List
import os
import json

load_dotenv()

model = ChatOpenAI(model="gpt-3.5-turbo", api_key=os.environ.get("OPENAI_KEY"), temperature=0)

# Define your desired data structure.
class Contract(BaseModel):
    agency: str = Field(default="", description="The federal agency that is responsible for the contract.")
    companies: List[str] = Field(default=[], description="The companies that are named in the contract summary.")
    awarded: int = Field(default=-1, description="The amount of funding the companies are awarded for the contract.")
    contract_type: str = Field(default="", description="The type of contract the funding falls under.")

class Article(BaseModel):
    contracts: List[Contract] = Field(default="", description="A list where each item has the information for a contract summary.")

# Set up a parser + inject instructions into the prompt template.
parser = JsonOutputParser(pydantic_object=Article)

prompt = PromptTemplate(
    template="Answer the user query based only on the provided contract summary.\n{format_instructions}\n{query}\n",
    input_variables=["context", "query"],
    partial_variables={"format_instructions": parser.get_format_instructions()},
)

print(parser.get_format_instructions())

contract_text = """
ARMY

DRS Network & Imaging Systems LLC, Melbourne, Florida, was awarded a $177,980,560 cost-plus-fixed-fee contract for various support services for the Abrams M1 Tank Family of Vehicles (FoV), M88 Recovery FoVs, Bradley Fighting Vehicles, Assault Breacher Vehicles, and Joint Assault Bridges. Bids were solicited via the internet with one received. Work locations and funding will be determined with each order, with an estimated completion date of March 20, 2029. Army Contracting Command, Detroit Arsenal, Michigan, is the contracting activity (W56HZV-24-D-0010).   

R&M Consultants Inc., Anchorage, Alaska (W911KB-24-D-0008); Shannon and Wilson Inc., Anchorage, Alaska (W911KB-24-D-0009); and WSP USA Solutions Inc., Washington, D.C. (W911KB-24-D-0010), will compete for each order of the $25,000,000 firm-fixed-price contract for geotechnical design and related services. Bids were solicited via the internet with three received. Work locations and funding will be determined with each order, with an estimated completion date of March 21, 2029. U.S. Army Corps of Engineers, Anchorage, Alaska, is the contracting activity. 

Foster-Miller Inc., doing business as QinetiQ North America, Waltham, Massachusetts, was awarded a $10,401,796 firm-fixed-price contract for reset, recap, sustainment and maintenance parts, and maintenance services for the Robot Logistics Support Center. Bids were solicited via the internet with one received. Work will be performed in Waltham, Massachusetts, with an estimated completion date of March 21, 2029. Fiscal 2024 other procurement, Army funds were obligated at the time of the award. Army Contracting Command, Detroit Arsenal, Michigan, is the contracting activity (W56HZV-24-D-0021). 

DMYLES Inc.,* Niagara Falls, New York, was awarded an $8,622,400 firm-fixed-price contract for dredging. Bids were solicited via the internet with four received. Work will be performed in Cleveland, Ohio, with an estimated completion date of Nov. 20, 2024. Fiscal 2024 civil construction funds in the amount of $8,622,400 were obligated at the time of the award. U.S. Army Corps of Engineers, Buffalo, New York, is the contracting activity (W912P4-24-C-0006). 

CORRECTION: The $55,250,529 time-and-materials contract (W50NH9-24-F-0017) announced on March 20, 2024, for General Dynamics Information Technology Inc., Falls Church, Virginia, to provide sustainment and technical support services for U.S. Army Intelligence and Security Command was actually awarded on March 21, 2024. 
"""

contract_questions = ["For each contract summary, which federal agency is responsible for this contract (The same federal agency will be listed above all the contracts it is responsible for)?",
                 "For each contract summary, which companies are named in the contract?",
                 "For each contract summary, what is the amount of funding awarded in the contract?",
                 "For each contract summary, what is the contract type for the funding?"]

# And a query intented to prompt a language model to populate the data structure.
def get_query(context: str, questions: List[str]):
    return f"""
            You will be provided a Department of Defense article containing many contract summaries.
            Answer the questions based only on the following context:
            {context}

            Questions: {' '.join(questions)}
            """

chain = prompt | model | parser

print(get_query(contract_text, contract_questions))

ans = chain.invoke({"query": get_query(contract_text, contract_questions)})
