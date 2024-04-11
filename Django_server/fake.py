import faker
import random




def fake_data():
    fake = faker.Faker()
    username=fake.user_name()
    first_name=fake.first_name()
    last_name=fake.last_name()
    email=fake.email()
    user_roll=random.choice(['admin','user','publisher'])
    return {
        'username':username,
        'first_name':first_name,
        'last_name':last_name,
        'email':email,
        'user_roll':user_roll
    }
