from flask import request
from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt
from models import Animal, db

class AnimalResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('name', required =True, help="Name is required")
    parser.add_argument('species', required=True, help="Species is required")
    parser.add_argument('age', required=False)
    parser.add_argument('image', required=False)
    parser.add_argument('gender', required =False)
    parser.add_argument('description', required=False)
    parser.add_argument('adoption_status', required=True, help ="Adoption status is required")
    parser.add_argument('health_status', required=False)
    
    # @jwt_required()
    def get(self, id=None):
        if id is None:
            animals = Animal.query.all()
            return [animal.to_dict() for animal in animals], 200  
        else:
            animal = Animal.query.filter_by(id=id).first()
            if animal:
                return animal.to_dict(), 201
            return {"error": "Animal not found"}, 404
        
    @jwt_required()    
    def post(self):
        # user= get_jwt_identity()  # This is a string now: "1"
        claims = get_jwt()
        role = claims.get("role")

        
        if role!="staff":
            return {"error": "Only staff can add animals."}, 403
        data = self.parser.parse_args()
        animals = Animal(**data)

        db.session.add(animals)
        db.session.commit()
        return {"message": "Animal created successfully"}, 201
    
    @jwt_required()
    def patch(self, id):
        claims = get_jwt()
        role = claims.get("role")

        if role != "staff":
            return {"error": "Only staff can update animals."}, 403

        animal = Animal.query.filter_by(id=id).first()
        if not animal:
            return {"message": "Animal not found"}, 404

        data = self.parser.parse_args()

        # Update only fields provided in the request
        if data['name'] is not None:
            animal.name = data['name']
        if data['species'] is not None:
            animal.species = data['species']
        if data['age'] is not None:
            animal.age = data['age']
        if data['gender'] is not None:
            animal.gender = data['gender']
        if data['description'] is not None:
            animal.description = data['description']
        if data['adoption_status'] is not None:
            animal.adoption_status = data['adoption_status']
        if data['health_status'] is not None:
            animal.health_status = data['health_status']
        if data['image'] is not None:
            animal.image = data['image']

        db.session.commit()

        return {"message": "Update is successful"}, 201
    
    @jwt_required()
    def delete(self, id):
        claims = get_jwt()
        role = claims.get("role")
 

        if role!="staff":
            return {"error": "Only staff can delete animals."}, 403
         
        animal = Animal.query.filter_by(id=id).first()
    
        if animal is None:
            return {"message":"Animal not found "}, 404

        db.session.delete(animal)
        db.session.commit()
        return {"message": "Deleted successfully"}, 200