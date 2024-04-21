import pandas as pd

# Specify the file path
manual_path = "./manual.tsv"
gpt_path = "./gpt_results.tsv"
model_path = "./model_results.tsv"
# Read the TSV file into a pandas DataFrame
manual_df = pd.read_csv(manual_path, sep='\t')
gpt_df = pd.read_csv(gpt_path, sep='\t')
model_df = pd.read_csv(model_path, sep='\t')

def count_exact_matches(df1, df2):
    # Merge the dataframes on specified columns

    common_columns = [col for col in df1.columns if col in df2.columns]
    print(common_columns)
    match_count = 0
    total_count = 0
    matched_rows = {}

    df1 = df1.reset_index(drop=True)
    df2 = df2.reset_index(drop=True)
    
    for col in common_columns:
        match_mask = df1[col] == df2[col]
        column_matches = match_mask.sum()
        match_count += column_matches
        column_count = max(df1[col].count(), df2[col].count())
        total_count += column_count
        print(f"Exact matches in column '{col}': {column_matches} / {column_count}")

    # Count the number of rows in the merged dataframe
    print(f"Total exact matches / Total cells: {match_count}/{total_count} = {match_count/total_count}")

    return (match_count, total_count)

# print(manual_df.columns)
print("Model vs manual")
matches, total_count = count_exact_matches(manual_df, model_df)

print("Gpt vs manual")
matches, total_count = count_exact_matches(manual_df, gpt_df)
