import fooditem from '../schema/foodItem-schema.js';

export const getFoodItemList = async (request, response) => {
    try{
        const fooditemlist = await fooditem.find({})
        response.status(200).json(fooditemlist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const addFoodItem = async (request, response) => {
    try {
        const {Item_Name, Category, Unit_Price, Quantity, Description} = request.body;

        if(!Item_Name || !Category || !Unit_Price || !Quantity || !Description) {
            return response.status(422).json({error: 'Please fill the required feilds'})
        }

        const newFoodItem = new fooditem({Item_Name, Category, Unit_Price, Quantity, Description})

        try {
           const fooditemAdded = await newFoodItem.save();

           if(fooditemAdded) {
                response.status(201).json({ message: 'Food Item Added successfully'});
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

export const deleteFoodItem = async (request, response) => {
    try{
        await fooditem.deleteOne({ _id: request.params.id})
        response.status(201).json({ message: 'Food Item deleted successfully'});
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}

export const getEditFoodItem = async (request, response) => {
    try{
        const foodItem = await fooditem.findById(request.params.id)
        response.status(200).json(foodItem);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const editFoodItem = async (request, response) => {
    let Fooditem = request.body;
    const editfooditem = new fooditem(Fooditem);
    try{
        await fooditem.updateOne({ _id: request.params.id}, editfooditem)
        response.status(201).json(editfooditem);
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}

export const getFoodItemCount = async (request, response) => {
    try{
        const fooditemNo = await fooditem.countDocuments({})
        response.status(200).json(fooditemNo);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getQuantityAlerts = async (request, response) => {
    try{
        const foodItem = await fooditem.find({ Quantity : {$lt : 3}})
        response.status(200).json(foodItem);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}