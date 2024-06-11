import express from 'express';
import {
    initializeDatabase,
    listTransactions,
    getStatistics,
    getBarChart,
    getPieChart,
    getCombinedData
} from '../controller/Transaction.js';

const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/list', listTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChart);
router.get('/pie-chart', getPieChart);
router.get('/combined-data', getCombinedData);

export default router;
