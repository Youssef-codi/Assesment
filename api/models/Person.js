const mongoose = require ('mongoose');
const Schema = mongoose.Schema;




const Person = new mongoose.Schema({
      text: {
		type: String,
		required: true
	},
	
	timestamp: {
		type: String,
		default: Date.now()
	}
});


const Persona = mongoose.model("Persona", Person);

module.exports = Persona;
