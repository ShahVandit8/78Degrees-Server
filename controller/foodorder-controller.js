import foodorder from "../schema/foodOrder-schema.js";
import fooditem from '../schema/foodItem-schema.js';
import easyinvoice from 'easyinvoice';

export const addFoodOrder = async (request, response) => {
    try {
        const TableId = request.params.id;
        const { Customer, cart, status, time, totalamount } = request.body;

        if (!Customer || !cart || !status || !time || !totalamount || !TableId) {
            return response.status(422).json({ error: 'Please fill the required feilds' })
        }

        const newFoodOrder = new foodorder({ Customer, cart, status, time, totalamount, TableId })

        try {
            const foodorderAdded = await newFoodOrder.save();

            if (foodorderAdded) {
                cart.map(async item => {
                    const foodItem = await fooditem.findById(item.id)
                    console.log(foodItem)
                    const editfooditem = new fooditem({ Quantity: foodItem.Quantity - item.qty });
                    const result = await fooditem.updateOne({ _id: item.id }, editfooditem)
                })
                response.status(201).json(foodorderAdded);
            }
        }
        catch (err) {
            response.status(409).json({ message: err.message });
        }
    }
    catch (err) {
        console.error(err);
    }
}

export const getOrderTicket = async (request, response) => {
    try {
        const foodorderlist = await foodorder.find({ status: 'new' })
        response.status(200).json(foodorderlist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getTotalOrder = async (request, response) => {
    try {
        const foodorderlist = await foodorder.find({})
        response.status(200).json(foodorderlist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getOrder = async (request, response) => {
    try {
        const foodorderitem = await foodorder.find({ _id: request.params.id })
        response.status(200).json(foodorderitem);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const updateStatus = async (request, response) => {
    try {
        await foodorder.updateOne({ _id: request.params.id }, { $set: { status: "served" } })
        response.status(201).json(editorderstatus);
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}

export const getServedOrders = async (request, response) => {
    try {
        const foodorderlist = await foodorder.find({ status: 'served' })
        response.status(200).json(foodorderlist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getTotalRevenue = async (request, response) => {
    try {
        const foodorderlist = await foodorder.find()
        var totalrev = 0
        foodorderlist.map(item => {
            totalrev += item.totalamount
        })
        response.status(200).json(totalrev);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getRecentNewOrders = async (request, response) => {
    try {
        const foodorderlist = await foodorder.find({ status: 'new' })
        const arraylist = foodorderlist.reverse().slice(0, 4)
        response.status(200).json(arraylist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getRecentServedOrders = async (request, response) => {
    try {
        const foodorderlist = await foodorder.find({ status: 'served' })
        const arraylist = foodorderlist.reverse().slice(0, 4)
        response.status(200).json(arraylist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

