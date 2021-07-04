import express from "express";
import { StatusCodes } from "http-status-codes";
import { asyncHandler } from "../../utils/asyncHandler";

const router = express.Router();

router.route('/').post(
    asyncHandler(
        async (req, res): Promise<void> => {
            const { login, password } = req.body;
            const token = await loginService.signToken(login, password);

            res.status(StatusCodes.OK).json({ token });
            /*
            if (token) {
                res.status(...).json(...);
            } else {
                res.status().json();
            }
        */       
        }
    )
);

export default router;