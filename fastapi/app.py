# Core Pkg
import uvicorn
from fastapi import FastAPI,Query

# ML Aspect
import joblib


from sklearn.feature_extraction.text import TfidfVectorizer 
import pandas as pd
from sklearn.metrics.pairwise import linear_kernel
import warnings
warnings.filterwarnings('ignore')



# init app
app = FastAPI()

# Routes
@app.get('/')
async def index():
	return {"text":"Hello API Masters"}

# ML Aspect

# Using Post
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


if __name__ == '__main__':
	uvicorn.run(app,host="127.0.0.1",port=8002)