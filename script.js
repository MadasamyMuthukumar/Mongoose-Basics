const mongoose = require('mongoose')
const User = require('./models/userModel')

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
    .then(() => console.log("Database Connected!"))
    .catch(() => console.log("Connection Error!"))

//ADD DATA
// const user = new User({
//     name:"Kumar",
//     age:20
// })

// user.save().then(()=> console.log("created"))

//ADD DATA IN ALT WAY
const run = async () => {
    try {
        const newData = await User.create({
            name: "Guna",
            age: 21,
            email:"xxx@gmail.com",
            hobbies: ["games", "codinng"],
            address: {
                street: "1st street"
            }
        })
        console.log("Createddd");
    }
    catch (err) {
        console.log(err.errors);

    }
    //initially the data is created with name Guna then we are changing it to Ajith and saving
    // newData.name = 'Ajith';
    // await newData.save()


}

//QUERYING IN MONGOOSE

const querying = async ()=>{
    try{
        // const user =await User.findById('66d07e82ae65249ed6df323a')
        // const user =await User.find({name:"Ajith"}) //similar to mongodb find method
        // const user =await User.findOne({name:"Ajith"})  //first occured value
        // const user =await User.exists({name:"Ajith"}) //return id if its exists
        //const user =await User.where('address.street').equals('1st street') //similar to name = Ajith
        // const user =await User.where('age').gt(20).lt(30).limit(1) //greater than 20 and less than 30
        //will populate the referenced friend of specified ID
        // const user = await User.where('_id').equals('66d07ee98daa5fdc30ce1c06').populate('bestFriend')
        // const user = await User.findOne({name:'Ajith'});   //Only work for single selected Object
        // user.sayHi()

        // const user = await User.findByName('Guna')  //custom static method

        // const user = await User.find().byName('Guna') //used as chain method
        // const user = await User.where('age').gt(90).byName('Guna') 
        // const user = await User.findById('66d07e82ae65249ed6df323a')  //will work for single  field
        // console.log(user.namedEmail)
           //return the field

        //testing middlewares
        const user = await User.findById('66d07e82ae65249ed6df323a')
        user.name = "Kumaran"
        await user.save() //name will changed before saving



        console.log(user)
    }catch(err){
        console.log(err.errors);
        
    }
}
// run();
querying();
