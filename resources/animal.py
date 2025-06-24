from flask import request
from flask_restful import Resource, reqparse
from models import Animal, db

class AnimalResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', required =True, help="Name is required")
    parser.add_argument('species', required=True, help="Species is required")
    parser.add_argument('age', required=False)
    parser.add_argument('description', required=False)
    parser.add_argument('adoption_status', required=True, help ="Adoption status is required")
    parser.add_argument('health_status', required=False)
    
    
    def get(self, id=None):
        if id is None:
            animals = Animal.query.all()
            return [animal.to_dict() for animal in animals], 200  
        else:
            animal = Animal.query.filter_by(id=id).first()
            if animal:
                return animal.to_dict(), 200
            return {"error": "Animal not found"}, 404
        
    def post(self):
        data = self.parser.parse_args()
        animals = Animal(**data)

        db.session.add(animals)
        db.session.commit()
        return {"message": "Category created successfully"}, 201
    # def patch(self, id):
    #     data = self.parser.parse_args()

    #     animal = Animal.query.filter_by(id=id).first()
    #     if animal is None:
    #         return {"message":"Animal not found"}, 404
    #     animal.name = data['name']

    #     db.session.commit()