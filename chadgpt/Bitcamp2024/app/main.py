from taipy.gui import Gui
import json
import pandas as pd
import json_fixer
import pickle
import ast

# page = """
# <center>
# <|navbar|lov={[("home", "Homepage")]}|>
# </center>

# """


input_dict = {}

with open("output.txt", "r") as f:
    json_string = f.read()
    input_dict = ast.literal_eval(json_string)

print(input_dict)

df = pd.DataFrame.from_dict(input_dict["contracts"])

df_pretty = pd.DataFrame()
df_pretty["Agency"] = df["agency"]
df_pretty["Companies"] = df["companies"].apply(lambda x: ';'.join(x))
df_pretty["Awarded"] = df["awarded"]
# df_pretty["Awarded"] = df["awarded"].apply(lambda x: f"${x:,}")
df_pretty["Start"] = df["contract_date"]
df_pretty["End"] = df["estimated_completion_date"]
df_pretty["Location"] = df["performance_location"].apply(lambda x: ';'.join(x))
df_pretty["Contract Type"] = df["contract_type"]
# df_pretty["Summary"] = df["summary"]

print(df_pretty)
print(df_pretty.columns)

my_page = """
<|layout|columns=3 2|

<|part|class_name=card|
<|{df_pretty}|table|show_all=True|filter=True|>
|>

<|part|class_name=card|
<|{df_pretty}|chart|x=Contract Type|y=Awarded|type=bar|title=Funding by Contract Type|>
|>

|>
"""

gui = Gui(page=my_page)
gui.run(title="bitcamp", port=5321, use_reloader=True)