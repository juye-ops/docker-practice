import uvicorn
from pymongo import MongoClient

from fastapi import FastAPI
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://database:27017/")

class MyData(BaseModel):
    name: str
    text: str


# backend:5000/db/push에 Post로 {name: ~, text: ~} 형태의 데이터 전송 시 MongoDB에 저장
## mydb, mycollection은 각각 Mongodb 내부에서 사용 할 database 이름
@app.post("/db/push")
def dbpush(res: MyData):
    data = res.dict()
    client.custom_db.custom_coll.insert_one(data)
    return 200

@app.get("/db/get")
def db_get():
    return list(client.custom_db.custom_coll.find({}, {"_id": False}))

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=5000, access_log=False, reload=True)