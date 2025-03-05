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
                const todayDate = new Date(now.toISOString().split('T')[0]); // Ensure it's a Date object
                const currentTime = now.getHours(); // Convert to total minutes
                console.log(currentTime)

                // Query: Get all pending work for the future or today after the current time
                const allData = await WorkInfo.find({
                        status: "Pending",
                        $or: [
                                { date: { $gt: todayDate } },  // Future dates
                                {
                                        date: { $eq: todayDate },
                                        stime: { $gt: currentTime } // Today's date with time after current time
                                }
                        ]
                });

                console.log(allData);
                res.status(200).json(allData);
        } catch (error) {
                console.error("Error in home controller:", error);
                res.status(500).json({ error: "Internal server error" });
        }
};


export const completeWork = async (req, res) => {
        const { workId } = req.body
        console.log(workId)
        try {
                const date = new Date();
                const onlyDate = date.toISOString().split('T')[0];
                const work = await WorkInfo.findOne({ _id: workId })

                // console.log(work.date.toISOString().split('T')[0],onlyDate)
                if (work.status === "Completed") {
                        return res.status(400).json({ error: "Work already completed" })
                }
                if (work.date.toISOString().split('T')[0] > onlyDate) {
                        return res.status(400).json({ error: "Work not completed yet" })
                }

                await WorkInfo.findByIdAndUpdate(workId,
                        { status: "Completed" },
                        { new: true, useFindAndModify: false })
                return res.status(201).json({ message: "Work completed" })

        } catch (error) {
                console.log("error in completeWork controller:", error);
                res.status(500).json({ error: "Internal server error" })

        }
}
export const cancelWork = async (req, res) => {
        const { workId } = req.body
        try {
                const date = new Date();
                const onlyDate = date.toISOString().split('T')[0];
                const work = await WorkInfo.findOne({ _id: workId })
                // console.log(work)
                if (work.status === "Completed") {
                        return res.status(400).json({ error: "Work already completed" })
                }
                if (work.date.toISOString().split('T')[0] < onlyDate) {
                        return res.status(400).json({ error: "Work already started" })
                }
                await WorkInfo.findByIdAndUpdate(workId,
                        { status: "Canceled" },
                        { new: true, useFindAndModify: false }
                )
                return res.status(201).json({ message: "Work cancelled" })
        } catch (error) {
                console.log("error in cancelWork controller:", error);
                res.status(500).json({ error: "Internal server error" })

        }

}
