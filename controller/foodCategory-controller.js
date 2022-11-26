import foodCategory from '../schema/foodCategory-schema.js';

export const addCategory = async (request, response) => {
    
    try {
        const {Category, Description} = request.body;

        if(!Category || !Description) {
            return response.status(422).json({error: 'Please fill the required feilds'})
        }

        const newCategory= new foodCategory({Category, Description})

        try {
           const categoryAdded = await newCategory.save();

           if(categoryAdded) {
                response.status(201).json({ message: 'Food Category Added successfully'});
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

export const getFoodCategory = async (request, response) => {
    try{
        const category = await foodCategory.findById(request.params.id)
        response.status(200).json(category);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getFoodCategoryList = async (request, response) => {
    try{
        const categorylist = await foodCategory.find({})
        response.status(200).json(categorylist);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const editFoodCategoryList = async (request, response) => {
    let category = request.body;
    const editcategory = new foodCategory(category);
    try{
        await foodCategory.updateOne({ _id: request.params.id}, editcategory)
        response.status(201).json(editcategory);
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}

export const deleteFoodCategoryList = async (request, response) => {
    try{
        await foodCategory.deleteOne({ _id: request.params.id})
        response.status(201).json({ message: 'Food Category deleted successfully'});
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}

export const getFoodCategoryNo = async (request, response) => {
    try{
        const categoryNo = await foodCategory.countDocuments({})
        response.status(200).json(categoryNo);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getCategoryNameList = async (request, response) => {
    try{
        const categoryNameList = await foodCategory.find({}, {Category:1, _id:0})
        response.status(200).json(categoryNameList);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}