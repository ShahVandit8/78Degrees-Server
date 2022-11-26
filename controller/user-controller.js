import User from '../schema/user-schema.js';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


export const addUser = async (request, response) => {
    
    try {
        const {first_name, last_name, email, password, empType, gender, doj, address, zip, city, phone} = request.body;

        if(!first_name || !last_name || !email || !password || !empType || !gender || !doj || !address || !zip || !city || !phone) {
            return response.status(422).json({error: 'Please fill the required feilds'})
        }

        const useralready = await User.find({ email: email })
        if(useralready.length) {
            response.status(400).json({ message: 'User Email is already in use'});
        }
        else {
            const newUser = new User({first_name, last_name, email, password, empType, gender, doj, address, zip, city, phone})

        try {
           const UserRegister = await newUser.save();

           if(UserRegister) {
                response.status(201).json({ message: 'Registration successful'});
           }
        }
        catch (err) {
            response.status(409).json({ message: err.message });
        }
        }
    }
    catch (err) {
        console.error(err);
    }
}

    export const loginUser = async (request, response) => {
    
        try {
            const {email, password} = request.body;

            if(!email || !password) {
                response.status(401).json({ error: "please fill data"})
            }

            const userlogin = await User.findOne({
                email:email,
                password:password
            })


            if(userlogin) {

                const token = jwt.sign({
                    first_name : userlogin.first_name,
                    last_name : userlogin.last_name,
                    email: userlogin.email,
                    id: userlogin._id
                }, 'secret123')
    
                response.cookie("jwttoken", token,{
                    expires  : new Date(Date.now() + 9999999),
                    httpOnly : true
                  })

                return response.status(200).json({status: 'ok', usertoken : token, user : userlogin, emptype: userlogin.empType});

                // return res.json({status: 'ok', userlogin: token })
            }
            else{
                return response.status(400).json({ message: 'Wrong Credentials'})
            }

        }
        catch (err) {
            console.error(err);
        }

}

export const getUser = async (request, response) => {
    try{
        const employeelist = await User.find({})
        response.status(200).json(employeelist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getEmpDetails = async (request, response) => {
    try{
        const employee = await User.findById(request.params.id)
        response.status(200).json(employee);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const editUser = async (request, response) => {
    let user = request.body;
    const edituser = new User(user);
    try{
        await User.updateOne({ _id: request.params.id}, edituser)
        response.status(201).json(edituser);
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}

export const deleteUser = async (request, response) => {
    try{
        await User.deleteOne({ _id: request.params.id})
        response.status(201).json({ message: 'User deleted successfully'});
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}


export const getStaffCount = async (request, response) => {
    try{
        const StaffCount = await User.countDocuments({})
        response.status(200).json(StaffCount);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const ForgotPasswordAPI = async (request, response) => {
    try{
        const email = request.params.id;
        const useralready = await User.find({ email: email })
        dotenv.config();
        if(useralready.length){

            const transporter = nodemailer.createTransport({
                service : 'gmail',
                auth: {
                    user: process.env.EMAILJS_USERNAME,
                    pass: process.env.EMAILJS_PASSWORD
                }
            });

            const options = {
                from : "78degreescafe@gmail.com",
                to : email, 
                subject : "Forgot Password - Recovery",
                text : `Your Password is ${useralready.map(item => (item.password))}`
            }

            transporter.sendMail(options, (err,info) => {
                if(err) {
                    console.log(err);
                    return;
                }
            })
            response.status(200).json({ message: "The email is sent"}); 

        }
        else{
            response.status(404).json({ message: "This email is not valid"}); 
        }
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

