import express  from "express";
import { addUser, loginUser, getUser, getEmpDetails, editUser, deleteUser, getStaffCount, ForgotPasswordAPI} from '../controller/user-controller.js'
import { addCategory, getFoodCategoryList, editFoodCategoryList, deleteFoodCategoryList, getFoodCategory, getFoodCategoryNo, getCategoryNameList } from '../controller/foodCategory-controller.js'
import { getFoodItemList, addFoodItem, deleteFoodItem, getEditFoodItem, editFoodItem, getFoodItemCount, getQuantityAlerts } from '../controller/foodItem-controller.js'
import { addTable, getTableDetailsist, editTableDetail, getEditTableDetail, deleteTableDetails, getTableCount, getTableValidation } from '../controller/table-controller.js'
import { addFoodOrder, getOrderTicket, getTotalOrder, getOrder, updateStatus, getServedOrders, getTotalRevenue, getRecentNewOrders, getRecentServedOrders } from "../controller/foodorder-controller.js";

const router = express.Router();

router.post('/register', addUser);

router.post('/login', loginUser);

router.get('/emplist', getUser);

router.get('/emp/:id', getEmpDetails);

router.post('/emp/:id', editUser);

router.delete('/emp/:id', deleteUser);

router.get('/staffcount', getStaffCount);


// Food Category 

router.post('/addcategory', addCategory);

router.get('/categorylist', getFoodCategoryList);

router.get('/foodcategory/:id', getFoodCategory);

router.post('/foodcategory/:id', editFoodCategoryList);

router.delete('/foodcategory/:id', deleteFoodCategoryList);

router.get('/totalcategoryno', getFoodCategoryNo);

router.get('/categorynamelist', getCategoryNameList)

// Food Item Menu

router.get('/fooditemlist', getFoodItemList);

router.post('/addfooditem', addFoodItem);

router.delete('/fooditem/:id', deleteFoodItem);

router.get('/fooditem/:id', getEditFoodItem);

router.post('/fooditem/:id', editFoodItem);

router.get('/totalfooditemno', getFoodItemCount);

router.get('/qtyalerts', getQuantityAlerts)


// Table Management

router.post('/configuretable', addTable)

router.get('/tabledetailslist', getTableDetailsist);

router.post('/tabledetails/:id', editTableDetail);

router.get('/tabledetails/:id', getEditTableDetail);

router.delete('/tabledetails/:id', deleteTableDetails);

router.get('/tablecount', getTableCount);

router.get('/tablevalidate/:id', getTableValidation)

// Food Order by Customer 

router.post('/placeorder/:id', addFoodOrder)

router.get('/neworder', getOrderTicket)

router.get('/totalorder', getTotalOrder)

router.get('/order/:id', getOrder)

router.post('/updatestatusorder/:id', updateStatus)

router.get('/servedorders', getServedOrders)

router.get('/totalrevenue', getTotalRevenue)

router.get('/recentorders', getRecentNewOrders)

router.get('/recentservedorders', getRecentServedOrders)



router.get('/pwdforgot/:id', ForgotPasswordAPI)




export default router;