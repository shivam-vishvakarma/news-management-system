# import faker
# import random




# def fake_data():
#     fake = faker.Faker()
#     username=fake.user_name()
#     first_name=fake.first_name()
#     last_name=fake.last_name()
#     email=fake.email()
#     user_roll=random.choice(['admin','user','publisher'])
#     return {
#         'username':username,
#         'first_name':first_name,
#         'last_name':last_name,
#         'email':email,
#         'user_roll':user_roll
#     }

import requests
import json


url="http://localhost:8000/users/"
headers={
    'Authorization':'Token 69f3f6032a107835d3ebd95a49f2793cc524cf73'
    }



x={
    "username":"test1",
    "password":"test1234",
    "first_name":"test1",
    "last_name":"test1",
    "email":"ravi@gmail.com",
}

y=requests.post(url, headers=headers ,json=x)

print(y.text)

# url="http://localhost:8000/login/"

# x={
#     "username":"ravi",
#     "password":"ravi"
# }


# y=requests.post(url,json=x)
# print(y.text)


