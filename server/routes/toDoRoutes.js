import { Router } from "express";
import { addList, deleteList, getList, getLists, updateList } from "../controller/listController.js";
import { addMission, deleteMission, getMission, updateMission } from "../controller/missionController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = Router();

// get all the lists for the requested user is the user is auth
router.get(
    "/list",    
    checkAuth,              // check authentication middleware
    getLists         // request controller
);

// get list by passing the id:
router.get(
    "/list/:list_id",
    checkAuth,
    getList
);

// add new list for the requested user if auth
router.post(
    "/list", 
    checkAuth,              //check is auth middleware
    addList                 // request controller
);

// update a list for a given list id
router.patch(
    "/list/:list_id",
    checkAuth,
    updateList
);

// delete the list with the given id
router.delete(
    "/list/:list_id",
    checkAuth,
    deleteList
)

// get specific mission
router.get(
    "/list/:list_id/mission/:mission_id",
    checkAuth,
    getMission
);

// add mission in the list with the id passed in the request parameter
router.post(
    "/list/:list_id/mission",
    checkAuth,              //check is auth middleware
    addMission              // request controller
);

// update the mission with the id passed as a parameter that is belong to the list with the id passed as a param
router.patch(
    "/list/:list_id/mission/:mission_id",
    checkAuth,              //check is auth middleware
    updateMission           // request controller
);

// delete mission with a given list an mission ids 
router.delete(
    "/list/:list_id/mission/:mission_id",
    checkAuth,
    deleteMission
);

// export the to do application router
export default router;