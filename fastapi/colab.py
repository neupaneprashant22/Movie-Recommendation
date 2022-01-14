# Core Pkg
import uvicorn
from fastapi import FastAPI,Query

# ML Aspect
import pandas as pd
from scipy import sparse

# init app
app = FastAPI()

# Routes
@app.get('/predictcolab/{u_id}')
async def predict(u_id):
        u_id=int(u_id)
        ratings = pd.read_csv('./../Movie recommender/ml-latest-small/ratings.csv')
        movies = pd.read_csv('./../Movie recommender/ml-latest-small/movies.csv')
        ratings = pd.merge(movies,ratings).drop(['genres','timestamp'],axis=1)
        userRatings = ratings.pivot_table(index=['userId'],columns=['movieId'],values='rating')
        userRatings = userRatings.dropna(thresh=10, axis=1).fillna(0,axis=1)
        corrMatrix = userRatings.corr(method='pearson')

        def get_similar(movie_name,rating):
                similar_ratings = corrMatrix[movie_name]*(rating-2.5)
                similar_ratings = similar_ratings.sort_values(ascending=False)
                return similar_ratings
        def get_movieId(imdbId):
                links=pd.read_csv('./../Movie recommender/ml-latest-small/links.csv')
                correspoding_movieId=links.movieId[links['imdbId'] == imdbId]
                return(correspoding_movieId)
        def check_ifrated(movie_id):
                return movie_id in userRatings

        rating_foruser_df=pd.read_csv('./../Movie recommender/ml-latest-small/ratings.csv')
        movie_rated=rating_foruser_df.movieId[rating_foruser_df['userId'] == u_id]
        ratings_rated=rating_foruser_df.rating[rating_foruser_df['userId'] == u_id]
        movie_rated=movie_rated.tail(5)
        ratings_rated=ratings_rated.tail(5)
        movieId_predict=list(movie_rated.values)
        rating_predict=list(ratings_rated.values)
        new_movieId_predict=list()
        new_rating_predict=list()
        for i in range(5):
                print(check_ifrated(movieId_predict[i]))
                if (check_ifrated(movieId_predict[i])== True):
                        new_movieId_predict.append(movieId_predict[i])
                        new_rating_predict.append(rating_predict[i])
        movieId_predict=new_movieId_predict
        rating_predict=new_rating_predict
        movie_lover = list(zip(movieId_predict, rating_predict))
        print(movie_lover)
        similar_movies = pd.DataFrame(columns=['movieId','correlation'])
        for movie,rating in movie_lover:
                similar_movies = similar_movies.append(get_similar(movie,rating),ignore_index = True)
        values=similar_movies.sum().sort_values(ascending=False).head(10)
        print(values)
        result=list(values.index)
        print(result)
        def get_imdbId(movieId):
                links=pd.read_csv('./../Movie recommender/ml-latest-small/links.csv')
                correspoding_imdbId=links.imdbId[links['movieId'] == movieId]
                return(correspoding_imdbId)

        imdb_list=[]
        for x in result:
                imdb=get_imdbId(x)
                if(imdb.empty):
                        imdb_int=0
                else:
                        imdb_int=int(imdb) 
                imdb_list.append(imdb_int)
        print(imdb_list)
        return {"userId":u_id,"movieId":imdb_list}


if __name__ == '__main__':
	uvicorn.run(app,host="127.0.0.1",port=8000)