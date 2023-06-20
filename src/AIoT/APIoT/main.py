from flask import Flask, jsonify, request
from sklearn.linear_model import LogisticRegression
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle
from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import MinMaxScaler
from imblearn.over_sampling import SMOTE
from sklearn.neighbors import KNeighborsClassifier
from sklearn.dummy import DummyClassifier
import pickle
import joblib
import numpy as np

global columns_df

def jsonToDataFrame_Train(json_list):
    df = pd.DataFrame()

    router_list = []
    locations = []

    justOneClass = False

    for item in json_list:
        location = item['sector']

        if location not in locations:
            locations.append(location)
            df[f'{location}'] = 0

        for connection in item['connections']:
            router = connection['router']

            if router not in router_list:
                router_list.append(router)
                df[f'{router}'] = 0

    if len(locations) < 2:
        justOneClass = True

    for item in json_list:
        df_append = pd.DataFrame(columns=df.columns)

        for connection in item['connections']:
            router = connection['router']
            df_append.at[0, router] = connection['wifiPotency']

        df_append['location'] = item['sector']

        df = pd.concat([df, df_append], ignore_index=True)

    df = df.fillna(0)

    columns_df = list(df.columns)

    return df, justOneClass

def jsonToDataFrame_Predict(json_list):
    df = pd.DataFrame()
    df_append = pd.DataFrame(columns=df.columns)

    for h in range(0, len(json_list)):
        for i in list(df.columns):
            df_append[f'{i}'] = 0

        for item in json_list[h]:

            router = item['router']
            df_append.at[0, router] = item['wifiPotency']

            df_append['location'] = 0

        df = pd.concat([df, df_append], ignore_index=True)

        df = df.fillna(0)

    return df

app = Flask(__name__)

le = LabelEncoder()
scaler = MinMaxScaler()
columnsToNormalize = []

def constant_model(X_train, targetNumber):
    return targetNumber

@app.route('/train', methods=['POST'])
def modelTrain():

    df, justOneClass = jsonToDataFrame_Train(request.json)

    le = LabelEncoder()

    df['location'] = le.fit_transform(df['location'])

    with open('label_encoder.pkl', 'wb') as file:
        pickle.dump(le, file)

    X_train = df.drop(['location'], axis=1)
    y_train = df['location']

    if justOneClass:
        model = constant_model(X_train, y_train[0])
    else:
        model = LogisticRegression()
        model.fit(X_train, y_train)

    pickle.dump(model, open('AIoTModel.pkl', 'wb'))

    return jsonify({'message': 'Modelo treinado com sucesso!'})


@app.route('/predict', methods=['POST'])
def modelPredict():

    df = jsonToDataFrame_Predict(request.json)

    with open('label_encoder.pkl', 'rb') as file:
        le = pickle.load(file)

    print(df)

    df['location'] = le.inverse_transform(df['location'])

    adapted_dataset = df.copy()

    model = joblib.load('AIoTModel.pkl')

    try:
        required_columns = model.feature_names_
    except:
        required_columns = []

    present_columns = list(df.columns)

    missing_columns = list(set(required_columns) - set(present_columns))

    for column in missing_columns:
        adapted_dataset[column] = 0

    adapted_dataset = adapted_dataset[required_columns]

    try:
        predictMessages = model.predict(df.drop(['location'], axis=1))
    except:
        predictMessages = []
        for i in range(len(df)):
            predictMessages.append(0)

    predictions = []

    for predictMessage in predictMessages:
        predictions.append(le.inverse_transform([predictMessage])[0])

    print(predictions)

    return predictions

if __name__ == '__main__':
    app.run()