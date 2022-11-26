import table from '../schema/table-schema.js';

export const addTable = async (request, response) => {
    
    try {
        const {Table_No, Seating_Capacity, Description, QR_Url} = request.body;

        if(!Table_No || !Seating_Capacity || !Description || !QR_Url) {
            return response.status(422).json({error: 'Please fill the required fields'})
        }

        const tablealready = await table.findOne({ Table_No: Table_No })

        if(tablealready){
            response.status(401).json({ message: 'Table Number cannob be same'});
        }
        else{
            const newTable= new table({Table_No,Seating_Capacity, Description, QR_Url})

            try {
            const tableadded = await newTable.save();

            if(tableadded) {
                    response.status(201).json({ message: 'Table Configured Successfully'});
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

export const getTableDetailsist = async (request, response) => {
    try{
        const tableList = await table.find({})
        response.status(200).json(tableList);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const editTableDetail = async (request, response) => {
    let tabledetail = request.body;
    const edittable = new table(tabledetail);
    try{
        await table.updateOne({ _id: request.params.id}, edittable)
        response.status(201).json(edittable);
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}


export const getEditTableDetail = async (request, response) => {
    try{
        const tabledetail1 = await table.findById(request.params.id)
        // const employee = await User.find({})
        response.status(200).json(tabledetail1);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}


export const deleteTableDetails = async (request, response) => {
    try{
        await table.deleteOne({ _id: request.params.id})
        response.status(201).json({ message: 'Table Details deleted successfully'});
    } catch (err) {
        response.status(409).json({ message: err.message })
    }
}

export const getTableCount = async (request, response) => {
    try{
        const totaltablecount = await table.countDocuments({})
        response.status(200).json(totaltablecount);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}

export const getTableValidation = async (request, response) => {
    try{
        const tabledetail1 = await table.find({ Table_No: request.params.id})
        response.status(200).json(tabledetail1);
    } catch (err) {
        response.status(404).json({ message: err.message })
    }
}
