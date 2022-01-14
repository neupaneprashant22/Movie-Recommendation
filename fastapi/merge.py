# Core Pkg
import uvicorn
from fastapi import FastAPI,Query,Request
from fastapi.middleware.cors import CORSMiddleware

# ML Aspect
import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer 
import pandas as pd
from sklearn.metrics.pairwise import linear_kernel
import warnings
from scipy import sparse

warnings.filterwarnings('ignore')

app = FastAPI()
origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/predict/{m_id}')
async def predict(m_id):
        m_id=int(m_id)
        #import dataset
        tagsDF = pd.read_csv('./../Movie recommender/ml-latest-small/tags.csv')
        moviesDF = pd.read_csv('./../Movie recommender/ml-latest-small/movies.csv')

        #creating dataframe
        tfidf = TfidfVectorizer(stop_words='english')
        tagsAndGenresDataFrame = pd.merge(moviesDF, tagsDF, on='movieId',how='outer')[['movieId','title', 'tag','genres']]
        movieAndGenres = tagsAndGenresDataFrame
        movieAndGenres.tag=movieAndGenres.tag.fillna('')
        movieAndGenres['tag'] =  movieAndGenres.groupby(['movieId','title'])['tag'].transform(lambda x: ' '.join(x))
        movieAndGenres = movieAndGenres.drop_duplicates()
        movieAndGenres['genresList'] = movieAndGenres['genres'].str.split("|")
        movieAndGenres.drop('genres',axis=1, inplace=True)
        movieAndGenres['genresList'] = movieAndGenres['genresList'].apply(lambda x: ' '.join([str(i) for i in x]))
        movieAndGenres['genresList'] = movieAndGenres['genresList'].str.lower()

        #combining tags and genres into one
        def create_tags(x):
                return ''.join(x['tag'].lower()) + ' ' + ''.join(x['genresList'])
        movieAndGenres['tags'] = movieAndGenres.apply(create_tags, axis=1)
        movieAndGenres.reset_index(drop=True,inplace=True)
        tfidf_matrix = tfidf.fit_transform(movieAndGenres['tags'])
        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
        movieAndGenresindices = pd.Series(movieAndGenres.index, index=movieAndGenres['movieId']).drop_duplicates()

        #recommendation logic
        def get_recommendations(title, cosine_sim=cosine_sim):
                idx = movieAndGenresindices[title]
                sim_scores = list(enumerate(cosine_sim[idx]))
                sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
                sim_scores = sim_scores[1:6]
                movie_indices = [i[0] for i in sim_scores]
                return movieAndGenres[['title','movieId']].iloc[movie_indices]
        def get_movieId(imdbId):
                links=pd.read_csv('./../Movie recommender/ml-latest-small/links.csv')
                correspoding_movieId=links.movieId[links['imdbId'] == imdbId]
                print(correspoding_movieId)
                return(correspoding_movieId)
        movie_id=get_movieId(m_id)
        movie_id=int(movie_id)
        recommendations=get_recommendations(movie_id)
        movies=(recommendations['movieId'].astype(str))

        def get_imdbId(movieId):
                links=pd.read_csv('./../Movie recommender/ml-latest-small/links.csv')
                correspoding_imdbId=links.imdbId[links['movieId'] == movieId]
                return(correspoding_imdbId)
        movies_int=movies.astype(int)
        imdb_list=[]
        for x in movies_int:
                imdb=get_imdbId(x)
                imdb_int=int(imdb) 
                imdb_list.append(imdb_int)

        return {"movidId":m_id,"movies":recommendations['title'],"movieId":imdb_list}

@app.get('/adduser/{userId}/{imdbId}/{rating}')
async def adduser(userId,imdbId,rating):
        userId=int(userId)
        imdbId=int(imdbId)
        rating=float(rating)
        def get_movieId(imdbId):
                links=pd.read_csv('./../Movie recommender/ml-latest-small/links.csv')
                correspoding_movieId=links.movieId[links['imdbId'] == imdbId]
                print(correspoding_movieId)
                return(correspoding_movieId)
        movie_id=get_movieId(imdbId)
        movie_id=int(movie_id)
        data = {
        'userId':[userId],
        'movieId': [movie_id],
        'rating': [rating],
        'timestamp': [964981247]
        }
        df = pd.DataFrame(data)
        print(df)
        df.to_csv('./../Movie recommender/ml-latest-small/ratings.csv', mode='a', index=False, header=False)
        return {"result":"added"}

@app.get('/predictcolab/{u_id}')
async def predictcolab(u_id):
        print(u_id)
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
        print((movieId_predict))
        for i in range(len(movieId_predict)):
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
	uvicorn.run(app,host="127.0.0.1",port=80)