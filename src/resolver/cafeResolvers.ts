import { ArgForCafe, ArgForMeal, ArgForReservation, ArgForReview, CreateCafe, CreateMeal, DeleteMeal, LoginCustomer, UpdateCafeProfile, UpdateMeal } from "../interface/type"
import { Cafe } from "../model/cafeSchema"
import { Meal } from "../model/mealSchema"
import { Reservation } from "../model/reservationSchema"
import { Review } from "../model/reviewScheme"
import { signToken, verifyPassword } from "../utils"
import bcrypt, { genSalt } from 'bcryptjs'

export const CafeResolvers = {
    Query: {
        getCafes : async()=>{
            try{
                const customers = await Cafe.find({})
                return customers
            } catch (err) {
                console.log(err)
            }
        },
        getCafeById: async(_:unknown,args:ArgForCafe) => {
            try{
                const singleCustomer = await Cafe.findById(args.id)
                return singleCustomer
            } catch (err) {
                console.log(err)
            }
        },
        getReservationsByCafeId: async(_:unknown,args:ArgForReservation) => {
            try{
                const singleCustomerReservations = await Reservation.findById(args.id)
                return singleCustomerReservations
            } catch (err) {
                console.log(err)
            }
        },
        getReviewsByCafeId: async(_:unknown,args:ArgForReview) => {
            try{
                const singleCustomerReservations = await Review.findById(args.id)
                return singleCustomerReservations
            } catch (err) {
                console.log(err)
            }
        },
        getCustomerByCafeId: async(_:unknown,args:ArgForCafe) => {
            try{
                const singleCustomerCafe = await Cafe.findById(args.id)
                return singleCustomerCafe
            } catch (err) {
                console.log(err)
            }
        },
        getMealsByCafeId: async(_:unknown,args:ArgForMeal) => {
            try{
                const singleCustomerMeal = await Meal.findById(args.id)
                return singleCustomerMeal
            } catch (err) {
                console.log(err)
            }
        },
    },

    Mutation : {
        registerCafe: async(_:unknown, args: CreateCafe) =>{
            try{
                const salt = await genSalt()
                const password = await bcrypt.hash(args.input.password, salt)
                const newCustomer={
                    name:args.input.name,
                    password,
                    email:args.input.email,
                    salt
                }
                const  customerall = await Cafe.create(newCustomer)
                if(customerall){
                    return {...newCustomer,_id:customerall._id}
                }
            }catch(err){
                console.log(err)
            }
    },
    loginCustomer:async (parent: any, args:LoginCustomer,context: any) => {
        try{
            const {password,email} = args.input



            const output = await Cafe.findOne({email}) 
          
            const isValidPassword = await verifyPassword(args.input.password, password);
          
            if (!isValidPassword) {
              throw new Error("Invalid password");
              console.error("Invalid password");
            }
          
            return {
              id:args.input.id,
              email:args.input.email,
              token: signToken({ customerId:args.input.id }),
            };
         
          
        }catch(err: any){
         console.log(err)
        }
     },

     updateCafeProfile:async(_:unknown,args:UpdateCafeProfile)=>{
        try{
       const id = args.input.id
       const updateCafe={
                 id : args.input.id,
                 name: args.input.name,
                 email: args.input.email,
                 phone: args.input.phone,
                 password: args.input.password,
                 profileImage: args.input.profileImage  
       }
       const updateNew = await Cafe.findByIdAndUpdate(id,updateCafe,{new:true})
       if(updateNew){
         return updateNew
     }
        }catch(err){
         console.log(err)
        }
      },
 

     createMeal:async(_:unknown,args:CreateMeal)=>{
        try{
            const newMeal = {
                mainCourse: args.input.mainCourse,
                desert: args.input.desert,
                sweetener: args.input.sweetener,
                drink: args.input.drink,
                isAvailable: args.input.isAvailable = true,
                timeOfDelivery: args.input.timeOfDelivery,
            }
            const reservation = await Reservation.create(newMeal)
            if(reservation){
                return reservation
            }
        }catch(err){

        }
    },

     updateMeal:async(_:unknown,args:UpdateMeal)=>{
       try{
      const id = args.input.id
      const updateReservation={
                id : args.input.id,
                time: args.input.time,
                dateOfBooking: args.input.dateOfBooking,
                cancelOfBooking: args.input.cancelOfBooking,
                table: args.input.table,
      }
      const updateNew = await Meal.findByIdAndUpdate(id,updateReservation,{new:true})
      if(updateNew){
        return updateNew
    }
       }catch(err){
        console.log(err)
       }
     },

     deleteMeal: async(_:unknown,args:DeleteMeal)=>{
        try{
            
            const deleteOne =await Meal.findById({_id:args.id})
            console.log(deleteOne)
            if(deleteOne){
                return {message:`Product with ${args.id} has been deleted`}
            }
        }catch(err){
            console.log(err)
        }
     },
  
}
}


