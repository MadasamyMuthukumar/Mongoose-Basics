const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    city: String,
    street: String
})

const userSchema =  new mongoose.Schema({
    /**NOTE : all validations (custom one,required,min,max) all going to apply only for mongoose methods.
     * not for direct mongdb commands (even in code or in terminal)
     */
    name: String,
    age: {
        type: Number,
        min: 10,
        max: 100,
        //custom  validation
        validate : {
            //validator going to have the current field value
            validator: age => age % 2 == 0,   //logic needs to return either true or false only
            message: props => `${props.value} must be even number`  //error msg
        }
    },
    email:{
        type: String,
        required: true, //making required field
        lowercase: true //even uppercase provided it converted to lowercase
    },
    // createdAt: Date,
    createdAt: {
        type: Date,
        default: ()=>Date.now()  //default date
    },
    updatedAt: Date,
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User' //referecing same schema Id. if any user had best friend wiht other user
                    //then bestFriend field  have his ID
    },
    hobbies: [ String ], //string array
    // address: {
    //     city: String,
    //     street: String
    // }
    address: addressSchema   //concating the address schema to address filed here. 

})

//SCHEMA METHODS 
//defining non static methods, can be accessible only with result object
userSchema.methods.sayHi = function(){
    //we can access document data using this keyword
    //when sayHi was called by any doc object then it will return those doc's properites using this
    console.log(`My name ${this.name}`)
    // return this;
}

//static method - can be directly called in the query itself(with the Model name directtly)
userSchema.statics.findByName = function (inputName){
    // created one static function which will return docs based on name
    return  this.find({name:inputName})
}

//QUERY METHODS - only accesible after find() , where(), the methods going to return query object
userSchema.query.byName = function (inputName){
    // cant be directly called with Model name. only used to chain after query objects (find , where)
    return  this.where({name:inputName})
}

//VIRTUAL  SCHEMA - addign virtual fiels which not be in original doc. but  we can acces it by calling
/**field name - naemdEmail
 * get() -  used to get value for this field. will take function as arg
 */
userSchema.virtual('namedEmail').get(function(){
  return `${this.name} - ${this.email}`  //this string will be value for this field
})

//SCHEMA MIDDLEWARES - used to apply any function before or after our operations
//pre used to do anything before saving doc to the db
userSchema.pre('save',function(next){
    this.name = `Mr.${this.name}` //whenever the save called before that the name will be changed
    next()
})

//post - after saving , and it will going to have the saved document
userSchema.post('save',function(doc,next){
    doc.name = `${doc.name} modified`  //modifying the save documents name value
    next()
})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel