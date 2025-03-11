import Bramahn from '../Models/Bramahn.model.js';
import User from '../Models/User.model.js';
import workInfo from '../Models/WorkInfo.model.js';

export const profile = async (req, res) => {
    const { role } = req.body;

    try {
        if (role === 'user') {
            if (!req.user || !req.user.workInfos) {
                return res.status(400).json({ error: "User data not found" });
            }

            const workinfo = req.user.workInfos;
            const allwork = await workInfo.find({ _id: { $in: workinfo } }); // Optimized query

            return res.status(200).json({ data: allwork,
               user:req.user
             });
        } 
        else if (role === 'Bramhin') {
        //  console.log(req.bramhan)
            if (!req.bramhan || !req.bramhan.worksaceept) {
                return res.status(400).json({ error: "Bramhin data not found" });
            }

            const workinfo = req.bramhan.worksaceept;
            // This queries the database to find all work documents where _id is inside the workinfo array.

            const allwork = await workInfo.find({ _id: { $in: workinfo } }); // Optimized query

            return res.status(200).json({ data: allwork, user:req.bramhan });
        } 
        else {
            return res.status(400).json({ error: "Invalid role" });
        }
    } catch (error) {
        console.error("Error fetching profile data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
