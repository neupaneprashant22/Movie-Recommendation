# Core Pkg
import uvicorn
from fastapi import FastAPI,Query,Request

# ML Aspect
import pandas as pd

app = FastAPI()


@app.get('/appuser/{userId}/{movieId}/{rating}')
async def adduser(userId,movieId,rating):
        def get_movieId(imdbId):
                links=pd.read_csv('./../Movie recommender/ml-latest-small/links.csv')
                correspoding_movieId=links.movieId[links['imdbId'] == imdbId]
                return(correspoding_movieId)
        data = {
        'userId':[userId],
        'movieId': [get_movieId(movieId)],
        'rating': [rating],
        'timestamp': [964981247]
        }
        df = pd.DataFrame(data)
        print(df)
        df.to_csv('./../Movie recommender/ml-latest-small/tets.csv', mode='a', index=False, header=False)
        return {"result":"added"}

if __name__ == '__main__':
	uvicorn.run(app,host="127.0.0.1",port=8000)