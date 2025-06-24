from flask_restful import Resource
from models import Animal

class AnimalResource(Resource):
    def get(self, id=None):
        if id is None:
            animals = Animal.query.all()
            return [animal.to_dict() for animal in animals], 200  
        else:
            animal = Animal.query.filter_by(id=id).first()
            if animal:
                return animal.to_dict(), 200
            return {"error": "Animal not found"}, 404
