import WorkInfo from '../Models/WorkInfo.model.js'
import User from '../Models/User.model.js'
import Bramhan from '../Models/Bramahn.model.js'
export const addWorkInfo = async (req, res) => {
        const { workname, date, stime, ftime, place, money, phone, maplink, noOfBrahman, note } = req.body
        try {
                const todaydate = new Date();
                const onlyDate = todaydate.toISOString().split('T')[0];
                if ((date > onlyDate || date == onlyDate) && ftime > stime && Number(money) && phone.length == 10 && Number(noOfBrahman)) {
                        const newWork = await new WorkInfo({
                                workname,
                                date: new Date(date),
                                stime,
                                ftime,
                                place,
                                money,
                                phone,
                                maplink,
                                noOfBrahman,
                                noOfBramhanrequired: Number(noOfBrahman),
                                noOfBramhanweave: 0,
                                note,
                                createdByuser: req.user !== null ? req.user._id : null,
                                createdBybramhin: req.bramhan !== null ? req.bramhan._id : null

                        })
                        await newWork.save()
                        //if user is null then it is bramhan
                        if (req.user === null) {
                                const bramhan = await Bramhan.findByIdAndUpdate(
                                        req.bramhan._id,
                                        { $push: { workscreate: newWork._id } },
                                        { new: true, useFindAndModify: false }
                                )
                        }
                        //if bramhan is null then it is user
                        else {
                                const user = await User.findByIdAndUpdate(
                                        req.user._id,
                                        { $push: { workInfos: newWork._id } },
                                        { new: true, useFindAndModify: false }
                                )
                        }
                        return res.status(201).json({ message: "Your work posted" })
                }
                else {
                        res.status(400).json({ error: "Something wrong in information" })
                }
        } catch (error) {
                console.log("error in addwork controller" + error);
                res.status(500).json({ error: "Internal server error" })
        }
}

export const home = async (req, res) => {
        try {
                const now = new Date();
                const todayDate = now.toISOString().split('T')[0];
                const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to total minutes

                // Query: Get all future work + filter by time only if it's today
                const allData = await WorkInfo.find({

                        //$or:used to multiple condition

                        $or: [
                                { date: { $gt: new Date() } },  // Future dates
                                { date: todayDate, stime: { $gt: currentTime } } // Today, but after current time
                        ]
                });

                res.status(201).json(allData);
        } catch (error) {
                console.log("error in home controller:", error);
                res.status(500).json({ error: "Internal server error" });
        }
};
